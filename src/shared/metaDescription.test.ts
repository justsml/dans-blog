import { describe, expect, test } from "bun:test";
import { firstProseParagraph, postMetaDescription } from "./metaDescription";

describe("firstProseParagraph", () => {
  test("skips imports, components, fences and headings to reach prose", () => {
    const body = [
      'import Challenge from "../Challenge";',
      "",
      "<Callout>Not this</Callout>",
      "",
      "## Heading",
      "",
      "```js",
      "const notThis = 1;",
      "```",
      "",
      "The **first** [real](https://example.com) paragraph uses `code` and keeps going for a while.",
    ].join("\n");
    expect(firstProseParagraph(body)).toBe("The first real paragraph uses code and keeps going for a while.");
  });

  test("skips stub paragraphs that are too short to stand alone", () => {
    expect(firstProseParagraph("That was right.\n\nThis paragraph is long enough to describe the article well.")).toBe(
      "This paragraph is long enough to describe the article well.",
    );
  });
});

describe("postMetaDescription", () => {
  test("joins a short subtitle and the opening prose", () => {
    expect(postMetaDescription("Route with confidence", "Model routers need their own tests, beyond picking a winner.")).toBe(
      "Route with confidence. Model routers need their own tests, beyond picking a winner.",
    );
  });

  test("keeps an already-long subtitle on its own", () => {
    const long = "x".repeat(130);
    expect(postMetaDescription(long, "Some prose that would otherwise be appended here.")).toBe(long);
  });
});
