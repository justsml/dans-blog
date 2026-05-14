/**
 * Offline prompt effectiveness evals for the i18n translation pipeline.
 *
 * Runs real LLM inferences with cheap models against fixed source fixtures,
 * scores outputs with a lightweight judge, and writes results to
 * reports/i18n/evals/.
 *
 * Usage:
 *   bun run i18n:eval                     # all evals, cheap defaults
 *   bun run i18n:eval -- --model openrouter/google/gemini-2.0-flash-001
 *   bun run i18n:eval -- --locale es      # one locale
 *   bun run i18n:eval -- --suite judge    # only judge-loop evals
 *   bun run i18n:eval -- --dry-run        # list cases without running
 *
 * Suites:
 *   translation  – translation prompt quality (system + user prompts)
 *   judge        – deterministic judge/validator failure-state fixtures
 *   all          – both (default)
 */

import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import "dotenv/config";
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
} from "./judge-utils.ts";
import { analyzeTranslationIntegrity } from "./integrity-checks.ts";
import { parseArgs, optionalString } from "./utils.ts";
import type { ActiveLocale } from "../../shared/i18n.ts";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const EVAL_REPORT_DIR = join(process.cwd(), "reports/i18n/evals");
// openrouter/openai/gpt-oss-120b:nitro
// openrouter/qwen/qwen3-32b:nitro
// deepseek/deepseek-v4-flash
const DEFAULT_TRANSLATION_MODEL = "openrouter/openai/gpt-oss-120b:nitro";
const DEFAULT_JUDGE_MODEL = "deepseek/deepseek-v4-flash";
const TIMEOUT_MS = 60_000;

const args = parseArgs();
const translationModel = optionalString(args, "translation-model") ?? optionalString(args, "model") ?? DEFAULT_TRANSLATION_MODEL;
const judgeModel = optionalString(args, "judge-model") ?? optionalString(args, "model") ?? DEFAULT_JUDGE_MODEL;
const requestedLocale = optionalString(args, "locale") as ActiveLocale | undefined;
const requestedSuite = optionalString(args, "suite") ?? "all";
const isDryRun = args["dry-run"] === true;

const runSuites: Set<string> = requestedSuite === "all"
  ? new Set(["translation", "judge"])
  : new Set(requestedSuite.split(",").map((s) => s.trim()));

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

type TranslationFixture = {
  id: string;
  slug: string;
  locale: ActiveLocale;
  isQuiz: boolean;
  source: string;
  /* Rubric: text that MUST appear or pattern that must match in the output */
  mustPreserve: Array<string | RegExp>;
  /* Rubric: text or patterns that must NOT appear in the output */
  mustNotContain: Array<string | RegExp>;
  /* Minimum acceptable overall judge score (0-100) */
  minScore: number;
};

type JudgeFixture = {
  id: string;
  slug: string;
  locale: ActiveLocale;
  source: string;
  target: string;
  expectedIssueCodes: string[];
};

const TRANSLATION_FIXTURES: TranslationFixture[] = [
  {
    id: "basic-mdx-article-es",
    slug: "stop-hardcoding-your-prompts",
    locale: "es",
    isQuiz: false,
    source: [
      "---",
      "title: Stop Hardcoding Your Prompts",
      "date: 2025-01-01",
      "category: AI",
      "---",
      "",
      "## Why prompts break",
      "",
      "When you hardcode a prompt, you lock in today's assumptions.",
      "The model changes. Your data changes. The prompt breaks silently.",
      "",
      "Use a config file or database instead. Separate the prompt from the code.",
      "",
      "```ts",
      "const prompt = loadPrompt('classify-intent');",
      "```",
      "",
      "## Trade-offs",
      "",
      "- **Pro**: iterate without deploys",
      "- **Con**: harder to version-control",
    ].join("\n"),
    mustPreserve: [
      /##\s+/,             // headings preserved
      "```ts",             // code fence preserved
      "loadPrompt",        // code content preserved
    ],
    mustNotContain: [
      "Stop Hardcoding Your Prompts", // title should be translated
    ],
    minScore: 70,
  },
  {
    id: "quiz-challenge-ja",
    slug: "js-quiz-14-date-time",
    locale: "ja",
    isQuiz: true,
    source: [
      "---",
      "title: JS Quiz: Date & Time",
      "category: Quiz",
      "date: 2020-01-02",
      "---",
      "",
      'import Challenge from "../../../../components/QuizUI/Challenge";',
      "",
      "<Challenge",
      "  index={0}",
      "  client:visible",
      '  title="What does Date.now() return?"',
      "  options={[",
      "    { text: 'A Unix timestamp in milliseconds', isAnswer: true },",
      "    { text: 'A Date object', isAnswer: false },",
      "    { text: 'An ISO 8601 string', isAnswer: false },",
      "  ]}",
      ">",
      "  <slot name=\"question\">",
      "    What does `Date.now()` return in JavaScript?",
      "  </slot>",
      "  <slot name=\"explanation\">",
      "    `Date.now()` returns the number of milliseconds elapsed since the Unix epoch (January 1, 1970).",
      "    It does not return a `Date` object or a string.",
      "  </slot>",
      "</Challenge>",
    ].join("\n"),
    mustPreserve: [
      "index={0}",                   // numeric prop untouched
      "client:visible",              // directive untouched
      "isAnswer: true",              // answer flag untouched
      "isAnswer: false",
      "Date.now()",                  // inline code preserved
      /import Challenge from/,       // import preserved
      "../../../../components",      // import path preserved
    ],
    mustNotContain: [
      "What does Date.now() return?",  // English question text should be translated
    ],
    minScore: 70,
  },
  {
    id: "asset-paths-zh",
    slug: "ai-sdk-math-tool",
    locale: "zh",
    isQuiz: false,
    source: [
      "---",
      "title: AI SDK Math Tool",
      "social_image: ./desktop-social.webp",
      "---",
      "",
      "## Overview",
      "",
      "This article covers the math tool pattern in the AI SDK.",
      "",
      '![Diagram](./diagram.webp)',
      "",
      '<img src="./inline.webp" alt="inline example" />',
    ].join("\n"),
    mustPreserve: [
      /!\[.*\]\(\.\.\/diagram\.webp\)/,       // markdown image gets ../
      /src=["']\.\.\/inline\.webp["']/,        // html img src gets ../
    ],
    mustNotContain: [
      "(./diagram.webp)",    // bare ./ not allowed in locale file
      "src=\"./inline.webp\"",
      "src='./inline.webp'",
    ],
    minScore: 65,
  },
  {
    id: "heading-structure-fr",
    slug: "stop-hardcoding-your-prompts",
    locale: "fr",
    isQuiz: false,
    source: [
      "---",
      "title: Stop Hardcoding Your Prompts",
      "---",
      "",
      "# Main Title",
      "",
      "Intro paragraph.",
      "",
      "## Section One",
      "",
      "Content here.",
      "",
      "### Subsection",
      "",
      "Deep content.",
      "",
      "## Section Two",
      "",
      "More content.",
    ].join("\n"),
    mustPreserve: [
      /^# /m,                // exactly one H1
      /^## /m,               // H2s present
      /^### /m,              // H3 present
    ],
    mustNotContain: [],
    minScore: 70,
  },
  {
    id: "cultural-reference-adaptation-es",
    slug: "prompt-injection-new-sql-injection",
    locale: "es",
    isQuiz: false,
    source: [
      "---",
      "title: Prompt Injection Is the New SQL Injection",
      "date: 2026-05-02",
      "---",
      "",
      "## The old footgun got a new handle",
      "",
      "This is not vendor-blog confetti. It is scar tissue.",
      "If your agent treats every README like a commandment, you built a very polite trapdoor.",
      "",
      "> The fix is boring on purpose: smaller permissions, clearer boundaries, and fewer heroic vibes.",
    ].join("\n"),
    mustPreserve: [
      /^## /m,
      /^> /m,
    ],
    mustNotContain: [
      /vendor-blog confetti|scar tissue|heroic vibes/i,
      /pie arma|arma de pie|confeti de blog proveedor|tejido cicatricial/i,
    ],
    minScore: 72,
  },
];

const JUDGE_FIXTURES: JudgeFixture[] = [
  {
    id: "detect-html-comment",
    slug: "stop-hardcoding-your-prompts",
    locale: "zh",
    source: [
      "---",
      "title: Stop Hardcoding Your Prompts",
      "---",
      "",
      "## Why prompts break",
      "",
      "The model changes.",
    ].join("\n"),
    target: [
      "---",
      "title: 停止硬编码你的提示词",
      "---",
      "",
      "## 提示词为什么会坏",
      "",
      "<!-- leaked note -->",
      "模型会变化。",
    ].join("\n"),
    expectedIssueCodes: ["html-comment-outside-code"],
  },
  {
    id: "detect-bad-html-markup",
    slug: "stop-hardcoding-your-prompts",
    locale: "fr",
    source: [
      "---",
      "title: Stop Hardcoding Your Prompts",
      "---",
      "",
      "<section>",
      "Body",
      "</section>",
    ].join("\n"),
    target: [
      "---",
      "title: Arrêtez de coder vos prompts en dur",
      "---",
      "",
      "<section>",
      "Corps",
    ].join("\n"),
    expectedIssueCodes: ["html-unclosed-tag"],
  },
  {
    id: "detect-invalid-asset-paths",
    slug: "ai-sdk-math-tool",
    locale: "ar",
    source: [
      "---",
      "title: AI SDK Math Tool",
      "social_image: ./desktop-social.webp",
      "---",
      "",
      "![Diagram](./diagram.webp)",
      "",
      '<img src="./inline.webp" alt="inline example" />',
    ].join("\n"),
    target: [
      "---",
      "title: أداة الرياضيات في AI SDK",
      "social_image: ./desktop-social.webp",
      "---",
      "",
      "![رسم](./diagram.webp)",
      "",
      '<img src="inline.webp" alt="مثال مضمّن" />',
    ].join("\n"),
    expectedIssueCodes: ["invalid-localized-asset-path"],
  },
  {
    id: "detect-count-drift",
    slug: "stop-hardcoding-your-prompts",
    locale: "de",
    source: [
      "---",
      "title: Stop Hardcoding Your Prompts",
      "---",
      "",
      "## Why prompts break",
      "",
      "> The quiet failure is the expensive one.",
      "",
      "```ts",
      "const prompt = loadPrompt('classify-intent');",
      "```",
    ].join("\n"),
    target: [
      "---",
      "title: Hör auf, deine Prompts hart zu codieren",
      "---",
      "",
      "## Warum Prompts brechen",
      "",
      "Der stille Fehler ist der teure.",
      "",
      "const prompt = loadPrompt('classify-intent');",
    ].join("\n"),
    expectedIssueCodes: ["fenced-code-count", "blockquote-count"],
  },
  {
    id: "detect-bad-quiz-options",
    slug: "js-quiz-14-date-time",
    locale: "ja",
    source: [
      "<Challenge",
      "  index={0}",
      "  options={[",
      "    { text: 'date.toLocaleFormat(\\'en-US\\')', isAnswer: true },",
      "    { text: 'date.toLocaleString(\\'en-GB\\')', isAnswer: false },",
      "  ]}",
      ">",
      "</Challenge>",
    ].join("\n"),
    target: [
      "<Challenge",
      "  index={0}",
      "  options={[",
      "    { text: 'date.toLocaleFormat(\\'en-US', isAnswer: false },",
      "    { text: 'date.toLocaleString()', isAnswer: false },",
      "  ]}",
      ">",
      "</Challenge>",
    ].join("\n"),
    expectedIssueCodes: ["quiz-answer-count", "quiz-code-option-preservation"],
  },
  {
    id: "detect-llm-leak-and-mixed-language",
    slug: "prompt-injection-new-sql-injection",
    locale: "he",
    source: [
      "---",
      "title: Prompt Injection Is the New SQL Injection",
      "---",
      "",
      "## Boundaries",
      "",
      "Agents need small permissions and clear boundaries.",
    ].join("\n"),
    target: [
      "---",
      "title: Prompt Injection Is the New SQL Injection",
      "---",
      "",
      "## Boundaries",
      "",
      "Here is the translation you requested. The agent should preserve MDX and return only the translated article.",
      "This paragraph is still mostly English prose with enough ordinary source words to look like an untranslated candidate.",
      "It should not survive a judge pass because the target language reader-facing text is not Hebrew.",
    ].join("\n"),
    expectedIssueCodes: ["llm-instruction-leak", "mixed-language-or-untranslated"],
  },
];

// ---------------------------------------------------------------------------
// Eval runner
// ---------------------------------------------------------------------------

type EvalResult = {
  id: string;
  suite: "translation" | "judge";
  locale: ActiveLocale;
  translationModel: string;
  judgeModel: string;
  passed: boolean;
  overallScore: number | null;
  minScore: number;
  rubricResults: Array<{ rule: string; passed: boolean }>;
  errorMessage?: string;
  durationMs: number;
  inputTokens: number;
  outputTokens: number;
  providerCostUsd?: number;
};

mkdirSync(EVAL_REPORT_DIR, { recursive: true });
const runId = new Date().toISOString().replace(/[:.]/g, "-");
const outputPath = join(EVAL_REPORT_DIR, `eval-run-${runId}.jsonl`);
const summaryPath = join(EVAL_REPORT_DIR, `eval-run-${runId}-summary.md`);

const fixtures = requestedLocale != null
  ? TRANSLATION_FIXTURES.filter((f) => f.locale === requestedLocale)
  : TRANSLATION_FIXTURES;
const judgeFixtures = requestedLocale != null
  ? JUDGE_FIXTURES.filter((f) => f.locale === requestedLocale)
  : JUDGE_FIXTURES;

if (isDryRun) {
  console.log(`\nEval cases (dry run):`);
  if (runSuites.has("translation")) {
    for (const fixture of fixtures) {
      console.log(`  [translation] ${fixture.id}  locale=${fixture.locale}`);
    }
  }
  if (runSuites.has("judge")) {
    for (const fixture of judgeFixtures) {
      console.log(`  [judge] ${fixture.id}  locale=${fixture.locale}`);
    }
  }
  console.log(`\nModels: translation=${translationModel}  judge=${judgeModel}`);
  console.log(`Output: ${outputPath}`);
  process.exit(0);
}

console.log(`\nRunning ${runSuites.has("translation") ? fixtures.length : 0} translation eval case(s).`);
console.log(`Running ${runSuites.has("judge") ? judgeFixtures.length : 0} judge fixture eval case(s).`);
console.log(`Translation model : ${translationModel}`);
console.log(`Judge model       : ${judgeModel}`);
console.log(`Output            : ${outputPath}\n`);

const results: EvalResult[] = [];

for (const fixture of fixtures) {
  if (!runSuites.has("translation")) continue;

  console.log(`[eval] ${fixture.id} (${fixture.locale}) …`);
  const result = await runTranslationEval(fixture);
  results.push(result);

  appendFileSync(outputPath, JSON.stringify({
    at: new Date().toISOString(),
    ...result,
  }) + "\n", "utf8");

  const status = result.passed ? "PASS ✓" : "FAIL ✗";
  const score = result.overallScore != null ? `  score=${result.overallScore.toFixed(1)}` : "";
  console.log(`  ${status}${score}  ${result.durationMs}ms`);
  if (!result.passed) {
    for (const r of result.rubricResults.filter((r) => !r.passed)) {
      console.log(`    RUBRIC FAIL: ${r.rule}`);
    }
    if (result.errorMessage) console.log(`    ERROR: ${result.errorMessage}`);
  }
}

for (const fixture of judgeFixtures) {
  if (!runSuites.has("judge")) continue;

  console.log(`[eval] ${fixture.id} (${fixture.locale}) …`);
  const result = runJudgeFixtureEval(fixture);
  results.push(result);

  appendFileSync(outputPath, JSON.stringify({
    at: new Date().toISOString(),
    ...result,
  }) + "\n", "utf8");

  const status = result.passed ? "PASS ✓" : "FAIL ✗";
  console.log(`  ${status}  ${result.durationMs}ms`);
  if (!result.passed) {
    for (const r of result.rubricResults.filter((r) => !r.passed)) {
      console.log(`    RUBRIC FAIL: ${r.rule}`);
    }
    if (result.errorMessage) console.log(`    ERROR: ${result.errorMessage}`);
  }
}

writeSummary(results);
console.log(`\nSummary: ${summaryPath}`);

const failCount = results.filter((r) => !r.passed).length;
if (failCount > 0) {
  console.error(`\n${failCount} eval case(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${results.length} eval case(s) passed.`);

// ---------------------------------------------------------------------------
// Translation eval
// ---------------------------------------------------------------------------

async function runTranslationEval(fixture: TranslationFixture): Promise<EvalResult> {
  const startedAt = Date.now();

  try {
    const articleSummary = `Technical article: "${fixture.slug}" — a short excerpt for eval purposes.`;
    const chunkContext = {
      chunkIndex: 0,
      totalChunks: 1,
      articleSummary,
    };
    const systemPrompt = buildSystemPrompt(fixture.locale, fixture.isQuiz);
    const userPrompt = buildUserPrompt(fixture.source, fixture.locale, chunkContext, fixture.isQuiz);

    const provider = createOpenRouter({});
    const modelId = translationModel.replace(/^openrouter\//, "");

    const translationResult = await generateText({
      model: provider.chat(modelId, OPENROUTER_USAGE_ACCOUNTING),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.1,
      maxOutputTokens: 3000,
      timeout: { totalMs: TIMEOUT_MS },
    });

    const translationOutput = translationResult.text.trim();
    const durationMs = Date.now() - startedAt;
    const telemetry = usageFromResult(translationResult.usage, durationMs, translationResult.providerMetadata);

    const rubricResults = checkRubric(translationOutput, fixture);

    const judgeScore = await scoreWithJudge(fixture.source, translationOutput, fixture);
    const overallScore = judgeScore?.overallScore ?? null;

    const scorePass = overallScore == null || overallScore >= fixture.minScore;
    const rubricPass = rubricResults.every((r) => r.passed);
    const passed = scorePass && rubricPass;

    return {
      id: fixture.id,
      suite: "translation",
      locale: fixture.locale,
      translationModel,
      judgeModel,
      passed,
      overallScore,
      minScore: fixture.minScore,
      rubricResults,
      durationMs,
      inputTokens: telemetry.inputTokens,
      outputTokens: telemetry.outputTokens,
      providerCostUsd: telemetry.providerCostUsd,
    };
  } catch (error) {
    return {
      id: fixture.id,
      suite: "translation",
      locale: fixture.locale,
      translationModel,
      judgeModel,
      passed: false,
      overallScore: null,
      minScore: fixture.minScore,
      rubricResults: [],
      errorMessage: error instanceof Error ? error.message : String(error),
      durationMs: Date.now() - startedAt,
      inputTokens: 0,
      outputTokens: 0,
    };
  }
}

function runJudgeFixtureEval(fixture: JudgeFixture): EvalResult {
  const startedAt = Date.now();
  const targetPath = `/eval/src/content/posts/${fixture.slug}/${fixture.locale}/index.mdx`;
  const issues = analyzeTranslationIntegrity({
    sourceContents: fixture.source,
    targetContents: fixture.target,
    targetPath,
    locale: fixture.locale,
  });
  const issueCodes = new Set(issues.map((issue) => issue.code));
  const rubricResults = fixture.expectedIssueCodes.map((code) => ({
    rule: `expectedIssue: ${code}`,
    passed: issueCodes.has(code),
  }));

  return {
    id: fixture.id,
    suite: "judge",
    locale: fixture.locale,
    translationModel,
    judgeModel,
    passed: rubricResults.every((result) => result.passed),
    overallScore: null,
    minScore: 0,
    rubricResults,
    errorMessage: rubricResults.every((result) => result.passed)
      ? undefined
      : `Detected issue codes: ${[...issueCodes].join(", ") || "none"}`,
    durationMs: Date.now() - startedAt,
    inputTokens: 0,
    outputTokens: 0,
  };
}

function checkRubric(output: string, fixture: TranslationFixture) {
  const results: Array<{ rule: string; passed: boolean }> = [];

  for (const rule of fixture.mustPreserve) {
    const matched = typeof rule === "string" ? output.includes(rule) : rule.test(output);
    results.push({
      rule: `mustPreserve: ${typeof rule === "string" ? JSON.stringify(rule) : rule.toString()}`,
      passed: matched,
    });
  }

  for (const rule of fixture.mustNotContain) {
    const matched = typeof rule === "string" ? output.includes(rule) : rule.test(output);
    results.push({
      rule: `mustNotContain: ${typeof rule === "string" ? JSON.stringify(rule) : rule.toString()}`,
      passed: !matched,
    });
  }

  const targetPath = `/eval/src/content/posts/${fixture.slug}/${fixture.locale}/index.mdx`;
  const integrityIssues = analyzeTranslationIntegrity({
    sourceContents: fixture.source,
    targetContents: output,
    targetPath,
    locale: fixture.locale,
  });
  for (const issue of integrityIssues.filter((issue) => issue.severity !== "low")) {
    results.push({
      rule: `integrity:${issue.code}: ${issue.message}`,
      passed: false,
    });
  }

  return results;
}

// ---------------------------------------------------------------------------
// Lightweight judge scorer
// ---------------------------------------------------------------------------

type JudgeScore = {
  overallScore: number;
  scores: Record<string, number>;
  rationale: string;
};

async function scoreWithJudge(
  source: string,
  translation: string,
  fixture: TranslationFixture,
): Promise<JudgeScore | undefined> {
  try {
    const sha = "eval000000000000000000000000000000000000";
    const candidates: CandidateRef[] = [
      { id: sha, label: `<candidate id="${sha}">`, source: "commit", model: translationModel },
    ];
    const targetRelPath = `src/content/posts/${fixture.slug}/${fixture.locale}/index.mdx`;

    const judgePrompt = [
      buildPrimaryJudgePrompt(
        `- ${sha} ${translationModel}`,
        candidates,
        "eval",
        { slug: fixture.slug, locale: fixture.locale, targetRelPath },
      ),
      "",
      `--- BEGIN English source ---`,
      source,
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
      maxOutputTokens: 1500,
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

// ---------------------------------------------------------------------------
// Summary report
// ---------------------------------------------------------------------------

function writeSummary(results: EvalResult[]) {
  const passCount = results.filter((r) => r.passed).length;
  const failCount = results.length - passCount;
  const totalCost = results.reduce((sum, r) => sum + (r.providerCostUsd ?? 0), 0);

  const lines = [
    `# Translation Eval Run — ${runId}`,
    ``,
    `| # | ID | Locale | Pass | Score | Min | Cost |`,
    `|---|-----|--------|------|-------|-----|------|`,
    ...results.map((r, i) => [
      `| ${i + 1}`,
      r.passed ? "✓" : "✗",
      r.id,
      r.locale,
      r.overallScore != null ? r.overallScore.toFixed(1) : "n/a",
      String(r.minScore),
      r.providerCostUsd != null ? `$${r.providerCostUsd.toFixed(5)}` : "n/a",
    ].join(" | ") + " |"),
    ``,
    `**Results**: ${passCount} passed, ${failCount} failed`,
    `**Total cost**: $${totalCost.toFixed(5)}`,
    `**Translation model**: ${translationModel}`,
    `**Judge model**: ${judgeModel}`,
    ``,
    failCount > 0 ? `## Failures` : "",
    ...results
      .filter((r) => !r.passed)
      .flatMap((r) => [
        `### ${r.id}`,
        r.errorMessage ? `Error: ${r.errorMessage}` : "",
        ...r.rubricResults.filter((rb) => !rb.passed).map((rb) => `- FAIL: ${rb.rule}`),
        r.overallScore != null && r.overallScore < r.minScore
          ? `- Score ${r.overallScore.toFixed(1)} below minimum ${r.minScore}`
          : "",
        ``,
      ]),
  ].filter((l) => l != null);

  writeFileSync(summaryPath, lines.join("\n"), "utf8");
}
