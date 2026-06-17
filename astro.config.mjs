import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'https://bariscembalabanli.av.tr';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
	site,
	base,
	output: 'static',
	integrations: [sitemap({
		filter: (page) => !page.includes('/404'),
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
