import path from 'node:path';
import { chatCompletion, type ResolvedProvider } from './client.ts';
import type { DetMetrics, FalseClaim, JudgeVerdict, PageRequest, RubricConfig } from './types.ts';
import { asArray, asString, clamp, extractJson, readText } from './util.ts';

export interface JudgeOptions {
	root: string;
	provider: ResolvedProvider;
	model: string;
	request: PageRequest;
	content: string;
	metrics: DetMetrics;
	rubric: RubricConfig;
	round: number;
	temperature: number;
	maxTokens: number;
	timeoutMs: number;
	universeContext?: string;
}

function buildSystem(root: string, rubric: RubricConfig, lang: 'tr' | 'en', universeContext?: string): string {
	const role = readText(path.join(root, 'prompts', `judger.${lang}.md`));
	const scale = rubric.judgeScale;
	const criteria = rubric.judge
		.map((c) => `- ${c.key} (${c.label}) [0-${scale}]: ${c.guidance}`)
		.join('\n');
	const schema = {
		verdict: 'pass | revise',
		score: `number 0-${scale} (weighted overall)`,
		scores: Object.fromEntries(rubric.judge.map((c) => [c.key, `number 0-${scale}`])),
		reasons: Object.fromEntries(rubric.judge.map((c) => [c.key, 'short string'])),
		gaps: ['missing or shallow points'],
		falseClaims: [{ claim: 'the claim', problem: 'why it is wrong/unsupported' }],
		requiredEdits: ['concrete, actionable fix'],
		createEnglishVersion: 'true | false',
		notes: 'short overall note',
	};
	return [
		role,
		'',
		`RUBRİK / RUBRIC (her kriter 0-${scale}):`,
		criteria,
		'',
		'Döndürülecek JSON şeması / JSON shape to return:',
		JSON.stringify(schema, null, 2),
		universeContext
			? `\n--- KEYWORD UNIVERSE (must be respected) ---\n${universeContext}\n\nAdditional required checks:\n- PRIMARY KEYWORD: the target keyword for THIS page must appear naturally in the title, first 100 words, description, and at least one H2.\n- CANNIBALIZATION: this page must clearly target its own keyword/intent. If it overlaps substantially with a sibling page's keyword or intent, set verdict=revise and explain under gaps.\n- INTERNAL LINKS: at least one internal link must point to the pillar or a sibling page listed above (using the planned URL). If not, add it to requiredEdits.\n- Flag any off-universe drift (content that belongs to a sibling page) under gaps.`
			: '',
	]
		.filter(Boolean)
		.join('\n');
}

function numberFrom(v: unknown, fallback = 0): number {
	const n = typeof v === 'number' ? v : parseFloat(String(v));
	return Number.isFinite(n) ? n : fallback;
}

function stringArray(v: unknown): string[] {
	return asArray(v).filter((x): x is string => typeof x === 'string' && x.trim().length > 0).map((x) => x.trim());
}

export async function judgeDraft(opts: JudgeOptions): Promise<JudgeVerdict> {
	const { rubric, request } = opts;
	const system = buildSystem(opts.root, rubric, request.lang, opts.universeContext);
	const checksSummary = {
		seoScore: opts.metrics.seoScore,
		wordCount: opts.metrics.wordCount,
		titleLength: opts.metrics.titleLength,
		descriptionLength: opts.metrics.descriptionLength,
		h2Count: opts.metrics.h2Count,
		faqCount: opts.metrics.faqCount,
		internalLinkCount: opts.metrics.internalLinkCount,
		density: opts.metrics.keywordDensity,
		checks: opts.metrics.checks,
	};
	const user = [
		`Tur / Round: ${opts.round}`,
		`Hedef başlık / Target title: ${request.title}`,
		`Birincil anahtar kelime / Primary keyword: ${request.primaryKeyword}`,
		`Hizmet etiketi / Service tag: ${request.serviceTag}`,
		'',
		'Deterministik SEO kontrolleri (0-1) / Deterministic checks (0-1):',
		JSON.stringify(checksSummary, null, 2),
		'',
		request.lang === 'tr' ? 'YAZI / ARTICLE:' : 'ARTICLE:',
		'"""',
		opts.content,
		'"""',
	].join('\n');

	const res = await chatCompletion({
		provider: opts.provider,
		model: opts.model,
		messages: [
			{ role: 'system', content: system },
			{ role: 'user', content: user },
		],
		temperature: opts.temperature,
		maxTokens: opts.maxTokens,
		timeoutMs: opts.timeoutMs,
	});

	const parsed = extractJson(res.ok ? res.content : res.reasoning || res.content) as Record<string, unknown> | null;

	const scores: Record<string, number> = {};
	const reasons: Record<string, string> = {};
	for (const c of rubric.judge) {
		const rawScores = parsed?.scores as Record<string, unknown> | undefined;
		scores[c.key] = clamp(numberFrom(rawScores?.[c.key], 0), 0, rubric.judgeScale);
		const rawReasons = parsed?.reasons as Record<string, unknown> | undefined;
		reasons[c.key] = asString(rawReasons?.[c.key]);
	}

	const weighted =
		rubric.judge.reduce((sum, c) => sum + scores[c.key] * c.weight, 0) /
		Math.max(0.0001, rubric.judge.reduce((s, c) => s + c.weight, 0));

	const falseClaims: FalseClaim[] = asArray(parsed?.falseClaims)
		.map((x) => {
			const o = x as Record<string, unknown>;
			return { claim: asString(o?.claim), problem: asString(o?.problem) };
		})
		.filter((x) => x.claim.length > 0 || x.problem.length > 0);

	const verdictRaw = asString(parsed?.verdict).toLowerCase();

	return {
		round: opts.round,
		verdict: verdictRaw === 'pass' ? 'pass' : 'revise',
		score: parsed?.score !== undefined ? numberFrom(parsed.score, weighted) : Math.round(weighted * 10) / 10,
		scores,
		reasons,
		gaps: stringArray(parsed?.gaps),
		falseClaims,
		requiredEdits: stringArray(parsed?.requiredEdits),
		createEnglishVersion: parsed?.createEnglishVersion === true,
		notes: asString(parsed?.notes) || undefined,
		ok: res.ok && parsed !== null,
		error: res.ok ? (parsed === null ? 'unparsable judge JSON' : undefined) : res.error,
		latencyMs: res.latencyMs,
	};
}
