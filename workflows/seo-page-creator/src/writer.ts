import path from 'node:path';
import { chatCompletion, type ResolvedProvider } from './client.ts';
import type { FalseClaim, PageRequest, WriterOutput } from './types.ts';
import { readText } from './util.ts';

export interface WriteFeedback {
	requiredEdits: string[];
	gaps: string[];
	falseClaims: FalseClaim[];
	deterministicFails: string[];
}

export interface WriteOptions {
	root: string;
	provider: ResolvedProvider;
	model: string;
	request: PageRequest;
	dateStr: string;
	round: number;
	temperature: number;
	maxTokens: number;
	timeoutMs: number;
	feedback?: WriteFeedback;
	universeContext?: string;
	linkTargets?: string[];
}

function buildBrief(req: PageRequest, dateStr: string): string {
	const today = new Date().toISOString().slice(0, 10);
	const lines = [
		'',
		'--- GÖREV ÖZETİ / TASK BRIEF ---',
		`Bugünün tarihi / Today: ${dateStr || today}`,
		`Başlık / Title: ${req.title}`,
		`Birincil anahtar kelime / Primary keyword: ${req.primaryKeyword}`,
		`Dil / Language: ${req.lang === 'tr' ? 'Türkçe (tr)' : 'English (en)'}`,
		`Hizmet etiketi / Service tag (tags içinde ilk sırada kullan): ${req.serviceTag}`,
		req.intent ? `Arama niyeti / Search intent: ${req.intent}` : '',
		req.notes ? `Ek notlar / Notes: ${req.notes}` : '',
		'',
		req.lang === 'tr'
			? 'Şimdi bu başlık için yayına hazır tam yazıyı üret. Sadece yazıyı döndür.'
			: 'Now produce the publish-ready article for this title. Return only the article.',
	];
	return lines.filter(Boolean).join('\n');
}

function sanitize(raw: string): string {
	let s = raw.replace(/\r\n/g, '\n').trim();
	const fence = s.match(/^```[a-zA-Z]*\s*\n([\s\S]*?)\n```$/);
	if (fence) s = (fence[1] as string).trim();
	const idx = s.indexOf('---');
	if (idx > 0) s = s.slice(idx);
	return s.trim();
}

export async function writeDraft(opts: WriteOptions): Promise<WriterOutput> {
	const lang = opts.request.lang;
	const base = readText(path.join(opts.root, 'prompts', `writer.${lang}.md`));
	let system = `${base}\n\n${buildBrief(opts.request, opts.dateStr)}`;
	if (opts.universeContext) {
		system += `\n\n--- KEYWORD UNIVERSE (follow this) ---\n${opts.universeContext}\n\nRules: use the target keyword naturally in the title, first 100 words, description and at least one H2. Link internally ONLY to the exact URLs listed above; NEVER link to a page marked "do NOT link to it". Do not invent or alter slugs. Do not target a sibling page's keyword or intent.`;
	}
	if (opts.linkTargets?.length) {
		system += `\n\n--- VALID INTERNAL LINK TARGETS (use ONLY these exact URLs for internal links; never invent a slug) ---\n${opts.linkTargets
			.map((u) => `- ${u}`)
			.join('\n')}`;
	}

	if (opts.feedback) {
		const reviser = readText(path.join(opts.root, 'prompts', `reviser.${lang}.md`));
		system += [
			'',
			'---',
			reviser,
			'',
			'EDITÖR GERİ BİLDİRİMİ / EDITOR FEEDBACK (JSON):',
			JSON.stringify(opts.feedback, null, 2),
		].join('\n');
	}

	const res = await chatCompletion({
		provider: opts.provider,
		model: opts.model,
		messages: [
			{ role: 'system', content: system },
			{ role: 'user', content: opts.request.title },
		],
		temperature: opts.temperature,
		maxTokens: opts.maxTokens,
		timeoutMs: opts.timeoutMs,
	});

	let content = res.content;
	if (!content && res.reasoning) {
		const idx = res.reasoning.indexOf('---');
		if (idx >= 0) content = res.reasoning.slice(idx);
	}
	content = sanitize(content);

	return {
		round: opts.round,
		content,
		ok: res.ok && content.trim().length > 0,
		error: res.ok ? (content.trim().length > 0 ? undefined : 'empty content') : res.error,
		latencyMs: res.latencyMs,
		attempts: res.attempts,
	};
}
