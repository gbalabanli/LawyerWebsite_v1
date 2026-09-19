import type { DetMetrics, TitleEntry } from './types.ts';
import {
	asArray,
	asString,
	clamp,
	countWords,
	extractHeadings,
	extractParagraphs,
	normText,
	parseFrontmatter,
	stripMarkdown,
} from './util.ts';

const CTA_TR = ['iletisim', 'danismanlik', 'danis', 'basvur', 'randevu', 'hukuki destek', 'bize ulas', 'avukat'];
const CTA_EN = ['contact', 'consult', 'reach out', 'get in touch', 'schedule', 'legal support', 'advice'];

function scoreTitleLength(n: number): number {
	if (n >= 50 && n <= 60) return 1;
	if (n >= 45 && n <= 70) return 0.6;
	if (n >= 35 && n <= 80) return 0.3;
	return 0.1;
}

function scoreDescriptionLength(n: number): number {
	if (n >= 140 && n <= 170) return 1;
	if (n >= 125 && n <= 185) return 0.6;
	if (n >= 90 && n <= 210) return 0.3;
	return 0.1;
}

function scoreWordCount(n: number): number {
	if (n >= 800 && n <= 1500) return 1;
	if (n >= 650 && n <= 1800) return 0.6;
	if (n >= 550 && n < 650) return 0.35;
	if (n > 1800 && n <= 2200) return 0.5;
	if (n < 550) return n >= 350 ? 0.15 : 0.05;
	return 0.3;
}

function scoreH2Count(n: number): number {
	if (n >= 3 && n <= 6) return 1;
	if (n === 2 || n === 7) return 0.5;
	if (n === 1) return 0.25;
	return 0.1;
}

function scoreDensity(d: number): number {
	if (d >= 0.5 && d <= 2.5) return 1;
	if (d >= 0.3 && d < 0.5) return 0.6;
	if (d > 2.5 && d <= 3.5) return 0.5;
	if (d === 0) return 0.15;
	return 0.2;
}

function scoreParagraphLength(avg: number): number {
	if (avg > 0 && avg <= 110) return 1;
	if (avg <= 150) return 0.6;
	if (avg <= 190) return 0.35;
	return 0.15;
}

function scoreFirstParagraph(words: number, keywordPresent: boolean): number {
	if (words >= 35 && words <= 150) return keywordPresent ? 1 : 0.8;
	if (words >= 20 && words <= 200) return 0.6;
	if (words > 200) return 0.35;
	return 0.2;
}

export function computeMetrics(content: string, title: TitleEntry): DetMetrics {
	const fm = parseFrontmatter(content);
	const data = fm.data;
	const body = fm.body;

	const fmTitle = asString(data.title);
	const description = asString(data.description);
	const author = asString(data.author);
	const date = asString(data.date);
	const tags = asArray(data.tags);
	const faq = asArray(data.faq);

	const effectiveTitle = fmTitle || title.title;
	const headingList = extractHeadings(body);
	const h1Count = headingList.filter((h) => h.level === 1).length;
	const h2List = headingList.filter((h) => h.level === 2);
	const h3List = headingList.filter((h) => h.level === 3);
	const h2Count = h2List.length;
	const h3Count = h3List.length;

	let skippedHeadingLevel = false;
	let prevLevel = 1;
	for (const h of headingList) {
		if (h.level > prevLevel + 1) skippedHeadingLevel = true;
		prevLevel = h.level;
	}

	const bodyText = stripMarkdown(body);
	const wordCount = countWords(body);
	const paragraphs = extractParagraphs(body);
	const paraWordCounts = paragraphs.map((p) => countWords(p));
	const avgParagraphWords = paraWordCounts.length
		? Math.round(paraWordCounts.reduce((a, b) => a + b, 0) / paraWordCounts.length)
		: 0;

	const kNorm = normText(title.primaryKeyword);
	const kTokens = kNorm.split(' ').filter(Boolean);
	const bodyNorm = normText(bodyText);
	const titleNorm = normText(effectiveTitle);
	const descNorm = normText(description);
	const headingNorm = normText(headingList.map((h) => h.text).join(' '));

	const occurrences = kNorm ? bodyNorm.split(kNorm).length - 1 : 0;
	const keywordWords = occurrences * Math.max(1, kTokens.length);
	const keywordDensity = wordCount > 0 ? Math.round((keywordWords / wordCount) * 10000) / 100 : 0;

	const words = bodyNorm.split(' ').filter(Boolean);
	const introNorm = words.slice(0, 100).join(' ');
	const keywordInTitle = kNorm ? titleNorm.includes(kNorm) : false;
	const keywordInDescription = kNorm ? descNorm.includes(kNorm) : false;
	const keywordInIntro = kNorm ? introNorm.includes(kNorm) : false;
	const keywordInHeading = kNorm ? headingNorm.includes(kNorm) : false;

	const faqCount = faq.length;
	const hasFaq = faqCount >= 3 || /\n#{2,3}\s*(sss|sıkça sorulan|faq|frequently asked)/i.test(body);
	const hasLists = /^\s*([-*+]|\d+\.)\s+/m.test(body);

	let internalLinkCount = 0;
	const linkRe = /\]\(\s*(\/[^)\s]*)/g;
	let lm: RegExpExecArray | null;
	while ((lm = linkRe.exec(body)) !== null) internalLinkCount++;
	for (const l of asArray(data.links)) {
		const href = asString((l as Record<string, unknown>)?.href);
		if (href.startsWith('/')) internalLinkCount++;
	}

	const tail = words.slice(Math.floor(words.length * 0.75)).join(' ');
	const ctaTerms = title.lang === 'en' ? CTA_EN : CTA_TR;
	const hasCta = ctaTerms.some((t) => tail.includes(t));

	const frontmatterValid =
		fm.found &&
		!!fmTitle &&
		!!description &&
		description.length <= 170 &&
		!!date &&
		!!author &&
		tags.length > 0;

	const firstParagraph = paragraphs[0] ?? '';
	const firstParagraphWords = countWords(firstParagraph);
	const firstParagraphNorm = normText(firstParagraph);
	const firstParagraphOk =
		firstParagraphWords >= 35 &&
		firstParagraphWords <= 200 &&
		(firstParagraphWords >= 40 || (kNorm ? firstParagraphNorm.includes(kNorm) : false));

	const checks: Record<string, number> = {
		titleLength: scoreTitleLength(effectiveTitle.length),
		descriptionLength: scoreDescriptionLength(description.length),
		wordCount: scoreWordCount(wordCount),
		h2Count: scoreH2Count(h2Count),
		keywordInTitle: keywordInTitle ? 1 : 0,
		keywordInDescription: keywordInDescription ? 1 : 0,
		keywordInIntro: keywordInIntro ? 1 : 0,
		keywordInHeading: keywordInHeading ? 1 : 0,
		keywordDensity: scoreDensity(keywordDensity),
		faq: faqCount >= 3 ? 1 : faqCount >= 1 || hasFaq ? 0.5 : 0,
		lists: hasLists ? 1 : 0,
		internalLinks: internalLinkCount >= 1 ? 1 : 0,
		cta: hasCta ? 1 : 0,
		frontmatterValid: frontmatterValid ? 1 : 0,
		paragraphLength: scoreParagraphLength(avgParagraphWords),
		firstParagraph: scoreFirstParagraph(firstParagraphWords, kNorm ? firstParagraphNorm.includes(kNorm) : false),
	};

	return {
		wordCount,
		titleLength: effectiveTitle.length,
		descriptionLength: description.length,
		h1Count,
		h2Count,
		h3Count,
		skippedHeadingLevel,
		paragraphCount: paragraphs.length,
		avgParagraphWords,
		keywordDensity,
		keywordInTitle,
		keywordInDescription,
		keywordInIntro,
		keywordInHeading,
		hasFaq,
		faqCount,
		hasLists,
		internalLinkCount,
		hasCta,
		frontmatterValid,
		firstParagraphWords,
		firstParagraphOk,
		checks,
		seoScore: 0,
	};
}

export function weightedSeoScore(metrics: DetMetrics, weights: Record<string, number>): number {
	let total = 0;
	let sumW = 0;
	for (const [key, w] of Object.entries(weights)) {
		const v = metrics.checks[key];
		if (v === undefined) continue;
		total += clamp(v, 0, 1) * w;
		sumW += w;
	}
	return sumW > 0 ? Math.round((total / sumW) * 1000) / 10 : 0;
}
