import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export function ensureDir(dir: string): void {
	fs.mkdirSync(dir, { recursive: true });
}

export function exists(p: string): boolean {
	try {
		fs.accessSync(p);
		return true;
	} catch {
		return false;
	}
}

export function readText(p: string): string {
	return fs.readFileSync(p, 'utf8');
}

export function writeText(p: string, content: string): void {
	ensureDir(path.dirname(p));
	fs.writeFileSync(p, content, 'utf8');
}

export function readJson<T>(p: string): T {
	return JSON.parse(readText(p)) as T;
}

export function writeJson(p: string, data: unknown): void {
	writeText(p, JSON.stringify(data, null, 2));
}

export function timestamp(): string {
	const d = new Date();
	const p = (n: number, w = 2) => String(n).padStart(w, '0');
	return (
		`${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-` +
		`${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`
	);
}

export function safeName(s: string): string {
	return s.replace(/[^a-zA-Z0-9._-]+/g, '_');
}

export function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

export async function mapLimit<T, R>(
	items: T[],
	limit: number,
	fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
	const results: R[] = new Array(items.length);
	let cursor = 0;
	const workers = new Array(Math.max(1, Math.min(limit, items.length)))
		.fill(0)
		.map(async () => {
			while (true) {
				const i = cursor++;
				if (i >= items.length) break;
				results[i] = await fn(items[i] as T, i);
			}
		});
	await Promise.all(workers);
	return results;
}

const TR_MAP: Record<string, string> = {
	İ: 'i',
	I: 'i',
	ı: 'i',
	Ş: 's',
	ş: 's',
	Ğ: 'g',
	ğ: 'g',
	Ü: 'u',
	ü: 'u',
	Ö: 'o',
	ö: 'o',
	Ç: 'c',
	ç: 'c',
};

export function normText(s: string): string {
	let lower: string;
	try {
		lower = s.toLocaleLowerCase('tr-TR');
	} catch {
		lower = s.toLowerCase();
	}
	let out = '';
	for (const ch of lower) {
		const mapped = TR_MAP[ch];
		out += mapped !== undefined ? mapped : ch;
	}
	return out.replace(/\s+/g, ' ').trim();
}

export function stripMarkdown(md: string): string {
	return md
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]*`/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, ' ')
		.replace(/^\s{0,3}#{1,6}\s+/gm, '')
		.replace(/^\s{0,3}>\s?/gm, '')
		.replace(/^\s{0,3}([-*+]|\d+\.)\s+/gm, '')
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/\*([^*]+)\*/g, '$1')
		.replace(/_{1,2}([^_]+)_{1,2}/g, '$1')
		.replace(/\|/g, ' ');
}

export function countWords(text: string): number {
	const cleaned = stripMarkdown(text).replace(/[#>*_`~|-]/g, ' ');
	const tokens = cleaned.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t));
	return tokens.length;
}

export function extractHeadings(md: string): Array<{ level: number; text: string }> {
	const out: Array<{ level: number; text: string }> = [];
	const re = /^(#{1,6})\s+(.+?)\s*#*\s*$/gm;
	let m: RegExpExecArray | null;
	while ((m = re.exec(md)) !== null) {
		out.push({ level: (m[1] as string).length, text: (m[2] as string).trim() });
	}
	return out;
}

export function extractParagraphs(md: string): string[] {
	const lines = md.split(/\r?\n/);
	const paras: string[] = [];
	let buf: string[] = [];
	const flush = () => {
		const text = buf.join(' ').trim();
		if (text) paras.push(text);
		buf = [];
	};
	for (const line of lines) {
		const t = line.trim();
		if (!t) {
			flush();
			continue;
		}
		if (/^#{1,6}\s/.test(t) || /^([-*+]|\d+\.)\s/.test(t) || /^```/.test(t) || /^\|/.test(t)) {
			flush();
			continue;
		}
		buf.push(t);
	}
	flush();
	return paras;
}

export function extractJson(text: string): unknown {
	let s = text.trim();
	const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
	if (fence) s = fence[1].trim();
	const start = s.indexOf('{');
	const end = s.lastIndexOf('}');
	if (start >= 0 && end > start) s = s.slice(start, end + 1);
	try {
		return JSON.parse(s);
	} catch {
		return null;
	}
}

type YamlVal = string | number | boolean | YamlVal[] | { [k: string]: YamlVal };

function readScalar(raw: string): YamlVal {
	const s = raw.trim();
	if (s === '') return '';
	if (s === 'true') return true;
	if (s === 'false') return false;
	if (s === 'null' || s === '~') return '';
	if (
		(s.startsWith('"') && s.endsWith('"') && s.length >= 2) ||
		(s.startsWith("'") && s.endsWith("'") && s.length >= 2)
	) {
		let inner = s.slice(1, -1);
		if (s[0] === '"') {
			inner = inner
				.replace(/\\"/g, '"')
				.replace(/\\n/g, '\n')
				.replace(/\\t/g, '\t')
				.replace(/\\\\/g, '\\');
		}
		return inner;
	}
	if (s.startsWith('[') && s.endsWith(']')) {
		return splitTopLevel(s.slice(1, -1)).map((part) => readScalar(part));
	}
	return s;
}

function splitTopLevel(s: string): string[] {
	const out: string[] = [];
	let cur = '';
	let quote: string | null = null;
	for (let i = 0; i < s.length; i++) {
		const c = s[i] as string;
		if (quote) {
			cur += c;
			if (c === quote) quote = null;
			continue;
		}
		if (c === '"' || c === "'") {
			quote = c;
			cur += c;
			continue;
		}
		if (c === ',') {
			out.push(cur);
			cur = '';
			continue;
		}
		cur += c;
	}
	if (cur.trim() !== '') out.push(cur);
	return out;
}

function countIndent(line: string): number {
	const m = line.match(/^ */);
	return m ? m[0].length : 0;
}

export function parseSimpleYaml(src: string): Record<string, YamlVal> {
	const lines = src.replace(/\r/g, '').split('\n');
	let idx = 0;

	function parseBlock(minIndent: number): YamlVal {
		while (idx < lines.length && (lines[idx] as string).trim() === '') idx++;
		if (idx >= lines.length) return '';
		const first = lines[idx] as string;
		const indent = countIndent(first);
		if (indent < minIndent) return '';
		const isSeq = /^-\s/.test(first.trim());

		if (isSeq) {
			const arr: YamlVal[] = [];
			while (idx < lines.length) {
				const line = lines[idx] as string;
				if (line.trim() === '') {
					idx++;
					continue;
				}
				const li = countIndent(line);
				if (li < indent) break;
				if (li !== indent || !/^-\s/.test(line.trim())) break;
				const rest = line.trim().slice(1).trim();
				idx++;
				if (/^[^:]+:(\s|$)/.test(rest)) {
					const obj: Record<string, YamlVal> = {};
					const ci = rest.indexOf(':');
					const key = rest.slice(0, ci).trim();
					const val = rest.slice(ci + 1).trim();
					obj[key] = val === '' ? '' : readScalar(val);
					while (idx < lines.length) {
						const l2 = lines[idx] as string;
						if (l2.trim() === '') {
							idx++;
							continue;
						}
						const li2 = countIndent(l2);
						if (li2 <= indent) break;
						const t2 = l2.trim();
						if (/^-\s/.test(t2)) break;
						const c2 = t2.indexOf(':');
						if (c2 < 0) {
							idx++;
							continue;
						}
						const k2 = t2.slice(0, c2).trim();
						const v2 = t2.slice(c2 + 1).trim();
						idx++;
						obj[k2] = v2 === '' ? parseBlock(li2 + 1) : readScalar(v2);
					}
					arr.push(obj);
				} else {
					arr.push(readScalar(rest));
				}
			}
			return arr;
		}

		const obj: Record<string, YamlVal> = {};
		while (idx < lines.length) {
			const line = lines[idx] as string;
			if (line.trim() === '') {
				idx++;
				continue;
			}
			const li = countIndent(line);
			if (li < indent) break;
			const t = line.trim();
			if (t.startsWith('#')) {
				idx++;
				continue;
			}
			const ci = t.indexOf(':');
			if (ci < 0) {
				idx++;
				continue;
			}
			const key = t.slice(0, ci).trim();
			const val = t.slice(ci + 1).trim();
			idx++;
			if (val === '') {
				const next = lines[idx] as string | undefined;
				if (next !== undefined && next.trim() !== '' && countIndent(next) > li) {
					obj[key] = parseBlock(li + 1);
				} else if (next !== undefined && /^-\s/.test(next.trim()) && countIndent(next) >= li) {
					obj[key] = parseBlock(li);
				} else {
					obj[key] = '';
				}
			} else {
				obj[key] = readScalar(val);
			}
		}
		return obj;
	}

	const result = parseBlock(0);
	if (result && typeof result === 'object' && !Array.isArray(result)) {
		return result as Record<string, YamlVal>;
	}
	return {};
}

export function parseFrontmatter(raw: string): ParsedFrontmatter {
	const text = raw.replace(/\r\n/g, '\n').trim();

	const direct = text.match(/^---\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
	if (direct) {
		return { data: parseSimpleYaml(direct[1] as string), body: (direct[2] as string).trim(), found: true };
	}

	const fence = text.match(/```(?:ya?ml|markdown|md)?\s*\n([\s\S]*?)```/i);
	if (fence) {
		const inner = fence[1] as string;
		const innerFm = inner.match(/^---\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
		if (innerFm) {
			const after = text.slice((fence.index ?? 0) + fence[0].length).trim();
			const body = `${(innerFm[2] as string).trim()}\n${after}`.trim();
			return { data: parseSimpleYaml(innerFm[1] as string), body, found: true };
		}
		if (/^\s*title\s*:/m.test(inner) && /^\s*description\s*:/m.test(inner)) {
			const after = text.slice((fence.index ?? 0) + fence[0].length).trim();
			return { data: parseSimpleYaml(inner), body: after, found: true };
		}
	}

	const loose = text.match(/^([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
	if (loose && /^\s*title\s*:/m.test(loose[1] as string) && /^\s*description\s*:/m.test(loose[1] as string)) {
		return { data: parseSimpleYaml(loose[1] as string), body: (loose[2] as string).trim(), found: true };
	}

	return { data: {}, body: text, found: false };
}

export function asString(v: unknown): string {
	if (v === null || v === undefined) return '';
	if (typeof v === 'string') return v;
	if (typeof v === 'number' || typeof v === 'boolean') return String(v);
	return '';
}

export function asNumber(v: unknown, fallback = 0): number {
	const n = typeof v === 'number' ? v : parseFloat(asString(v));
	return Number.isFinite(n) ? n : fallback;
}

export function asArray(v: unknown): unknown[] {
	return Array.isArray(v) ? v : [];
}

export function clamp(n: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, n));
}

export function stdDev(nums: number[]): number {
	if (nums.length < 2) return 0;
	const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
	const variance = nums.reduce((a, b) => a + (b - mean) ** 2, 0) / nums.length;
	return Math.sqrt(variance);
}

export function readGlobalOpencodeConfig(): Record<string, unknown> {
	const candidates = [
		path.join(os.homedir(), '.config', 'opencode', 'opencode.json'),
		path.join(os.homedir(), '.config', 'opencode', 'opencode.jsonc'),
	];
	for (const c of candidates) {
		if (!exists(c)) continue;
		const text = readText(c);
		try {
			return JSON.parse(text) as Record<string, unknown>;
		} catch {
			const stripped = stripJsonComments(text);
			try {
				return JSON.parse(stripped) as Record<string, unknown>;
			} catch {
				// ignore
			}
		}
	}
	return {};
}

function stripJsonComments(input: string): string {
	let out = '';
	let inString = false;
	let quote = '';
	for (let i = 0; i < input.length; i++) {
		const c = input[i] as string;
		const n = input[i + 1];
		if (inString) {
			out += c;
			if (c === '\\') {
				out += n ?? '';
				i++;
				continue;
			}
			if (c === quote) inString = false;
			continue;
		}
		if (c === '"' || c === "'") {
			inString = true;
			quote = c;
			out += c;
			continue;
		}
		if (c === '/' && n === '/') {
			while (i < input.length && input[i] !== '\n') i++;
			out += '\n';
			continue;
		}
		if (c === '/' && n === '*') {
			i += 2;
			while (i < input.length && !(input[i] === '*' && input[i + 1] === '/')) i++;
			i++;
			continue;
		}
		out += c;
	}
	return out;
}
