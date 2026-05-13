import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  getPostPaths,
  requireActiveLocale,
  parseArgs,
  requireString,
  runInherited,
} from "./utils.ts";
import { assertTranslationLength } from "./structural-validation.ts";

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
assertTranslationLength({ sourceContents: source, targetContents: target, targetPath });
assertHeadingCounts(source, target);
assertProtectedTokens(source, target);
assertNestedAssetPaths(target);

if (shouldSkipGlobalChecks) {
  process.exit(0);
}

const releaseGlobalCheckLock = acquireGlobalCheckLock();
try {
  runInherited("bun", ["run", "content:check"]);

  if (source.includes("<Challenge") || target.includes("<Challenge")) {
    runInherited("bun", ["run", "fix-quizzes"]);
  }

  runInherited("bun", ["run", "check"]);
} finally {
  releaseGlobalCheckLock();
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

function assertHeadingCounts(sourceContents: string, targetContents: string) {
  const sourceHeadings = countHeadings(sourceContents);
  const targetHeadings = countHeadings(targetContents);
  const mismatches = sourceHeadings
    .map((sourceCount, index) => {
      const level = index + 1;
      const targetCount = targetHeadings[index];
      return sourceCount === targetCount
        ? undefined
        : `H${level}: English has ${sourceCount}, translation has ${targetCount}`;
    })
    .filter((message): message is string => message != null);

  if (mismatches.length === 0) return;

  throw new Error(
    `${targetPath} changed heading counts. ${mismatches.join("; ")}`,
  );
}

function countHeadings(contents: string) {
  const counts = [0, 0, 0, 0, 0, 0];
  let inFence = false;

  for (const line of stripFrontmatter(contents).split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const markdownHeading = line.match(/^\s{0,3}(#{1,6})(?:\s|$)/);
    if (markdownHeading != null) {
      counts[markdownHeading[1].length - 1] += 1;
      continue;
    }

    for (const htmlHeading of line.matchAll(/<h([1-6])\b/gi)) {
      counts[Number(htmlHeading[1]) - 1] += 1;
    }
  }

  return counts;
}

function stripFrontmatter(contents: string) {
  if (!contents.startsWith("---")) return contents;
  const frontmatterEnd = contents.indexOf("\n---", 3);
  if (frontmatterEnd === -1) return contents;
  return contents.slice(frontmatterEnd + 4);
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

function acquireGlobalCheckLock() {
  const lockDir = join(process.cwd(), ".git/codex-i18n-global-check.lock");
  const ownerPath = join(lockDir, "owner.json");
  const staleCleanupAfterMs = 10 * 60 * 1000;
  const logEveryMs = 30 * 1000;
  const startedWaitingAt = Date.now();
  let lastLogAt = 0;
  let cleanedStaleLock = false;

  while (true) {
    try {
      mkdirSync(lockDir);
      writeFileSync(ownerPath, JSON.stringify({
        pid: process.pid,
        slug,
        locale,
        startedAt: new Date().toISOString(),
      }, null, 2), "utf8");
      return () => rmSync(lockDir, { recursive: true, force: true });
    } catch (error) {
      if (!existsSync(lockDir)) throw error;

      const now = Date.now();
      if (now - lastLogAt >= logEveryMs) {
        const owner = readCheckLockOwner(ownerPath);
        const ownerLabel = owner == null
          ? "unknown owner"
          : `pid ${owner.pid ?? "unknown"} (${owner.slug ?? "unknown slug"} ${owner.locale ?? "unknown locale"})`;
        console.error(`Waiting for i18n global check lock held by ${ownerLabel}.`);
        lastLogAt = now;
      }

      if (!cleanedStaleLock && now - startedWaitingAt >= staleCleanupAfterMs) {
        const owner = readCheckLockOwner(ownerPath);
        if (owner == null || !isProcessAlive(owner.pid)) {
          console.error("Cleaning stale i18n global check lock after waiting more than 10 minutes.");
          rmSync(lockDir, { recursive: true, force: true });
          cleanedStaleLock = true;
          continue;
        }
      }

      sleep(1000);
    }
  }
}

function readCheckLockOwner(ownerPath: string): Record<string, unknown> | undefined {
  try {
    return JSON.parse(readFileSync(ownerPath, "utf8")) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

function isProcessAlive(pid: unknown) {
  if (typeof pid !== "number" || !Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function sleep(milliseconds: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}
