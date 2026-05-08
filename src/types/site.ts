export type TemplateName = 'classic-legal' | 'modern-minimal';

export interface SiteConfig {
	template: TemplateName;
	version: string;
	brand: {
		name: string;
		tagline: string;
		aboutShort: string;
		aboutLong: string;
	};
	seo: {
		siteUrl: string;
		defaultTitle: string;
		defaultDescription: string;
		locale: string;
	};
	contact: {
		phoneDisplay: string;
		whatsappNumberE164: string;
		email: string;
		address: string;
	};
	helpDesk: {
		launcherLabel: string;
		panelTitle: string;
		introText: string;
		submitLabel: string;
		defaultMessageIntro: string;
	};
}

export interface BlogPostFrontmatter {
	title: string;
	description: string;
	date: Date;
	author: string;
	tags: string[];
	coverImage?: string;
	// Astro reserves slug in schema, but frontmatter may still define it.
	slug?: string;
}

export interface HelpDeskWhatsAppInput {
	fullName: string;
	message: string;
	pageUrl: string;
	intro?: string;
}
