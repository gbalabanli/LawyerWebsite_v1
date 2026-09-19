import { readJson } from './util.ts';
import type { PageRequest, QueueFile } from './types.ts';

export function loadQueue(p: string): PageRequest[] {
	const data = readJson<QueueFile>(p);
	if (!data.requests || !Array.isArray(data.requests)) {
		throw new Error(`queue file has no "requests" array: ${p}`);
	}
	return data.requests;
}

export function findRequest(requests: PageRequest[], id: string): PageRequest {
	const r = requests.find((x) => x.id === id);
	if (!r) throw new Error(`request id not found: ${id}`);
	return r;
}
