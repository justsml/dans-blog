/**
 * Pure utility functions extracted from judge.ts for offline testing.
 *
 * Nothing in this file executes at import time or calls external services.
 */

import type { ActiveLocale } from "../../shared/i18n.ts";
import { getLengthValidationGuidance } from "./localized-mdx.ts";

export type JudgeSuggestion = {
  priority: "low" | "medium" | "high";
  match: string;
  replacement: string;
  reason: string;
};

export type JudgeScoreKey =
  | "readability"
  | "technicalAccuracy"
  | "coherence"
  | "relevance"
  | "translationQuality"
  | "mdxPreservation"
  | "culturalAdaptation"
  | "languagePurity";

export type JudgeScoreMap = Record<JudgeScoreKey, number>;

export type CandidateRef = {
  id: string;
  label: string;
  source: "commit" | "current";
  model: string;
};

// ---------------------------------------------------------------------------
// JSON extraction & parsing
// ---------------------------------------------------------------------------

export function extractJsonObject(output: string): string | undefined {
  const withoutUsage = output
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith('{"usage"'))
    .join("\n")
    .trim();
  const fenced = withoutUsage.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced?.[1]?.trim() ?? withoutUsage;
  const firstBrace = candidate.indexOf("{");
  const lastBrace = candidate.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return undefined;
  return candidate.slice(firstBrace, lastBrace + 1);
}

export function parseJudgeOutput(output: string): Record<string, unknown> {
  const jsonText = extractJsonObject(output);
  if (jsonText == null) return {};

  try {
    const parsed = JSON.parse(jsonText);
    return parsed != null && typeof parsed === "object" ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

export function parseSelectedCommit(output: string): string | undefined {
  const parsed = parseJudgeOutput(output);
  if (typeof parsed.selectedCommit === "string" && /^[a-f0-9]{40}$/i.test(parsed.selectedCommit)) {
    return parsed.selectedCommit;
  }
  if (parsed.selectedCommit === "current") return "current";

  const selectedPatterns = [
    /selected candidate:\s*`?([a-f0-9]{40})/i,
    /recommendation:\s*(?:\r?\n)?accept[^\r\n]*?`?([a-f0-9]{40})/i,
    /accept the selected translation[^\r\n]*?`?([a-f0-9]{40})/i,
    /accept[^\r\n]*?\(commit\s+`?([a-f0-9]{40})/i,
    /selected[^\r\n]*?\(`?([a-f0-9]{40})`?\)/i,
    /current[^\r\n]*?\(commit\s+`?([a-f0-9]{40})`?\)/i,
    /keep[^\r\n]*?\(commit\s+`?([a-f0-9]{40})`?\)/i,
  ];

  for (const pattern of selectedPatterns) {
    const match = output.match(pattern);
    if (match?.[1] != null) return match[1];
  }

  return undefined;
}

// ---------------------------------------------------------------------------
// Score normalization
// ---------------------------------------------------------------------------

export function normalizeJudgeScore(value: unknown): number {
  const score = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function normalizeJudgeScores(value: unknown): JudgeScoreMap | undefined {
  if (value == null || typeof value !== "object") return undefined;
  const record = value as Record<string, unknown>;
  const keys: JudgeScoreKey[] = [
    "readability",
    "technicalAccuracy",
    "coherence",
    "relevance",
    "translationQuality",
    "mdxPreservation",
    "culturalAdaptation",
    "languagePurity",
  ];
  const hasAnyScore = keys.some((key) => Number.isFinite(
    typeof record[key] === "number" ? record[key] : Number(record[key]),
  ));
  if (!hasAnyScore) return undefined;

  const numericScores = keys
    .map((key) => typeof record[key] === "number" ? record[key] : Number(record[key]))
    .filter((score) => Number.isFinite(score));
  const appearsTenPointScale = numericScores.length > 0 && numericScores.every((score) => score >= 0 && score <= 10);

  return {
    readability: normalizeJudgeScoreForScale(record.readability, appearsTenPointScale),
    technicalAccuracy: normalizeJudgeScoreForScale(record.technicalAccuracy, appearsTenPointScale),
    coherence: normalizeJudgeScoreForScale(record.coherence, appearsTenPointScale),
    relevance: normalizeJudgeScoreForScale(record.relevance, appearsTenPointScale),
    translationQuality: normalizeJudgeScoreForScale(record.translationQuality, appearsTenPointScale),
    mdxPreservation: normalizeJudgeScoreForScale(record.mdxPreservation, appearsTenPointScale),
    culturalAdaptation: normalizeJudgeScoreForScale(record.culturalAdaptation, appearsTenPointScale),
    languagePurity: normalizeJudgeScoreForScale(record.languagePurity, appearsTenPointScale),
  };
}

function normalizeJudgeScoreForScale(value: unknown, appearsTenPointScale: boolean): number {
  const score = typeof value === "number" ? value : Number(value);
  return normalizeJudgeScore(appearsTenPointScale && Number.isFinite(score) ? score * 10 : score);
}

export function averageJudgeScore(scores: JudgeScoreMap): number {
  const values = Object.values(scores);
  return values.reduce((sum, score) => sum + score, 0) / values.length;
}

// ---------------------------------------------------------------------------
// Suggestion normalization
// ---------------------------------------------------------------------------

export function normalizePriority(value: unknown): JudgeSuggestion["priority"] | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.toLowerCase();
  if (normalized === "critical") return "high";
  if (normalized === "high" || normalized === "medium" || normalized === "low") return normalized;
  return undefined;
}

export function normalizeSuggestionString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export function isBlockingSuggestion(suggestion: Pick<JudgeSuggestion, "priority">): boolean {
  return suggestion.priority === "high" || suggestion.priority === "medium";
}

export function normalizeSuggestions(value: unknown): JudgeSuggestion[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (item == null || typeof item !== "object") return undefined;
      const record = item as Record<string, unknown>;
      const priority = normalizePriority(record.priority);
      const match = normalizeSuggestionString(record.match);
      const replacement = normalizeSuggestionString(record.replacement);
      const reason = normalizeSuggestionString(record.reason);
      if (priority == null || match == null || replacement == null || reason == null) return undefined;
      return { priority, match, replacement, reason };
    })
    .filter((suggestion): suggestion is JudgeSuggestion => suggestion != null);
}

export function normalizeLegacySuggestedChanges(value: unknown): JudgeSuggestion[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (item == null || typeof item !== "object") return undefined;
      const record = item as Record<string, unknown>;
      const priority = normalizePriority(record.severity);
      const match = normalizeSuggestionString(record.current);
      const replacement = normalizeSuggestionString(record.suggested);
      const reason = normalizeSuggestionString(record.reason);
      if (priority == null || match == null || replacement == null || reason == null) return undefined;
      return { priority, match, replacement, reason };
    })
    .filter((suggestion): suggestion is JudgeSuggestion => suggestion != null);
}

export function readSuggestionsFromParsed(parsed: Record<string, unknown>): JudgeSuggestion[] {
  const suggestions = normalizeSuggestions(parsed.suggestions);
  if (suggestions.length > 0) return suggestions;
  return normalizeLegacySuggestedChanges(parsed.suggestedChanges);
}

// ---------------------------------------------------------------------------
// Escalation decision
// ---------------------------------------------------------------------------

export function shouldEscalateSecondJudge({
  primaryOutput,
  secondOutput,
}: {
  primaryOutput: string;
  secondOutput: string;
}): boolean {
  const primarySelection = parseSelectedCommit(primaryOutput);
  const secondSelection = parseSelectedCommit(secondOutput);
  if (primarySelection != null && secondSelection != null && primarySelection !== secondSelection) {
    return true;
  }

  const normalized = secondOutput.toLowerCase();
  const explicitNoEscalationPatterns = [
    /no escalation required/,
    /no escalation needed/,
    /escalation (?:is )?not required/,
    /escalation (?:is )?not needed/,
    /no disagreement/,
    /no changes? (?:to [^\r\n]+ )?needed/,
  ];

  if (explicitNoEscalationPatterns.some((pattern) => pattern.test(normalized))) {
    return false;
  }

  if (/disagree|not agree|no estoy de acuerdo|不一致|同意しない/i.test(secondOutput)) {
    return true;
  }

  if (/\bagree\b|\bagreement\b/i.test(secondOutput)) {
    return false;
  }

  return /escalat|different/i.test(secondOutput);
}

// ---------------------------------------------------------------------------
// Candidate selection
// ---------------------------------------------------------------------------

export function normalizeSelectedCandidate(
  value: unknown,
  candidates: CandidateRef[],
  selectedCommitHint?: string,
): CandidateRef {
  const selected = typeof value === "string" ? value.trim() : undefined;
  const bySelected = selected == null ? undefined : candidates.find((c) => c.id === selected);
  if (bySelected != null) return bySelected;
  const byHint = selectedCommitHint == null ? undefined : candidates.find((c) => c.id === selectedCommitHint);
  if (byHint != null) return byHint;
  const latest = candidates.at(-1);
  if (latest == null) throw new Error("No candidate commits available.");
  return latest;
}

// ---------------------------------------------------------------------------
// Prompt builders (pure — take all dependencies as args, no module-level globals)
// ---------------------------------------------------------------------------

export type JudgePromptContext = {
  slug: string;
  locale: ActiveLocale;
  targetRelPath: string;
  selectedCommit?: string;
};

export function getJudgeJsonShape() {
  return {
    selectedCommit: "full candidate commit sha",
    selectedModel: "model id from commit subject",
    scores: {
      readability: 0,
      technicalAccuracy: 0,
      coherence: 0,
      relevance: 0,
      translationQuality: 0,
      mdxPreservation: 0,
      culturalAdaptation: 0,
      languagePurity: 0,
    },
    suggestions: [
      {
        priority: "high",
        match: "exact translated text currently in the selected MDX",
        replacement: "exact replacement text to write into the selected MDX",
        reason: "English explanation of why this medium/high-priority change is needed",
      },
    ],
    rationale: "brief selection rationale",
  };
}

export function buildPrimaryJudgePrompt(
  candidateSummary: string,
  candidates: CandidateRef[],
  passLabel: string,
  ctx: JudgePromptContext,
): string {
  return [
    "You are a constrained translation judge.",
    `Judge the ${ctx.locale} translation candidates for ${ctx.slug}.`,
    `This is the ${passLabel} comparison. Consider only these selectable candidates:`,
    ...candidates.map((c) => `- ${c.id} (${c.model})`),
    ``,
    `All candidate commits in the run:`,
    candidateSummary,
    ``,
    ctx.selectedCommit
      ? `Use ${ctx.selectedCommit} as the selected candidate unless it is structurally broken and it is selectable in this comparison.`
      : "Choose the best selectable candidate by technical accuracy, natural language quality, Dan's direct style, and MDX preservation.",
    `The final MDX must preserve the English file's per-level heading counts: same number of H1, H2, H3, H4, H5, and H6 headings. Translate heading text, but do not add, remove, promote, or demote headings.`,
    `Also preserve structural counts for fenced code blocks, Markdown/HTML images, blockquotes, tables, imports, MDX components, and quiz Challenge blocks/options/answer flags. Treat mismatches as high-priority unless the English source itself is malformed.`,
    `For quizzes, inspect every <Challenge> against the English source by index. The translated Challenge must keep the same prop names, option count, option field schema, objective count, hint presence, question/hints/explanation slots, code block counts, and isAnswer positions. No surprise props, option fields, arrays, hints, or changed non-reader-facing values.`,
    `For quizzes, judge answer faithfulness semantically: the option(s) marked isAnswer in the translation must correspond to the same correct answer and expected output as English. Reject candidates where the correct answer moved, the marked answer meaning changed, or an answer choice was translated in a way that makes the original answer wrong.`,
    `For quiz code blocks, preserve code exactly and keep code lines short enough for mobile reading; lines longer than about 63 characters should be treated as a medium-priority readability issue unless unavoidable.`,
    `Locale files live one folder deeper than English. Any inherited local image or asset path in frontmatter, Markdown, or JSX must start with ../, even if the English file uses a bare path or ./ path. Never suggest changing ../asset.webp to asset.webp or ./asset.webp.`,
    `Gist component paths must remain owner/id values such as justsml/abc123; never turn them into locale-relative paths like ../justsml/abc123.`,
    `Component imports in locale files must resolve from the locale folder depth; imported components should use ../../../../components/... unless the source uses an alias.`,
    `Reject suspicious code fence languages such as shdocker or sqlWITH; they usually mean translated prose was glued to the opening fence marker.`,
    `Reject candidates with raw HTML comments outside code fences; MDX comments must use {/* ... */}.`,
    `Reject candidates with broken HTML/MDX markup such as unclosed <section>, <p>, or other non-void tags.`,
    `Reject candidates that leak LLM instructions, wrappers, candidate labels, system/user prompt text, or translation-task narration.`,
    `Reject candidates that mix substantial English source prose into the target language, while allowing technical terms, code identifiers, product names, and URLs.`,
    `Score culturalAdaptation by whether idioms, jokes, metaphors, and culturally loaded expressions are natural in ${ctx.locale} while preserving Dan's direct technical voice. Low scores mean literal or culturally awkward wording.`,
    `Score languagePurity by whether reader-facing prose is consistently in ${ctx.locale} without untranslated English source prose or LLM instruction leakage. Do not penalize code, API names, brand names, commands, URLs, or deliberate English technical terms.`,
    `All score values must be integers from 0 to 100, where 100 is excellent and 0 is unusable. Do not use a 0 to 10 scale.`,
    getLengthValidationGuidance(ctx.locale),
    `Candidate MDX contents are attached below; do not ask to run git show.`,
    `Return the selected candidate id in selectedCommit. Use "current" only if the <current> pre-existing translation is best and selectable.`,
    `Return any exact medium/high-priority fixes as suggestions. The wrapper script writes ${ctx.targetRelPath} and judge reports.`,
    `Use this JSON shape:`,
    JSON.stringify(getJudgeJsonShape()),
    `Each medium/high-priority suggestion must include an exact match string and exact replacement string from ${ctx.targetRelPath}.`,
    `Do not run package installation, build, or content validation commands. The wrapper script owns validation.`,
    `Do not create temporary candidate files.`,
  ].join("\n");
}

export function buildPrePublishRescorePrompt(
  pass: number,
  candidateSummary: string,
  ctx: JudgePromptContext & { sourcePath?: string },
): string {
  return [
    `You are re-scoring the current selected ${ctx.locale} translation for ${ctx.slug} after pre-publish fixes pass ${pass}.`,
    `Do not run shell commands, git commands, package installation, build, or validation commands.`,
    `Read the attached English source, selected translation, judge report, and judge JSON.`,
    `Candidate commits for context:`,
    candidateSummary,
    ``,
    `Check ${ctx.targetRelPath} against ${ctx.sourcePath ?? "the English source"} for technical accuracy, natural language quality, Dan's direct style, cultural adaptation, language purity, MDX preservation, per-level heading count preservation, structural count preservation, and comparable body length.`,
    `Look specifically for bad HTML comments, unclosed HTML/MDX tags, invalid inherited asset paths, broken Gist paths, wrong locale component import depth, suspicious code fence languages, changed code block/image/blockquote/table counts, changed quiz options or answer flags, mixed-language prose, and leaked LLM instructions.`,
    `For quiz posts, compare every Challenge against English by index. Verify the same prop names, option counts, option field schema, objective counts, hint presence, slot presence, code block counts, isAnswer positions, and no surprise props/fields/arrays/non-reader-facing values. Also verify the marked answer remains semantically faithful to the English correct answer.`,
    `For quiz code blocks, preserve code exactly and flag lines longer than about 63 characters unless unavoidable.`,
    `Return refreshed scoring and pre-publish status as strict JSON. The wrapper script writes reports and applies exact medium/high-priority replacements.`,
    `Use this JSON shape:`,
    JSON.stringify(getJudgeJsonShape()),
    `Use suggestions only for concrete pre-publish fixes. Each medium/high-priority suggestion must include an exact match string currently present in ${ctx.targetRelPath}, an exact replacement string, and an English reason.`,
    `If no medium/high-priority fixes remain, return "suggestions": [].`,
  ].join("\n");
}

export function buildSecondJudgePrompt(
  candidateSummary: string,
  ctx: JudgePromptContext,
): string {
  return [
    `You are a constrained second-pass reviewer for the selected ${ctx.locale} translation of ${ctx.slug}.`,
    `Do not run shell commands, git commands, package installation, build, or validation commands.`,
    `Read the attached selected translation and primary judge report.`,
    `Only inspect candidate commits if the selected translation appears structurally broken or obviously mistranslated.`,
    ``,
    `Review the selected ${ctx.locale} translation for ${ctx.slug}.`,
    `Candidate commits:`,
    candidateSummary,
    ``,
    `Check for MDX/frontmatter breakage, raw HTML comments, invalid inherited asset paths, broken Gist paths, wrong locale component import depth, suspicious code fence languages, unclosed HTML tags, code block/image/blockquote/table count mismatches, heading count mismatches by level, changed quiz options or answer flags, untranslated or mixed-language reader-facing prose, leaked LLM instructions, major terminology errors, weak cultural adaptation, and obvious tone regressions.`,
    `For quiz posts, also verify Challenge prop names, option field schemas, objective counts, hints, slots, code block counts, code preservation, isAnswer positions, and semantic answer faithfulness against English. A translated correct answer must still be the same correct answer.`,
    `Return your agreement or disagreement as strict JSON. If acceptable, put the exact phrase "No escalation required" in rationale.`,
    `Do not edit ${ctx.targetRelPath}. If you disagree, state the exact candidate SHA or issue that requires escalation.`,
  ].join("\n");
}

export function buildEscalationPrompt(
  candidateSummary: string,
  ctx: JudgePromptContext,
): string {
  return [
    `Resolve the judge disagreement for ${ctx.locale} translation candidates for ${ctx.slug}.`,
    `Candidate commits:`,
    candidateSummary,
    ``,
    `Read the attached primary and second judge reports.`,
    `Candidate MDX contents are attached below; do not ask to run git show.`,
    `The final MDX must preserve the English file's per-level heading counts: same number of H1, H2, H3, H4, H5, and H6 headings.`,
    `Also preserve code block, image, blockquote, table, Challenge, quiz option, and answer-flag counts; reject leaked LLM instructions, raw HTML comments, invalid asset paths, broken Gist paths, wrong locale component import depth, suspicious code fence languages, mixed-language prose, and broken HTML/MDX markup.`,
    `For quiz posts, resolve answer faithfulness explicitly: the candidate must keep the same correct answer meaning, isAnswer positions, option field schema, hints, slots, and code blocks as English, with no surprise fields or non-reader-facing value changes.`,
    `Return the final selected candidate SHA and rationale as strict JSON. The wrapper script writes ${ctx.targetRelPath} and judge reports.`,
  ].join("\n");
}
