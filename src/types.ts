
export type ArticlePost = {
  id: string;
  body?: string;
  slug: string;
  collection?: string;
  
  data: {
    title: string;
    subTitle: string;
    label?: string;
    /** To override utteranc.es lookup string */
    commentsKeyOverride?: string;
    unlisted?: boolean;
    hidden?: boolean;
    draft?: boolean;
    cover_icon: ImageMetadata;
    cover_mobile: ImageMetadata;
    date: string;
    modified: string;
    category: string;
    subCategory?: string;
    tags: string[];
  };
};

export type QuizPostFields = {
  /** Server-side "known" data */
  label: string;
  index: number;
  tags: string[];
  questionCount: number;
  /** Client-side values */
  tries?: number;
  status?: "not-started" | "in-progress" | "completed";
  correctCount?: number;
};

export type QuizPost = ArticlePost & { data: QuizPostFields };

/**
 * From: https://docs.astro.build/en/guides/routing/#complete-api-reference
 */
export interface Page<T = any> {
  /** result */
  data: T[];
  /** the count of the first item on the page, starting from 0 */
  start: number;
  /** the count of the last item on the page, starting from 0 */
  end: number;
  /** total number of results */
  total: number;
  /** the current page number, starting from 1 */
  currentPage: number;
  /** number of items per page (default: 10) */
  size: number;
  /** number of last page */
  lastPage: number;
  url: {
    /** url of the current page */
    current: string;
    /** url of the previous page (if there is one) */
    prev: string | undefined;
    /** url of the next page (if there is one) */
    next: string | undefined;
    /** url of the first page (if the current page is not the first page) */
    first: string | undefined;
    /** url of the last page (if the current page in not the last page) */
    last: string | undefined;
  };
}

export type PagePath = {
  params: {
    page: string
  },
  props: {
    [key: string]: unknown;
    page: Page<ArticlePost>
  }
};

// ref: https://docs.astro.build/en/guides/routing/#the-page-prop
export interface Page<T = any> {
  /** result */
  data: T[];
  /** metadata */
  /** the count of the first item on the page, starting from 0 */
  start: number;
  /** the count of the last item on the page, starting from 0 */
  end: number;
  /** total number of results */
  total: number;
  /** the current page number, starting from 1 */
  currentPage: number;
  /** number of items per page (default: 10) */
  size: number;
  /** number of last page */
  lastPage: number;
  url: {
    /** url of the current page */
    current: string;
    /** url of the previous page (if there is one) */
    prev: string | undefined;
    /** url of the next page (if there is one) */
    next: string | undefined;
    /** url of the first page (if the current page is not the first page) */
    first: string | undefined;
    /** url of the last page (if the current page in not the last page) */
    last: string | undefined;
  };
}
