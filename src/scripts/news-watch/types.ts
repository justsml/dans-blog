export type SourceType =
  | "rss"
  | "reddit"
  | "manual-jsonl"
  | "x-api"
  | "linkedin-api"
  | "apple-news";

export type SourceSpec = {
  key: string;
  type: SourceType;
  name: string;
  url?: string;
  enabled: boolean;
  pollIntervalSeconds: number;
  rapidIntervalSeconds: number;
  headers?: Record<string, string>;
  notes?: string;
};

export type EngagementMetrics = {
  score?: number;
  upvotes?: number;
  comments?: number;
  likes?: number;
  reposts?: number;
  shares?: number;
  views?: number;
  rank?: number;
};

export type CapturedItem = {
  sourceKey: string;
  sourceType: SourceType;
  sourceName: string;
  externalId: string;
  canonicalUrl: string;
  title: string;
  summary?: string;
  author?: string;
  publishedAt?: string;
  capturedAt: string;
  metrics: EngagementMetrics;
  raw: unknown;
};

export type RelevanceResult = {
  score: number;
  reasons: string[];
  matchedTerms: string[];
};

export type StoredMetric = EngagementMetrics & {
  observedAt: string;
  engagementScore: number;
};

export type TrendSignal = {
  itemId: string;
  topicKey: string;
  detectedAt: string;
  signalScore: number;
  signalType: "new-relevant" | "runaway-growth" | "high-engagement";
  reason: string;
  recommendedPollSeconds: number;
  previous?: StoredMetric;
  current: StoredMetric;
};
