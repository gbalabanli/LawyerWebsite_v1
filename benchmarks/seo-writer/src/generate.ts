import path from 'node:path';
import { chatCompletion, resolveProvider } from './client.ts';
import type { GeneratedArticle, ModelsConfig, TitleEntry } from './types.ts';
import {
	ensureDir,
	exists,
	readJson,
	readText,
	safeName,
	writeJson,
	writeText,
	mapLimit,
} from './util.ts';

export interface TitleFile {
	titles: TitleEntry[];
}

export function loadTitles(p: string): TitleEntry[] {
	const data = readJson<TitleFile>(p);
	if (!data.titles || !Array.isArray(data.titles)) {
		throw new Error(`titles file has no "titles" array: ${p}`);
	}
	return data.titles;
}

export function selectModels(cfg: ModelsConfig, selector: string): string[] {
	if (selector === 'all') return cfg.models.map((m) => m.id);
	if (selector === 'enabled') return cfg.models.filter((m) => m.enabled).map((m) => m.id);
	const wanted = selector.split(',').map((s) => s.trim()).filter(Boolean);
	const known = new Set(cfg.models.map((m) => m.id));
	for (const w of wanted) {
		if (!known.has(w)) throw new Error(`unknown model id: ${w}`);
	}
	return wanted;
}

function buildSystemPrompt(root: string, title: TitleEntry, dateStr: string): string {
	const file = title.lang === 'en' ? 'prompt.en.md' : 'prompt.tr.md';
	const base = readText(path.join(root, 'config', file));
	const today = new Date().toISOString().slice(0, 10);
	const brief = [
		'',
		'--- GÖREV ÖZETİ / TASK BRIEF ---',
		`Bugünün tarihi / Today: ${dateStr || today}`,
		`Başlık / Title: ${title.title}`,
		`Birincil anahtar kelime / Primary keyword: ${title.primaryKeyword}`,
		`Dil / Language: ${title.lang === 'tr' ? 'Türkçe (tr)' : 'English (en)'}`,
		`Hizmet etiketi / Service tag (tags içinde kullan): ${title.serviceTag}`,
		title.notes ? `Ek notlar / Notes: ${title.notes}` : '',
		'',
		title.lang === 'tr'
			? 'Şimdi bu başlık için yazıyı üret. Sadece yazıyı döndür.'
			: 'Now produce the article for this title. Return only the article.',
	]
		.filter(Boolean)
		.join('\n');
	return `${base}\n${brief}`;
}

function articlePath(runDir: string, model: string, key: string): string {
	return path.join(runDir, 'articles', safeName(model), `${key}.md`);
}

function rawPath(runDir: string, model: string, key: string): string {
	return path.join(runDir, 'raw', safeName(model), `${key}.json`);
}

export interface GenerateOptions {
	root: string;
	runDir: string;
	titles: TitleEntry[];
	modelsConfig: ModelsConfig;
	modelIds: string[];
	repeats: number;
	force: boolean;
	concurrency: number;
	dateStr: string;
	onLog?: (msg: string) => void;
}

export async function runGenerate(opts: GenerateOptions): Promise<GeneratedArticle[]> {
	const providerCache = new Map<string, ReturnType<typeof resolveProvider>>();
	const getProvider = (name: string) => {
		const cached = providerCache.get(name);
		if (cached) return cached;
		const cfg = opts.modelsConfig.providers[name];
		if (!cfg) throw new Error(`unknown provider "${name}"`);
		const resolved = resolveProvider(name, cfg);
		providerCache.set(name, resolved);
		return resolved;
	};

	const jobs: Array<{ title: TitleEntry; key: string; modelId: string }> = [];
	for (const modelId of opts.modelIds) {
		for (const title of opts.titles) {
			for (let r = 0; r < Math.max(1, opts.repeats); r++) {
				const key = opts.repeats > 1 ? `${title.id}__r${r + 1}` : title.id;
				jobs.push({ title, key, modelId });
			}
		}
	}

	const results = await mapLimit(jobs, opts.concurrency, async (job) => {
		const modelCfg = opts.modelsConfig.models.find((m) => m.id === job.modelId);
		const label = modelCfg?.label ?? job.modelId;
		const rp = rawPath(opts.runDir, job.modelId, job.key);

		if (!opts.force && exists(rp)) {
			try {
				const cached = readJson<GeneratedArticle>(rp);
				if (cached.ok && cached.content && cached.content.trim().length > 0) {
					opts.onLog?.(`skip  ${label} :: ${job.title.id} (cached)`);
					return cached;
				}
			} catch {
				// regenerate
			}
		}

		let provider;
		try {
			provider = getProvider(modelCfg?.provider ?? '');
		} catch (e) {
			const err = e instanceof Error ? e.message : String(e);
			opts.onLog?.(`fail  ${label} :: ${job.title.id} (${err})`);
			const failed: GeneratedArticle = {
				model: job.modelId,
				modelLabel: label,
				titleId: job.title.id,
				lang: job.title.lang,
				ok: false,
				error: err,
				content: '',
				latencyMs: 0,
				attempts: 0,
				createdAt: new Date().toISOString(),
			};
			writeJson(rp, failed);
			return failed;
		}

		const system = buildSystemPrompt(opts.root, job.title, opts.dateStr);
		opts.onLog?.(`start ${label} :: ${job.title.id}`);
		const res = await chatCompletion({
			provider,
			model: job.modelId,
			messages: [
				{ role: 'system', content: system },
				{ role: 'user', content: job.title.title },
			],
			temperature: modelCfg?.temperature ?? opts.modelsConfig.defaults.temperature,
			maxTokens: modelCfg?.maxTokens ?? opts.modelsConfig.defaults.maxTokens,
			timeoutMs: modelCfg?.timeoutMs ?? opts.modelsConfig.defaults.timeoutMs,
		});

		let content = res.content;
		if (!content && res.reasoning) {
			const fmIdx = res.reasoning.indexOf('---');
			if (fmIdx >= 0) content = res.reasoning.slice(fmIdx);
		}

		const article: GeneratedArticle = {
			model: job.modelId,
			modelLabel: label,
			titleId: job.title.id,
			lang: job.title.lang,
			ok: res.ok && content.trim().length > 0,
			error: res.ok ? (content.trim().length > 0 ? undefined : 'empty content') : res.error,
			content,
			reasoning: res.reasoning || undefined,
			finishReason: res.finishReason,
			promptTokens: res.usage.promptTokens,
			completionTokens: res.usage.completionTokens,
			totalTokens: res.usage.totalTokens,
			latencyMs: res.latencyMs,
			attempts: res.attempts,
			createdAt: new Date().toISOString(),
		};

		writeJson(rp, article);
		if (article.ok) {
			writeText(articlePath(opts.runDir, job.modelId, job.key), content);
			opts.onLog?.(`ok    ${label} :: ${job.title.id} (${Math.round(res.latencyMs / 1000)}s, ${article.totalTokens ?? '?'} tok)`);
		} else {
			opts.onLog?.(`fail  ${label} :: ${job.title.id} (${article.error})`);
		}
		return article;
	});

	return results;
}

export function articleOutputPath(runDir: string, model: string, titleId: string): string {
	return articlePath(runDir, model, titleId);
}

export function rawOutputPath(runDir: string, model: string, titleId: string): string {
	return rawPath(runDir, model, titleId);
}

export function ensureRunDirs(runDir: string): void {
	ensureDir(path.join(runDir, 'articles'));
	ensureDir(path.join(runDir, 'raw'));
	ensureDir(path.join(runDir, 'judge'));
}
