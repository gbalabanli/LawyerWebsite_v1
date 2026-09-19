import path from 'node:path';
import { chatCompletion, resolveProvider } from './client.ts';
import type {
	GeneratedArticle,
	JudgeScore,
	JudgesConfig,
	ModelsConfig,
	RubricConfig,
	TitleEntry,
} from './types.ts';
import { extractJson, mapLimit, safeName, writeJson } from './util.ts';

function buildJudgeSystemPrompt(rubric: RubricConfig, lang: 'tr' | 'en'): string {
	const criteria = rubric.judge.criteria
		.map((c) => `- ${c.key} (${c.label}) [0-${rubric.judge.scale}]: ${c.guidance}`)
		.join('\n');
	const schema = {
		scores: Object.fromEntries(rubric.judge.criteria.map((c) => [c.key, 'number 0-10'])),
		reasons: Object.fromEntries(rubric.judge.criteria.map((c) => [c.key, 'short string'])),
		overallComment: '1-3 sentence overall assessment',
		redFlags: ['optional list of serious problems (fabricated facts, guarantees of outcome, keyword stuffing, empty filler)'],
	};
	if (lang === 'en') {
		return [
			'You are a strict SEO content quality evaluator for a law firm blog.',
			'You will receive one article and must score it against the rubric below.',
			'Judge only what is present in the article. Do not reward length alone. Penalize fabricated legal facts, guaranteed-outcome language, keyword stuffing, and generic filler.',
			'',
			'RUBRIC (score each criterion as an integer or one-decimal number from 0 to 10):',
			criteria,
			'',
			'Return ONLY a JSON object with exactly this shape (no markdown fences, no commentary):',
			JSON.stringify(schema, null, 2),
		].join('\n');
	}
	return [
		'Bir hukuk bürosu blogu için içerik kalitesini değerlendiren katı bir SEO değerlendiricisisin.',
		'Verilen tek bir yazıyı aşağıdaki rubriğe göre puanlayacaksın.',
		'Sadece yazıda mevcut olanı değerlendir. Uzunluğu tek başına ödüllendirme. Uydurma hukuki bilgi, kesin sonuç vaadi, anahtar kelime doldurma (stuffing) ve genel dolgu metni puan kırar.',
		'',
		'RUBRİK (her kriteri 0-10 arası bir tam veya ondalıklı sayı olarak puanla):',
		criteria,
		'',
		'SADECE aşağıdaki yapıda bir JSON nesnesi döndür (markdown kod bloğu veya açıklama yok):',
		JSON.stringify(schema, null, 2),
	].join('\n');
}

export interface JudgeOptions {
	root: string;
	runDir: string;
	titles: TitleEntry[];
	articles: GeneratedArticle[];
	rubric: RubricConfig;
	judgesConfig: JudgesConfig;
	modelsConfig: ModelsConfig;
	concurrency: number;
	onLog?: (msg: string) => void;
}

export async function runJudge(opts: JudgeOptions): Promise<JudgeScore[]> {
	const titleMap = new Map(opts.titles.map((t) => [t.id, t]));
	const candidateModels = new Set(opts.articles.map((a) => a.model));

	const providers = new Map<string, ReturnType<typeof resolveProvider>>();
	const getProvider = (name: string) => {
		const cached = providers.get(name);
		if (cached) return cached;
		const cfg = opts.modelsConfig.providers[name];
		if (!cfg) throw new Error(`unknown provider "${name}" for judge`);
		const resolved = resolveProvider(name, cfg);
		providers.set(name, resolved);
		return resolved;
	};

	const targets = opts.articles.filter((a) => a.ok && a.content.trim().length > 0);
	const results: JudgeScore[] = [];

	for (const judge of opts.judgesConfig.judges) {
		if (!opts.judgesConfig.allowSelfJudge && candidateModels.has(judge.model)) {
			opts.onLog?.(`judge ${judge.label} skipped (also a candidate; set allowSelfJudge=true to override)`);
			continue;
		}
		let provider;
		try {
			provider = getProvider(judge.provider);
		} catch (e) {
			opts.onLog?.(`judge ${judge.label} unavailable: ${e instanceof Error ? e.message : String(e)}`);
			continue;
		}

		const runs = Math.max(1, opts.judgesConfig.runsPerJudge);
		const jobs: Array<{ article: GeneratedArticle; title: TitleEntry; run: number }> = [];
		for (const article of targets) {
			const title = titleMap.get(article.titleId);
			if (!title) continue;
			for (let r = 0; r < runs; r++) jobs.push({ article, title, run: r });
		}

		const judgeResults = await mapLimit(jobs, opts.concurrency, async (job) => {
			const system = buildJudgeSystemPrompt(opts.rubric, job.title.lang);
			const user = [
				job.title.lang === 'en' ? `Target title: ${job.title.title}` : `Hedef başlık: ${job.title.title}`,
				job.title.lang === 'en'
					? `Primary keyword: ${job.title.primaryKeyword}`
					: `Birincil anahtar kelime: ${job.title.primaryKeyword}`,
				'',
				job.title.lang === 'en' ? 'ARTICLE:' : 'YAZI:',
				'"""',
				job.article.content,
				'"""',
			].join('\n');

			const res = await chatCompletion({
				provider,
				model: judge.model,
				messages: [
					{ role: 'system', content: system },
					{ role: 'user', content: user },
				],
				temperature: opts.judgesConfig.temperature,
				maxTokens: 2048,
				timeoutMs: opts.modelsConfig.defaults.timeoutMs,
			});

			const parsed = extractJson(res.ok ? res.content : (res.reasoning || res.content)) as
				| Record<string, unknown>
				| null;

			const scores: Record<string, number> = {};
			const reasons: Record<string, string> = {};
			for (const c of opts.rubric.judge.criteria) {
				const raw = parsed?.scores as Record<string, unknown> | undefined;
				const v = raw?.[c.key];
				const num = typeof v === 'number' ? v : parseFloat(String(v));
				scores[c.key] = Number.isFinite(num) ? Math.max(0, Math.min(opts.rubric.judge.scale, num)) : 0;
				const rraw = parsed?.reasons as Record<string, unknown> | undefined;
				reasons[c.key] = typeof rraw?.[c.key] === 'string' ? (rraw[c.key] as string) : '';
			}
			const redFlags = Array.isArray(parsed?.redFlags)
				? (parsed?.redFlags as unknown[]).filter((x): x is string => typeof x === 'string')
				: [];

			const score: JudgeScore = {
				model: job.article.model,
				titleId: job.article.titleId,
				judge: judge.label,
				ok: res.ok && parsed !== null,
				error: res.ok ? (parsed === null ? 'unparsable judge JSON' : undefined) : res.error,
				scores,
				reasons,
				overallComment: typeof parsed?.overallComment === 'string' ? (parsed.overallComment as string) : undefined,
				redFlags,
				latencyMs: res.latencyMs,
			};
			const out = path.join(
				opts.runDir,
				'judge',
				safeName(judge.label),
				`${safeName(job.article.model)}__${job.article.titleId}${runs > 1 ? `__r${job.run + 1}` : ''}.json`,
			);
			writeJson(out, score);
			return score;
		});

		const okCount = judgeResults.filter((r) => r.ok).length;
		opts.onLog?.(`judge ${judge.label}: ${okCount}/${judgeResults.length} scored`);
		results.push(...judgeResults);
	}

	return results;
}
