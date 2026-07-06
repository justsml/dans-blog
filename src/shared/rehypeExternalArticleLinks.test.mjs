import { describe, expect, test } from "bun:test";
import {
  isExternalHref,
  mergeRelValues,
  rehypeExternalArticleLinks,
} from "./rehypeExternalArticleLinks.mjs";

describe("rehypeExternalArticleLinks", () => {
  test("adds target and safe rel values to external http links", () => {
    const tree = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "p",
          properties: {},
          children: [
            {
              type: "element",
              tagName: "a",
              properties: { href: "https://example.com/article", rel: "nofollow" },
              children: [],
            },
          ],
        },
      ],
    };

    rehypeExternalArticleLinks({ site: "https://danlevy.net" })(tree);

    const link = tree.children[0].children[0];
    expect(link.properties.target).toBe("_blank");
    expect(link.properties.rel).toBe("nofollow noopener noreferrer");
  });

  test("leaves internal, relative, hash, and non-http links alone", () => {
    const hrefs = [
      "https://danlevy.net/about/",
      "/about/",
      "./nearby",
      "../parent",
      "#section",
      "mailto:hello@example.com",
    ];
    const tree = {
      type: "root",
      children: hrefs.map((href) => ({
        type: "element",
        tagName: "a",
        properties: { href },
        children: [],
      })),
    };

    rehypeExternalArticleLinks({ site: "https://danlevy.net" })(tree);

    for (const link of tree.children) {
      expect(link.properties.target).toBeUndefined();
      expect(link.properties.rel).toBeUndefined();
    }
  });

  test("detects explicit external network links only", () => {
    expect(isExternalHref("https://example.com", "https://danlevy.net")).toBe(true);
    expect(isExternalHref("//example.com", "https://danlevy.net")).toBe(true);
    expect(isExternalHref("https://danlevy.net/posts", "https://danlevy.net")).toBe(
      false,
    );
    expect(isExternalHref("/posts", "https://danlevy.net")).toBe(false);
    expect(isExternalHref("posts", "https://danlevy.net")).toBe(false);
  });

  test("merges rel values without duplicates", () => {
    expect(mergeRelValues(["Me", "noopener"], "noopener noreferrer")).toBe(
      "me noopener noreferrer",
    );
  });
});
