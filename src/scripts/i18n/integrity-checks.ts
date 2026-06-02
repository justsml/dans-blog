import type { ActiveLocale } from "../../shared/i18n.ts";
import { analyzeHeadingAnchorLinks } from "./heading-link-validation.ts";

export type IntegritySeverity = "high" | "medium" | "low";

export type IntegrityIssue = {
  code: string;
  severity: IntegritySeverity;
  message: string;
};

export type IntegrityCheckInput = {
  sourceContents: string;
  targetContents: string;
  targetPath: string;
  locale: ActiveLocale;
};

export type HeadingCountsByLevel = [number, number, number, number, number, number];

const VOID_HTML_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

const LLM_INSTRUCTION_LEAK_PATTERNS = [
  /\b(?:as an ai|as a language model|i can(?:not|'t)|i am unable to)\b/i,
  /\b(?:here is|here's) (?:the )?(?:translation|translated)\b/i,
  /\b(?:translate|translation instructions|system prompt|user prompt)\b/i,
  /\b(?:do not translate|preserve mdx|return only|strict json)\b/i,
  /<candidate id=|<\/candidate>|BEGIN English source|END English source/i,
];

const LATIN_LOCALES = new Set<ActiveLocale>(["de", "es", "fr", "it"]);
const QUIZ_CODE_LINE_SOFT_LIMIT = 63;

const LOCALE_SCRIPT_PATTERNS: Partial<Record<ActiveLocale, RegExp>> = {
  ar: /[\u0600-\u06ff]/g,
  he: /[\u0590-\u05ff]/g,
  hi: /[\u0900-\u097f]/g,
  ja: /[\u3040-\u30ff\u3400-\u9fff]/g,
  zh: /[\u3400-\u9fff]/g,
  ru: /[\u0400-\u04ff]/g,
};

export function analyzeTranslationIntegrity({
  sourceContents,
  targetContents,
  targetPath,
  locale,
}: IntegrityCheckInput): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];

  issues.push(...checkHtmlComments(targetContents, targetPath));
  issues.push(...checkHtmlMarkup(targetContents, targetPath));
  issues.push(...checkFenceLanguages(targetContents, targetPath));
  issues.push(...checkAssetPaths(sourceContents, targetContents, targetPath));
  issues.push(...checkHeadingAnchorLinks(sourceContents, targetContents, targetPath));
  issues.push(...checkGistPaths(targetContents, targetPath));
  issues.push(...checkLocalizedComponentImports(targetContents, targetPath));
  issues.push(...checkStructuralCounts(sourceContents, targetContents, targetPath));
  issues.push(...checkQuizOptions(sourceContents, targetContents, targetPath));
  issues.push(...checkInstructionLeaks(targetContents, targetPath));
  issues.push(...checkMixedLanguage(targetContents, targetPath, locale));

  return issues;
}

function checkHeadingAnchorLinks(
  sourceContents: string,
  targetContents: string,
  targetPath: string,
): IntegrityIssue[] {
  const report = analyzeHeadingAnchorLinks({ sourceContents, targetContents });
  if (report.failedLinks === 0) return [];

  const examples = report.failures.slice(0, 5).map((failure) =>
    `line ${failure.lineNumber}: #${failure.targetFragment || "(missing)"} should be #${failure.expectedFragment}`,
  );

  return [{
    code: "heading-anchor-link-target",
    severity: "high",
    message: [
      `${targetPath} has ${report.failedLinks}/${report.checkedLinks} same-page heading anchor link(s) pointing at stale, missing, or wrong translated heading IDs.`,
      `Stale source anchors: ${report.staleSourceAnchorLinks}; unresolved target anchors: ${report.unresolvedTargetLinks}; wrong localized heading anchors: ${report.wrongHeadingAnchorLinks}.`,
      `Examples: ${examples.join("; ")}`,
    ].join(" "),
  }];
}

export function assertTranslationIntegrity(input: IntegrityCheckInput) {
  const issues = analyzeTranslationIntegrity(input).filter((issue) => issue.severity !== "low");
  if (issues.length === 0) return;

  throw new Error(
    [
      `${input.targetPath} failed translation integrity checks:`,
      ...issues.map((issue) => `- [${issue.severity}] ${issue.code}: ${issue.message}`),
    ].join("\n"),
  );
}

function checkHtmlComments(contents: string, targetPath: string): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];
  for (const { line, lineNumber } of iterNonFenceLines(maskFrontmatter(contents))) {
    if (/<!--|-->/.test(line)) {
      issues.push({
        code: "html-comment-outside-code",
        severity: "high",
        message: `${targetPath}:${lineNumber} uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.`,
      });
    }
  }
  return issues;
}

function checkHtmlMarkup(contents: string, targetPath: string): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];
  const stack: Array<{ tag: string; lineNumber: number }> = [];
  const comparable = stripInlineCodeSpans(maskFrontmatter(contents));

  for (const { line, lineNumber } of iterNonFenceLines(stripMdxComments(comparable))) {
    for (const match of line.matchAll(/<\/?([a-z][a-z0-9:-]*)(?:\s[^<>]*)?>/gi)) {
      const raw = match[0];
      const rawTag = match[1];
      if (/^[A-Z]/.test(rawTag)) continue;
      const tag = rawTag.toLowerCase();
      if (raw.startsWith("<!")) continue;
      if (VOID_HTML_TAGS.has(tag) || raw.endsWith("/>")) continue;

      if (raw.startsWith("</")) {
        const top = stack.at(-1);
        if (top == null) {
          issues.push({
            code: "html-unmatched-closing-tag",
            severity: "high",
            message: `${targetPath}:${lineNumber} closes </${tag}> without a matching opening tag.`,
          });
          continue;
        }
        if (top.tag !== tag) {
          issues.push({
            code: "html-mismatched-closing-tag",
            severity: "high",
            message: `${targetPath}:${lineNumber} closes </${tag}> while <${top.tag}> from line ${top.lineNumber} is still open.`,
          });
          stack.pop();
          continue;
        }
        stack.pop();
      } else {
        stack.push({ tag, lineNumber });
      }
    }
  }

  for (const unclosed of stack) {
    issues.push({
      code: "html-unclosed-tag",
      severity: "high",
      message: `${targetPath}:${unclosed.lineNumber} opens <${unclosed.tag}> without a closing tag.`,
    });
  }

  return issues;
}

function checkFenceLanguages(contents: string, targetPath: string): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];
  const suspiciousPrefixes = /^(?:sql|sh|bash|shell|js|jsx|ts|tsx|json|yaml|yml|html|css|docker|dockerfile)[A-Z]/;
  const suspiciousKnown = new Set(["shdocker"]);

  for (const { line, lineNumber } of iterFenceOpenings(contents)) {
    const info = line.replace(/^\s{0,3}(```+|~~~+)/, "").trim().split(/\s+/)[0] ?? "";
    if (info === "") continue;
    if (suspiciousKnown.has(info) || suspiciousPrefixes.test(info)) {
      issues.push({
        code: "suspicious-code-fence-language",
        severity: "medium",
        message: `${targetPath}:${lineNumber} uses suspicious code fence language "${info}". This often means prose was glued to the fence marker.`,
      });
    }
  }

  return issues;
}

function checkAssetPaths(sourceContents: string, contents: string, targetPath: string): IntegrityIssue[] {
  if (!/\/[a-z]{2}\/index\.mdx?$/.test(targetPath)) return [];

  const badReferences = [
    ...contents.matchAll(/]\(\.\/(?!\.)[^)]*\)/g),
    ...contents.matchAll(/src=["']\.\/(?!\.)[^"']+["']/g),
    ...contents.matchAll(/:\s*\.\/(?!\.)\S+\.(?:avif|gif|jpe?g|png|svg|webp)\b/g),
    ...contents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
    ...contents.matchAll(/!\[[^\]]*]\((?!\.\.\/|\/|https?:\/\/|#)[^)\s]+\.(?:avif|gif|jpe?g|png|svg|webp)(?:\s+["'][^"']*["'])?\)/gi),
    ...contents.matchAll(/^\s*\[[^\]]+]:\s*(?!\.\.\/|\/|https?:\/\/|#)\S+\.(?:avif|gif|jpe?g|png|svg|webp)\b/gim),
    ...contents.matchAll(/(?:\]\(|:\s*|=["'])\.\.\/https?:\/\//gi),
    ...contents.matchAll(/(?:src|image|cover|icon|thumbnail)=["'](?!\.\.\/|\/|https?:\/\/)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/gi),
    ...contents.matchAll(/^\s*[A-Za-z0-9_-]*(?:image|cover|icon|hero|thumbnail)[A-Za-z0-9_-]*:\s*(?!\.\.\/|\/|https?:\/\/)[^\s]+\.(?:avif|gif|jpe?g|png|svg|webp)\b/gim),
  ];

  const issues: IntegrityIssue[] = [];
  if (badReferences.length > 0) {
    issues.push({
      code: "invalid-localized-asset-path",
      severity: "high",
      message: `${targetPath} has ${badReferences.length} inherited asset path(s) that must start with ../ inside locale folders.`,
    });
  }

  const externalReferenceDrift = findExternalReferenceDrift(sourceContents, contents);
  if (externalReferenceDrift.length > 0) {
    issues.push({
      code: "external-asset-rewritten-local",
      severity: "high",
      message: `${targetPath} rewrote ${externalReferenceDrift.length} external Markdown reference asset(s) to local relative paths.`,
    });
  }

  return issues;
}

function checkGistPaths(contents: string, targetPath: string): IntegrityIssue[] {
  const badReferences = [
    ...contents.matchAll(/<Gist\b[^>]*\bpath=["']\.\.\/[^"']+["']/g),
    ...contents.matchAll(/\bpath=["']\.\.\/justsml\//g),
  ];

  return badReferences.length === 0
    ? []
    : [{
      code: "invalid-gist-path",
      severity: "high",
      message: `${targetPath} has ${badReferences.length} Gist path(s) that must be owner/id, not a locale-relative path.`,
    }];
}

function checkLocalizedComponentImports(contents: string, targetPath: string): IntegrityIssue[] {
  if (!/\/[a-z]{2}\/index\.mdx?$/.test(targetPath)) return [];

  const badImports = (contents.match(/^import\s+.+?\s+from\s+['"]((?:\.\.\/)+components\/[^'"]+)['"]/gm) ?? [])
    .filter((line) => {
      const specifier = line.match(/from\s+['"]([^'"]+)['"]/)?.[1] ?? "";
      const depth = specifier.match(/\.\.\//g)?.length ?? 0;
      return depth !== 4;
    });

  return badImports.length === 0
    ? []
    : [{
      code: "invalid-localized-component-import",
      severity: "high",
      message: `${targetPath} has ${badImports.length} component import(s) with the wrong locale-folder relative depth. Use ../../../../components/...`,
    }];
}

function checkStructuralCounts(sourceContents: string, targetContents: string, targetPath: string): IntegrityIssue[] {
  const sourceHeadingCounts = countHeadingsByLevel(sourceContents);
  const targetHeadingCounts = countHeadingsByLevel(targetContents);
  const checks: Array<{ code: string; label: string; source: number; target: number; severity: IntegritySeverity }> = [
    { code: "fenced-code-count", label: "fenced code block markers", source: countFenceMarkers(sourceContents), target: countFenceMarkers(targetContents), severity: "high" },
    { code: "markdown-image-count", label: "Markdown images", source: countMarkdownImages(sourceContents), target: countMarkdownImages(targetContents), severity: "high" },
    { code: "html-image-count", label: "HTML images", source: countHtmlImages(sourceContents), target: countHtmlImages(targetContents), severity: "high" },
    { code: "blockquote-count", label: "blockquote blocks", source: countBlockquoteBlocks(sourceContents), target: countBlockquoteBlocks(targetContents), severity: "medium" },
    { code: "table-count", label: "Markdown tables", source: countMarkdownTables(sourceContents), target: countMarkdownTables(targetContents), severity: "medium" },
  ];

  for (const level of [1, 2, 3, 4, 5, 6]) {
    checks.push({
      code: `heading-h${level}-count`,
      label: `H${level} headings`,
      source: sourceHeadingCounts[level - 1],
      target: targetHeadingCounts[level - 1],
      severity: "high",
    });
  }

  return checks
    .filter((check) => check.source !== check.target)
    .map((check) => ({
      code: check.code,
      severity: check.severity,
      message: `${targetPath} changed ${check.label} from ${check.source} to ${check.target}.`,
    }));
}

function checkQuizOptions(sourceContents: string, targetContents: string, targetPath: string): IntegrityIssue[] {
  if (!sourceContents.includes("<Challenge")) return [];

  const issues: IntegrityIssue[] = [];
  const sourceChallenges = extractChallengeBlocks(sourceContents);
  const targetChallenges = extractChallengeBlocks(targetContents);
  const targetByIndex = new Map(targetChallenges.map((challenge) => [challenge.index, challenge]));
  const seenTargetIndexes = new Set<number>();

  if (sourceChallenges.length !== targetChallenges.length) {
    issues.push({
      code: "quiz-challenge-count",
      severity: "high",
      message: `${targetPath} changed Challenge count from ${sourceChallenges.length} to ${targetChallenges.length}.`,
    });
  }

  for (const sourceChallenge of sourceChallenges) {
    const targetChallenge = targetByIndex.get(sourceChallenge.index);
    if (targetChallenge == null) {
      issues.push({
        code: "quiz-missing-challenge",
        severity: "high",
        message: `${targetPath} is missing Challenge index ${sourceChallenge.index}.`,
      });
      continue;
    }
    seenTargetIndexes.add(targetChallenge.index);

    const sourcePropNames = extractChallengePropNames(sourceChallenge.opening);
    const targetPropNames = extractChallengePropNames(targetChallenge.opening);
    for (const propName of sourcePropNames) {
      if (!targetPropNames.has(propName)) {
        issues.push({
          code: "quiz-missing-prop",
          severity: "high",
          message: `${targetPath} Challenge ${sourceChallenge.index} is missing expected prop "${propName}".`,
        });
      }
    }
    for (const propName of targetPropNames) {
      if (!sourcePropNames.has(propName)) {
        issues.push({
          code: "quiz-unexpected-prop",
          severity: "high",
          message: `${targetPath} Challenge ${sourceChallenge.index} has unexpected prop "${propName}".`,
        });
      }
    }

    for (const propName of ["index", "difficulty", "client:visible"] as const) {
      const sourceValue = extractChallengePropValue(sourceChallenge.opening, propName);
      const targetValue = extractChallengePropValue(targetChallenge.opening, propName);
      if (sourceValue != null && targetValue != null && sourceValue !== targetValue) {
        issues.push({
          code: "quiz-preserved-prop-value",
          severity: "high",
          message: `${targetPath} Challenge ${sourceChallenge.index} changed preserved prop "${propName}".`,
        });
      }
    }

    const sourceObjectives = countStringArrayPropValues(sourceChallenge.opening, "objectives");
    const targetObjectives = countStringArrayPropValues(targetChallenge.opening, "objectives");
    if (sourceObjectives !== targetObjectives) {
      issues.push({
        code: "quiz-objectives-count",
        severity: "high",
        message: `${targetPath} Challenge ${sourceChallenge.index} changed objectives count from ${sourceObjectives} to ${targetObjectives}.`,
      });
    }

    const sourceOptions = extractQuizOptions(sourceChallenge.opening);
    const targetOptions = extractQuizOptions(targetChallenge.opening);
    if (sourceOptions.length !== targetOptions.length) {
      issues.push({
        code: "quiz-option-count",
        severity: "high",
        message: `${targetPath} Challenge ${sourceChallenge.index} changed option count from ${sourceOptions.length} to ${targetOptions.length}.`,
      });
    }

    const sourceAnswers = sourceOptions.filter((option) => option.isAnswer).length;
    const targetAnswers = targetOptions.filter((option) => option.isAnswer).length;
    if (sourceAnswers > 0 && targetAnswers === 0) {
      issues.push({
        code: "quiz-missing-answer",
        severity: "high",
        message: `${targetPath} Challenge ${sourceChallenge.index} has options but no correct answer flag.`,
      });
    }
    if (sourceAnswers !== targetAnswers) {
      issues.push({
        code: "quiz-answer-count",
        severity: "high",
        message: `${targetPath} Challenge ${sourceChallenge.index} changed correct answer count from ${sourceAnswers} to ${targetAnswers}.`,
      });
    }

    const comparableOptionCount = Math.min(sourceOptions.length, targetOptions.length);
    for (let optionIndex = 0; optionIndex < comparableOptionCount; optionIndex += 1) {
      const sourceOption = sourceOptions[optionIndex];
      const targetOption = targetOptions[optionIndex];
      if (sourceOption == null || targetOption == null) continue;

      const missingKeys = [...sourceOption.keys].filter((key) => !targetOption.keys.has(key));
      const unexpectedKeys = [...targetOption.keys].filter((key) => !sourceOption.keys.has(key));
      if (missingKeys.length > 0) {
        issues.push({
          code: "quiz-option-missing-field",
          severity: "high",
          message: `${targetPath} Challenge ${sourceChallenge.index} option ${optionIndex} is missing expected field(s): ${missingKeys.join(", ")}.`,
        });
      }
      if (unexpectedKeys.length > 0) {
        issues.push({
          code: "quiz-option-unexpected-field",
          severity: "high",
          message: `${targetPath} Challenge ${sourceChallenge.index} option ${optionIndex} has unexpected field(s): ${unexpectedKeys.join(", ")}.`,
        });
      }
      if (sourceOption.isAnswer !== targetOption.isAnswer) {
        issues.push({
          code: "quiz-answer-position",
          severity: "high",
          message: `${targetPath} Challenge ${sourceChallenge.index} option ${optionIndex} changed isAnswer from ${sourceOption.isAnswer} to ${targetOption.isAnswer}.`,
        });
      }
      if (sourceOption.hasHint && !targetOption.hasHint) {
        issues.push({
          code: "quiz-option-missing-hint",
          severity: "high",
          message: `${targetPath} Challenge ${sourceChallenge.index} option ${optionIndex} is missing a hint present in English.`,
        });
      }
      if (!sourceOption.hasHint && targetOption.hasHint) {
        issues.push({
          code: "quiz-option-unexpected-hint",
          severity: "high",
          message: `${targetPath} Challenge ${sourceChallenge.index} option ${optionIndex} adds a hint that is not present in English.`,
        });
      }
    }

    for (const sourceOption of sourceOptions.filter((option) => isCodeLikeQuizOption(option.text))) {
      if (!targetOptions.some((targetOption) => targetOption.text === sourceOption.text)) {
        issues.push({
          code: "quiz-code-option-preservation",
          severity: "high",
          message: `${targetPath} Challenge ${sourceChallenge.index} changed code-like quiz option ${JSON.stringify(sourceOption.text)}.`,
        });
      }
    }

    issues.push(...checkQuizSlots(sourceChallenge, targetChallenge, targetPath));
  }

  for (const targetChallenge of targetChallenges) {
    if (!seenTargetIndexes.has(targetChallenge.index) && !sourceChallenges.some((challenge) => challenge.index === targetChallenge.index)) {
      issues.push({
        code: "quiz-unexpected-challenge",
        severity: "high",
        message: `${targetPath} has unexpected Challenge index ${targetChallenge.index}.`,
      });
    }
  }

  return issues;
}

function checkQuizSlots(
  sourceChallenge: ReturnType<typeof extractChallengeBlocks>[number],
  targetChallenge: ReturnType<typeof extractChallengeBlocks>[number],
  targetPath: string,
): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];

  for (const slotName of ["question", "hints", "explanation"] as const) {
    const sourceSlot = extractSlotContent(sourceChallenge.block, slotName);
    const targetSlot = extractSlotContent(targetChallenge.block, slotName);
    if (sourceSlot != null && targetSlot == null) {
      issues.push({
        code: slotName === "hints" ? "quiz-missing-hints-slot" : "quiz-missing-slot",
        severity: "high",
        message: `${targetPath} Challenge ${sourceChallenge.index} is missing expected ${slotName} slot.`,
      });
      continue;
    }
    if (sourceSlot == null && targetSlot != null) {
      issues.push({
        code: slotName === "hints" ? "quiz-unexpected-hints-slot" : "quiz-unexpected-slot",
        severity: "high",
        message: `${targetPath} Challenge ${sourceChallenge.index} adds unexpected ${slotName} slot.`,
      });
      continue;
    }
    if (sourceSlot == null || targetSlot == null) continue;

    const sourceCodeBlocks = extractCodeBlocks(sourceSlot);
    const targetCodeBlocks = extractCodeBlocks(targetSlot);
    if (sourceCodeBlocks.length !== targetCodeBlocks.length) {
      issues.push({
        code: "quiz-code-block-count",
        severity: "high",
        message: `${targetPath} Challenge ${sourceChallenge.index} ${slotName} slot changed code block count from ${sourceCodeBlocks.length} to ${targetCodeBlocks.length}.`,
      });
    }

    const comparableCodeBlockCount = Math.min(sourceCodeBlocks.length, targetCodeBlocks.length);
    for (let codeIndex = 0; codeIndex < comparableCodeBlockCount; codeIndex += 1) {
      const sourceCode = sourceCodeBlocks[codeIndex];
      const targetCode = targetCodeBlocks[codeIndex];
      if (sourceCode == null || targetCode == null) continue;
      if (sourceCode.language !== targetCode.language || sourceCode.code !== targetCode.code) {
        issues.push({
          code: "quiz-code-block-preservation",
          severity: "high",
          message: `${targetPath} Challenge ${sourceChallenge.index} ${slotName} code block ${codeIndex + 1} changed code or language.`,
        });
      }
    }

    const longLine = targetCodeBlocks
      .flatMap((targetCodeBlock, codeIndex) => {
        const sourceCodeBlock = sourceCodeBlocks[codeIndex];
        return targetCodeBlock.code.split("\n").map((line, lineIndex) => {
          const length = stripCommonCodeIndent(line).length;
          const sourceLine = sourceCodeBlock?.code.split("\n")[lineIndex];
          return length > QUIZ_CODE_LINE_SOFT_LIMIT && line !== sourceLine ? length : 0;
        });
      })
      .find((length) => length > QUIZ_CODE_LINE_SOFT_LIMIT);
    if (longLine != null) {
      issues.push({
        code: "quiz-code-line-length",
        severity: "medium",
        message: `${targetPath} Challenge ${sourceChallenge.index} ${slotName} slot has a code line ${longLine} chars long; keep quiz code lines near ${QUIZ_CODE_LINE_SOFT_LIMIT} chars for mobile readability.`,
      });
    }
  }

  return issues;
}

function checkInstructionLeaks(contents: string, targetPath: string): IntegrityIssue[] {
  const comparable = getComparableText(contents);
  const leak = LLM_INSTRUCTION_LEAK_PATTERNS.find((pattern) => pattern.test(comparable));
  return leak == null
    ? []
    : [{
      code: "llm-instruction-leak",
      severity: "high",
      message: `${targetPath} appears to contain leaked LLM instructions or wrapper text matching ${leak}.`,
    }];
}

function checkMixedLanguage(contents: string, targetPath: string, locale: ActiveLocale): IntegrityIssue[] {
  const comparable = getComparableText(contents);
  if (comparable.length < 120) return [];

  const scriptPattern = LOCALE_SCRIPT_PATTERNS[locale];
  if (scriptPattern != null) {
    const scriptChars = comparable.match(scriptPattern)?.length ?? 0;
    const asciiWords = comparable.match(/\b[A-Za-z][A-Za-z]{3,}\b/g)?.length ?? 0;
    if (scriptChars < 20 && asciiWords > 20) {
      return [{
        code: "mixed-language-or-untranslated",
        severity: "medium",
        message: `${targetPath} has very little target-script text for locale ${locale} and many English words.`,
      }];
    }
    if (scriptChars > 20 && asciiWords > Math.max(50, scriptChars * 0.9)) {
      return [{
        code: "mixed-language-heavy-english",
        severity: "medium",
        message: `${targetPath} appears to mix substantial English prose into the ${locale} translation.`,
      }];
    }
  }

  if (LATIN_LOCALES.has(locale)) {
    const commonEnglish = comparable.match(/\b(?:the|and|with|from|this|that|should|because|instead|when|where|what|your|you)\b/gi)?.length ?? 0;
    const targetStopWords = getLatinLocaleStopWordCount(comparable, locale);
    if (commonEnglish > 35 && targetStopWords < 20) {
      return [{
        code: "mixed-language-heavy-english",
        severity: "medium",
        message: `${targetPath} has many common English prose words and few locale-specific function words for ${locale}.`,
      }];
    }
  }

  return [];
}

function getLatinLocaleStopWordCount(text: string, locale: ActiveLocale) {
  const patterns: Record<string, RegExp> = {
    de: /\b(?:der|die|das|und|oder|nicht|mit|für|ist|sind|wenn|weil)\b/gi,
    es: /\b(?:el|la|los|las|y|o|no|con|para|es|son|cuando|porque)\b/gi,
    fr: /\b(?:le|la|les|et|ou|ne|pas|avec|pour|est|sont|quand|parce)\b/gi,
    it: /\b(?:il|lo|la|gli|le|e|o|non|con|per|è|sono|quando|perché)\b/gi,
  };
  return text.match(patterns[locale] ?? /$^/)?.length ?? 0;
}

function iterNonFenceLines(contents: string) {
  const lines = contents.split(/\r?\n/);
  const result: Array<{ line: string; lineNumber: number }> = [];
  let fence: string | undefined;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fenceMatch = line.match(/^\s{0,3}(```+|~~~+)/);
    if (fenceMatch != null) {
      const marker = fenceMatch[1][0];
      fence = fence == null ? marker : fence === marker ? undefined : fence;
      continue;
    }
    if (fence == null) result.push({ line, lineNumber: index + 1 });
  }
  return result;
}

function iterFenceOpenings(contents: string) {
  const lines = contents.split(/\r?\n/);
  const result: Array<{ line: string; lineNumber: number }> = [];
  let fence: string | undefined;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fenceMatch = line.match(/^\s{0,3}(```+|~~~+)/);
    if (fenceMatch == null) continue;

    const marker = fenceMatch[1][0];
    if (fence == null) {
      fence = marker;
      result.push({ line, lineNumber: index + 1 });
    } else if (fence === marker) {
      fence = undefined;
    }
  }

  return result;
}

function countFenceMarkers(contents: string) {
  return [...contents.matchAll(/^\s{0,3}(```+|~~~+)/gm)].length;
}

function countMarkdownImages(contents: string) {
  return [...stripFencedCodeBlocks(contents).matchAll(/!\[[^\]]*]\([^)]+\)/g)].length;
}

function countHtmlImages(contents: string) {
  return [...stripFencedCodeBlocks(contents).matchAll(/<img\b/gi)].length;
}

function countBlockquoteBlocks(contents: string) {
  let count = 0;
  let inBlock = false;
  for (const { line } of iterNonFenceLines(stripFrontmatter(contents))) {
    if (/^\s*>/.test(line)) {
      if (!inBlock) count += 1;
      inBlock = true;
    } else if (line.trim() !== "") {
      inBlock = false;
    }
  }
  return count;
}

function countMarkdownTables(contents: string) {
  return [...stripFencedCodeBlocks(stripFrontmatter(contents)).matchAll(/^\s*\|?\s*:?-{3,}:?\s*\|/gm)].length;
}

export function countHeadingsByLevel(contents: string): HeadingCountsByLevel {
  const counts = [0, 0, 0, 0, 0, 0];
  for (const { line } of iterNonFenceLines(stripFrontmatter(contents))) {
    const markdownHeading = line.match(/^\s{0,3}(#{1,6})(?:\s|$)/);
    if (markdownHeading != null) {
      counts[markdownHeading[1].length - 1] += 1;
      continue;
    }
    for (const htmlHeading of line.matchAll(/<h([1-6])\b/gi)) {
      counts[Number(htmlHeading[1]) - 1] += 1;
    }
  }
  return counts as HeadingCountsByLevel;
}

function extractChallengeBlocks(contents: string) {
  return [...contents.matchAll(/<Challenge\b[\s\S]*?<\/Challenge>/g)].map((match) => {
    const block = match[0];
    const openingEnd = block.search(/\n\s*>/);
    const opening = openingEnd === -1 ? block : block.slice(0, openingEnd + block.slice(openingEnd).indexOf(">") + 1);
    const indexMatch = opening.match(/\bindex=\{(\d+)\}/);
    return {
      block,
      opening,
      index: indexMatch == null ? -1 : Number(indexMatch[1]),
    };
  });
}

function extractChallengePropNames(challengeOpening: string) {
  const withoutOptions = challengeOpening.replace(/\boptions=\{\[[\s\S]*?\]\}/g, "");
  return new Set(
    [...withoutOptions.matchAll(/\b([A-Za-z_][\w:-]*)\s*=/g)]
      .map((match) => match[1])
      .filter((name) => name !== undefined),
  );
}

function extractChallengePropValue(challengeOpening: string, propName: string) {
  if (propName === "client:visible") {
    const match = challengeOpening.match(/\b(client:visible\s*=\s*(?:\{\{[\s\S]*?\}\}|\{[\s\S]*?\}|["'][^"']*["']))/);
    return match?.[1] == null ? undefined : normalizeStructuralValue(match[1]);
  }

  const pattern = new RegExp(`\\b${escapeRegExp(propName)}\\s*=\\s*(\\{[\\s\\S]*?\\}|["'][^"']*["'])`);
  const match = challengeOpening.match(pattern);
  return match?.[1] == null ? undefined : normalizeStructuralValue(match[1]);
}

function normalizeStructuralValue(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function countStringArrayPropValues(challengeOpening: string, propName: string) {
  const match = challengeOpening.match(new RegExp(`\\b${escapeRegExp(propName)}\\s*=\\s*\\{\\[([\\s\\S]*?)\\]\\}`));
  if (match == null) return 0;
  return [...match[1].matchAll(/(["'`])((?:\\.|(?!\1)[\s\S])*?)\1/g)].length;
}

function extractQuizOptions(challengeOpening: string) {
  const optionsMatch = challengeOpening.match(/\boptions=\{\[([\s\S]*?)\]\}/);
  if (optionsMatch == null) return [];

  return [...optionsMatch[1].matchAll(/\{([\s\S]*?)\}/g)].map((optionMatch) => {
    const raw = optionMatch[1];
    const textMatch = raw.match(/\btext\s*:\s*(['"`])((?:\\.|(?!\1)[\s\S])*?)\1/);
    const hintMatch = raw.match(/\bhint\s*:\s*(['"`])((?:\\.|(?!\1)[\s\S])*?)\1/);
    const answerMatch = raw.match(/\bisAnswer\s*:\s*(true|false)\b/);
    return {
      text: textMatch?.[2]?.replace(/\\'/g, "'").replace(/\\"/g, "\"") ?? "",
      isAnswer: answerMatch?.[1] === "true",
      hasHint: hintMatch != null,
      keys: new Set([...raw.matchAll(/\b([A-Za-z_$][\w$]*)\s*:/g)].map((match) => match[1])),
    };
  }).filter((option) => option.text !== "");
}

function extractSlotContent(challengeBlock: string, slotName: string) {
  const slotRegex = new RegExp(
    `<slot\\s+name=["']${escapeRegExp(slotName)}["'][^>]*>([\\s\\S]*?)<\\/slot>`,
    "i",
  );
  return challengeBlock.match(slotRegex)?.[1];
}

function extractCodeBlocks(contents: string) {
  const blocks: Array<{ language: string; code: string }> = [];
  const lines = contents.replace(/\r\n?/g, "\n").split("\n");
  let fence: string | undefined;
  let language = "";
  let buffer: string[] = [];

  for (const line of lines) {
    const fenceMatch = line.match(/^\s{0,12}(```+|~~~+)\s*([^\s`]*)\s*$/);
    if (fenceMatch == null) {
      if (fence != null) buffer.push(line);
      continue;
    }

    const marker = fenceMatch[1][0];
    if (fence == null) {
      fence = marker;
      language = fenceMatch[2] ?? "";
      buffer = [];
      continue;
    }
    if (fence === marker) {
      blocks.push({
        language,
        code: normalizeCodeBlock(buffer.join("\n")),
      });
      fence = undefined;
      language = "";
      buffer = [];
    } else {
      buffer.push(line);
    }
  }

  return blocks;
}

function normalizeCodeBlock(code: string) {
  const lines = code.replace(/\r\n?/g, "\n").split("\n");
  while (lines.length > 0 && lines[0].trim() === "") lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();

  const indents = lines
    .filter((line) => line.trim() !== "")
    .map((line) => line.match(/^[ \t]*/)?.[0] ?? "");
  const commonIndent = indents.reduce(
    (common, indent) => commonPrefix(common, indent),
    indents[0] ?? "",
  );

  return lines
    .map((line) => (commonIndent && line.startsWith(commonIndent) ? line.slice(commonIndent.length) : line))
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n");
}

function stripCommonCodeIndent(line: string) {
  return line.replace(/^[ \t]+/, "");
}

function commonPrefix(a: string, b: string) {
  let index = 0;
  while (index < a.length && index < b.length && a[index] === b[index]) index += 1;
  return a.slice(0, index);
}

function findExternalReferenceDrift(sourceContents: string, targetContents: string) {
  const sourceRefs = extractMarkdownReferenceDefinitions(sourceContents);
  const targetRefs = extractMarkdownReferenceDefinitions(targetContents);
  const drift: string[] = [];

  for (const [id, sourceUrl] of sourceRefs) {
    const targetUrl = targetRefs.get(id);
    if (targetUrl == null) continue;
    if (/^https?:\/\//i.test(sourceUrl) && /^(?:\.\.?\/|[^:/#]+\/)/.test(targetUrl)) {
      drift.push(id);
    }
  }

  return drift;
}

function extractMarkdownReferenceDefinitions(contents: string) {
  const refs = new Map<string, string>();
  for (const match of stripFencedCodeBlocks(contents).matchAll(/^\s*\[([^\]]+)]:\s*(\S+)/gm)) {
    refs.set(match[1].trim().toLowerCase(), match[2].trim());
  }
  return refs;
}

function isCodeLikeQuizOption(value: string) {
  const trimmed = value.trim();
  return (
    /^(?:NaN|null|undefined|TypeError|RangeError|ReferenceError|SyntaxError)(?::|$)/.test(trimmed)
    || /(?:\b[A-Za-z_$][\w$]*\s*\(|=>|::|[;]|\\|\\'|\\")/.test(trimmed)
    || /(?:^|\s)(?:\$\(|\$\{|[12]>&[12]|[|&<>!=]=?|&&|\|\|)/.test(trimmed)
    || /(?:^|\s)\.[A-Za-z][\w-]*\b/.test(trimmed)
    || /<\/?[A-Za-z][^>]*>/.test(trimmed)
    || /^(?:cat|grep|sed|awk|curl|bun|npm|node|git|docker|pnpm)\s+\S+/.test(trimmed)
    || /(?:^|[\s/])[-a-z0-9_]+\.(?:js|jsx|ts|tsx|mjs|cjs|css|scss|html|json|mdx?|ya?ml|sql)\b/.test(trimmed)
    || /(?:^|[\s])\/[^/\n]+\/[a-z]*\b/i.test(trimmed)
    || /['"`][^'"`]*(?:\(|\)|::|\\|[{}[\];]|=>)[^'"`]*['"`]/.test(trimmed)
    || /^[A-Za-z][\w -]{0,24}:\s*[-#.$%()\w]+$/.test(trimmed)
  );
}

function getComparableText(contents: string) {
  return stripMdxComments(stripFencedCodeBlocks(stripFrontmatter(contents)))
    .replace(/^import\s.+$/gm, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[\s\S]*?}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripFrontmatter(contents: string) {
  if (!contents.startsWith("---")) return contents;
  const frontmatterEnd = contents.indexOf("\n---", 3);
  if (frontmatterEnd === -1) return contents;
  return contents.slice(frontmatterEnd + 4);
}

function maskFrontmatter(contents: string) {
  if (!contents.startsWith("---")) return contents;
  const frontmatterEnd = contents.indexOf("\n---", 3);
  if (frontmatterEnd === -1) return contents;
  const frontmatter = contents.slice(0, frontmatterEnd + 4);
  return frontmatter.replace(/[^\n]/g, "") + contents.slice(frontmatterEnd + 4);
}

function stripFencedCodeBlocks(contents: string) {
  const lines = contents.split(/\r?\n/);
  const result: string[] = [];
  let fence: string | undefined;
  for (const line of lines) {
    const fenceMatch = line.match(/^\s{0,3}(```+|~~~+)/);
    if (fenceMatch != null) {
      const marker = fenceMatch[1][0];
      fence = fence == null ? marker : fence === marker ? undefined : fence;
      continue;
    }
    if (fence == null) result.push(line);
  }
  return result.join("\n");
}

function stripMdxComments(contents: string) {
  return contents
    .replace(/\{\/\*[\s\S]*?\*\/}/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

function stripInlineCodeSpans(contents: string) {
  return contents.replace(/`(?:\\.|[^`])*`/g, (match) => " ".repeat(match.length));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
