import { describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  assertTranslationLength,
  normalizeFrontmatterAssetPaths,
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
  test("preserves missing source imports at the top of translated article bodies", () => {
    expect(normalizeLocalizedCandidateBody(
      [
        "import Demo from '../../../components/Demo';",
        "",
        "# Source",
      ].join("\n"),
      [
        "![Alt](./image.webp)",
        "",
        "Translated body.",
      ].join("\n"),
    )).toBe([
      "import Demo from '../../../../components/Demo';",
      "",
      "",
      "![Alt](../image.webp)",
      "",
      "Translated body.",
    ].join("\n"));
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
