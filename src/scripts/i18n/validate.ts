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
const shouldSkipGlobalChecks = options["skip-global"] === true;
const { sourcePath, targetPath } = getPostPaths(slug, locale);

if (!existsSync(targetPath)) {
  throw new Error(`Missing translated file: ${targetPath}`);
}

const source = readFileSync(sourcePath, "utf8");
const target = readFileSync(targetPath, "utf8");

assertFrontmatter(target);
assertProtectedTokens(source, target);
assertNestedAssetPaths(target);

if (shouldSkipGlobalChecks) {
  process.exit(0);
}

runInherited("bun", ["run", "content:check"]);

if (source.includes("<Challenge") || target.includes("<Challenge")) {
  runInherited("bun", ["run", "fix-quizzes"]);
}

runInherited("bun", ["run", "check"]);

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
  const sourceImports = extractImportSignatures(sourceContents);
  const targetImports = extractImportSignatures(targetContents);
  for (const importLine of sourceImports) {
    if (!targetImports.some((targetImport) => importsMatch(importLine, targetImport))) {
      throw new Error(`Missing preserved import in ${targetPath}: ${importLine.raw}`);
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

  const sourcePreCode = sourceContents.match(/<pre><code>/g)?.length ?? 0;
  const targetPreCode = targetContents.match(/<pre><code>/g)?.length ?? 0;
  if (sourcePreCode !== targetPreCode) {
    throw new Error(
      `${targetPath} changed <pre><code> block count from ${sourcePreCode} to ${targetPreCode}`,
    );
  }
}

type ImportSignature = {
  raw: string;
  clause: string;
  moduleSpecifier: string;
  moduleSuffix: string;
};

function extractImportSignatures(contents: string): ImportSignature[] {
  return (contents.match(/^import\s.+$/gm) ?? [])
    .map((raw) => parseImportSignature(raw))
    .filter((signature): signature is ImportSignature => signature != null);
}

function parseImportSignature(raw: string): ImportSignature | undefined {
  const normalized = raw.trim().replace(/;$/, "").replace(/\s+/g, " ");
  const sideEffectMatch = normalized.match(/^import\s+['"]([^'"]+)['"]$/);
  if (sideEffectMatch != null) {
    const moduleSpecifier = sideEffectMatch[1];
    return {
      raw,
      clause: "",
      moduleSpecifier,
      moduleSuffix: stripRelativePrefix(moduleSpecifier),
    };
  }

  const match = normalized.match(/^import\s+(.+?)\s+from\s+['"]([^'"]+)['"]$/);
  if (match == null) return undefined;

  const moduleSpecifier = match[2];
  return {
    raw,
    clause: match[1].trim(),
    moduleSpecifier,
    moduleSuffix: stripRelativePrefix(moduleSpecifier),
  };
}

function importsMatch(sourceImport: ImportSignature, targetImport: ImportSignature) {
  if (sourceImport.raw === targetImport.raw) return true;
  if (sourceImport.clause !== targetImport.clause) return false;
  if (sourceImport.moduleSpecifier === targetImport.moduleSpecifier) return true;

  return sourceImport.moduleSuffix !== ""
    && sourceImport.moduleSuffix === targetImport.moduleSuffix;
}

function stripRelativePrefix(moduleSpecifier: string) {
  return moduleSpecifier.replace(/^(\.\.\/)+/, "");
}

function assertNestedAssetPaths(targetContents: string) {
  const nestedAssetReferences = [
    ...targetContents.matchAll(/]\(\.\/(?!\.)[^)]+\)/g),
    ...targetContents.matchAll(/src=["']\.\/(?!\.)[^"']+["']/g),
    ...targetContents.matchAll(/:\s*\.\/(?!\.)\S+\.(?:avif|gif|jpe?g|png|svg|webp)\b/g),
    ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
  ];

  if (nestedAssetReferences.length === 0) return;

  throw new Error(
    `${targetPath} uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.`,
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
