import { describe, expect, test } from "bun:test";
import {
  EDITORIAL_CATEGORIES,
  getCanonicalTag,
  getMechanicalTagFix,
  getPreferredCategory,
  getVisibilityWarnings,
  isCategoryListExcluded,
  isEditorialCategory,
  isFeedPostData,
  isKebabCaseTag,
  isListedPostData,
  isRoutablePostData,
  isVisiblePostData,
  normalizePostFlag,
  shouldCountPostCategory,
} from "./editorialRules";

describe("editorial rules", () => {
  test("defines the controlled category tuple used by content config", () => {
    expect(EDITORIAL_CATEGORIES).toContain("AI");
    expect(EDITORIAL_CATEGORIES).toContain("Quiz");
    expect(isEditorialCategory("Security")).toBe(true);
    expect(isEditorialCategory("Projects")).toBe(false);
  });

  test("suggests preferred category names from known aliases", () => {
    expect(getPreferredCategory("how-to")).toBe("HowTo");
    expect(getPreferredCategory("Software Engineering")).toBe("Engineering");
    expect(getPreferredCategory("Security")).toBeUndefined();
  });

  test("centralizes category list exclusions", () => {
    expect(isCategoryListExcluded("Quiz")).toBe(true);
    expect(isCategoryListExcluded("Snippet")).toBe(true);
    expect(isCategoryListExcluded("Code")).toBe(false);
  });

  test("normalizes tag policy for validators and fixers", () => {
    expect(getCanonicalTag("AI SDK")).toBe("ai-sdk");
    expect(getCanonicalTag("ai-sdk")).toBeUndefined();
    expect(getMechanicalTagFix("open source")).toBe("open-source");
    expect(getMechanicalTagFix("Custom Tag")).toBe("custom-tag");
    expect(isKebabCaseTag("custom-tag")).toBe(true);
    expect(isKebabCaseTag("Custom Tag")).toBe(false);
  });

  test("normalizes visibility flags from frontmatter-shaped values", () => {
    expect(normalizePostFlag(true)).toBe(true);
    expect(normalizePostFlag("yes")).toBe(true);
    expect(normalizePostFlag(0)).toBe(false);
    expect(normalizePostFlag("off")).toBe(false);
    expect(normalizePostFlag("sometimes")).toBeUndefined();
  });

  test("keeps routing, visibility, list, and feed inclusion rules explicit", () => {
    expect(isRoutablePostData({ draft: true })).toBe(true);
    expect(isVisiblePostData({ draft: true })).toBe(false);
    expect(isVisiblePostData({ hidden: true })).toBe(false);
    expect(isListedPostData({ unlisted: true })).toBe(false);
    expect(isFeedPostData({ unlisted: true })).toBe(true);
  });

  test("applies category counting and visibility warnings in one place", () => {
    expect(shouldCountPostCategory({ category: "Code" })).toBe(true);
    expect(shouldCountPostCategory({ category: "Quiz" })).toBe(false);
    expect(shouldCountPostCategory({ category: "Code", unlisted: true })).toBe(false);

    expect(getVisibilityWarnings({ publish: true, hidden: true })).toEqual([
      "publish:true is paired with hidden:true",
    ]);
    expect(getVisibilityWarnings({ publish: false })).toEqual([
      "publish:false should usually be paired with draft:true or hidden:true",
    ]);
  });
});
