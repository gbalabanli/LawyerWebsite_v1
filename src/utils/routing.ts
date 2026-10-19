const HAS_PROTOCOL = /^[a-z]+:/i;
const HAS_FILE_EXTENSION = /\.[a-z0-9]+$/i;

const splitPathSuffix = (path: string): [string, string] => {
	const index = path.search(/[?#]/);
	return index === -1 ? [path, ''] : [path.slice(0, index), path.slice(index)];
};

/**
 * Normalizes a route path to the trailing-slash form the static build serves.
 *
 * Astro's default build format emits directory-style output
 * (`/blog/example/index.html`), so pages resolve at `/blog/example/`. GitHub
 * Pages 301-redirects the extensionless variant (`/blog/example`) to it.
 * Canonical/OG/hreflang tags and internal links must therefore use the
 * trailing-slash form to avoid pointing at redirects (a canonical mismatch that
 * blocks indexing).
 *
 * The root, file-like paths (with an extension such as `favicon.svg`), and any
 * query string or hash fragment are left intact.
 */
export const toCanonicalPath = (path: string): string => {
	if (!path) {
		return '/';
	}

	const [rawPathname, suffix] = splitPathSuffix(path);
	const pathname = rawPathname.startsWith('/') ? rawPathname : `/${rawPathname}`;
	const lastSegment = pathname.split('/').filter(Boolean).pop() ?? '';
	const needsTrailingSlash =
		pathname !== '/' && !pathname.endsWith('/') && !HAS_FILE_EXTENSION.test(lastSegment);

	return `${pathname}${needsTrailingSlash ? '/' : ''}${suffix}`;
};

export const withBase = (path: string): string => {
	if (!path || HAS_PROTOCOL.test(path) || path.startsWith('#')) {
		return path;
	}

	const base = import.meta.env.BASE_URL || '/';
	const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
	const normalizedPath = toCanonicalPath(path);

	if (!normalizedBase) {
		return normalizedPath;
	}

	return `${normalizedBase}${normalizedPath}`;
};
