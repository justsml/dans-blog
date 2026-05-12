import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import matter from "gray-matter";
import { ACTIVE_LOCALES, isActiveLocale, type ActiveLocale } from "../../shared/i18n.ts";
import { parseArgs, parseList, relativeToRepo } from "./utils.ts";
import { safeModelPathName } from "./translation-costs.ts";

const DEFAULT_MODELS = [
  "openrouter/qwen/qwen3.6-plus",
  "openrouter/deepseek/deepseek-v4-flash",
];

interface QuizPost {
  slug: string;
  path: string;
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

function readSummaries(slug: string, model: string, locale: ActiveLocale) {
  const dir = join(process.cwd(), "reports", slug, safeModelPathName(model));
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((name) => name.startsWith("summary-") && name.endsWith(".json"))
    .map((name) => {
      try {
        const json = JSON.parse(readFileSync(join(dir, name), "utf8"));
        return json.locale === locale ? json : undefined;
      } catch {
        return undefined;
      }
    })
    .filter(Boolean);
}

function hasModelOutput(slug: string, models: string[], locale: ActiveLocale) {
  return models.some((model) => readSummaries(slug, model, locale).length > 0);
}

function appendJsonl(path: string, event: string, data: Record<string, unknown>) {
  appendFileSync(path, JSON.stringify({ event, at: new Date().toISOString(), ...data }) + "\n", "utf8");
}

function runTranslation(slug: string, locale: ActiveLocale, model: string, concurrency: number) {
  const result = spawnSync(
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
      String(concurrency),
    ],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      encoding: "utf8",
    },
  );

  return result.status === 0;
}

function collectStats(slug: string, model: string, locale: ActiveLocale) {
  const summaries = readSummaries(slug, model, locale);
  return summaries.at(-1);
}

async function main() {
  const options = parseArgs();
  const dryRun = options["dry-run"] === true;
  const concurrency = Math.min(Number(options["quiz-concurrency"] ?? 8), 8);
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

  appendJsonl(progressPath, "baseline_started", {
    locales,
    models,
    quizCount: selectedPosts.length,
    dryRun,
  });

  const outcomes = [];

  for (const post of selectedPosts) {
    for (const locale of locales) {
      if (hasModelOutput(post.slug, models, locale)) {
        const existingModel = models.find((model) => readSummaries(post.slug, model, locale).length > 0);
        appendJsonl(progressPath, "baseline_exists", {
          slug: post.slug,
          locale,
          model: existingModel,
        });
        outcomes.push({ slug: post.slug, locale, status: "exists", model: existingModel });
        continue;
      }

      appendJsonl(progressPath, "baseline_missing", { slug: post.slug, locale });
      if (dryRun) {
        outcomes.push({ slug: post.slug, locale, status: "missing" });
        continue;
      }

      let translated = false;
      for (const model of models) {
        appendJsonl(progressPath, "baseline_attempt_started", { slug: post.slug, locale, model });
        translated = runTranslation(post.slug, locale, model, concurrency);
        appendJsonl(progressPath, "baseline_attempt_finished", {
          slug: post.slug,
          locale,
          model,
          ok: translated,
        });
        if (translated) {
          outcomes.push({ slug: post.slug, locale, status: "translated", model, stats: collectStats(post.slug, model, locale) });
          break;
        }
      }

      if (!translated) {
        outcomes.push({ slug: post.slug, locale, status: "failed" });
      }
    }
  }

  const totals = outcomes.reduce(
    (acc, outcome) => {
      const stats = "stats" in outcome ? outcome.stats as Record<string, unknown> | undefined : undefined;
      acc.inputTokens += Number(stats?.totalInputTokens ?? 0);
      acc.outputTokens += Number(stats?.totalOutputTokens ?? 0);
      acc.costUsd += Number(stats?.totalCostUsd ?? 0);
      return acc;
    },
    { inputTokens: 0, outputTokens: 0, costUsd: 0 },
  );

  const summaryPath = join(reportDir, `summary-${timestamp}.json`);
  writeFileSync(summaryPath, JSON.stringify({
    locales,
    models,
    quizCount: selectedPosts.length,
    dryRun,
    progressPath: relativeToRepo(progressPath),
    totals,
    outcomes,
  }, null, 2), "utf8");
  appendJsonl(progressPath, "baseline_finished", { totals, summaryPath: relativeToRepo(summaryPath) });

  console.log(`\nBaseline report: ${relativeToRepo(summaryPath)}`);
  console.log(`Progress log: ${relativeToRepo(progressPath)}`);
  console.log(
    `Totals from newly translated runs: ${totals.inputTokens} input tokens, ${totals.outputTokens} output tokens, $${totals.costUsd.toFixed(6)} estimated`,
  );
}

main().catch((err) => {
  console.error("\n❌ Quiz baseline translation failed:", err.message);
  process.exit(1);
});
