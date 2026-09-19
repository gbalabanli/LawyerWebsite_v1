import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion, resolveProvider } from './client.ts';
import type { GeneratedArticle, JudgeScore, JudgesConfig, ModelsConfig } from './types.ts';
import {
	asString,
	countWords,
	ensureDir,
	exists,
	extractJson,
	mapLimit,
	normText,
	readJson,
	safeName,
	stripMarkdown,
	writeJson,
	writeText,
} from './util.ts';

export interface ShortTask {
	id: string;
	lang: 'tr' | 'en';
	type: 'faq' | 'short_article' | 'howto' | 'seo_pack';
	question: string;
	primaryKeyword: string;
	minWords: number;
	maxWords: number;
	mustInclude: string[];
	reference?: string;
}

interface ShortFile {
	tasks: ShortTask[];
}

export function loadShortTasks(p: string): ShortTask[] {
	const data = readJson<ShortFile>(p);
	if (!Array.isArray(data.tasks)) throw new Error(`tasks file has no "tasks" array: ${p}`);
	return data.tasks;
}

const JUDGE_WEIGHT = 0.6;
const DET_WEIGHT = 0.4;

const JUDGE_CRITERIA: Array<{ key: string; label: string; weight: number; guidance: string }> = [
	{ key: 'accuracy', label: 'Accuracy', weight: 0.45, guidance: 'Are the legal facts correct and consistent with the reference points? Penalize wrong, invented, or misleading statements heavily.' },
	{ key: 'completeness', label: 'Completeness', weight: 0.2, guidance: 'Are all required reference points covered?' },
	{ key: 'directness', label: 'Directness', weight: 0.15, guidance: 'Does it answer immediately without preamble or filler? Concise and on-topic.' },
	{ key: 'seo', label: 'SEO', weight: 0.12, guidance: 'Primary keyword used naturally, snippet-friendly phrasing, no stuffing.' },
	{ key: 'tone', label: 'Tone', weight: 0.08, guidance: 'Professional, legally neutral, no guaranteed outcomes.' },
];

function typeInstruction(task: ShortTask): string {
	if (task.type === 'seo_pack') return '';
	if (task.type === 'howto') {
		return task.lang === 'tr'
			? 'Yanıtı kısa ve numaralı adımlar halinde ver.'
			: 'Answer as short numbered steps.';
	}
	return task.lang === 'tr' ? 'Yanıtı kısa paragraflar halinde ver.' : 'Answer in short paragraphs.';
}

function buildSystem(task: ShortTask): string {
	if (task.type === 'seo_pack') {
		if (task.lang === 'en') {
			return [
				'You are an SEO strategist for a law firm.',
				task.question,
				`Primary keyword: ${task.primaryKeyword}`,
				'Return ONLY a JSON object exactly like:',
				'{"titles":["...","...","..."],"description":"..."}',
				'3 titles of 50-60 characters each, front-loading the keyword. 1 meta description of 140-170 characters with the keyword in the first 120 characters.',
				'No code fences, no commentary.',
			].join('\n');
		}
		return [
			'Bir hukuk bürosu için SEO stratejistisin.',
			task.question,
			`Birincil anahtar kelime: ${task.primaryKeyword}`,
			'Yalnızca şu yapıda bir JSON nesnesi döndür:',
			'{"titles":["...","...","..."],"description":"..."}',
			'3 başlık, her biri 50-60 karakter ve anahtar kelimeyi başta taşımalı. 1 meta açıklama, 140-170 karakter ve anahtar kelimeyi ilk 120 karakterde içermeli.',
			'Kod bloğu veya açıklama ekleme.',
		].join('\n');
	}
	const rules =
		task.lang === 'tr'
			? [
					'Bir hukuk bürosu için yazan SEO içerik yazarısın.',
					'Verilen soruya doğrudan, doğru ve SEO uyumlu bir yanıt ver.',
					'İlk cümlede soruya net yanıt ver; "Elbette", "Tabii ki", "İşte" gibi dolgu ifadelerle başlama.',
					`Yanıt ${task.minWords}-${task.maxWords} kelime arasında olsun.`,
					`Birincil anahtar kelimeyi doğal biçimde kullan: ${task.primaryKeyword}`,
					'Hukuki olarak nötr ol; kesin sonuç vaat etme, gerektiğinde "somut olaya göre değişebilir" ifadesini kullan.',
					'Sadece yanıtı döndür; başlık, açıklama, kod bloğu ekleme.',
				].join('\n')
			: [
					'You are an SEO content writer for a law firm.',
					'Answer the question directly, accurately, and in an SEO-friendly way.',
					'Give the answer in the first sentence; do not open with filler like "Certainly", "Sure", or "Here is".',
					`Keep the answer between ${task.minWords}-${task.maxWords} words.`,
					`Use the primary keyword naturally: ${task.primaryKeyword}`,
					'Be legally neutral; never guarantee outcomes, use "depends on the specific facts" where appropriate.',
					'Return only the answer; no heading, no description, no code fence.',
				].join('\n');
	return `${rules}\n${typeInstruction(task)}`;
}

interface ShortAnswer {
	model: string;
	modelLabel: string;
	taskId: string;
	lang: 'tr' | 'en';
	ok: boolean;
	error?: string;
	answer: string;
	latencyMs: number;
	totalTokens?: number;
	createdAt: string;
}

function firstSentence(text: string): string {
	const clean = stripMarkdown(text).trim();
	const m = clean.match(/^[^.!?]+[.!?]/);
	return (m ? m[0] : clean).trim();
}

function isFiller(open: string): boolean {
	return /^(elbette|tabii|tabi ki|işte|merhaba|here is|sure|certainly|of course|absolutely|i hope)/i.test(open.trim());
}

function countSteps(text: string): number {
	let n = 0;
	for (const line of text.split(/\r?\n/)) {
		if (/^\s*(\d+[.)]|[-*•])\s+/.test(line)) n++;
	}
	return n;
}

function coverage(answer: string, mustInclude: string[]): number {
	if (mustInclude.length === 0) return 1;
	const norm = normText(answer);
	let covered = 0;
	for (const phrase of mustInclude) {
		const tokens = normText(phrase)
			.split(' ')
			.filter((t) => t.length > 3);
		if (tokens.length === 0) {
			covered += norm.includes(normText(phrase)) ? 1 : 0;
			continue;
		}
		const hits = tokens.filter((t) => norm.includes(t)).length;
		if (hits / tokens.length >= 0.6) covered++;
	}
	return covered / mustInclude.length;
}

interface DetResult {
	score: number;
	checks: Record<string, number>;
	wordCount: number;
}

export function shortDeterministic(answer: string, task: ShortTask): DetResult {
	const wordCount = countWords(answer);
	const opening = firstSentence(answer);
	const openingWords = countWords(opening);
	const keywordPresent = normText(answer).includes(normText(task.primaryKeyword));
	const directOpening = openingWords > 0 && openingWords <= 35 && !isFiller(opening);
	const noFiller = !/elbette|tabii ki|here is|i hope this helps|certainly!|of course!/i.test(answer);

	let formatOk = true;
	let withinWordLimit = wordCount >= Math.max(20, task.minWords * 0.6) && wordCount <= task.maxWords + 30;

	if (task.type === 'seo_pack') {
		withinWordLimit = true;
		const parsed = extractJson(answer) as { titles?: unknown; description?: unknown } | null;
		const titles = Array.isArray(parsed?.titles) ? (parsed?.titles as unknown[]).map((t) => String(t)) : [];
		const description = typeof parsed?.description === 'string' ? (parsed?.description as string) : '';
		const titlesOk = titles.length >= 3 && titles.filter((t) => t.length >= 45 && t.length <= 65).length >= 2;
		const descOk = description.length >= 130 && description.length <= 180 && normText(description).includes(normText(task.primaryKeyword));
		formatOk = titlesOk && descOk;
	} else if (task.type === 'howto') {
		formatOk = countSteps(answer) >= 3;
	}

	const checks: Record<string, number> = {
		withinWordLimit: withinWordLimit ? 1 : 0,
		keywordPresent: keywordPresent ? 1 : 0,
		directOpening: directOpening ? 1 : 0,
		formatOk: formatOk ? 1 : 0,
		coverage: coverage(answer, task.mustInclude),
		noFiller: noFiller ? 1 : 0,
	};
	const weights: Record<string, number> = {
		withinWordLimit: 0.2,
		keywordPresent: 0.15,
		directOpening: 0.15,
		formatOk: 0.2,
		coverage: 0.15,
		noFiller: 0.15,
	};
	let total = 0;
	let sumW = 0;
	for (const [k, w] of Object.entries(weights)) {
		total += (checks[k] ?? 0) * w;
		sumW += w;
	}
	return { score: Math.round((total / sumW) * 1000) / 10, checks, wordCount };
}

function buildJudgeSystem(task: ShortTask): string {
	const criteria = JUDGE_CRITERIA.map((c) => `- ${c.key} (${c.label}) [0-10]: ${c.guidance}`).join('\n');
	const schema = {
		scores: Object.fromEntries(JUDGE_CRITERIA.map((c) => [c.key, 'number 0-10'])),
		reasons: Object.fromEntries(JUDGE_CRITERIA.map((c) => [c.key, 'short string'])),
		missingPoints: ['reference points not covered'],
		redFlags: ['wrong or misleading statements, guarantees, filler'],
	};
	return [
		'You are a strict evaluator of short SEO answers for a law firm.',
		'Score the answer ONLY against the reference points provided. Penalize factual errors heavily.',
		`Criteria:\n${criteria}`,
		'Return ONLY a JSON object with this shape:',
		JSON.stringify(schema, null, 2),
	].join('\n');
}

export interface ShortOptions {
	root: string;
	runDir: string;
	tasks: ShortTask[];
	modelsConfig: ModelsConfig;
	judgesConfig: JudgesConfig;
	modelIds: string[];
	concurrency: number;
	onLog?: (msg: string) => void;
}

export interface ShortReport {
	leaderboard: Array<{
		model: string;
		label: string;
		final: number;
		judge: number;
		det: number;
		accuracy: number;
		ok: number;
		total: number;
		avgLatencyMs: number;
	}>;
}

export async function runShort(opts: ShortOptions): Promise<ShortReport> {
	const shortDir = path.join(opts.runDir, 'short');
	ensureDir(path.join(shortDir, 'answers'));
	ensureDir(path.join(shortDir, 'raw'));
	ensureDir(path.join(shortDir, 'judge'));

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

	const jobs: Array<{ model: string; task: ShortTask }> = [];
	for (const model of opts.modelIds) {
		for (const task of opts.tasks) jobs.push({ model, task });
	}

	opts.onLog?.(`short: ${opts.modelIds.length} models x ${opts.tasks.length} tasks = ${jobs.length} calls`);
	const answers = await mapLimit(jobs, opts.concurrency, async (job): Promise<ShortAnswer> => {
		const modelCfg = opts.modelsConfig.models.find((m) => m.id === job.model);
		const label = modelCfg?.label ?? job.model;
		const rawPath = path.join(shortDir, 'raw', safeName(job.model), `${job.task.id}.json`);
		if (exists(rawPath)) {
			try {
				const cached = readJson<ShortAnswer>(rawPath);
				if (cached.ok && cached.answer.trim().length > 0) {
					opts.onLog?.(`skip  ${label} :: ${job.task.id}`);
					return cached;
				}
			} catch {
				// regenerate
			}
		}
		opts.onLog?.(`start ${label} :: ${job.task.id}`);
		let provider;
		try {
			provider = getProvider(modelCfg?.provider ?? '');
		} catch (e) {
			const err = e instanceof Error ? e.message : String(e);
			const failed: ShortAnswer = {
				model: job.model,
				modelLabel: label,
				taskId: job.task.id,
				lang: job.task.lang,
				ok: false,
				error: err,
				answer: '',
				latencyMs: 0,
				createdAt: new Date().toISOString(),
			};
			writeJson(rawPath, failed);
			return failed;
		}
		const res = await chatCompletion({
			provider,
			model: job.model,
			messages: [
				{ role: 'system', content: buildSystem(job.task) },
				{ role: 'user', content: job.task.question },
			],
			temperature: modelCfg?.temperature ?? opts.modelsConfig.defaults.temperature,
			maxTokens: job.task.type === 'seo_pack' ? 500 : 800,
			timeoutMs: modelCfg?.timeoutMs ?? opts.modelsConfig.defaults.timeoutMs,
		});
		const answerText = (res.content || res.reasoning || '').trim();
		const out: ShortAnswer = {
			model: job.model,
			modelLabel: label,
			taskId: job.task.id,
			lang: job.task.lang,
			ok: res.ok && answerText.length > 0,
			error: res.ok ? (answerText.length > 0 ? undefined : 'empty') : res.error,
			answer: answerText,
			latencyMs: res.latencyMs,
			totalTokens: res.usage.totalTokens,
			createdAt: new Date().toISOString(),
		};
		writeJson(rawPath, out);
		if (out.ok) {
			const ext = job.task.type === 'seo_pack' ? 'json' : 'md';
			writeText(path.join(shortDir, 'answers', safeName(job.model), `${job.task.id}.${ext}`), answerText);
			opts.onLog?.(`ok    ${label} :: ${job.task.id} (${Math.round(res.latencyMs / 1000)}s)`);
		} else {
			opts.onLog?.(`fail  ${label} :: ${job.task.id} (${out.error})`);
		}
		return out;
	});

	// deterministic metrics
	const detByKey = new Map<string, DetResult>();
	for (const a of answers) {
		if (!a.ok) continue;
		const task = opts.tasks.find((t) => t.id === a.taskId);
		if (!task) continue;
		detByKey.set(`${a.model}::${a.taskId}`, shortDeterministic(a.answer, task));
	}

	// judging
	const taskMap = new Map(opts.tasks.map((t) => [t.id, t]));
	const judgeScores: JudgeScore[] = [];
	const candidates = new Set(opts.modelIds);
	for (const judge of opts.judgesConfig.judges) {
		if (!opts.judgesConfig.allowSelfJudge && candidates.has(judge.model)) {
			opts.onLog?.(`judge ${judge.label} skipped (candidate)`);
			continue;
		}
		let provider;
		try {
			provider = getProvider(judge.provider);
		} catch (e) {
			opts.onLog?.(`judge ${judge.label} unavailable: ${e instanceof Error ? e.message : String(e)}`);
			continue;
		}
		const targets = answers.filter((a) => a.ok);
		const judged = await mapLimit(targets, Math.min(opts.concurrency, 4), async (a) => {
			const task = taskMap.get(a.taskId);
			if (!task) return null;
			const user = [
				`Question: ${task.question}`,
				`Primary keyword: ${task.primaryKeyword}`,
				'',
				'Required reference points:',
				...task.mustInclude.map((p) => `- ${p}`),
				task.reference ? `\nReference answer: ${task.reference}` : '',
				'',
				'ANSWER TO EVALUATE:',
				'"""',
				a.answer,
				'"""',
			].join('\n');
			const res = await chatCompletion({
				provider,
				model: judge.model,
				messages: [
					{ role: 'system', content: buildJudgeSystem(task) },
					{ role: 'user', content: user },
				],
				temperature: opts.judgesConfig.temperature,
				maxTokens: 4096,
				timeoutMs: Math.max(opts.modelsConfig.defaults.timeoutMs, 120000),
			});
			const parsed = extractJson(res.content || res.reasoning || '') as Record<string, unknown> | null;
			const scores: Record<string, number> = {};
			const reasons: Record<string, string> = {};
			for (const c of JUDGE_CRITERIA) {
				const rawScores = parsed?.scores as Record<string, unknown> | undefined;
				const v = rawScores?.[c.key];
				const num = typeof v === 'number' ? v : parseFloat(String(v));
				scores[c.key] = Number.isFinite(num) ? Math.max(0, Math.min(10, num)) : 0;
				const rawReasons = parsed?.reasons as Record<string, unknown> | undefined;
				reasons[c.key] = typeof rawReasons?.[c.key] === 'string' ? (rawReasons[c.key] as string) : '';
			}
			const score: JudgeScore = {
				model: a.model,
				titleId: a.taskId,
				judge: judge.label,
				ok: res.ok && parsed !== null,
				error: res.ok ? (parsed === null ? 'unparsable' : undefined) : res.error,
				scores,
				reasons,
				overallComment: typeof parsed?.overallComment === 'string' ? (parsed.overallComment as string) : undefined,
				redFlags: Array.isArray(parsed?.redFlags) ? (parsed?.redFlags as unknown[]).filter((x): x is string => typeof x === 'string') : [],
				latencyMs: res.latencyMs,
			};
			writeJson(path.join(shortDir, 'judge', safeName(judge.label), `${safeName(a.model)}__${a.taskId}.json`), score);
			return score;
		});
		judgeScores.push(...judged.filter((x): x is JudgeScore => x !== null));
		opts.onLog?.(`judge ${judge.label}: ${judgeScores.filter((j) => j.judge === judge.label && j.ok).length} scored`);
	}

	const judgeArticleScore = (scores: Record<string, number>): number => {
		let total = 0;
		let sumW = 0;
		for (const c of JUDGE_CRITERIA) {
			const v = scores[c.key];
			if (v === undefined) continue;
			total += v * c.weight;
			sumW += c.weight;
		}
		return sumW ? Math.round((total / sumW) * 10 * 10) / 10 : 0;
	};

	const aggregates: ShortReport['leaderboard'] = opts.modelIds.map((model) => {
		const modelCfg = opts.modelsConfig.models.find((m) => m.id === model);
		const modelAnswers = answers.filter((a) => a.model === model);
		const finals: number[] = [];
		const judges: number[] = [];
		const dets: number[] = [];
		const accuracies: number[] = [];
		for (const a of modelAnswers) {
			if (!a.ok) continue;
			const det = detByKey.get(`${model}::${a.taskId}`);
			const jList = judgeScores.filter((j) => j.model === model && j.titleId === a.taskId && j.ok);
			const jScore = jList.length ? jList.reduce((s, j) => s + judgeArticleScore(j.scores), 0) / jList.length : null;
			const detScore = det ? det.score : 0;
			const final = jScore === null ? detScore : Math.round((JUDGE_WEIGHT * jScore + DET_WEIGHT * detScore) * 10) / 10;
			finals.push(final);
			if (jScore !== null) judges.push(jScore);
			dets.push(detScore);
			const accVals = jList.map((j) => j.scores.accuracy ?? 0);
			if (accVals.length) accuracies.push((accVals.reduce((x, y) => x + y, 0) / accVals.length) * 10);
		}
		const avg = (arr: number[]) => (arr.length ? Math.round((arr.reduce((x, y) => x + y, 0) / arr.length) * 10) / 10 : 0);
		const lat = modelAnswers.filter((a) => a.ok).map((a) => a.latencyMs);
		return {
			model,
			label: modelCfg?.label ?? model,
			final: avg(finals),
			judge: avg(judges),
			det: avg(dets),
			accuracy: avg(accuracies),
			ok: modelAnswers.filter((a) => a.ok).length,
			total: modelAnswers.length,
			avgLatencyMs: lat.length ? Math.round(lat.reduce((x, y) => x + y, 0) / lat.length) : 0,
		};
	});
	aggregates.sort((a, b) => b.final - a.final);

	// report
	const lines: string[] = [];
	lines.push(`# Short SEO Benchmark — ${path.basename(opts.runDir)}`);
	lines.push('');
	lines.push(
		`${opts.modelIds.length} models × ${opts.tasks.length} short tasks. Final = ${JUDGE_WEIGHT * 100}% judge (accuracy-weighted) + ${DET_WEIGHT * 100}% deterministic.`,
	);
	lines.push('');
	lines.push('| # | Model | Final | Judge | Det | Accuracy | OK | Avg latency |');
	lines.push('| --- | --- | --- | --- | --- | --- | --- | --- |');
	aggregates.forEach((a, i) => {
		lines.push(
			`| ${i + 1} | ${a.label} \`${a.model}\` | ${a.final.toFixed(1)} | ${a.judge.toFixed(1)} | ${a.det.toFixed(1)} | ${a.accuracy.toFixed(1)} | ${a.ok}/${a.total} | ${(a.avgLatencyMs / 1000).toFixed(1)}s |`,
		);
	});
	lines.push('');
	lines.push('## Per-task finals');
	lines.push('');
	lines.push(`| Task | ${aggregates.map((a) => a.label).join(' | ')} |`);
	lines.push(`| --- | ${aggregates.map(() => '---').join(' | ')} |`);
	for (const task of opts.tasks) {
		const cells = aggregates.map((a) => {
			const det = detByKey.get(`${a.model}::${task.id}`);
			const jList = judgeScores.filter((j) => j.model === a.model && j.titleId === task.id && j.ok);
			const jScore = jList.length ? jList.reduce((s, j) => s + judgeArticleScore(j.scores), 0) / jList.length : null;
			const detScore = det ? det.score : 0;
			const final = jScore === null ? detScore : JUDGE_WEIGHT * jScore + DET_WEIGHT * detScore;
			return final ? final.toFixed(1) : 'FAIL';
		});
		lines.push(`| ${task.id} | ${cells.join(' | ')} |`);
	}
	lines.push('');
	writeText(path.join(shortDir, 'SHORT_REPORT.md'), lines.join('\n'));
	writeJson(path.join(shortDir, 'short-scores.json'), { leaderboard: aggregates, tasks: opts.tasks, judgeScores });
	const csv = [
		'model,label,final,judge,det,accuracy,ok,total',
		...aggregates.map((a) => [a.model, `"${a.label}"`, a.final, a.judge, a.det, a.accuracy, a.ok, a.total].join(',')),
	].join('\n');
	writeText(path.join(shortDir, 'short-scores.csv'), csv);

	opts.onLog?.(`short report: ${path.join(shortDir, 'SHORT_REPORT.md')}`);
	for (const [i, a] of aggregates.entries()) opts.onLog?.(`  ${i + 1}. ${a.label} — final ${a.final} (judge ${a.judge}, det ${a.det})`);

	return { leaderboard: aggregates };
}
