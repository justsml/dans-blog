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
  return `https://www.reddit.com/r/${subreddit}/${listing}.json?limit=50`;
}

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
  },
  {
    key: "reddit-machine-learning",
    type: "reddit",
    name: "Reddit r/MachineLearning hot",
    url: redditListingUrl("MachineLearning"),
    enabled: true,
    pollIntervalSeconds: 15 * 60,
    rapidIntervalSeconds: 2 * 60,
  },
  {
    key: "reddit-openai",
    type: "reddit",
    name: "Reddit r/OpenAI hot",
    url: redditListingUrl("OpenAI"),
    enabled: true,
    pollIntervalSeconds: 10 * 60,
    rapidIntervalSeconds: 60,
  },
  {
    key: "reddit-artificial",
    type: "reddit",
    name: "Reddit r/artificial hot",
    url: redditListingUrl("artificial"),
    enabled: true,
    pollIntervalSeconds: 15 * 60,
    rapidIntervalSeconds: 2 * 60,
  },
  {
    key: "x-api-placeholder",
    type: "x-api",
    name: "X API trends/search placeholder",
    enabled: false,
    pollIntervalSeconds: 10 * 60,
    rapidIntervalSeconds: 60,
    notes: "Wire this to an approved X API plan or owned account export. Do not use stealth browser scraping.",
  },
  {
    key: "linkedin-api-placeholder",
    type: "linkedin-api",
    name: "LinkedIn API/feed placeholder",
    enabled: false,
    pollIntervalSeconds: 30 * 60,
    rapidIntervalSeconds: 5 * 60,
    notes: "Use approved LinkedIn APIs, partner access, or manually exported URLs. Do not automate authenticated feed scraping.",
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
