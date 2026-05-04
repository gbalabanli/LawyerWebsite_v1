const HAS_PROTOCOL = /^[a-z]+:/i;

export const withBase = (path: string): string => {
	if (!path || HAS_PROTOCOL.test(path) || path.startsWith('#')) {
		return path;
	}

	const base = import.meta.env.BASE_URL || '/';
	const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;

	if (!normalizedBase) {
		return normalizedPath;
	}

	return `${normalizedBase}${normalizedPath}`;
};
