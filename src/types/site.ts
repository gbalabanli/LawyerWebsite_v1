import type { Lang } from '../i18n/ui';

export type TemplateName = 'classic-legal' | 'modern-minimal';

export interface SiteConfig {
	template: TemplateName;
	version: string;
	brand: {
		name: string;
		tagline: Record<Lang, string>;
		aboutShort: Record<Lang, string>;
		aboutLong: Record<Lang, string>;
	};
	seo: {
		siteUrl: string;
		defaultTitle: Record<Lang, string>;
		defaultDescription: Record<Lang, string>;
		ogImage: string;
	};
	contact: {
		phoneDisplay: string;
		whatsappNumberE164: string;
		email: string;
		address: string;
	};
}

export interface BlogPostFrontmatter {
	title: string;
	description: string;
	date: Date;
	author: string;
	tags: string[];
	coverImage?: string;
	slug?: string;
	lang: Lang;
}

export interface HelpDeskWhatsAppInput {
	fullName: string;
	message: string;
	pageUrl: string;
	intro?: string;
}
