import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'https://bariscembalabanli.av.tr';
const base = process.env.BASE_PATH || '/';

// Legacy noindex redirect stubs: they 200 as static pages but canonicalize to
// another URL with robots noindex. Listed next to their indexable target in
// the sitemap they create a noindex-in-sitemap conflict, so they are filtered.
const SEO_REDIRECT_STUBS = [/\/en\/services\/espor\/?$/];

const isExcludedFromSitemap = (page) =>
	page.includes('/404') || SEO_REDIRECT_STUBS.some((stub) => stub.test(page));

export default defineConfig({
	site,
	base,
	output: 'static',
	integrations: [sitemap({
		filter: (page) => !isExcludedFromSitemap(page),
	})],
	compressHTML: true,
	build: {
		inlineStylesheets: 'always',
	},
	i18n: {
		defaultLocale: 'tr',
		locales: ['tr', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
