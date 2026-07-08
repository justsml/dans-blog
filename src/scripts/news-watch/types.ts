import type { BrowserProfile } from "./fingerprint-fetch.ts";

export type SourceType =
  | "rss"
  | "reddit"
  | "hackernews"
  | "lobsters"
  | "github-trending"
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
  impersonate?: BrowserProfile;
  proxy?: string;
  auditLabel?: string;
  pagination?: {
    enabled: boolean;
    itemsPerPage: number;
    maxItems: number;
  };
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

export type EntityType = "person" | "org" | "product" | "topic" | "place" | "event";

export type Entity = {
  entityId: string;
  name: string;
  type: EntityType;
  aliases: string[];
  firstSeenAt: string;
  lastSeenAt: string;
  mentionCount: number;
};

export type EntityMention = {
  entityId: string;
  name: string;
  type: EntityType;
  role?: string;
  context?: string;
  offset?: number;
};

export type Author = {
  authorId: string;
  displayName: string;
  sourceKey: string;
  firstSeenAt: string;
  lastSeenAt: string;
  itemCount: number;
};

export type ItemExtraction = {
  itemId: string;
  people: EntityMention[];
  orgs: EntityMention[];
  products: EntityMention[];
  topics: EntityMention[];
  categories: { name: string; score: number }[];
  model?: string;
  extractedAt: string;
};

export type EntityCooccurrence = {
  entityAId: string;
  entityBId: string;
  count: number;
  firstSeenAt: string;
  lastSeenAt: string;
};

export type PaginationState = {
  enabled: boolean;
  itemsPerPage: number;
  maxItems: number;
  lastCursor: string | null;
  lastFetchedAt: string | null;
  totalFetched: number;
  rateLimitedUntil: string | null;
};
