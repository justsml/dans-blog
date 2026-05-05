import { RSSFeedItem } from "@astrojs/rss";
export type RssishItem = RSSFeedItem & {
  sourcePath: string;
  slug: string;
};

type RssDoc = {
  title: string;
  description: string;
  site: string;
  items: RssishItem[];
};

export default async function getSiteRss(
  siteUrl: string,
  rssPath: string = "rss.json",
  { timeoutMs = 10_000 }: { timeoutMs?: number } = {},
): Promise<RssDoc> {
  const feedUrl = new URL(rssPath, `${siteUrl.replace(/\/+$/, "")}/`);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(feedUrl, { signal: controller.signal });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as RssDoc;

    if (!Array.isArray(data.items)) {
      throw new Error("RSS JSON did not include an items array.");
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Unable to load RSS JSON from ${feedUrl}: ${message}`);
  } finally {
    clearTimeout(timeout);
  }
}
