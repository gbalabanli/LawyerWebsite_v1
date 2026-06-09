import type { HelpDeskWhatsAppInput, SiteConfig } from '../types/site';
import { defaultLang, type Lang } from '../i18n/ui';
import { t } from '../i18n/ui';
import { translations } from '../i18n/translations';

const publicSiteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://example-lawyer.github.io';

export const siteConfig: SiteConfig = {
	template: 'classic-legal',
	version: 'v.0.0.1',
	brand: {
		name: 'Aydin Law Office',
		tagline: {
			tr: 'Bireyler ve \u0130\u015fletmeler i\u00e7in Stratejik Hukuki Dan\u0131\u015fmanl\u0131k',
			en: 'Strategic Legal Counsel for Individuals and Businesses',
		},
		aboutShort: {
			tr: 'Dava, s\u00f6zle\u015fmeler ve dan\u0131\u015fmanl\u0131k hizmetleri a\u00e7\u0131k bir s\u00fcre\u00e7 ile.',
			en: 'Litigation, contracts, and advisory services with a clear process.',
		},
		aboutLong: {
			tr: 'M\u00fcvekkillerimi medeni ve ticari konularda temsil ediyorum; pratik sonu\u00e7lar, \u015feffaf ileti\u015fim ve dikkatli haz\u0131rl\u0131k odak noktam.',
			en: 'I represent clients in civil and commercial matters with a focus on practical outcomes, transparent communication, and careful preparation.',
		},
	},
	seo: {
		siteUrl: publicSiteUrl,
		defaultTitle: {
			tr: 'Aydin Law Office | Avukat Web Sitesi',
			en: 'Aydin Law Office | Lawyer Website',
		},
		defaultDescription: {
			tr: 'Hukuki hizmetler, avukat profili ve hukuk konular\u0131nda e\u011fitici blog yaz\u0131lar\u0131 sunan avukat web sitesi.',
			en: 'Lawyer website covering legal services, attorney profile, and educational blog posts on law topics.',
		},
	},
	contact: {
		phoneDisplay: '+90 555 123 45 67',
		whatsappNumberE164: '905301178034',
		email: 'contact@examplelaw.com',
		address: 'Istanbul, Turkiye',
	},
};

export const helpDeskTriggerHref = '#help-desk';

export function getHelpDeskWhatsAppLink(
	lang: Lang,
	{ fullName, message, pageUrl }: HelpDeskWhatsAppInput,
): string {
	const intro = translations[lang].helpDesk.whatsappIntro;
	const payload = [intro, `Name: ${fullName}`, `Page: ${pageUrl}`, 'Message:', message].join('\n');
	const encoded = encodeURIComponent(payload);
	return `https://wa.me/${siteConfig.contact.whatsappNumberE164}?text=${encoded}`;
}
