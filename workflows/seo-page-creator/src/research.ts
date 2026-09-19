import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion, resolveProvider } from './client.ts';
import type {
	ModelsConfig,
	ResearchConfig,
	ResearchTopic,
	Universe,
	UniverseCluster,
} from './types.ts';
import { ensureDir, exists, extractJson, readJson, slugify, writeJson, writeText } from './util.ts';

export function loadResearchConfig(root: string): ResearchConfig {
	const p = path.join(root, 'config', 'research.json');
	return JSON.parse(fs.readFileSync(p, 'utf8')) as ResearchConfig;
}

function cleanArg(s: string): string {
	return s.replace(/"/g, "'").replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
}

export function exaSearch(cfg: ResearchConfig, query: string, objective: string): string {
	const cmd = [
		cfg.exa.bin,
		'call',
		cfg.exa.tool,
		`"query=${cleanArg(query)}"`,
		`"numResults=${cfg.exa.numResults}"`,
		`"objective=${cleanArg(objective)}"`,
	].join(' ');
	return execSync(cmd, {
		encoding: 'utf8',
		timeout: cfg.exa.timeoutMs,
		maxBuffer: 32 * 1024 * 1024,
		shell: true,
		stdio: ['ignore', 'pipe', 'pipe'],
	});
}

function universePath(root: string, topic: string): string {
	return path.join(root, 'requests', 'universe', `${topic}.json`);
}

export function loadUniverse(root: string, topic: string): Universe | null {
	const p = universePath(root, topic);
	if (!exists(p)) return null;
	return readJson<Universe>(p);
}
export function formatUniverseContext(universe: Universe, clusterId?: string, activeIds?: Set<string>): string {
	const cluster = clusterId ? universe.clusters.find((c) => c.id === clusterId) : undefined;
	const siblings = universe.clusters.filter((c) => c.id !== clusterId);
	const prefix = `/${universe.lang === 'en' ? 'en/' : ''}blog/`;
	const pillarSlug = universe.pillar.slug && universe.pillar.slug.trim()
		? universe.pillar.slug.trim().replace(/^\/(?:en\/)?blog\//, '')
		: slugify(universe.pillar.title);
	const pillarActive = !activeIds || activeIds.has(pillarSlug);
	const pillarUrl = pillarActive ? `${prefix}${pillarSlug}` : '(planned, not published yet — do NOT link to it)';
	const lines: string[] = [
		`KEYWORD UNIVERSE — topic: ${universe.topic} (${universe.lang})`,
		`Pillar page: "${universe.pillar.title}" | primary keyword: "${universe.pillar.primaryKeyword}" | ${pillarUrl}`,
	];
	const isActive = (id: string) => !activeIds || activeIds.has(id);
	if (cluster) {
		lines.push(
			`THIS PAGE (cluster ${cluster.id}): "${cluster.title}" | primary keyword: "${cluster.primaryKeyword}"`,
			cluster.intent ? `Search intent: ${cluster.intent}` : '',
			cluster.gapNote ? `Competitor gap to exploit: ${cluster.gapNote}` : '',
		);
	}
	if (siblings.length) {
		lines.push('SIBLING PAGES (do NOT cannibalize):');
		for (const s of siblings) {
			const url = isActive(s.id) ? `${prefix}${s.id}` : '(planned, not published yet — do NOT link to it)';
			lines.push(`- "${s.title}" | keyword: "${s.primaryKeyword}" | ${url}`);
		}
	}
	return lines.filter(Boolean).join('\n');
}

const SYNTH_SYSTEM = `You are an SEO strategist building a keyword universe (pillar + cluster) for a Turkish law firm's English blog.
You receive raw competitor search results. Produce a JSON object describing the topic's pillar and cluster pages and the competitor gaps.

Rules:
- Respond with ONLY valid JSON. No markdown fences, no commentary.
- Cluster ids are lowercase kebab-case and stable. Each cluster has a distinct search intent; no two clusters target the same intent or keyword.
- The pillar targets the broad head keyword; clusters target specific long-tail queries.
- Include the angle "who may lawfully act as an escrow agent/contractor in Turkey" as its own cluster where relevant.
- internalLinks are relative site paths starting with "/".
- Do not invent competitors that are not in the search results.

JSON shape:
{
  "topic": "string",
  "lang": "en",
  "pillar": { "id": "string", "title": "string (50-60 chars)", "primaryKeyword": "string", "slug": "string" },
  "clusters": [
    { "id": "string", "title": "string (50-60 chars)", "primaryKeyword": "string", "serviceTag": "string", "lang": "en", "intent": "string", "gapNote": "string", "internalLinks": ["/en/blog/..."] }
  ],
  "competitors": [ { "url": "string", "title": "string" } ]
}`;

export interface BuildUniverseOptions {
	root: string;
	topic: string;
	topicCfg: ResearchTopic;
	modelsConfig: ModelsConfig;
	runDir?: string;
	numResultsOverride?: number;
	onLog?: (m: string) => void;
}

export async function buildUniverse(opts: BuildUniverseOptions): Promise<Universe> {
	const cfg = loadResearchConfig(opts.root);
	if (opts.numResultsOverride) cfg.exa.numResults = opts.numResultsOverride;

	const results: string[] = [];
	for (const q of opts.topicCfg.queries) {
		opts.onLog?.(`exa: ${q}`);
		try {
			const out = exaSearch(cfg, q, opts.topicCfg.objective);
			results.push(`### QUERY: ${q}\n${out}`);
		} catch (e) {
			opts.onLog?.(`  search failed: ${e instanceof Error ? e.message.split('\n')[0] : String(e)}`);
		}
	}
	if (results.length === 0) throw new Error(`no search results for topic "${opts.topic}" (is mcporter/exa reachable?)`);

	const combined = results.join('\n\n').slice(0, 120000);
	const judgeCfg = opts.modelsConfig.providers[opts.modelsConfig.judge.provider];
	if (!judgeCfg) throw new Error(`unknown judge provider "${opts.modelsConfig.judge.provider}"`);
	const provider = resolveProvider(opts.modelsConfig.judge.provider, judgeCfg);

	const res = await chatCompletion({
		provider,
		model: opts.modelsConfig.judge.id,
		messages: [
			{ role: 'system', content: SYNTH_SYSTEM },
			{
				role: 'user',
				content: `Topic: ${opts.topic}\nLanguage: ${opts.topicCfg.lang}\nPillar keyword: ${opts.topicCfg.pillarKeyword}\nService tag: ${opts.topicCfg.serviceTag}\n\nRAW COMPETITOR SEARCH RESULTS:\n${combined}`,
			},
		],
		temperature: 0,
		maxTokens: 4000,
		timeoutMs: opts.modelsConfig.judge.timeoutMs ?? opts.modelsConfig.defaults.timeoutMs,
	});
	if (!res.ok) throw new Error(`universe synthesis failed: ${res.error}`);

	const parsed = extractJson(res.content) as Universe | null;
	if (!parsed || !parsed.pillar || !Array.isArray(parsed.clusters)) {
		throw new Error('universe synthesis returned unparsable JSON');
	}
	parsed.topic = opts.topic;
	parsed.lang = opts.topicCfg.lang;
	parsed.generatedAt = new Date().toISOString();
	parsed.clusters = parsed.clusters.map((c) => ({
		...c,
		serviceTag: c.serviceTag || opts.topicCfg.serviceTag,
		lang: (c.lang as UniverseCluster['lang']) || opts.topicCfg.lang,
	}));

	ensureDir(path.join(opts.root, 'requests', 'universe'));
	writeJson(universePath(opts.root, opts.topic), parsed);
	if (opts.runDir) {
		const dir = path.join(opts.runDir, 'research');
		ensureDir(dir);
		writeText(path.join(dir, `${opts.topic}.raw.txt`), combined);
		writeJson(path.join(dir, `${opts.topic}.json`), parsed);
	}
	return parsed;
}
