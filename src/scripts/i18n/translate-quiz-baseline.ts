import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { join } from "node:path";
import { spawn, type ChildProcess } from "node:child_process";
import matter from "gray-matter";
import { ACTIVE_LOCALES, isActiveLocale, type ActiveLocale } from "../../shared/i18n.ts";
import { parseArgs, parseList, relativeToRepo } from "./utils.ts";
import { safeModelPathName } from "./translation-costs.ts";

const DEFAULT_MODELS = [
  "openrouter/qwen/qwen3.6-plus",
  "openrouter/deepseek/deepseek-v4-flash",
];
const DEFAULT_PARALLEL_CHALLENGE_CALLS = 18;
const MAX_PARALLEL_CHALLENGE_CALLS = 18;
const DEFAULT_FILE_CONCURRENCY = 6;
const MAX_FILE_CONCURRENCY = 6;

interface QuizPost {
  slug: string;
  path: string;
}

interface TranslationTask {
  slug: string;
  locale: ActiveLocale;
}

interface SummaryStats {
  totalInputTokens?: number;
  totalOutputTokens?: number;
  totalCacheReadTokens?: number;
  totalCacheWriteTokens?: number;
  totalDurationMs?: number;
  totalCostUsd?: number;
}

interface Outcome {
  slug: string;
  locale: ActiveLocale;
  status: "exists" | "missing" | "translated" | "failed" | "skipped";
  model?: string;
  stats?: SummaryStats;
}

interface Totals {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  durationMs: number;
  costUsd: number;
}

function findQuizPosts(): QuizPost[] {
  const postsDir = join(process.cwd(), "src/content/posts");

  return readdirSync(postsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const indexPath = join(postsDir, entry.name, "index.mdx");
      if (!existsSync(indexPath)) return undefined;
      const parsed = matter(readFileSync(indexPath, "utf8"));
      if (parsed.data.category !== "Quiz") return undefined;
      return {
        slug: entry.name.replace(/^\d{4}-\d{2}-\d{2}--/, ""),
        path: indexPath,
      };
    })
    .filter((post): post is QuizPost => post !== undefined)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

function resolveLocales(options: Record<string, string | boolean>): ActiveLocale[] {
  const raw = typeof options.locale === "string" ? options.locale : options.locales;
  const locales: ActiveLocale[] = [];

  for (const locale of parseList(typeof raw === "string" ? raw : undefined, [...ACTIVE_LOCALES])) {
    if (!isActiveLocale(locale)) {
      throw new Error(`Unknown locale "${locale}". Expected one of ${ACTIVE_LOCALES.join(", ")}.`);
    }
    locales.push(locale);
  }

  return locales;
}

function parseBoundedInt(
  value: string | boolean | undefined,
  fallback: number,
  max: number,
  optionName: string,
) {
  if (value === undefined || value === true) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`--${optionName} must be a positive integer. Received "${value}".`);
  }
  return Math.min(parsed, max);
}

function readSummaries(slug: string, model: string, locale: ActiveLocale) {
  const summaries: SummaryStats[] = [];
  const legacyDir = join(process.cwd(), "reports", slug, safeModelPathName(model));
  if (existsSync(legacyDir)) {
    summaries.push(...readSummaryFiles(legacyDir, locale));
  }

  const modelDir = join(process.cwd(), "reports/i18n", slug, locale, safeModelPathName(model));
  if (existsSync(modelDir)) {
    for (const entry of readdirSync(modelDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const summaryPath = join(modelDir, entry.name, "summary.json");
      if (!existsSync(summaryPath)) continue;
      try {
        const json = JSON.parse(readFileSync(summaryPath, "utf8"));
        summaries.push(normalizeSummaryStats(json));
      } catch {
        // Ignore malformed partial runs.
      }
    }
  }

  return summaries;
}

function readSummaryFiles(dir: string, locale: ActiveLocale) {
  return readdirSync(dir)
    .filter((name) => name.startsWith("summary-") && name.endsWith(".json"))
    .sort()
    .map((name) => {
      try {
        const json = JSON.parse(readFileSync(join(dir, name), "utf8"));
        return json.locale === locale ? normalizeSummaryStats(json) : undefined;
      } catch {
        return undefined;
      }
    })
    .filter((summary): summary is SummaryStats => summary !== undefined);
}

function normalizeSummaryStats(json: any): SummaryStats {
  const telemetry = json.telemetry ?? {};
  return {
    totalInputTokens: json.totalInputTokens ?? telemetry.totalInputTokens,
    totalOutputTokens: json.totalOutputTokens ?? telemetry.totalOutputTokens,
    totalCacheReadTokens: json.totalCacheReadTokens ?? telemetry.totalCacheReadTokens,
    totalCacheWriteTokens: json.totalCacheWriteTokens ?? telemetry.totalCacheWriteTokens,
    totalDurationMs: json.totalDurationMs ?? telemetry.totalDurationMs,
    totalCostUsd: json.totalCostUsd ?? telemetry.totalCostUsd,
  };
}

function latestSummary(slug: string, model: string, locale: ActiveLocale) {
  return readSummaries(slug, model, locale).at(-1);
}

function findExistingModel(slug: string, models: string[], locale: ActiveLocale) {
  return models.find((model) => readSummaries(slug, model, locale).length > 0);
}

function appendJsonl(path: string, event: string, data: Record<string, unknown>) {
  appendFileSync(path, JSON.stringify({ event, at: new Date().toISOString(), ...data }) + "\n", "utf8");
}

function addStats(totals: Totals, stats: SummaryStats | undefined) {
  totals.inputTokens += Number(stats?.totalInputTokens ?? 0);
  totals.outputTokens += Number(stats?.totalOutputTokens ?? 0);
  totals.cacheReadTokens += Number(stats?.totalCacheReadTokens ?? 0);
  totals.cacheWriteTokens += Number(stats?.totalCacheWriteTokens ?? 0);
  totals.durationMs += Number(stats?.totalDurationMs ?? 0);
  totals.costUsd += Number(stats?.totalCostUsd ?? 0);
}

function printArticleStats(outcome: Outcome) {
  const stats = outcome.stats;
  const prefix = `${outcome.slug} [${outcome.locale}] ${outcome.status}${outcome.model ? ` via ${outcome.model}` : ""}`;
  console.log(
    `${prefix}: ${Number(stats?.totalInputTokens ?? 0)} input, ${Number(stats?.totalOutputTokens ?? 0)} output, `
    + `${Number(stats?.totalCacheReadTokens ?? 0)} cache read, ${Number(stats?.totalCacheWriteTokens ?? 0)} cache write, `
    + `$${Number(stats?.totalCostUsd ?? 0).toFixed(6)} estimated`,
  );
}

function runTranslation(
  slug: string,
  locale: ActiveLocale,
  model: string,
  quizConcurrency: number,
  activeChildren: Set<ChildProcess>,
) {
  return new Promise<boolean>((resolve) => {
    const child = spawn(
      "bun",
      [
        "run",
        "i18n:translate:chunked",
        "--",
        "--slug",
        slug,
        "--locale",
        locale,
        "--chunk",
        "1p",
        "--model",
        model,
        "--quiz-concurrency",
        String(quizConcurrency),
      ],
      {
        cwd: process.cwd(),
        stdio: "inherit",
      },
    );

    activeChildren.add(child);
    child.once("close", (code) => {
      activeChildren.delete(child);
      resolve(code === 0);
    });
    child.once("error", () => {
      activeChildren.delete(child);
      resolve(false);
    });
  });
}

async function mapLimit<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
) {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => runWorker()));
  return results;
}

async function main() {
  const options = parseArgs();
  const dryRun = options["dry-run"] === true;
  const quizConcurrency = parseBoundedInt(
    options["quiz-concurrency"],
    DEFAULT_PARALLEL_CHALLENGE_CALLS,
    MAX_PARALLEL_CHALLENGE_CALLS,
    "quiz-concurrency",
  );
  const fileConcurrency = parseBoundedInt(
    options["file-concurrency"],
    DEFAULT_FILE_CONCURRENCY,
    MAX_FILE_CONCURRENCY,
    "file-concurrency",
  );
  const models = parseList(
    typeof options.models === "string" ? options.models : undefined,
    DEFAULT_MODELS,
  );
  const locales = resolveLocales(options);
  const posts = findQuizPosts();
  const limit = typeof options.limit === "string" ? Number(options.limit) : undefined;
  const selectedPosts = Number.isFinite(limit) ? posts.slice(0, limit) : posts;

  const reportDir = join(process.cwd(), "reports", "quiz-baseline");
  mkdirSync(reportDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const progressPath = join(reportDir, `progress-${timestamp}.jsonl`);
  const summaryPath = join(reportDir, `summary-${timestamp}.json`);

  const activeChildren = new Set<ChildProcess>();
  const outcomes: Outcome[] = [];
  const totals: Totals = {
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    durationMs: 0,
    costUsd: 0,
  };
  let interrupted = false;
  let finished = false;

  function writeSummary(status: "running" | "finished" | "interrupted" | "failed") {
    const payload = {
      status,
      locales,
      models,
      quizCount: selectedPosts.length,
      dryRun,
      quizConcurrency,
      fileConcurrency,
      progressPath: relativeToRepo(progressPath),
      totals,
      outcomes,
      updatedAt: new Date().toISOString(),
    };
    writeFileSync(summaryPath, JSON.stringify(payload, null, 2), "utf8");
    return payload;
  }

  function printTotals(status: string) {
    console.log(`\nBaseline ${status}: ${relativeToRepo(summaryPath)}`);
    console.log(`Progress log: ${relativeToRepo(progressPath)}`);
    console.log(
      `Totals: ${totals.inputTokens} input, ${totals.outputTokens} output, `
      + `${totals.cacheReadTokens} cache read, ${totals.cacheWriteTokens} cache write, `
      + `${totals.durationMs}ms, $${totals.costUsd.toFixed(6)} estimated`,
    );
  }

  function interrupt() {
    if (interrupted) return;
    interrupted = true;
    appendJsonl(progressPath, "baseline_interrupted", {
      activeChildren: activeChildren.size,
      totals,
    });
    for (const child of activeChildren) {
      child.kill("SIGINT");
    }
    writeSummary("interrupted");
    printTotals("interrupted");
  }

  process.once("SIGINT", interrupt);
  process.once("SIGTERM", interrupt);

  appendJsonl(progressPath, "baseline_started", {
    locales,
    models,
    quizCount: selectedPosts.length,
    dryRun,
    quizConcurrency,
    fileConcurrency,
  });
  writeSummary("running");

  const tasks: TranslationTask[] = [];
  for (const post of selectedPosts) {
    for (const locale of locales) {
      const existingModel = findExistingModel(post.slug, models, locale);
      if (existingModel) {
        const stats = latestSummary(post.slug, existingModel, locale);
        const outcome: Outcome = { slug: post.slug, locale, status: "exists", model: existingModel, stats };
        outcomes.push(outcome);
        addStats(totals, stats);
        appendJsonl(progressPath, "baseline_exists", outcome as unknown as Record<string, unknown>);
        printArticleStats(outcome);
      } else {
        tasks.push({ slug: post.slug, locale });
      }
    }
  }

  await mapLimit(tasks, fileConcurrency, async (task) => {
    if (interrupted) {
      const outcome: Outcome = { ...task, status: "skipped" };
      outcomes.push(outcome);
      appendJsonl(progressPath, "baseline_skipped", outcome as unknown as Record<string, unknown>);
      return outcome;
    }

    appendJsonl(progressPath, "baseline_missing", task as unknown as Record<string, unknown>);
    if (dryRun) {
      const outcome: Outcome = { ...task, status: "missing" };
      outcomes.push(outcome);
      appendJsonl(progressPath, "baseline_dry_run_missing", outcome as unknown as Record<string, unknown>);
      return outcome;
    }

    for (const model of models) {
      if (interrupted) break;
      appendJsonl(progressPath, "baseline_attempt_started", { ...task, model });
      const translated = await runTranslation(
        task.slug,
        task.locale,
        model,
        quizConcurrency,
        activeChildren,
      );
      const stats = latestSummary(task.slug, model, task.locale);
      appendJsonl(progressPath, "baseline_attempt_finished", {
        ...task,
        model,
        ok: translated,
        stats,
      });

      if (translated) {
        const outcome: Outcome = { ...task, status: "translated", model, stats };
        outcomes.push(outcome);
        addStats(totals, stats);
        printArticleStats(outcome);
        writeSummary("running");
        return outcome;
      }
    }

    const outcome: Outcome = { ...task, status: interrupted ? "skipped" : "failed" };
    outcomes.push(outcome);
    appendJsonl(progressPath, "baseline_failed", outcome as unknown as Record<string, unknown>);
    writeSummary("running");
    return outcome;
  });

  finished = !interrupted;
  const finalStatus = finished ? "finished" : "interrupted";
  writeSummary(finalStatus);
  appendJsonl(progressPath, `baseline_${finalStatus}`, { totals, summaryPath: relativeToRepo(summaryPath) });
  printTotals(finalStatus);

  if (interrupted) {
    process.exitCode = 130;
  }
}

main().catch((err) => {
  console.error("\n❌ Quiz baseline translation failed:", err.message);
  process.exit(1);
});
