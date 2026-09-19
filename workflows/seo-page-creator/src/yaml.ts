import * as yaml from 'js-yaml';

/**
 * Repair the common LLM YAML defect where two keys of a list item are collapsed
 * onto one line, e.g. `- q: "..."    a: "..."`. Splits them onto separate,
 * correctly indented lines. Also trims trailing whitespace.
 */
export function normalizeFrontmatter(content: string): string {
	const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!m) return content;
	const fm = (m[1] as string)
		.replace(
			/^(\s*-\s+)([\w-]+):\s*("(?:[^"\\]|\\.)*")\s+([\w-]+):\s*(.+)$/gm,
			(_s, pre: string, k1: string, v1: string, k2: string, v2: string) =>
				`${pre}${k1}: ${v1}\n${' '.repeat(pre.length)}${k2}: ${v2}`,
		)
		.replace(
			/^(\s*-\s+)([\w-]+):\s*(.+?)\s{2,}([\w-]+):\s*(.+)$/gm,
			(_s, pre: string, k1: string, v1: string, k2: string, v2: string) =>
				`${pre}${k1}: ${v1}\n${' '.repeat(pre.length)}${k2}: ${v2}`,
		)
		.replace(/[ \t]+$/gm, '');
	return `---\n${fm}\n---\n${m[2] as string}`;
}

/**
 * Ensure the service tag is present (and first) in the frontmatter `tags`,
 * handling both inline JSON arrays and YAML block lists. Idempotent.
 */
export function injectServiceTag(content: string, tag: string): string {
	const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!m) return content;
	const fm = m[1] as string;
	const body = m[2] as string;

	let data: Record<string, unknown>;
	try {
		const parsed = yaml.load(fm);
		if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return content;
		data = parsed as Record<string, unknown>;
	} catch {
		return content;
	}

	const existing = Array.isArray(data.tags)
		? (data.tags as unknown[]).filter((x): x is string => typeof x === 'string')
		: [];
	if (existing.includes(tag)) return content;

	const newTags = [tag, ...existing.filter((t) => t !== tag)];
	const lines = fm.split(/\r?\n/);
	const idx = lines.findIndex((l) => /^tags:\s*/.test(l) || /^tags:\s*$/.test(l));
	if (idx < 0) {
		lines.push(`tags: ${JSON.stringify(newTags)}`);
	} else if (/^tags:\s*\[.*\]\s*$/.test(lines[idx] as string)) {
		lines[idx] = `tags: ${JSON.stringify(newTags)}`;
	} else if (/^tags:\s*$/.test(lines[idx] as string)) {
		let end = idx + 1;
		while (end < lines.length && /^\s+-\s+/.test(lines[end] as string)) end++;
		lines.splice(idx, end - idx, `tags: ${JSON.stringify(newTags)}`);
	} else {
		lines[idx] = `tags: ${JSON.stringify(newTags)}`;
	}
	return `---\n${lines.join('\n')}\n---\n${body}`;
}

export interface StrictFrontmatter {
	ok: boolean;
	error?: string;
	data: Record<string, unknown>;
	body: string;
}

/**
 * Strictly parse a frontmatter block using js-yaml (the same parser Astro's
 * content loader uses). Used to reject malformed YAML before a page is judged
 * or published, so the writer can fix it in the revision loop.
 */
export function parseStrictFrontmatter(content: string): StrictFrontmatter {
	const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!m) {
		return { ok: false, error: 'frontmatter delimiters (---) not found', data: {}, body: content };
	}
	try {
		const data = yaml.load(m[1] as string);
		if (!data || typeof data !== 'object' || Array.isArray(data)) {
			return { ok: false, error: 'frontmatter is not a YAML mapping', data: {}, body: m[2] as string };
		}
		return { ok: true, data: data as Record<string, unknown>, body: m[2] as string };
	} catch (e) {
		const message = e instanceof Error ? e.message.split('\n').slice(0, 3).join(' ') : String(e);
		return { ok: false, error: message, data: {}, body: m[2] as string };
	}
}
