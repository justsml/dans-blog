import { afterEach, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  collectSourcePostDirectories,
  collectSourcePosts,
  findPostDirectory,
  getMissingTranslationSlots,
  getModifiedTranslationSlots,
  getPostPaths,
  isTranslationFreshForSourceContents,
  isTranslationOlderThanSourceContents,
  parseActiveLocales,
  stripDatePrefix,
} from "./corpus-inventory.ts";

const tempRoots: string[] = [];

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

test("discovers source posts and normalizes date-prefixed slugs", () => {
  const repoRoot = createTempRepo();
  writePost(repoRoot, "2026-05-13--hello-world", "index.mdx", [
    "---",
    "title: Hello World",
    "category: Guides",
    "date: 2026-05-13",
    "popularity: 0.8",
    "---",
    "",
    "Body",
  ].join("\n"));
  writePost(repoRoot, "plain-slug", "index.md", [
    "---",
    "draft: true",
    "hidden: true",
    "---",
    "",
    "Body",
  ].join("\n"));
  mkdirSync(join(repoRoot, "src/content/posts/not-a-post"), { recursive: true });

  expect(stripDatePrefix("2026-05-13--hello-world")).toBe("hello-world");
  expect(collectSourcePostDirectories({ repoRoot })).toEqual([
    "2026-05-13--hello-world",
    "plain-slug",
  ]);

  const posts = collectSourcePosts({ repoRoot });
  expect(posts.map((post) => post.slug)).toEqual(["hello-world", "plain-slug"]);
  expect(posts[0]).toMatchObject({
    category: "Guides",
    date: "2026-05-13",
    directory: "2026-05-13--hello-world",
    isDraft: false,
    isHidden: false,
    popularity: 0.8,
    title: "Hello World",
  });
  expect(posts[1]).toMatchObject({
    category: "Uncategorized",
    isDraft: true,
    isHidden: true,
    title: "plain-slug",
  });
});

test("builds source, target, fallback target, and report paths", () => {
  const repoRoot = createTempRepo();
  writePost(repoRoot, "2026-05-13--hello-world", "index.md", "Body");

  const postDir = join(repoRoot, "src/content/posts/2026-05-13--hello-world");
  expect(findPostDirectory("hello-world", { repoRoot })).toBe(postDir);
  expect(findPostDirectory("2026-05-13--hello-world", { repoRoot })).toBe(postDir);

  expect(getPostPaths("hello-world", "es", { repoRoot })).toEqual({
    postDir,
    sourcePath: join(postDir, "index.md"),
    targetPath: join(postDir, "es/index.mdx"),
    fallbackTargetPath: join(postDir, "es/index.md"),
    reportDir: join(repoRoot, "reports/i18n/hello-world/es"),
  });
});

test("finds missing translation slots with latest-post and slug filters", () => {
  const repoRoot = createTempRepo();
  writePost(repoRoot, "2026-05-13--new-post", "index.mdx", "New");
  writePost(repoRoot, "2025-01-01--old-post", "index.mdx", "Old");
  writeFileSync(
    join(repoRoot, "src/content/posts/2026-05-13--new-post/es/index.mdx"),
    "Translated",
    "utf8",
  );

  const latestSlots = getMissingTranslationSlots({
    latestPosts: 1,
    locales: ["es", "ja"],
    repoRoot,
  });

  expect(latestSlots.map((slot) => `${slot.locale}/${slot.slug}`)).toEqual(["ja/new-post"]);

  const scopedSlots = getMissingTranslationSlots({
    locales: ["es"],
    repoRoot,
    selectedSlugs: new Set(["2025-01-01--old-post"]),
  });

  expect(scopedSlots.map((slot) => `${slot.locale}/${slot.slug}`)).toEqual(["es/old-post"]);
});

test("finds modified translation slots when English modified is newer", () => {
  const repoRoot = createTempRepo();
  writePost(repoRoot, "2026-05-13--stale-post", "index.mdx", [
    "---",
    "title: Stale",
    "modified: 2026-05-13",
    "---",
    "",
    "New source",
  ].join("\n"));
  writeFileSync(
    join(repoRoot, "src/content/posts/2026-05-13--stale-post/es/index.mdx"),
    [
      "---",
      "title: Viejo",
      "modified: '2026-05-12'",
      "---",
      "",
      "Old translation",
    ].join("\n"),
    "utf8",
  );
  mkdirSync(join(repoRoot, "src/content/posts/2026-05-13--stale-post/ja"), { recursive: true });
  writeFileSync(
    join(repoRoot, "src/content/posts/2026-05-13--stale-post/ja/index.mdx"),
    [
      "---",
      "title: Fresh",
      "modified: '2026-05-13'",
      "---",
      "",
      "Fresh translation",
    ].join("\n"),
    "utf8",
  );

  const slots = getModifiedTranslationSlots({
    locales: ["es", "ja", "zh"],
    repoRoot,
  });

  expect(slots.map((slot) => `${slot.locale}/${slot.slug}`)).toEqual(["es/stale-post"]);
});

test("treats existing translations without modified as stale but skips sources without modified", () => {
  expect(isTranslationOlderThanSourceContents(
    ["---", "modified: 2026-05-13", "---", "", "Source"].join("\n"),
    ["---", "title: Translation", "---", "", "Translation"].join("\n"),
  )).toBe(true);
  expect(isTranslationFreshForSourceContents(
    ["---", "modified: 2026-05-13", "---", "", "Source"].join("\n"),
    ["---", "modified: '2026-05-14'", "---", "", "Translation"].join("\n"),
  )).toBe(true);
  expect(isTranslationOlderThanSourceContents(
    ["---", "title: Source", "---", "", "Source"].join("\n"),
    ["---", "modified: '2026-05-12'", "---", "", "Translation"].join("\n"),
  )).toBe(false);
});

test("validates active locales with a stable error message", () => {
  expect(parseActiveLocales(["es", "zh"], "--locale/--locales")).toEqual(["es", "zh"]);
  expect(() => parseActiveLocales(["es", "pt"], "--locale/--locales")).toThrow(
    "--locale/--locales must use active locales: es, hi, ja, ru, de, fr, it, ar, he, zh. Received: pt",
  );
});

function createTempRepo() {
  const repoRoot = mkdtempSync(join(tmpdir(), "corpus-inventory-"));
  tempRoots.push(repoRoot);
  mkdirSync(join(repoRoot, "src/content/posts"), { recursive: true });
  return repoRoot;
}

function writePost(repoRoot: string, directory: string, filename: "index.md" | "index.mdx", contents: string) {
  const postDir = join(repoRoot, "src/content/posts", directory);
  mkdirSync(postDir, { recursive: true });
  mkdirSync(join(postDir, "es"), { recursive: true });
  writeFileSync(join(postDir, filename), contents, "utf8");
}
