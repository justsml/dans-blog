export const ARTICLE_LIST_CTA_INTERVAL = 8;

export function getArticleListCtaOccurrence(index: number, articleOffset = 0) {
  const articleNumber = articleOffset + index + 1;

  if (articleNumber === 1) return 1;
  if ((articleNumber - 1) % ARTICLE_LIST_CTA_INTERVAL !== 0) return null;

  return (articleNumber - 1) / ARTICLE_LIST_CTA_INTERVAL + 1;
}

export function shouldShowArticleListCta(index: number, articleOffset = 0) {
  return getArticleListCtaOccurrence(index, articleOffset) !== null;
}
