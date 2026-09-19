import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import type { ApprovedPage, PolicyConfig } from './types.ts';
import { asArray, asString, exists, parseFrontmatter, readText, writeText } from './util.ts';
import { injectServiceTag, normalizeFrontmatter, parseStrictFrontmatter } from './yaml.ts';

export interface PagePlan {
	slug: string;
	lang: 'tr' | 'en';
	relPath: string;
	absPath: string;
	content: string;
	llmsEntry: string;
	issues: string[];
}

function contentPathRel(lang: 'tr' | 'en', slug: string): string {
	return `src/content/posts/${lang}/${slug}.md`;
}

export function canonicalPageUrl(policy: PolicyConfig, lang: 'tr' | 'en', slug: string): string {
	const base = policy.siteUrl.replace(/\/+$/, '');
	return `${base}${lang === 'en' ? '/en' : ''}/blog/${slug}/`;
}

/**
 * Astro's content loader honors a `slug:` frontmatter field and uses it for the
 * route instead of the filename. We always want the filename to define the URL,
 * so remove any slug field the model may have added.
 */
export function stripFrontmatterSlug(content: string): string {
	const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!m) return content;
	const kept = (m[1] as string).split(/\r?\n/).filter((l) => !/^slug:\s*/.test(l));
	return `---\n${kept.join('\n')}\n---\n${m[2] as string}`;
}

export function buildPagePlan(root: string, approved: ApprovedPage, policy: PolicyConfig): PagePlan {
	const { request, slug } = approved;
	let content = approved.content;
	const issues: string[] = [];

	const withoutSlug = stripFrontmatterSlug(content);
	if (withoutSlug !== content) issues.push('removed slug field (URL is derived from the filename)');
	content = normalizeFrontmatter(withoutSlug);

	const strict = parseStrictFrontmatter(content);
	if (!strict.ok) issues.push(`frontmatter invalid: ${strict.error}`);
	const data = strict.data;
	if (!asString(data.title)) issues.push('missing title');
	if (!asString(data.description)) issues.push('missing description');
	const dateVal = data.date;
	if (!(dateVal instanceof Date) && !(typeof dateVal === 'string' && dateVal.trim())) issues.push('missing date');
	if (!asString(data.author)) issues.push('missing author');
	if (asArray(data.tags).length === 0) issues.push('missing tags');

	const before = content;
	content = injectServiceTag(content, request.serviceTag);
	if (content !== before && strict.ok) issues.push(`service tag "${request.serviceTag}" injected into tags`);

	const strict2 = parseStrictFrontmatter(content);
	const title = asString(strict2.data.title);
	const description = asString(strict2.data.description);
	const prefix = request.lang === 'en' ? 'en/' : '';
	const llmsEntry = `- [${title}](${policy.siteUrl}/${prefix}blog/${slug}): ${description}`;
	const relPath = contentPathRel(request.lang, slug);

	return {
		slug,
		lang: request.lang,
		relPath,
		absPath: path.join(root, relPath),
		content,
		llmsEntry,
		issues,
	};
}

function insertIntoSection(text: string, sectionHeading: string, entry: string): string {
	const lines = text.replace(/\r\n/g, '\n').split('\n');
	const start = lines.findIndex((l) => l.trim() === sectionHeading);
	if (start < 0) return `${text.replace(/\s+$/, '')}\n${entry}\n`;
	let end = lines.length;
	for (let i = start + 1; i < lines.length; i++) {
		if ((lines[i] as string).startsWith('## ')) {
			end = i;
			break;
		}
	}
	let insertAt = end;
	while (insertAt > start + 1 && (lines[insertAt - 1] as string).trim() === '') insertAt--;
	lines.splice(insertAt, 0, entry);
	return lines.join('\n');
}

export function updateLlms(root: string, policy: PolicyConfig, plan: PagePlan): { changed: boolean; added: boolean } {
	const p = path.join(root, policy.llmsFile);
	let text = readText(p);
	const section = plan.lang === 'en' ? '## English Blog Posts' : '## Blog Yazıları';
	let added = false;
	if (!text.includes(plan.llmsEntry)) {
		text = insertIntoSection(text, section, plan.llmsEntry);
		writeText(p, text);
		added = true;
	}
	return { changed: added, added };
}

export function verifyBuild(
	root: string,
	plan: PagePlan,
	onLog?: (m: string) => void,
	skipBuild = false,
): { ok: boolean; issues: string[] } {
	const issues: string[] = [];
	if (!skipBuild) {
		onLog?.('running npm run build ...');
		try {
			execSync('npm run build', { cwd: root, stdio: 'pipe', timeout: 240000, shell: true });
		} catch (e) {
			const err = e as { stdout?: Buffer; stderr?: Buffer; message?: string };
			issues.push(`build failed: ${String(err.stderr?.toString() || err.message || e).slice(0, 400)}`);
			return { ok: false, issues };
		}
	}

	const distHtml = path.join(root, 'dist', plan.lang === 'en' ? 'en/blog' : 'blog', plan.slug, 'index.html');
	if (!exists(distHtml)) issues.push(`missing built page: ${path.relative(root, distHtml)}`);

	const sitemapCandidates = ['sitemap-0.xml', 'sitemap-index.xml', 'sitemap.xml'].map((f) => path.join(root, 'dist', f));
	const needle = `/${plan.lang === 'en' ? 'en/blog' : 'blog'}/${plan.slug}`;
	let foundInSitemap = false;
	for (const c of sitemapCandidates) {
		if (!exists(c)) continue;
		if (fs.readFileSync(c, 'utf8').includes(needle)) {
			foundInSitemap = true;
			break;
		}
	}
	if (!foundInSitemap) issues.push(`sitemap does not contain ${needle}`);

	return { ok: issues.length === 0, issues };
}

export function commitAndPush(
	root: string,
	policy: PolicyConfig,
	files: string[],
	message: string,
	push: boolean,
	onLog?: (m: string) => void,
): { ok: boolean; detail: string } {
	const git = policy.git;
	const quoted = files.map((f) => `"${f.replace(/"/g, '\\"')}"`).join(' ');
	const run = (cmd: string) => execSync(cmd, { cwd: root, stdio: 'pipe', encoding: 'utf8', shell: true });
	try {
		run(`git add -- ${quoted}`);
		const out = run(`git commit -m "${message.replace(/"/g, '\\"')}"`);
		onLog?.(out.trim().split('\n')[0] ?? 'committed');
		if (push) {
			run(`git push ${git.remote} HEAD`);
			onLog?.(`pushed to ${git.remote}`);
		}
		return { ok: true, detail: 'committed' + (push ? ' + pushed' : '') };
	} catch (e) {
		const err = e as { stdout?: string; stderr?: string; message?: string };
		return { ok: false, detail: String(err.stderr || err.stdout || err.message || e).slice(0, 500) };
	}
}
