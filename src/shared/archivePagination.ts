import type { ArticlePost, Page } from "../types";
import {
  HOME_ARTICLE_LIST_CTA_INTERVALS,
  HOME_ARTICLE_LIST_CTA_LIMIT,
  getArticleListCtaOccurrence,
} from "./articleListCta";
import { pageSize as defaultPageSize } from "./pagination";

export type ArchiveSortField = "date" | "modified";
export type ArchiveSortDirection = "asc" | "desc";

export type ArchiveSortMode = {
  field: ArchiveSortField;
  direction: ArchiveSortDirection;
};

export type ArchiveStaticPath<TPost = ArticlePost> = {
  params: Record<string, unknown>;
  props: TPost;
};

export type ArchivePageEntry<TPost = ArticlePost> = ArchiveStaticPath<TPost>;

export type ArchivePagePath<TPost = ArticlePost> = {
  params: Record<string, unknown>;
  props: {
    page: Page<ArchivePageEntry<TPost>>;
    [key: string]: unknown;
  };
};

export type ArchiveRouteProps<TLocale extends string | undefined = string | undefined> = {
  page: Page<ArchivePageEntry<ArticlePost>>;
  pageUrlSuffix: string;
  sortKey: string;
  field: ArchiveSortField;
  direction: ArchiveSortDirection;
  locale?: TLocale;
};

type ArchivePaginate<TPost = ArticlePost> = (
  data: ArchiveStaticPath<TPost>[],
  options: { pageSize: number; params?: Record<string, string> },
) => ArchivePagePath<TPost>[];

type BuildArchivePagePathsOptions<TPost extends ArticlePost> = {
  posts: TPost[];
  paginate: ArchivePaginate<TPost>;
  toStaticPaths: (posts: TPost[]) => ArchiveStaticPath<TPost>[];
  pageSize?: number;
  params?: Record<string, string>;
  props?: Record<string, unknown>;
};

export const ARCHIVE_SORT_MODES = [
  { field: "date", direction: "asc" },
  { field: "date", direction: "desc" },
  { field: "modified", direction: "asc" },
  { field: "modified", direction: "desc" },
] as const satisfies readonly ArchiveSortMode[];

export function buildArchivePagePaths<TPost extends ArticlePost>({
  posts,
  paginate,
  toStaticPaths,
  pageSize = defaultPageSize,
  params = {},
  props = {},
}: BuildArchivePagePathsOptions<TPost>): ArchivePagePath<TPost>[] {
  const listedPosts = getListedArchivePosts(posts);
  const paginateOptions =
    Object.keys(params).length > 0 ? { pageSize, params } : { pageSize };

  return ARCHIVE_SORT_MODES.flatMap((sortMode) => {
    const pageData = paginate(
      toStaticPaths(sortArchivePosts(listedPosts, sortMode)),
      paginateOptions,
    );

    return pageData.map((path) =>
      decorateArchivePagePath(path, sortMode, {
        params,
        props,
      }),
    );
  });
}

export function getListedArchivePosts<TPost extends ArticlePost>(posts: TPost[]): TPost[] {
  return posts.filter((post) => !post.data.unlisted);
}

export function sortArchivePosts<TPost extends ArticlePost>(
  posts: TPost[],
  sortMode: ArchiveSortMode,
): TPost[] {
  const { field, direction } = sortMode;

  return posts.concat().sort((a, b) => {
    const aDate = a.data[field];
    const bDate = b.data[field];
    if (!aDate || !bDate) return (console.warn("No date found for", a, b), 0);
    const aTime = new Date(aDate).getTime();
    const bTime = new Date(bDate).getTime();
    return direction === "desc" ? bTime - aTime : aTime - bTime;
  });
}

export function getArchiveSortKey(sortMode: ArchiveSortMode) {
  return `${sortMode.field}-${sortMode.direction}`;
}

export function getArchivePageUrlSuffix(sortMode: ArchiveSortMode) {
  return `-${sortMode.field}${sortMode.direction === "asc" ? "" : "-desc"}.html`;
}

export function getArchivePageParam(
  page: string | number | null | undefined,
  sortMode: ArchiveSortMode,
) {
  const directionSuffix = sortMode.direction === "asc" ? "" : "-desc";
  return `${page ?? "1"}-${sortMode.field}${directionSuffix}`;
}

export function getArchiveNextUrl({
  currentPage,
  lastPage,
  next,
  pageUrlSuffix,
}: {
  currentPage: number;
  lastPage: number;
  next?: string | null;
  pageUrlSuffix: string;
}) {
  if (currentPage === lastPage || !next) return null;
  return `${next}${pageUrlSuffix}`;
}

export function getArchiveArticleListOffset(
  currentPage: number,
  pageSize = defaultPageSize,
) {
  return (currentPage - 1) * (pageSize - 1);
}

export function getArchiveArticleListCtaOccurrence(
  index: number,
  currentPage: number,
  pageSize = defaultPageSize,
) {
  return getArticleListCtaOccurrence(
    index,
    getArchiveArticleListOffset(currentPage, pageSize),
    HOME_ARTICLE_LIST_CTA_LIMIT,
    HOME_ARTICLE_LIST_CTA_INTERVALS,
  );
}

function decorateArchivePagePath<TPost extends ArticlePost>(
  path: ArchivePagePath<TPost>,
  sortMode: ArchiveSortMode,
  context: {
    params: Record<string, string>;
    props: Record<string, unknown>;
  },
): ArchivePagePath<TPost> {
  const sortKey = getArchiveSortKey(sortMode);
  const pageUrlSuffix = getArchivePageUrlSuffix(sortMode);

  return {
    ...path,
    props: {
      ...path.props,
      ...context.props,
      sortKey,
      pageUrlSuffix,
      field: sortMode.field,
      direction: sortMode.direction,
    },
    params: {
      ...path.params,
      ...context.params,
      pageUrlSuffix,
      page: getArchivePageParam(
        path.params.page as string | number | undefined,
        sortMode,
      ),
      sortKey,
      field: sortMode.field,
      direction: sortMode.direction,
    },
  };
}
