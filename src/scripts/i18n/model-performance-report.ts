import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ACTIVE_LOCALES } from "../../shared/i18n.ts";
import { run } from "./utils.ts";

type Candidate = {
  commit?: string;
  locale: string;
  model: string;
  slug: string;
  validation: string;
};

type LocaleResult = {
  slug: string;
  locale: string;
  candidates: Candidate[];
  winnerCommit?: string;
  winnerModel?: string;
  judgeModel?: string;
};

type ModelStat = {
  attempts: number;
  passed: number;
  rejected: number;
  judgedCandidates: number;
  wins: number;
  winsByLocale: Record<string, number>;
};

const REPORT_ROOT = join(process.cwd(), "reports/i18n");
const OUTPUT_PATH = join(REPORT_ROOT, "model-performance.md");
const LOCALES = [...ACTIVE_LOCALES];

const results = collectResults();
const modelStats = collectModelStats(results);
const articleRows = collectArticleRows(results);

writeFileSync(OUTPUT_PATH, renderReport({ results, modelStats, articleRows }), "utf8");
console.log(`Wrote ${OUTPUT_PATH}`);

function collectResults(): LocaleResult[] {
  if (!existsSync(REPORT_ROOT)) return [];

  return readdirSync(REPORT_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((slugEntry) => {
      const slug = slugEntry.name;
      const slugDir = join(REPORT_ROOT, slug);

      return readdirSync(slugDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((localeEntry) => collectLocaleResult(slug, localeEntry.name, join(slugDir, localeEntry.name)));
    })
    .sort((a, b) => a.slug.localeCompare(b.slug) || a.locale.localeCompare(b.locale));
}

function collectLocaleResult(slug: string, locale: string, localeDir: string): LocaleResult {
  const candidates = collectCandidateReports(slug, locale, localeDir);
  const summaryPath = join(localeDir, "judge-summary.md");
  const judgePath = join(localeDir, "judge.md");

  if (existsSync(summaryPath)) {
    const summary = readFileSync(summaryPath, "utf8");
    for (const candidate of parseSummaryCandidates(summary)) {
      const existingCandidate = candidates.find(
        (item) => item.model === candidate.model && item.slug === slug && item.locale === locale,
      );

      if (existingCandidate) {
        existingCandidate.commit = candidate.commit;
      } else {
        candidates.push({
          slug,
          locale,
          model: candidate.model,
          commit: candidate.commit,
          validation: "passed",
        });
      }
    }
  }

  const judgeText = existsSync(judgePath) ? readFileSync(judgePath, "utf8") : "";
  const winnerCommit = parseWinnerCommit(judgeText);
  const winnerModel = parseWinnerModel(judgeText, candidates, winnerCommit);
  const judgeModel = existsSync(summaryPath)
    ? parseField(readFileSync(summaryPath, "utf8"), "Judge model")
    : undefined;

  return {
    slug,
    locale,
    candidates: candidates.sort((a, b) => a.model.localeCompare(b.model)),
    winnerCommit,
    winnerModel,
    judgeModel,
  };
}

function collectCandidateReports(slug: string, locale: string, localeDir: string): Candidate[] {
  return readdirSync(localeDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => join(localeDir, entry.name))
    .filter((path) => !path.endsWith("/judge.md") && !path.endsWith("/judge-summary.md"))
    .map((path) => {
      const text = readFileSync(path, "utf8");
      return {
        slug,
        locale,
        model: parseField(text, "Model") ?? modelFromReportFilename(path),
        validation: parseField(text, "Validation") ?? "unknown",
      };
    });
}

function parseSummaryCandidates(summary: string) {
  return summary
    .split(/\r?\n/)
    .map((line) =>
      line.match(/^- ([a-f0-9]{40}) i18n candidate\([^)]+\): .+ via (.+)$/),
    )
    .filter((match): match is RegExpMatchArray => match != null)
    .map((match) => ({ commit: match[1], model: match[2].trim() }));
}

function parseWinnerCommit(judgeText: string) {
  const winnerLine = judgeText
    .split(/\r?\n/)
    .find((line) => /selected|winner|chosen|elegí|adopt|採用|選定/i.test(line));
  return winnerLine?.match(/[a-f0-9]{40}/)?.[0] ?? judgeText.match(/[a-f0-9]{40}/)?.[0];
}

function parseWinnerModel(
  judgeText: string,
  candidates: Candidate[],
  winnerCommit: string | undefined,
) {
  if (winnerCommit != null) {
    const candidate = candidates.find((item) => item.commit === winnerCommit);
    if (candidate != null) return candidate.model;
  }

  const leadingJudgeText = judgeText.split(/\r?\n/).slice(0, 12).join("\n");
  return candidates.find((candidate) => leadingJudgeText.includes(candidate.model))?.model;
}

function collectModelStats(results: LocaleResult[]) {
  const stats = new Map<
    string,
    ModelStat
  >();

  for (const result of results) {
    for (const candidate of result.candidates) {
      const item = getStat(stats, candidate.model);
      item.attempts += 1;
      if (candidate.validation === "passed") item.passed += 1;
      if (candidate.validation.startsWith("rejected")) item.rejected += 1;
      if (candidate.commit != null) item.judgedCandidates += 1;
    }

    if (result.winnerModel != null) {
      const item = getStat(stats, result.winnerModel);
      item.wins += 1;
      item.winsByLocale[result.locale] = (item.winsByLocale[result.locale] ?? 0) + 1;
    }
  }

  return [...stats.entries()]
    .map(([model, stat]) => ({
      model,
      ...stat,
      winRate: stat.judgedCandidates === 0 ? 0 : stat.wins / stat.judgedCandidates,
    }))
    .sort((a, b) => b.wins - a.wins || b.winRate - a.winRate || a.model.localeCompare(b.model));
}

function getStat(
  stats: Map<string, ModelStat>,
  model: string,
) {
  const existing = stats.get(model);
  if (existing != null) return existing;

  const created = {
    attempts: 0,
    passed: 0,
    rejected: 0,
    judgedCandidates: 0,
    wins: 0,
    winsByLocale: {} as Record<string, number>,
  };
  stats.set(model, created);
  return created;
}

function collectArticleRows(results: LocaleResult[]) {
  const bySlug = new Map<string, Map<string, LocaleResult>>();

  for (const result of results) {
    const locales = bySlug.get(result.slug) ?? new Map<string, LocaleResult>();
    locales.set(result.locale, result);
    bySlug.set(result.slug, locales);
  }

  return [...bySlug.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function renderReport({
  results,
  modelStats,
  articleRows,
}: {
  results: LocaleResult[];
  modelStats: ReturnType<typeof collectModelStats>;
  articleRows: ReturnType<typeof collectArticleRows>;
}) {
  const generatedAt = run("git", ["show", "-s", "--format=%cI", "HEAD"]);

  return [
    "# I18n Model Performance",
    "",
    `Generated from \`reports/i18n\` and Git history at \`${generatedAt}\`.`,
    "",
    "## Model Stats",
    "",
    markdownRow(["Model", "Attempts", "Passed", "Rejected", "Judged candidates", "Wins", "Win rate", ...LOCALES.map((locale) => `${locale.toUpperCase()} wins`)]),
    markdownRow(["---", "---:", "---:", "---:", "---:", "---:", "---:", ...LOCALES.map(() => "---:")]),
    ...modelStats.map((item) =>
      markdownRow([
        escapeCell(item.model),
        item.attempts,
        item.passed,
        item.rejected,
        item.judgedCandidates,
        item.wins,
        `${Math.round(item.winRate * 100)}%`,
        ...LOCALES.map((locale) => item.winsByLocale[locale] ?? 0),
      ]),
    ),
    "",
    "## Winners By Article",
    "",
    markdownRow(["Article", ...LOCALES.map((locale) => locale.toUpperCase()), "Locales judged", "Notes"]),
    markdownRow(["---", ...LOCALES.map(() => "---"), "---:", "---"]),
    ...articleRows.map(([slug, locales]) => {
      const localeResults = [...locales.values()];
      const notes = localeResults
        .filter((result) => result.winnerModel == null)
        .map((result) => `${result.locale}: no judged winner`)
        .join("; ");

      return markdownRow([
        slug,
        ...LOCALES.map((locale) => formatWinner(locales.get(locale))),
        localeResults.filter((result) => result.winnerModel != null).length,
        notes || "",
      ]);
    }),
    "",
    "## Locale Details",
    "",
    "| Article | Locale | Winner | Winner commit | Candidate commits | Attempts | Rejected | Judge |",
    "| --- | --- | --- | --- | ---: | ---: | ---: | --- |",
    ...results.map((result) =>
      markdownRow([
        result.slug,
        result.locale,
        result.winnerModel ? escapeCell(result.winnerModel) : "",
        result.winnerCommit ? `\`${result.winnerCommit.slice(0, 8)}\`` : "",
        result.candidates.filter((candidate) => candidate.commit != null).length,
        result.candidates.length,
        result.candidates.filter((candidate) => candidate.validation.startsWith("rejected")).length,
        result.judgeModel ? escapeCell(result.judgeModel) : "",
      ]),
    ),
    "",
  ].join("\n");
}

function formatWinner(result: LocaleResult | undefined) {
  if (result == null) return "";
  if (result.winnerModel == null) return "unjudged";
  const commit = result.winnerCommit == null ? "" : ` (${result.winnerCommit.slice(0, 8)})`;
  return `${escapeCell(shortModelName(result.winnerModel))}${commit}`;
}

function shortModelName(model: string) {
  return model.replace(/^openrouter\//, "");
}

function modelFromReportFilename(path: string) {
  const filename = path.split("/").at(-1) ?? "unknown";
  return filename.replace(/\.md$/, "").replaceAll("-", "/");
}

function parseField(text: string, field: string) {
  const match = text.match(new RegExp(`^- ${field}: (.+)$`, "m"));
  return match?.[1]?.trim();
}

function escapeCell(value: string) {
  return value.replaceAll("|", "\\|");
}

function markdownRow(values: Array<number | string>) {
  return `| ${values.join(" | ")} |`;
}
