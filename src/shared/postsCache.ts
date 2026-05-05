import { getCollection } from "astro:content";
import { fixSlugPrefix, getSlugFromId, slugify } from "./pathHelpers.ts";
import type { ArticlePost, QuizPost } from "../types.ts";
import { toDate } from "./dateUtils.ts";
import { isRoutablePost, isVisiblePost } from "./postVisibility.ts";

const _postsCollection: ArticlePost[] = (
  (await getCollection("posts")) as unknown as ArticlePost[]
)
  .filter(isVisiblePost)
  .sort(
    // @ts-expect-error - data is not always defined
    (a, b) => toDate(a?.data?.date) - toDate(b?.data?.date),
  )
  .reverse() as unknown as ArticlePost[];

const _posts = _postsCollection.map((post) => ({
  ...post,
  slug: getSlugFromId(post.id),
}));

const ignoredCategories = ["Quiz", "Snippet", "Draft"];

export type PostFeedItem = {
  sourcePath: string;
  title: string;
  pubDate: Date;
  description: string;
  categories: string[];
  category: string;
  cover?: string;
  slug: string;
  link: string;
};

const openSourceJournalPost = {
  id: "open-source-journal",
  slug: "open-source-journal",
  collection: "pages",
  data: {
    title: "Open Source Journal",
    subTitle: "A collection of open-source projects I've worked on.",
    publish: true,
    category: "Projects",
    date: "2024-12-16",
    modified: "2024-12-28",
    tags: ["open-source", "projects"],
    cover: {
      src: "../../images/social-banner.webp",
      format: "webp",
      width: 1200,
      height: 628,
    },
  },
} as unknown as ArticlePost;

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
      if (post.data.unlisted || post.data.draft) return acc;
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

  getQuizPosts() {
    return PostCollections._quizPosts;
  },

  getQuizList(): QuizPost[] {
    const quizPosts = PostCollections.getQuizPosts()
      .map(toClientSafePost)
      .sort((a: ArticlePost, b: ArticlePost) => {
        const subCategoryA = a.data.subCategory;
        const subCategoryB = b.data.subCategory;

        if (subCategoryA == null || subCategoryB == null) return 0;
        return subCategoryA.localeCompare(subCategoryB);
      });

    return quizPosts.map((post, index): QuizPost => ({
      ...post,
      data: {
        ...post.data,
        index,
        subCategory: post.data.subCategory || "Uncategorized",
        correctCount: 0,
        questionCount: countQuizQuestions(post.body),
        label: post.data.label || post.data.title,
      },
    })) as QuizPost[];
  },

  getRedirectSourcePosts(posts: ArticlePost[] = _posts as ArticlePost[]) {
    return posts.filter(isRoutablePost).map((post) => ({
      slug: fixSlugPrefix(post.slug),
      data: {
        redirects: post.data.redirects,
      },
    }));
  },

  getFeedPosts() {
    return [openSourceJournalPost, ...PostCollections._posts];
  },

  getFeedItems({ includeSubCategory = true } = {}): PostFeedItem[] {
    return PostCollections.getFeedPosts().map((post) =>
      toFeedItem(post, { includeSubCategory }),
    );
  },

  getStaticPaths(
    posts: ArticlePost[] = _posts as unknown as ArticlePost[],
  ): Array<{
    params: Record<string, unknown>;
    props: Record<string, unknown>;
  }> {
    posts = posts.filter(isRoutablePost);
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
      (post) =>
        post.data.category === category &&
        !post.data.unlisted &&
        !post.data.draft,
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
      "llm-connection-strings",
      "you-may-not-need-axios",
      "you-might-not-need-algolia",
      "serverless-database-magic",
      // "the-last-to-think",
      "naming-things-real-good",
      "beware-the-single-purpose-people",
      "quiz-bash-in-the-shell",
      // "should-you-use-named-or-default-exports",
      "quiz-postgres-sql-mastery-pt1",
    ]
      .map((slug) => PostCollections._postsBySlug[slug])
      .filter(Boolean);
  },

  getPostsBySlugs(slugs: string[]) {
    const found = slugs.flatMap((slug) => {
      const post = PostCollections._postsBySlug[slug];
      return post ? [post] : [];
    });
    if (found.length < slugs.length) {
      const missing = slugs.filter((slug) => PostCollections._postsBySlug[slug] == null);
      console.warn(
        "Skipping missing or unpublished slugs: %o   matching: %o",
        missing,
        found.length,
      );
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

function toClientSafePost(post: ArticlePost): ArticlePost {
  return {
    ...post,
    data: {
      ...post.data,
      cover: undefined,
      cover_icon: undefined,
      cover_mobile: undefined,
    },
  } as unknown as ArticlePost;
}

function countQuizQuestions(body?: string) {
  return body?.match(/<Challenge\b/g)?.length ?? 0;
}

function toFeedItem(
  post: ArticlePost,
  { includeSubCategory }: { includeSubCategory: boolean },
): PostFeedItem {
  const slug = fixSlugPrefix(post.slug || getSlugFromId(post.id));
  const categories = [
    post.data.category,
    includeSubCategory ? post.data.subCategory : undefined,
    ...(post.data.tags ?? []),
  ].filter(Boolean) as string[];

  return {
    sourcePath: post.id,
    title: post.data.title,
    pubDate: new Date(post.data.date!),
    description: post.data.subTitle,
    categories,
    category: post.data.category,
    cover: post.data?.cover?.src,
    slug,
    link: `/${slug}/`,
  };
}

export const getArticleSortFn = (
  field: "date" | "modified",
  direction: "asc" | "desc" = "desc",
) => {
  return (a: ArticlePost, b: ArticlePost) => {
    const aDate = a.data[field];
    const bDate = b.data[field];
    if (!aDate || !bDate) return (console.warn("No date found for", a, b), 0);
    const aTime = new Date(aDate).getTime();
    const bTime = new Date(bDate).getTime();
    return direction === "desc" ? bTime - aTime : aTime - bTime;
  };
};
