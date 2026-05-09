import {
  getPostPaths,
  gitCommit,
  optionalString,
  parseArgs,
  relativeToRepo,
  requireActiveLocale,
  requireString,
  run,
  runInherited,
  writeTextFile,
} from "./utils.ts";
import { getRunTelemetry, renderTelemetryLines, runMeasuredCommand } from "./telemetry.ts";
import { existsSync } from "node:fs";

const options = parseArgs();
const slug = requireString(options, "slug");
const locale = requireActiveLocale(options);
const judgeModel = optionalString(options, "model") ?? "openrouter/openai/gpt-5.4-mini";
const secondJudgeModel = optionalString(options, "second-model");
const escalationJudgeModel = optionalString(options, "escalate-model");
const selectedCommit = optionalString(options, "select");
const shouldSkipCommit = options["no-commit"] === true;
const timeoutSeconds = getTimeoutSeconds();
const { targetPath, reportDir } = getPostPaths(slug, locale);
const targetRelPath = relativeToRepo(targetPath);

const candidateCommits = getCandidateCommits();
if (candidateCommits.length === 0) {
  throw new Error(`No candidate commits found for ${slug} ${locale}.`);
}

const candidateSummary = candidateCommits
  .map((commit) => `- ${commit} ${run("git", ["show", "-s", "--format=%s", commit])}`)
  .join("\n");

const prompt = [
  `Judge the ${locale} translation candidates for ${slug}.`,
  `Candidate commits:`,
  candidateSummary,
  ``,
  selectedCommit
    ? `Use ${selectedCommit} as the selected candidate unless it is structurally broken.`
    : "Choose the best candidate by technical accuracy, natural language quality, Dan's direct style, and MDX preservation.",
  `Use git show <sha>:${targetRelPath} to inspect candidates.`,
  `Write the final selected and lightly polished MDX to ${targetRelPath}.`,
  `Also explain the decision in reports/i18n/${slug}/${locale}/judge.md.`,
].join("\n");

const primaryJudge = runJudgeCommand(judgeModel, prompt);
if (!primaryJudge.ok) {
  throw new Error(primaryJudge.errorMessage);
}

const primaryTelemetry = getRunTelemetry(judgeModel, primaryJudge);

const secondJudge = secondJudgeModel == null
  ? undefined
  : runJudgeCommand(secondJudgeModel, getSecondJudgePrompt());
if (secondJudge != null && !secondJudge.ok) {
  throw new Error(secondJudge.errorMessage);
}

const secondTelemetry = secondJudge == null || secondJudgeModel == null
  ? undefined
  : getRunTelemetry(secondJudgeModel, secondJudge);

const shouldEscalate = secondJudge != null && /disagree|escalat|different|not agree|no estoy de acuerdo|不一致|同意しない/i.test(secondJudge.output);
const escalationJudge = shouldEscalate && escalationJudgeModel != null
  ? runJudgeCommand(escalationJudgeModel, getEscalationPrompt())
  : undefined;
if (escalationJudge != null && !escalationJudge.ok) {
  throw new Error(escalationJudge.errorMessage);
}

const escalationTelemetry = escalationJudge == null || escalationJudgeModel == null
  ? undefined
  : getRunTelemetry(escalationJudgeModel, escalationJudge);

runInherited("bun", ["run", "i18n:validate", "--slug", slug, "--locale", locale]);

const reportPath = `${reportDir}/judge-summary.md`;
writeTextFile(
  reportPath,
  [
    `# Translation Judge Summary`,
    ``,
    `- Slug: ${slug}`,
    `- Locale: ${locale}`,
    `- Judge model: ${judgeModel}`,
    `- Second judge model: ${secondJudgeModel ?? "not run"}`,
    `- Escalation judge model: ${escalationJudge == null ? "not run" : escalationJudgeModel}`,
    `- Selected commit hint: ${selectedCommit ?? "judge selected"}`,
    ``,
    `## Primary Judge Telemetry`,
    ...renderTelemetryLines(primaryTelemetry),
    ``,
    secondTelemetry == null ? undefined : `## Second Judge Telemetry`,
    ...(secondTelemetry == null ? [] : renderTelemetryLines(secondTelemetry)),
    secondTelemetry == null ? undefined : ``,
    escalationTelemetry == null ? undefined : `## Escalation Judge Telemetry`,
    ...(escalationTelemetry == null ? [] : renderTelemetryLines(escalationTelemetry)),
    escalationTelemetry == null ? undefined : ``,
    `## Candidates`,
    candidateSummary,
    ``,
  ].filter((line) => line != null).join("\n"),
);

if (!shouldSkipCommit) {
  const judgeDetailPath = `reports/i18n/${slug}/${locale}/judge.md`;
  const secondJudgePath = `reports/i18n/${slug}/${locale}/judge-second.md`;
  const escalationJudgePath = `reports/i18n/${slug}/${locale}/judge-escalation.md`;
  gitCommit(`i18n judge(${locale}): select translation for ${slug}`, [
    targetRelPath,
    relativeToRepo(reportPath),
    ...(existsSync(judgeDetailPath) ? [judgeDetailPath] : []),
    ...(existsSync(secondJudgePath) ? [secondJudgePath] : []),
    ...(existsSync(escalationJudgePath) ? [escalationJudgePath] : []),
  ]);
}

function runJudgeCommand(model: string, judgePrompt: string) {
  return runMeasuredCommand("opencode", [
  "run",
  "--model",
  model,
  ...getVariantArgs(model),
  "--dangerously-skip-permissions",
  judgePrompt,
  ], timeoutSeconds * 1000);
}

function getSecondJudgePrompt() {
  return [
    `Review the selected ${locale} translation for ${slug}.`,
    `Candidate commits:`,
    candidateSummary,
    ``,
    `Inspect ${targetRelPath} and the candidates with git show.`,
    `Write your agreement or disagreement in reports/i18n/${slug}/${locale}/judge-second.md.`,
    `Do not edit ${targetRelPath}. If you disagree, state the exact candidate SHA or issue that requires escalation.`,
  ].join("\n");
}

function getEscalationPrompt() {
  return [
    `Resolve the judge disagreement for ${locale} translation candidates for ${slug}.`,
    `Candidate commits:`,
    candidateSummary,
    ``,
    `Read reports/i18n/${slug}/${locale}/judge.md and reports/i18n/${slug}/${locale}/judge-second.md.`,
    `Use git show <sha>:${targetRelPath} to inspect candidates.`,
    `Write the final selected and lightly polished MDX to ${targetRelPath}.`,
    `Explain the escalation decision in reports/i18n/${slug}/${locale}/judge-escalation.md.`,
  ].join("\n");
}

function getCandidateCommits() {
  const grep = `i18n candidate(${locale}): ${slug} via`;
  const output = run("git", ["log", "--format=%H", "--grep", grep]);
  return output
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((commit) => commitChangesTarget(commit))
    .reverse();
}

function commitChangesTarget(commit: string) {
  const changedFiles = run("git", [
    "diff-tree",
    "--no-commit-id",
    "--name-only",
    "-r",
    commit,
  ]);
  return changedFiles.split(/\r?\n/).includes(targetRelPath);
}

function getVariantArgs(model: string) {
  if (model.includes("gpt-5") || model.includes("qwen") || model.includes("glm")) {
    return ["--variant", "low"];
  }

  if (model.includes("gemini-3")) {
    return ["--variant", "minimal"];
  }

  return [];
}

function getTimeoutSeconds() {
  const rawValue = optionalString(options, "timeout-seconds");
  if (rawValue == null) return 90;

  const parsedValue = Number(rawValue);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`--timeout-seconds must be a positive integer. Received "${rawValue}".`);
  }

  return parsedValue;
}
