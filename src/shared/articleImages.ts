import { getImage } from "astro:assets";
import type { ArticlePost } from "../types";

const imageResults = new Map<string, ReturnType<typeof getImage>>();

/** Match initial and appended card media without shipping original full-size assets. */
export async function optimizeArticleCardImage(post: ArticlePost, lead = false): Promise<ArticlePost> {
  const cover = post.data.cover_full_width ?? post.data.cover_mobile;
  if (!cover || typeof cover !== "object" || !("src" in cover) || !("width" in cover)) return post;
  const widths = [...new Set((lead ? [320, 480, 720, 960, 1280] : [240, 360, 480, 720, 960]).map(width => Math.min(cover.width, width)))];
  const key = `${cover.src}:${lead}`;
  if (!imageResults.has(key)) imageResults.set(key, getImage({src: cover, width: Math.min(cover.width, lead ? 720 : 480), widths, format: "webp", quality: 78}));
  const optimized = await imageResults.get(key)!.catch(() => null);
  if (!optimized) return post;
  return {...post, cardImage: {
    src: optimized.src,
    srcSet: optimized.srcSet.attribute,
    sizes: lead
      ? "(max-width: 600px) calc(100vw - 4rem), (max-width: 1212px) calc((100vw - 9rem) * .524), 576px"
      : "(max-width: 600px) calc(100vw - 4rem), (max-width: 900px) calc((100vw - 5.5rem) / 2), (max-width: 1212px) calc((100vw - 7rem) / 3), 352px",
    width: Number(optimized.attributes.width),
    height: Number(optimized.attributes.height),
    priority: lead,
  }};
}
