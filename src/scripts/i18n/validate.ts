import { existsSync, readFileSync } from "node:fs";
import {
  getPostPaths,
  requireActiveLocale,
  parseArgs,
  requireString,
  runInherited,
} from "./utils.ts";

const options = parseArgs();
const slug = requireString(options, "slug");
const locale = requireActiveLocale(options);
const { sourcePath, targetPath } = getPostPaths(slug, locale);

if (!existsSync(targetPath)) {
  throw new Error(`Missing translated file: ${targetPath}`);
}

const source = readFileSync(sourcePath, "utf8");
const target = readFileSync(targetPath, "utf8");

assertFrontmatter(target);
assertProtectedTokens(source, target);
assertNestedAssetPaths(target);

runInherited("bun", ["run", "content:check"]);

if (source.includes("<Challenge") || target.includes("<Challenge")) {
  runInherited("bun", ["run", "fix-quizzes"]);
}

function assertFrontmatter(contents: string) {
  if (!contents.startsWith("---")) {
    throw new Error(`${targetPath} must start with frontmatter`);
  }

  const frontmatterEnd = contents.indexOf("\n---", 3);
  if (frontmatterEnd === -1) {
    throw new Error(`${targetPath} has unterminated frontmatter`);
  }

  const frontmatter = contents.slice(3, frontmatterEnd);
  if (!/^title:\s+/m.test(frontmatter)) {
    throw new Error(`${targetPath} must include localized title frontmatter`);
  }
}

function assertProtectedTokens(sourceContents: string, targetContents: string) {
  const sourceImports = sourceContents.match(/^import\s.+$/gm) ?? [];
  for (const importLine of sourceImports) {
    if (!targetContents.includes(importLine)) {
      throw new Error(`Missing preserved import in ${targetPath}: ${importLine}`);
    }
  }

  const sourceComponents = new Set(
    [...sourceContents.matchAll(/<\/?([A-Z][A-Za-z0-9_.]*)\b/g)].map((match) => match[1]),
  );
  for (const component of sourceComponents) {
    if (!new RegExp(`</?${escapeRegExp(component)}\\b`).test(targetContents)) {
      throw new Error(`Missing preserved MDX component in ${targetPath}: ${component}`);
    }
  }

  const sourceFences = sourceContents.match(/```/g)?.length ?? 0;
  const targetFences = targetContents.match(/```/g)?.length ?? 0;
  if (sourceFences !== targetFences) {
    throw new Error(
      `${targetPath} changed fenced code block count from ${sourceFences} to ${targetFences}`,
    );
  }
}

function assertNestedAssetPaths(targetContents: string) {
  const nestedAssetReferences = [
    ...targetContents.matchAll(/]\(\.\/(?!\.)[^)]+\)/g),
    ...targetContents.matchAll(/src=["']\.\/(?!\.)[^"']+["']/g),
  ];

  if (nestedAssetReferences.length === 0) return;

  throw new Error(
    `${targetPath} uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.`,
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
