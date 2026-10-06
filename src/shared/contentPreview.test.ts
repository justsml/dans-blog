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

  test("generates private article routes only for content previews", () => {
    const privatePost = { data: { publish: false, hidden: true, draft: true, unlisted: true } };
    expect(isPostRoutableInBuild(privatePost, true)).toBe(true);
    expect(isPostRoutableInBuild(privatePost, false)).toBe(false);
    expect(privatePost.data.publish).toBe(false);
    expect(isPostRoutableInBuild({ data: { hidden: true } }, false)).toBe(false);
    expect(isPostRoutableInBuild({ data: { publish: false } }, false)).toBe(false);
    expect(isPostRoutableInBuild({ data: {} }, false)).toBe(true);
    // Preserve existing directly routable draft/unlisted behavior.
    expect(isPostRoutableInBuild({ data: { draft: true, unlisted: true } }, false)).toBe(true);
  });
});
