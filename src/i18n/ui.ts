import { translations } from './translations';

export const defaultLang = 'tr';
export const supportedLangs = ['tr', 'en'] as const;
export type Lang = (typeof supportedLangs)[number];

type NestedKeyOf<T> = T extends object
	? {
			[K in keyof T & string]: T[K] extends object
				? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
				: `${K}`;
		}[keyof T & string]
	: never;

export type TranslationPath = NestedKeyOf<(typeof translations)['tr']>;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
	const keys = path.split('.');
	let current: unknown = obj;
	for (const key of keys) {
		if (current && typeof current === 'object' && key in current) {
			current = (current as Record<string, unknown>)[key];
		} else {
			return path;
		}
	}
	return typeof current === 'string' ? current : path;
}

export function t(lang: Lang, path: TranslationPath): string {
	const dict = translations[lang] as Record<string, unknown>;
	return getNestedValue(dict, path);
}

export function getLangFromUrl(url: URL): Lang {
	const [, langSegment] = url.pathname.split('/');
	if (supportedLangs.includes(langSegment as Lang)) {
		return langSegment as Lang;
	}
	return defaultLang;
}

export function getDateLocale(lang: Lang): string {
	return lang === 'tr' ? 'tr-TR' : 'en-US';
}
