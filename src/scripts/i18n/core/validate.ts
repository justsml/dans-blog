import {
  assertTranslationLength,
  compareMdxStructure,
  type MdxStructureComparison,
} from "../structural-validation.ts";
import { assertNestedAssetPaths } from "../localized-mdx.ts";
import { analyzeTranslationIntegrity } from "../integrity-checks.ts";
import type { ActiveLocale } from "../../../shared/i18n.ts";
import matter from "gray-matter";

export type TranslationValidationSeverity = "high" | "medium" | "low";

export type TranslationValidationIssue = {
  code: string;
  severity: TranslationValidationSeverity;
  message: string;
};

export type ValidateTranslationInput = {
  sourceContents: string;
  targetContents: string;
  targetPath: string;
  locale: ActiveLocale;
};

export type ValidateTranslationOutput = {
  passed: boolean;
  issues: TranslationValidationIssue[];
  structure: MdxStructureComparison;
};

export function validateTranslation(input: ValidateTranslationInput): ValidateTranslationOutput {
  const issues: TranslationValidationIssue[] = [];
  const structure = compareMdxStructure({
    sourceContents: input.sourceContents,
    targetContents: input.targetContents,
    targetPath: input.targetPath,
  });

  collectIssue(issues, "frontmatter", "high", () => assertFrontmatter(
    input.sourceContents,
    input.targetContents,
    input.targetPath,
  ));
  collectIssue(issues, "length-ratio", "medium", () => assertTranslationLength({
    sourceContents: input.sourceContents,
    targetContents: input.targetContents,
    targetPath: input.targetPath,
  }));
  collectIssue(issues, "heading-counts", "high", () => assertHeadingCounts(
    input.sourceContents,
    input.targetContents,
    input.targetPath,
  ));
  collectIssue(issues, "structural-parity", "high", () => {
    if (structure.valid) return;
    throw new Error(
      `${input.targetPath} failed structural parity with score ${structure.score.toFixed(3)} `
        + `(minimum ${structure.minimumScore.toFixed(3)}). ${structure.summary}`,
    );
  });
  collectIssue(issues, "protected-tokens", "high", () => assertProtectedTokens(
    input.sourceContents,
    input.targetContents,
    input.targetPath,
  ));
  collectIssue(issues, "quiz-structure", "high", () => assertQuizStructure(
    input.sourceContents,
    input.targetContents,
    input.targetPath,
  ));
  collectIssue(issues, "nested-assets", "high", () => assertNestedAssetPaths(
    input.targetContents,
    input.targetPath,
  ));

  issues.push(...analyzeTranslationIntegrity(input));

  return {
    passed: !issues.some((issue) => issue.severity === "high" || issue.severity === "medium"),
    issues,
    structure,
  };
}

export function assertValidTranslation(input: ValidateTranslationInput) {
  const result = validateTranslation(input);
  if (result.passed) return;
  throw new Error(
    [
      `${input.targetPath} failed translation validation:`,
      ...result.issues.map((issue) => `- [${issue.severity}] ${issue.code}: ${issue.message}`),
    ].join("\n"),
  );
}

function collectIssue(
  issues: TranslationValidationIssue[],
  code: string,
  severity: TranslationValidationSeverity,
  fn: () => void,
) {
  try {
    fn();
  } catch (error) {
    issues.push({
      code,
      severity,
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

function assertFrontmatter(sourceContents: string, targetContents: string, targetPath: string) {
  if (!targetContents.startsWith("---")) {
    throw new Error(`${targetPath} must start with frontmatter`);
  }

  const frontmatterEnd = targetContents.indexOf("\n---", 3);
  if (frontmatterEnd === -1) {
    throw new Error(`${targetPath} has unterminated frontmatter`);
  }

  const frontmatter = targetContents.slice(3, frontmatterEnd);
  if (!/^title:\s+/m.test(frontmatter)) {
    throw new Error(`${targetPath} must include localized title frontmatter`);
  }

  const sourceFrontmatter = matter(sourceContents).data;
  const targetFrontmatter = matter(targetContents).data;
  assertTranslatedFrontmatterValue("title", sourceFrontmatter.title, targetFrontmatter.title, targetPath);
  if (sourceFrontmatter.subTitle != null) {
    assertTranslatedFrontmatterValue("subTitle", sourceFrontmatter.subTitle, targetFrontmatter.subTitle, targetPath);
  }
}

function assertTranslatedFrontmatterValue(
  key: "title" | "subTitle",
  sourceValue: unknown,
  targetValue: unknown,
  targetPath: string,
) {
  const sourceText = frontmatterString(sourceValue);
  const targetText = frontmatterString(targetValue);
  if (targetText == null || targetText === "") {
    throw new Error(`${targetPath} must include localized ${key} frontmatter`);
  }
  if (sourceText != null && normalizeFrontmatterText(sourceText) === normalizeFrontmatterText(targetText)) {
    throw new Error(`${targetPath} must translate frontmatter ${key}; it still matches the English source`);
  }
}

function frontmatterString(value: unknown) {
  if (typeof value === "string") return value;
  if (value == null) return undefined;
  return String(value);
}

function normalizeFrontmatterText(value: string) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

function assertProtectedTokens(sourceContents: string, targetContents: string, targetPath: string) {
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
    throw new Error(`${targetPath} changed fenced code block count from ${sourceFences} to ${targetFences}`);
  }

  const sourcePreCode = sourceContents.match(/<pre><code>/g)?.length ?? 0;
  const targetPreCode = targetContents.match(/<pre><code>/g)?.length ?? 0;
  if (sourcePreCode !== targetPreCode) {
    throw new Error(`${targetPath} changed <pre><code> block count from ${sourcePreCode} to ${targetPreCode}`);
  }
}

function assertHeadingCounts(sourceContents: string, targetContents: string, targetPath: string) {
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

  if (mismatches.length > 0) {
    throw new Error(`${targetPath} changed heading counts. ${mismatches.join("; ")}`);
  }
}

function assertQuizStructure(sourceContents: string, targetContents: string, targetPath: string) {
  if (!sourceContents.includes("<Challenge")) return;

  const sourceChallenges = extractChallengeBlocks(sourceContents, targetPath);
  const targetChallenges = extractChallengeBlocks(targetContents, targetPath);
  if (sourceChallenges.length !== targetChallenges.length) {
    throw new Error(`${targetPath} changed Challenge count from ${sourceChallenges.length} to ${targetChallenges.length}`);
  }

  const targetByIndex = new Map(targetChallenges.map((challenge) => [challenge.index, challenge]));
  for (const sourceChallenge of sourceChallenges) {
    const targetChallenge = targetByIndex.get(sourceChallenge.index);
    if (targetChallenge == null) {
      throw new Error(`${targetPath} is missing Challenge index ${sourceChallenge.index}`);
    }

    for (const prop of ["difficulty", "objectives"] as const) {
      if (sourceChallenge.opening.includes(`${prop}=`) && !targetChallenge.opening.includes(`${prop}=`)) {
        throw new Error(`${targetPath} Challenge ${sourceChallenge.index} is missing preserved ${prop} prop`);
      }
    }

    const sourceOptions = countOptionTexts(sourceChallenge.opening);
    const targetOptions = countOptionTexts(targetChallenge.opening);
    if (sourceOptions !== targetOptions) {
      throw new Error(`${targetPath} Challenge ${sourceChallenge.index} changed option count from ${sourceOptions} to ${targetOptions}`);
    }
  }

  for (const slotName of ["hints", "explanation"] as const) {
    const sourceSlots = countSlot(sourceContents, slotName);
    const targetSlots = countSlot(targetContents, slotName);
    if (sourceSlots !== targetSlots) {
      throw new Error(`${targetPath} changed ${slotName} slot count from ${sourceSlots} to ${targetSlots}`);
    }
  }
}

function extractChallengeBlocks(contents: string, targetPath: string) {
  return [...contents.matchAll(/<Challenge\b[\s\S]*?<\/Challenge>/g)].map((match) => {
    const block = match[0];
    const openingEnd = block.indexOf(">\n");
    const opening = openingEnd === -1 ? block : block.slice(0, openingEnd + 1);
    const indexMatch = opening.match(/\bindex=\{(\d+)\}/);
    if (indexMatch == null) {
      throw new Error(`${targetPath} has a Challenge without an index prop`);
    }

    return {
      block,
      opening,
      index: Number(indexMatch[1]),
    };
  });
}

function countOptionTexts(challengeOpening: string) {
  const optionsMatch = challengeOpening.match(/\boptions=\{\[([\s\S]*?)\]\}/);
  if (optionsMatch == null) return 0;
  return [...optionsMatch[1].matchAll(/\btext\s*:/g)].length;
}

function countSlot(contents: string, slotName: string) {
  return [...contents.matchAll(new RegExp(`\\bslot\\s+name=["']${escapeRegExp(slotName)}["']`, "g"))].length;
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

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
