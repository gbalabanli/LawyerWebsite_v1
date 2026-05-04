import type { SiteConfig } from '../types/site';

const publicSiteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://example-lawyer.github.io';

export const siteConfig: SiteConfig = {
	template: 'classic-legal',
	version: 'v.0.0.1',
	brand: {
		name: 'Aydin Law Office',
		tagline: 'Strategic Legal Counsel for Individuals and Businesses',
		aboutShort: 'Litigation, contracts, and advisory services with a clear process.',
		aboutLong:
			'I represent clients in civil and commercial matters with a focus on practical outcomes, transparent communication, and careful preparation.',
	},
	seo: {
		siteUrl: publicSiteUrl,
		defaultTitle: 'Aydin Law Office | Lawyer Website',
		defaultDescription:
			'Lawyer website covering legal services, attorney profile, and educational blog posts on law topics.',
		locale: 'en_US',
	},
	contact: {
		phoneDisplay: '+90 555 123 45 67',
		whatsappNumberE164: '905551234567',
		email: 'contact@examplelaw.com',
		address: 'Istanbul, Turkiye',
	},
};

export const getWhatsAppLink = (message: string): string => {
	const encoded = encodeURIComponent(message);
	return `https://wa.me/${siteConfig.contact.whatsappNumberE164}?text=${encoded}`;
};
