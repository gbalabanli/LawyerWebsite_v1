import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

const robots = `User-agent: *
Allow: /

Sitemap: ${siteConfig.seo.siteUrl}/sitemap-index.xml
`;

export const GET: APIRoute = () =>
	new Response(robots, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
