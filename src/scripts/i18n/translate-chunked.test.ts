import { describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { normalizeFrontmatterAssetPaths } from "./translate-chunked.ts";
import { assertRunLock, createRunLock, normalizeLocaleImportPaths, releaseRunLock } from "./utils.ts";

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
