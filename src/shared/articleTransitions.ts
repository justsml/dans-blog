/** Stable CSS identifiers for shared titles/media, including locale-prefixed slugs. */
export function articleTransitionName(slug: string, media = false) {
  return `article-${media ? "image-" : ""}${slug.replace(/^\/+|\/+$/g, "").replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
