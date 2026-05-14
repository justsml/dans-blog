import { join } from "node:path";
import { ACTIVE_LOCALES, type ActiveLocale } from "../../shared/i18n.ts";
import {
  filterActiveLocales,
  getMissingTranslationSlots,
} from "./corpus-inventory.ts";
import {
  gitCommit,
  optionalString,
  parseArgs,
  parseList,
  randomizeListOrder,
  relativeToRepo,
  run,
  runInherited,
  writeTextFile,
} from "./utils.ts";

const CHEAP_CANDIDATE_MODELS = [
  "openrouter/qwen/qwen3.6-plus",
  "openrouter/deepseek/deepseek-v4-flash",
  "openrouter/openai/gpt-oss-120b:nitro",
  "openrouter/qwen/qwen3-32b:nitro",
  "openrouter/z-ai/glm-4.7-flash",
  "openrouter/minimax/minimax-m2.5",
  "openrouter/google/gemini-3-flash-preview",
  "openrouter/deepseek/deepseek-v3.2",
  "openrouter/minimax/minimax-m2.7",
  "openrouter/z-ai/glm-5-turbo",
];

const JUDGE_MODEL = "openrouter/google/gemini-3-flash-preview";
const ESCALATION_JUDGE_MODEL = "openrouter/anthropic/claude-sonnet-4.6";

type Task = {
  slug: string;
  locale: ActiveLocale;
  targetPath: string;
};

const options = parseArgs();
const selectedLocales = filterActiveLocales(parseList(optionalString(options, "locales"), [...ACTIVE_LOCALES]));
const selectedSlugs = new Set(parseList(optionalString(options, "slugs"), []));
const candidateModels = randomizeListOrder(validateCandidateModels(parseList(optionalString(options, "models"), CHEAP_CANDIDATE_MODELS)));
const minCandidates = parsePositiveInteger(optionalString(options, "min-candidates"), 2);
const limit = parseOptionalPositiveInteger(optionalString(options, "limit"));
const latestPosts = parseOptionalPositiveInteger(optionalString(options, "latest-posts"));
const candidateTimeoutSeconds = parsePositiveInteger(optionalString(options, "timeout-seconds"), 240);
const judgeTimeoutSeconds = parsePositiveInteger(optionalString(options, "judge-timeout-seconds"), 240);
const judgeModel = optionalString(options, "judge-model") ?? JUDGE_MODEL;
const secondJudgeModel = optionalString(options, "second-judge-model");
const escalationJudgeModel = optionalString(options, "escalate-model") ?? ESCALATION_JUDGE_MODEL;
const shouldDryRun = options["dry-run"] === true;
const shouldPush = options["push"] === true;

const tasks = getMissingTranslationTasks();
const limitedTasks = limit == null ? tasks : tasks.slice(0, limit);

console.log(`Found ${tasks.length} missing translation task(s).`);
console.log(`Processing ${limitedTasks.length} task(s).`);
console.log(`Candidate pool: ${candidateModels.join(", ")}`);

if (shouldDryRun) {
  for (const task of limitedTasks) {
    console.log(`${task.locale}/${task.slug} -> ${relativeToRepo(task.targetPath)}`);
  }
  process.exit(0);
}

for (const [index, task] of limitedTasks.entries()) {
  console.log(`\n[${index + 1}/${limitedTasks.length}] ${task.locale}/${task.slug}`);
  processTask(task);
  if (shouldPush) {
    runInherited("git", ["push", "origin", "HEAD:main"]);
  }
}

function processTask(task: Task) {
  for (const model of candidateModels) {
    const candidates = getCandidateCommits(task);
    if (candidates.length >= minCandidates) break;
    if (candidates.some((commit) => normalizeModelId(getCandidateModel(commit)) === normalizeModelId(model))) {
      continue;
    }

    console.log(`Generating candidate ${candidates.length + 1}/${minCandidates} with ${model}`);
    runInherited("bun", [
      "run",
      "i18n:translate:candidates",
      "--",
      "--slug",
      task.slug,
      "--locale",
      task.locale,
      "--models",
      model,
      "--timeout-seconds",
      String(candidateTimeoutSeconds),
    ]);
  }

  const candidates = getCandidateCommits(task);
  if (candidates.length < minCandidates) {
    const reportPath = join(process.cwd(), "reports/i18n", task.slug, task.locale, "candidate-shortfall.md");
    writeTextFile(
      reportPath,
      [
        "# Candidate Shortfall",
        "",
        `- Slug: ${task.slug}`,
        `- Locale: ${task.locale}`,
        `- Required candidates: ${minCandidates}`,
        `- Candidate commits found: ${candidates.length}`,
        `- Candidate pool exhausted: ${candidateModels.join(", ")}`,
        "",
        "The queue did not judge this locale because the requested minimum candidate count was not reached.",
        "",
      ].join("\n"),
    );
    gitCommit(`i18n skipped(${task.locale}): ${task.slug} lacked ${minCandidates} candidates`, [
      relativeToRepo(reportPath),
    ]);
    console.log(`Skipped judge: only ${candidates.length}/${minCandidates} candidates.`);
    return;
  }

  console.log(`Judging ${candidates.length} candidate(s).`);
  runInherited("bun", [
    "run",
    "i18n:judge",
    "--",
    "--slug",
    task.slug,
    "--locale",
    task.locale,
    "--model",
    judgeModel,
    ...optionalArg("--second-model", secondJudgeModel),
    "--escalate-model",
    escalationJudgeModel,
    "--timeout-seconds",
    String(judgeTimeoutSeconds),
  ]);
}

function optionalArg(name: string, value: string | undefined) {
  return value == null ? [] : [name, value];
}

function getMissingTranslationTasks() {
  return getMissingTranslationSlots({
    latestPosts,
    locales: selectedLocales,
    selectedSlugs,
  }).map(({ slug, locale, targetPath }) => ({ slug, locale, targetPath }));
}

function getCandidateCommits(task: Task) {
  const grep = `i18n candidate(${task.locale}): ${task.slug} via`;
  const output = run("git", ["log", "--format=%H", "--grep", grep]);
  const targetRelPath = relativeToRepo(task.targetPath);

  return output
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((commit) => {
      const changedFiles = run("git", [
        "diff-tree",
        "--no-commit-id",
        "--name-only",
        "-r",
        commit,
      ]);
      if (changedFiles.split(/\r?\n/).includes(targetRelPath)) return true;
      return getCandidatePathFromCommit(commit, task) != null;
    })
    .reverse();
}

function getCandidatePathFromCommit(commit: string, task: Task) {
  const candidatesPath = `reports/i18n/${task.slug}/candidates.jsonl`;
  const model = getCandidateModel(commit);
  let contents = "";

  try {
    contents = run("git", ["show", `${commit}:${candidatesPath}`]);
  } catch {
    return undefined;
  }

  const rows = contents
    .split(/\r?\n/)
    .filter(Boolean)
    .flatMap((line) => {
      try {
        return [JSON.parse(line) as Record<string, unknown>];
      } catch {
        return [];
      }
    })
    .filter((row) => row.locale === task.locale)
    .filter((row) => normalizeModelId(String(row.model ?? "")) === normalizeModelId(model))
    .toReversed();

  for (const row of rows) {
    const candidatePath = typeof row.candidatePath === "string" ? row.candidatePath : undefined;
    if (candidatePath == null) continue;
    try {
      run("git", ["cat-file", "-e", `${commit}:${candidatePath}`]);
      return candidatePath;
    } catch {
      // Keep looking for a row whose candidate file exists in this commit.
    }
  }

  return undefined;
}

function getCandidateModel(commit: string) {
  const subject = run("git", ["show", "-s", "--format=%s", commit]);
  return subject.match(/ via (.+)$/)?.[1] ?? "";
}

function normalizeModelId(model: string) {
  return model.replace(/^openrouter\//, "");
}

function parsePositiveInteger(rawValue: string | undefined, fallback: number) {
  const parsedValue = rawValue == null ? fallback : Number(rawValue);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`Expected a positive integer. Received "${rawValue}".`);
  }

  return parsedValue;
}

function parseOptionalPositiveInteger(rawValue: string | undefined) {
  if (rawValue == null) return undefined;
  return parsePositiveInteger(rawValue, 1);
}

function validateCandidateModels(models: string[]) {
  const forbiddenModels = models.filter((model) =>
    model.includes("-fast") ||
    (model.startsWith("openrouter/openai/") && model !== "openrouter/openai/gpt-oss-120b:nitro") ||
    model.startsWith("openrouter/anthropic/"),
  );

  if (forbiddenModels.length > 0) {
    throw new Error([
      "Translation candidates must use cheap non-GPT/non-Anthropic models, except gpt-oss-120b:nitro, and must not use -fast variants.",
      `Forbidden model(s): ${forbiddenModels.join(", ")}`,
    ].join(" "));
  }

  return models;
}
