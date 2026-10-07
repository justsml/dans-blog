
export const pageColWidth = 3;
export const pageRows = 3;

export const pageSize = pageColWidth * pageRows;

type RankablePost = { data: { popularity?: number } };

/** Every post above the editorial popularity threshold gets a two-column card. */
export function getWidePosts<T extends RankablePost>(posts: T[]): Set<T> {
  return new Set(posts.filter((post) => (post.data.popularity ?? 0) > 0.9));
}
