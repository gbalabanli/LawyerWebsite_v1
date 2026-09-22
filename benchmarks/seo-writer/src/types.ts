export interface TitleEntry {
	id: string;
	lang: 'tr' | 'en';
	title: string;
	primaryKeyword: string;
	serviceTag: string;
	notes?: string;
}

export interface ModelEntry {
	id: string;
	provider: string;
	label: string;
	tier: 'free' | 'free-tier' | 'paid';
	enabled: boolean;
	langs?: ('tr' | 'en')[];
	temperature?: number;
	maxTokens?: number;
	timeoutMs?: number;
}

export interface ProviderConfig {
	baseURL: string;
	apiKey?: string;
	apiKeyEnv?: string;
	opencodeProvider?: string;
	headers?: Record<string, string>;
	transport?: 'openai' | 'opencode-cli';
}

export interface ModelsConfig {
	defaults: { temperature: number; maxTokens: number; timeoutMs: number };
	providers: Record<string, ProviderConfig>;
	models: ModelEntry[];
}

export interface JudgeEntry {
	provider: string;
	model: string;
	label: string;
}

export interface JudgesConfig {
	allowSelfJudge: boolean;
	temperature: number;
	runsPerJudge: number;
	judges: JudgeEntry[];
}

export interface RubricCriterion {
	key: string;
	label: string;
	weight: number;
	guidance: string;
}

export interface DetCheck {
	key: string;
	label: string;
	weight: number;
}

export interface RubricConfig {
	finalWeights: { judge: number; deterministic: number; agent: number };
	judge: { scale: number; criteria: RubricCriterion[] };
	deterministic: { checks: DetCheck[] };
}

export interface GeneratedArticle {
	model: string;
	modelLabel: string;
	titleId: string;
	lang: 'tr' | 'en';
	ok: boolean;
	error?: string;
	content: string;
	reasoning?: string;
	finishReason?: string;
	promptTokens?: number;
	completionTokens?: number;
	totalTokens?: number;
	latencyMs: number;
	attempts: number;
	createdAt: string;
}

export interface ParsedFrontmatter {
	data: Record<string, unknown>;
	body: string;
	found: boolean;
}

export interface DetMetrics {
	wordCount: number;
	titleLength: number;
	descriptionLength: number;
	h1Count: number;
	h2Count: number;
	h3Count: number;
	skippedHeadingLevel: boolean;
	paragraphCount: number;
	avgParagraphWords: number;
	keywordDensity: number;
	keywordInTitle: boolean;
	keywordInDescription: boolean;
	keywordInIntro: boolean;
	keywordInHeading: boolean;
	hasFaq: boolean;
	faqCount: number;
	hasLists: boolean;
	internalLinkCount: number;
	hasCta: boolean;
	frontmatterValid: boolean;
	firstParagraphWords: number;
	firstParagraphOk: boolean;
	checks: Record<string, number>;
	seoScore: number;
}

export interface JudgeScore {
	model: string;
	titleId: string;
	judge: string;
	ok: boolean;
	error?: string;
	scores: Record<string, number>;
	reasons: Record<string, string>;
	overallComment?: string;
	redFlags: string[];
	latencyMs: number;
}

export interface AgentReview {
	model: string;
	titleId: string;
	score: number;
	notes?: string;
}

export interface ModelAggregate {
	model: string;
	label: string;
	tier: string;
	runs: number;
	successes: number;
	failures: number;
	deterministicScore: number;
	judgeScore: number;
	agentScore: number | null;
	finalScore: number;
	byCriterion: Record<string, number>;
	consistencyStdDev: number;
	avgLatencyMs: number;
	avgTotalTokens: number;
	perTitle: Array<{
		titleId: string;
		deterministicScore: number;
		judgeScore: number | null;
		agentScore: number | null;
		finalScore: number;
	}>;
}
