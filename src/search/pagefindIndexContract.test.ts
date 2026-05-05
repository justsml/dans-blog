import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();

describe("Pagefind index contract", () => {
  test("keeps Pagefind as the configured static search index", () => {
    const astroConfig = readProjectFile("astro.config.mjs");

    expect(astroConfig).toContain('from "astro-pagefind"');
    expect(astroConfig).toContain("pagefind()");
  });

  test("marks article content and title as the searchable post surface", () => {
    const postLayout = readProjectFile("src/layouts/Post.astro");

    expect(postLayout).toContain("data-pagefind-body");
    expect(postLayout).toContain('data-pagefind-meta="title"');
  });

  test("keeps repeated article chrome out of the search index", () => {
    expect(readProjectFile("src/components/Footer.astro")).toContain(
      'data-pagefind-ignore="all"',
    );
    expect(readProjectFile("src/components/AdditionalReading.astro")).toContain(
      'data-pagefind-ignore="all"',
    );
  });

  test("does not promote alternate search implementations under src", () => {
    const forbiddenSearchPaths = listFiles(join(root, "src")).filter((file) => {
      const path = relative(root, file);
      if (path === "src/search/README.md") return false;
      if (path === "src/search/pagefindIndexContract.test.ts") return false;
      if (path.startsWith("src/content/posts/")) return false;
      return /(orama|lancedb|duckdb|remote-pagefind|remotePagefind)/i.test(path);
    });

    expect(forbiddenSearchPaths).toEqual([]);
  });
});

function readProjectFile(path: string) {
  return readFileSync(join(root, path), "utf-8");
}

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    return stats.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}
