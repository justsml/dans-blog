export const ARTICLE_LIST_CTA_INTERVAL = 8;
export const HOME_ARTICLE_LIST_CTA_LIMIT = 5;

export function getArticleListCtaOccurrence(
  index: number,
  articleOffset = 0,
  maxOccurrences = Number.POSITIVE_INFINITY,
) {
  const articleNumber = articleOffset + index + 1;

  if (articleNumber === 1) return 1;
  if ((articleNumber - 1) % ARTICLE_LIST_CTA_INTERVAL !== 0) return null;

  const occurrence = (articleNumber - 1) / ARTICLE_LIST_CTA_INTERVAL + 1;
  return occurrence <= maxOccurrences ? occurrence : null;
}

export function shouldShowArticleListCta(index: number, articleOffset = 0) {
  return getArticleListCtaOccurrence(index, articleOffset) !== null;
}
