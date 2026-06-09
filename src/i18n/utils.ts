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

export function getAlternatePath(currentPathname: string, targetLang: Lang, basePath: string = '/'): string {
	const pathnameWithoutBase =
		basePath !== '/' && currentPathname.startsWith(basePath)
			? currentPathname.slice(basePath.length) || '/'
			: currentPathname;

	const trToEn: Record<string, string> = {
		'/': '/en/',
		'/hakkimda': '/en/about',
		'/iletisim': '/en/contact',
		'/blog': '/en/blog',
	};

	const enToTr: Record<string, string> = {
		'/en/': '/',
		'/en/about': '/hakkimda',
		'/en/contact': '/iletisim',
		'/en/blog': '/blog',
	};

	if (targetLang === 'en') {
		const mapped = trToEn[pathnameWithoutBase];
		if (mapped) return basePath !== '/' ? `${basePath}${mapped}`.replace(/\/+/g, '/') : mapped;

		if (pathnameWithoutBase.startsWith('/blog/')) {
			return basePath !== '/' ? `${basePath}/en/blog`.replace(/\/+/g, '/') : '/en/blog';
		}
	}

	if (targetLang === 'tr') {
		const mapped = enToTr[pathnameWithoutBase];
		if (mapped) return basePath !== '/' ? `${basePath}${mapped}`.replace(/\/+/g, '/') : mapped;

		if (pathnameWithoutBase.startsWith('/en/blog/')) {
			return basePath !== '/' ? `${basePath}/blog`.replace(/\/+/g, '/') : '/blog';
		}
	}

	return basePath !== '/' ? `${basePath}/` : '/';
}

export function getAlternateLangs(currentLang: Lang): Lang[] {
	return supportedLangs.filter((l) => l !== currentLang);
}

export { defaultLang, supportedLangs };
export type { Lang };
