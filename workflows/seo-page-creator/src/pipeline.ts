import fs from 'node:fs';
import path from 'node:path';
import { resolveProvider, type ResolvedProvider } from './client.ts';
import { judgeDraft } from './judger.ts';
import { formatUniverseContext, loadUniverse } from './research.ts';
import { computeMetrics, weightedSeoScore } from './seo-metrics.ts';
import { writeDraft, type WriteFeedback } from './writer.ts';
import type {
	ApprovedPage,
	ModelEntry,
	ModelsConfig,
	PageRequest,
	PolicyConfig,
	RubricConfig,
} from './types.ts';
import { ensureDir, slugify, writeJson, writeText } from './util.ts';
import { parseStrictFrontmatter, normalizeFrontmatter, injectServiceTag } from './yaml.ts';

export interface PipelineOptions {
	root: string;
	runDir: string;
	requests: PageRequest[];
	modelsConfig: ModelsConfig;
	rubric: RubricConfig;
	policy: PolicyConfig;
	maxRounds: number;
	threshold: number;
	allowedSlugs?: string[];
	onLog?: (msg: string) => void;
}

export interface PipelineResult {
	approved: ApprovedPage[];
	failed: Array<{ request: PageRequest; reason: string }>;
}

function detWeights(rubric: RubricConfig): Record<string, number> {
	return Object.fromEntries(rubric.deterministic.map((c) => [c.key, c.weight]));
}

function failingChecks(checks: Record<string, number>): string[] {
	return Object.entries(checks)
		.filter(([, v]) => v < 0.6)
		.map(([k, v]) => `${k} (${Math.round(v * 100)}%)`);
}

function isQuotaError(err: string | undefined): boolean {
	return !!err && /429|rate limit|quota|too many requests/i.test(err);
}

function collectExistingSlugs(workflowRoot: string): Record<'tr' | 'en', string[]> {
	const repoRoot = path.resolve(workflowRoot, '..', '..');
	const out: Record<'tr' | 'en', string[]> = { tr: [], en: [] };
	for (const lang of ['tr', 'en'] as const) {
		const dir = path.join(repoRoot, 'src', 'content', 'posts', lang);
		if (!fs.existsSync(dir)) continue;
		out[lang] = fs
			.readdirSync(dir)
			.filter((f) => /\.mdx?$/.test(f))
			.map((f) => f.replace(/\.mdx?$/, ''));
	}
	return out;
}

function extractBlogLinkSlugs(content: string): string[] {
	const found = new Set<string>();
	const strip = (u: string) => u.replace(/^\/(?:en\/)?blog\//, '').replace(/\/+$/, '');
	const patterns = [/\]\(\s*(\/(?:en\/)?blog\/[a-z0-9-]+)/g, /href:\s*"?(\/(?:en\/)?blog\/[a-z0-9-]+)"?/g];
	for (const re of patterns) {
		let m: RegExpExecArray | null;
		while ((m = re.exec(content)) !== null) found.add(strip(m[1] as string));
	}
	return [...found];
}

export async function runPipeline(opts: PipelineOptions): Promise<PipelineResult> {
	const weights = detWeights(opts.rubric);
	const providerCache = new Map<string, ResolvedProvider>();
	const getProvider = (name: string): ResolvedProvider => {
		const cached = providerCache.get(name);
		if (cached) return cached;
		const cfg = opts.modelsConfig.providers[name];
		if (!cfg) throw new Error(`unknown provider "${name}"`);
		const resolved = resolveProvider(name, cfg);
		providerCache.set(name, resolved);
		return resolved;
	};

	const judgeProvider = getProvider(opts.modelsConfig.judge.provider);
	const defaults = opts.modelsConfig.defaults;
	const j = opts.modelsConfig.judge;
	const dateStr = new Date().toISOString().slice(0, 10);
	const existingByLang = collectExistingSlugs(opts.root);
	const existingSlugs = new Set([...existingByLang.tr, ...existingByLang.en]);
	const activeSlugs = new Set<string>([
		...(opts.allowedSlugs ?? []),
		...opts.requests.map((r) => (r.slug && r.slug.trim() ? r.slug.trim() : slugify(r.title))),
	]);

	// Active writer starts as the configured writer and may switch to the
	// fallback (DeepSeek) if Gemini returns 429/quota errors.
	let activeWriter: ModelEntry = opts.modelsConfig.writer;
	let activeWriterProvider = getProvider(activeWriter.provider);
	let switchedToFallback = false;

	async function callWriter(
		round: number,
		request: PageRequest,
		universeContext: string | undefined,
		linkTargets: string[],
		feedback?: WriteFeedback,
	) {
		const attempt = (writer: ModelEntry, provider: ResolvedProvider) =>
			writeDraft({
				root: opts.root,
				provider,
				model: writer.id,
				request,
				dateStr,
				round,
				temperature: writer.temperature ?? defaults.temperature,
				maxTokens: writer.maxTokens ?? defaults.maxTokens,
				timeoutMs: writer.timeoutMs ?? defaults.timeoutMs,
				feedback,
				universeContext,
				linkTargets,
			});

		let draft = await attempt(activeWriter, activeWriterProvider);
		const fallback = opts.modelsConfig.writerFallback;
		if (!draft.ok && fallback && !switchedToFallback && isQuotaError(draft.error)) {
			const cfg = opts.modelsConfig.providers[fallback.provider];
			if (cfg) {
				activeWriter = fallback;
				activeWriterProvider = getProvider(fallback.provider);
				switchedToFallback = true;
				opts.onLog?.(`  writer quota/429 → switching to fallback: ${fallback.label}`);
				draft = await attempt(activeWriter, activeWriterProvider);
			}
		}
		return draft;
	}

	ensureDir(path.join(opts.runDir, 'drafts'));
	ensureDir(path.join(opts.runDir, 'verdicts'));
	ensureDir(path.join(opts.runDir, 'final'));

	const approved: ApprovedPage[] = [];
	const failed: PipelineResult['failed'] = [];

	for (const request of opts.requests) {
		const slug = request.slug && request.slug.trim() ? request.slug.trim() : slugify(request.title);
		opts.onLog?.(`page ${slug} (${request.lang}) — rounds up to ${opts.maxRounds}`);

		const allowedLinks = new Set<string>([...existingSlugs, ...activeSlugs]);
		const linkBase = request.lang === 'en' ? '/en/blog/' : '/blog/';
		const linkTargets = existingByLang[request.lang].map((s) => `${linkBase}${s}`);
		let universeContext: string | undefined;
		if (request.universe) {
			const uni = loadUniverse(opts.root, request.universe);
			if (uni) {
				const pillarSlug = uni.pillar?.slug
					? uni.pillar.slug.trim().replace(/^\/(?:en\/)?blog\//, '')
					: slugify(uni.pillar?.title ?? '');
				if (pillarSlug) allowedLinks.add(pillarSlug);
				universeContext = formatUniverseContext(uni, request.clusterId, activeSlugs);
				opts.onLog?.(`  universe: ${request.universe}${request.clusterId ? ` / ${request.clusterId}` : ''}`);
			} else {
				opts.onLog?.(`  universe "${request.universe}" not found — proceeding without`);
			}
		}

		let feedback: WriteFeedback | undefined;
		let lastVerdictOk = false;
		let lastReason = 'not approved';

		for (let round = 1; round <= opts.maxRounds; round++) {
			const draft = await callWriter(round, request, universeContext, linkTargets, feedback);

			if (!draft.ok) {
				lastReason = `writer failed: ${draft.error ?? 'unknown'}`;
				opts.onLog?.(`  r${round} writer FAIL: ${draft.error}`);
				break;
			}

			const normalized = injectServiceTag(normalizeFrontmatter(draft.content), request.serviceTag);
			writeText(path.join(opts.runDir, 'drafts', `${slug}.r${round}.md`), normalized);

			const strict = parseStrictFrontmatter(normalized);
			if (!strict.ok) {
				lastReason = `invalid frontmatter YAML: ${strict.error}`;
				opts.onLog?.(`  r${round} YAML INVALID: ${strict.error}`);
				if (round < opts.maxRounds) {
					feedback = {
						requiredEdits: [
							`Frontmatter geçersiz YAML (${strict.error}). Her alanı AYRI satıra yaz; bir satıra iki alan (ör. q ve a veya name ve text) yazma. title ve description değerlerini tırnak içinde tut.`,
						],
						gaps: [],
						falseClaims: [],
						deterministicFails: ['frontmatterYaml'],
					};
					continue;
				}
				break;
			}

			const brokenLinks = extractBlogLinkSlugs(normalized).filter((s) => !allowedLinks.has(s));
			const metrics = computeMetrics(normalized, request);
			metrics.seoScore = weightedSeoScore(metrics, weights);

			const verdict = await judgeDraft({
				root: opts.root,
				provider: judgeProvider,
				model: j.id,
				request,
				content: normalized,
				metrics,
				rubric: opts.rubric,
				round,
				temperature: j.temperature ?? 0,
				maxTokens: j.maxTokens ?? defaults.maxTokens,
				timeoutMs: j.timeoutMs ?? defaults.timeoutMs,
				universeContext,
			});
			writeJson(path.join(opts.runDir, 'verdicts', `${slug}.r${round}.json`), verdict);

			if (!verdict.ok) {
				lastReason = `judge failed: ${verdict.error ?? 'unknown'}`;
				opts.onLog?.(`  r${round} judge FAIL: ${verdict.error}`);
				break;
			}

			const passes =
				verdict.score >= opts.threshold &&
				verdict.falseClaims.length === 0 &&
				brokenLinks.length === 0;
			opts.onLog?.(
				`  r${round} judge=${verdict.score} det=${metrics.seoScore} verdict=${verdict.verdict}` +
					` gaps=${verdict.gaps.length} false=${verdict.falseClaims.length} edits=${verdict.requiredEdits.length}` +
					(brokenLinks.length ? ` brokenLinks=${brokenLinks.join(',')}` : ''),
			);

			if (passes) {
				writeText(path.join(opts.runDir, 'final', `${slug}.md`), normalized);
				approved.push({ request, slug, content: normalized, verdict, metrics, rounds: round });
				lastVerdictOk = true;
				break;
			}

			if (round < opts.maxRounds) {
				const linkEdits = brokenLinks.length
					? [
							`Remove or fix internal links to pages that do not exist yet: ${brokenLinks.join(', ')}. Only link to these live URLs: ${[...allowedLinks].map((s) => `/${request.lang === 'en' ? 'en/' : ''}blog/${s}`).join(', ')}.`,
						]
					: [];
				feedback = {
					requiredEdits: [...verdict.requiredEdits, ...linkEdits],
					gaps: verdict.gaps,
					falseClaims: verdict.falseClaims,
					deterministicFails: [
						...failingChecks(metrics.checks),
						...(brokenLinks.length ? brokenLinks.map((s) => `brokenLink:${s}`) : []),
					],
				};
			} else {
				lastReason = `not approved after ${opts.maxRounds} rounds (last score ${verdict.score}${brokenLinks.length ? `, broken links: ${brokenLinks.join(', ')}` : ''})`;
			}
		}

		if (!lastVerdictOk) {
			failed.push({ request, reason: lastReason });
			opts.onLog?.(`  ✗ ${slug}: ${lastReason}`);
		} else {
			opts.onLog?.(`  ✓ ${slug}: approved`);
		}
	}

	return { approved, failed };
}
