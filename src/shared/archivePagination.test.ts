import { describe, expect, test } from "bun:test";
import type { ArticlePost, Page } from "../types";
import {
  ARCHIVE_SORT_MODES,
  buildArchivePagePaths,
  getArchiveArticleListCtaOccurrence,
  getArchiveArticleListOffset,
  getArchiveNextUrl,
  getArchivePageParam,
  getArchivePageUrlSuffix,
  getArchiveSortKey,
  getListedArchivePosts,
  sortArchivePosts,
  type ArchivePageEntry,
  type ArchiveStaticPath,
} from "./archivePagination";

describe("archive pagination", () => {
  test("defines the archive sort modes once", () => {
    expect(ARCHIVE_SORT_MODES).toEqual([
      { field: "date", direction: "asc" },
      { field: "date", direction: "desc" },
      { field: "modified", direction: "asc" },
      { field: "modified", direction: "desc" },
    ]);
  });

  test("builds sort keys, suffixes, and page params", () => {
    const ascendingDate = { field: "date", direction: "asc" } as const;
    const descendingModified = { field: "modified", direction: "desc" } as const;

    expect(getArchiveSortKey(ascendingDate)).toBe("date-asc");
    expect(getArchivePageUrlSuffix(ascendingDate)).toBe("-date.html");
    expect(getArchivePageParam(undefined, ascendingDate)).toBe("1-date");

    expect(getArchiveSortKey(descendingModified)).toBe("modified-desc");
    expect(getArchivePageUrlSuffix(descendingModified)).toBe("-modified-desc.html");
    expect(getArchivePageParam("3", descendingModified)).toBe("3-modified-desc");
  });

  test("filters unlisted posts and sorts without mutating the caller array", () => {
    const posts = [
      post("newer", "2024-03-01", "2024-03-10"),
      post("hidden-from-archive", "2024-01-01", "2024-01-01", true),
      post("older", "2024-01-01", "2024-02-01"),
    ];

    expect(getListedArchivePosts(posts).map((item) => item.slug)).toEqual([
      "newer",
      "older",
    ]);
    expect(
      sortArchivePosts(posts, { field: "date", direction: "asc" }).map(
        (item) => item.slug,
      ),
    ).toEqual(["hidden-from-archive", "older", "newer"]);
    expect(posts.map((item) => item.slug)).toEqual([
      "newer",
      "hidden-from-archive",
      "older",
    ]);
  });

  test("decorates Astro paginate paths for every sort mode", () => {
    const posts = [
      post("middle", "2024-02-01", "2024-05-01"),
      post("newest", "2024-03-01", "2024-04-01"),
      post("oldest", "2024-01-01", "2024-06-01"),
      post("unlisted", "2024-04-01", "2024-07-01", true),
    ];

    const pages = buildArchivePagePaths({
      posts,
      pageSize: 2,
      params: { locale: "es" },
      props: { locale: "es" },
      toStaticPaths: (items) =>
        items.map((item) => ({
          params: { slug: item.slug },
          props: item,
        })),
      paginate: fakePaginate,
    });

    expect(pages).toHaveLength(8);

    expect(pages[0].params).toMatchObject({
      locale: "es",
      page: "1-date",
      sortKey: "date-asc",
      pageUrlSuffix: "-date.html",
      field: "date",
      direction: "asc",
    });
    expect(pages[0].props).toMatchObject({
      locale: "es",
      sortKey: "date-asc",
      pageUrlSuffix: "-date.html",
      field: "date",
      direction: "asc",
    });
    expect(pages[0].props.page.data.map((item) => item.props.slug)).toEqual([
      "oldest",
      "middle",
    ]);

    expect(pages[3].params).toMatchObject({
      locale: "es",
      page: "2-date-desc",
      sortKey: "date-desc",
      pageUrlSuffix: "-date-desc.html",
    });
    expect(pages[3].props.page.data.map((item) => item.props.slug)).toEqual([
      "oldest",
    ]);

    expect(pages[4].props.page.data.map((item) => item.props.slug)).toEqual([
      "newest",
      "middle",
    ]);
  });

  test("calculates next URLs and CTA offsets for archive pages", () => {
    expect(
      getArchiveNextUrl({
        currentPage: 1,
        lastPage: 3,
        next: "/pages/2",
        pageUrlSuffix: "-date-desc.html",
      }),
    ).toBe("/pages/2-date-desc.html");
    expect(
      getArchiveNextUrl({
        currentPage: 3,
        lastPage: 3,
        next: undefined,
        pageUrlSuffix: "-date-desc.html",
      }),
    ).toBeNull();

    expect(getArchiveArticleListOffset(1, 9)).toBe(0);
    expect(getArchiveArticleListOffset(3, 9)).toBe(16);
    expect(getArchiveArticleListCtaOccurrence(0, 1, 9)).toBe(1);
    expect(getArchiveArticleListCtaOccurrence(4, 1, 9)).toBe(2);
  });
});

function post(
  slug: string,
  date: string,
  modified: string,
  unlisted = false,
): ArticlePost {
  return {
    id: `${slug}/index`,
    slug,
    data: {
      title: slug,
      subTitle: "",
      date,
      modified,
      category: "Code",
      tags: [],
      unlisted,
    },
  } as unknown as ArticlePost;
}

function fakePaginate(
  entries: ArchiveStaticPath<ArticlePost>[],
  options: { pageSize: number; params?: Record<string, string> },
) {
  const lastPage = Math.ceil(entries.length / options.pageSize);

  return Array.from({ length: lastPage }, (_, index) => {
    const currentPage = index + 1;
    const start = index * options.pageSize;
    const data = entries.slice(start, start + options.pageSize);

    return {
      params: {
        ...options.params,
        ...(currentPage > 1 ? { page: String(currentPage) } : {}),
      },
      props: {
        page: {
          data,
          start,
          end: start + data.length,
          total: entries.length,
          currentPage,
          size: options.pageSize,
          lastPage,
          url: {
            current: `/pages/${currentPage}`,
            prev: currentPage > 1 ? `/pages/${currentPage - 1}` : undefined,
            next: currentPage < lastPage ? `/pages/${currentPage + 1}` : undefined,
            first: currentPage > 1 ? "/pages/1" : undefined,
            last: currentPage < lastPage ? `/pages/${lastPage}` : undefined,
          },
        } satisfies Page<ArchivePageEntry<ArticlePost>>,
      },
    };
  });
}
