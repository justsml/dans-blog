import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { ACTIVE_LOCALES, type ActiveLocale } from "../../shared/i18n.ts";
import {
  collectSourcePosts,
  filterActiveLocales,
  getTranslationSlot,
} from "./corpus-inventory.ts";
import {
  analyzeHeadingAnchorLinks,
  type HeadingAnchorLinkFailure,
} from "./heading-link-validation.ts";
import {
  optionalString,
  parseArgs,
  parseList,
  relativeToRepo,
} from "./utils.ts";

type RepairResult = {
  changed: boolean;
  failedAfter: number;
  failedBefore: number;
  path: string;
  replacements: number;
  skipped: string[];
};

const options = parseArgs();
const locales = filterActiveLocales(
  parseList(optionalString(options, "locales") ?? optionalString(options, "locale"), [...ACTIVE_LOCALES]),
);
const selectedSlugs = new Set(parseList(optionalString(options, "slugs") ?? optionalString(options, "slug"), []));
const batchSize = parseBatchSize(optionalString(options, "batch-size"));
const shouldDryRun = options["dry-run"] === true;

let totalChanged = 0;
let totalReplacements = 0;
const skipped: Array<{ path: string; messages: string[] }> = [];

for (const locale of locales) {
  const tasks = collectLocaleTasks(locale);
  console.log(`${locale}: ${tasks.length} file(s) with heading anchor failures`);

  for (let index = 0; index < tasks.length; index += batchSize) {
    const batch = tasks.slice(index, index + batchSize);
    const batchNumber = Math.floor(index / batchSize) + 1;
    console.log(`${locale}: batch ${batchNumber} (${batch.length} file(s))`);

    for (const task of batch) {
      const result = repairFile(task.sourcePath, task.targetPath);
      if (result.changed) totalChanged += 1;
      totalReplacements += result.replacements;
      if (result.skipped.length > 0 || result.failedAfter > 0) {
        skipped.push({ path: result.path, messages: result.skipped });
      }
      console.log(
        [
          `  ${relativeToRepo(task.targetPath)}`,
          `${result.failedBefore}->${result.failedAfter}`,
          `${result.replacements} replacement(s)`,
          result.changed ? (shouldDryRun ? "would change" : "changed") : "unchanged",
        ].join(" | "),
      );
    }
  }
}

console.log(
  [
    `Done. ${shouldDryRun ? "Would change" : "Changed"} ${totalChanged} file(s).`,
    `Replacements: ${totalReplacements}.`,
    `Unresolved files: ${skipped.length}.`,
  ].join(" "),
);

if (skipped.length > 0) {
  for (const item of skipped) {
    console.error(`Unresolved: ${relativeToRepo(item.path)}`);
    for (const message of item.messages) {
      console.error(`  - ${message}`);
    }
  }
  process.exitCode = 1;
}

function collectLocaleTasks(locale: ActiveLocale) {
  return collectSourcePosts()
    .filter((post) => selectedSlugs.size === 0 || selectedSlugs.has(post.slug) || selectedSlugs.has(post.directory))
    .flatMap((post) => {
      const slot = getTranslationSlot(post, locale);
      const targetPath = existingTranslationPath(slot.targetPath, slot.fallbackTargetPath);
      if (targetPath == null) return [];
      const sourceContents = readFileSync(slot.sourcePath, "utf8");
      const targetContents = readFileSync(targetPath, "utf8");
      const report = analyzeHeadingAnchorLinks({ sourceContents, targetContents });
      return report.failedLinks === 0
        ? []
        : [{ sourcePath: slot.sourcePath, targetPath }];
    });
}

function repairFile(sourcePath: string, targetPath: string): RepairResult {
  const sourceContents = readFileSync(sourcePath, "utf8");
  const originalTargetContents = readFileSync(targetPath, "utf8");
  let targetContents = originalTargetContents;
  let replacements = 0;
  const skipped: string[] = [];
  const before = analyzeHeadingAnchorLinks({ sourceContents, targetContents });

  for (let pass = 0; pass < 5; pass += 1) {
    const report = analyzeHeadingAnchorLinks({ sourceContents, targetContents });
    if (report.failedLinks === 0) break;

    const lines = splitLinesPreservingEol(targetContents);
    const lineBodies = lines.map((line) => line.body);
    let passReplacements = 0;
    for (const failure of report.failures) {
      const replacement = replacementForFailure(lineBodies, failure);
      if (replacement == null) {
        skipped.push(formatSkippedFailure(failure));
        continue;
      }
      lines[replacement.lineIndex].body = replacement.line;
      lineBodies[replacement.lineIndex] = replacement.line;
      passReplacements += 1;
    }

    if (passReplacements === 0) break;
    replacements += passReplacements;
    targetContents = joinLines(lines);
  }

  const after = analyzeHeadingAnchorLinks({ sourceContents, targetContents });
  const changed = targetContents !== originalTargetContents;
  if (changed && !shouldDryRun) {
    writeFileSync(targetPath, targetContents, "utf8");
  }

  return {
    changed,
    failedAfter: after.failedLinks,
    failedBefore: before.failedLinks,
    path: targetPath,
    replacements,
    skipped,
  };
}

function splitLinesPreservingEol(contents: string) {
  const lines: Array<{ body: string; eol: string }> = [];
  const linePattern = /([^\r\n]*)(\r\n|\n|\r|$)/g;
  let match: RegExpExecArray | null;
  while ((match = linePattern.exec(contents)) != null) {
    if (match[0] === "") break;
    lines.push({ body: match[1] ?? "", eol: match[2] ?? "" });
    if (match[2] === "") break;
  }
  return lines;
}

function joinLines(lines: Array<{ body: string; eol: string }>) {
  return lines.map((line) => `${line.body}${line.eol}`).join("");
}

function replacementForFailure(
  lines: string[],
  failure: HeadingAnchorLinkFailure,
): { line: string; lineIndex: number } | undefined {
  if (failure.expectedFragment.trim() === "" || failure.targetFragment.trim() === "") return undefined;
  const replacement = `#${failure.expectedFragment}`;
  const lineIndexes = candidateLineIndexes(lines, failure.lineNumber - 1);
  for (const lineIndex of lineIndexes) {
    const line = lines[lineIndex];
    if (line == null) continue;
    for (const rawFragment of rawFragmentCandidates(failure.targetFragment)) {
      const target = `#${rawFragment}`;
      if (!line.includes(target)) continue;
      return {
        line: line.replace(target, replacement),
        lineIndex,
      };
    }
  }

  return undefined;
}

function candidateLineIndexes(lines: string[], hintedIndex: number) {
  const indexes = new Set<number>();
  if (hintedIndex >= 0 && hintedIndex < lines.length) indexes.add(hintedIndex);
  for (let index = 0; index < lines.length; index += 1) indexes.add(index);
  return [...indexes];
}

function rawFragmentCandidates(fragment: string) {
  return [...new Set([
    fragment,
    encodeURI(fragment),
    encodeURIComponent(fragment),
  ])].filter((value) => value.trim() !== "");
}

function formatSkippedFailure(failure: HeadingAnchorLinkFailure) {
  return [
    `line ${failure.lineNumber}`,
    `#${failure.targetFragment || "(missing)"}`,
    "->",
    `#${failure.expectedFragment || "(missing expected)"}`,
    failure.kind,
  ].join(" ");
}

function existingTranslationPath(targetPath: string, fallbackTargetPath: string) {
  if (existsSync(targetPath)) return targetPath;
  if (existsSync(fallbackTargetPath)) return fallbackTargetPath;
  return undefined;
}

function parseBatchSize(value: string | undefined) {
  const parsed = Number(value ?? "5");
  if (!Number.isInteger(parsed) || parsed < 3 || parsed > 5) {
    throw new Error("--batch-size must be an integer from 3 to 5.");
  }
  return parsed;
}
