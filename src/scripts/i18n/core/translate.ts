import matter from "gray-matter";
import { generateText as defaultGenerateText } from "../braintrust.ts";
import {
  assertGenerationNotTokenLimited,
  cachedUserMessage,
  diagnosticsFromResult,
  plainUserMessage,
  usageFromResult,
  type TranslationTelemetry,
} from "../llm-telemetry.ts";
import {
  buildCachedChunkContextPrompt,
  buildDynamicChunkPrompt,
  buildSummaryPrompt,
  buildSystemPrompt,
} from "../prompts.ts";
import {
  chunkSegments,
  extractSegments,
  parseChunkSize,
  reassembleChunks,
  type Chunk,
} from "../chunker.ts";
import {
  normalizeFrontmatterAssetPaths,
  normalizeLocalizedCandidateBody,
  omitInheritedTranslatedFrontmatter,
} from "../localized-mdx.ts";
import { assembleQuiz, parseQuiz } from "../quiz-parser.ts";
import { generateQuizDescription, translateChallenge } from "../quiz-translator.ts";
import { estimateTokenCost } from "../translation-costs.ts";
import { assertNoOutOfCreditMarker } from "../out-of-credit.ts";
import { LOCALE_LABELS, type ActiveLocale } from "../../../shared/i18n.ts";
import { createOpenRouterChatModel, resolveLlmConfig, type ResolvedLlmConfig } from "./model-config.ts";

export type GenerateTextLike = typeof defaultGenerateText;

export type TranslationChunkTelemetry = TranslationTelemetry & {
  index: number;
  label?: string;
  costUsd: number;
};

export type TranslationRunTelemetry = {
  model: string;
  chunkSize: string;
  totalChunks: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalReasoningTokens: number;
  totalCacheReadTokens: number;
  totalCacheWriteTokens: number;
  providerCostUsd?: number;
  providerUpstreamCostUsd?: number;
  totalDurationMs: number;
  totalCostUsd: number;
  pricingSource: string;
  chunks: TranslationChunkTelemetry[];
};

export type TranslateWithModelInput = {
  sourceContents: string;
  locale: ActiveLocale;
  model: string;
  slug?: string;
  chunkSize?: string;
  skipSummary?: boolean;
  quizConcurrency?: number;
  challengeRetries?: number;
  generateText?: GenerateTextLike;
  promptTuning?: TranslationPromptTuning;
};

export type TranslationPromptTuning = {
  profileId?: string;
  version?: number;
  appendSystem?: string;
  appendCachedContext?: string;
  appendDynamic?: string;
  appendFrontmatter?: string;
  appendSummary?: string;
  appendQuizProse?: string;
};

export type TranslateWithModelOutput = {
  contents: string;
  body: string;
  frontmatter: Record<string, unknown>;
  locale: ActiveLocale;
  model: string;
  isQuiz: boolean;
  articleSummary: string;
  telemetry: TranslationRunTelemetry;
};

const DEFAULT_CHUNK_SIZE = "18p";
const DEFAULT_PARALLEL_CHALLENGE_CALLS = 18;
const MAX_PARALLEL_CHALLENGE_CALLS = 32;
const DEFAULT_CHALLENGE_RETRIES = 2;
const MAX_CHALLENGE_RETRIES = 5;

export async function translateWithModel(input: TranslateWithModelInput): Promise<TranslateWithModelOutput> {
  const chunkSize = input.chunkSize ?? DEFAULT_CHUNK_SIZE;
  const llmConfig = resolveLlmConfig(input.model);
  const generateText = input.generateText ?? defaultGenerateText;
  const parsed = matter(input.sourceContents);
  const sourceBody = parsed.content;
  const isQuiz = parsed.data.category === "Quiz" || sourceBody.includes("<Challenge");

  let translatedBody: string;
  let articleSummary: string;
  let telemetry: TranslationRunTelemetry;

  if (isQuiz) {
    const result = await translateQuizBody({
      sourceBody,
      locale: input.locale,
      llmConfig,
      skipSummary: input.skipSummary ?? false,
      quizConcurrency: input.quizConcurrency ?? DEFAULT_PARALLEL_CHALLENGE_CALLS,
      challengeRetries: input.challengeRetries ?? DEFAULT_CHALLENGE_RETRIES,
      promptTuning: input.promptTuning,
    });
    translatedBody = result.body;
    articleSummary = result.articleSummary;
    telemetry = result.telemetry;
  } else {
    articleSummary = input.skipSummary === true
      ? "No summary provided. Translate each chunk independently."
      : await generateSummary({
        title: String(parsed.data.title ?? input.slug ?? "Untitled"),
        body: sourceBody,
        llmConfig,
        isQuiz: false,
        generateText,
        promptTuning: input.promptTuning,
      });

    const chunks = chunkSegments(extractSegments(sourceBody), parseChunkSize(chunkSize));
    const result = await translateArticleChunks({
      chunks,
      locale: input.locale,
      llmConfig,
      articleSummary,
      chunkSize,
      generateText,
      promptTuning: input.promptTuning,
    });
    translatedBody = reassembleChunks(result.translatedChunks);
    telemetry = result.telemetry;
  }

  const normalizedBody = normalizeLocalizedCandidateBody(input.sourceContents, translatedBody);
  const translatedFrontmatter = await translateFrontmatter({
    frontmatter: parsed.data,
    locale: input.locale,
    llmConfig,
    isQuiz,
    generateText,
    promptTuning: input.promptTuning,
  });
  const frontmatterYaml = matter.stringify("", translatedFrontmatter).trim();
  const contents = `${frontmatterYaml}\n${normalizedBody}`;

  return {
    contents,
    body: normalizedBody,
    frontmatter: translatedFrontmatter,
    locale: input.locale,
    model: llmConfig.modelId,
    isQuiz,
    articleSummary,
    telemetry,
  };
}

async function translateArticleChunks({
  chunks,
  locale,
  llmConfig,
  articleSummary,
  chunkSize,
  generateText,
  promptTuning,
}: {
  chunks: Chunk[];
  locale: ActiveLocale;
  llmConfig: ResolvedLlmConfig;
  articleSummary: string;
  chunkSize: string;
  generateText: GenerateTextLike;
  promptTuning?: TranslationPromptTuning;
}) {
  const translatedChunks: Chunk[] = [];
  const telemetry = createTelemetry(llmConfig, chunkSize, chunks.length);
  let previousTranslation: string | undefined;

  for (let i = 0; i < chunks.length; i += 1) {
    const chunk = chunks[i];
    chunk.totalChunks = chunks.length;
    const result = await translateChunk({
      chunk,
      locale,
      llmConfig,
      articleSummary,
      previousTranslation,
      previousSourceContext: paragraphContext(chunks[i - 1], "last"),
      nextSourceContext: paragraphContext(chunks[i + 1], "first"),
      isQuiz: false,
      generateText,
      promptTuning,
    });
    addTelemetry(telemetry, { index: i, ...result.telemetry });
    translatedChunks.push({
      index: i,
      segments: [{ type: "text", content: result.text }],
      text: result.text,
    });
    previousTranslation = result.text;
  }

  return { translatedChunks, telemetry };
}

async function translateChunk({
  chunk,
  locale,
  llmConfig,
  articleSummary,
  previousTranslation,
  previousSourceContext,
  nextSourceContext,
  isQuiz,
  generateText,
  promptTuning,
}: {
  chunk: Chunk;
  locale: ActiveLocale;
  llmConfig: ResolvedLlmConfig;
  articleSummary: string;
  previousTranslation?: string;
  previousSourceContext?: string;
  nextSourceContext?: string;
  isQuiz: boolean;
  generateText: GenerateTextLike;
  promptTuning?: TranslationPromptTuning;
}): Promise<{ text: string; telemetry: TranslationTelemetry }> {
  const start = performance.now();
  const context = {
    chunkIndex: chunk.index,
    totalChunks: chunk.totalChunks ?? chunk.index + 1,
    previousTranslation,
    previousSourceContext,
    nextSourceContext,
    articleSummary,
  };
  const model = createOpenRouterChatModel(llmConfig);
  assertNoOutOfCreditMarker();

  const result = await generateText({
    model,
    allowSystemInMessages: true,
    messages: [
      {
        role: "system",
        content: joinPrompt(
          "You are a technical translator. Follow the stable translation contract in the user message. Output only the requested translated text.",
          promptTuning?.appendSystem,
        ),
      },
      cachedUserMessage(joinPrompt(
        buildCachedChunkContextPrompt(locale, context, isQuiz),
        promptTuning?.appendCachedContext,
      )),
      plainUserMessage(joinPrompt(
        buildDynamicChunkPrompt(chunk.text, locale, context, isQuiz),
        promptTuning?.appendDynamic,
        "DYNAMIC PROMPT PROFILE TUNING",
      )),
    ],
    temperature: llmConfig.temperature,
    maxOutputTokens: llmConfig.maxTokens,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });

  const durationMs = Math.round(performance.now() - start);
  assertGenerationNotTokenLimited(`Translation chunk ${chunk.index + 1}/${context.totalChunks}`, result, llmConfig.maxTokens);
  return {
    text: result.text,
    telemetry: usageFromResult(result.usage, durationMs, result.providerMetadata, diagnosticsFromResult(result)),
  };
}

async function generateSummary({
  title,
  body,
  llmConfig,
  isQuiz,
  generateText,
  promptTuning,
}: {
  title: string;
  body: string;
  llmConfig: ResolvedLlmConfig;
  isQuiz: boolean;
  generateText: GenerateTextLike;
  promptTuning?: TranslationPromptTuning;
}) {
  const model = createOpenRouterChatModel(llmConfig);
  assertNoOutOfCreditMarker();
  const result = await generateText({
    model,
    system: "You are a technical editor. Write concise, accurate summaries of technical articles.",
    prompt: joinPrompt(
      buildSummaryPrompt(title, body, isQuiz),
      promptTuning?.appendSummary,
      "SUMMARY PROMPT PROFILE TUNING",
    ),
    temperature: llmConfig.temperature,
    maxOutputTokens: 500,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });
  assertGenerationNotTokenLimited("Article summary generation", result, 500);
  return result.text.trim();
}

async function translateQuizBody({
  sourceBody,
  locale,
  llmConfig,
  skipSummary,
  quizConcurrency,
  challengeRetries,
  promptTuning,
}: {
  sourceBody: string;
  locale: ActiveLocale;
  llmConfig: ResolvedLlmConfig;
  skipSummary: boolean;
  quizConcurrency: number;
  challengeRetries: number;
  promptTuning?: TranslationPromptTuning;
}) {
  const quiz = parseQuiz(sourceBody);
  const concurrency = clampInteger(quizConcurrency, 1, MAX_PARALLEL_CHALLENGE_CALLS);
  const retries = clampInteger(challengeRetries, 0, MAX_CHALLENGE_RETRIES);
  const telemetry = createTelemetry(llmConfig, "quiz", quiz.challenges.length);
  const quizDescription = skipSummary
    ? "No quiz summary provided. Translate each challenge independently."
    : (await generateQuizDescription(quiz, llmConfig, promptTuning)).description;

  const translatedIntro = quiz.intro.trim()
    ? (await translateProse(quiz.intro, locale, llmConfig, quizDescription, promptTuning)).text
    : quiz.intro;
  const translatedOutro = quiz.outro.trim()
    ? (await translateProse(quiz.outro, locale, llmConfig, quizDescription, promptTuning)).text
    : quiz.outro;

  const translatedChallenges = await mapLimit(quiz.challenges, concurrency, async (challenge, index) => {
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        const result = await translateChallenge(challenge, locale, llmConfig, quizDescription, true, promptTuning);
        addTelemetry(telemetry, {
          index,
          label: `challenge-${challenge.index}`,
          ...result.telemetry,
        });
        return result.challenge;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError instanceof Error ? lastError : new Error(String(lastError));
  });

  return {
    body: assembleQuiz({
      intro: translatedIntro,
      challenges: translatedChallenges,
      outro: translatedOutro,
    }),
    telemetry,
    articleSummary: quizDescription,
  };
}

async function translateProse(
  text: string,
  locale: ActiveLocale,
  llmConfig: ResolvedLlmConfig,
  articleSummary: string,
  promptTuning?: TranslationPromptTuning,
) {
  const start = performance.now();
  const model = createOpenRouterChatModel(llmConfig);
  assertNoOutOfCreditMarker();
  const result = await defaultGenerateText({
    model,
    allowSystemInMessages: true,
    messages: [
      {
        role: "system",
        content: joinPrompt(
          "You are a technical translator. Follow the stable quiz prose translation contract in the user message. Output only the requested translated text.",
          promptTuning?.appendSystem,
        ),
      },
      cachedUserMessage([
        "STABLE QUIZ PROSE TRANSLATION CONTRACT:",
        buildSystemPrompt(locale, true),
        promptTuning?.appendCachedContext
          ? `\nQUIZ PROMPT PROFILE TUNING:\n${promptTuning.appendCachedContext}`
          : "",
        "",
        "QUIZ SUMMARY:",
        articleSummary,
      ].join("\n")),
      plainUserMessage(joinPrompt(
        `Translate this quiz prose into ${LOCALE_LABELS[locale]}.\n\n--- START ---\n${text}\n--- END ---`,
        promptTuning?.appendQuizProse ?? promptTuning?.appendDynamic,
        "QUIZ PROSE PROMPT PROFILE TUNING",
      )),
    ],
    temperature: llmConfig.temperature,
    maxOutputTokens: llmConfig.maxTokens,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });
  assertGenerationNotTokenLimited("Quiz prose translation", result, llmConfig.maxTokens);

  return {
    text: result.text,
    ...usageFromResult(result.usage, Math.round(performance.now() - start), result.providerMetadata, diagnosticsFromResult(result)),
  };
}

async function translateFrontmatter({
  frontmatter,
  locale,
  llmConfig,
  isQuiz,
  generateText,
  promptTuning,
}: {
  frontmatter: Record<string, unknown>;
  locale: ActiveLocale;
  llmConfig: ResolvedLlmConfig;
  isQuiz: boolean;
  generateText: GenerateTextLike;
  promptTuning?: TranslationPromptTuning;
}) {
  const result = omitInheritedTranslatedFrontmatter(normalizeFrontmatterAssetPaths(frontmatter));

  for (const key of ["date", "modified", "minReleaseDate"]) {
    const value = result[key];
    if (value instanceof Date) result[key] = value.toISOString().slice(0, 10);
  }

  for (const key of ["title", "subTitle", "cover_alt"]) {
    const value = result[key];
    if (typeof value !== "string" || value.trim() === "") continue;

    const model = createOpenRouterChatModel(llmConfig);
    assertNoOutOfCreditMarker();
    const translation = await generateText({
      model,
      allowSystemInMessages: true,
      messages: [
        {
          role: "system",
          content: joinPrompt(
            "You are a technical translator. Follow the stable frontmatter translation contract in the user message. Output only the requested translated text.",
            promptTuning?.appendSystem,
          ),
        },
        cachedUserMessage([
          "STABLE FRONTMATTER TRANSLATION CONTRACT (cache this across frontmatter fields):",
          buildSystemPrompt(locale, isQuiz),
          promptTuning?.appendFrontmatter
            ? `\nFRONTMATTER PROMPT PROFILE TUNING:\n${promptTuning.appendFrontmatter}`
            : "",
        ].join("\n")),
        plainUserMessage(`Translate the following ${key} into ${LOCALE_LABELS[locale]}. Keep it concise and natural.\n\n${value}`),
      ],
      temperature: llmConfig.temperature,
      maxOutputTokens: 500,
      timeout: { totalMs: llmConfig.timeoutMs },
      providerOptions: llmConfig.providerOptions,
    });
    assertGenerationNotTokenLimited(`Frontmatter ${key} translation`, translation, 500);

    result[key] = translation.text.trim();
  }

  return result;
}

function createTelemetry(llmConfig: ResolvedLlmConfig, chunkSize: string, totalChunks: number): TranslationRunTelemetry {
  return {
    model: llmConfig.modelId,
    chunkSize,
    totalChunks,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalReasoningTokens: 0,
    totalCacheReadTokens: 0,
    totalCacheWriteTokens: 0,
    totalDurationMs: 0,
    totalCostUsd: 0,
    pricingSource: "unknown",
    chunks: [],
  };
}

function addTelemetry(
  totals: TranslationRunTelemetry,
  chunk: TranslationTelemetry & { index: number; label?: string },
) {
  const cost = estimateTokenCost(
    totals.model,
    chunk.inputTokens,
    chunk.outputTokens + chunk.reasoningTokens,
    chunk.cacheReadTokens,
    { providerCostUsd: chunk.providerCostUsd },
  );
  totals.totalInputTokens += chunk.inputTokens;
  totals.totalOutputTokens += chunk.outputTokens;
  totals.totalReasoningTokens += chunk.reasoningTokens;
  totals.totalCacheReadTokens += chunk.cacheReadTokens;
  totals.totalCacheWriteTokens += chunk.cacheWriteTokens;
  totals.totalDurationMs += chunk.durationMs;
  totals.totalCostUsd += cost.totalUsd;
  totals.pricingSource = cost.pricingSource;
  totals.providerCostUsd = addOptional(totals.providerCostUsd, chunk.providerCostUsd);
  totals.providerUpstreamCostUsd = addOptional(totals.providerUpstreamCostUsd, chunk.providerUpstreamCostUsd);
  totals.chunks.push({
    ...chunk,
    costUsd: cost.totalUsd,
  });
}

function addOptional(current: number | undefined, value: number | undefined) {
  if (value == null) return current;
  return (current ?? 0) + value;
}

function paragraphContext(chunk: Chunk | undefined, edge: "first" | "last") {
  if (chunk == null) return undefined;
  const textSegments = chunk.segments
    .filter((segment) => segment.type === "text")
    .map((segment) => segment.content.trim())
    .filter(Boolean);
  const paragraph = edge === "first" ? textSegments[0] : textSegments.at(-1);
  if (paragraph == null) return undefined;
  return paragraph.length > 700 ? `${paragraph.slice(0, 700)}...` : paragraph;
}

function joinPrompt(base: string, append: string | undefined, label = "PROMPT PROFILE TUNING") {
  if (append == null || append.trim() === "") return base;
  return [base.trim(), "", `${label}:`, append.trim()].join("\n");
}

function clampInteger(value: number, min: number, max: number) {
  if (!Number.isInteger(value)) return min;
  return Math.max(min, Math.min(max, value));
}

async function mapLimit<T, R>(
  values: T[],
  concurrency: number,
  mapper: (value: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(values.length);
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(concurrency, values.length) }, async () => {
    while (nextIndex < values.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(values[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}
