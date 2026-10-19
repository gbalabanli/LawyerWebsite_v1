/**
 * Post-build SEO verification for the static site.
 *
 * Guards the canonicalization contract that GitHub Pages enforces: the build
 * emits directory-style URLs (`/blog/example/`), so every canonical, og:url,
 * hreflang and internal link must use the trailing-slash form. A canonical that
 * omits the slash points at a 301 redirect and blocks indexing.
 *
 * Run after `npm run build`:  npm run verify:seo
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = process.argv[2] ?? 'dist';
const SITEMAP = join(DIST, 'sitemap-0.xml');

const files = [];
const walk = (dir) => {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) walk(full);
		else if (full.endsWith('.html')) files.push(full);
	}
};

if (!existsSync(DIST)) {
	console.error(`Build output not found: ${DIST}. Run \`npm run build\` first.`);
	process.exit(1);
}
walk(DIST);

const rel = (file) => file.replace(DIST, '').replace(/\\/g, '/');
const isAsset = (path) => /\.[a-z0-9]+$/i.test(path);
const needsSlash = (path) => path !== '/' && !path.endsWith('/') && !isAsset(path);

const span = (html, re) => [...html.matchAll(re)];

const resolves = (path) => {
	const clean = decodeURIComponent(path.split(/[?#]/)[0]);
	const target = join(DIST, clean);
	if (existsSync(target) && statSync(target).isDirectory()) return existsSync(join(target, 'index.html'));
	return existsSync(target) || existsSync(`${target}.html`) || existsSync(join(target, 'index.html'));
};

const canonicals = new Set();
const badCanonical = [];
const badOg = [];
const badHreflang = [];
const badLinks = new Set();
const broken = new Map();
let linkCount = 0;

for (const file of files) {
	const html = readFileSync(file, 'utf8');

	for (const m of span(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)) {
		const path = new URL(m[1]).pathname;
		canonicals.add(m[1]);
		if (needsSlash(path)) badCanonical.push(`${rel(file)} -> ${m[1]}`);
	}

	for (const m of span(html, /<meta[^>]+property="og:url"[^>]+content="([^"]+)"/g)) {
		if (needsSlash(new URL(m[1]).pathname)) badOg.push(`${rel(file)} -> ${m[1]}`);
	}

	for (const m of span(html, /<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/g)) {
		if (needsSlash(new URL(m[2]).pathname)) badHreflang.push(`${rel(file)} [${m[1]}] -> ${m[2]}`);
	}

	for (const m of span(html, /href="(\/[^"]*)"/g)) {
		const href = m[1];
		if (href.startsWith('//') || isAsset(href.split(/[?#]/)[0])) continue;
		const path = href.split(/[?#]/)[0];
		linkCount++;
		if (needsSlash(path)) badLinks.add(path);
		if (!resolves(path)) {
			if (!broken.has(path)) broken.set(path, []);
			broken.get(path).push(rel(file));
		}
	}
}

const sitemapUrls = new Set(
	existsSync(SITEMAP)
		? [...readFileSync(SITEMAP, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
		: [],
);
// 404 pages are intentionally `noindex` and excluded from the sitemap.
const isNoIndexStub = (url) => /\/404\/?$/.test(new URL(url).pathname);
const canonicalNotInSitemap = [...canonicals].filter((url) => !isNoIndexStub(url) && !sitemapUrls.has(url));

const report = (label, items) => {
	console.log(`${items.length === 0 ? 'PASS' : 'FAIL'}  ${label}: ${items.length}`);
	items.slice(0, 15).forEach((x) => console.log(`        - ${x}`));
};

console.log(`Scanned ${files.length} HTML files, ${linkCount} internal links.\n`);
report('canonical URLs without trailing slash', badCanonical);
report('og:url without trailing slash', badOg);
report('hreflang without trailing slash', badHreflang);
report('internal links without trailing slash', [...badLinks]);
report('broken internal links (404)', [...broken.keys()]);
console.log(`PASS  canonical tags found: ${canonicals.size}`);
console.log(`PASS  sitemap URLs: ${sitemapUrls.size}`);
report('canonical URLs missing from sitemap', canonicalNotInSitemap);

const failed =
	badCanonical.length + badOg.length + badHreflang.length + badLinks.size + broken.size + canonicalNotInSitemap.length > 0;
console.log(`\n${failed ? 'SEO verification FAILED' : 'SEO verification passed.'}`);
process.exit(failed ? 1 : 0);
