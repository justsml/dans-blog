import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { ArticlePost } from "../types";

/** Match initial and appended card media without shipping original full-size assets. */
export async function optimizeArticleCardImage(post: ArticlePost, lead = false): Promise<ArticlePost> {
  const cover = post.data.cover_mobile;
  if (!cover || typeof cover !== "object" || !("src" in cover) || !("width" in cover)) return post;
  const optimized = await getImage({src: cover, width: Math.min(cover.width, lead ? 960 : 480), format: "webp", quality: lead ? 78 : 70}).catch(() => cover);
  return {...post, data: {...post.data, cover_mobile: optimized as ImageMetadata}};
}
