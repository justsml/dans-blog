import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import matter from "gray-matter";
import { ACTIVE_LOCALES, isActiveLocale, type ActiveLocale } from "../../shared/i18n.ts";

export type CorpusInventoryOptions = {
  repoRoot?: string;
};

export type SourcePost = {
  category: string;
  date?: string;
  directory: string;
  isDraft: boolean;
  isHidden: boolean;
  isUnlisted: boolean;
  path: string;
  popularity: number;
  postDir: string;
  slug: string;
  title: string;
};

export type PostPaths = {
  postDir: string;
  sourcePath: string;
  targetPath: string;
  fallbackTargetPath: string;
  reportDir: string;
};

export type TranslationSlot = PostPaths & {
  directory: string;
  locale: ActiveLocale;
  slug: string;
};

export type MissingTranslationSlotOptions = CorpusInventoryOptions & {
  latestPosts?: number;
  locales: readonly ActiveLocale[];
  selectedSlugs?: ReadonlySet<string>;
};

export function getPostsRoot(options: CorpusInventoryOptions = {}) {
  return join(options.repoRoot ?? process.cwd(), "src/content/posts");
}

export function getReportsRoot(options: CorpusInventoryOptions = {}) {
  return join(options.repoRoot ?? process.cwd(), "reports/i18n");
}

export function stripDatePrefix(directoryName: string) {
  return directoryName.replace(/^\d{4}-\d{2}-\d{2}--/, "");
}

export function parseActiveLocales(values: readonly string[], label = "--locales"): ActiveLocale[] {
  const invalidLocales = values.filter((value) => !isActiveLocale(value));

  if (invalidLocales.length > 0) {
    throw new Error(
      `${label} must use active locales: ${ACTIVE_LOCALES.join(", ")}. Received: ${invalidLocales.join(", ")}`,
    );
  }

  return [...values] as ActiveLocale[];
}

export function filterActiveLocales(values: readonly string[]): ActiveLocale[] {
  return values.filter((value): value is ActiveLocale => isActiveLocale(value));
}

export function findSourceIndexPath(postDir: string) {
  const mdxPath = join(postDir, "index.mdx");
  const mdPath = join(postDir, "index.md");
  if (existsSync(mdxPath)) return mdxPath;
  if (existsSync(mdPath)) return mdPath;
  return undefined;
}

export function requireSourceIndexPath(postDir: string) {
  const sourcePath = findSourceIndexPath(postDir);
  if (sourcePath == null) {
    throw new Error(`No English index.md or index.mdx found in ${postDir}`);
  }
  return sourcePath;
}

export function hasSourcePost(postDir: string) {
  return findSourceIndexPath(postDir) != null;
}

export function collectSourcePostDirectories(options: CorpusInventoryOptions = {}) {
  const postsRoot = getPostsRoot(options);
  return readdirSync(postsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((directory) => hasSourcePost(join(postsRoot, directory)));
}

export function collectSourcePostSlugs(options: CorpusInventoryOptions = {}) {
  return collectSourcePostDirectories(options).map(stripDatePrefix);
}

export function collectSourcePosts(options: CorpusInventoryOptions = {}): SourcePost[] {
  const postsRoot = getPostsRoot(options);
  return collectSourcePostDirectories(options)
    .sort()
    .map((directory) => readSourcePost(directory, join(postsRoot, directory)));
}

export function readSourcePost(directory: string, postDir: string): SourcePost {
  const sourcePath = requireSourceIndexPath(postDir);
  const parsed = matter(readFileSync(sourcePath, "utf8"));
  const data = parsed.data as Record<string, unknown>;
  const slug = stripDatePrefix(directory);

  return {
    category: stringValue(data.category) ?? "Uncategorized",
    date: stringValue(data.date),
    directory,
    isDraft: data.draft === true,
    isHidden: data.hidden === true,
    isUnlisted: data.unlisted === true,
    path: sourcePath,
    popularity: numberValue(data.popularity) ?? 0,
    postDir,
    slug,
    title: stringValue(data.title) ?? slug,
  };
}

export function findPostDirectory(slug: string, options: CorpusInventoryOptions = {}) {
  const postsRoot = getPostsRoot(options);
  const matches = readdirSync(postsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => name === slug || name.endsWith(`--${slug}`));

  if (matches.length === 0) {
    throw new Error(`No post directory found for slug "${slug}".`);
  }

  if (matches.length > 1) {
    throw new Error(`Multiple post directories match slug "${slug}": ${matches.join(", ")}`);
  }

  return join(postsRoot, matches[0]);
}

export function getPostPaths(slug: string, locale: ActiveLocale, options: CorpusInventoryOptions = {}): PostPaths {
  const postDir = findPostDirectory(slug, options);
  return getPostPathsForDirectory(postDir, locale, options);
}

export function getPostPathsForDirectory(
  postDir: string,
  locale: ActiveLocale,
  options: CorpusInventoryOptions = {},
): PostPaths {
  const sourcePath = requireSourceIndexPath(postDir);
  const slug = stripDatePrefix(basename(postDir));

  return {
    postDir,
    sourcePath,
    targetPath: join(postDir, locale, "index.mdx"),
    fallbackTargetPath: join(postDir, locale, "index.md"),
    reportDir: join(getReportsRoot(options), slug, locale),
  };
}

export function getTranslationSlot(
  post: Pick<SourcePost, "directory" | "postDir" | "slug">,
  locale: ActiveLocale,
  options: CorpusInventoryOptions = {},
): TranslationSlot {
  return {
    ...getPostPathsForDirectory(post.postDir, locale, options),
    directory: post.directory,
    locale,
    slug: post.slug,
  };
}

export function getMissingTranslationSlots(options: MissingTranslationSlotOptions): TranslationSlot[] {
  const selectedSlugs = options.selectedSlugs ?? new Set<string>();
  const sourcePosts = collectSourcePosts(options).sort((a, b) => b.directory.localeCompare(a.directory));
  const scopedPosts = options.latestPosts == null ? sourcePosts : sourcePosts.slice(0, options.latestPosts);
  const tasks: TranslationSlot[] = [];

  for (const post of scopedPosts) {
    if (selectedSlugs.size > 0 && !selectedSlugs.has(post.slug) && !selectedSlugs.has(post.directory)) continue;

    for (const locale of options.locales) {
      const slot = getTranslationSlot(post, locale, options);
      if (!existsSync(slot.targetPath)) {
        tasks.push(slot);
      }
    }
  }

  return tasks.sort((a, b) => {
    const byDate = b.targetPath.localeCompare(a.targetPath);
    return byDate || a.locale.localeCompare(b.locale);
  });
}

function stringValue(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : undefined;
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
