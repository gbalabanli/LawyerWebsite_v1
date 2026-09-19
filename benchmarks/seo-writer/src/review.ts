import path from 'node:path';
import type { AgentReview, GeneratedArticle, JudgeScore, TitleEntry } from './types.ts';
import { exists, readJson, safeName, writeJson, writeText } from './util.ts';

export interface ReviewOptions {
	root: string;
	runDir: string;
	titles: TitleEntry[];
	articles: GeneratedArticle[];
	judgeScores: JudgeScore[];
	deterministic: Record<string, number>;
}

export function buildReviewPacket(opts: ReviewOptions): string {
	const titleMap = new Map(opts.titles.map((t) => [t.id, t]));
	const lines: string[] = [];
	lines.push('# Agent Review Packet');
	lines.push('');
	lines.push('Read each article below and score it 0-10 for overall SEO writing quality,');
	lines.push('against the frozen rubric in `config/rubric.json`. This is the human/agent lens of the hybrid score.');
	lines.push('');
	lines.push('When done, write your scores to `agent-review.json` in this run directory as:');
	lines.push('```json');
	lines.push(JSON.stringify([{ model: '<model id>', titleId: '<title id>', score: 8.5, notes: '...' }], null, 2));
	lines.push('```');
	lines.push('A starter file with `null` scores is written to `agent-review.template.json`.');
	lines.push('');

	const okArticles = opts.articles.filter((a) => a.ok && a.content.trim().length > 0);

	for (const title of opts.titles) {
		const group = okArticles.filter((a) => a.titleId === title.id);
		if (group.length === 0) continue;
		lines.push(`## ${title.title}  (\`${title.id}\`, ${title.lang})`);
		lines.push('');
		lines.push(`Primary keyword: \`${title.primaryKeyword}\` | service tag: \`${title.serviceTag}\``);
		lines.push('');
		for (const article of group) {
			const det = opts.deterministic[`${article.model}::${article.titleId}`];
			const jScores = opts.judgeScores.filter((j) => j.model === article.model && j.titleId === article.titleId && j.ok);
			const judgeAvg =
				jScores.length > 0
					? Math.round(
							(jScores.reduce(
								(sum, j) => sum + Object.values(j.scores).reduce((a, b) => a + b, 0) / Math.max(1, Object.keys(j.scores).length),
								0,
							) /
								jScores.length) *
								10,
						) / 10
					: null;
			lines.push(`### ${article.modelLabel}  \`${article.model}\``);
			lines.push(
				`Det: ${det !== undefined ? det.toFixed(1) : 'n/a'} /100 | Judge: ${judgeAvg !== null ? judgeAvg.toFixed(1) : 'n/a'} /10`,
			);
			lines.push('');
			lines.push(article.content.trim());
			lines.push('');
			lines.push('---');
			lines.push('');
		}
	}

	return lines.join('\n');
}

export function writeReviewPacket(opts: ReviewOptions): void {
	const md = buildReviewPacket(opts);
	writeText(path.join(opts.runDir, 'REVIEW.md'), md);

	const okArticles = opts.articles.filter((a) => a.ok && a.content.trim().length > 0);
	const template: Array<AgentReview & { score: number | null }> = okArticles.map((a) => ({
		model: a.model,
		titleId: a.titleId,
		score: null,
		notes: '',
	}));
	writeJson(path.join(opts.runDir, 'agent-review.template.json'), template);
}

export function loadAgentReview(runDir: string): AgentReview[] {
	const p = path.join(runDir, 'agent-review.json');
	if (!exists(p)) return [];
	try {
		const data = readJson<AgentReview[]>(p);
		if (!Array.isArray(data)) return [];
		return data.filter((d) => typeof d?.score === 'number' && d.model && d.titleId);
	} catch {
		return [];
	}
}

export function reviewKey(model: string, titleId: string): string {
	return `${safeName(model)}::${titleId}`;
}
