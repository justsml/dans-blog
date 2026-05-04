import { afterEach, describe, expect, test } from "bun:test";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  buildRedirectManifest,
  resolveRedirectRules,
  writeRedirectManifest,
  type RedirectSourcePost,
} from "./redirectManager";

const tempDirs: string[] = [];

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop();
    if (dir != null && existsSync(dir)) rmSync(dir, { recursive: true });
  }
});

describe("redirect manifest generation", () => {
  test("builds normalized redirect rules from post frontmatter", () => {
    expect(
      buildRedirectManifest([
        post("new-post", ["old-post", "/already-normalized/"]),
      ]),
    ).toBe(
      [
        "/old-post /new-post 301",
        "/already-normalized/ /new-post 301",
        "",
      ].join("\n"),
    );
  });

  test("dedupes identical from/to/status rules", () => {
    expect(
      buildRedirectManifest([post("new-post", ["/old-post", "/old-post"])]),
    ).toBe("/old-post /new-post 301\n");
  });

  test("throws when the same source redirects to a different target", () => {
    expect(() =>
      buildRedirectManifest([
        post("new-post", ["/old-post"]),
        post("other-post", ["/old-post"]),
      ]),
    ).toThrow('Conflicting redirect for "/old-post"');
  });

  test("throws when the same source redirects with a different status", () => {
    expect(() =>
      resolveRedirectRules([
        { from: "/old-post", to: "/new-post", status: 301 },
        { from: "/old-post", to: "/new-post", status: 302 },
      ]),
    ).toThrow('Conflicting redirect for "/old-post"');
  });

  test("preserves existing redirects not generated from post frontmatter", () => {
    expect(
      buildRedirectManifest(
        [post("new-post", ["/old-post"])],
        [
          "/404.html /404/ 200",
          "",
          "/tags/* /?tags=:splat 301",
          "/old-post /new-post 301",
          "",
        ].join("\n"),
      ),
    ).toBe(
      [
        "/old-post /new-post 301",
        "",
        "/404.html /404/ 200",
        "",
        "/tags/* /?tags=:splat 301",
        "",
      ].join("\n"),
    );
  });

  test("throws when an existing redirect conflicts with post frontmatter", () => {
    expect(() =>
      buildRedirectManifest(
        [post("new-post", ["/old-post"])],
        "/old-post /different-post 301\n",
      ),
    ).toThrow('Conflicting redirect for "/old-post"');
  });

  test("writes the generated manifest once to the requested file", () => {
    const dir = mkdtempSync(join(tmpdir(), "redirect-manifest-"));
    tempDirs.push(dir);
    const filePath = join(dir, "public/_redirects");

    const manifest = writeRedirectManifest(
      [post("new-post", ["old-post"])],
      filePath,
    );

    expect(manifest).toBe("/old-post /new-post 301\n");
    expect(readFileSync(filePath, "utf-8")).toBe(manifest);
  });

  test("mirrors the generated manifest when requested", () => {
    const dir = mkdtempSync(join(tmpdir(), "redirect-manifest-"));
    tempDirs.push(dir);
    const filePath = join(dir, "public/_redirects");
    const mirrorPath = join(dir, "dist/_redirects");
    mkdirSync(join(dir, "dist"));

    const manifest = writeRedirectManifest(
      [post("new-post", ["old-post"])],
      filePath,
      [mirrorPath],
    );

    expect(readFileSync(filePath, "utf-8")).toBe(manifest);
    expect(readFileSync(mirrorPath, "utf-8")).toBe(manifest);
  });
});

function post(slug: string, redirects: string[]): RedirectSourcePost {
  return {
    slug,
    data: { redirects },
  };
}
