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
  const oauthItems = await fetchRedditWithOAuth(source, capturedAt);
  if (oauthItems != null) return oauthItems;

  const url = requireUrl(source);
  const response = await fetch(url, {
    headers: {
      "User-Agent": DEFAULT_USER_AGENT,
      "Accept": "application/json",
      ...source.headers,
    },
  });
  if (!response.ok) {
    const rssItems = await fetchRedditRssFallback(source, capturedAt);
    if (rssItems != null) return rssItems;
    assertOk(response, source);
  }

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

async function fetchRedditWithOAuth(source: SourceSpec, capturedAt: string): Promise<CapturedItem[] | undefined> {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  if (!clientId || !clientSecret) return undefined;

  const listing = getRedditListingParts(source);
  const tokenResponse = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": DEFAULT_USER_AGENT,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });
  assertOk(tokenResponse, { ...source, key: `${source.key}:oauth-token` });

  const tokenPayload = await tokenResponse.json() as { access_token?: string };
  if (!tokenPayload.access_token) {
    throw new Error(`${source.key}:oauth-token did not return access_token`);
  }

  const params = new URLSearchParams({ limit: "50" });
  const apiUrl = `https://oauth.reddit.com/r/${listing.subreddit}/${listing.listing}?${params.toString()}`;
  const response = await fetch(apiUrl, {
    headers: {
      "Authorization": `Bearer ${tokenPayload.access_token}`,
      "User-Agent": DEFAULT_USER_AGENT,
      "Accept": "application/json",
    },
  });
  assertOk(response, { ...source, key: `${source.key}:oauth-listing` });

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

async function fetchRedditRssFallback(source: SourceSpec, capturedAt: string): Promise<CapturedItem[] | undefined> {
  const listing = getRedditListingParts(source);
  const rssUrl = `https://www.reddit.com/r/${listing.subreddit}/${listing.listing}/.rss?limit=50`;
  const response = await fetch(rssUrl, {
    headers: {
      "User-Agent": DEFAULT_USER_AGENT,
      "Accept": "application/atom+xml, application/rss+xml, application/xml;q=0.9, text/xml;q=0.8",
      ...source.headers,
    },
  });

  if (!response.ok) return undefined;

  const xml = await response.text();
  const $ = cheerio.load(xml, { xmlMode: true });
  const items: CapturedItem[] = [];

  $("entry").each((index, element) => {
    const entry = $(element);
    const title = cleanText(entry.find("title").first().text());
    const id = cleanText(entry.find("id").first().text());
    const href = entry.find("link").first().attr("href") ?? "";
    if (!title || !href) return;

    const content = cleanText(entry.find("content").first().text());
    const author = cleanText(entry.find("author name").first().text());
    const publishedAt = parseDate(cleanText(entry.find("published").first().text()));

    items.push({
      sourceKey: source.key,
      sourceType: source.type,
      sourceName: source.name,
      externalId: id || href,
      canonicalUrl: href,
      title,
      summary: content || undefined,
      author: author || undefined,
      publishedAt,
      capturedAt,
      metrics: {
        rank: index + 1,
      },
      raw: {
        title,
        href,
        id,
        content,
        author,
        publishedAt,
        rank: index + 1,
        adapter: "reddit-rss-fallback",
      },
    });
  });

  return items.length > 0 ? items : undefined;
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

export function getRedditListingParts(source: SourceSpec) {
  const url = requireUrl(source);
  const match = /\/r\/([^/]+)\/([^/.?]+)/.exec(url);
  if (!match) {
    throw new Error(`Could not derive subreddit/listing from ${source.key}: ${url}`);
  }

  return {
    subreddit: match[1],
    listing: match[2],
  };
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
