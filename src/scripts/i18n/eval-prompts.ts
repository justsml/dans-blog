/**
 * Prompt effectiveness evals for the i18n translation pipeline.
 *
 * Defaults to real corpus examples instead of synthetic fixtures:
 *   - most recent visible, published non-quiz article
 *   - most recent visible, published quiz
 *
 * Each generated translation is evaluated by deterministic scorers and an LLM
 * judge. The shape mirrors Braintrust's current TypeScript Eval model: a task
 * produces output, then multiple scorers evaluate it. This script stays Bun-first
 * for local runs, while keeping scorer boundaries portable to a *.eval.ts file.
 *
 * Usage:
 *   bun run i18n:eval
 *   bun run i18n:eval -- --locale ja
 *   bun run i18n:eval -- --article-slug postgres-fts-vs-pgvector
 *   bun run i18n:eval -- --quiz-slug quiz-modern-css-2025
 *   bun run i18n:eval -- --slug postgres-fts-vs-pgvector
 *   bun run i18n:eval -- --dry-run
 *
 * Braintrust notes, verified against official docs May 14, 2026:
 *   - TypeScript evals use Eval("Project", { data, task, scores, metadata }).
 *   - bt eval discovers *.eval.ts files and can run with --no-send-logs.
 *   - noSendLogs: true keeps local iteration from uploading experiments.
 */

import { appendFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import "dotenv/config";
import matter from "gray-matter";
import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import {
  OPENROUTER_USAGE_ACCOUNTING,
  usageFromResult,
} from "./llm-telemetry.ts";
import {
  buildSystemPrompt,
  buildUserPrompt,
} from "./prompts.ts";
import {
  averageJudgeScore,
  buildPrimaryJudgePrompt,
  getJudgeJsonShape,
  normalizeJudgeScores,
  parseJudgeOutput,
  type CandidateRef,
  type JudgeScoreMap,
} from "./judge-utils.ts";
import { analyzeTranslationIntegrity } from "./integrity-checks.ts";
import { parseArgs, optionalString } from "./utils.ts";
import { ACTIVE_LOCALES, isActiveLocale, type ActiveLocale } from "../../shared/i18n.ts";
import { isVisiblePostData, type PostVisibilityData } from "../../shared/postVisibility.ts";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const EVAL_REPORT_DIR = join(process.cwd(), "reports/i18n/evals");
const POSTS_DIR = join(process.cwd(), "src/content/posts");
const DEFAULT_TRANSLATION_MODEL = "openrouter/openai/gpt-oss-120b:nitro";
const DEFAULT_JUDGE_MODEL = "deepseek/deepseek-v4-flash";
const DEFAULT_LOCALE: ActiveLocale = "es";
const DEFAULT_MIN_LLM_SCORE = 72;
const TIMEOUT_MS = 90_000;

const args = parseArgs();
const translationModel = optionalString(args, "translation-model") ?? optionalString(args, "model") ?? DEFAULT_TRANSLATION_MODEL;
const judgeModel = optionalString(args, "judge-model") ?? optionalString(args, "model") ?? DEFAULT_JUDGE_MODEL;
const requestedLocale = optionalString(args, "locale");
const locale = parseLocale(requestedLocale);
const requestedSlug = optionalString(args, "slug");
const requestedArticleSlug = optionalString(args, "article-slug");
const requestedQuizSlug = optionalString(args, "quiz-slug");
const requestedKind = optionalString(args, "kind");
const isDryRun = args["dry-run"] === true;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ArticleKind = "article" | "quiz";

type RealArticleCase = {
  id: string;
  kind: ArticleKind;
  slug: string;
  sourcePath: string;
  targetRelPath: string;
  locale: ActiveLocale;
  isQuiz: boolean;
  title: string;
  source: string;
  minScore: number;
};

type CorpusPost = {
  kind: ArticleKind;
  slug: string;
  sourcePath: string;
  source: string;
  title: string;
  dateMs: number;
  data: Record<string, unknown>;
};

type DeterministicScore = {
  name: string;
  score: number;
  passed: boolean;
  severity: "high" | "medium" | "low";
  details?: string;
};

type EvalResult = {
  id: string;
  kind: ArticleKind;
  locale: ActiveLocale;
  slug: string;
  sourcePath: string;
  targetRelPath: string;
  translationModel: string;
  judgeModel: string;
  passed: boolean;
  overallScore: number | null;
  llmJudgeScore: number | null;
  deterministicScore: number;
  minScore: number;
  deterministicScores: DeterministicScore[];
  judgeScores?: JudgeScoreMap;
  judgeRationale?: string;
  errorMessage?: string;
  durationMs: number;
  inputTokens: number;
  outputTokens: number;
  providerCostUsd?: number;
};

type JudgeScore = {
  overallScore: number;
  scores: JudgeScoreMap;
  rationale: string;
};

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

mkdirSync(EVAL_REPORT_DIR, { recursive: true });
const runId = new Date().toISOString().replace(/[:.]/g, "-");
const outputPath = join(EVAL_REPORT_DIR, `eval-run-${runId}.jsonl`);
const summaryPath = join(EVAL_REPORT_DIR, `eval-run-${runId}-summary.md`);
const cases = selectEvalCases();

if (isDryRun) {
  console.log(`\nReal translation eval cases (dry run):`);
  for (const evalCase of cases) {
    console.log(`  [${evalCase.kind}] ${evalCase.slug}  locale=${evalCase.locale}  source=${relative(process.cwd(), evalCase.sourcePath)}`);
  }
  console.log(`\nModels: translation=${translationModel}  judge=${judgeModel}`);
  console.log(`Output: ${outputPath}`);
  process.exit(0);
}

console.log(`\nRunning ${cases.length} real translation eval case(s).`);
console.log(`Translation model : ${translationModel}`);
console.log(`Judge model       : ${judgeModel}`);
console.log(`Locale            : ${locale}`);
console.log(`Output            : ${outputPath}\n`);

const results: EvalResult[] = [];

for (const evalCase of cases) {
  console.log(`[eval] ${evalCase.kind}:${evalCase.slug} (${evalCase.locale}) ...`);
  const result = await runTranslationEval(evalCase);
  results.push(result);

  appendFileSync(outputPath, JSON.stringify({
    at: new Date().toISOString(),
    ...result,
  }) + "\n", "utf8");

  const status = result.passed ? "PASS" : "FAIL";
  const score = result.overallScore != null ? `  score=${result.overallScore.toFixed(1)}` : "";
  console.log(`  ${status}${score}  deterministic=${result.deterministicScore.toFixed(1)}  ${result.durationMs}ms`);
  if (!result.passed) {
    for (const scoreResult of result.deterministicScores.filter((item) => !item.passed)) {
      console.log(`    DETERMINISTIC FAIL: ${scoreResult.name}${scoreResult.details ? ` - ${scoreResult.details}` : ""}`);
    }
    if (result.errorMessage) console.log(`    ERROR: ${result.errorMessage}`);
  }
}

writeSummary(results);
console.log(`\nSummary: ${summaryPath}`);

const failCount = results.filter((result) => !result.passed).length;
if (failCount > 0) {
  console.error(`\n${failCount} eval case(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${results.length} eval case(s) passed.`);

// ---------------------------------------------------------------------------
// Case selection
// ---------------------------------------------------------------------------

function selectEvalCases(): RealArticleCase[] {
  const corpus = getPublishedCorpusPosts();
  const casesToRun: RealArticleCase[] = [];
  const kinds = parseKinds(requestedKind);

  if (
    requestedSlug != null &&
    requestedKind == null &&
    requestedArticleSlug == null &&
    requestedQuizSlug == null
  ) {
    const post = findCorpusPostBySlug(corpus, requestedSlug);
    return [toEvalCase(post, post.kind)];
  }

  if (kinds.has("article")) {
    const slug = requestedArticleSlug ?? requestedSlug;
    const post = slug != null
      ? findCorpusPost(corpus, slug, "article")
      : newestCorpusPost(corpus, "article");
    casesToRun.push(toEvalCase(post, "article"));
  }

  if (kinds.has("quiz")) {
    const slug = requestedQuizSlug ?? requestedSlug;
    const post = slug != null
      ? findCorpusPost(corpus, slug, "quiz")
      : newestCorpusPost(corpus, "quiz");
    casesToRun.push(toEvalCase(post, "quiz"));
  }

  if (casesToRun.length === 0) {
    throw new Error("No eval cases selected. Use --kind article, --kind quiz, or omit --kind for both.");
  }

  return casesToRun;
}

function getPublishedCorpusPosts(): CorpusPost[] {
  return readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(POSTS_DIR, entry.name, "index.mdx"))
    .flatMap((sourcePath) => {
      try {
        const source = readFileSync(sourcePath, "utf8");
        const parsed = matter(source);
        const data = parsed.data as Record<string, unknown>;
        if (!isVisiblePostData(data as PostVisibilityData)) return [];
        if (data.unlisted === true) return [];

        const category = typeof data.category === "string" ? data.category : "";
        const kind: ArticleKind = category === "Quiz" ? "quiz" : "article";
        const title = typeof data.title === "string" ? data.title : basename(dirname(sourcePath));
        const dateMs = getPostDateMs(data, dirname(sourcePath));
        if (!Number.isFinite(dateMs)) return [];
        if (dateMs > Date.now()) return [];

        return [{
          kind,
          slug: slugFromPostDirectory(dirname(sourcePath)),
          sourcePath,
          source,
          title,
          dateMs,
          data,
        }];
      } catch {
        return [];
      }
    })
    .sort((a, b) => b.dateMs - a.dateMs || a.slug.localeCompare(b.slug));
}

function findCorpusPostBySlug(corpus: CorpusPost[], slug: string) {
  const normalizedSlug = normalizeRequestedSlug(slug);
  const post = corpus.find((candidate) => candidate.slug === normalizedSlug);
  if (post != null) return post;
  throw new Error(`Could not find visible published post "${slug}".`);
}

function findCorpusPost(corpus: CorpusPost[], slug: string, kind: ArticleKind) {
  const normalizedSlug = normalizeRequestedSlug(slug);
  const post = corpus.find((candidate) => candidate.kind === kind && candidate.slug === normalizedSlug);
  if (post != null) return post;
  throw new Error(`Could not find visible published ${kind} "${slug}".`);
}

function newestCorpusPost(corpus: CorpusPost[], kind: ArticleKind) {
  const post = corpus.find((candidate) => candidate.kind === kind);
  if (post != null) return post;
  throw new Error(`Could not find a visible published ${kind} in src/content/posts.`);
}

function toEvalCase(post: CorpusPost, kind: ArticleKind): RealArticleCase {
  return {
    id: `${kind}:${post.slug}:${locale}`,
    kind,
    slug: post.slug,
    sourcePath: post.sourcePath,
    targetRelPath: `src/content/posts/${basename(dirname(post.sourcePath))}/${locale}/index.mdx`,
    locale,
    isQuiz: kind === "quiz",
    title: post.title,
    source: post.source,
    minScore: DEFAULT_MIN_LLM_SCORE,
  };
}

function parseKinds(value: string | undefined): Set<ArticleKind> {
  if (value == null || value === "all") return new Set(["article", "quiz"]);
  const kinds = new Set<ArticleKind>();
  for (const item of value.split(",").map((part) => part.trim())) {
    if (item === "article" || item === "quiz") kinds.add(item);
    else if (item !== "") throw new Error(`--kind must be article, quiz, or all. Received "${item}".`);
  }
  return kinds;
}

function parseLocale(value: string | undefined): ActiveLocale {
  if (value == null) return DEFAULT_LOCALE;
  if (isActiveLocale(value)) return value;
  throw new Error(`--locale must be one of ${ACTIVE_LOCALES.join(", ")}. Received "${value}".`);
}

function getPostDateMs(data: Record<string, unknown>, postDir: string) {
  const rawDate = data.date ?? data.modified;
  if (rawDate instanceof Date) return rawDate.getTime();
  if (typeof rawDate === "string" || typeof rawDate === "number") {
    const parsed = new Date(rawDate);
    if (!Number.isNaN(parsed.getTime())) return parsed.getTime();
  }

  const datePrefix = basename(postDir).match(/^(\d{4}-\d{2}-\d{2})--/);
  if (datePrefix == null) return Number.NaN;
  return new Date(`${datePrefix[1]}T00:00:00`).getTime();
}

function slugFromPostDirectory(postDir: string) {
  return basename(postDir).replace(/^\d{4}-\d{2}-\d{2}--/, "");
}

function normalizeRequestedSlug(slug: string) {
  return slug
    .replace(/^src\/content\/posts\//, "")
    .replace(/\/index\.mdx?$/, "")
    .replace(/^\d{4}-\d{2}-\d{2}--/, "");
}

// ---------------------------------------------------------------------------
// Translation task and scorers
// ---------------------------------------------------------------------------

async function runTranslationEval(evalCase: RealArticleCase): Promise<EvalResult> {
  const startedAt = Date.now();

  try {
    const chunkContext = {
      chunkIndex: 0,
      totalChunks: 1,
      articleSummary: `${evalCase.kind === "quiz" ? "Quiz" : "Technical article"}: "${evalCase.title}" (${evalCase.slug}).`,
    };
    const systemPrompt = buildSystemPrompt(evalCase.locale, evalCase.isQuiz);
    const userPrompt = buildUserPrompt(evalCase.source, evalCase.locale, chunkContext, evalCase.isQuiz);

    const provider = createOpenRouter({});
    const modelId = translationModel.replace(/^openrouter\//, "");

    const translationResult = await generateText({
      model: provider.chat(modelId, OPENROUTER_USAGE_ACCOUNTING),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.1,
      maxOutputTokens: maxOutputTokensForSource(evalCase.source),
      timeout: { totalMs: TIMEOUT_MS },
    });

    const translationOutput = translationResult.text.trim();
    const durationMs = Date.now() - startedAt;
    const telemetry = usageFromResult(translationResult.usage, durationMs, translationResult.providerMetadata);
    const deterministicScores = runDeterministicScorers(evalCase, translationOutput);
    const deterministicScore = averageDeterministicScore(deterministicScores);
    const judgeScore = await scoreWithJudge(evalCase, translationOutput);
    const llmJudgeScore = judgeScore?.overallScore ?? null;
    const overallScore = llmJudgeScore == null
      ? deterministicScore
      : (llmJudgeScore * 0.7) + (deterministicScore * 0.3);
    const blockingDeterministicPass = deterministicScores
      .filter((score) => score.severity !== "low")
      .every((score) => score.passed);
    const judgePass = llmJudgeScore == null || llmJudgeScore >= evalCase.minScore;

    return {
      id: evalCase.id,
      kind: evalCase.kind,
      locale: evalCase.locale,
      slug: evalCase.slug,
      sourcePath: evalCase.sourcePath,
      targetRelPath: evalCase.targetRelPath,
      translationModel,
      judgeModel,
      passed: blockingDeterministicPass && judgePass,
      overallScore,
      llmJudgeScore,
      deterministicScore,
      minScore: evalCase.minScore,
      deterministicScores,
      judgeScores: judgeScore?.scores,
      judgeRationale: judgeScore?.rationale,
      durationMs,
      inputTokens: telemetry.inputTokens,
      outputTokens: telemetry.outputTokens,
      providerCostUsd: telemetry.providerCostUsd,
    };
  } catch (error) {
    return {
      id: evalCase.id,
      kind: evalCase.kind,
      locale: evalCase.locale,
      slug: evalCase.slug,
      sourcePath: evalCase.sourcePath,
      targetRelPath: evalCase.targetRelPath,
      translationModel,
      judgeModel,
      passed: false,
      overallScore: null,
      llmJudgeScore: null,
      deterministicScore: 0,
      minScore: evalCase.minScore,
      deterministicScores: [],
      errorMessage: error instanceof Error ? error.message : String(error),
      durationMs: Date.now() - startedAt,
      inputTokens: 0,
      outputTokens: 0,
    };
  }
}

function runDeterministicScorers(evalCase: RealArticleCase, output: string): DeterministicScore[] {
  const issues = analyzeTranslationIntegrity({
    sourceContents: evalCase.source,
    targetContents: output,
    targetPath: `/${evalCase.targetRelPath}`,
    locale: evalCase.locale,
  });

  const scores: DeterministicScore[] = issues.map((issue) => ({
    name: `integrity:${issue.code}`,
    score: issue.severity === "low" ? 50 : 0,
    passed: issue.severity === "low",
    severity: issue.severity,
    details: issue.message,
  }));

  scores.push(scoreFrontmatterPresence(output));
  scores.push(scoreSourceTitleTranslated(evalCase, output));
  scores.push(scoreNoTranslationWrappers(output));

  return scores.length === 0
    ? [{ name: "deterministic-integrity", score: 100, passed: true, severity: "high" }]
    : scores;
}

function scoreFrontmatterPresence(output: string): DeterministicScore {
  const passed = /^---\r?\n[\s\S]*?\r?\n---/.test(output);
  return {
    name: "frontmatter-preserved",
    score: passed ? 100 : 0,
    passed,
    severity: "high",
    details: passed ? undefined : "Translated MDX must keep frontmatter delimiters.",
  };
}

function scoreSourceTitleTranslated(evalCase: RealArticleCase, output: string): DeterministicScore {
  const title = evalCase.title.trim();
  if (title.length < 8) {
    return { name: "title-translated", score: 100, passed: true, severity: "medium" };
  }

  const passed = !output.includes(`title: ${title}`) && !output.includes(`title: "${title}"`);
  return {
    name: "title-translated",
    score: passed ? 100 : 0,
    passed,
    severity: "medium",
    details: passed ? undefined : "Frontmatter title still appears to be the English source title.",
  };
}

function scoreNoTranslationWrappers(output: string): DeterministicScore {
  const passed = !/^\s*(?:here is|here's|sure[,!]?|of course|```(?:mdx|markdown)?)/i.test(output);
  return {
    name: "no-wrapper-text",
    score: passed ? 100 : 0,
    passed,
    severity: "high",
    details: passed ? undefined : "Output starts with wrapper prose or a markdown fence.",
  };
}

function averageDeterministicScore(scores: DeterministicScore[]) {
  if (scores.length === 0) return 100;
  return scores.reduce((sum, score) => sum + score.score, 0) / scores.length;
}

async function scoreWithJudge(
  evalCase: RealArticleCase,
  translation: string,
): Promise<JudgeScore | undefined> {
  try {
    const sha = "eval000000000000000000000000000000000000";
    const candidates: CandidateRef[] = [
      { id: sha, label: `<candidate id="${sha}">`, source: "commit", model: translationModel },
    ];

    const judgePrompt = [
      buildPrimaryJudgePrompt(
        `- ${sha} ${translationModel}`,
        candidates,
        "eval",
        { slug: evalCase.slug, locale: evalCase.locale, targetRelPath: evalCase.targetRelPath },
      ),
      "",
      `--- BEGIN English source ---`,
      evalCase.source,
      `--- END English source ---`,
      "",
      `--- BEGIN <candidate id="${sha}" model="${translationModel}"> ---`,
      translation,
      `--- END <candidate id="${sha}"> ---`,
      "",
      "Return strict JSON only. No markdown fences.",
      `Use this JSON shape: ${JSON.stringify(getJudgeJsonShape())}`,
    ].join("\n");

    const provider = createOpenRouter({});
    const modelId = judgeModel.replace(/^openrouter\//, "");

    const judgeResult = await generateText({
      model: provider.chat(modelId, OPENROUTER_USAGE_ACCOUNTING),
      system: [
        "You are a constrained translation judge.",
        "You cannot edit files or run shell commands.",
        "Return strict JSON only. No markdown fences.",
      ].join(" "),
      prompt: judgePrompt,
      temperature: 0.1,
      maxOutputTokens: 2000,
      timeout: { totalMs: TIMEOUT_MS },
    });

    const parsed = parseJudgeOutput(judgeResult.text);
    const scores = normalizeJudgeScores(parsed.scores);
    if (scores == null) return undefined;

    return {
      overallScore: averageJudgeScore(scores),
      scores,
      rationale: typeof parsed.rationale === "string" ? parsed.rationale : "",
    };
  } catch {
    return undefined;
  }
}

function maxOutputTokensForSource(source: string) {
  return Math.min(16_000, Math.max(4_000, Math.ceil(source.length / 2)));
}

// ---------------------------------------------------------------------------
// Summary report
// ---------------------------------------------------------------------------

function writeSummary(results: EvalResult[]) {
  const passCount = results.filter((result) => result.passed).length;
  const failCount = results.length - passCount;
  const totalCost = results.reduce((sum, result) => sum + (result.providerCostUsd ?? 0), 0);

  const lines = [
    `# Translation Eval Run - ${runId}`,
    ``,
    `| # | Kind | Slug | Locale | Pass | Overall | LLM | Deterministic | Min | Cost |`,
    `|---|------|------|--------|------|---------|-----|---------------|-----|------|`,
    ...results.map((result, index) => [
      `| ${index + 1}`,
      result.kind,
      result.slug,
      result.locale,
      result.passed ? "yes" : "no",
      result.overallScore != null ? result.overallScore.toFixed(1) : "n/a",
      result.llmJudgeScore != null ? result.llmJudgeScore.toFixed(1) : "n/a",
      result.deterministicScore.toFixed(1),
      String(result.minScore),
      result.providerCostUsd != null ? `$${result.providerCostUsd.toFixed(5)}` : "n/a",
    ].join(" | ") + " |"),
    ``,
    `**Results**: ${passCount} passed, ${failCount} failed`,
    `**Total cost**: $${totalCost.toFixed(5)}`,
    `**Translation model**: ${translationModel}`,
    `**Judge model**: ${judgeModel}`,
    ``,
    failCount > 0 ? `## Failures` : "",
    ...results
      .filter((result) => !result.passed)
      .flatMap((result) => [
        `### ${result.kind}:${result.slug}`,
        result.errorMessage ? `Error: ${result.errorMessage}` : "",
        ...result.deterministicScores
          .filter((score) => !score.passed)
          .map((score) => `- ${score.name}: ${score.details ?? "failed"}`),
        result.llmJudgeScore != null && result.llmJudgeScore < result.minScore
          ? `- LLM judge score ${result.llmJudgeScore.toFixed(1)} below minimum ${result.minScore}`
          : "",
        result.judgeRationale ? `- Judge rationale: ${result.judgeRationale}` : "",
        ``,
      ]),
  ].filter((line) => line !== "");

  writeFileSync(summaryPath, lines.join("\n"), "utf8");
}
