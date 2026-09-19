import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	chatCompletion,
	loadModelsConfig,
	loadPolicyConfig,
	loadRubricConfig,
	resolveProvider,
} from './client.ts';
import { runPipeline } from './pipeline.ts';
import { buildPagePlan, canonicalPageUrl, commitAndPush, updateLlms, verifyBuild, type PagePlan } from './publish.ts';
import { buildUniverse, loadResearchConfig } from './research.ts';
import { findRequest, loadQueue } from './request.ts';
import type { PageRequest } from './types.ts';
import { ensureDir, exists, slugify, timestamp, writeJson, writeText } from './util.ts';
import { parseStrictFrontmatter } from './yaml.ts';

const WORKFLOW_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = path.resolve(WORKFLOW_ROOT, '..', '..');
const RUNS_DIR = path.join(WORKFLOW_ROOT, 'output', 'runs');

const EN_TAG: Record<string, string> = {
	'aile-hukuku': 'family-law',
	'miras-hukuku': 'inheritance-law',
	'sirketler-hukuku': 'corporate-law',
	'fikri-mulkiyet': 'intellectual-property',
	'is-hukuku': 'employment-law',
	gayrimenkul: 'real-estate',
	'ticaret-hukuku': 'commercial-law',
	'icra-tahsilat': 'debt-collection',
	espor: 'esports-law',
};

interface Args {
	stage: 'probe' | 'create' | 'status' | 'links' | 'research';
	queue: string;
	request: string | null;
	run: string | null;
	latest: boolean;
	maxRounds: number | null;
	threshold: number | null;
	force: boolean;
	publish: boolean;
	push: boolean;
	noBuild: boolean;
	autoEn: boolean;
	limit: number | null;
	topic: string | null;
	lang: string | null;
}

function parseArgs(argv: string[]): Args {
	const args: Args = {
		stage: 'create',
		queue: path.join(WORKFLOW_ROOT, 'requests', 'queue.json'),
		request: null,
		run: null,
		latest: false,
		maxRounds: null,
		threshold: null,
		force: false,
		publish: false,
		push: false,
		noBuild: false,
		autoEn: false,
		limit: null,
		topic: null,
		lang: null,
	};
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		const next = () => argv[++i];
		switch (a) {
			case '--stage':
				args.stage = next() as Args['stage'];
				break;
			case '--queue':
				args.queue = path.resolve(WORKFLOW_ROOT, next() as string);
				break;
			case '--request':
				args.request = next() as string;
				break;
			case '--run':
				args.run = next() as string;
				break;
			case '--latest':
				args.latest = true;
				break;
			case '--max-rounds':
				args.maxRounds = parseInt(next() as string, 10);
				break;
			case '--threshold':
				args.threshold = parseFloat(next() as string);
				break;
			case '--force':
				args.force = true;
				break;
			case '--publish':
				args.publish = true;
				break;
			case '--push':
				args.push = true;
				break;
			case '--no-build':
				args.noBuild = true;
				break;
			case '--auto-en':
				args.autoEn = true;
				break;
			case '--limit':
				args.limit = parseInt(next() as string, 10);
				break;
			case '--topic':
				args.topic = next() as string;
				break;
			case '--lang':
				args.lang = next() as string;
				break;
			default:
				if (a.startsWith('--')) throw new Error(`unknown flag: ${a}`);
		}
	}
	if (!['probe', 'create', 'status', 'links', 'research'].includes(args.stage)) throw new Error(`invalid --stage: ${args.stage}`);
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
		if (dirs.length === 0) throw new Error('no runs found');
		return dirs[dirs.length - 1] as string;
	}
	if (args.run) return path.isAbsolute(args.run) ? args.run : path.join(RUNS_DIR, args.run);
	return path.join(RUNS_DIR, timestamp());
}

function selectRequests(args: Args): PageRequest[] {
	const all = loadQueue(args.queue);
	const chosen = args.request ? [findRequest(all, args.request)] : all;
	return args.limit ? chosen.slice(0, args.limit) : chosen;
}

function englishRequest(req: PageRequest): PageRequest {
	return {
		id: `${req.id}-en`,
		lang: 'en',
		title: req.title,
		primaryKeyword: req.primaryKeyword,
		serviceTag: EN_TAG[req.serviceTag] ?? req.serviceTag,
		slug: req.slug,
		intent: req.intent,
		notes: `English version for international clients. ${req.notes ?? ''}`.trim(),
	};
}

async function main(): Promise<void> {
	const args = parseArgs(process.argv.slice(2));
	const modelsConfig = loadModelsConfig(WORKFLOW_ROOT);
	const rubric = loadRubricConfig(WORKFLOW_ROOT);
	const policy = loadPolicyConfig(WORKFLOW_ROOT);
	const maxRounds = args.maxRounds ?? policy.maxRounds;
	const threshold = args.threshold ?? rubric.passThreshold;

	if (args.stage === 'status') {
		const dirs = listRunDirs();
		if (dirs.length === 0) {
			log('no runs yet');
			return;
		}
		for (const d of dirs.slice(-10)) log(path.relative(WORKFLOW_ROOT, d));
		return;
	}

	if (args.stage === 'links') {
		const requests = selectRequests(args);
		log('links:');
		for (const r of requests) {
			const slug = r.slug && r.slug.trim() ? r.slug.trim() : slugify(r.title);
			log(`  ${canonicalPageUrl(policy, r.lang, slug)}`);
		}
		return;
	}

	if (args.stage === 'research') {
		const research = loadResearchConfig(WORKFLOW_ROOT);
		const runDir = resolveRunDir(args);
		ensureDir(runDir);
		const topicNames = args.topic ? [args.topic] : Object.keys(research.topics);
		for (const t of topicNames) {
			const cfg = research.topics[t];
			if (!cfg) {
				log(`unknown topic: ${t}`);
				continue;
			}
			if (args.lang && cfg.lang !== args.lang) continue;
			log(`researching "${t}" (${cfg.lang}) — ${cfg.queries.length} queries`);
			const uni = await buildUniverse({
				root: WORKFLOW_ROOT,
				topic: t,
				topicCfg: cfg,
				modelsConfig,
				runDir,
				onLog: log,
			});
			log(
				`universe "${t}": pillar "${uni.pillar.title}" (${uni.pillar.primaryKeyword}) + ${uni.clusters.length} clusters, ${uni.competitors?.length ?? 0} competitors`,
			);
			for (const c of uni.clusters) log(`  - ${c.id}: ${c.title} | ${c.primaryKeyword}`);
		}
		return;
	}

	if (args.stage === 'probe') {
		for (const m of [modelsConfig.writer, modelsConfig.judge]) {
			const cfg = modelsConfig.providers[m.provider];
			if (!cfg) {
				log(`FAIL ${m.label}: unknown provider "${m.provider}"`);
				continue;
			}
			const provider = resolveProvider(m.provider, cfg);
			const started = Date.now();
			const res = await chatCompletion({
				provider,
				model: m.id,
				messages: [{ role: 'user', content: 'Reply with exactly: OK' }],
				maxTokens: 32,
				timeoutMs: 60000,
			});
			const secs = ((Date.now() - started) / 1000).toFixed(1);
			log(res.ok ? `ok   ${m.label} (${secs}s) "${res.content.trim().slice(0, 20)}"` : `FAIL ${m.label} (${secs}s) ${res.error}`);
		}
		return;
	}

	// stage: create
	let requests = selectRequests(args);
	const allQueueSlugs = loadQueue(args.queue).map((r) =>
		r.slug && r.slug.trim() ? r.slug.trim() : slugify(r.title),
	);
	const runDir = resolveRunDir(args);
	ensureDir(runDir);
	writeJson(path.join(runDir, 'meta.json'), {
		run: path.basename(runDir),
		createdAt: new Date().toISOString(),
		writer: modelsConfig.writer.id,
		judge: modelsConfig.judge.id,
		maxRounds,
		threshold,
		requests: requests.map((r) => ({ id: r.id, lang: r.lang, slug: r.slug ?? null })),
	});

	log(`run: ${path.relative(WORKFLOW_ROOT, runDir)}`);
	log(`writer: ${modelsConfig.writer.label} | judge: ${modelsConfig.judge.label} | requests: ${requests.length}`);

	const result = await runPipeline({
		root: WORKFLOW_ROOT,
		runDir,
		requests,
		modelsConfig,
		rubric,
		policy,
		maxRounds,
		threshold,
		allowedSlugs: allQueueSlugs,
		onLog: log,
	});

	if (args.autoEn && result.approved.length > 0) {
		const extra: PageRequest[] = [];
		for (const a of result.approved) {
			if ((a.verdict.createEnglishVersion || a.request.requestEnglish) && a.request.lang === 'tr') {
				extra.push(englishRequest(a.request));
			}
		}
		if (extra.length > 0) {
			log(`auto-en: ${extra.length} English version(s) requested`);
			const enResult = await runPipeline({
				root: WORKFLOW_ROOT,
				runDir,
				requests: extra,
				modelsConfig,
				rubric,
				policy,
				maxRounds,
				threshold,
				allowedSlugs: allQueueSlugs,
				onLog: log,
			});
			result.approved.push(...enResult.approved);
			result.failed.push(...enResult.failed);
		}
	}

	writeJson(path.join(runDir, 'result.json'), {
		approved: result.approved.map((a) => ({ slug: a.slug, lang: a.request.lang, score: a.verdict.score, rounds: a.rounds })),
		failed: result.failed.map((f) => ({ id: f.request.id, lang: f.request.lang, reason: f.reason })),
	});

	log(`approved: ${result.approved.length} | failed: ${result.failed.length}`);
	for (const f of result.failed) log(`  ✗ ${f.request.id}: ${f.reason}`);

	if (!args.publish) {
		for (const a of result.approved) {
			const plan = buildPagePlan(REPO_ROOT, a, policy);
			log(`  would write: ${plan.relPath}`);
			log(`  link       : ${canonicalPageUrl(policy, plan.lang, plan.slug)}`);
			log(`  llms entry : ${plan.llmsEntry}`);
			if (plan.issues.length) log(`  notes      : ${plan.issues.join('; ')}`);
		}
		log('dry-run complete (no repo changes). Re-run with --publish [--push] to publish.');
		return;
	}

	if (!policy.git.enabled) {
		log('git disabled in policy; aborting publish');
		return;
	}

	const plans: PagePlan[] = [];
	for (const a of result.approved) {
		const plan = buildPagePlan(REPO_ROOT, a, policy);
		const strict = parseStrictFrontmatter(plan.content);
		if (!strict.ok) {
			log(`skip ${plan.relPath} (invalid frontmatter YAML: ${strict.error})`);
			continue;
		}
		if (exists(plan.absPath) && !args.force) {
			log(`skip ${plan.relPath} (already exists; use --force to overwrite)`);
			continue;
		}
		writeText(plan.absPath, plan.content);
		const llms = updateLlms(REPO_ROOT, policy, plan);
		if (llms.added) log(`llms.txt: added entry for ${plan.slug}`);
		log(`wrote ${plan.relPath}`);
		plans.push(plan);
	}

	if (plans.length === 0) {
		log('nothing to publish');
		return;
	}

	const links = plans.map((p) => ({
		slug: p.slug,
		lang: p.lang,
		url: canonicalPageUrl(policy, p.lang, p.slug),
		path: p.relPath,
	}));
	writeJson(path.join(runDir, 'links.json'), links);

	let buildOk = true;
	if (args.noBuild) {
		log('skipping build verification (--no-build)');
	} else {
		for (let i = 0; i < plans.length; i++) {
			const check = verifyBuild(REPO_ROOT, plans[i] as PagePlan, log, i > 0);
			if (!check.ok) {
				buildOk = false;
				for (const issue of check.issues) log(`  BUILD ISSUE: ${issue}`);
			}
		}
	}

	if (!buildOk) {
		log('build/sitemap verification failed; files written but NOT committed');
		process.exitCode = 1;
		return;
	}

	const files = [...plans.map((p) => p.relPath), policy.llmsFile];
	const slugList = plans.map((p) => p.slug).join(', ');
	const message = `${policy.git.commitPrefix} add ${slugList}`;
	if (args.push) {
		const res = commitAndPush(REPO_ROOT, policy, files, message, true, log);
		log(res.ok ? `git: ${res.detail}` : `git FAIL: ${res.detail}`);
		if (!res.ok) process.exitCode = 1;
	} else {
		log('publish complete (files written, build verified). Add --push to commit and push.');
		log(`  git add -- ${files.join(' ')}`);
		log(`  git commit -m "${message}"`);
		log(`  git push ${policy.git.remote} HEAD`);
	}

	log('links created:');
	for (const l of links) log(`  ${l.url}`);
}

main().catch((e) => {
	process.stderr.write(`error: ${e instanceof Error ? e.stack ?? e.message : String(e)}\n`);
	process.exit(1);
});
