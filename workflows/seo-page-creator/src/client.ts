import path from 'node:path';
import fs from 'node:fs';
import { readGlobalOpencodeConfig } from './util.ts';
import type { ModelsConfig, PolicyConfig, ProviderConfig, RubricConfig } from './types.ts';

export interface ResolvedProvider {
	name: string;
	baseURL: string;
	apiKey?: string;
	headers: Record<string, string>;
}

export function loadModelsConfig(root: string): ModelsConfig {
	const p = path.join(root, 'config', 'models.json');
	const cfg = JSON.parse(readFile(p)) as ModelsConfig;
	if (!cfg.defaults) cfg.defaults = { temperature: 0.7, maxTokens: 8192, timeoutMs: 180000 };
	return cfg;
}

export function loadPolicyConfig(root: string): PolicyConfig {
	const p = path.join(root, 'config', 'policy.json');
	return JSON.parse(readFile(p)) as PolicyConfig;
}

export function loadRubricConfig(root: string): RubricConfig {
	const p = path.join(root, 'config', 'rubric.json');
	return JSON.parse(readFile(p)) as RubricConfig;
}

function readFile(p: string): string {
	return fs.readFileSync(p, 'utf8');
}

export function resolveProvider(name: string, cfg: ProviderConfig): ResolvedProvider {
	let baseURL = cfg.baseURL;
	let apiKey = cfg.apiKey;
	if (!apiKey && cfg.apiKeyEnv) {
		apiKey = process.env[cfg.apiKeyEnv];
	}
	if ((!apiKey || !baseURL) && cfg.opencodeProvider) {
		const global = readGlobalOpencodeConfig() as Record<string, unknown>;
		const providers = global.provider as Record<string, Record<string, unknown>> | undefined;
		const op = providers?.[cfg.opencodeProvider] as Record<string, unknown> | undefined;
		const options = op?.options as Record<string, unknown> | undefined;
		if (!apiKey && typeof options?.apiKey === 'string') apiKey = options.apiKey;
		if (!baseURL && typeof options?.baseURL === 'string') baseURL = options.baseURL;
	}
	if (!baseURL) {
		throw new Error(`provider "${name}" has no baseURL (set it in config/models.json)`);
	}
	return { name, baseURL, apiKey, headers: cfg.headers ?? {} };
}

export interface ChatRequest {
	provider: ResolvedProvider;
	model: string;
	messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
	temperature?: number;
	maxTokens?: number;
	timeoutMs?: number;
}

export interface ChatResult {
	ok: boolean;
	content: string;
	reasoning: string;
	finishReason?: string;
	usage: { promptTokens?: number; completionTokens?: number; totalTokens?: number };
	latencyMs: number;
	attempts: number;
	error?: string;
}

function joinURL(base: string, suffix: string): string {
	return `${base.replace(/\/+$/, '')}${suffix}`;
}

async function postChat(
	req: ChatRequest,
	includeTemperature: boolean,
): Promise<{ status: number; body: unknown; text: string }> {
	const url = joinURL(req.provider.baseURL, '/chat/completions');
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), req.timeoutMs ?? 180000);
	const payload: Record<string, unknown> = {
		model: req.model,
		messages: req.messages,
		max_tokens: req.maxTokens ?? 8192,
		stream: false,
	};
	if (includeTemperature && typeof req.temperature === 'number') {
		payload.temperature = req.temperature;
	}
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...req.provider.headers,
	};
	if (req.provider.apiKey) headers.Authorization = `Bearer ${req.provider.apiKey}`;
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify(payload),
			signal: controller.signal,
		});
		const text = await res.text();
		let body: unknown = null;
		try {
			body = JSON.parse(text);
		} catch {
			body = null;
		}
		return { status: res.status, body, text };
	} finally {
		clearTimeout(timeout);
	}
}

function extractMessage(body: unknown): { content: string; reasoning: string; finishReason?: string; usage: ChatResult['usage'] } {
	const b = body as Record<string, unknown> | null;
	const choices = (b?.choices as Array<Record<string, unknown>> | undefined) ?? [];
	const choice = choices[0];
	const message = (choice?.message as Record<string, unknown> | undefined) ?? {};
	const content = typeof message.content === 'string' ? message.content : '';
	const reasoning =
		typeof message.reasoning_content === 'string'
			? message.reasoning_content
			: typeof message.reasoning === 'string'
				? message.reasoning
				: '';
	const u = (b?.usage as Record<string, unknown> | undefined) ?? {};
	return {
		content,
		reasoning,
		finishReason: typeof choice?.finish_reason === 'string' ? choice.finish_reason : undefined,
		usage: {
			promptTokens: typeof u.prompt_tokens === 'number' ? u.prompt_tokens : undefined,
			completionTokens: typeof u.completion_tokens === 'number' ? u.completion_tokens : undefined,
			totalTokens: typeof u.total_tokens === 'number' ? u.total_tokens : undefined,
		},
	};
}

function errorMessage(status: number, body: unknown, text: string): string {
	const b = body as Record<string, unknown> | null;
	const err = b?.error as Record<string, unknown> | string | undefined;
	if (err && typeof err === 'object') {
		const m = err.message;
		if (typeof m === 'string') return `HTTP ${status}: ${m}`;
	}
	if (typeof err === 'string') return `HTTP ${status}: ${err}`;
	return `HTTP ${status}: ${text.slice(0, 200)}`;
}

export async function chatCompletion(req: ChatRequest): Promise<ChatResult> {
	const hardMaxAttempts = 6;
	const started = Date.now();
	let lastError = '';
	let attempt = 0;
	while (attempt < hardMaxAttempts) {
		attempt++;
		try {
			const res = await postChat(req, attempt < 3);
			if (res.status >= 200 && res.status < 300) {
				const msg = extractMessage(res.body);
				return {
					ok: true,
					content: msg.content,
					reasoning: msg.reasoning,
					finishReason: msg.finishReason,
					usage: msg.usage,
					latencyMs: Date.now() - started,
					attempts: attempt,
				};
			}
			lastError = errorMessage(res.status, res.body, res.text);
			const is429 = res.status === 429;
			const retryable = is429 || res.status === 408 || res.status >= 500;
			const maxAttempts = is429 ? 6 : 3;
			if (!retryable || attempt >= maxAttempts) break;
			await new Promise((r) => setTimeout(r, is429 ? 12000 * attempt : 1500 * attempt));
		} catch (e) {
			lastError = e instanceof Error ? (e.name === 'AbortError' ? 'timeout' : e.message) : String(e);
			if (attempt >= 3) break;
			await new Promise((r) => setTimeout(r, 1500 * attempt));
		}
	}
	return {
		ok: false,
		content: '',
		reasoning: '',
		usage: {},
		latencyMs: Date.now() - started,
		attempts: attempt,
		error: lastError,
	};
}
