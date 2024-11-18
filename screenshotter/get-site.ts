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
): Promise<RssDoc> {
  return await fetch(siteUrl + rssPath)
    .then((res) => res.json())
    .then((data) => {
      // console.log("data", data);
      return data as RssDoc;
    });
}
