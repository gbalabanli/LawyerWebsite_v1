export type Lang = 'tr' | 'en';

export interface ProviderConfig {
	baseURL: string;
	apiKey?: string;
	apiKeyEnv?: string;
	opencodeProvider?: string;
	headers?: Record<string, string>;
}

export interface ModelEntry {
	id: string;
	provider: string;
	label: string;
	temperature?: number;
	maxTokens?: number;
	timeoutMs?: number;
}

export interface ModelsConfig {
	defaults: { temperature: number; maxTokens: number; timeoutMs: number };
	providers: Record<string, ProviderConfig>;
	writer: ModelEntry;
	writerFallback?: ModelEntry;
	judge: ModelEntry;
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
	judgeScale: number;
	passThreshold: number;
	judge: RubricCriterion[];
	deterministic: DetCheck[];
}

export interface PolicyConfig {
	maxRounds: number;
	autoEnglish: boolean;
	llmsFile: string;
	siteUrl: string;
	git: {
		enabled: boolean;
		remote: string;
		commitPrefix: string;
	};
}

export interface PageRequest {
	id: string;
	lang: Lang;
	title: string;
	primaryKeyword: string;
	serviceTag: string;
	slug?: string;
	intent?: string;
	notes?: string;
	requestEnglish?: boolean;
	universe?: string;
	clusterId?: string;
}

export interface UniverseCluster {
	id: string;
	title: string;
	primaryKeyword: string;
	serviceTag?: string;
	lang?: Lang;
	intent?: string;
	gapNote?: string;
	internalLinks?: string[];
}

export interface UniversePillar {
	id: string;
	title: string;
	primaryKeyword: string;
	slug?: string;
}

export interface Universe {
	topic: string;
	lang: Lang;
	pillar: UniversePillar;
	clusters: UniverseCluster[];
	competitors?: Array<{ url: string; title?: string }>;
	generatedAt?: string;
}

export interface ResearchTopic {
	lang: Lang;
	serviceTag: string;
	pillarKeyword: string;
	objective: string;
	queries: string[];
}

export interface ResearchConfig {
	exa: { bin: string; tool: string; numResults: number; timeoutMs: number };
	synthesis: { maxCharsPerResult: number; maxCompetitors: number };
	topics: Record<string, ResearchTopic>;
}

export interface QueueFile {
	requests: PageRequest[];
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

export interface WriterOutput {
	round: number;
	content: string;
	ok: boolean;
	error?: string;
	latencyMs: number;
	attempts: number;
}

export interface FalseClaim {
	claim: string;
	problem: string;
}

export interface JudgeVerdict {
	round: number;
	verdict: 'pass' | 'revise';
	score: number;
	scores: Record<string, number>;
	reasons: Record<string, string>;
	gaps: string[];
	falseClaims: FalseClaim[];
	requiredEdits: string[];
	createEnglishVersion: boolean;
	notes?: string;
	ok: boolean;
	error?: string;
	latencyMs: number;
}

export interface ApprovedPage {
	request: PageRequest;
	slug: string;
	content: string;
	verdict: JudgeVerdict;
	metrics: DetMetrics;
	rounds: number;
}
