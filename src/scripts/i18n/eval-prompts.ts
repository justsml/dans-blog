/**
 * Prompt effectiveness evals for the i18n translation pipeline.
 *
 * Mirrors the Braintrust Eval() model: data → task → scorers → results.
 * Runs fully offline — no cloud service required.
 *
 * By default selects the newest visible published article and newest quiz
 * from the live corpus. Compares one or more translation models against
 * the same input in parallel, using shared scorers for fair comparison.
 *
 * Usage:
 *   bun run i18n:eval -- --dry-run
 *   bun run i18n:eval -- --locale ja
 *   bun run i18n:eval -- --models openrouter/qwen/qwen3-32b:nitro,openrouter/deepseek/deepseek-v4-flash
 *   bun run i18n:eval -- --slug stop-hardcoding-your-prompts --locale es
 *   bun run i18n:eval -- --kind article
 *   bun run i18n:eval -- --kind quiz --locale zh
 */

import {
  appendFileSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import "dotenv/config";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import {
  BRAINTRUST_PROJECT_NAME,
  braintrustEnabled,
  streamText,
  tracedEval,
} from "./braintrust.ts";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import {
  OPENROUTER_USAGE_ACCOUNTING,
  cachedText,
  usageFromResult,
} from "./llm-telemetry.ts";
import {
  buildCachedChunkContextPrompt,
  buildDynamicChunkPrompt,
  buildSystemPrompt,
  FRONTMATTER_LANGUAGE_LABELS,
} from "./prompts.ts";
import {
  promptProfileToTuning,
  resolvePromptProfile,
  type TranslationPromptTuning,
} from "../i18n-agent/prompt-profiles.ts";
import {
  averageJudgeScore,
  buildPrimaryJudgePrompt,
  getJudgeJsonShape,
  normalizeJudgeScores,
  parseJudgeOutput,
  readSuggestionsFromParsed,
  type CandidateRef,
  type JudgeScoreMap,
} from "./judge-utils.ts";
import {
  analyzeTranslationIntegrity,
  countHeadingsByLevel,
} from "./integrity-checks.ts";
import {
  INHERITED_TRANSLATED_FRONTMATTER_KEYS,
  normalizeFrontmatterAssetPaths,
  normalizeLocalizedCandidateBody,
  omitInheritedTranslatedFrontmatter,
  normalizeLocalizedCandidateFile,
} from "./localized-mdx.ts";
import {
  chunkSegments,
  extractSegments,
  parseChunkSize,
  reassembleChunks,
  type Chunk,
} from "./chunker.ts";
import { assembleQuiz, parseQuiz } from "./quiz-parser.ts";
import {
  generateQuizDescription,
  translateChallenge,
  type LlmConfig as QuizLlmConfig,
} from "./quiz-translator.ts";
import { resolveCheapFastTranslationModels } from "./model-presets.ts";
import { parseArgs, optionalString, parseList } from "./utils.ts";
import {
  ACTIVE_LOCALES,
  isActiveLocale,
  type ActiveLocale,
} from "../../shared/i18n.ts";
import {
  isVisiblePostData,
  type PostVisibilityData,
} from "../../shared/postVisibility.ts";
import {
  formatCost,
  formatDuration,
  scoreCell,
  shortModel,
  statusIcon,
  table,
  truncate,
  ui,
} from "./terminal-ui.ts";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const POSTS_DIR = join(process.cwd(), "src/content/posts");
const EVAL_REPORT_DIR = join(process.cwd(), "reports/i18n/evals");
const DEFAULT_MIN_SCORE = 72;
const DEFAULT_MODELS = [
  "openrouter/openai/gpt-oss-120b:nitro",
  "openrouter/deepseek/deepseek-v4-flash",
];
const DEFAULT_JUDGE_MODEL = "openrouter/google/gemini-3-flash-preview";
const TIMEOUT_MS = 90_000;
const MIN_OUTPUT_TOKENS = 6_000;
const MAX_OUTPUT_TOKENS = 16_000;
const MINIMAX_EVAL_CHUNK_SIZE = "6p";

const args = parseArgs();
const locales = parseLocales(
  optionalString(args, "locales") ?? optionalString(args, "locale"),
);
const judgeModel = (
  optionalString(args, "judge-model") ?? DEFAULT_JUDGE_MODEL
).replace(/^openrouter\//, "");
const translationModels = resolveCheapFastTranslationModels(
  parseList(optionalString(args, "models"), DEFAULT_MODELS),
);
const requestedSlugs = parseList(optionalString(args, "slug"), []);
const requestedKind = optionalString(args, "kind") ?? "all";
const isDryRun = args["dry-run"] === true;
const printStreams = args["print-streams"] === true;
const usePromptProfiles = args["no-prompt-profile"] !== true;
const translationPromptProfileId =
  optionalString(args, "translation-prompt-profile-id") ?? optionalString(args, "prompt-profile-id");
const judgePromptProfileId = optionalString(args, "judge-prompt-profile-id");

// ---------------------------------------------------------------------------
// Data types  (mirroring Braintrust shape: input → output → scores)
// ---------------------------------------------------------------------------

type ArticleKind = "article" | "quiz";

/** One eval input: a source article to translate. */
type EvalInput = {
  id: string;
  kind: ArticleKind;
  slug: string;
  sourcePath: string;
  locale: ActiveLocale;
  isQuiz: boolean;
  title: string;
  source: string;
};

/** One eval output: a generated translation + token accounting. */
type EvalOutput = {
  translation: string;
  model: string;
  durationMs: number;
  inputTokens: number;
  outputTokens: number;
  providerCostUsd?: number;
  streamId: string;
};

/** One scorer result (Braintrust convention: name + score 0–1). */
type Score = {
  name: string;
  score: number; // 0–1
  passed: boolean;
  severity: "high" | "medium" | "low";
  details?: string;
};

/** Full result for one (input × model) pair. */
type EvalResult = {
  inputId: string;
  kind: ArticleKind;
  slug: string;
  locale: ActiveLocale;
  model: string;
  passed: boolean;
  overallScore: number; // 0–1, composite
  scores: Score[]; // all scorer results, including per-dimension judge scores
  judgeScores?: JudgeScoreMap; // raw 0–100 per-dimension map from LLM judge
  errorMessage?: string;
  durationMs: number;
  inputTokens: number;
  outputTokens: number;
  providerCostUsd?: number;
  streamId?: string;
};

type StreamedTextResult = {
  text: string;
  durationMs: number;
  inputTokens: number;
  outputTokens: number;
  providerCostUsd?: number;
  streamId: string;
};

type StreamContext = {
  phase: "translation" | "judge";
  inputId: string;
  model: string;
};

type StreamTextSettings = Parameters<typeof streamText>[0];
type OpenRouterReasoningProviderOptions = {
  openrouter: {
    reasoning: {
      effort?: "low" | "minimal";
      max_tokens?: number;
      exclude?: boolean;
    };
  };
};

class StreamedTextError extends Error {
  partialText: string;
  streamId: string;
  durationMs: number;

  constructor(
    message: string,
    options: {
      partialText: string;
      streamId: string;
      durationMs: number;
    },
  ) {
    super(message);
    this.name = "StreamedTextError";
    this.partialText = options.partialText;
    this.streamId = options.streamId;
    this.durationMs = options.durationMs;
  }
}

async function streamLlmText(
  settings: StreamTextSettings,
  context: StreamContext,
): Promise<StreamedTextResult> {
  const startedAt = Date.now();
  const stem = safeFileName(
    `${context.phase}-${context.inputId}-${context.model.replace(/^openrouter\//, "")}`,
  );
  const streamId = stem;
  let text = "";
  let chunkCount = 0;

  mkdirSync(runDir, { recursive: true });
  appendRunRecord({
    at: new Date().toISOString(),
    event: "stream_started",
    streamId,
    phase: context.phase,
    inputId: context.inputId,
    model: context.model,
  });
  console.log(
    ui.dim(`      stream ${context.phase.padEnd(11)} ${streamId}`),
  );

  try {
    const result = streamText(settings);
    for await (const delta of result.textStream) {
      chunkCount += 1;
      text += delta;
      if (printStreams) process.stdout.write(delta);
    }
    if (printStreams && text.length > 0) process.stdout.write("\n");

    const durationMs = Date.now() - startedAt;
    const [finalText, usage, providerMetadata] = await Promise.all([
      result.text,
      result.usage,
      result.providerMetadata,
    ]);
    if (finalText.length > text.length) {
      text = finalText;
    }
    const telemetry = usageFromResult(usage, durationMs, providerMetadata);
    appendRunRecord({
      at: new Date().toISOString(),
      event: "stream_finished",
      streamId,
      phase: context.phase,
      inputId: context.inputId,
      model: context.model,
      durationMs,
      chunkCount,
      textLength: text.length,
      finalTextLength: finalText.length,
      text,
      usage,
      providerMetadata,
    });

    return {
      text,
      durationMs,
      inputTokens: telemetry.inputTokens,
      outputTokens: telemetry.outputTokens,
      providerCostUsd: telemetry.providerCostUsd,
      streamId,
    };
  } catch (error) {
    const durationMs = Date.now() - startedAt;
    const message = error instanceof Error ? error.message : String(error);
    appendRunRecord({
      at: new Date().toISOString(),
      event: "stream_error",
      streamId,
      phase: context.phase,
      inputId: context.inputId,
      model: context.model,
      durationMs,
      chunkCount,
      textLength: text.length,
      errorMessage: message,
      partialText: text,
    });
    throw new StreamedTextError(`${message} (partial stream id: ${streamId})`, {
      partialText: text,
      streamId,
      durationMs,
    });
  }
}

// ---------------------------------------------------------------------------
// Scorers  (pure functions: (input, output) => Score | Score[])
// ---------------------------------------------------------------------------

function scoreIntegrity(input: EvalInput, output: EvalOutput): Score[] {
  const issues = analyzeTranslationIntegrity({
    sourceContents: input.source,
    targetContents: output.translation,
    targetPath: `/${input.slug}/${input.locale}/index.mdx`,
    locale: input.locale,
  }).filter((issue) => !/^heading-h[1-6]-count$/.test(issue.code));

  return issues.map((issue) => ({
    name: `integrity:${issue.code}`,
    score: issue.severity === "low" ? 0.5 : 0,
    passed: issue.severity === "low",
    severity: issue.severity,
    details: issue.message,
  }));
}

function scoreHeadingCounts(input: EvalInput, output: EvalOutput): Score {
  const sourceCounts = countHeadingsByLevel(input.source);
  const targetCounts = countHeadingsByLevel(output.translation);
  const mismatches = sourceCounts
    .map((sourceCount, index) => {
      const level = index + 1;
      const targetCount = targetCounts[index];
      return sourceCount === targetCount
        ? undefined
        : `H${level}: English has ${sourceCount}, translation has ${targetCount}`;
    })
    .filter((message): message is string => message != null);
  const passed = mismatches.length === 0;

  return {
    name: "heading-counts-by-level",
    score: passed ? 1 : 0,
    passed,
    severity: "high",
    details: passed
      ? `English and translation heading counts match by level (${formatHeadingCounts(sourceCounts)}).`
      : mismatches.join("; "),
  };
}

function formatHeadingCounts(counts: readonly number[]) {
  return counts.map((count, index) => `H${index + 1}=${count}`).join(", ");
}

function scoreFrontmatter(_input: EvalInput, output: EvalOutput): Score {
  const passed = /^---\r?\n[\s\S]*?\r?\n---/.test(output.translation);
  return {
    name: "frontmatter-preserved",
    score: passed ? 1 : 0,
    passed,
    severity: "high",
    details: passed
      ? undefined
      : "Output must retain YAML frontmatter delimiters.",
  };
}

function scoreFrontmatterMetadata(
  input: EvalInput,
  output: EvalOutput,
): Score[] {
  let sourceData: Record<string, unknown>;
  let outputData: Record<string, unknown>;

  try {
    sourceData = matter(input.source).data;
    outputData = matter(output.translation).data;
  } catch (error) {
    return [
      {
        name: "frontmatter-parse",
        score: 0,
        passed: false,
        severity: "high",
        details: `Could not parse output frontmatter: ${error instanceof Error ? error.message : String(error)}`,
      },
    ];
  }

  const scores: Score[] = [];
  for (const key of INHERITED_TRANSLATED_FRONTMATTER_KEYS) {
    const passed = !(key in outputData);
    scores.push({
      name: `frontmatter-omitted:${key}`,
      score: passed ? 1 : 0,
      passed,
      severity: "medium",
      details: passed
        ? undefined
        : `${key} should be omitted from translated frontmatter so it inherits from English.`,
    });
  }

  const sourceLanguage = sourceData.language;
  if (typeof sourceLanguage === "string") {
    const expected = FRONTMATTER_LANGUAGE_LABELS[input.locale];
    const actual = outputData.language;
    const passed = actual === expected;
    scores.push({
      name: "frontmatter-language",
      score: passed ? 1 : 0,
      passed,
      severity: "medium",
      details: passed
        ? undefined
        : `Expected language: ${expected}; got ${JSON.stringify(actual)}.`,
    });
  }

  const preservedKeys = [
    "category",
    "subCategory",
    "tags",
    "related",
    "redirects",
    "commentsKeyOverride",
    "label",
    "modified",
    "minReleaseDate",
  ];

  for (const key of preservedKeys) {
    if (!(key in sourceData)) continue;
    const sourceValue = normalizeFrontmatterValue(sourceData[key]);
    const outputValue = normalizeFrontmatterValue(outputData[key]);
    const passed = sourceValue === outputValue;
    scores.push({
      name: `frontmatter-preserve:${key}`,
      score: passed ? 1 : 0,
      passed,
      severity: "medium",
      details: passed
        ? undefined
        : `Expected ${key} to stay ${sourceValue}; got ${outputValue}.`,
    });
  }

  return scores;
}

function scoreTitleTranslated(input: EvalInput, output: EvalOutput): Score {
  const title = input.title.trim();
  if (title.length < 8 || /^[A-Z0-9 _-]{1,20}$/.test(title)) {
    return {
      name: "title-translated",
      score: 1,
      passed: true,
      severity: "medium",
    };
  }
  const passed =
    !output.translation.includes(`title: ${title}`) &&
    !output.translation.includes(`title: "${title}"`);
  return {
    name: "title-translated",
    score: passed ? 1 : 0,
    passed,
    severity: "medium",
    details: passed
      ? undefined
      : "Frontmatter title is still the English source title.",
  };
}

function scoreNoWrapperText(_input: EvalInput, output: EvalOutput): Score {
  const passed =
    !/^\s*(?:here is|here's|sure[,!]?|of course[,!]?|```(?:mdx|markdown)?)/i.test(
      output.translation,
    );
  return {
    name: "no-wrapper-text",
    score: passed ? 1 : 0,
    passed,
    severity: "high",
    details: passed
      ? undefined
      : "Output starts with wrapper prose or an unwrapped code fence.",
  };
}

async function scoreMdxSyntax(
  input: EvalInput,
  output: EvalOutput,
): Promise<Score> {
  try {
    await compile(stripFrontmatter(output.translation), {
      development: false,
      outputFormat: "function-body",
      providerImportSource: "@mdx-js/react",
    });
    return {
      name: "mdx-syntax-parse",
      score: 1,
      passed: true,
      severity: "high",
    };
  } catch (error) {
    return {
      name: "mdx-syntax-parse",
      score: 0,
      passed: false,
      severity: "high",
      details: `${input.slug}/${input.locale} does not parse as MDX: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

type JudgeResult = {
  scores: Score[];
  judgeScores?: JudgeScoreMap;
};

async function scoreLlmJudge(
  input: EvalInput,
  output: EvalOutput,
): Promise<JudgeResult> {
  const fail = (details: string): JudgeResult => ({
    scores: [
      {
        name: "judge:overall",
        score: 0,
        passed: false,
        severity: "medium",
        details,
      },
    ],
  });

  let judgeStreamId: string | undefined;
  try {
    const promptTuning = getEvalJudgePromptTuning(input, output.model);
    const sha = "eval000000000000000000000000000000000000";
    const candidates: CandidateRef[] = [
      {
        id: sha,
        label: `<candidate id="${sha}">`,
        source: "commit",
        model: output.model,
      },
    ];
    const targetRelPath = `src/content/posts/${basename(dirname(input.sourcePath))}/${input.locale}/index.mdx`;
    const baseJudgePrompt = buildPrimaryJudgePrompt(`- ${sha} ${output.model}`, candidates, "eval", {
      slug: input.slug,
      locale: input.locale,
      targetRelPath,
    });
    const prompt = [
      appendPromptProfile(
        baseJudgePrompt,
        promptTuning?.appendCachedContext,
        "JUDGE PROMPT PROFILE STABLE TUNING",
      ),
      "",
      "--- BEGIN English source ---",
      input.source,
      "--- END English source ---",
      "",
      `--- BEGIN <candidate id="${sha}" model="${output.model}"> ---`,
      output.translation,
      `--- END <candidate id="${sha}"> ---`,
      "",
      appendPromptProfile(
        `Use this JSON shape: ${JSON.stringify(getJudgeJsonShape())}`,
        promptTuning?.appendDynamic,
        "JUDGE PROMPT PROFILE DYNAMIC TUNING",
      ),
    ].join("\n");

    const result = await streamLlmText(
      {
        model: createOpenRouter({}).chat(
          judgeModel,
          OPENROUTER_USAGE_ACCOUNTING,
        ),
        system: appendPromptProfile(
          "You are a constrained translation judge. Return strict JSON only. No markdown fences.",
          promptTuning?.appendSystem,
          "JUDGE PROMPT PROFILE SYSTEM TUNING",
        ),
        prompt,
        temperature: 0.1,
        maxOutputTokens: 2000,
        timeout: { totalMs: TIMEOUT_MS },
        providerOptions: getEvalReasoningProviderOptions(judgeModel),
      },
      {
        phase: "judge",
        inputId: input.id,
        model: `openrouter/${judgeModel}-for-${output.model}`,
      },
    );
    judgeStreamId = result.streamId;

    const parsed = parseJudgeOutput(result.text);
    const judgeScores = normalizeJudgeScores(parsed.scores);
    if (judgeScores == null) return fail("Judge returned no parseable scores.");
    const suggestions = readSuggestionsFromParsed(parsed);
    const highPrioritySuggestions = suggestions.filter(
      (suggestion) => suggestion.priority === "high",
    );
    const mediumPrioritySuggestions = suggestions.filter(
      (suggestion) => suggestion.priority === "medium",
    );

    const rationale =
      typeof parsed.rationale === "string"
        ? parsed.rationale.slice(0, 200)
        : undefined;
    const avg = averageJudgeScore(judgeScores) / 100; // normalize to 0–1

    // One Score per judge dimension + a summary entry
    const dimensionScores: Score[] = (
      Object.entries(judgeScores) as [keyof JudgeScoreMap, number][]
    ).map(([dim, raw]) => ({
      name: `judge:${dim}`,
      score: raw / 100,
      passed: raw >= DEFAULT_MIN_SCORE,
      severity: "low" as const, // dimensions don't block individually; overall does
    }));

    const overall: Score = {
      name: "judge:overall",
      score: avg,
      passed: avg * 100 >= DEFAULT_MIN_SCORE,
      severity: "medium",
      details: rationale,
    };

    const suggestionScore: Score = {
      name: "judge:blocking-suggestions",
      score: highPrioritySuggestions.length === 0 ? 1 : 0,
      passed: highPrioritySuggestions.length === 0,
      severity: "medium",
      details:
        highPrioritySuggestions.length === 0
          ? undefined
          : highPrioritySuggestions
              .map(
                (suggestion) => `${suggestion.priority}: ${suggestion.reason}`,
              )
              .join(" | ")
              .slice(0, 400),
    };
    const mediumSuggestionScore: Score = {
      name: "judge:medium-suggestions",
      score: mediumPrioritySuggestions.length === 0 ? 1 : 0.75,
      passed: mediumPrioritySuggestions.length === 0,
      severity: "low",
      details:
        mediumPrioritySuggestions.length === 0
          ? undefined
          : mediumPrioritySuggestions
              .map(
                (suggestion) => `${suggestion.priority}: ${suggestion.reason}`,
              )
              .join(" | ")
              .slice(0, 400),
    };

    return {
      scores: [
        ...dimensionScores,
        overall,
        suggestionScore,
        mediumSuggestionScore,
      ],
      judgeScores,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const streamId =
      error instanceof StreamedTextError
        ? error.streamId
        : judgeStreamId;
    return fail(
      streamId == null ? message : `${message} (stream id: ${streamId})`,
    );
  }
}

// ---------------------------------------------------------------------------
// Task  (input + model → output)
// ---------------------------------------------------------------------------

async function translate(input: EvalInput, model: string): Promise<EvalOutput> {
  const promptTuning = getEvalTranslationPromptTuning(input, model);
  if (input.isQuiz) {
    return translateStructuredQuiz(input, model, promptTuning);
  }

  if (shouldUseChunkedEvalTranslation(input, model)) {
    return translateChunkedArticle(input, model, promptTuning);
  }

  const context = {
    chunkIndex: 0,
    totalChunks: 1,
    articleSummary: `${input.kind === "quiz" ? "Quiz" : "Technical article"}: "${input.title}" (${input.slug}).`,
  };
  const cachedContext = buildCachedChunkContextPrompt(
    input.locale,
    context,
    input.isQuiz,
  );
  const dynamicPrompt = buildDynamicChunkPrompt(
    input.source,
    input.locale,
    context,
    input.isQuiz,
  );

  const result = await streamLlmText(
    {
      model: createOpenRouter({}).chat(
        model.replace(/^openrouter\//, ""),
        OPENROUTER_USAGE_ACCOUNTING,
      ),
      allowSystemInMessages: true,
      messages: [
        {
          role: "system",
          content: appendPromptProfile(
            buildSystemPrompt(input.locale, input.isQuiz),
            promptTuning?.appendSystem,
            "TRANSLATION PROMPT PROFILE SYSTEM TUNING",
          ),
        },
        {
          role: "user",
          content: [
            cachedText(appendPromptProfile(
              cachedContext,
              promptTuning?.appendCachedContext,
              "TRANSLATION PROMPT PROFILE STABLE TUNING",
            )),
            {
              type: "text",
              text: appendPromptProfile(
                dynamicPrompt,
                promptTuning?.appendDynamic,
                "TRANSLATION PROMPT PROFILE DYNAMIC TUNING",
              ),
            },
          ],
        },
      ],
      temperature: 0.1,
      maxOutputTokens: getEvalMaxOutputTokens(input.source),
      timeout: { totalMs: TIMEOUT_MS },
      providerOptions: getEvalReasoningProviderOptions(model),
    },
    {
      phase: "translation",
      inputId: input.id,
      model,
    },
  );

  return {
    translation: normalizeEvalTranslation(input.source, result.text.trim()),
    model,
    durationMs: result.durationMs,
    inputTokens: result.inputTokens,
    outputTokens: result.outputTokens,
    providerCostUsd: result.providerCostUsd,
    streamId: result.streamId,
  };
}

async function translateStructuredQuiz(
  input: EvalInput,
  model: string,
  promptTuning: TranslationPromptTuning | undefined,
): Promise<EvalOutput> {
  const parsed = matter(input.source);
  const sourceBody = parsed.content;
  const quiz = parseQuiz(sourceBody);
  const llmConfig = getEvalQuizLlmConfig(model);
  let durationMs = 0;
  let inputTokens = 0;
  let outputTokens = 0;
  let providerCostUsd = 0;

  const frontmatter = await translateEvalFrontmatter(input, model, parsed.data, promptTuning);
  durationMs += frontmatter.durationMs;
  inputTokens += frontmatter.inputTokens;
  outputTokens += frontmatter.outputTokens;
  providerCostUsd += frontmatter.providerCostUsd ?? 0;

  const summary = await generateQuizDescription(quiz, llmConfig, promptTuning);
  durationMs += summary.telemetry.durationMs;
  inputTokens += summary.telemetry.inputTokens;
  outputTokens += summary.telemetry.outputTokens;
  providerCostUsd += summary.telemetry.providerCostUsd ?? 0;

  const translatedIntro = quiz.intro.trim() === ""
    ? quiz.intro
    : (await translateEvalQuizProse(input, model, "intro", quiz.intro, summary.description, promptTuning));
  if (typeof translatedIntro !== "string") {
    durationMs += translatedIntro.durationMs;
    inputTokens += translatedIntro.inputTokens;
    outputTokens += translatedIntro.outputTokens;
    providerCostUsd += translatedIntro.providerCostUsd ?? 0;
  }

  const translatedOutro = quiz.outro.trim() === ""
    ? quiz.outro
    : (await translateEvalQuizProse(input, model, "outro", quiz.outro, summary.description, promptTuning));
  if (typeof translatedOutro !== "string") {
    durationMs += translatedOutro.durationMs;
    inputTokens += translatedOutro.inputTokens;
    outputTokens += translatedOutro.outputTokens;
    providerCostUsd += translatedOutro.providerCostUsd ?? 0;
  }

  const translatedChallenges = [];
  for (const challenge of quiz.challenges) {
    const translated = await translateChallenge(
      challenge,
      input.locale,
      llmConfig,
      summary.description,
      true,
      promptTuning,
    );
    durationMs += translated.telemetry.durationMs;
    inputTokens += translated.telemetry.inputTokens;
    outputTokens += translated.telemetry.outputTokens;
    providerCostUsd += translated.telemetry.providerCostUsd ?? 0;
    translatedChallenges.push(translated.challenge);
  }

  const translatedBody = assembleQuiz({
    intro: typeof translatedIntro === "string" ? translatedIntro : translatedIntro.text,
    challenges: translatedChallenges,
    outro: typeof translatedOutro === "string" ? translatedOutro : translatedOutro.text,
  });
  const assembled = matter.stringify(
    translatedBody.trimStart(),
    frontmatter.data,
  ).trim();
  const translation = normalizeEvalTranslation(input.source, assembled);
  const streamId = recordAssembledTranslationStream(input, model, translation);

  return {
    translation,
    model,
    durationMs,
    inputTokens,
    outputTokens,
    providerCostUsd: providerCostUsd === 0 ? undefined : providerCostUsd,
    streamId,
  };
}

async function translateEvalQuizProse(
  input: EvalInput,
  model: string,
  label: "intro" | "outro",
  prose: string,
  quizDescription: string,
  promptTuning: TranslationPromptTuning | undefined,
): Promise<StreamedTextResult & { text: string }> {
  const context = {
    chunkIndex: 0,
    totalChunks: 1,
    articleSummary: quizDescription,
  };
  const result = await streamLlmText(
    {
      model: createOpenRouter({}).chat(
        model.replace(/^openrouter\//, ""),
        OPENROUTER_USAGE_ACCOUNTING,
      ),
      allowSystemInMessages: true,
      messages: [
        {
          role: "system",
          content: appendPromptProfile(
            buildSystemPrompt(input.locale, true),
            promptTuning?.appendSystem,
            "TRANSLATION PROMPT PROFILE SYSTEM TUNING",
          ),
        },
        {
          role: "user",
          content: [
            cachedText(appendPromptProfile(
              buildCachedChunkContextPrompt(input.locale, context, true),
              promptTuning?.appendCachedContext,
              "TRANSLATION PROMPT PROFILE STABLE TUNING",
            )),
            {
              type: "text",
              text: appendPromptProfile(
                buildDynamicChunkPrompt(prose, input.locale, context, true),
                promptTuning?.appendQuizProse ?? promptTuning?.appendDynamic,
                "TRANSLATION PROMPT PROFILE QUIZ PROSE TUNING",
              ),
            },
          ],
        },
      ],
      temperature: 0.1,
      maxOutputTokens: getEvalChunkMaxOutputTokens(prose),
      timeout: { totalMs: TIMEOUT_MS },
      providerOptions: getEvalReasoningProviderOptions(model),
    },
    {
      phase: "translation",
      inputId: `${input.id}:${label}`,
      model,
    },
  );

  return { ...result, text: result.text.trim() };
}

async function translateChunkedArticle(
  input: EvalInput,
  model: string,
  promptTuning: TranslationPromptTuning | undefined,
): Promise<EvalOutput> {
  const parsed = matter(input.source);
  const sourceBody = parsed.content;
  const articleSummary = `Technical article: "${input.title}" (${input.slug}).`;
  const strategy = parseChunkSize(MINIMAX_EVAL_CHUNK_SIZE);
  const chunks = chunkSegments(extractSegments(sourceBody), strategy);
  const translatedChunks: Chunk[] = [];
  let previousTranslation: string | undefined;
  let durationMs = 0;
  let inputTokens = 0;
  let outputTokens = 0;
  let providerCostUsd = 0;

  const frontmatter = await translateEvalFrontmatter(input, model, parsed.data, promptTuning);
  durationMs += frontmatter.durationMs;
  inputTokens += frontmatter.inputTokens;
  outputTokens += frontmatter.outputTokens;
  providerCostUsd += frontmatter.providerCostUsd ?? 0;

  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];
    chunk.totalChunks = chunks.length;
    const result = await translateEvalChunk({
      input,
      model,
      chunk,
      articleSummary,
      previousTranslation,
      previousSourceContext: edgeParagraphContext(chunks[index - 1], "last"),
      nextSourceContext: edgeParagraphContext(chunks[index + 1], "first"),
      promptTuning,
    });

    durationMs += result.durationMs;
    inputTokens += result.inputTokens;
    outputTokens += result.outputTokens;
    providerCostUsd += result.providerCostUsd ?? 0;
    translatedChunks.push({
      index,
      segments: [{ type: "text", content: result.text.trim() }],
      text: result.text.trim(),
    });
    previousTranslation = result.text;
  }

  const translatedBody = normalizeLocalizedCandidateBody(
    input.source,
    reassembleChunks(translatedChunks),
  );
  const assembled = matter.stringify(
    translatedBody.trimStart(),
    frontmatter.data,
  ).trim();
  const translation = normalizeEvalTranslation(input.source, assembled);
  const streamId = recordAssembledTranslationStream(input, model, translation);

  return {
    translation,
    model,
    durationMs,
    inputTokens,
    outputTokens,
    providerCostUsd: providerCostUsd === 0 ? undefined : providerCostUsd,
    streamId,
  };
}

async function translateEvalChunk({
  input,
  model,
  chunk,
  articleSummary,
  previousTranslation,
  previousSourceContext,
  nextSourceContext,
  promptTuning,
}: {
  input: EvalInput;
  model: string;
  chunk: Chunk;
  articleSummary: string;
  previousTranslation?: string;
  previousSourceContext?: string;
  nextSourceContext?: string;
  promptTuning?: TranslationPromptTuning;
}): Promise<StreamedTextResult> {
  const context = {
    chunkIndex: chunk.index,
    totalChunks: chunk.totalChunks ?? chunk.index + 1,
    previousTranslation,
    previousSourceContext,
    nextSourceContext,
    articleSummary,
  };
  const cachedContext = buildCachedChunkContextPrompt(input.locale, context, false);
  const dynamicPrompt = buildDynamicChunkPrompt(chunk.text, input.locale, context, false);

  return streamLlmText(
    {
      model: createOpenRouter({}).chat(
        model.replace(/^openrouter\//, ""),
        OPENROUTER_USAGE_ACCOUNTING,
      ),
      allowSystemInMessages: true,
      messages: [
        {
          role: "system",
          content: appendPromptProfile(
            buildSystemPrompt(input.locale, false),
            promptTuning?.appendSystem,
            "TRANSLATION PROMPT PROFILE SYSTEM TUNING",
          ),
        },
        {
          role: "user",
          content: [
            cachedText(appendPromptProfile(
              cachedContext,
              promptTuning?.appendCachedContext,
              "TRANSLATION PROMPT PROFILE STABLE TUNING",
            )),
            {
              type: "text",
              text: appendPromptProfile(
                dynamicPrompt,
                promptTuning?.appendDynamic,
                "TRANSLATION PROMPT PROFILE DYNAMIC TUNING",
              ),
            },
          ],
        },
      ],
      temperature: 0.1,
      maxOutputTokens: getEvalChunkMaxOutputTokens(chunk.text),
      timeout: { totalMs: TIMEOUT_MS },
      providerOptions: getEvalReasoningProviderOptions(model),
    },
    {
      phase: "translation",
      inputId: `${input.id}:chunk-${chunk.index + 1}`,
      model,
    },
  );
}

async function translateEvalFrontmatter(
  input: EvalInput,
  model: string,
  sourceFrontmatter: Record<string, unknown>,
  promptTuning: TranslationPromptTuning | undefined,
) {
  const data = omitInheritedTranslatedFrontmatter(
    normalizeFrontmatterAssetPaths(sourceFrontmatter),
  );
  let durationMs = 0;
  let inputTokens = 0;
  let outputTokens = 0;
  let providerCostUsd = 0;

  for (const key of ["date", "modified", "minReleaseDate"]) {
    const value = data[key];
    if (value instanceof Date) data[key] = value.toISOString().slice(0, 10);
  }

  for (const key of ["title", "subTitle", "cover_alt", "cover_credit"]) {
    const value = data[key];
    if (typeof value !== "string" || value.trim() === "") continue;

    const result = await streamLlmText(
      {
        model: createOpenRouter({}).chat(
          model.replace(/^openrouter\//, ""),
          OPENROUTER_USAGE_ACCOUNTING,
        ),
        allowSystemInMessages: true,
        messages: [
          {
            role: "system",
            content: appendPromptProfile(
              "You are a technical translator. Output only the requested translated frontmatter value.",
              promptTuning?.appendSystem,
              "TRANSLATION PROMPT PROFILE SYSTEM TUNING",
            ),
          },
          {
            role: "user",
            content: [
              cachedText(
                appendPromptProfile(
                  [
                    "STABLE FRONTMATTER TRANSLATION CONTRACT:",
                    buildSystemPrompt(input.locale, input.isQuiz),
                  ].join("\n"),
                  promptTuning?.appendFrontmatter ?? promptTuning?.appendCachedContext,
                  "TRANSLATION PROMPT PROFILE FRONTMATTER TUNING",
                ),
              ),
              {
                type: "text",
                text: `Translate this ${key} into ${FRONTMATTER_LANGUAGE_LABELS[input.locale]}. Preserve inline code spans exactly. Return one plain string, not YAML.\n\n${value}`,
              },
            ],
          },
        ],
        temperature: 0.1,
        maxOutputTokens: 500,
        timeout: { totalMs: TIMEOUT_MS },
        providerOptions: getEvalReasoningProviderOptions(model),
      },
      {
        phase: "translation",
        inputId: `${input.id}:frontmatter-${key}`,
        model,
      },
    );

    durationMs += result.durationMs;
    inputTokens += result.inputTokens;
    outputTokens += result.outputTokens;
    providerCostUsd += result.providerCostUsd ?? 0;
    data[key] = cleanFrontmatterScalarTranslation(result.text, value);
  }

  return {
    data,
    durationMs,
    inputTokens,
    outputTokens,
    providerCostUsd: providerCostUsd === 0 ? undefined : providerCostUsd,
  };
}

// ---------------------------------------------------------------------------
// Eval runner  (data × task × scores → result)
// ---------------------------------------------------------------------------

async function runEval(input: EvalInput, model: string): Promise<EvalResult> {
  let output: EvalOutput;
  try {
    output = await translate(input, model);
  } catch (error) {
    const streamError = error instanceof StreamedTextError ? error : undefined;
    return {
      inputId: input.id,
      kind: input.kind,
      slug: input.slug,
      locale: input.locale,
      model,
      passed: false,
      overallScore: 0,
      scores: [],
      errorMessage: error instanceof Error ? error.message : String(error),
      durationMs: streamError?.durationMs ?? 0,
      inputTokens: 0,
      outputTokens: 0,
      streamId: streamError?.streamId,
    };
  }

  // Run all scorers — deterministic ones sync, LLM judge async
  const [
    integrityScores,
    headingCounts,
    frontmatter,
    frontmatterMetadata,
    title,
    wrapper,
    mdxSyntax,
    judgeResult,
  ] = await Promise.all([
    Promise.resolve(scoreIntegrity(input, output)),
    Promise.resolve(scoreHeadingCounts(input, output)),
    Promise.resolve(scoreFrontmatter(input, output)),
    Promise.resolve(scoreFrontmatterMetadata(input, output)),
    Promise.resolve(scoreTitleTranslated(input, output)),
    Promise.resolve(scoreNoWrapperText(input, output)),
    scoreMdxSyntax(input, output),
    scoreLlmJudge(input, output),
  ]);

  const scores: Score[] = [
    ...integrityScores,
    headingCounts,
    frontmatter,
    ...frontmatterMetadata,
    title,
    wrapper,
    mdxSyntax,
    ...judgeResult.scores,
  ];
  const overallScore =
    scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
  const passed = scores.every((s) => s.passed || s.severity === "low");

  return {
    inputId: input.id,
    kind: input.kind,
    slug: input.slug,
    locale: input.locale,
    model,
    passed,
    overallScore,
    scores,
    judgeScores: judgeResult.judgeScores,
    durationMs: output.durationMs,
    inputTokens: output.inputTokens,
    outputTokens: output.outputTokens,
    providerCostUsd: output.providerCostUsd,
    streamId: output.streamId,
  };
}

// ---------------------------------------------------------------------------
// Data selection
// ---------------------------------------------------------------------------

function selectInputs(locale: ActiveLocale): EvalInput[] {
  const corpus = loadPublishedPosts();

  if (requestedSlugs.length > 0) {
    return requestedSlugs.map((requestedSlug) => {
      const normalizedSlug = normalizeSlug(requestedSlug).toLowerCase();
      const post =
        corpus.find((p) => p.slug.toLowerCase().includes(normalizedSlug)) ??
        (() => {
          throw new Error(`Slug "${requestedSlug}" not found in visible corpus.`);
        })();

      if (requestedKind !== "all" && post.kind !== requestedKind) {
        throw new Error(
          `Slug "${requestedSlug}" has kind "${post.kind}", not "${requestedKind}".`,
        );
      }

      return {
        id: `${post.kind}:${post.slug}:${locale}`,
        kind: post.kind,
        slug: post.slug,
        sourcePath: post.sourcePath,
        locale,
        isQuiz: post.kind === "quiz",
        title: post.title,
        source: post.source,
      };
    });
  }

  const kinds =
    requestedKind === "all"
      ? (["article", "quiz"] as ArticleKind[])
      : [requestedKind as ArticleKind];

  return kinds.map((kind) => {
    const post =
      corpus.find((p) => p.kind === kind) ??
      (() => {
        throw new Error(`No visible published ${kind} found.`);
      })();

    return {
      id: `${kind}:${post.slug}:${locale}`,
      kind,
      slug: post.slug,
      sourcePath: post.sourcePath,
      locale,
      isQuiz: kind === "quiz",
      title: post.title,
      source: post.source,
    };
  });
}

function loadPublishedPosts() {
  return readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .flatMap((e) => {
      const sourcePath = join(POSTS_DIR, e.name, "index.mdx");
      try {
        const source = readFileSync(sourcePath, "utf8");
        const { data } = matter(source);
        if (!isVisiblePostData(data as PostVisibilityData)) return [];
        if (data.unlisted === true) return [];
        const dateMs = parsePostDateMs(data, join(POSTS_DIR, e.name));
        if (!Number.isFinite(dateMs) || dateMs > Date.now()) return [];
        return [
          {
            kind: (data.category === "Quiz"
              ? "quiz"
              : "article") as ArticleKind,
            slug: e.name.replace(/^\d{4}-\d{2}-\d{2}--/, ""),
            sourcePath,
            source,
            title: typeof data.title === "string" ? data.title : e.name,
            dateMs,
          },
        ];
      } catch {
        return [];
      }
    })
    .sort((a, b) => b.dateMs - a.dateMs || a.slug.localeCompare(b.slug));
}

function parsePostDateMs(data: Record<string, unknown>, postDir: string) {
  const raw = data.date ?? data.modified;
  if (raw instanceof Date) return raw.getTime();
  if (typeof raw === "string" || typeof raw === "number") {
    const d = new Date(raw);
    if (!Number.isNaN(d.getTime())) return d.getTime();
  }
  const m = basename(postDir).match(/^(\d{4}-\d{2}-\d{2})--/);
  return m == null ? Number.NaN : new Date(`${m[1]}T00:00:00`).getTime();
}

function normalizeSlug(slug: string) {
  return slug
    .replace(/^src\/content\/posts\//, "")
    .replace(/\/index\.mdx?$/, "")
    .replace(/^\d{4}-\d{2}-\d{2}--/, "");
}

function stripFrontmatter(contents: string) {
  if (!contents.startsWith("---")) return contents;
  const frontmatterEnd = contents.indexOf("\n---", 3);
  if (frontmatterEnd === -1) return contents;
  return contents.slice(frontmatterEnd + 4);
}

function normalizeEvalTranslation(source: string, translation: string) {
  const normalized = normalizeLocalizedCandidateFile(source, translation);
  try {
    const parsed = matter(normalized);
    const frontmatter = omitInheritedTranslatedFrontmatter(
      normalizeFrontmatterAssetPaths(parsed.data),
    );
    return matter.stringify(parsed.content.trimStart(), frontmatter).trim();
  } catch {
    return normalized;
  }
}

function normalizeFrontmatterValue(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  if (Array.isArray(value))
    return JSON.stringify(value.map(normalizeFrontmatterValue));
  if (value != null && typeof value === "object") {
    const entries: Array<[string, string]> = Object.entries(
      value as Record<string, unknown>,
    )
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => [key, normalizeFrontmatterValue(item)]);
    return JSON.stringify(Object.fromEntries(entries));
  }
  return JSON.stringify(value);
}

function getEvalMaxOutputTokens(source: string) {
  return Math.min(
    MAX_OUTPUT_TOKENS,
    Math.max(MIN_OUTPUT_TOKENS, Math.ceil(source.length * 1.4)),
  );
}

function getEvalChunkMaxOutputTokens(source: string) {
  return Math.min(6_000, Math.max(1_500, Math.ceil(source.length * 1.8)));
}

function shouldUseChunkedEvalTranslation(input: EvalInput, model: string) {
  return input.kind === "article" && model.replace(/^openrouter\//, "").includes("minimax/");
}

function getEvalReasoningProviderOptions(
  model: string,
): OpenRouterReasoningProviderOptions | undefined {
  const normalized = model.replace(/^openrouter\//, "");

  if (normalized.includes("minimax/")) {
    return { openrouter: { reasoning: { max_tokens: 512, exclude: true } } };
  }

  if (
    normalized.includes("gpt-5")
    || normalized.includes("gpt-oss")
    || normalized.includes("qwen")
    || normalized.includes("glm")
    || normalized.includes("deepseek")
  ) {
    return { openrouter: { reasoning: { effort: "low", exclude: true } } };
  }

  if (normalized.includes("gemini-3")) {
    return { openrouter: { reasoning: { effort: "minimal", exclude: true } } };
  }

  return undefined;
}

function getEvalQuizLlmConfig(model: string): QuizLlmConfig {
  return {
    modelId: model.replace(/^openrouter\//, ""),
    providerSettings: {},
    providerOptions: getEvalQuizReasoningProviderOptions(model),
    temperature: 0.1,
    maxTokens: 4000,
    timeoutMs: TIMEOUT_MS,
  };
}

function getEvalQuizReasoningProviderOptions(model: string): QuizLlmConfig["providerOptions"] {
  const normalized = model.replace(/^openrouter\//, "");
  const effort = normalized.includes("gemini-3") ? "minimal" : "low";
  return { openrouter: { reasoning: { effort } } };
}

function edgeParagraphContext(chunk: Chunk | undefined, edge: "first" | "last") {
  if (chunk == null) return undefined;
  const textSegments = chunk.segments
    .filter((segment) => segment.type === "text")
    .map((segment) => segment.content.trim())
    .filter(Boolean);
  return edge === "first" ? textSegments[0] : textSegments.at(-1);
}

function recordAssembledTranslationStream(
  input: EvalInput,
  model: string,
  translation: string,
) {
  const streamId = safeFileName(
    `translation-${input.id}-${model.replace(/^openrouter\//, "")}-assembled`,
  );
  appendRunRecord({
    at: new Date().toISOString(),
    event: "stream_finished",
    streamId,
    phase: "translation",
    inputId: input.id,
    model,
    durationMs: 0,
    chunkCount: 0,
    textLength: translation.length,
    text: translation,
    assembled: true,
  });
  return streamId;
}

function getEvalTranslationPromptTuning(input: EvalInput, model: string): TranslationPromptTuning | undefined {
  if (!usePromptProfiles) return undefined;
  return promptProfileToTuning(resolvePromptProfile({
    kind: "translation",
    locale: input.locale,
    model,
    profileId: translationPromptProfileId,
    contentKind: input.kind,
  }));
}

function getEvalJudgePromptTuning(input: EvalInput, model: string): TranslationPromptTuning | undefined {
  if (!usePromptProfiles) return undefined;
  return promptProfileToTuning(resolvePromptProfile({
    kind: "judge",
    locale: input.locale,
    model,
    profileId: judgePromptProfileId,
    contentKind: input.kind,
  }));
}

function describeEvalPromptProfiles(input: EvalInput, model: string) {
  if (!usePromptProfiles) return { translation: undefined, judge: undefined };
  const translation = resolvePromptProfile({
    kind: "translation",
    locale: input.locale,
    model,
    profileId: translationPromptProfileId,
    contentKind: input.kind,
  });
  const judge = resolvePromptProfile({
    kind: "judge",
    locale: input.locale,
    model,
    profileId: judgePromptProfileId,
    contentKind: input.kind,
  });
  return {
    translation: translation == null ? undefined : {
      id: translation.id,
      version: translation.version,
      modelPattern: translation.modelPattern,
      contentKind: translation.contentKind,
    },
    judge: judge == null ? undefined : {
      id: judge.id,
      version: judge.version,
      modelPattern: judge.modelPattern,
      contentKind: judge.contentKind,
    },
  };
}

function appendPromptProfile(base: string, append: string | undefined, label: string) {
  if (append == null || append.trim() === "") return base;
  return [base.trim(), "", `${label}:`, append.trim()].join("\n");
}

function cleanFrontmatterScalarTranslation(translated: string, fallback: string) {
  const cleaned = translated
    .trim()
    .replace(/^```(?:\w+)?\s*/, "")
    .replace(/\s*```$/, "")
    .trim();
  if (cleaned === "") return fallback;
  const firstLine = cleaned.split(/\r?\n/).find((line) => line.trim() !== "");
  if (firstLine == null) return fallback;
  return firstLine.trim().replace(/^["'](.+)["']$/, "$1");
}

function safeFileName(value: string) {
  return value
    .replace(/[^a-z0-9._-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

function appendJsonl(path: string, value: unknown) {
  appendFileSync(path, JSON.stringify(value) + "\n", "utf8");
}

function appendRunRecord(value: Record<string, unknown>) {
  appendJsonl(runLogPath, value);
}

function parseLocales(value: string | undefined): ActiveLocale[] {
  if (value == null) return [...ACTIVE_LOCALES];
  return value.split(",").map((v) => {
    const trimmed = v.trim();
    if (isActiveLocale(trimmed)) return trimmed;
    throw new Error(
      `--locales must be active locales (${ACTIVE_LOCALES.join(", ")}). Got "${trimmed}".`,
    );
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

mkdirSync(EVAL_REPORT_DIR, { recursive: true });
const runId = new Date().toISOString().replace(/[:.]/g, "-");
const runDir = join(EVAL_REPORT_DIR, `eval-run-${runId}`);
const runLogPath = join(runDir, "run.jsonl");
const summaryPath = join(runDir, "summary.md");

// inputs = unique articles × locales; pairs = inputs × models
const inputs = locales.flatMap((loc) => selectInputs(loc));
const pairs = inputs.flatMap((input) =>
  translationModels.map((model) => ({ input, model })),
);

if (isDryRun) {
  console.log(`\n${ui.title("i18n eval dry run")}`);
  console.log(
    ui.dim(
      `${inputs.length} input(s) × ${translationModels.length} model(s) = ${pairs.length} eval case(s)`,
    ),
  );
  console.log(`${ui.title("Judge")}   ${ui.model(judgeModel)}`);
  console.log(`${ui.title("Locales")} ${locales.map(ui.info).join(", ")}`);
  console.log(`${ui.title("Prompt profiles")} ${usePromptProfiles ? ui.good("enabled") : ui.dim("disabled")}`);
  console.log(`${ui.title("Output")}  ${ui.path(runDir)}\n`);
  console.log(
    table(
      ["#", "Kind", "Locale", "Slug", "Model", "Source"],
      pairs.map(({ input, model }, index) => [
        String(index + 1),
        input.kind,
        ui.info(input.locale),
        truncate(input.slug, 36),
        ui.model(truncate(shortModel(model), 40)),
        ui.path(relative(process.cwd(), input.sourcePath)),
      ]),
    ),
  );
  process.exit(0);
}

mkdirSync(runDir, { recursive: true });
writeFileSync(runLogPath, "", "utf8");

console.log(`\n${ui.title("i18n eval run")}`);
console.log(
  ui.dim(
    `${inputs.length} input(s) × ${translationModels.length} model(s) = ${pairs.length} eval(s) running in parallel`,
  ),
);
console.log(
  `${ui.title("Models")}  ${translationModels.map((m) => ui.model(shortModel(m))).join(", ")}`,
);
console.log(`${ui.title("Judge")}   ${ui.model(judgeModel)}`);
console.log(`${ui.title("Locales")} ${locales.map(ui.info).join(", ")}`);
console.log(`${ui.title("Prompt profiles")} ${usePromptProfiles ? ui.good("enabled") : ui.dim("disabled")}`);
console.log(`${ui.title("Output")}  ${ui.path(relative(process.cwd(), runDir))}`);
console.log(
  `${ui.title("Run log")} ${ui.path(relative(process.cwd(), runLogPath))}${printStreams ? ui.warn(" (+stdout)") : ""}\n`,
);

if (braintrustEnabled) {
  console.log(
    `${ui.title("Braintrust")} logging to project ${ui.info(`"${BRAINTRUST_PROJECT_NAME}"`)}\n`,
  );
}

const results = await Promise.all(
  pairs.map(async ({ input, model }, index) => {
    const modelLabel = shortModel(model);
    const caseLabel = `${input.kind}:${input.slug}:${input.locale}`;
    const promptProfiles = describeEvalPromptProfiles(input, model);
    console.log(
      `${ui.info("▶")} ${ui.dim(`[${index + 1}/${pairs.length}]`)} ${caseLabel} ${ui.model(modelLabel)}`,
    );
    const result = await tracedEval(
      `eval:${input.id}`,
      {
        slug: input.slug,
        locale: input.locale,
        kind: input.kind,
        model: modelLabel,
        judgeModel,
        promptProfiles,
      },
      () => runEval(input, model),
      {
        llmString: model,
        inputOverride: {
          id: input.id,
          slug: input.slug,
          locale: input.locale,
          kind: input.kind,
          sourcePath: relative(process.cwd(), input.sourcePath),
          model,
          judgeModel: `openrouter/${judgeModel}`,
          promptProfiles,
        },
      },
    );
    const score = scoreCell(result.overallScore);
    console.log(
      `${statusIcon(result.passed)} ${ui.dim(`[${index + 1}/${pairs.length}]`)} ${caseLabel} score=${score} time=${formatDuration(result.durationMs)} cost=${formatCost(result.providerCostUsd)} ${ui.model(modelLabel)}`,
    );
    if (!result.passed) {
      for (const s of result.scores.filter(
        (s) => !s.passed && s.severity !== "low",
      )) {
        console.log(
          `   ${ui.bad("•")} ${ui.warn(s.name)}${s.details ? ui.dim(`: ${s.details}`) : ""}`,
        );
      }
      if (result.streamId != null)
        console.log(
          `   ${ui.dim("raw translation stream id:")} ${ui.path(result.streamId)}`,
        );
    }
    appendRunRecord({
      at: new Date().toISOString(),
      event: "case_finished",
      ...result,
    });
    return result;
  }),
);

writeSummary(results);
writeConsoleSummary(results);

const failCount = results.filter((r) => !r.passed).length;
console.log(`\n${ui.title("Markdown summary")} ${ui.path(summaryPath)}`);
if (failCount > 0) {
  console.error(ui.bad(`\n❌ ${failCount} eval(s) failed.`));
  process.exit(1);
}
console.log(ui.good(`✅ All ${results.length} eval(s) passed.`));

// ---------------------------------------------------------------------------
// Summary report
// ---------------------------------------------------------------------------

function writeConsoleSummary(results: EvalResult[]) {
  const passCount = results.filter((r) => r.passed).length;
  const failCount = results.length - passCount;
  const totalCost = results.reduce(
    (sum, r) => sum + (r.providerCostUsd ?? 0),
    0,
  );
  const totalTokens = results.reduce(
    (sum, r) => sum + r.inputTokens + r.outputTokens,
    0,
  );
  const totalMs = results.reduce((sum, r) => sum + r.durationMs, 0);

  console.log(`\n${ui.title("Run summary")}`);
  console.log(
    table(
      ["Total", "Passed", "Failed", "Pass rate", "Tokens", "Cost", "Model time"],
      [
        [
          String(results.length),
          ui.good(`✅ ${passCount}`),
          failCount === 0 ? ui.good("0") : ui.bad(`❌ ${failCount}`),
          scoreCell(results.length === 0 ? 0 : passCount / results.length),
          totalTokens.toLocaleString(),
          formatCost(totalCost),
          formatDuration(totalMs),
        ],
      ],
    ),
  );

  console.log(`\n${ui.title("Results")}`);
  console.log(
    table(
      ["", "Kind", "Locale", "Slug", "Model", "Score", "Judge", "Time", "Cost"],
      results
        .slice()
        .sort(
          (a, b) =>
            Number(a.passed) - Number(b.passed) ||
            a.locale.localeCompare(b.locale) ||
            a.slug.localeCompare(b.slug) ||
            shortModel(a.model).localeCompare(shortModel(b.model)),
        )
        .map((result) => {
          const judge = result.scores.find((s) => s.name === "judge:overall");
          return [
            statusIcon(result.passed),
            result.kind,
            ui.info(result.locale),
            truncate(result.slug, 34),
            ui.model(truncate(shortModel(result.model), 34)),
            scoreCell(result.overallScore),
            judge == null ? "-" : scoreCell(judge.score),
            formatDuration(result.durationMs),
            formatCost(result.providerCostUsd),
          ];
        }),
    ),
  );

  const byLocale = [...groupResults(results, (result) => result.locale).entries()]
    .sort(([a], [b]) => a.localeCompare(b));
  if (byLocale.length > 1) {
    console.log(`\n${ui.title("By locale")}`);
    console.log(
      table(
        ["Locale", "Pass", "Fail", "Avg score", "Cost"],
        byLocale.map(([locale, localeResults]) => [
          ui.info(locale),
          ui.good(String(localeResults.filter((r) => r.passed).length)),
          localeResults.some((r) => !r.passed)
            ? ui.bad(String(localeResults.filter((r) => !r.passed).length))
            : ui.good("0"),
          scoreCell(averageScore(localeResults)),
          formatCost(
            localeResults.reduce(
              (sum, result) => sum + (result.providerCostUsd ?? 0),
              0,
            ),
          ),
        ]),
      ),
    );
  }

  const byModel = [...groupResults(results, (result) => shortModel(result.model)).entries()]
    .sort(([a], [b]) => a.localeCompare(b));
  if (byModel.length > 1) {
    console.log(`\n${ui.title("By model")}`);
    console.log(
      table(
        ["Model", "Pass", "Fail", "Avg score", "Cost"],
        byModel.map(([model, modelResults]) => [
          ui.model(truncate(model, 42)),
          ui.good(String(modelResults.filter((r) => r.passed).length)),
          modelResults.some((r) => !r.passed)
            ? ui.bad(String(modelResults.filter((r) => !r.passed).length))
            : ui.good("0"),
          scoreCell(averageScore(modelResults)),
          formatCost(
            modelResults.reduce(
              (sum, result) => sum + (result.providerCostUsd ?? 0),
              0,
            ),
          ),
        ]),
      ),
    );
  }

  const failures = results.filter((result) => !result.passed);
  if (failures.length > 0) {
    console.log(`\n${ui.bad("Failures")}`);
    console.log(
      table(
        ["Case", "Model", "Blocking reason"],
        failures.map((result) => [
          `${result.kind}:${result.slug}:${result.locale}`,
          ui.model(truncate(shortModel(result.model), 34)),
          truncate(firstBlockingReason(result), 90),
        ]),
      ),
    );
  }
}

function groupResults<TKey extends string>(
  results: EvalResult[],
  keyFor: (result: EvalResult) => TKey,
) {
  const groups = new Map<TKey, EvalResult[]>();
  for (const result of results) {
    const key = keyFor(result);
    groups.set(key, [...(groups.get(key) ?? []), result]);
  }
  return groups;
}

function averageScore(results: EvalResult[]) {
  if (results.length === 0) return 0;
  return (
    results.reduce((sum, result) => sum + result.overallScore, 0) /
    results.length
  );
}

function firstBlockingReason(result: EvalResult) {
  if (result.errorMessage != null) return result.errorMessage;
  const blocker = result.scores.find(
    (score) => !score.passed && score.severity !== "low",
  );
  return blocker == null
    ? "No blocking scorer details recorded."
    : `${blocker.name}${blocker.details ? `: ${blocker.details}` : ""}`;
}

function writeSummary(results: EvalResult[]) {
  const passCount = results.filter((r) => r.passed).length;
  const failCount = results.length - passCount;
  const totalCost = results.reduce(
    (sum, r) => sum + (r.providerCostUsd ?? 0),
    0,
  );

  // Collect all judge dimension names seen across results for column headers
  const judgeKeys = [
    ...new Set(
      results.flatMap((r) =>
        r.scores
          .filter(
            (s) => s.name.startsWith("judge:") && s.name !== "judge:overall",
          )
          .map((s) => s.name),
      ),
    ),
  ].sort();

  const lines: string[] = [
    `# Translation Eval Run — ${runId}`,
    ``,
    `**${passCount} passed, ${failCount} failed** | total cost $${totalCost.toFixed(5)}`,
    `Models: ${translationModels.map((m) => m.replace(/^openrouter\//, "")).join(", ")}`,
    `Judge: ${judgeModel}`,
    `Run log: ${relative(process.cwd(), runLogPath)}`,
    ``,
    `## Results`,
    ``,
    `| Kind | Slug | Locale | Model | Pass | Overall | Judge | ${judgeKeys.map((k) => k.replace("judge:", "")).join(" | ")} | Cost | Stream Id |`,
    `| --- | --- | --- | --- | --- | --- | --- | ${judgeKeys.map(() => "---").join(" | ")} | --- | --- |`,
    ...results.map((r) => {
      const scoreMap = Object.fromEntries(r.scores.map((s) => [s.name, s]));
      const judgeOverall = scoreMap["judge:overall"];
      const dimCells = judgeKeys.map((k) => {
        const s = scoreMap[k];
        return s != null
          ? `${(s.score * 100).toFixed(0)}${s.passed ? "" : "✗"}`
          : "—";
      });
      return (
        [
          `| ${r.kind}`,
          r.slug,
          r.locale,
          r.model.replace(/^openrouter\//, ""),
          r.passed ? "✓" : "✗",
          (r.overallScore * 100).toFixed(1),
          judgeOverall != null
            ? `${(judgeOverall.score * 100).toFixed(1)}${judgeOverall.passed ? "" : "✗"}`
            : "—",
          ...dimCells,
          r.providerCostUsd != null ? `$${r.providerCostUsd.toFixed(5)}` : "—",
          r.streamId ?? "—",
        ].join(" | ") + " |"
      );
    }),
    ``,
    `## Score Details`,
    ``,
    ...results.flatMap((r) => {
      const modelLabel = shortModel(r.model);
      const header = `### ${r.kind}:${r.slug} · ${r.locale} · ${modelLabel} ${r.passed ? "✓" : "✗"}`;
      const deterministicRows = r.scores
        .filter((s) => !s.name.startsWith("judge:"))
        .map(
          (s) =>
            `| ${s.name} | ${(s.score * 100).toFixed(0)} | ${s.passed ? "✓" : `✗ ${s.severity}`}${s.details ? ` | ${s.details}` : " |"} |`,
        );
      const judgeRows = r.scores
        .filter((s) => s.name.startsWith("judge:"))
        .map(
          (s) =>
            `| ${s.name} | ${(s.score * 100).toFixed(0)} | ${s.passed ? "✓" : `✗ ${s.severity}`}${s.details ? ` | ${s.details.slice(0, 120)}` : " |"} |`,
        );
      return [
        header,
        ``,
        r.errorMessage ? `**Error**: ${r.errorMessage}` : "",
        `| Scorer | Score | Status |`,
        `| --- | --- | --- |`,
        ...deterministicRows,
        ...judgeRows,
        ``,
      ].filter((l) => l !== "");
    }),
  ];

  writeFileSync(summaryPath, lines.join("\n"), "utf8");
}
