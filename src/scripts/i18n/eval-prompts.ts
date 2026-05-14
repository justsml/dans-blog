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

import { appendFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import "dotenv/config";
import matter from "gray-matter";
import { BRAINTRUST_PROJECT_NAME, braintrustEnabled, generateText, tracedEval } from "./braintrust.ts";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_USAGE_ACCOUNTING, usageFromResult } from "./llm-telemetry.ts";
import { buildSystemPrompt, buildUserPrompt } from "./prompts.ts";
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
import { resolveCheapFastTranslationModels } from "./model-presets.ts";
import { parseArgs, optionalString, parseList } from "./utils.ts";
import { ACTIVE_LOCALES, isActiveLocale, type ActiveLocale } from "../../shared/i18n.ts";
import { isVisiblePostData, type PostVisibilityData } from "../../shared/postVisibility.ts";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const POSTS_DIR = join(process.cwd(), "src/content/posts");
const EVAL_REPORT_DIR = join(process.cwd(), "reports/i18n/evals");
const DEFAULT_LOCALE: ActiveLocale = "es";
const DEFAULT_MIN_SCORE = 72;
const DEFAULT_MODELS = [
  "openrouter/openai/gpt-oss-120b:nitro",
  "openrouter/deepseek/deepseek-v4-flash",
];
const DEFAULT_JUDGE_MODEL = "openrouter/google/gemini-3-flash-preview";
const TIMEOUT_MS = 90_000;

const args = parseArgs();
const locales = parseLocales(optionalString(args, "locales") ?? optionalString(args, "locale"));
const judgeModel = (optionalString(args, "judge-model") ?? DEFAULT_JUDGE_MODEL).replace(/^openrouter\//, "");
const translationModels = resolveCheapFastTranslationModels(
  parseList(optionalString(args, "models"), DEFAULT_MODELS),
);
const requestedSlug = optionalString(args, "slug");
const requestedKind = optionalString(args, "kind") ?? "all";
const isDryRun = args["dry-run"] === true;

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
};

// ---------------------------------------------------------------------------
// Scorers  (pure functions: (input, output) => Score | Score[])
// ---------------------------------------------------------------------------

function scoreIntegrity(input: EvalInput, output: EvalOutput): Score[] {
  const issues = analyzeTranslationIntegrity({
    sourceContents: input.source,
    targetContents: output.translation,
    targetPath: `/${input.slug}/${input.locale}/index.mdx`,
    locale: input.locale,
  });

  return issues.map((issue) => ({
    name: `integrity:${issue.code}`,
    score: issue.severity === "low" ? 0.5 : 0,
    passed: issue.severity === "low",
    severity: issue.severity,
    details: issue.message,
  }));
}

function scoreFrontmatter(_input: EvalInput, output: EvalOutput): Score {
  const passed = /^---\r?\n[\s\S]*?\r?\n---/.test(output.translation);
  return {
    name: "frontmatter-preserved",
    score: passed ? 1 : 0,
    passed,
    severity: "high",
    details: passed ? undefined : "Output must retain YAML frontmatter delimiters.",
  };
}

function scoreTitleTranslated(input: EvalInput, output: EvalOutput): Score {
  const title = input.title.trim();
  if (title.length < 8 || /^[A-Z0-9 _-]{1,20}$/.test(title)) {
    return { name: "title-translated", score: 1, passed: true, severity: "medium" };
  }
  const passed = !output.translation.includes(`title: ${title}`) &&
    !output.translation.includes(`title: "${title}"`);
  return {
    name: "title-translated",
    score: passed ? 1 : 0,
    passed,
    severity: "medium",
    details: passed ? undefined : "Frontmatter title is still the English source title.",
  };
}

function scoreNoWrapperText(_input: EvalInput, output: EvalOutput): Score {
  const passed = !/^\s*(?:here is|here's|sure[,!]?|of course[,!]?|```(?:mdx|markdown)?)/i.test(output.translation);
  return {
    name: "no-wrapper-text",
    score: passed ? 1 : 0,
    passed,
    severity: "high",
    details: passed ? undefined : "Output starts with wrapper prose or an unwrapped code fence.",
  };
}

type JudgeResult = {
  scores: Score[];
  judgeScores?: JudgeScoreMap;
};

async function scoreLlmJudge(input: EvalInput, output: EvalOutput): Promise<JudgeResult> {
  const fail = (details: string): JudgeResult => ({
    scores: [{ name: "judge:overall", score: 0, passed: false, severity: "medium", details }],
  });

  try {
    const sha = "eval000000000000000000000000000000000000";
    const candidates: CandidateRef[] = [
      { id: sha, label: `<candidate id="${sha}">`, source: "commit", model: output.model },
    ];
    const targetRelPath = `src/content/posts/${basename(dirname(input.sourcePath))}/${input.locale}/index.mdx`;
    const prompt = [
      buildPrimaryJudgePrompt(`- ${sha} ${output.model}`, candidates, "eval", {
        slug: input.slug,
        locale: input.locale,
        targetRelPath,
      }),
      "",
      "--- BEGIN English source ---",
      input.source,
      "--- END English source ---",
      "",
      `--- BEGIN <candidate id="${sha}" model="${output.model}"> ---`,
      output.translation,
      `--- END <candidate id="${sha}"> ---`,
      "",
      `Use this JSON shape: ${JSON.stringify(getJudgeJsonShape())}`,
    ].join("\n");

    const result = await generateText({
      model: createOpenRouter({}).chat(judgeModel, OPENROUTER_USAGE_ACCOUNTING),
      system: "You are a constrained translation judge. Return strict JSON only. No markdown fences.",
      prompt,
      temperature: 0.1,
      maxOutputTokens: 2000,
      timeout: { totalMs: TIMEOUT_MS },
    });

    const parsed = parseJudgeOutput(result.text);
    const judgeScores = normalizeJudgeScores(parsed.scores);
    if (judgeScores == null) return fail("Judge returned no parseable scores.");

    const rationale = typeof parsed.rationale === "string" ? parsed.rationale.slice(0, 200) : undefined;
    const avg = averageJudgeScore(judgeScores) / 100; // normalize to 0–1

    // One Score per judge dimension + a summary entry
    const dimensionScores: Score[] = (Object.entries(judgeScores) as [keyof JudgeScoreMap, number][]).map(
      ([dim, raw]) => ({
        name: `judge:${dim}`,
        score: raw / 100,
        passed: raw >= DEFAULT_MIN_SCORE,
        severity: "low" as const, // dimensions don't block individually; overall does
      }),
    );

    const overall: Score = {
      name: "judge:overall",
      score: avg,
      passed: avg * 100 >= DEFAULT_MIN_SCORE,
      severity: "medium",
      details: rationale,
    };

    return { scores: [...dimensionScores, overall], judgeScores };
  } catch (error) {
    return fail(error instanceof Error ? error.message : String(error));
  }
}

// ---------------------------------------------------------------------------
// Task  (input + model → output)
// ---------------------------------------------------------------------------

async function translate(input: EvalInput, model: string): Promise<EvalOutput> {
  const startedAt = Date.now();
  const result = await generateText({
    model: createOpenRouter({}).chat(model.replace(/^openrouter\//, ""), OPENROUTER_USAGE_ACCOUNTING),
    system: buildSystemPrompt(input.locale, input.isQuiz),
    prompt: buildUserPrompt(input.source, input.locale, {
      chunkIndex: 0,
      totalChunks: 1,
      articleSummary: `${input.kind === "quiz" ? "Quiz" : "Technical article"}: "${input.title}" (${input.slug}).`,
    }, input.isQuiz),
    temperature: 0.1,
    maxOutputTokens: Math.min(16_000, Math.max(4_000, Math.ceil(input.source.length / 2))),
    timeout: { totalMs: TIMEOUT_MS },
  });

  const durationMs = Date.now() - startedAt;
  const telemetry = usageFromResult(result.usage, durationMs, result.providerMetadata);
  return {
    translation: result.text.trim(),
    model,
    durationMs,
    inputTokens: telemetry.inputTokens,
    outputTokens: telemetry.outputTokens,
    providerCostUsd: telemetry.providerCostUsd,
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
      durationMs: 0,
      inputTokens: 0,
      outputTokens: 0,
    };
  }

  // Run all scorers — deterministic ones sync, LLM judge async
  const [integrityScores, frontmatter, title, wrapper, judgeResult] = await Promise.all([
    Promise.resolve(scoreIntegrity(input, output)),
    Promise.resolve(scoreFrontmatter(input, output)),
    Promise.resolve(scoreTitleTranslated(input, output)),
    Promise.resolve(scoreNoWrapperText(input, output)),
    scoreLlmJudge(input, output),
  ]);

  const scores: Score[] = [...integrityScores, frontmatter, title, wrapper, ...judgeResult.scores];
  const overallScore = scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
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
  };
}

// ---------------------------------------------------------------------------
// Data selection
// ---------------------------------------------------------------------------

function selectInputs(locale: ActiveLocale): EvalInput[] {
  const corpus = loadPublishedPosts();
  const kinds = requestedKind === "all" ? (["article", "quiz"] as ArticleKind[]) : [requestedKind as ArticleKind];

  return kinds.map((kind) => {
    const post = requestedSlug != null
      ? corpus.find((p) => p.slug === normalizeSlug(requestedSlug) && (requestedKind === "all" || p.kind === kind))
        ?? (() => { throw new Error(`Slug "${requestedSlug}" not found in visible corpus.`); })()
      : corpus.find((p) => p.kind === kind)
        ?? (() => { throw new Error(`No visible published ${kind} found.`); })();

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
        return [{
          kind: (data.category === "Quiz" ? "quiz" : "article") as ArticleKind,
          slug: e.name.replace(/^\d{4}-\d{2}-\d{2}--/, ""),
          sourcePath,
          source,
          title: typeof data.title === "string" ? data.title : e.name,
          dateMs,
        }];
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

function parseLocales(value: string | undefined): ActiveLocale[] {
  if (value == null) return [DEFAULT_LOCALE];
  return value.split(",").map((v) => {
    const trimmed = v.trim();
    if (isActiveLocale(trimmed)) return trimmed;
    throw new Error(`--locales must be active locales (${ACTIVE_LOCALES.join(", ")}). Got "${trimmed}".`);
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

mkdirSync(EVAL_REPORT_DIR, { recursive: true });
const runId = new Date().toISOString().replace(/[:.]/g, "-");
const outputPath = join(EVAL_REPORT_DIR, `eval-run-${runId}.jsonl`);
const summaryPath = join(EVAL_REPORT_DIR, `eval-run-${runId}-summary.md`);

// inputs = unique articles × locales; pairs = inputs × models
const inputs = locales.flatMap((loc) => selectInputs(loc));
const pairs = inputs.flatMap((input) => translationModels.map((model) => ({ input, model })));

if (isDryRun) {
  console.log(`\nEval cases (dry run):`);
  for (const { input, model } of pairs) {
    console.log(`  [${input.kind}] ${input.slug}  locale=${input.locale}  model=${model.replace(/^openrouter\//, "")}`);
    console.log(`  source: ${relative(process.cwd(), input.sourcePath)}`);
  }
  console.log(`\nJudge model: ${judgeModel}`);
  console.log(`Output: ${outputPath}`);
  process.exit(0);
}

console.log(`\n${inputs.length} input(s) × ${translationModels.length} model(s) = ${pairs.length} eval(s) running in parallel`);
console.log(`Models  : ${translationModels.map((m) => m.replace(/^openrouter\//, "")).join(", ")}`);
console.log(`Judge   : ${judgeModel}`);
console.log(`Locales : ${locales.join(", ")}\n`);

if (braintrustEnabled) {
  console.log(`Braintrust: logging to project "${BRAINTRUST_PROJECT_NAME}"\n`);
}

const results = await Promise.all(
  pairs.map(async ({ input, model }) => {
    const shortModel = model.replace(/^openrouter\//, "");
    console.log(`  → ${input.id}  model=${shortModel}`);
    const result = await tracedEval(
      `eval:${input.id}`,
      { slug: input.slug, locale: input.locale, kind: input.kind, model: shortModel, judgeModel },
      () => runEval(input, model),
    );
    const score = (result.overallScore * 100).toFixed(1);
    console.log(`  ← ${result.passed ? "PASS" : "FAIL"}  score=${score}  ${result.durationMs}ms  model=${shortModel}`);
    if (!result.passed) {
      for (const s of result.scores.filter((s) => !s.passed && s.severity !== "low")) {
        console.log(`      ✗ ${s.name}${s.details ? `: ${s.details}` : ""}`);
      }
    }
    appendFileSync(outputPath, JSON.stringify({ at: new Date().toISOString(), ...result }) + "\n", "utf8");
    return result;
  }),
);

writeSummary(results);

const failCount = results.filter((r) => !r.passed).length;
console.log(`\nSummary: ${summaryPath}`);
if (failCount > 0) {
  console.error(`\n${failCount} eval(s) failed.`);
  process.exit(1);
}
console.log(`All ${results.length} eval(s) passed.`);

// ---------------------------------------------------------------------------
// Summary report
// ---------------------------------------------------------------------------

function writeSummary(results: EvalResult[]) {
  const passCount = results.filter((r) => r.passed).length;
  const failCount = results.length - passCount;
  const totalCost = results.reduce((sum, r) => sum + (r.providerCostUsd ?? 0), 0);

  // Collect all judge dimension names seen across results for column headers
  const judgeKeys = [...new Set(
    results.flatMap((r) => r.scores.filter((s) => s.name.startsWith("judge:") && s.name !== "judge:overall").map((s) => s.name)),
  )].sort();

  const lines: string[] = [
    `# Translation Eval Run — ${runId}`,
    ``,
    `**${passCount} passed, ${failCount} failed** | total cost $${totalCost.toFixed(5)}`,
    `Models: ${translationModels.map((m) => m.replace(/^openrouter\//, "")).join(", ")}`,
    `Judge: ${judgeModel}`,
    ``,
    `## Results`,
    ``,
    `| Kind | Slug | Locale | Model | Pass | Overall | Judge | ${judgeKeys.map((k) => k.replace("judge:", "")).join(" | ")} | Cost |`,
    `| --- | --- | --- | --- | --- | --- | --- | ${judgeKeys.map(() => "---").join(" | ")} | --- |`,
    ...results.map((r) => {
      const scoreMap = Object.fromEntries(r.scores.map((s) => [s.name, s]));
      const judgeOverall = scoreMap["judge:overall"];
      const dimCells = judgeKeys.map((k) => {
        const s = scoreMap[k];
        return s != null ? `${(s.score * 100).toFixed(0)}${s.passed ? "" : "✗"}` : "—";
      });
      return [
        `| ${r.kind}`,
        r.slug,
        r.locale,
        r.model.replace(/^openrouter\//, ""),
        r.passed ? "✓" : "✗",
        (r.overallScore * 100).toFixed(1),
        judgeOverall != null ? `${(judgeOverall.score * 100).toFixed(1)}${judgeOverall.passed ? "" : "✗"}` : "—",
        ...dimCells,
        r.providerCostUsd != null ? `$${r.providerCostUsd.toFixed(5)}` : "—",
      ].join(" | ") + " |";
    }),
    ``,
    `## Score Details`,
    ``,
    ...results.flatMap((r) => {
      const shortModel = r.model.replace(/^openrouter\//, "");
      const header = `### ${r.kind}:${r.slug} · ${r.locale} · ${shortModel} ${r.passed ? "✓" : "✗"}`;
      const deterministicRows = r.scores
        .filter((s) => !s.name.startsWith("judge:"))
        .map((s) => `| ${s.name} | ${(s.score * 100).toFixed(0)} | ${s.passed ? "✓" : `✗ ${s.severity}`}${s.details ? ` | ${s.details}` : " |"} |`);
      const judgeRows = r.scores
        .filter((s) => s.name.startsWith("judge:"))
        .map((s) => `| ${s.name} | ${(s.score * 100).toFixed(0)} | ${s.passed ? "✓" : `✗ ${s.severity}`}${s.details ? ` | ${s.details.slice(0, 120)}` : " |"} |`);
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
