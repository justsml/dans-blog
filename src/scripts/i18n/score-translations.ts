import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";
import "dotenv/config";
import matter from "gray-matter";
import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { jsonrepair } from "jsonrepair";
import { ACTIVE_LOCALES, LOCALE_LABELS, isActiveLocale, type ActiveLocale } from "../../shared/i18n.ts";
import {
  getPostPaths,
  optionalString,
  parseArgs,
  parseList,
  relativeToRepo,
} from "./utils.ts";
import { usageFromResult } from "./llm-telemetry.ts";
import { estimateTokenCost, safeModelPathName } from "./translation-costs.ts";

type ScoreKey =
  | "readability"
  | "technicalAccuracy"
  | "coherence"
  | "relevance"
  | "translationQuality";

type TranslationTask = {
  slug: string;
  locale: ActiveLocale;
};

type ScoreMap = Record<ScoreKey, number>;

type ScoreResponse = {
  scores: ScoreMap;
  analysis: string;
  strengths: string[];
  issues: Array<{
    severity: "low" | "medium" | "high";
    category: ScoreKey | "mdx" | "style" | "terminology";
    note: string;
    excerpt?: string;
  }>;
  recommendation: "accept" | "polish" | "retranslate";
};

const DEFAULT_MODEL = "openrouter/google/gemini-3-flash-preview";
const DEFAULT_TASK_CONCURRENCY = 16;
const DEFAULT_TIMEOUT_MS = 200_000;
const DEFAULT_MAX_SOURCE_CHARS = 120_000;
const DEFAULT_MAX_TRANSLATION_CHARS = 120_000;
const GLOBAL_LOG_PATH = join(process.cwd(), "reports/translations-log.jsonl");

const options = parseArgs();
const model = optionalString(options, "model") ?? DEFAULT_MODEL;
const timeoutMs = parsePositiveInteger(optionalString(options, "timeout-ms"), DEFAULT_TIMEOUT_MS, "timeout-ms");
const taskConcurrency = parsePositiveInteger(optionalString(options, "task-concurrency"), DEFAULT_TASK_CONCURRENCY, "task-concurrency");
const maxSourceChars = parsePositiveInteger(optionalString(options, "max-source-chars"), DEFAULT_MAX_SOURCE_CHARS, "max-source-chars");
const maxTranslationChars = parsePositiveInteger(optionalString(options, "max-translation-chars"), DEFAULT_MAX_TRANSLATION_CHARS, "max-translation-chars");
const shouldDryRun = options["dry-run"] === true;
const isTaskWorker = options["task-worker"] === true;
const shouldOverwrite = options.overwrite === true;
const limit = parseOptionalPositiveInteger(optionalString(options, "limit"), "limit");
const outputLogPath = optionalString(options, "log") ?? GLOBAL_LOG_PATH;
const requestedSlug = optionalString(options, "slug");
const requestedSlugs = parseList(optionalString(options, "slugs"), requestedSlug == null ? [] : [requestedSlug]);
const slugs = requestedSlugs.length > 0 ? requestedSlugs : getAllPostSlugs();
const locales = getRequestedLocales();

validateScoringModel(model);

if (isTaskWorker) {
  if (slugs.length !== 1 || locales.length !== 1) {
    throw new Error("--task-worker requires exactly one --slug and one --locale.");
  }
  await processTask({ slug: slugs[0], locale: locales[0] });
} else {
  await processTasks(getScoreTasks());
}

async function processTasks(tasks: TranslationTask[]) {
  const limitedTasks = limit == null ? tasks : tasks.slice(0, limit);

  if (shouldDryRun) {
    console.log(`Translation score tasks:`);
    for (const task of limitedTasks) {
      console.log(`- ${task.locale}/${task.slug}`);
    }
    console.log(`\nModel: ${model}`);
    console.log(`Concurrency: ${taskConcurrency}`);
    console.log(`Log: ${relativeToRepo(outputLogPath)}`);
    return;
  }

  console.log(`Found ${limitedTasks.length} translation score task(s).`);
  console.log(`Processing with concurrency ${taskConcurrency}.`);

  if (limitedTasks.length === 1) {
    await processTask(limitedTasks[0]);
    return;
  }

  const failures: string[] = [];
  await mapLimit(limitedTasks, taskConcurrency, async (task, index) => {
    console.log(`\n[${index + 1}/${limitedTasks.length}] queued ${task.locale}/${task.slug}`);
    try {
      await runTaskWorker(task);
    } catch (error) {
      failures.push(`${task.locale}/${task.slug}: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  if (failures.length > 0) {
    throw new Error([
      `${failures.length} translation score task(s) failed:`,
      ...failures.map((failure) => `- ${failure}`),
    ].join("\n"));
  }
}

async function processTask(task: TranslationTask) {
  const paths = getPostPaths(task.slug, task.locale);
  if (!existsSync(paths.targetPath)) {
    console.log(`Skipping missing translation ${task.locale}/${task.slug}`);
    return;
  }

  const reportDir = paths.reportDir;
  const scoreDir = join(reportDir, "scores", safeModelPathName(model));
  const latestJsonPath = join(reportDir, "score.json");
  const latestMarkdownPath = join(reportDir, "score.md");
  const sourceText = readFileSync(paths.sourcePath, "utf8");
  const translationText = readFileSync(paths.targetPath, "utf8");
  const sourceHash = hashText(sourceText);
  const translationHash = hashText(translationText);
  const combinedHash = hashText(`${sourceHash}:${translationHash}:${model}`);
  const existingScore = readExistingScore(latestJsonPath);
  if (existingScore?.hash === combinedHash && !shouldOverwrite) {
    console.log(`Skipping current score for ${task.locale}/${task.slug}. Pass --overwrite to rescore.`);
    return;
  }

  mkdirSync(scoreDir, { recursive: true });

  const sourceStats = collectStats(sourceText);
  const translationStats = collectStats(translationText);
  const startedAt = Date.now();
  const response = await scoreTranslation({
    slug: task.slug,
    locale: task.locale,
    sourceText,
    translationText,
    sourceStats,
    translationStats,
  });
  const durationMs = Date.now() - startedAt;
  const telemetry = usageFromResult(response.usage, durationMs);
  const cost = estimateTokenCost(model, telemetry.inputTokens, telemetry.outputTokens, telemetry.cacheReadTokens);
  const generatedAt = new Date();
  const timestamp = generatedAt.toISOString().replace(/[:.]/g, "-");
  const record = {
    event: "translation_scored",
    isoDate: generatedAt.toISOString().slice(0, 10),
    at: generatedAt.toISOString(),
    slug: task.slug,
    locale: task.locale,
    model,
    sourcePath: relativeToRepo(paths.sourcePath),
    targetPath: relativeToRepo(paths.targetPath),
    reportPath: relativeToRepo(latestMarkdownPath),
    hash: combinedHash,
    sourceHash,
    translationHash,
    scores: response.parsed.scores,
    overallScore: averageScore(response.parsed.scores),
    recommendation: response.parsed.recommendation,
    stats: {
      source: sourceStats,
      translation: translationStats,
      ratios: getStatsRatios(sourceStats, translationStats),
      prompt: {
        sourceCharsIncluded: trimForPrompt(sourceText, maxSourceChars).length,
        translationCharsIncluded: trimForPrompt(translationText, maxTranslationChars).length,
        sourceTruncated: sourceText.length > maxSourceChars,
        translationTruncated: translationText.length > maxTranslationChars,
      },
    },
    costs: {
      inputTokens: telemetry.inputTokens,
      outputTokens: telemetry.outputTokens,
      cacheReadTokens: telemetry.cacheReadTokens,
      cacheWriteTokens: telemetry.cacheWriteTokens,
      durationMs: telemetry.durationMs,
      inputUsd: roundMoney(cost.inputUsd),
      outputUsd: roundMoney(cost.outputUsd),
      totalUsd: roundMoney(cost.totalUsd),
      pricingSource: cost.pricingSource,
    },
  };

  const archiveJsonPath = join(scoreDir, `${timestamp}.json`);
  const archiveMarkdownPath = join(scoreDir, `${timestamp}.md`);
  const json = JSON.stringify({
    ...record,
    analysis: response.parsed.analysis,
    strengths: response.parsed.strengths,
    issues: response.parsed.issues,
    rawText: response.rawText,
  }, null, 2);
  const markdown = renderMarkdownReport({
    task,
    record,
    analysis: response.parsed.analysis,
    strengths: response.parsed.strengths,
    issues: response.parsed.issues,
    archiveJsonPath,
  });

  writeFileSync(archiveJsonPath, json, "utf8");
  writeFileSync(archiveMarkdownPath, markdown, "utf8");
  writeFileSync(latestJsonPath, json, "utf8");
  writeFileSync(latestMarkdownPath, markdown, "utf8");
  appendJsonl(outputLogPath, toTranslationLogRecord(record));

  console.log([
    `Scored ${task.locale}/${task.slug}: ${averageScore(response.parsed.scores).toFixed(1)}/100 (${response.parsed.recommendation})`,
    `- Report: ${relativeToRepo(latestMarkdownPath)}`,
    `- Log: ${relativeToRepo(outputLogPath)}`,
  ].join("\n"));
}

async function scoreTranslation({
  slug,
  locale,
  sourceText,
  translationText,
  sourceStats,
  translationStats,
}: {
  slug: string;
  locale: ActiveLocale;
  sourceText: string;
  translationText: string;
  sourceStats: ReturnType<typeof collectStats>;
  translationStats: ReturnType<typeof collectStats>;
}) {
  const provider = createOpenRouter({});
  const language = LOCALE_LABELS[locale];
  const prompt = [
    `Score the ${language} translation for DanLevy.net article slug "${slug}".`,
    "Return strict JSON only. No markdown fences.",
    "",
    "Use 0-100 integer scores for:",
    "- readability: native flow, idiom, sentence clarity, reader comfort",
    "- technicalAccuracy: preserves technical meaning, code-adjacent nuance, warnings, constraints",
    "- coherence: consistent terminology, argument flow, section continuity",
    "- relevance: no hallucinated content, no omissions of important source ideas, no off-topic drift",
    "- translationQuality: natural target-language translation while preserving Dan's direct technical voice",
    "",
    "Be strict. Penalize untranslated reader-facing prose, broken MDX, mistranslated technical terms, and softened security/AI claims.",
    "Do not penalize preserved code blocks, file paths, URLs, import paths, API names, or inline code.",
    "If the source/translation was truncated in the prompt, score only the visible material and mention that limitation.",
    "",
    "Required JSON shape:",
    JSON.stringify({
      scores: {
        readability: 0,
        technicalAccuracy: 0,
        coherence: 0,
        relevance: 0,
        translationQuality: 0,
      },
      analysis: "2-5 sentence locale-specific assessment.",
      strengths: ["specific strength"],
      issues: [
        {
          severity: "low",
          category: "readability",
          note: "specific issue",
          excerpt: "short excerpt if useful",
        },
      ],
      recommendation: "accept",
    }),
    "",
    "# Local structural stats",
    JSON.stringify({ sourceStats, translationStats, ratios: getStatsRatios(sourceStats, translationStats) }, null, 2),
    "",
    "# English source MDX",
    "```mdx",
    trimForPrompt(sourceText, maxSourceChars),
    "```",
    "",
    `# ${language} translation MDX`,
    "```mdx",
    trimForPrompt(translationText, maxTranslationChars),
    "```",
  ].join("\n");

  const startedAt = Date.now();
  const result = await generateText({
    model: provider.chat(model.replace(/^openrouter\//, "")),
    system: [
      "You are a strict technical translation quality analyst.",
      "You understand MDX, code-heavy articles, technical quizzes, and localization quality.",
      "Return parseable JSON only.",
    ].join(" "),
    prompt,
    temperature: 0.1,
    maxOutputTokens: 2500,
    timeout: { totalMs: timeoutMs },
    providerOptions: {
      openrouter: {
        reasoning: {
          effort: "low",
        },
      },
    },
  });

  return {
    parsed: normalizeScoreResponse(parseScoreJson(result.text)),
    rawText: result.text,
    usage: result.usage,
    durationMs: Date.now() - startedAt,
  };
}

function getScoreTasks() {
  return slugs.flatMap((slug) =>
    locales
      .filter((locale) => {
        try {
          return existsSync(getPostPaths(slug, locale).targetPath);
        } catch {
          return false;
        }
      })
      .map((locale) => ({ slug, locale })),
  );
}

function getRequestedLocales() {
  const requestedLocale = optionalString(options, "locale");
  const values = parseList(optionalString(options, "locales"), requestedLocale == null ? [...ACTIVE_LOCALES] : [requestedLocale]);
  const invalidLocales = values.filter((value) => !isActiveLocale(value));

  if (invalidLocales.length > 0) {
    throw new Error(
      `--locale/--locales must use active locales: ${ACTIVE_LOCALES.join(", ")}. Received: ${invalidLocales.join(", ")}`,
    );
  }

  return values as ActiveLocale[];
}

function getAllPostSlugs() {
  const postsDir = join(process.cwd(), "src/content/posts");
  return readdirSync(postsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((directoryName) => (
      existsSync(join(postsDir, directoryName, "index.mdx"))
      || existsSync(join(postsDir, directoryName, "index.md"))
    ))
    .sort((a, b) => b.localeCompare(a))
    .map((directoryName) => directoryName.replace(/^\d{4}-\d{2}-\d{2}--/, ""));
}

function readExistingScore(path: string): { hash?: string } | undefined {
  if (!existsSync(path)) return undefined;

  try {
    const parsed = JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
    return typeof parsed.hash === "string" ? { hash: parsed.hash } : {};
  } catch {
    return {};
  }
}

function runTaskWorker(task: TranslationTask) {
  const args = [
    "run",
    "i18n:score",
    "--",
    "--task-worker",
    "--slug",
    task.slug,
    "--locale",
    task.locale,
    "--model",
    model,
    "--timeout-ms",
    String(timeoutMs),
    "--max-source-chars",
    String(maxSourceChars),
    "--max-translation-chars",
    String(maxTranslationChars),
    "--log",
    outputLogPath,
    ...optionalFlag("--overwrite", shouldOverwrite),
  ];

  return new Promise<void>((resolve, reject) => {
    const child = spawn("bun", args, {
      cwd: process.cwd(),
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`worker exited with ${signal ?? `code ${code}`}`));
    });
  });
}

async function mapLimit<T>(
  items: T[],
  maxConcurrency: number,
  worker: (item: T, index: number) => Promise<void>,
) {
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      await worker(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(maxConcurrency, items.length) }, () => runWorker()),
  );
}

function parseScoreJson(text: string): unknown {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return JSON.parse(jsonrepair(cleaned));
  }
}

function normalizeScoreResponse(value: unknown): ScoreResponse {
  if (value == null || typeof value !== "object") {
    throw new Error(`Score response was not an object: ${JSON.stringify(value)}`);
  }
  const record = value as Record<string, unknown>;
  const rawScores = record.scores;
  if (rawScores == null || typeof rawScores !== "object") {
    throw new Error(`Score response did not include scores: ${JSON.stringify(value)}`);
  }

  const scoreRecord = rawScores as Record<string, unknown>;
  const scores: ScoreMap = {
    readability: normalizeScore(scoreRecord.readability, "readability"),
    technicalAccuracy: normalizeScore(scoreRecord.technicalAccuracy, "technicalAccuracy"),
    coherence: normalizeScore(scoreRecord.coherence, "coherence"),
    relevance: normalizeScore(scoreRecord.relevance, "relevance"),
    translationQuality: normalizeScore(scoreRecord.translationQuality, "translationQuality"),
  };

  return {
    scores,
    analysis: stringValue(record.analysis) ?? "No analysis returned.",
    strengths: stringArray(record.strengths),
    issues: normalizeIssues(record.issues),
    recommendation: normalizeRecommendation(record.recommendation),
  };
}

function normalizeScore(value: unknown, key: string) {
  const score = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(score)) {
    throw new Error(`Score "${key}" must be numeric. Received ${JSON.stringify(value)}.`);
  }
  return Math.max(0, Math.min(100, Math.round(score)));
}

function normalizeIssues(value: unknown): ScoreResponse["issues"] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> => item != null && typeof item === "object")
    .map((item) => ({
      severity: normalizeSeverity(item.severity),
      category: normalizeIssueCategory(item.category),
      note: stringValue(item.note) ?? "Unspecified issue.",
      excerpt: stringValue(item.excerpt),
    }));
}

function normalizeSeverity(value: unknown): "low" | "medium" | "high" {
  return value === "high" || value === "medium" || value === "low" ? value : "medium";
}

function normalizeIssueCategory(value: unknown): ScoreResponse["issues"][number]["category"] {
  const categories = new Set(["readability", "technicalAccuracy", "coherence", "relevance", "translationQuality", "mdx", "style", "terminology"]);
  return typeof value === "string" && categories.has(value)
    ? value as ScoreResponse["issues"][number]["category"]
    : "translationQuality";
}

function normalizeRecommendation(value: unknown): ScoreResponse["recommendation"] {
  return value === "accept" || value === "polish" || value === "retranslate" ? value : "polish";
}

function collectStats(text: string) {
  const parsed = safeMatter(text);
  const body = parsed.content;
  const frontmatter = parsed.data;

  return {
    bytes: Buffer.byteLength(text, "utf8"),
    chars: text.length,
    words: countWords(body),
    paragraphs: body.split(/\n{2,}/).filter((part) => part.trim().length > 0).length,
    headings: (body.match(/^#{1,6}\s+/gm) ?? []).length,
    codeFences: (body.match(/^```/gm) ?? []).length / 2,
    inlineCodeSpans: (body.match(/`[^`\n]+`/g) ?? []).length,
    markdownLinks: (body.match(/\[[^\]]+\]\([^)]+\)/g) ?? []).length,
    images: (body.match(/!\[[^\]]*]\([^)]+\)/g) ?? []).length,
    imports: (text.match(/^import\s.+$/gm) ?? []).length,
    challengeComponents: (text.match(/<Challenge\b/g) ?? []).length,
    frontmatterKeys: Object.keys(frontmatter).sort(),
  };
}

function safeMatter(text: string) {
  try {
    return matter(text);
  } catch {
    return { content: text, data: {} as Record<string, unknown> };
  }
}

function getStatsRatios(
  sourceStats: ReturnType<typeof collectStats>,
  translationStats: ReturnType<typeof collectStats>,
) {
  return {
    chars: ratio(translationStats.chars, sourceStats.chars),
    words: ratio(translationStats.words, sourceStats.words),
    paragraphs: ratio(translationStats.paragraphs, sourceStats.paragraphs),
    codeFencesDelta: translationStats.codeFences - sourceStats.codeFences,
    challengeComponentsDelta: translationStats.challengeComponents - sourceStats.challengeComponents,
    markdownLinksDelta: translationStats.markdownLinks - sourceStats.markdownLinks,
    imagesDelta: translationStats.images - sourceStats.images,
  };
}

function toTranslationLogRecord(record: {
  event: string;
  isoDate: string;
  at: string;
  slug: string;
  locale: ActiveLocale;
  model: string;
  sourcePath: string;
  targetPath: string;
  reportPath: string;
  hash: string;
  sourceHash: string;
  translationHash: string;
  scores: ScoreMap;
  overallScore: number;
  recommendation: ScoreResponse["recommendation"];
  stats: {
    source: ReturnType<typeof collectStats>;
    translation: ReturnType<typeof collectStats>;
    ratios: ReturnType<typeof getStatsRatios>;
    prompt: {
      sourceCharsIncluded: number;
      translationCharsIncluded: number;
      sourceTruncated: boolean;
      translationTruncated: boolean;
    };
  };
  costs: {
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    durationMs: number;
    inputUsd: number;
    outputUsd: number;
    totalUsd: number;
    pricingSource: string;
  };
}) {
  return {
    event: record.event,
    isoDate: record.isoDate,
    at: record.at,
    slug: record.slug,
    locale: record.locale,
    model: record.model,
    sourcePath: record.sourcePath,
    targetPath: record.targetPath,
    reportPath: record.reportPath,
    hash: record.hash,
    sourceHash: record.sourceHash,
    translationHash: record.translationHash,
    readability: record.scores.readability,
    technicalAccuracy: record.scores.technicalAccuracy,
    coherence: record.scores.coherence,
    relevance: record.scores.relevance,
    translationQuality: record.scores.translationQuality,
    overallScore: record.overallScore,
    recommendation: record.recommendation,
    sourceChars: record.stats.source.chars,
    translationChars: record.stats.translation.chars,
    sourceWords: record.stats.source.words,
    translationWords: record.stats.translation.words,
    sourceParagraphs: record.stats.source.paragraphs,
    translationParagraphs: record.stats.translation.paragraphs,
    charRatio: record.stats.ratios.chars,
    wordRatio: record.stats.ratios.words,
    paragraphRatio: record.stats.ratios.paragraphs,
    codeFencesDelta: record.stats.ratios.codeFencesDelta,
    challengeComponentsDelta: record.stats.ratios.challengeComponentsDelta,
    markdownLinksDelta: record.stats.ratios.markdownLinksDelta,
    imagesDelta: record.stats.ratios.imagesDelta,
    sourceTruncated: record.stats.prompt.sourceTruncated,
    translationTruncated: record.stats.prompt.translationTruncated,
    inputTokens: record.costs.inputTokens,
    outputTokens: record.costs.outputTokens,
    cacheReadTokens: record.costs.cacheReadTokens,
    cacheWriteTokens: record.costs.cacheWriteTokens,
    durationMs: record.costs.durationMs,
    totalUsd: record.costs.totalUsd,
    pricingSource: record.costs.pricingSource,
  };
}

function renderMarkdownReport({
  task,
  record,
  analysis,
  strengths,
  issues,
  archiveJsonPath,
}: {
  task: TranslationTask;
  record: Record<string, unknown> & {
    model: string;
    scores: ScoreMap;
    overallScore: number;
    recommendation: string;
    costs: Record<string, unknown>;
  };
  analysis: string;
  strengths: string[];
  issues: ScoreResponse["issues"];
  archiveJsonPath: string;
}) {
  return [
    "# Translation Score",
    "",
    `- Slug: ${task.slug}`,
    `- Locale: ${task.locale}`,
    `- Model: ${record.model}`,
    `- Overall score: ${record.overallScore.toFixed(1)}/100`,
    `- Recommendation: ${record.recommendation}`,
    `- Hash: ${record.hash}`,
    `- JSON archive: ${relativeToRepo(archiveJsonPath)}`,
    "",
    "## Scores",
    "",
    markdownRow(["Metric", "Score"]),
    markdownRow(["---", "---:"]),
    ...Object.entries(record.scores).map(([key, value]) => markdownRow([key, value])),
    "",
    "## Analysis",
    "",
    analysis,
    "",
    "## Strengths",
    "",
    ...(strengths.length > 0 ? strengths.map((item) => `- ${item}`) : ["- none noted"]),
    "",
    "## Issues",
    "",
    ...(issues.length > 0
      ? issues.map((issue) => `- ${issue.severity} / ${issue.category}: ${issue.note}${issue.excerpt ? ` (${issue.excerpt})` : ""}`)
      : ["- none noted"]),
    "",
    "## Cost",
    "",
    markdownRow(["Input tokens", "Output tokens", "Cache read", "Cache write", "Duration ms", "Estimated cost"]),
    markdownRow(["---:", "---:", "---:", "---:", "---:", "---:"]),
    markdownRow([
      numberField(record.costs.inputTokens),
      numberField(record.costs.outputTokens),
      numberField(record.costs.cacheReadTokens),
      numberField(record.costs.cacheWriteTokens),
      numberField(record.costs.durationMs),
      `$${Number(record.costs.totalUsd ?? 0).toFixed(6)}`,
    ]),
    "",
  ].join("\n");
}

function averageScore(scores: ScoreMap) {
  return Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.values(scores).length;
}

function trimForPrompt(text: string, maxChars: number) {
  if (text.length <= maxChars) return text;
  const half = Math.floor((maxChars - 160) / 2);
  return [
    text.slice(0, half),
    `\n\n[... ${text.length - (half * 2)} characters omitted from middle for scoring prompt budget ...]\n\n`,
    text.slice(-half),
  ].join("");
}

function countWords(text: string) {
  return (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length;
}

function ratio(numerator: number, denominator: number) {
  if (denominator === 0) return numerator === 0 ? 1 : null;
  return Number((numerator / denominator).toFixed(3));
}

function hashText(text: string) {
  return createHash("sha256").update(text).digest("hex");
}

function appendJsonl(path: string, data: Record<string, unknown>) {
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, `${JSON.stringify(data)}\n`, "utf8");
}

function parsePositiveInteger(value: string | undefined, fallback: number, name: string) {
  if (value == null) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`--${name} must be a positive integer. Received "${value}".`);
  }
  return parsed;
}

function parseOptionalPositiveInteger(value: string | undefined, name: string) {
  if (value == null) return undefined;
  return parsePositiveInteger(value, 1, name);
}

function validateScoringModel(modelId: string) {
  const forbidden = modelId.includes("-fast")
    || modelId.startsWith("openrouter/openai/")
    || modelId.startsWith("openrouter/anthropic/");

  if (forbidden) {
    throw new Error(`Scoring model must be a cheap non-GPT/non-Anthropic, non-fast judge model. Received ${modelId}.`);
  }
}

function optionalFlag(name: string, enabled: boolean) {
  return enabled ? [name] : [];
}

function stringValue(value: unknown) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

function stringArray(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => stringValue(item)).filter((item): item is string => item != null)
    : [];
}

function roundMoney(value: number) {
  return Number(value.toFixed(8));
}

function markdownRow(values: Array<string | number>) {
  return `| ${values.map((value) => String(value).replace(/\|/g, "\\|")).join(" | ")} |`;
}

function numberField(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
