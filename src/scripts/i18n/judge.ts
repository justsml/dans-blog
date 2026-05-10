import {
  getPostPaths,
  gitCommit,
  optionalString,
  parseArgs,
  parseList,
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
const judgeModel = optionalString(options, "model") ?? "openrouter/google/gemini-3-flash-preview";
const secondJudgeModel = optionalString(options, "second-model");
const escalationJudgeModel = optionalString(options, "escalate-model");
const selectedCommit = optionalString(options, "select");
const candidateModels = parseList(optionalString(options, "candidate-models"), []);
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

const shouldEscalate = secondJudge != null && shouldEscalateSecondJudge({
  primaryOutput: primaryJudge.output,
  secondOutput: secondJudge.output,
});
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

function shouldEscalateSecondJudge({
  primaryOutput,
  secondOutput,
}: {
  primaryOutput: string;
  secondOutput: string;
}) {
  const primarySelection = parseSelectedCommit(primaryOutput);
  const secondSelection = parseSelectedCommit(secondOutput);
  if (primarySelection != null && secondSelection != null && primarySelection !== secondSelection) {
    return true;
  }

  const normalized = secondOutput.toLowerCase();
  const explicitNoEscalationPatterns = [
    /no escalation required/,
    /no escalation needed/,
    /escalation (?:is )?not required/,
    /escalation (?:is )?not needed/,
    /no disagreement/,
    /no changes? (?:to [^\r\n]+ )?needed/,
  ];

  if (explicitNoEscalationPatterns.some((pattern) => pattern.test(normalized))) {
    return false;
  }

  if (/disagree|not agree|no estoy de acuerdo|不一致|同意しない/i.test(secondOutput)) {
    return true;
  }

  if (/\bagree\b|\bagreement\b/i.test(secondOutput)) {
    return false;
  }

  return /escalat|different/i.test(secondOutput);
}

function parseSelectedCommit(output: string) {
  const selectedPatterns = [
    /selected candidate:\s*`?([a-f0-9]{40})/i,
    /recommendation:\s*(?:\r?\n)?accept[^\r\n]*?`?([a-f0-9]{40})/i,
    /accept the selected translation[^\r\n]*?`?([a-f0-9]{40})/i,
    /accept[^\r\n]*?\(commit\s+`?([a-f0-9]{40})/i,
    /selected[^\r\n]*?\(`?([a-f0-9]{40})`?\)/i,
    /current[^\r\n]*?\(commit\s+`?([a-f0-9]{40})`?\)/i,
    /keep[^\r\n]*?\(commit\s+`?([a-f0-9]{40})`?\)/i,
  ];

  for (const pattern of selectedPatterns) {
    const match = output.match(pattern);
    if (match?.[1] != null) return match[1];
  }

  return undefined;
}

function getCandidateCommits() {
  const grep = `i18n candidate(${locale}): ${slug} via`;
  const output = run("git", ["log", "--format=%H", "--grep", grep]);
  return output
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((commit) => commitChangesTarget(commit))
    .filter((commit) => candidateModels.length === 0 || candidateModels.includes(getCandidateModel(commit)))
    .reverse();
}

function getCandidateModel(commit: string) {
  const subject = run("git", ["show", "-s", "--format=%s", commit]);
  return subject.match(/ via (.+)$/)?.[1] ?? "";
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
  if (rawValue == null) return 240;

  const parsedValue = Number(rawValue);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`--timeout-seconds must be a positive integer. Received "${rawValue}".`);
  }

  return parsedValue;
}
