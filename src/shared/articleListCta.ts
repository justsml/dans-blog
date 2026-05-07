export const ARTICLE_LIST_CTA_INTERVAL = 8;
export const HOME_ARTICLE_LIST_CTA_INTERVALS = [4] as const;
export const HOME_ARTICLE_LIST_CTA_LIMIT = 8;

export function getArticleListCtaOccurrence(
  index: number,
  articleOffset = 0,
  maxOccurrences = Number.POSITIVE_INFINITY,
  intervals: readonly number[] = [ARTICLE_LIST_CTA_INTERVAL],
) {
  const articleNumber = articleOffset + index + 1;

  if (articleNumber === 1) return 1;

  let nextArticleNumber = 1;
  let occurrence = 1;

  while (occurrence < maxOccurrences && nextArticleNumber < articleNumber) {
    const interval = intervals[(occurrence - 1) % intervals.length] ?? ARTICLE_LIST_CTA_INTERVAL;
    nextArticleNumber += interval;
    occurrence += 1;

    if (nextArticleNumber === articleNumber) return occurrence;
  }

  return null;
}

export function shouldShowArticleListCta(index: number, articleOffset = 0) {
  return getArticleListCtaOccurrence(index, articleOffset) !== null;
}
