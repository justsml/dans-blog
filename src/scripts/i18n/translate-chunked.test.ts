import { describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  assertNestedAssetPaths,
  assertTranslationLength,
  getComparablePostLength,
  normalizeFrontmatterAssetPaths,
  normalizeLocalizedAssetReferences,
  normalizeLocaleImportPaths,
  normalizeLocalizedCandidateBody,
  normalizeLocalizedCandidateFile,
} from "./localized-mdx.ts";
import { assertRunLock, createRunLock, releaseRunLock } from "./utils.ts";

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

describe("normalizeLocaleImportPaths", () => {
  test("uses exactly four parent segments for locale imports into src roots", () => {
    expect(normalizeLocaleImportPaths([
      "import Challenge from '../../../components/QuizUI/Challenge';",
      "import QuizUI from '../../../../../components/QuizUI/QuizUI';",
      'import { Timeline } from "../../../../../../components/ui/timeline";',
      'import "../../../../../components/QuizUI/index.css";',
    ].join("\n"))).toBe([
      "import Challenge from '../../../../components/QuizUI/Challenge';",
      "import QuizUI from '../../../../components/QuizUI/QuizUI';",
      'import { Timeline } from "../../../../components/ui/timeline";',
      'import "../../../../components/QuizUI/index.css";',
    ].join("\n"));
  });
});

describe("normalizeLocalizedCandidateBody", () => {
  test("preserves missing source imports at the top and normalizes locale asset paths", () => {
    expect(normalizeLocalizedCandidateBody(
      [
        "import Demo from '../../../components/Demo';",
        "",
        "# Source",
      ].join("\n"),
      [
        "![Alt](./image.webp)",
        "<img src='./inline.webp' />",
        "",
        "Translated body.",
      ].join("\n"),
    )).toBe([
      "import Demo from '../../../../components/Demo';",
      "",
      "",
      "![Alt](../image.webp)",
      "<img src='../inline.webp' />",
      "",
      "Translated body.",
    ].join("\n"));
  });
});

describe("normalizeLocalizedAssetReferences", () => {
  test("uses parent-relative asset paths for locale markdown, attributes, and frontmatter", () => {
    expect(normalizeLocalizedAssetReferences([
      "cover_full_width: ./wide.webp",
      "![Alt](./diagram.svg)",
      '<img src="./double.webp" />',
      "<img src='./single.webp' />",
      '<Custom image="./component.png" />',
      "[External](https://example.com/image.webp)",
      "already: ../done.webp",
    ].join("\n"))).toBe([
      "cover_full_width: ../wide.webp",
      "![Alt](../diagram.svg)",
      '<img src="../double.webp" />',
      "<img src='../single.webp' />",
      '<Custom image="../component.png" />',
      "[External](https://example.com/image.webp)",
      "already: ../done.webp",
    ].join("\n"));
  });
});

describe("assertNestedAssetPaths", () => {
  test("rejects bare inherited assets inside locale folders", () => {
    expect(() => assertNestedAssetPaths([
      "cover_full_width: hero.webp",
      "![Alt](diagram.webp)",
      '<img src="inline.webp" />',
    ].join("\n"), "src/content/posts/example/zh/index.mdx")).toThrow(/Use \.\.\//);
  });

  test("allows parent-relative inherited assets inside locale folders", () => {
    expect(() => assertNestedAssetPaths([
      "cover_full_width: ../hero.webp",
      "![Alt](../diagram.webp)",
      '<img src="../inline.webp" />',
    ].join("\n"), "src/content/posts/example/zh/index.mdx")).not.toThrow();
  });
});

describe("normalizeLocalizedCandidateFile", () => {
  test("preserves source imports after frontmatter and normalizes locale asset paths", () => {
    expect(normalizeLocalizedCandidateFile(
      [
        "import Demo from '../../../components/Demo';",
        'import "../../../../components/AlreadyOk";',
        "",
        "# Source",
      ].join("\n"),
      [
        "---",
        "title: Traducido",
        "cover: ./cover.webp",
        "---",
        "",
        "![Alt](./image.webp)",
        "<img src='./inline.webp' />",
      ].join("\n"),
    )).toBe([
      "---",
      "title: Traducido",
      "cover: ../cover.webp",
      "---",
      "import Demo from '../../../../components/Demo';",
      'import "../../../../components/AlreadyOk";',
      "",
      "![Alt](../image.webp)",
      "<img src='../inline.webp' />",
    ].join("\n"));
  });
});

describe("assertTranslationLength", () => {
  test("compares body length without frontmatter or imports", () => {
    const body = "a".repeat(700);

    expect(() => assertTranslationLength({
      sourceContents: ["---", "title: Source", "---", "import Demo from './Demo';", body].join("\n"),
      targetContents: ["---", "title: Target", "---", "import Demo from '../Demo';", body].join("\n"),
      targetPath: "target.mdx",
    })).not.toThrow();
  });

  test("allows denser Chinese translations without padding", () => {
    const sourceBody = "a".repeat(2000);
    const targetBody = "字".repeat(800);

    expect(() => assertTranslationLength({
      sourceContents: ["---", "title: Source", "---", sourceBody].join("\n"),
      targetContents: ["---", "title: Target", "---", targetBody].join("\n"),
      targetPath: "src/content/posts/example/zh/index.mdx",
    })).not.toThrow();
  });

  test("allows very dense Chinese translations through the validator", () => {
    const sourceBody = "a".repeat(5600);
    const targetBody = "字".repeat(1400);

    expect(() => assertTranslationLength({
      sourceContents: ["---", "title: Source", "---", sourceBody].join("\n"),
      targetContents: ["---", "title: Target", "---", targetBody].join("\n"),
      targetPath: "src/content/posts/example/zh/index.mdx",
    })).not.toThrow();
  });

  test("uses prose length instead of letting code blocks dominate the ratio", () => {
    const prose = "a".repeat(700);
    const hugeCodeBlock = ["```ts", "const value = 1;".repeat(500), "```"].join("\n");

    expect(getComparablePostLength([
      "---",
      "title: Source",
      "---",
      "import Demo from './Demo';",
      prose,
      hugeCodeBlock,
      "{/* translator note */}",
    ].join("\n"))).toBe(700);
  });

  test("allows natural expansion for German prose", () => {
    expect(() => assertTranslationLength({
      sourceContents: ["---", "title: Source", "---", "a".repeat(1000)].join("\n"),
      targetContents: ["---", "title: Target", "---", "b".repeat(1600)].join("\n"),
      targetPath: "src/content/posts/example/de/index.mdx",
    })).not.toThrow();
  });

  test("allows compact Arabic prose without requiring padding", () => {
    expect(() => assertTranslationLength({
      sourceContents: ["---", "title: Source", "---", "a".repeat(2000)].join("\n"),
      targetContents: ["---", "title: Target", "---", "ب".repeat(1050)].join("\n"),
      targetPath: "src/content/posts/example/ar/index.mdx",
    })).not.toThrow();
  });

  test("still rejects overly padded Chinese prose", () => {
    expect(() => assertTranslationLength({
      sourceContents: ["---", "title: Source", "---", "a".repeat(2000)].join("\n"),
      targetContents: ["---", "title: Target", "---", "字".repeat(2600)].join("\n"),
      targetPath: "src/content/posts/example/zh/index.mdx",
    })).toThrow(/20%-125%/);
  });

  test("allows tiny legacy posts when they satisfy the locale ratio", () => {
    expect(() => assertTranslationLength({
      sourceContents: ["---", "title: Source", "---", "a".repeat(450)].join("\n"),
      targetContents: ["---", "title: Target", "---", "b".repeat(500)].join("\n"),
      targetPath: "src/content/posts/example/de/index.mdx",
    })).not.toThrow();
  });
});

describe("i18n run lock", () => {
  test("rejects stale workers whose run id no longer owns the lock", () => {
    const directory = mkdtempSync(join(tmpdir(), "i18n-run-lock-"));
    const lockPath = join(directory, "run.json");

    try {
      createRunLock(lockPath, "run-a", "test");
      expect(() => assertRunLock(lockPath, "run-a")).not.toThrow();
      expect(() => assertRunLock(lockPath, "run-b")).toThrow(/Stale i18n translation worker/);
      releaseRunLock(lockPath, "run-a");
      expect(() => assertRunLock(lockPath, "run-a")).toThrow(/Current run id: missing/);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
