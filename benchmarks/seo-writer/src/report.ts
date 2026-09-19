import path from 'node:path';
import type {
	AgentReview,
	DetMetrics,
	GeneratedArticle,
	JudgeScore,
	ModelAggregate,
	RubricConfig,
	TitleEntry,
} from './types.ts';
import { stdDev, writeJson, writeText } from './util.ts';

export interface ReportInput {
	runDir: string;
	runName: string;
	titles: TitleEntry[];
	articles: GeneratedArticle[];
	judgeScores: JudgeScore[];
	metrics: Array<{ model: string; titleId: string; metrics: DetMetrics }>;
	agentReviews: AgentReview[];
	rubric: RubricConfig;
	modelMeta: Record<string, { label: string; tier: string }>;
}

function judgeArticleScore(scores: Record<string, number>, rubric: RubricConfig): number {
	let total = 0;
	let sumW = 0;
	for (const c of rubric.judge.criteria) {
		const v = scores[c.key];
		if (v === undefined) continue;
		total += v * c.weight;
		sumW += c.weight;
	}
	if (sumW === 0) return 0;
	const avgRaw = total / sumW;
	return Math.round((avgRaw / rubric.judge.scale) * 1000) / 10;
}

function detScore(m: DetMetrics, rubric: RubricConfig): number {
	let total = 0;
	let sumW = 0;
	for (const c of rubric.deterministic.checks) {
		const v = m.checks[c.key];
		if (v === undefined) continue;
		total += Math.max(0, Math.min(1, v)) * c.weight;
		sumW += c.weight;
	}
	return sumW > 0 ? Math.round((total / sumW) * 1000) / 10 : 0;
}

function combine(
	det: number | null,
	judge: number | null,
	agent: number | null,
	weights: RubricConfig['finalWeights'],
): number {
	const parts: Array<[number, number]> = [];
	if (det !== null) parts.push([det, weights.deterministic]);
	if (judge !== null) parts.push([judge, weights.judge]);
	if (agent !== null) parts.push([agent, weights.agent]);
	const sumW = parts.reduce((a, [, w]) => a + w, 0);
	if (sumW === 0) return 0;
	return Math.round((parts.reduce((a, [v, w]) => a + v * w, 0) / sumW) * 10) / 10;
}

export interface ReportOutput {
	aggregates: ModelAggregate[];
	scores: Array<{
		model: string;
		label: string;
		tier: string;
		titleId: string;
		det: number | null;
		judge: number | null;
		agent: number | null;
		final: number;
	}>;
}

export function computeReport(input: ReportInput): ReportOutput {
	const metricMap = new Map(input.metrics.map((m) => [`${m.model}::${m.titleId}`, m.metrics]));
	const agentMap = new Map(input.agentReviews.map((a) => [`${a.model}::${a.titleId}`, a]));

	const models = Array.from(new Set(input.articles.map((a) => a.model)));
	const scores: ReportOutput['scores'] = [];
	const aggregates: ModelAggregate[] = [];

	for (const model of models) {
		const meta = input.modelMeta[model] ?? { label: model, tier: 'unknown' };
		const modelArticles = input.articles.filter((a) => a.model === model);
		const successes = modelArticles.filter((a) => a.ok && a.content.trim().length > 0);
		const failures = modelArticles.length - successes.length;

		const perTitle: ModelAggregate['perTitle'] = [];
		const finalPerTitle: number[] = [];
		const detList: number[] = [];
		const judgeList: number[] = [];
		const agentList100: number[] = [];

		for (const title of input.titles) {
			const article = modelArticles.find((a) => a.titleId === title.id);
			if (!article || !article.ok) continue;
			const key = `${model}::${title.id}`;
			const metrics = metricMap.get(key);
			const det = metrics ? detScore(metrics, input.rubric) : null;

			const jScores = input.judgeScores.filter((j) => j.model === model && j.titleId === title.id && j.ok);
			const judge =
				jScores.length > 0
					? Math.round((jScores.reduce((a, j) => a + judgeArticleScore(j.scores, input.rubric), 0) / jScores.length) * 10) / 10
					: null;

			const agentEntry = agentMap.get(key);
			const agent = agentEntry ? Math.round(agentEntry.score * 10) : null;

			const final = combine(det, judge, agent, input.rubric.finalWeights);
			perTitle.push({ titleId: title.id, deterministicScore: det ?? 0, judgeScore: judge, agentScore: agent, finalScore: final });
			finalPerTitle.push(final);
			if (det !== null) detList.push(det);
			if (judge !== null) judgeList.push(judge);
			if (agent !== null) agentList100.push(agent);

			scores.push({
				model,
				label: meta.label,
				tier: meta.tier,
				titleId: title.id,
				det,
				judge,
				agent,
				final,
			});
		}

		const avg = (arr: number[]) => (arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10 : 0);

		const byCriterion: Record<string, number> = {};
		for (const c of input.rubric.judge.criteria) {
			const vals: number[] = [];
			for (const j of input.judgeScores) {
				if (j.model === model && j.ok && typeof j.scores[c.key] === 'number') vals.push(j.scores[c.key] as number);
			}
			byCriterion[c.key] = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100 : 0;
		}

		const latencies = successes.map((a) => a.latencyMs).filter((n) => n > 0);
		const tokens = successes.map((a) => a.totalTokens ?? 0).filter((n) => n > 0);

		const detAvg = avg(detList);
		const judgeAvg = avg(judgeList);
		const agentAvg = agentList100.length ? avg(agentList100) : null;

		aggregates.push({
			model,
			label: meta.label,
			tier: meta.tier,
			runs: modelArticles.length,
			successes: successes.length,
			failures,
			deterministicScore: detAvg,
			judgeScore: judgeAvg,
			agentScore: agentAvg,
			finalScore: combine(detAvg, judgeList.length ? judgeAvg : null, agentAvg, input.rubric.finalWeights),
			byCriterion,
			consistencyStdDev: Math.round(stdDev(finalPerTitle) * 10) / 10,
			avgLatencyMs: latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0,
			avgTotalTokens: tokens.length ? Math.round(tokens.reduce((a, b) => a + b, 0) / tokens.length) : 0,
			perTitle,
		});
	}

	aggregates.sort((a, b) => b.finalScore - a.finalScore);
	return { aggregates, scores };
}

function mdTable(headers: string[], rows: string[][]): string {
	const head = `| ${headers.join(' | ')} |`;
	const sep = `| ${headers.map(() => '---').join(' | ')} |`;
	const body = rows.map((r) => `| ${r.join(' | ')} |`).join('\n');
	return [head, sep, body].join('\n');
}

export function writeReport(input: ReportInput, out: ReportOutput): void {
	const { aggregates, scores } = out;
	const lines: string[] = [];
	lines.push(`# SEO Writer Benchmark — ${input.runName}`);
	lines.push('');
	lines.push(`Titles: ${input.titles.length} | Models: ${aggregates.length} | Articles: ${input.articles.length}`);
	lines.push('');
	lines.push('Final score = weighted blend of judge (0-100), deterministic SEO metrics (0-100) and agent review (0-100).');
	lines.push('Weights are renormalized over available sources. Judges are blind to the generating model.');
	lines.push('');

	lines.push('## Leaderboard');
	lines.push('');
	lines.push(
		mdTable(
			['#', 'Model', 'Tier', 'Final', 'Judge', 'Det', 'Agent', 'Consistency (σ)', 'Avg latency', 'Avg tokens', 'OK'],
			aggregates.map((a, i) => [
				String(i + 1),
				`${a.label} \`${a.model}\``,
				a.tier,
				a.finalScore.toFixed(1),
				a.judgeScore ? a.judgeScore.toFixed(1) : 'n/a',
				a.deterministicScore.toFixed(1),
				a.agentScore !== null ? a.agentScore.toFixed(1) : 'n/a',
				a.consistencyStdDev.toFixed(1),
				a.avgLatencyMs ? `${(a.avgLatencyMs / 1000).toFixed(1)}s` : 'n/a',
				a.avgTotalTokens ? String(a.avgTotalTokens) : 'n/a',
				`${a.successes}/${a.runs}`,
			]),
		),
	);
	lines.push('');

	lines.push('## Judge criteria (average raw score, 0-10)');
	lines.push('');
	if (input.rubric.judge.criteria.length > 0) {
		lines.push(
			mdTable(
				['Model', ...input.rubric.judge.criteria.map((c) => c.label)],
				aggregates.map((a) => [a.label, ...input.rubric.judge.criteria.map((c) => (a.byCriterion[c.key] ?? 0).toFixed(2))]),
			),
		);
	}
	lines.push('');

	lines.push('## Per-title results');
	lines.push('');
	const modelLabel = new Map(aggregates.map((a) => [a.model, a.label]));
	lines.push(
		mdTable(
			['Title', 'Model', 'Det', 'Judge', 'Agent', 'Final'],
			scores
				.slice()
				.sort((a, b) => a.titleId.localeCompare(b.titleId) || b.final - a.final)
				.map((s) => [
					s.titleId,
					modelLabel.get(s.model) ?? s.model,
					s.det !== null ? s.det.toFixed(1) : 'n/a',
					s.judge !== null ? s.judge.toFixed(1) : 'n/a',
					s.agent !== null ? s.agent.toFixed(1) : 'n/a',
					s.final.toFixed(1),
				]),
		),
	);
	lines.push('');

	const failed = input.articles.filter((a) => !a.ok);
	if (failed.length > 0) {
		lines.push('## Generation failures');
		lines.push('');
		lines.push(mdTable(['Model', 'Title', 'Error'], failed.map((a) => [`\`${a.model}\``, a.titleId, (a.error ?? '').slice(0, 160)])));
		lines.push('');
	}

	writeText(path.join(input.runDir, 'REPORT.md'), lines.join('\n'));

	const csvHeader = 'model,label,tier,titleId,det,judge,agent,final';
	const csvRows = scores.map((s) =>
		[
			s.model,
			`"${s.label.replace(/"/g, '""')}"`,
			s.tier,
			s.titleId,
			s.det ?? '',
			s.judge ?? '',
			s.agent ?? '',
			s.final,
		].join(','),
	);
	writeText(path.join(input.runDir, 'scores.csv'), [csvHeader, ...csvRows].join('\n'));

	writeJson(path.join(input.runDir, 'scores.json'), {
		run: input.runName,
		finalWeights: input.rubric.finalWeights,
		leaderboard: aggregates,
		scores,
	});
}
