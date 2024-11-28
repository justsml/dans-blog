import { getImage } from "astro:assets";
import { getCollection } from "astro:content";
import { fixSlugPrefix, slugify } from "../shared/pathHelpers";
import type { ArticlePost } from "../types";

const getBaseName = (path: string) => {
  const parts = path.split("/");
  return parts.slice(parts.length - 2, parts.length).join("/");
}

const _postsCollection: ArticlePost[] = (
  (await getCollection("posts")) as unknown as ArticlePost[]
).filter((post) => !post.data.hidden);

// console.log(
//   "postsCollection",
//   JSON.stringify(_postsCollection[_postsCollection.length - 1]),
//   null,
//   2,
// );

let _posts = _postsCollection
  .map((post) => ({
    ...post,
    slug: fixSlugPrefix(post.slug),
  }))
  .sort(
    // @ts-ignore
    (a, b) => a.data?.date - b.data?.date,
  )
  .reverse() as unknown as ArticlePost[];

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

      tags.forEach((tag) => {
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
    return Object.entries(PostCollections._categories)
      .sort((a, b) => (a[1] === b[1] ? 0 : a[1] > b[1] ? -1 : 1))
      .filter(([_, count]) => count > 1);
  },

  getPosts() {
    let posts = PostCollections._posts;
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
    return [
      "quiz-bash-in-the-shell",
      "breaking-unicorns",
      "quiz-destructuring-delights",
      "one-weird-trick-to-speed-up-feature-teams",
      // "js-quiz-14-date-time-questions-test-your-knowledge",
      "javascript-promises-quiz",
      // "contribute-to-open-source-the-easy-way",
      "naming-things-real-good",
      // "you-may-not-need-axios",
      "should-you-use-named-or-default-exports",
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

export const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/content/posts/**/*.{jpeg,jpg,png,gif,svg,webp}",
  {
    eager: true,
  },
);

const imagePaths = Object.fromEntries(
  Object.entries(images).map(([path, image]) => {
    return [getBaseName(path), image];
  }),
);

// console.log("imagePaths", imagePaths);
// create resized images at 180px, 240px, 480px, 960px using `astro:assets` getImage

export type ResponsiveImagesType = {
  mobile: ImageMetadata | Promise<ImageMetadata>;
  tablet: ImageMetadata | Promise<ImageMetadata>;
  desktop: ImageMetadata | Promise<ImageMetadata>;

  large: ImageMetadata | Promise<ImageMetadata>;
};

let responsiveImages:
  | Record<string, ResponsiveImagesType>
  | [string, ResponsiveImagesType][] = (await Promise.all(
  Object.entries(images).map(async ([path, image]) => {
    const imgImport = image.default;
    // console.log("imgImport", imgImport);
    if (!imgImport) return [path, null];
    return [
      path,
      {
        mobile: getImage({ src: imgImport, width: 240 }),
        tablet: getImage({ src: imgImport, width: 360 }),
        desktop: getImage({ src: imgImport, width: 640 }),
        large: getImage({ src: imgImport, width: 960 }),
      },
    ];
  }),
).catch(console.error)) as unknown as Record<string, ResponsiveImagesType>;

export const getResponsiveImage = (imagePath: string) => {
  let responsiveImageLookup: Record<string, ResponsiveImagesType> | undefined;
  if (Array.isArray(responsiveImages)) {
    responsiveImageLookup = Object.fromEntries(responsiveImages);
  }
  if (!responsiveImages) return;
  return responsiveImages[imagePath] || responsiveImageLookup?.[imagePath];
};
// console.log("responsiveImages", responsiveImages);

export const getImageProps = (
  imagePath: string,
  // responsiveLevel: "mobile" | "tablet" | "desktop" | "large" = "desktop"
) => {
  // console.log('images:', images, 'imagePath:', imagePath);
  if (!imagePaths[imagePath])
    throw new Error(
      `"${imagePath}" does not exist in glob: "src/assets/*.{jpeg,jpg,png,gif,svg,webp}"`,
    );

  return imagePaths[imagePath].default;
};

/**
 * Convert paths like:
 * `/@fs/Users/dan/code/oss/dans-blog-v3/src/content/posts/2024-01-16--contribute-to-open-source-the-easy-way/open-source-high-life.webp?origWidth=1020&origHeight=673&origFormat=webp`
 *
 * Into:
 *
 * `/src/content/posts/2024-01-16--contribute-to-open-source-the-easy-way/open-source-high-life.webp`
 *
 */
export const getSrcPath = (imagePath: string) => {
  if (imagePath.includes("dans-blog-v3"))
    imagePath = imagePath.split("dans-blog-v3")[1];
  if (imagePath.includes("?")) imagePath = imagePath.split("?")[0];

  return imagePath;
};
