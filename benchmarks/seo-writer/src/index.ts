import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadJudgesConfig, loadModelsConfig, loadRubricConfig, chatCompletion, resolveProvider } from './client.ts';
import { ensureRunDirs, loadTitles, runGenerate, selectModels } from './generate.ts';
import { computeMetrics, weightedSeoScore } from './metrics.ts';
import { runJudge } from './judge.ts';
import { loadAgentReview, writeReviewPacket } from './review.ts';
import { computeReport, writeReport } from './report.ts';
import { loadShortTasks, runShort } from './short.ts';
import type { GeneratedArticle, JudgeScore } from './types.ts';
import { ensureDir, exists, readJson, timestamp, writeJson } from './util.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RUNS_DIR = path.join(ROOT, 'output', 'runs');

interface Args {
	stage: 'generate' | 'metrics' | 'judge' | 'review' | 'report' | 'probe' | 'short' | 'all';
	profile: 'quick' | 'full';
	titles: string;
	titlesExplicit: boolean;
	tasks: string;
	models: string;
	run: string | null;
	latest: boolean;
	repeats: number;
	force: boolean;
	concurrency: number;
	limit: number | null;
	date: string | null;
	tier: string | null;
}

function parseArgs(argv: string[]): Args {
	const args: Args = {
		stage: 'all',
		profile: 'quick',
		titles: path.join(ROOT, 'titles', 'quick.json'),
		titlesExplicit: false,
		tasks: path.join(ROOT, 'tasks', 'short.json'),
		models: 'enabled',
		run: null,
		latest: false,
		repeats: 1,
		force: false,
		concurrency: 10,
		limit: null,
		date: null,
		tier: null,
	};
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		const next = () => argv[++i];
		switch (a) {
			case '--stage':
				args.stage = next() as Args['stage'];
				break;
			case '--profile':
				args.profile = next() as Args['profile'];
				break;
			case '--titles':
				args.titles = path.resolve(ROOT, next() as string);
				args.titlesExplicit = true;
				break;
			case '--tasks':
				args.tasks = path.resolve(ROOT, next() as string);
				break;
			case '--models':
				args.models = next() as string;
				break;
			case '--run':
				args.run = next() as string;
				break;
			case '--latest':
				args.latest = true;
				break;
			case '--repeats':
				args.repeats = parseInt(next() as string, 10);
				break;
			case '--force':
				args.force = true;
				break;
			case '--concurrency':
				args.concurrency = parseInt(next() as string, 10);
				break;
			case '--limit':
				args.limit = parseInt(next() as string, 10);
				break;
			case '--date':
				args.date = next() as string;
				break;
			case '--tier':
				args.tier = next() as string;
				break;
			default:
				if (a.startsWith('--')) throw new Error(`unknown flag: ${a}`);
		}
	}
	if (args.profile === 'full' && !args.titlesExplicit) {
		args.titles = path.join(ROOT, 'titles', 'titles.json');
	}
	if (!['generate', 'metrics', 'judge', 'review', 'report', 'probe', 'short', 'all'].includes(args.stage)) {
		throw new Error(`invalid --stage: ${args.stage}`);
	}
	return args;
}

function log(msg: string): void {
	process.stdout.write(`[${new Date().toISOString().slice(11, 19)}] ${msg}\n`);
}

function listRunDirs(): string[] {
	if (!exists(RUNS_DIR)) return [];
	return fs
		.readdirSync(RUNS_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => path.join(RUNS_DIR, d.name))
		.sort();
}

function resolveRunDir(args: Args): string {
	if (args.latest) {
		const dirs = listRunDirs();
		if (dirs.length === 0) throw new Error('no runs found; run --stage generate first');
		return dirs[dirs.length - 1] as string;
	}
	if (args.run) {
		return path.isAbsolute(args.run) ? args.run : path.join(RUNS_DIR, args.run);
	}
	return path.join(RUNS_DIR, timestamp());
}

function loadArticles(runDir: string): GeneratedArticle[] {
	const rawDir = path.join(runDir, 'raw');
	if (!exists(rawDir)) return [];
	const out: GeneratedArticle[] = [];
	for (const modelDir of fs.readdirSync(rawDir, { withFileTypes: true })) {
		if (!modelDir.isDirectory()) continue;
		const dir = path.join(rawDir, modelDir.name);
		for (const f of fs.readdirSync(dir)) {
			if (!f.endsWith('.json')) continue;
			try {
				out.push(readJson<GeneratedArticle>(path.join(dir, f)));
			} catch {
				// skip corrupt
			}
		}
	}
	return out;
}

function loadMetrics(runDir: string): Array<{ model: string; titleId: string; metrics: ReturnType<typeof computeMetrics> }> | null {
	const p = path.join(runDir, 'metrics.json');
	if (!exists(p)) return null;
	try {
		return readJson(p);
	} catch {
		return null;
	}
}

function loadJudgeScores(runDir: string): JudgeScore[] {
	const judgeDir = path.join(runDir, 'judge');
	if (!exists(judgeDir)) return [];
	const out: JudgeScore[] = [];
	for (const sub of fs.readdirSync(judgeDir, { withFileTypes: true })) {
		if (!sub.isDirectory()) continue;
		const dir = path.join(judgeDir, sub.name);
		for (const f of fs.readdirSync(dir)) {
			if (!f.endsWith('.json')) continue;
			try {
				out.push(readJson<JudgeScore>(path.join(dir, f)));
			} catch {
				// skip
			}
		}
	}
	return out;
}

async function probeModels(modelIds: string[], modelsConfig: ReturnType<typeof loadModelsConfig>): Promise<void> {
	log(`probing ${modelIds.length} models with a tiny prompt...`);
	await Promise.all(
		modelIds.map(async (id) => {
			const m = modelsConfig.models.find((x) => x.id === id);
			const label = m?.label ?? id;
			const started = Date.now();
			try {
				const provider = resolveProvider(m?.provider ?? '', modelsConfig.providers[m?.provider ?? ''] ?? { baseURL: '' });
				const res = await chatCompletion({
					provider,
					model: id,
					messages: [{ role: 'user', content: 'Reply with exactly: OK' }],
					maxTokens: 64,
					timeoutMs: 30000,
				});
				const secs = ((Date.now() - started) / 1000).toFixed(1);
				if (res.ok) log(`  ok    ${label} (${secs}s) "${res.content.trim().slice(0, 20)}"`);
				else log(`  FAIL  ${label} (${secs}s) ${res.error}`);
			} catch (e) {
				log(`  FAIL  ${label} (${((Date.now() - started) / 1000).toFixed(1)}s) ${e instanceof Error ? e.message : String(e)}`);
			}
		}),
	);
}

async function main(): Promise<void> {
	const args = parseArgs(process.argv.slice(2));
	const modelsConfig = loadModelsConfig(ROOT);
	const rubric = loadRubricConfig(ROOT);
	const judgesConfig = loadJudgesConfig(ROOT);

	const allTitles = loadTitles(args.titles);
	const titles = args.limit ? allTitles.slice(0, args.limit) : allTitles;

	let modelIds = selectModels(modelsConfig, args.models);
	if (args.tier) {
		const allowed = new Set(modelsConfig.models.filter((m) => m.tier === args.tier).map((m) => m.id));
		modelIds = modelIds.filter((m) => allowed.has(m));
	}

	if (args.stage === 'probe') {
		await probeModels(modelIds, modelsConfig);
		return;
	}

	const runDir = resolveRunDir(args);
	ensureRunDirs(runDir);

	const runName = path.basename(runDir);
	const metaPath = path.join(runDir, 'meta.json');
	if (!exists(metaPath)) {
		writeJson(metaPath, {
			run: runName,
			createdAt: new Date().toISOString(),
			titlesFile: args.titles,
			models: modelIds,
			repeats: args.repeats,
			titles: titles.map((t) => t.id),
		});
	}

	log(`run: ${runDir}`);
	log(`stage: ${args.stage} | titles: ${titles.length} | models: ${modelIds.length}`);

	if (args.stage === 'short') {
		const tasks = loadShortTasks(args.tasks);
		await runShort({
			root: ROOT,
			runDir,
			tasks,
			modelsConfig,
			judgesConfig,
			modelIds,
			concurrency: args.concurrency,
			onLog: log,
		});
		return;
	}

	const stage = args.stage;
	const doGenerate = stage === 'generate' || stage === 'all';
	const doMetrics = stage === 'metrics' || stage === 'all';
	const doJudge = stage === 'judge' || stage === 'all';
	const doReview = stage === 'review' || stage === 'all';
	const doReport = stage === 'report' || stage === 'all';

	if (doGenerate) {
		await runGenerate({
			root: ROOT,
			runDir,
			titles,
			modelsConfig,
			modelIds,
			repeats: args.repeats,
			force: args.force,
			concurrency: args.concurrency,
			dateStr: args.date ?? '',
			onLog: log,
		});
	}

	let articles = loadArticles(runDir);
	log(`articles on disk: ${articles.filter((a) => a.ok).length} ok / ${articles.length} total`);

	let metricsList = doMetrics ? null : loadMetrics(runDir);
	if (doMetrics) {
		metricsList = [];
		for (const article of articles) {
			if (!article.ok) continue;
			const title = titles.find((t) => t.id === article.titleId);
			if (!title) continue;
			const m = computeMetrics(article.content, title);
			const weights = Object.fromEntries(rubric.deterministic.checks.map((c) => [c.key, c.weight]));
			m.seoScore = weightedSeoScore(m, weights);
			metricsList.push({ model: article.model, titleId: article.titleId, metrics: m });
		}
		writeJson(path.join(runDir, 'metrics.json'), metricsList);
		log(`metrics computed: ${metricsList.length}`);
	}

	let judgeScores = doJudge ? null : loadJudgeScores(runDir);
	if (doJudge) {
		judgeScores = await runJudge({
			root: ROOT,
			runDir,
			titles,
			articles,
			rubric,
			judgesConfig,
			modelsConfig,
			concurrency: args.concurrency,
			onLog: log,
		});
		writeJson(path.join(runDir, 'judge-index.json'), judgeScores);
		log(`judge scores: ${judgeScores.filter((j) => j.ok).length}`);
	}

	if (doReview && judgeScores) {
		articles = loadArticles(runDir);
		writeReviewPacket({
			root: ROOT,
			runDir,
			titles,
			articles,
			judgeScores,
			deterministic: Object.fromEntries(
				(metricsList ?? loadMetrics(runDir) ?? []).map((m) => [`${m.model}::${m.titleId}`, m.metrics.seoScore]),
			),
		});
		log(`review packet written: ${path.join(runDir, 'REVIEW.md')}`);
	}

	if (doReport) {
		articles = loadArticles(runDir);
		const metrics = metricsList ?? loadMetrics(runDir) ?? [];
		const judge = judgeScores ?? loadJudgeScores(runDir);
		const agentReviews = loadAgentReview(runDir);
		const modelMeta: Record<string, { label: string; tier: string }> = {};
		for (const m of modelsConfig.models) modelMeta[m.id] = { label: m.label, tier: m.tier };
		const out = computeReport({
			runDir,
			runName,
			titles,
			articles,
			judgeScores: judge,
			metrics,
			agentReviews,
			rubric,
			modelMeta,
		});
		writeReport(
			{
				runDir,
				runName,
				titles,
				articles,
				judgeScores: judge,
				metrics,
				agentReviews,
				rubric,
				modelMeta,
			},
			out,
		);
		log(`report written: ${path.join(runDir, 'REPORT.md')}`);
		log('leaderboard:');
		for (const [i, a] of out.aggregates.entries()) {
			log(`  ${i + 1}. ${a.label} — final ${a.finalScore} (judge ${a.judgeScore}, det ${a.deterministicScore}, agent ${a.agentScore ?? 'n/a'})`);
		}
	}
}

main().catch((e) => {
	process.stderr.write(`error: ${e instanceof Error ? e.stack ?? e.message : String(e)}\n`);
	process.exit(1);
});
