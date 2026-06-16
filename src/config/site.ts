import type { HelpDeskWhatsAppInput, SiteConfig } from '../types/site';
import { defaultLang, type Lang } from '../i18n/ui';
import { t } from '../i18n/ui';
import { translations } from '../i18n/translations';

const publicSiteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://bariscembalabanli.av.tr';

export const siteConfig: SiteConfig = {
	template: 'classic-legal',
	version: 'v.0.0.1',
	brand: {
		name: 'Balabanlı Hukuk Bürosu',
		tagline: {
			tr: 'Her Hukuki Sorunda, Stratejik \u00c7\u00f6z\u00fcm Orta\u011f\u0131n\u0131z',
			en: 'Strategic Legal Counsel for Individuals and Businesses',
		},
		aboutShort: {
			tr: 'Dava, sözleşmeler ve danışmanlık hizmetleri açık bir süreç ile.',
			en: 'Litigation, contracts, and advisory services with a clear process.',
		},
		aboutLong: {
			tr: 'Müvekkillerimi medeni ve ticari konularda temsil ediyorum; pratik sonuçlar, şeffaf iletişim ve dikkatli hazırlık odak noktam.',
			en: 'I represent clients in civil and commercial matters with a focus on practical outcomes, transparent communication, and careful preparation.',
		},
	},
	seo: {
		siteUrl: publicSiteUrl,
		defaultTitle: {
			tr: 'Balabanlı Hukuk Bürosu | Avukat Barış C. Balabanlı',
			en: 'Balabanlı Law Office | Attorney Barış C. Balabanlı',
		},
		defaultDescription: {
			tr: 'İstanbul merkezli Balabanlı Hukuk Bürosu, medeni hukuk ve ticari hukuk alanlarında uzman avukatlık hizmeti sunar.',
			en: 'Balabanlı Law Office, based in Istanbul, provides expert legal services in civil and commercial law.',
		},
		ogImage: '/images/og-default.jpg',
	},
	contact: {
		phoneDisplay: '+90 555 123 45 67',
		whatsappNumberE164: '905301178034',
		email: 'consult@bariscembalabanli.av.tr',
		address: 'Eski Bağdat Caddesi Altıntepe 34840 İstanbul / Türkiye',
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
