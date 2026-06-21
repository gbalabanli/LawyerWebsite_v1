import { defaultLang, supportedLangs, type Lang } from './ui';
import { getServiceAreaBySlug } from '../config/services';

const routeMap: Record<Lang, Record<string, string>> = {
	tr: {
		home: '/',
		about: '/hakkimda',
		contact: '/iletisim',
		blog: '/blog',
	},
	en: {
		home: '/en/',
		about: '/en/about',
		contact: '/en/contact',
		blog: '/en/blog',
	},
};

export function getLocalizedPath(pageKey: string, lang: Lang): string {
	return routeMap[lang]?.[pageKey] ?? '/';
}

export function getAlternatePath(currentPathname: string, targetLang: Lang): string {
	return getEquivalentAlternatePath(currentPathname, targetLang) ?? getFallbackAlternatePath(currentPathname, targetLang);
}

export function getEquivalentAlternatePath(currentPathname: string, targetLang: Lang): string | null {
	const trToEn: Record<string, string> = {
		'/': '/en/',
		'/hakkimda': '/en/about',
		'/iletisim': '/en/contact',
		'/hizmetler': '/en/services',
		'/blog': '/en/blog',
	};

	const enToTr: Record<string, string> = {
		'/en/': '/',
		'/en/about': '/hakkimda',
		'/en/contact': '/iletisim',
		'/en/services': '/hizmetler',
		'/en/blog': '/blog',
	};

	if (targetLang === 'en') {
		const mapped = trToEn[currentPathname];
		if (mapped) return mapped;

		if (currentPathname.startsWith('/blog/')) {
			return '/en/blog';
		}

		if (currentPathname.startsWith('/hizmetler/')) {
			const slug = currentPathname.replace('/hizmetler/', '');
			return getServiceAreaBySlug('en', slug) ? `/en/services/${slug}` : null;
		}
	}

	if (targetLang === 'tr') {
		const mapped = enToTr[currentPathname];
		if (mapped) return mapped;

		if (currentPathname.startsWith('/en/blog/')) {
			return '/blog';
		}

		if (currentPathname.startsWith('/en/services/')) {
			const slug = currentPathname.replace('/en/services/', '');
			return getServiceAreaBySlug('tr', slug) ? `/hizmetler/${slug}` : null;
		}
	}

	return null;
}

function getFallbackAlternatePath(currentPathname: string, targetLang: Lang): string {
	if (currentPathname.startsWith('/hizmetler/') || currentPathname.startsWith('/en/services/')) {
		return targetLang === 'en' ? '/en/services' : '/hizmetler';
	}

	if (currentPathname.startsWith('/blog/') || currentPathname.startsWith('/en/blog/')) {
		return targetLang === 'en' ? '/en/blog' : '/blog';
	}

	return targetLang === 'en' ? '/en/' : '/';
}

export function getAlternateLangs(currentLang: Lang): Lang[] {
	return supportedLangs.filter((l) => l !== currentLang);
}

export { defaultLang, supportedLangs };
export type { Lang };
