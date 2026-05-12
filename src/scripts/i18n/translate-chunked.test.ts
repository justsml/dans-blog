import { describe, expect, test } from "bun:test";
import { normalizeFrontmatterAssetPaths } from "./translate-chunked.ts";

describe("normalizeFrontmatterAssetPaths", () => {
  test("uses parent-relative inherited image paths for locale frontmatter", () => {
    expect(normalizeFrontmatterAssetPaths({
      title: "Keep me",
      social_image: "./desktop-social.webp",
      cover_full_width: "./wide.webp",
      cover_mobile: "./square.webp",
      cover_icon: "./square.webp",
      thumbnail: "thumb.png",
      hero: "../hero.webp",
      og_image: "/absolute.webp",
      remote_image: "https://example.com/image.webp",
      document: "./not-an-image.txt",
    })).toEqual({
      title: "Keep me",
      social_image: "../desktop-social.webp",
      cover_full_width: "../wide.webp",
      cover_mobile: "../square.webp",
      cover_icon: "../square.webp",
      thumbnail: "../thumb.png",
      hero: "../hero.webp",
      og_image: "/absolute.webp",
      remote_image: "https://example.com/image.webp",
      document: "./not-an-image.txt",
    });
  });
});
