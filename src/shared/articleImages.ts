import { getImage } from "astro:assets";
import type { ArticlePost } from "../types";

const imageResults = new Map<string, ReturnType<typeof getImage>>();
/** Matches .article-card__media's aspect-ratio. */
const CARD_ASPECT = 1.8;

/** Match initial and appended card media without shipping original full-size assets. */
export async function optimizeArticleCardImage(post: ArticlePost, lead = false, options: {sizes?: string; maxWidth?: number; wide?: boolean} = {}): Promise<ArticlePost> {
  // Wide cards show a near-square image column, so they use the square cover where one exists.
  const square = options.wide ? post.data.cover_mobile : undefined;
  const cover = (square && typeof square === "object" ? square : undefined) ?? post.data.cover_full_width ?? post.data.cover_mobile;
  const aspect = cover === square ? 1 : CARD_ASPECT;
  if (!cover || typeof cover !== "object" || !("src" in cover) || !("width" in cover)) return post;
  // Crop to the card's shape before resizing. Resizing a 6:1 banner to card width first leaves ~60px of height,
  // which the card's object-fit then enlarges into a blur.
  const maxCropWidth = Math.min(cover.width, Math.floor(cover.height * aspect));
  const widths = [...new Set([240, 320, 360, 480, 720, 960, 1280, 1600].filter(width => width <= (options.maxWidth ?? (lead ? 1280 : 960))).map(width => Math.min(maxCropWidth, width)))];
  const width = Math.min(maxCropWidth, lead ? 720 : 480);
  const key = `${cover.src}:${lead}:${aspect}:${options.maxWidth ?? "default"}`;
  if (!imageResults.has(key)) imageResults.set(key, getImage({src: cover, width, height: Math.round(width / aspect), fit: "cover", widths, format: "webp", quality: 78}));
  const optimized = await imageResults.get(key)!.catch(() => null);
  if (!optimized) return post;
  return {...post, cardImage: {
    src: optimized.src,
    srcSet: optimized.srcSet.attribute,
    sizes: options.sizes ?? (options.wide
      ? "(max-width: 600px) calc(100vw - 4rem), (max-width: 900px) calc((100vw - 5.625rem) * .535), (max-width: 1212px) calc((100vw - 7rem) / 3), 380px"
      : lead
        ? "(max-width: 600px) calc(100vw - 4rem), (max-width: 1212px) calc((100vw - 9rem) * .524), 576px"
        : "(max-width: 600px) calc(100vw - 4rem), (max-width: 900px) calc((100vw - 5.5rem) / 2), (max-width: 1212px) calc((100vw - 7rem) / 3), 352px"),
    width: Number(optimized.attributes.width),
    height: Number(optimized.attributes.height),
    priority: lead,
  }};
}
