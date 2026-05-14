import type { ActiveLocale } from "../../shared/i18n.ts";

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
  issues.push(...checkGistPaths(targetContents, targetPath));
  issues.push(...checkLocalizedComponentImports(targetContents, targetPath));
  issues.push(...checkStructuralCounts(sourceContents, targetContents, targetPath));
  issues.push(...checkQuizOptions(sourceContents, targetContents, targetPath));
  issues.push(...checkInstructionLeaks(targetContents, targetPath));
  issues.push(...checkMixedLanguage(targetContents, targetPath, locale));

  return issues;
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
  for (const { line, lineNumber } of iterNonFenceLines(contents)) {
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

  for (const { line, lineNumber } of iterNonFenceLines(stripMdxComments(contents))) {
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
      source: countHeadings(sourceContents)[level - 1],
      target: countHeadings(targetContents)[level - 1],
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
    if (targetOptions.length > 0 && targetAnswers === 0) {
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

    for (const sourceOption of sourceOptions.filter((option) => isCodeLikeQuizOption(option.text))) {
      if (!targetOptions.some((targetOption) => targetOption.text === sourceOption.text)) {
        issues.push({
          code: "quiz-code-option-preservation",
          severity: "high",
          message: `${targetPath} Challenge ${sourceChallenge.index} changed code-like quiz option ${JSON.stringify(sourceOption.text)}.`,
        });
      }
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

function countHeadings(contents: string) {
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
  return counts;
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

function extractQuizOptions(challengeOpening: string) {
  const optionsMatch = challengeOpening.match(/\boptions=\{\[([\s\S]*?)\]\}/);
  if (optionsMatch == null) return [];

  return [...optionsMatch[1].matchAll(/\{([\s\S]*?)\}/g)].map((optionMatch) => {
    const raw = optionMatch[1];
    const textMatch = raw.match(/\btext\s*:\s*(['"`])((?:\\.|(?!\1)[\s\S])*?)\1/);
    return {
      text: textMatch?.[2]?.replace(/\\'/g, "'").replace(/\\"/g, "\"") ?? "",
      isAnswer: /\bisAnswer\s*:\s*true\b/.test(raw),
    };
  }).filter((option) => option.text !== "");
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
  return /(?:\b[A-Za-z_$][\w$]*\s*\(|=>|[{}[\];]|\.\w+|\\'|\\"|\b(?:Date|Intl|Promise|Array|Object|Map|Set|NaN|null|undefined|TypeError|RangeError)\b)/.test(value);
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
