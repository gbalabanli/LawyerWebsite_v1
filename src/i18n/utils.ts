import { defaultLang, supportedLangs, type Lang } from './ui';

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
			return currentPathname.replace('/hizmetler/', '/en/services/');
		}
	}

	if (targetLang === 'tr') {
		const mapped = enToTr[currentPathname];
		if (mapped) return mapped;

		if (currentPathname.startsWith('/en/blog/')) {
			return '/blog';
		}

		if (currentPathname.startsWith('/en/services/')) {
			return currentPathname.replace('/en/services/', '/hizmetler/');
		}
	}

	return '/';
}

export function getAlternateLangs(currentLang: Lang): Lang[] {
	return supportedLangs.filter((l) => l !== currentLang);
}

export { defaultLang, supportedLangs };
export type { Lang };
