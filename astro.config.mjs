import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'https://example-lawyer.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
	site,
	base,
	output: 'static',
	integrations: [sitemap()],
	i18n: {
		defaultLocale: 'tr',
		locales: ['tr', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
