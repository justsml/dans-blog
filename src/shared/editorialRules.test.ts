import { describe, expect, test } from "bun:test";
import {
  getCanonicalTag,
  getMechanicalTagFix,
  getPreferredCategory,
  getVisibilityWarnings,
  isCategoryListExcluded,
  isEditorialCategory,
  isDraftPostData,
  isKebabCaseTag,
  isPublishedPostData,
  normalizePostFlag,
  shouldCountPostCategory,
} from "./editorialRules";

describe("editorial rules", () => {
  test("accepts controlled categories and rejects unknown ones", () => {
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

  test("uses draft as the only visibility flag", () => {
    expect(isDraftPostData({ draft: true })).toBe(true);
    expect(isDraftPostData({ draft: "yes" })).toBe(true);
    expect(isDraftPostData({})).toBe(false);
    expect(isPublishedPostData({ draft: false })).toBe(true);
    expect(isPublishedPostData({ draft: true })).toBe(false);
  });

  test("applies category counting and visibility warnings in one place", () => {
    expect(shouldCountPostCategory({ category: "Code" })).toBe(true);
    expect(shouldCountPostCategory({ category: "Quiz" })).toBe(false);
    expect(shouldCountPostCategory({ category: "Code", draft: true })).toBe(false);

    expect(getVisibilityWarnings({ draft: true })).toEqual([]);
    expect(getVisibilityWarnings({ publish: false, hidden: true, unlisted: false })).toEqual([
      "publish is no longer supported; use draft:true to keep a post unpublished",
      "hidden is no longer supported; use draft:true to keep a post unpublished",
      "unlisted is no longer supported; use draft:true to keep a post unpublished",
    ]);
  });
});
