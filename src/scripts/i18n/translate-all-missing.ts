import { join } from "node:path";
import { readFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { ACTIVE_LOCALES, type ActiveLocale } from "../../shared/i18n.ts";
import {
  filterActiveLocales,
  getMissingTranslationSlots,
  getModifiedTranslationSlots,
  isTranslationFreshForSourceContents,
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
import {
  CHEAP_FAST_TRANSLATION_MODELS,
  resolveCheapFastTranslationModels,
} from "./model-presets.ts";

const JUDGE_MODEL = "openrouter/google/gemini-3-flash-preview";
const ESCALATION_JUDGE_MODEL = "openrouter/anthropic/claude-sonnet-4.6";
const DEFAULT_TASK_CONCURRENCY = 8;

type Task = {
  slug: string;
  locale: ActiveLocale;
  sourcePath: string;
  targetPath: string;
};

const options = parseArgs();
const selectedLocales = filterActiveLocales(parseList(optionalString(options, "locales"), [...ACTIVE_LOCALES]));
const selectedSlugs = new Set(parseList(optionalString(options, "slugs"), []));
const candidateModels = randomizeListOrder(validateCandidateModels(
  resolveCheapFastTranslationModels(parseList(optionalString(options, "models"), [...CHEAP_FAST_TRANSLATION_MODELS])),
));
const minCandidates = parsePositiveInteger(optionalString(options, "min-candidates"), 2);
const limit = parseOptionalPositiveInteger(optionalString(options, "limit"));
const latestPosts = parseOptionalPositiveInteger(optionalString(options, "latest-posts"));
const candidateTimeoutSeconds = parsePositiveInteger(optionalString(options, "timeout-seconds"), 240);
const judgeTimeoutSeconds = parsePositiveInteger(optionalString(options, "judge-timeout-seconds"), 240);
const taskConcurrency = parsePositiveInteger(optionalString(options, "task-concurrency"), DEFAULT_TASK_CONCURRENCY);
const candidateTaskConcurrency = optionalString(options, "candidate-task-concurrency");
const quizConcurrency = optionalString(options, "quiz-concurrency");
const challengeRetries = optionalString(options, "challenge-retries");
const judgeModel = optionalString(options, "judge-model") ?? JUDGE_MODEL;
const secondJudgeModel = optionalString(options, "second-judge-model");
const escalationJudgeModel = optionalString(options, "escalate-model") ?? ESCALATION_JUDGE_MODEL;
const shouldDryRun = options["dry-run"] === true;
const shouldPush = options["push"] === true;
const shouldContinueOnError = options["continue-on-error"] === true;
const shouldOnlyModified = options["only-modified"] === true;

const tasks = getTranslationTasks();
const limitedTasks = limit == null ? tasks : tasks.slice(0, limit);

console.log(`Found ${tasks.length} ${shouldOnlyModified ? "modified" : "missing"} translation task(s).`);
console.log(`Processing ${limitedTasks.length} task(s).`);
console.log(`Task concurrency: ${shouldPush ? 1 : taskConcurrency}${shouldPush ? " (--push serializes task processing)" : ""}`);
console.log(`Candidate task concurrency: ${candidateTaskConcurrency ?? "default"}`);
console.log(`Quiz challenge concurrency: ${quizConcurrency ?? "default"}`);
console.log(`Candidate pool: ${candidateModels.join(", ")}`);

if (shouldDryRun) {
  for (const task of limitedTasks) {
    console.log(`${task.locale}/${task.slug} -> ${relativeToRepo(task.targetPath)}`);
  }
  process.exit(0);
}

const failures = await mapLimit(limitedTasks, shouldPush ? 1 : taskConcurrency, processTask);

if (failures.length > 0) {
  console.error(`\n${failures.length} translation task(s) failed.`);
  for (const failure of failures) {
    console.error(`- ${failure.item.locale}/${failure.item.slug}: ${failure.error.message}`);
  }
  process.exitCode = 1;
}

async function processTask(task: Task, index: number) {
  console.log(`\n[${index + 1}/${limitedTasks.length}] ${task.locale}/${task.slug}`);
  await translateAndJudgeTask(task);
  if (shouldPush) {
    runInherited("git", ["push", "origin", "HEAD:main"]);
  }
}

async function translateAndJudgeTask(task: Task) {
  for (const model of candidateModels) {
    const candidates = getCandidateCommits(task);
    if (candidates.length >= minCandidates) break;
    if (candidates.some((commit) => normalizeModelId(getCandidateModel(commit)) === normalizeModelId(model))) {
      continue;
    }

    console.log(`Generating candidate ${candidates.length + 1}/${minCandidates} with ${model}`);
    await runInheritedAsync("bun", [
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
      "--run-lock-path",
      getTaskRunLockPath(task, model),
      ...optionalArg("--task-concurrency", candidateTaskConcurrency),
      ...optionalArg("--quiz-concurrency", quizConcurrency),
      ...optionalArg("--challenge-retries", challengeRetries),
      ...optionalFlag("--only-modified", shouldOnlyModified),
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
  await runInheritedAsync("bun", [
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

function optionalFlag(name: string, enabled: boolean) {
  return enabled ? [name] : [];
}

async function mapLimit<T>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<void>,
) {
  let nextIndex = 0;
  const failures: Array<{ item: T; error: Error }> = [];

  async function runWorker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      try {
        await worker(items[index], index);
      } catch (error) {
        if (!shouldContinueOnError) throw error;
        failures.push({
          item: items[index],
          error: error instanceof Error ? error : new Error(String(error)),
        });
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => runWorker()),
  );

  return failures;
}

function runInheritedAsync(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Command failed: ${command} ${args.join(" ")} (${signal ?? `code ${code}`})`));
    });
  });
}

function getTranslationTasks() {
  const slots = shouldOnlyModified ? getModifiedTranslationSlots({
    latestPosts,
    locales: selectedLocales,
    selectedSlugs,
  }) : getMissingTranslationSlots({
    latestPosts,
    locales: selectedLocales,
    selectedSlugs,
  });

  return slots.map(({ slug, locale, sourcePath, targetPath }) => ({ slug, locale, sourcePath, targetPath }));
}

function getCandidateCommits(task: Task) {
  const grep = `i18n candidate(${task.locale}): ${task.slug} via`;
  const output = run("git", ["log", "--format=%H", "--grep", grep]);
  const targetRelPath = relativeToRepo(task.targetPath);
  const sourceContents = shouldOnlyModified ? readFileSync(task.sourcePath, "utf8") : undefined;

  return output
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((commit) => {
      const candidateContents = getCandidateContentsFromCommit(commit, task, targetRelPath);
      if (candidateContents == null) return false;
      if (sourceContents == null) return true;
      return isTranslationFreshForSourceContents(sourceContents, candidateContents);
    })
    .reverse();
}

function getCandidateContentsFromCommit(commit: string, task: Task, targetRelPath: string) {
  const changedFiles = run("git", [
    "diff-tree",
    "--no-commit-id",
    "--name-only",
    "-r",
    commit,
  ]);

  if (changedFiles.split(/\r?\n/).includes(targetRelPath)) {
    try {
      return run("git", ["show", `${commit}:${targetRelPath}`]);
    } catch {
      // Fall through to timestamped candidate artifacts.
    }
  }

  const candidatePath = getCandidatePathFromCommit(commit, task);
  if (candidatePath == null) return undefined;

  try {
    return run("git", ["show", `${commit}:${candidatePath}`]);
  } catch {
    return undefined;
  }
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

function getTaskRunLockPath(task: Task, model: string) {
  return join(
    process.cwd(),
    ".git",
    "i18n-all-missing-runlocks",
    `${safeLockPart(task.slug)}-${task.locale}-${safeLockPart(normalizeModelId(model))}.json`,
  );
}

function safeLockPart(value: string) {
  return value.replace(/[^a-z0-9._-]+/gi, "-");
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
