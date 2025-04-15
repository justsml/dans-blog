import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_SEO_DESCRIPTION } from "../consts";
import { fixSlugPrefix } from "../shared/pathHelpers";
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts")).filter(
    (post: any) => !post.data.hidden
    // (post: any) => !post.data.hidden && post.data?.title?.includes("Bash"),
  ).reverse();

  posts.unshift({
    id: "open-source-journal",
    slug: "open-source-journal",
    // @ts-ignore
    collection: "pages",
    data: {
      title: "Open Source Journal",
      subTitle: "A collection of open-source projects I've worked on.",
      category: "Projects",
      date: "2024-12-16",
      modified: "2024-12-28",
      tags: ["open-source", "projects"],
      cover: {
        src: "../../images/social-banner.webp",
        format: "webp",
        width: 1200,
        height: 628,
      },
    }
  });

  return rss({
    title: SITE_TITLE,
    description: SITE_SEO_DESCRIPTION,
    site: context.site!,
    items: posts.map((post: any) => ({
      ...post.data,
      pubDate: new Date(post.data.date!),
      description: post.data.subTitle,
      categories: [post.data.category, ...(post.data.tags ?? [])],
      category: post.data.category,
      cover: post.data?.cover?.src,
      link: `/${fixSlugPrefix(post.slug)}/`,
    })),
  });
}

// import rss from "@astrojs/rss";
// import { getCollection } from "astro:content";
// import { SITE_TITLE, SITE_SEO_DESCRIPTION } from "../consts";
// import { fixSlugPrefix } from "../shared/pathHelpers";

// // @ts-expect-error
// export async function GET(context) {
//   const posts = (await getCollection("posts")).filter(
//     (post) => !post.data.hidden,
//   );

//   // TEMP FIND BROKEN POSTS
//   posts.forEach((post) => {
//     try {
//       const rss = getRSS([post]);
//     } catch (e) {
//       console.error("BAD POST:", post.data, e);
//     }
//   });

//   return getRSS(posts);

//   // @ts-expect-error
//   function getRSS(posts) {
//     return rss({
//       title: SITE_TITLE,
//       description: SITE_SEO_DESCRIPTION,
//       site: context.site,
//       // @ts-expect-error
//       ttl: 720,
//       link: "https://danlevy.net/rss.xml",
//       image: `https://danlevy.net/images/social-banner.webp`,
//       lastBuildDate: new Date().toUTCString(),

//       // @ts-expect-error
//       items: posts.map((post) => {
//         const image =
//           post.data?.cover?.src ??
//           post.data?.cover_full_width?.src ??
//           post.data?.cover_mobile?.src;
//         const link = `https://danlevy.net/${fixSlugPrefix(post.slug)}/`;
//         const pubDate = post.data.date ? new Date(post.data.date) : null;

//         if (!post.data.title || !post.data.subTitle || !post.data.date) {
//           console.log("%o", post.data);
//           throw new Error(`Post ${post.slug} is missing a title or subTitle`);
//         }
//         let d = post.data.subTitle;
//         if (d && d.length > 10) d = d.substring(0, 10);

//         console.log("Post %s   %s\t%s\t%s", post.data.date, post.data.title, d);
//         return {
//           title: post.data.title,
//           pubDate,
//           lastBuildDate:
//             post.data.modified && new Date(post.data.modified).toUTCString(),
//           description: post.data.subTitle,
//           category: post.data.category,
//           categories: post.data.tags,
//           cover: image,
//           enclosure: image,
//           link,
//         };
//       }),
//     });
//   }
// }
