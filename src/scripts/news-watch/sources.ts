import * as cheerio from "cheerio";
import { DEFAULT_USER_AGENT } from "./config.ts";
import { fingerprintFetch } from "./fingerprint-fetch.ts";
import type { CapturedItem, SourceSpec } from "./types.ts";

const RATE_LIMIT_STATUSES = new Set([403, 429, 503]);

export async function fetchSource(source: SourceSpec, capturedAt = new Date().toISOString()) {
  if (!source.enabled) return [];

  switch (source.type) {
    case "rss":
      return fetchRss(source, capturedAt);
    case "reddit":
      return fetchReddit(source, capturedAt);
    case "hackernews":
      return fetchHackerNews(source, capturedAt);
    case "lobsters":
      return fetchLobsters(source, capturedAt);
    case "github-trending":
      return fetchGithubTrending(source, capturedAt);
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

interface TextFetchInput {
  url: string;
  sourceKey: string;
  accept: string;
  headers?: Record<string, string>;
  impersonate?: SourceSpec["impersonate"];
  proxy?: string;
  timeoutSeconds?: number;
}

interface TextFetchResult {
  status: number;
  body: string;
  impersonated: boolean;
  finalUrl: string;
}

async function fetchAsText(input: TextFetchInput): Promise<TextFetchResult> {
  if (input.impersonate) {
    const result = await fingerprintFetch({
      url: input.url,
      method: "GET",
      headers: {
        Accept: input.accept,
        ...(input.headers ?? {}),
      },
      impersonate: input.impersonate,
      proxy: input.proxy,
      timeoutSeconds: input.timeoutSeconds,
    });
    return {
      status: result.status,
      body: result.body,
      impersonated: true,
      finalUrl: result.finalUrl,
    };
  }

  const response = await fetch(input.url, {
    headers: {
      "User-Agent": DEFAULT_USER_AGENT,
      Accept: input.accept,
      ...(input.headers ?? {}),
    },
  });
  return {
    status: response.status,
    body: await response.text(),
    impersonated: false,
    finalUrl: response.url,
  };
}

async function fetchRss(source: SourceSpec, capturedAt: string): Promise<CapturedItem[]> {
  const url = requireUrl(source);
  const result = await fetchAsText({
    url,
    sourceKey: source.key,
    accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8",
    headers: source.headers,
    impersonate: source.impersonate,
    proxy: source.proxy,
  });
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`${source.key} returned HTTP ${result.status}`);
  }

  const xml = result.body;
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
        impersonated: result.impersonated,
      },
    });
  });

  return items;
}

async function fetchReddit(source: SourceSpec, capturedAt: string): Promise<CapturedItem[]> {
  const oauthItems = await fetchRedditWithOAuth(source, capturedAt);
  if (oauthItems != null) return oauthItems;

  const url = requireUrl(source);
  const result = await fetchAsText({
    url,
    sourceKey: source.key,
    accept: "application/json",
    headers: source.headers,
    impersonate: source.impersonate,
    proxy: source.proxy,
  });
  if (result.status < 200 || result.status >= 300) {
    const rssItems = await fetchRedditRssFallback(source, capturedAt);
    if (rssItems != null) return rssItems;
    throw new Error(`${source.key} returned HTTP ${result.status}`);
  }

  const payload = JSON.parse(result.body) as {
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

export type RedditPage = {
  items: CapturedItem[];
  nextCursor: string | null;
  rateLimited: boolean;
  httpStatus: number;
};

const REDDIT_FULLNAME_PATTERN = /^[t][0-9a-z]+_[a-z0-9]+$/i;

export async function fetchRedditPage(
  source: SourceSpec,
  cursor: string | null,
  itemsPerPage: number,
  capturedAt: string,
): Promise<RedditPage> {
  if (!Number.isInteger(itemsPerPage) || itemsPerPage < 1 || itemsPerPage > 100) {
    throw new Error(`Reddit itemsPerPage must be 1..100, got ${itemsPerPage}`);
  }

  const oauthAttempt = await fetchRedditWithOAuthPage(source, cursor, itemsPerPage, capturedAt);
  if (oauthAttempt != null) return oauthAttempt;

  const baseUrl = requireUrl(source);
  const url = new URL(baseUrl);
  url.searchParams.set("limit", String(itemsPerPage));
  if (cursor && REDDIT_FULLNAME_PATTERN.test(cursor)) {
    url.searchParams.set("after", cursor);
  }
  url.searchParams.delete("count");

  const result = await fetchAsText({
    url: url.toString(),
    sourceKey: source.key,
    accept: "application/json",
    headers: source.headers,
    impersonate: source.impersonate,
    proxy: source.proxy,
  });

  if (result.status < 200 || result.status >= 300) {
    return {
      items: [],
      nextCursor: cursor,
      rateLimited: RATE_LIMIT_STATUSES.has(result.status),
      httpStatus: result.status,
    };
  }

  const payload = JSON.parse(result.body) as {
    data?: {
      children?: Array<{ data?: Record<string, unknown> }>;
      after?: string | null;
    };
  };
  const children = payload.data?.children ?? [];
  const items = children
    .map((child, index) => normalizeRedditPost(source, child.data, index, capturedAt))
    .filter((item): item is CapturedItem => item != null);
  const after = payload.data?.after ?? null;
  return {
    items,
    nextCursor: after && REDDIT_FULLNAME_PATTERN.test(after) ? after : null,
    rateLimited: false,
    httpStatus: result.status,
  };
}

async function fetchRedditWithOAuthPage(
  source: SourceSpec,
  cursor: string | null,
  itemsPerPage: number,
  capturedAt: string,
): Promise<RedditPage | undefined> {
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
  if (!tokenResponse.ok) {
    return {
      items: [],
      nextCursor: cursor,
      rateLimited: RATE_LIMIT_STATUSES.has(tokenResponse.status),
      httpStatus: tokenResponse.status,
    };
  }
  const tokenPayload = (await tokenResponse.json()) as { access_token?: string };
  if (!tokenPayload.access_token) {
    return { items: [], nextCursor: cursor, rateLimited: false, httpStatus: 0 };
  }

  const params = new URLSearchParams({ limit: String(itemsPerPage) });
  if (cursor && REDDIT_FULLNAME_PATTERN.test(cursor)) params.set("after", cursor);
  const apiUrl = `https://oauth.reddit.com/r/${listing.subreddit}/${listing.listing}?${params.toString()}`;
  const response = await fetch(apiUrl, {
    headers: {
      "Authorization": `Bearer ${tokenPayload.access_token}`,
      "User-Agent": DEFAULT_USER_AGENT,
      "Accept": "application/json",
    },
  });
  if (!response.ok) {
    return {
      items: [],
      nextCursor: cursor,
      rateLimited: RATE_LIMIT_STATUSES.has(response.status),
      httpStatus: response.status,
    };
  }
  const payload = (await response.json()) as {
    data?: {
      children?: Array<{ data?: Record<string, unknown> }>;
      after?: string | null;
    };
  };
  const items = (payload.data?.children ?? [])
    .map((child, index) => normalizeRedditPost(source, child.data, index, capturedAt))
    .filter((item): item is CapturedItem => item != null);
  const after = payload.data?.after ?? null;
  return {
    items,
    nextCursor: after && REDDIT_FULLNAME_PATTERN.test(after) ? after : null,
    rateLimited: false,
    httpStatus: response.status,
  };
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
  const result = await fetchAsText({
    url: rssUrl,
    sourceKey: source.key,
    accept: "application/atom+xml, application/rss+xml, application/xml;q=0.9, text/xml;q=0.8",
    headers: source.headers,
    impersonate: source.impersonate,
    proxy: source.proxy,
  });

  if (result.status < 200 || result.status >= 300) return undefined;

  const xml = result.body;
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
        impersonated: result.impersonated,
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

type HnAlgoliaHit = {
  objectID: string;
  title?: string;
  story_title?: string;
  url?: string;
  story_url?: string;
  author?: string;
  points?: number;
  num_comments?: number;
  created_at_i?: number;
  _tags?: string[];
};

async function fetchHackerNews(source: SourceSpec, capturedAt: string): Promise<CapturedItem[]> {
  const url = requireUrl(source);
  const result = await fetchAsText({
    url,
    sourceKey: source.key,
    accept: "application/json",
    headers: source.headers,
    impersonate: source.impersonate,
    proxy: source.proxy,
  });
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`${source.key} (HackerNews) returned HTTP ${result.status}`);
  }
  const payload = JSON.parse(result.body) as { hits?: HnAlgoliaHit[] };
  const items: CapturedItem[] = [];
  let index = 0;
  for (const hit of payload.hits ?? []) {
    if (!hit) continue;
    const title = (hit.title ?? hit.story_title ?? "").trim();
    const link = (hit.url ?? hit.story_url ?? `https://news.ycombinator.com/item?id=${hit.objectID}`).trim();
    if (!title || !link) continue;
    items.push({
      sourceKey: source.key,
      sourceType: source.type,
      sourceName: source.name,
      externalId: String(hit.objectID),
      canonicalUrl: link,
      title,
      summary: undefined,
      author: hit.author,
      publishedAt: typeof hit.created_at_i === "number" ? new Date(hit.created_at_i * 1000).toISOString() : undefined,
      capturedAt,
      metrics: {
        score: typeof hit.points === "number" ? hit.points : undefined,
        upvotes: typeof hit.points === "number" ? hit.points : undefined,
        comments: typeof hit.num_comments === "number" ? hit.num_comments : undefined,
        rank: index + 1,
      },
      raw: {
        objectID: hit.objectID,
        title,
        url: link,
        author: hit.author,
        points: hit.points,
        num_comments: hit.num_comments,
        created_at: typeof hit.created_at_i === "number" ? new Date(hit.created_at_i * 1000).toISOString() : null,
        tags: hit._tags,
      },
    });
    index += 1;
  }
  return items;
}

type LobstersPost = {
  short_id: string;
  title: string;
  url?: string;
  comments_url: string;
  score: number;
  comment_count: number;
  created_at: string;
  submitter_user?: { username: string };
  tags?: string[];
  description?: string;
};

async function fetchLobsters(source: SourceSpec, capturedAt: string): Promise<CapturedItem[]> {
  const url = requireUrl(source);
  const result = await fetchAsText({
    url,
    sourceKey: source.key,
    accept: "application/json",
    headers: source.headers,
    impersonate: source.impersonate,
    proxy: source.proxy,
  });
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`${source.key} (Lobsters) returned HTTP ${result.status}`);
  }
  const payload = JSON.parse(result.body) as LobstersPost[];
  if (!Array.isArray(payload)) {
    throw new Error(`${source.key} (Lobsters) did not return an array`);
  }
  return payload.map((post, index) => ({
    sourceKey: source.key,
    sourceType: source.type,
    sourceName: source.name,
    externalId: post.short_id,
    canonicalUrl: post.url ?? post.comments_url,
    title: post.title,
    summary: post.description ? cleanText(post.description) : undefined,
    author: post.submitter_user?.username,
    publishedAt: post.created_at,
    capturedAt,
    metrics: {
      score: post.score,
      comments: post.comment_count,
      rank: index + 1,
    },
    raw: post,
  }));
}

type GithubTrendingEntry = {
  rank: number;
  repo: string;
  url: string;
  description: string;
  language: string | null;
  totalStars: number;
  starsToday: number;
  forks: number;
};

async function fetchGithubTrending(source: SourceSpec, capturedAt: string): Promise<CapturedItem[]> {
  const url = requireUrl(source);
  const result = await fetchAsText({
    url,
    sourceKey: source.key,
    accept: "text/html, application/xhtml+xml",
    headers: source.headers,
    impersonate: source.impersonate,
    proxy: source.proxy,
  });
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`${source.key} (GitHub Trending) returned HTTP ${result.status}`);
  }
  const entries = parseGithubTrendingHtml(result.body, result.finalUrl);
  return entries.map((entry) => ({
    sourceKey: source.key,
    sourceType: source.type,
    sourceName: source.name,
    externalId: entry.repo,
    canonicalUrl: entry.url,
    title: entry.repo,
    summary: entry.description,
    publishedAt: undefined,
    capturedAt,
    metrics: {
      rank: entry.rank,
      score: entry.starsToday,
      upvotes: entry.starsToday,
      views: entry.totalStars,
    },
    raw: {
      ...entry,
      language: entry.language,
    },
  }));
}

function parseGithubTrendingHtml(html: string, baseUrl: string): GithubTrendingEntry[] {
  const $ = cheerio.load(html);
  const entries: GithubTrendingEntry[] = [];
  const base = new URL(baseUrl);

  $("article.Box-row").each((index, element) => {
    const row = $(element);
    const repoAnchor = row.find("h2 a").first();
    const repoPath = repoAnchor.attr("href")?.trim().replace(/^\/+/, "");
    if (!repoPath) return;
    const description = cleanText(row.find("p.col-9").first().text());
    const language = cleanText(row.find("span[itemprop='programmingLanguage']").first().text()) || null;
    const totalStars = parseCompactNumber(row.find("a[href$='/stargazers']").first().text());
    const forks = parseCompactNumber(row.find("a[href$='/forks']").first().text());
    const starsTodayMatch = row.find("span.d-inline-block.float-sm-right").first().text().match(/([\d,]+)\s+stars today/i);
    const starsToday = starsTodayMatch ? parseInt(starsTodayMatch[1].replace(/,/g, ""), 10) : 0;
    const url = new URL(repoPath, base).toString();
    entries.push({
      rank: index + 1,
      repo: repoPath,
      url,
      description,
      language,
      totalStars: Number.isFinite(totalStars) ? totalStars : 0,
      starsToday: Number.isFinite(starsToday) ? starsToday : 0,
      forks: Number.isFinite(forks) ? forks : 0,
    });
  });

  return entries;
}

function parseCompactNumber(text: string | undefined): number {
  if (!text) return 0;
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const match = /^([\d,.]+)\s*([kKmMbB]?)/.exec(trimmed);
  if (!match) return 0;
  const base = parseFloat(match[1].replace(/,/g, ""));
  if (!Number.isFinite(base)) return 0;
  const suffix = match[2].toLowerCase();
  const multiplier = suffix === "k" ? 1_000 : suffix === "m" ? 1_000_000 : suffix === "b" ? 1_000_000_000 : 1;
  return Math.round(base * multiplier);
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
