
export const pageColWidth = 3;
export const pageRows = 3;

export const pageSize = pageColWidth * pageRows;

type RankablePost = { data: { popularity?: number } };

/**
 * Picks each batch's most popular cards to span two grid columns. Most posts score 0.8+, so rank
 * instead of thresholding, and size the pick so cards plus extra spans fill whole three-column rows.
 */
export function getWidePosts<T extends RankablePost>(posts: T[], skip = 0): Set<T> {
  const candidates = posts.slice(skip);
  const wideCount = (pageColWidth - (candidates.length % pageColWidth)) % pageColWidth || pageColWidth;
  const ranked = candidates
    .filter((post) => (post.data.popularity ?? 0) > 0)
    .sort((a, b) => (b.data.popularity ?? 0) - (a.data.popularity ?? 0));
  return new Set(ranked.slice(0, wideCount));
}
