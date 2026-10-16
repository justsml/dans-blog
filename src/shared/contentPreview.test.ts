import { describe, expect, test } from "bun:test";
import { isContentPreviewBuild, isPostRoutableInBuild } from "./contentPreview";

describe("content preview build policy", () => {
  test("enables Netlify PR previews and explicit local previews only", () => {
    expect(isContentPreviewBuild({ CONTEXT: "deploy-preview" })).toBe(true);
    expect(isContentPreviewBuild({ BLOG_CONTENT_PREVIEW: "1" })).toBe(true);
    expect(isContentPreviewBuild({ CONTEXT: "production", BLOG_CONTENT_PREVIEW: "1" })).toBe(false);
    expect(isContentPreviewBuild({ CONTEXT: "branch-deploy" })).toBe(false);
    expect(isContentPreviewBuild({})).toBe(false);
  });

  test("generates draft article routes only for content previews", () => {
    expect(isPostRoutableInBuild({ data: { draft: true } }, true)).toBe(true);
    expect(isPostRoutableInBuild({ data: { draft: true } }, false)).toBe(false);
    expect(isPostRoutableInBuild({ data: {} }, false)).toBe(true);
  });
});
