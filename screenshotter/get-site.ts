import { RSSFeedItem } from "@astrojs/rss";

type RssDoc = {
  title: string;
  description: string;
  site: string;
  items: RSSFeedItem[];
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
