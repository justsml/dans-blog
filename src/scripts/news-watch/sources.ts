import * as cheerio from "cheerio";
import { DEFAULT_USER_AGENT } from "./config.ts";
import type { CapturedItem, SourceSpec } from "./types.ts";

export async function fetchSource(source: SourceSpec, capturedAt = new Date().toISOString()) {
  if (!source.enabled) return [];

  switch (source.type) {
    case "rss":
      return fetchRss(source, capturedAt);
    case "reddit":
      return fetchReddit(source, capturedAt);
    case "manual-jsonl":
    case "x-api":
    case "linkedin-api":
    case "apple-news":
      throw new Error(`${source.type} source "${source.key}" is configured but no compliant adapter is wired yet.`);
    default:
      source.type satisfies never;
      throw new Error(`Unsupported source type: ${source.type}`);
  }
}

async function fetchRss(source: SourceSpec, capturedAt: string): Promise<CapturedItem[]> {
  const url = requireUrl(source);
  const response = await fetch(url, {
    headers: {
      "User-Agent": DEFAULT_USER_AGENT,
      "Accept": "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8",
      ...source.headers,
    },
  });
  assertOk(response, source);

  const xml = await response.text();
  const $ = cheerio.load(xml, { xmlMode: true });
  const items: CapturedItem[] = [];

  $("item").each((index, element) => {
    const item = $(element);
    const title = cleanText(item.find("title").first().text());
    const link = cleanText(item.find("link").first().text());
    if (!title || !link) return;

    const guid = cleanText(item.find("guid").first().text()) || link;
    const description = cleanText(item.find("description").first().text());
    const sourceName = cleanText(item.find("source").first().text()) || source.name;
    const publishedAt = parseDate(cleanText(item.find("pubDate").first().text()));

    items.push({
      sourceKey: source.key,
      sourceType: source.type,
      sourceName,
      externalId: guid,
      canonicalUrl: link,
      title,
      summary: description || undefined,
      publishedAt,
      capturedAt,
      metrics: {
        rank: index + 1,
      },
      raw: {
        title,
        link,
        guid,
        description,
        sourceName,
        publishedAt,
        rank: index + 1,
      },
    });
  });

  return items;
}

async function fetchReddit(source: SourceSpec, capturedAt: string): Promise<CapturedItem[]> {
  const url = requireUrl(source);
  const response = await fetch(url, {
    headers: {
      "User-Agent": DEFAULT_USER_AGENT,
      "Accept": "application/json",
      ...source.headers,
    },
  });
  assertOk(response, source);

  const payload = await response.json() as {
    data?: {
      children?: Array<{
        data?: Record<string, unknown>;
      }>;
    };
  };

  return (payload.data?.children ?? [])
    .map((child, index) => normalizeRedditPost(source, child.data, index, capturedAt))
    .filter((item): item is CapturedItem => item != null);
}

function normalizeRedditPost(
  source: SourceSpec,
  post: Record<string, unknown> | undefined,
  index: number,
  capturedAt: string,
): CapturedItem | undefined {
  if (post == null) return undefined;

  const title = stringValue(post.title);
  const permalink = stringValue(post.permalink);
  const id = stringValue(post.name) || stringValue(post.id);
  if (!title || !permalink || !id) return undefined;

  const url = stringValue(post.url);
  const canonicalUrl = `https://www.reddit.com${permalink}`;
  const publishedUtc = numberValue(post.created_utc);

  return {
    sourceKey: source.key,
    sourceType: source.type,
    sourceName: source.name,
    externalId: id,
    canonicalUrl,
    title,
    summary: stringValue(post.selftext) || url || undefined,
    author: stringValue(post.author) || undefined,
    publishedAt: publishedUtc == null ? undefined : new Date(publishedUtc * 1000).toISOString(),
    capturedAt,
    metrics: {
      score: numberValue(post.score),
      upvotes: numberValue(post.ups),
      comments: numberValue(post.num_comments),
      rank: index + 1,
    },
    raw: post,
  } satisfies CapturedItem;
}

function requireUrl(source: SourceSpec) {
  if (!source.url) throw new Error(`Source ${source.key} is missing url.`);
  return source.url;
}

function assertOk(response: Response, source: SourceSpec) {
  if (response.ok) return;
  throw new Error(`${source.key} returned HTTP ${response.status} ${response.statusText}`);
}

function cleanText(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(value: string) {
  if (!value) return undefined;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : undefined;
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
