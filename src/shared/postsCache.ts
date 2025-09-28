import { getCollection } from "astro:content";
import { fixSlugPrefix, slugify } from "./pathHelpers.ts";
import type { ArticlePost } from "../types.ts";
import { toDate } from "./dateUtils.ts";

const _postsCollection: ArticlePost[] = (
  (await getCollection("posts")) as unknown as ArticlePost[]
)
  .filter((post) => !post.data.hidden)
  .sort(
    // @ts-expect-error - data is not always defined
    (a, b) => toDate(a?.data?.date) - toDate(b?.data?.date),
  )
  .reverse() as unknown as ArticlePost[];

const _posts = _postsCollection.map((post) => ({
  ...post,
  slug: fixSlugPrefix(post.slug),
}));

const ignoredCategories = ["Quiz", "Snippet", "Draft"];

/**
 * PostCollections provides access to posts' data, pre-.
 */
export const PostCollections = {
  _posts,
  _postsBySlug: _posts.reduce(
    (acc, post) => {
      acc[post.slug] = post;
      return acc;
    },
    {} as Record<string, (typeof _posts)[0]>,
  ),

  _slugs: _posts.map((post) => post.slug),
  _quizPosts: _posts.filter((post) => post.data.category === "Quiz"),

  _categories: _posts.reduce(
    (acc, post) => {
      const { category } = post.data;
      if (ignoredCategories.includes(category)) return acc;
      acc[category] = acc[category] == null ? 1 : acc[category] + 1;
      return acc;
    },
    {} as Record<string, number>,
  ),

  _tags: _posts.reduce(
    (acc, post) => {
      // const { tags, } = post.data;
      const {
        slug,
        data: { tags },
      } = post;

      tags?.forEach((tag) => {
        acc[tag] = acc[tag] == null ? [slug] : [...acc[tag], slug];
      });
      return acc;
    },
    {} as Record<string, string[]>,
  ),

  /** `getTagCounts` returns a sorted list of tags and their counts. */
  getTagCounts() {
    return Object.entries(PostCollections._tags).sort(([, a], [, b]) =>
      b.length === a.length ? 0 : b.length > a.length ? 1 : -1,
    );
  },

  /** `getCategoryCounts` returns a sorted list of categories and their counts. */
  getCategoryCounts() {
    return (
      Object.entries(PostCollections._categories)
        .sort((a, b) => (a[1] === b[1] ? 0 : a[1] > b[1] ? -1 : 1))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, count]) => count > 1)
    );
  },

  getPosts() {
    const posts = PostCollections._posts;
    return posts;
  },

  getStaticPaths(
    posts: ArticlePost[] = _posts as unknown as ArticlePost[],
  ): Array<{
    params: Record<string, unknown>;
    props: Record<string, unknown>;
  }> {
    // console.log("getStaticPaths", posts);
    posts = posts.filter((post) => !post.data.hidden);
    return posts.map((post) => ({
      params: { slug: fixSlugPrefix(post.slug) },
      props: { ...post, slug: fixSlugPrefix(post.slug) },
    }));
  },

  getStaticPathsCategoryList(): Array<{
    params: Record<string, unknown>;
    props: Record<string, unknown>;
  }> {
    const paths = Object.entries(PostCollections.getCategoryList()).map(
      ([category, count]) => ({
        params: { category: slugify(category) },
        props: { category, count, slug: slugify(category) },
      }),
    );

    // console.log("getStaticPathsCategoryList", paths);

    return paths;
  },
  getCategoryList() {
    return PostCollections._categories;
  },
  getPostsByCategory(category: string) {
    return PostCollections._posts.filter(
      (post) => post.data.category === category,
    );
  },

  /** Popular posts according to google analytics. 2024/Q2 */
  getPopularPosts() {
    // "one-weird-trick-to-speed-up-feature-teams",
    // "js-quiz-14-date-time-questions-test-your-knowledge",
    // "javascript-promises-quiz",
    // "contribute-to-open-source-the-easy-way",
    // "quiz-postgres-sql-mastery-pt2",
    // "breaking-unicorns",
    // "quiz-destructuring-delights",
    return [
      "serverless-database-magic",
      "the-last-to-think",
      "beware-the-single-purpose-people",
      "you-may-not-need-axios",
      "should-you-use-named-or-default-exports",
      "quiz-bash-in-the-shell",
      "you-might-not-need-algolia",
      // "naming-things-real-good",
      "quiz-postgres-sql-mastery-pt1",
    ].map((slug) => PostCollections._postsBySlug[slug]);
  },

  getPostsBySlugs(slugs: string[]) {
    const found = slugs.map((slug) => PostCollections._postsBySlug[slug]);
    if (found.length < slugs.length) {
      console.error(
        "Some slugs not found: %o   matching: %o",
        slugs,
        found.length,
      );
      throw new Error(`Some slugs not found: ${slugs.join(", ")}`);
    }
    return found;
  },

  generateCoverImgs() {
    // TODO?
  },
  getRecentPosts(limit = 7) {
    return [...PostCollections._posts]
      .sort((a, b) => {
        const aDate = new Date(a.data.date!).getTime();
        const bDate = new Date(b.data.date!).getTime();

        return aDate === bDate ? 0 : aDate > bDate ? -1 : 1;
        // return a.data.modified! === b.data.modified! ? 0 : a.data.modified! > b.data.modified! ? -1 : 1;
      })
      .slice(0, limit);
  },
};

export const getArticleSortFn = (
  field: "date" | "modified",
  direction: "asc" | "desc" = "desc",
) => {
  return (a: ArticlePost, b: ArticlePost) => {
    const aDate = a.data[field];
    const bDate = b.data[field];
    if (!aDate || !bDate) return console.warn("No date found for", a, b), 0;
    const aTime = new Date(aDate).getTime();
    const bTime = new Date(bDate).getTime();
    return direction === "desc" ? bTime - aTime : aTime - bTime;
  };
};
