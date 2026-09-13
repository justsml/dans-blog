import { createHash } from "node:crypto";
import matter from "gray-matter";

export const SOURCE_HASH_LENGTH = 12;
export const SOURCE_HASH_KEY = "sourceHash";

/**
 * Short hash of an English source post, stamped into each translation's
 * frontmatter so staleness is detectable from the files themselves rather than
 * inferred from git timestamps.
 *
 * Only the body is hashed. Source frontmatter carries publishing metadata that
 * changes without altering a word of prose (`modified` dates, `popularity`
 * tuning, added `redirects`), and re-flagging every translation as stale over
 * those would make the signal useless.
 */
export function hashPostSource(contents: string) {
  const body = matter(contents).content.trim();
  return createHash("sha256").update(body).digest("hex").slice(0, SOURCE_HASH_LENGTH);
}

/** True when the translation records a different source than the one on disk. */
export function isTranslationStale(sourceContents: string, translationContents: string) {
  const recorded = readRecordedSourceHash(translationContents);
  if (recorded == null) return undefined;
  return recorded !== hashPostSource(sourceContents);
}

export function readRecordedSourceHash(translationContents: string) {
  const value = matter(translationContents).data[SOURCE_HASH_KEY];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}
