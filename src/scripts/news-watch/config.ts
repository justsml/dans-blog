import { join } from "node:path";
import type { SourceSpec } from "./types.ts";

const aiNewsQuery = [
  "OpenAI",
  "Anthropic",
  "\"frontier model\"",
  "\"AI agent\"",
  "\"local LLM\"",
  "inference",
  "MCP",
  "RAG",
].join(" OR ");

function googleNewsSearchUrl(query: string) {
  const params = new URLSearchParams({
    q: query,
    hl: "en-US",
    gl: "US",
    ceid: "US:en",
  });
  return `https://news.google.com/rss/search?${params.toString()}`;
}

function redditListingUrl(subreddit: string, listing: "hot" | "rising" | "top" = "hot") {
  return `https://www.reddit.com/r/${subreddit}/${listing}.json?limit=100`;
}

function hnAlgoliaSearchUrl(query: string, pointsFloor = 15, hitsPerPage = 50) {
  const params = new URLSearchParams({
    query,
    tags: "story",
    numericFilters: `points>${pointsFloor}`,
    hitsPerPage: String(hitsPerPage),
  });
  return `https://hn.algolia.com/api/v1/search?${params.toString()}`;
}

function hnAlgoliaDateUrl(query: string, daysBack = 7, hitsPerPage = 50) {
  const sinceSeconds = Math.floor(Date.now() / 1000) - daysBack * 24 * 60 * 60;
  const params = new URLSearchParams({
    query,
    tags: "story",
    numericFilters: `created_at_i>${sinceSeconds}`,
    hitsPerPage: String(hitsPerPage),
  });
  return `https://hn.algolia.com/api/v1/search_by_date?${params.toString()}`;
}

const REDDIT_PAGINATION = { enabled: true, itemsPerPage: 100, maxItems: 1000 } as const;

export const NEWS_WATCH_DB_PATH =
  process.env.NEWS_WATCH_DB ?? join(process.cwd(), "data/news-watch/news-watch.sqlite");

export const NEWS_WATCH_ITEM_DIR =
  process.env.NEWS_WATCH_ITEM_DIR ?? join(process.cwd(), "data/news-watch/items");

export const NEWS_WATCH_SCREENSHOT_DIR =
  process.env.NEWS_WATCH_SCREENSHOT_DIR ?? join(process.cwd(), "data/news-watch/screenshots");

export const DEFAULT_USER_AGENT =
  process.env.NEWS_WATCH_USER_AGENT ??
  "DanLevyNewsWatch/0.1 (+https://danlevy.net; contact: local)";

export const DEFAULT_SOURCES: SourceSpec[] = [
  {
    key: "google-news-ai",
    type: "rss",
    name: "Google News: AI specialty query",
    url: googleNewsSearchUrl(aiNewsQuery),
    enabled: true,
    pollIntervalSeconds: 15 * 60,
    rapidIntervalSeconds: 5 * 60,
  },
  {
    key: "google-news-wire-ai",
    type: "rss",
    name: "Google News: wire/service AI query",
    url: googleNewsSearchUrl(`(${aiNewsQuery}) (Reuters OR "Associated Press" OR AP OR Bloomberg)`),
    enabled: true,
    pollIntervalSeconds: 20 * 60,
    rapidIntervalSeconds: 5 * 60,
  },
  {
    key: "reddit-local-llama",
    type: "reddit",
    name: "Reddit r/LocalLLaMA hot",
    url: redditListingUrl("LocalLLaMA"),
    enabled: true,
    pollIntervalSeconds: 10 * 60,
    rapidIntervalSeconds: 60,
    impersonate: "chrome146",
    auditLabel: "anon-browser-impersonation",
    pagination: REDDIT_PAGINATION,
  },
  {
    key: "reddit-machine-learning",
    type: "reddit",
    name: "Reddit r/MachineLearning hot",
    url: redditListingUrl("MachineLearning"),
    enabled: true,
    pollIntervalSeconds: 15 * 60,
    rapidIntervalSeconds: 2 * 60,
    impersonate: "chrome146",
    auditLabel: "anon-browser-impersonation",
    pagination: REDDIT_PAGINATION,
  },
  {
    key: "reddit-openai",
    type: "reddit",
    name: "Reddit r/OpenAI hot",
    url: redditListingUrl("OpenAI"),
    enabled: true,
    pollIntervalSeconds: 10 * 60,
    rapidIntervalSeconds: 60,
    impersonate: "chrome146",
    auditLabel: "anon-browser-impersonation",
    pagination: REDDIT_PAGINATION,
  },
  {
    key: "reddit-artificial",
    type: "reddit",
    name: "Reddit r/artificial hot",
    url: redditListingUrl("artificial"),
    enabled: true,
    pollIntervalSeconds: 15 * 60,
    rapidIntervalSeconds: 2 * 60,
    impersonate: "chrome146",
    auditLabel: "anon-browser-impersonation",
    pagination: REDDIT_PAGINATION,
  },
  {
    key: "reddit-anthropic",
    type: "reddit",
    name: "Reddit r/Anthropic hot",
    url: redditListingUrl("Anthropic"),
    enabled: true,
    pollIntervalSeconds: 10 * 60,
    rapidIntervalSeconds: 60,
    impersonate: "chrome146",
    auditLabel: "anon-browser-impersonation",
    pagination: REDDIT_PAGINATION,
  },
  {
    key: "reddit-claudeai",
    type: "reddit",
    name: "Reddit r/ClaudeAI hot",
    url: redditListingUrl("ClaudeAI"),
    enabled: true,
    pollIntervalSeconds: 10 * 60,
    rapidIntervalSeconds: 60,
    impersonate: "chrome146",
    auditLabel: "anon-browser-impersonation",
    pagination: REDDIT_PAGINATION,
  },
  {
    key: "reddit-machinelearningnews",
    type: "reddit",
    name: "Reddit r/singularity hot",
    url: redditListingUrl("singularity"),
    enabled: true,
    pollIntervalSeconds: 15 * 60,
    rapidIntervalSeconds: 2 * 60,
    impersonate: "chrome146",
    auditLabel: "anon-browser-impersonation",
    pagination: REDDIT_PAGINATION,
  },
  {
    key: "hn-ai-agents",
    type: "hackernews",
    name: "Hacker News: AI agent stories",
    url: hnAlgoliaSearchUrl("AI agent", 20, 50),
    enabled: true,
    pollIntervalSeconds: 30 * 60,
    rapidIntervalSeconds: 5 * 60,
  },
  {
    key: "hn-mcp",
    type: "hackernews",
    name: "Hacker News: Model Context Protocol",
    url: hnAlgoliaSearchUrl("MCP OR \"model context protocol\"", 10, 50),
    enabled: true,
    pollIntervalSeconds: 30 * 60,
    rapidIntervalSeconds: 5 * 60,
  },
  {
    key: "hn-llm-providers",
    type: "hackernews",
    name: "Hacker News: Claude/Anthropic/OpenAI",
    url: hnAlgoliaSearchUrl("Claude OR Anthropic OR Mistral OR DeepSeek", 25, 50),
    enabled: true,
    pollIntervalSeconds: 30 * 60,
    rapidIntervalSeconds: 5 * 60,
  },
  {
    key: "hn-llm-recent",
    type: "hackernews",
    name: "Hacker News: LLM stories (last 7 days)",
    url: hnAlgoliaDateUrl("LLM OR GPT OR Claude OR inference", 7, 50),
    enabled: true,
    pollIntervalSeconds: 30 * 60,
    rapidIntervalSeconds: 5 * 60,
  },
  {
    key: "lobsters-hottest",
    type: "lobsters",
    name: "Lobsters: hottest",
    url: "https://lobste.rs/hottest.json",
    enabled: true,
    pollIntervalSeconds: 20 * 60,
    rapidIntervalSeconds: 5 * 60,
  },
  {
    key: "github-trending-daily",
    type: "github-trending",
    name: "GitHub Trending: daily (all languages)",
    url: "https://github.com/trending?since=daily",
    enabled: true,
    pollIntervalSeconds: 60 * 60,
    rapidIntervalSeconds: 10 * 60,
  },
  {
    key: "github-trending-python-weekly",
    type: "github-trending",
    name: "GitHub Trending: Python weekly",
    url: "https://github.com/trending/python?since=weekly",
    enabled: true,
    pollIntervalSeconds: 60 * 60,
    rapidIntervalSeconds: 10 * 60,
  },
  {
    key: "github-trending-typescript-weekly",
    type: "github-trending",
    name: "GitHub Trending: TypeScript weekly",
    url: "https://github.com/trending/typescript?since=weekly",
    enabled: true,
    pollIntervalSeconds: 60 * 60,
    rapidIntervalSeconds: 10 * 60,
  },
  {
    key: "x-api-placeholder",
    type: "x-api",
    name: "X API trends/search placeholder",
    enabled: false,
    pollIntervalSeconds: 10 * 60,
    rapidIntervalSeconds: 60,
    notes: "Wire this to an approved X API plan or owned account export.",
  },
  {
    key: "linkedin-api-placeholder",
    type: "linkedin-api",
    name: "LinkedIn API/feed placeholder",
    enabled: false,
    pollIntervalSeconds: 30 * 60,
    rapidIntervalSeconds: 5 * 60,
    notes: "Use approved LinkedIn APIs, partner access, or manually exported URLs.",
  },
  {
    key: "apple-news-placeholder",
    type: "apple-news",
    name: "Apple News placeholder",
    enabled: false,
    pollIntervalSeconds: 30 * 60,
    rapidIntervalSeconds: 5 * 60,
    notes: "Apple News has no durable public trending RSS surface here; add publisher feeds or approved partner access.",
  },
];

export function getSources() {
  return DEFAULT_SOURCES.filter((source) => source.enabled);
}
