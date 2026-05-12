/**
 * Chunked translation script for technical articles.
 *
 * Translates MDX articles in configurable chunks to stay within context
 * windows, reduce per-request cost, and improve translation quality by
 * giving the model bounded context.
 *
 * Usage:
 *   bun run i18n:translate:chunked -- --slug my-article --locale es --chunk 5s --model openrouter/qwen/qwen3.6-plus
 *
 * Chunk formats:
 *   1p  = 1 paragraph per chunk
 *   5s  = 5 sentences per chunk
 *   1000t = ~1000 tokens per chunk
 */

import { readFileSync, existsSync, mkdirSync, writeFileSync, appendFileSync } from "node:fs";
import { dirname, join } from "node:path";
import "dotenv/config";
import matter from "gray-matter";
import { generateText } from "ai";
import { createOpenRouter, type OpenRouterProviderSettings } from "@openrouter/ai-sdk-provider";
import { parse as parseLlmString } from "llm-strings";
import {
  parseArgs,
  requireString,
  requireActiveLocale,
  getPostPaths,
  writeTextFile,
  relativeToRepo,
} from "./utils.ts";
import {
  parseChunkSize,
  extractSegments,
  chunkSegments,
  reassembleChunks,
  type Chunk,
} from "./chunker.ts";
import {
  buildSystemPrompt,
  buildUserPrompt,
  buildSummaryPrompt,
} from "./prompts.ts";
import type { ActiveLocale } from "../../shared/i18n.ts";
import { LOCALE_LABELS } from "../../shared/i18n.ts";
import { parseQuiz, assembleQuiz } from "./quiz-parser.ts";
import { translateChallenge, generateQuizDescription } from "./quiz-translator.ts";
import { estimateTokenCost, safeModelPathName } from "./translation-costs.ts";
import { cachedText, usageFromResult } from "./llm-telemetry.ts";

interface LlmConfig {
  modelId: string;
  providerSettings: OpenRouterProviderSettings;
  providerOptions: {
    openrouter: {
      reasoning: {
        effort: string;
      };
    };
  };
  reasoningEffort: string;
  temperature: number;
  maxTokens: number;
  timeoutMs: number;
}

const DEFAULT_REASONING_EFFORT = "low";
const DEFAULT_LLM_TIMEOUT_MS = 200_000;
const DEFAULT_PARALLEL_CHALLENGE_CALLS = 18;
const MAX_PARALLEL_CHALLENGE_CALLS = 18;

function resolveLlmConfig(modelInput: string): LlmConfig {
  if (modelInput.startsWith("llm://")) {
    const parsed = parseLlmString(modelInput);
    const reasoningEffort = String(
      parsed.params.reasoning_effort
        ?? parsed.params.reasoningEffort
        ?? parsed.params.effort
        ?? DEFAULT_REASONING_EFFORT,
    );

    return {
      modelId: parsed.model,
      providerSettings: {
        apiKey: parsed.apiKey,
        baseURL: parsed.host ? `https://${parsed.host}` : undefined,
      },
      providerOptions: {
        openrouter: {
          reasoning: {
            effort: reasoningEffort,
          },
        },
      },
      reasoningEffort,
      temperature: Number(parsed.params.temperature ?? parsed.params.temp ?? 0.3),
      maxTokens: Number(parsed.params.max_tokens ?? parsed.params.maxTokens ?? 16000),
      timeoutMs: Number(parsed.params.timeout_ms ?? parsed.params.timeoutMs ?? DEFAULT_LLM_TIMEOUT_MS),
    };
  }

  // Normalize opencode-style model IDs like "openrouter/qwen/qwen3.6-plus"
  const modelId = modelInput.replace(/^openrouter\//, "");

  return {
    modelId,
    providerSettings: {},
    providerOptions: {
      openrouter: {
        reasoning: {
          effort: DEFAULT_REASONING_EFFORT,
        },
      },
    },
    reasoningEffort: DEFAULT_REASONING_EFFORT,
    temperature: 0.3,
    maxTokens: 16000,
    timeoutMs: DEFAULT_LLM_TIMEOUT_MS,
  };
}

interface Telemetry {
  model: string;
  chunkSize: string;
  totalChunks: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCacheReadTokens: number;
  totalCacheWriteTokens: number;
  totalDurationMs: number;
  totalCostUsd: number;
  pricingSource: string;
  chunks: Array<{
    index: number;
    label?: string;
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    durationMs: number;
    costUsd: number;
  }>;
}

interface QuizReportOptions {
  slug: string;
  locale: ActiveLocale;
  concurrency: number;
}

interface QuizRunReporter {
  reportDir: string;
  timestamp: string;
  progressPath: string;
  writeJson(name: string, data: unknown): void;
  append(event: string, data: Record<string, unknown>): void;
}

let activeTelemetry: Telemetry | undefined;
let activeRunLabel = "translation";

function printTelemetryTotals(label: string, telemetry: Telemetry) {
  console.log(
    `${label}: ${telemetry.totalInputTokens} input, ${telemetry.totalOutputTokens} output, `
    + `${telemetry.totalCacheReadTokens} cache read, ${telemetry.totalCacheWriteTokens} cache write, `
    + `${telemetry.totalDurationMs}ms, $${telemetry.totalCostUsd.toFixed(6)} estimated`,
  );
}

function printInterruptedTotals() {
  if (activeTelemetry) {
    printTelemetryTotals(`\nInterrupted ${activeRunLabel}`, activeTelemetry);
  }
  process.exit(130);
}

process.once("SIGINT", printInterruptedTotals);
process.once("SIGTERM", printInterruptedTotals);

function createQuizRunReporter(
  slug: string,
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  concurrency: number,
): QuizRunReporter {
  const reportDir = join(process.cwd(), "reports", slug, safeModelPathName(llmConfig.modelId));
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const progressPath = join(reportDir, `progress-${timestamp}.jsonl`);

  mkdirSync(reportDir, { recursive: true });

  const reporter: QuizRunReporter = {
    reportDir,
    timestamp,
    progressPath,
    writeJson(name, data) {
      writeFileSync(join(reportDir, `${name}-${timestamp}.json`), JSON.stringify(data, null, 2), "utf8");
    },
    append(event, data) {
      appendFileSync(
        progressPath,
        JSON.stringify({
          event,
          slug,
          locale,
          model: llmConfig.modelId,
          concurrency,
          at: new Date().toISOString(),
          ...data,
        }) + "\n",
        "utf8",
      );
    },
  };

  reporter.writeJson("run", {
    slug,
    locale,
    model: llmConfig.modelId,
    reasoningEffort: llmConfig.reasoningEffort,
    temperature: llmConfig.temperature,
    maxTokens: llmConfig.maxTokens,
    timeoutMs: llmConfig.timeoutMs,
    concurrency,
    startedAt: new Date().toISOString(),
    progressPath: relativeToRepo(progressPath),
  });
  reporter.append("run_started", {});

  return reporter;
}

function addTelemetry(
  telemetry: Telemetry,
  entry: {
    index: number;
    label?: string;
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens?: number;
    cacheWriteTokens?: number;
    durationMs: number;
  },
) {
  const cacheReadTokens = entry.cacheReadTokens ?? 0;
  const cacheWriteTokens = entry.cacheWriteTokens ?? 0;
  const cost = estimateTokenCost(telemetry.model, entry.inputTokens, entry.outputTokens, cacheReadTokens);
  telemetry.chunks.push({ ...entry, cacheReadTokens, cacheWriteTokens, costUsd: cost.totalUsd });
  telemetry.totalInputTokens += entry.inputTokens;
  telemetry.totalOutputTokens += entry.outputTokens;
  telemetry.totalCacheReadTokens += cacheReadTokens;
  telemetry.totalCacheWriteTokens += cacheWriteTokens;
  telemetry.totalDurationMs += entry.durationMs;
  telemetry.totalCostUsd += cost.totalUsd;
  if (telemetry.pricingSource === "unknown" && cost.pricingSource !== "unknown") {
    telemetry.pricingSource = cost.pricingSource;
  }
  return cost;
}

function createTelemetry(llmConfig: LlmConfig, chunkSize: string, totalChunks: number): Telemetry {
  return {
    model: llmConfig.modelId,
    chunkSize,
    totalChunks,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalCacheReadTokens: 0,
    totalCacheWriteTokens: 0,
    totalDurationMs: 0,
    totalCostUsd: 0,
    pricingSource: estimateTokenCost(llmConfig.modelId, 0, 0).pricingSource,
    chunks: [],
  };
}

async function mapLimit<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => runWorker()),
  );
  return results;
}

function normalizeCandidateForLocale(source: string, translatedBody: string): string {
  // Adjust asset paths: locale files live one folder deeper
  let result = translatedBody
    .replace(/]\(\.\//g, "](../")
    .replace(/src="\.\//g, 'src="../')
    .replace(/from '\.\.\/..\/..\//g, "from '../../../../")
    .replace(/from "\.\.\/..\/..\//g, 'from "../../../../');

  result = normalizeNestedCodeFences(result);

  // Ensure all source import lines are present (insert at top of body)
  const sourceImports = (source.match(/^import\s+.*?\s+from\s+['"].*?['"];?\s*$/gm) || [])
    .map((imp) => imp
      .replace(/from '\.\.\/..\/..\//g, "from '../../../../")
      .replace(/from "\.\.\/..\/..\//g, 'from "../../../../'));
  const translatedImports = result.match(/^import\s+.*?\s+from\s+['"].*?['"];?\s*$/gm) || [];

  const missing = sourceImports.filter(
    (imp) => !translatedImports.some((t) => t.trim() === imp.trim()),
  );

  if (missing.length > 0) {
    result = missing.join("\n") + "\n\n" + result;
  }

  return result;
}

function normalizeNestedCodeFences(source: string) {
  let lines = source.split("\n");
  let changed = true;

  while (changed) {
    changed = false;
    for (let index = 0; index < lines.length - 3; index++) {
      if (!isFenceLine(lines[index]) || !isFenceLine(lines[index + 1])) continue;

      for (let closing = index + 2; closing < lines.length - 1; closing++) {
        if (!isClosingFenceLine(lines[closing]) || !isClosingFenceLine(lines[closing + 1])) {
          continue;
        }

        lines.splice(closing, 1);
        lines.splice(index + 1, 1);
        changed = true;
        break;
      }
    }
  }

  return lines.join("\n");
}

function isFenceLine(line: string | undefined) {
  return /^\s*```[\w-]*\s*$/.test(line ?? "");
}

function isClosingFenceLine(line: string | undefined) {
  return /^\s*```\s*$/.test(line ?? "");
}

async function translateChunk(
  chunk: Chunk,
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  articleSummary: string,
  previousTranslation: string | undefined,
  isQuiz: boolean,
): Promise<{
  text: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  durationMs: number;
}> {
  const start = performance.now();

  const system = buildSystemPrompt(locale, isQuiz);
  const user = buildUserPrompt(chunk.text, locale, {
    chunkIndex: chunk.index,
    totalChunks: chunk.totalChunks ?? chunk.index + 1,
    previousTranslation,
    articleSummary,
  }, isQuiz);

  const provider = createOpenRouter(llmConfig.providerSettings);
  const model = provider.chat(llmConfig.modelId);

  const result = await generateText({
    model,
    system,
    prompt: user,
    temperature: llmConfig.temperature,
    maxOutputTokens: llmConfig.maxTokens,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });

  const durationMs = Math.round(performance.now() - start);
  const usage = usageFromResult(result.usage, durationMs);

  return {
    text: result.text,
    ...usage,
  };
}

async function generateSummary(
  title: string,
  body: string,
  llmConfig: LlmConfig,
  isQuiz: boolean,
): Promise<string> {
  const provider = createOpenRouter(llmConfig.providerSettings);
  const model = provider.chat(llmConfig.modelId);
  const result = await generateText({
    model,
    system:
      "You are a technical editor. Write concise, accurate summaries of technical articles.",
    prompt: buildSummaryPrompt(title, body, isQuiz),
    temperature: llmConfig.temperature,
    maxOutputTokens: 500,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });
  return result.text.trim();
}

async function translateQuiz(
  sourceBody: string,
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  skipSummary: boolean,
  dryRun: boolean,
  reportOptions: QuizReportOptions,
): Promise<{ body: string; telemetry: Telemetry; articleSummary: string }> {
  console.log("🧩 Parsing quiz structure...");
  const quiz = parseQuiz(sourceBody);
  console.log(`   ${quiz.challenges.length} challenges found\n`);

  const reporter = dryRun
    ? undefined
    : createQuizRunReporter(reportOptions.slug, locale, llmConfig, reportOptions.concurrency);
  reporter?.writeJson("parsed-quiz", {
    challengeCount: quiz.challenges.length,
    introLength: quiz.intro.length,
    outroLength: quiz.outro.length,
    challenges: quiz.challenges.map((challenge) => ({
      index: challenge.index,
      title: challenge.title,
      group: challenge.group,
      optionCount: challenge.options.length,
    })),
  });
  reporter?.append("quiz_parsed", { challengeCount: quiz.challenges.length });

  const telemetry = createTelemetry(llmConfig, "quiz", quiz.challenges.length);
  activeTelemetry = telemetry;
  activeRunLabel = `${reportOptions.slug} [${locale}]`;

  // Generate quiz description
  let quizDescription = "";
  if (!skipSummary) {
    console.log("📝 Generating quiz description...");
    const summary = await generateQuizDescription(quiz, llmConfig);
    quizDescription = summary.description;
    const cost = addTelemetry(telemetry, {
      index: -1,
      label: "quiz-summary",
      inputTokens: summary.telemetry.inputTokens,
      outputTokens: summary.telemetry.outputTokens,
      cacheReadTokens: summary.telemetry.cacheReadTokens,
      cacheWriteTokens: summary.telemetry.cacheWriteTokens,
      durationMs: summary.telemetry.durationMs,
    });
    reporter?.writeJson("quiz-summary", {
      description: quizDescription,
      rawText: summary.rawText,
      telemetry: summary.telemetry,
      cost,
    });
    reporter?.append("summary_done", {
      inputTokens: summary.telemetry.inputTokens,
      outputTokens: summary.telemetry.outputTokens,
      cacheReadTokens: summary.telemetry.cacheReadTokens,
      cacheWriteTokens: summary.telemetry.cacheWriteTokens,
      durationMs: summary.telemetry.durationMs,
      costUsd: cost.totalUsd,
    });
    console.log(`   ${quizDescription.split("\n")[0]}\n`);
  } else {
    quizDescription = "Technical quiz. Translate each challenge precisely.";
  }

  if (dryRun) {
    console.log("🧪 Dry run — printing first challenge payload:");
    console.log("---");
    const first = quiz.challenges[0];
    if (first) {
      console.log(JSON.stringify({
        title: first.title,
        group: first.group,
        options: first.options.map(o => ({ text: o.text, hint: o.hint })),
      }, null, 2));
    }
    console.log("---");
    console.log("\nExiting without translation.");
    return { body: sourceBody, telemetry: createEmptyTelemetry(llmConfig, "quiz"), articleSummary: quizDescription };
  }

  let translatedIntro = quiz.intro;
  if (quiz.intro) {
    console.log("🔄 Translating quiz intro...");
    reporter?.append("intro_started", {});
    const intro = await translateProse(quiz.intro, locale, llmConfig, quizDescription);
    translatedIntro = intro.text;
    const cost = addTelemetry(telemetry, { index: -2, label: "intro", ...intro });
    reporter?.writeJson("intro", { text: translatedIntro, telemetry: intro, cost });
    reporter?.append("intro_done", {
      inputTokens: intro.inputTokens,
      outputTokens: intro.outputTokens,
      cacheReadTokens: intro.cacheReadTokens,
      cacheWriteTokens: intro.cacheWriteTokens,
      durationMs: intro.durationMs,
      costUsd: cost.totalUsd,
    });
    console.log("   ✅ Intro done\n");
  }

  const translatedChallenges = await mapLimit(
    quiz.challenges,
    reportOptions.concurrency,
    async (challenge, i) => {
      console.log(`🎯 Translating challenge ${i + 1}/${quiz.challenges.length}: "${challenge.title}"`);
      reporter?.append("challenge_started", { index: i, title: challenge.title });

      try {
        const { challenge: translatedChallenge, translation, rawText, telemetry: t } = await translateChallenge(
          challenge,
          locale,
          llmConfig,
          quizDescription,
          true,
        );

        const cost = addTelemetry(telemetry, {
          index: i,
          label: challenge.title,
          inputTokens: t.inputTokens,
          outputTokens: t.outputTokens,
          cacheReadTokens: t.cacheReadTokens,
          cacheWriteTokens: t.cacheWriteTokens,
          durationMs: t.durationMs,
        });

        reporter?.writeJson(`challenge-${String(i + 1).padStart(2, "0")}`, {
          index: i,
          originalTitle: challenge.title,
          translatedTitle: translatedChallenge.title,
          translation,
          rawText,
          telemetry: t,
          cost,
        });
        reporter?.append("challenge_done", {
          index: i,
          title: challenge.title,
          inputTokens: t.inputTokens,
          outputTokens: t.outputTokens,
          cacheReadTokens: t.cacheReadTokens,
          cacheWriteTokens: t.cacheWriteTokens,
          durationMs: t.durationMs,
          costUsd: cost.totalUsd,
        });

        console.log(
          `   ✅ Challenge ${i + 1} done in ${t.durationMs}ms | input: ${t.inputTokens} | output: ${t.outputTokens} | cost: $${cost.totalUsd.toFixed(6)}`,
        );
        return translatedChallenge;
      } catch (err) {
        reporter?.writeJson(`challenge-${String(i + 1).padStart(2, "0")}-error`, {
          index: i,
          title: challenge.title,
          error: err instanceof Error ? err.message : String(err),
        });
        reporter?.append("challenge_failed", {
          index: i,
          title: challenge.title,
          error: err instanceof Error ? err.message : String(err),
        });
        throw err;
      }
    },
  );

  let translatedOutro = quiz.outro;
  if (quiz.outro) {
    console.log("\n🔄 Translating quiz outro...");
    reporter?.append("outro_started", {});
    const outro = await translateProse(quiz.outro, locale, llmConfig, quizDescription);
    translatedOutro = outro.text;
    const cost = addTelemetry(telemetry, { index: -3, label: "outro", ...outro });
    reporter?.writeJson("outro", { text: translatedOutro, telemetry: outro, cost });
    reporter?.append("outro_done", {
      inputTokens: outro.inputTokens,
      outputTokens: outro.outputTokens,
      cacheReadTokens: outro.cacheReadTokens,
      cacheWriteTokens: outro.cacheWriteTokens,
      durationMs: outro.durationMs,
      costUsd: cost.totalUsd,
    });
    console.log("   ✅ Outro done\n");
  }

  const translatedQuiz = {
    intro: translatedIntro,
    challenges: translatedChallenges,
    outro: translatedOutro,
  };

  const body = assembleQuiz(translatedQuiz);
  const summary = {
    slug: reportOptions.slug,
    locale,
    model: llmConfig.modelId,
    challengeCount: quiz.challenges.length,
    totalInputTokens: telemetry.totalInputTokens,
    totalOutputTokens: telemetry.totalOutputTokens,
    totalCacheReadTokens: telemetry.totalCacheReadTokens,
    totalCacheWriteTokens: telemetry.totalCacheWriteTokens,
    totalDurationMs: telemetry.totalDurationMs,
    totalCostUsd: telemetry.totalCostUsd,
    pricingSource: telemetry.pricingSource,
    progressPath: reporter ? relativeToRepo(reporter.progressPath) : undefined,
  };
  reporter?.writeJson("summary", summary);
  reporter?.append("run_done", summary);
  return { body, telemetry, articleSummary: quizDescription };
}

async function translateProse(
  text: string,
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  context: string,
): Promise<{
  text: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  durationMs: number;
}> {
  const start = performance.now();
  const provider = createOpenRouter(llmConfig.providerSettings);
  const model = provider.chat(llmConfig.modelId);

  const result = await generateText({
    model,
    allowSystemInMessages: true,
    messages: [
      {
        role: "system",
        content: buildSystemPrompt(locale, true),
      },
      {
        role: "user",
        content: [
          cachedText(`QUIZ CONTEXT:\n${context}`),
          {
            type: "text",
            text: [
              `Translate the following prose into ${LOCALE_LABELS[locale]}:`,
              `---`,
              text,
              `---`,
            ].join("\n"),
          },
        ],
      },
    ],
    temperature: llmConfig.temperature,
    maxOutputTokens: llmConfig.maxTokens,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });
  const durationMs = Math.round(performance.now() - start);
  const usage = usageFromResult(result.usage, durationMs);

  return {
    text: result.text.trim(),
    ...usage,
  };
}

function createEmptyTelemetry(llmConfig: LlmConfig, chunkSize: string): Telemetry {
  return {
    model: llmConfig.modelId,
    chunkSize,
    totalChunks: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalCacheReadTokens: 0,
    totalCacheWriteTokens: 0,
    totalDurationMs: 0,
    totalCostUsd: 0,
    pricingSource: estimateTokenCost(llmConfig.modelId, 0, 0).pricingSource,
    chunks: [],
  };
}

function parseQuizConcurrency(value: string | boolean | undefined) {
  if (value === undefined || value === true) return DEFAULT_PARALLEL_CHALLENGE_CALLS;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`--quiz-concurrency must be a positive integer. Received "${value}".`);
  }
  return Math.min(parsed, MAX_PARALLEL_CHALLENGE_CALLS);
}

async function main() {
  const options = parseArgs();
  const slug = requireString(options, "slug");
  const locale = requireActiveLocale(options);
  const modelId = requireString(options, "model");
  const chunkSizeInput = options["chunk"] as string | undefined;
  const skipSummary = options["skip-summary"] === true;
  const dryRun = options["dry-run"] === true;
  const quizConcurrency = parseQuizConcurrency(options["quiz-concurrency"]);

  const llmConfig = resolveLlmConfig(modelId);
  const { sourcePath, targetPath, reportDir } = getPostPaths(slug, locale);

  if (!existsSync(sourcePath)) {
    throw new Error(`Source file not found: ${sourcePath}`);
  }

  const sourceRaw = readFileSync(sourcePath, "utf8");
  const parsed = matter(sourceRaw);
  const sourceBody = parsed.content;
  const isQuiz = parsed.data.category === "Quiz";

  console.log(`\n📄 Source: ${relativeToRepo(sourcePath)}`);
  console.log(`🎯 Target: ${relativeToRepo(targetPath)}`);
  console.log(`🌐 Locale: ${locale}`);
  if (isQuiz) {
    console.log(`✂️  Strategy: 1 question per API call, ${quizConcurrency} parallel challenge calls`);
  } else {
    if (!chunkSizeInput) throw new Error(`Missing required --chunk for non-quiz articles`);
    console.log(`✂️  Chunk strategy: ${chunkSizeInput}`);
  }
  console.log(`🤖 Model: ${llmConfig.modelId} (temp=${llmConfig.temperature}, maxTokens=${llmConfig.maxTokens}, effort=${llmConfig.reasoningEffort}, timeout=${llmConfig.timeoutMs}ms)\n`);

  let translatedBody: string;
  let telemetry: Telemetry;
  let articleSummary: string;

  if (isQuiz) {
    console.log(`🎯 Quiz detected: ${slug}\n`);
    activeRunLabel = `${slug} [${locale}]`;
    const result = await translateQuiz(sourceBody, locale, llmConfig, skipSummary, dryRun, {
      slug,
      locale,
      concurrency: quizConcurrency,
    });
    if (dryRun) return;
    translatedBody = result.body;
    telemetry = result.telemetry;
    articleSummary = result.articleSummary;
  } else {
    activeRunLabel = `${slug} [${locale}]`;
    // Regular article translation
    const strategy = parseChunkSize(chunkSizeInput!);

    if (!skipSummary) {
      console.log("📝 Generating article summary...");
      articleSummary = await generateSummary(parsed.data.title ?? slug, sourceBody, llmConfig, false);
      console.log(`   Summary: ${articleSummary.slice(0, 120)}...\n`);
    } else {
      articleSummary = "No summary provided. Translate each chunk independently.";
    }

    console.log("✂️  Chunking article...");
    const segments = extractSegments(sourceBody);
    const chunks = chunkSegments(segments, strategy);
    console.log(`   ${chunks.length} chunks created\n`);

    if (dryRun) {
      console.log("🧪 Dry run — printing first chunk:");
      console.log("---");
      console.log(chunks[0]?.text ?? "(no chunks)");
      console.log("---");
      console.log("\nExiting without translation.");
      return;
    }

    const result = await translateArticleChunks(chunks, locale, llmConfig, articleSummary);
    translatedBody = reassembleChunks(result.translatedChunks);
    telemetry = result.telemetry;
  }

  const normalizedBody = normalizeCandidateForLocale(sourceRaw, translatedBody);

  // Build frontmatter
  const frontmatter: Record<string, unknown> = { ...parsed.data };
  const translatedFrontmatter = await translateFrontmatter(frontmatter, locale, llmConfig, isQuiz);
  const frontmatterYaml = matter.stringify("", translatedFrontmatter).trim();

  const finalOutput = frontmatterYaml + "\n" + normalizedBody;

  // Write output
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, finalOutput, "utf8");

  // Write telemetry report
  const reportName = chunkSizeInput ?? (isQuiz ? "quiz" : "article");
  const reportPath = join(reportDir, `chunked-${reportName.replace(/[^a-z0-9]/gi, "")}.md`);
  writeTextFile(reportPath, formatTelemetryReport(telemetry, articleSummary));

  console.log(`\n✅ Translation written to ${relativeToRepo(targetPath)}`);
  console.log(`📊 Report written to ${relativeToRepo(reportPath)}`);
  console.log(
    `   Total: ${telemetry.totalInputTokens} input tokens, ${telemetry.totalOutputTokens} output tokens, ${telemetry.totalDurationMs}ms, $${telemetry.totalCostUsd.toFixed(6)} estimated`,
  );
  printTelemetryTotals(`Article totals for ${slug} [${locale}]`, telemetry);
}

async function translateArticleChunks(
  chunks: Chunk[],
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  articleSummary: string,
): Promise<{ translatedChunks: Chunk[]; telemetry: Telemetry }> {
  const translatedChunks: Chunk[] = [];
  const telemetry = createTelemetry(llmConfig, "article", chunks.length);
  activeTelemetry = telemetry;

  let previousTranslation: string | undefined;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    chunk.totalChunks = chunks.length;

    console.log(`🔄 Translating chunk ${i + 1}/${chunks.length}...`);

    const { text, inputTokens, outputTokens, cacheReadTokens, cacheWriteTokens, durationMs } = await translateChunk(
      chunk,
      locale,
      llmConfig,
      articleSummary,
      previousTranslation,
      false,
    );

    const cost = addTelemetry(telemetry, {
      index: i,
      inputTokens,
      outputTokens,
      cacheReadTokens,
      cacheWriteTokens,
      durationMs,
    });

    translatedChunks.push({
      index: i,
      segments: [{ type: "text", content: text }],
      text,
    });

    previousTranslation = text;

    console.log(
      `   ✅ Done in ${durationMs}ms | input: ${inputTokens} (${cacheReadTokens} cached read, ${cacheWriteTokens} cached write) | output: ${outputTokens} | cost: $${cost.totalUsd.toFixed(6)}`,
    );
  }

  return { translatedChunks, telemetry };
}

async function translateFrontmatter(
  frontmatter: Record<string, unknown>,
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  isQuiz: boolean,
): Promise<Record<string, unknown>> {
  const result = { ...frontmatter };

  for (const key of ["date", "modified", "minReleaseDate"]) {
    const value = result[key];
    if (value instanceof Date) {
      result[key] = value.toISOString().slice(0, 10);
    }
  }

  for (const [key, value] of Object.entries(result)) {
    if (
      /(?:image|cover|icon|hero|thumbnail)/i.test(key)
      && typeof value === "string"
      && /\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(value)
      && !value.startsWith("../")
      && !value.startsWith("./")
      && !value.startsWith("/")
      && !/^https?:\/\//i.test(value)
    ) {
      result[key] = `../${value}`;
    }
  }

  // Only translate reader-facing strings
  const keysToTranslate = ["title", "subTitle", "cover_alt"];

  for (const key of keysToTranslate) {
    const value = result[key];
    if (typeof value !== "string" || !value.trim()) continue;

    const provider = createOpenRouter(llmConfig.providerSettings);
    const model = provider.chat(llmConfig.modelId);
    const translation = await generateText({
      model,
      system: buildSystemPrompt(locale, isQuiz),
      prompt: `Translate the following ${key} into ${locale}. Keep it concise and natural.\n\n${value}`,
      temperature: llmConfig.temperature,
    maxOutputTokens: 500,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });

    result[key] = translation.text.trim();
  }

  return result;
}

function formatTelemetryReport(telemetry: Telemetry, summary: string): string {
  const lines: string[] = [];
  lines.push(`# Chunked Translation Report`);
  lines.push("");
  lines.push(`- **Model**: ${telemetry.model}`);
  lines.push(`- **Chunk size**: ${telemetry.chunkSize}`);
  lines.push(`- **Total chunks**: ${telemetry.totalChunks}`);
  lines.push(`- **Total input tokens**: ${telemetry.totalInputTokens}`);
  lines.push(`- **Total output tokens**: ${telemetry.totalOutputTokens}`);
  lines.push(`- **Cache read tokens**: ${telemetry.totalCacheReadTokens}`);
  lines.push(`- **Cache write tokens**: ${telemetry.totalCacheWriteTokens}`);
  lines.push(`- **Total duration**: ${telemetry.totalDurationMs}ms`);
  lines.push(`- **Estimated cost**: $${telemetry.totalCostUsd.toFixed(6)} (${telemetry.pricingSource})`);
  lines.push("");
  lines.push(`## Article Summary`);
  lines.push(summary);
  lines.push("");
  lines.push(`## Per-Chunk Telemetry`);
  lines.push("");
  lines.push("| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |");
  lines.push("|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|");
  for (const c of telemetry.chunks) {
    const label = c.label ?? (c.index >= 0 ? String(c.index + 1) : String(c.index));
    lines.push(`| ${label} | ${c.inputTokens} | ${c.cacheReadTokens} | ${c.cacheWriteTokens} | ${c.outputTokens} | ${c.durationMs} | $${c.costUsd.toFixed(6)} |`);
  }
  lines.push("");
  return lines.join("\n");
}

main().catch((err) => {
  console.error("\n❌ Translation failed:", err.message);
  process.exit(1);
});
