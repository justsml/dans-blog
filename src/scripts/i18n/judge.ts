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
  writeTextFile,
} from "./utils.ts";
import { getRunTelemetry, renderTelemetryLines, runMeasuredCommand } from "./telemetry.ts";
import { existsSync, readFileSync } from "node:fs";

const OPENCODE_COMMAND = existsSync("/Users/dan/.opencode/bin/opencode")
  ? "/Users/dan/.opencode/bin/opencode"
  : "opencode";

const options = parseArgs();
const slug = requireString(options, "slug");
const locale = requireActiveLocale(options);
const judgeModel = optionalString(options, "model") ?? "openrouter/google/gemini-3-flash-preview";
const secondJudgeModel = optionalString(options, "second-model");
const escalationJudgeModel = optionalString(options, "escalate-model");
validateJudgeModels({ judgeModel, secondJudgeModel, escalationJudgeModel });
const selectedCommit = optionalString(options, "select");
const candidateModels = parseList(optionalString(options, "candidate-models"), []);
const candidateLimit = parseOptionalPositiveInteger(optionalString(options, "candidate-limit"), "candidate-limit");
const shouldSkipCommit = options["no-commit"] === true;
const shouldAllowSingleCandidate = options["allow-single-candidate"] === true;
const shouldRunFullValidation = options["full-validation"] === true;
const timeoutSeconds = getTimeoutSeconds();
const { targetPath, reportDir } = getPostPaths(slug, locale);
const targetRelPath = relativeToRepo(targetPath);

const candidateCommits = getCandidateCommits();
if (candidateCommits.length === 0) {
  throw new Error(`No candidate commits found for ${slug} ${locale}.`);
}
if (candidateCommits.length < 2 && !shouldAllowSingleCandidate) {
  throw new Error(
    `Judge requires at least 2 candidate translations for ${slug} ${locale}. Found ${candidateCommits.length}. Pass --allow-single-candidate to override.`,
  );
}

const candidateSummary = candidateCommits
  .map((commit) => `- ${commit} ${run("git", ["show", "-s", "--format=%s", commit])}`)
  .join("\n");

const prompt = [
  "You are a constrained translation judge.",
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
  `Also write strict JSON to reports/i18n/${slug}/${locale}/judge.json with this shape:`,
  JSON.stringify({
    selectedCommit: "full candidate commit sha",
    selectedModel: "model id from commit subject",
    scores: {
      readability: 0,
      technicalAccuracy: 0,
      coherence: 0,
      relevance: 0,
      translationQuality: 0,
      mdxPreservation: 0,
    },
    suggestedChanges: [
      {
        severity: "low",
        category: "terminology",
        location: "heading or short excerpt",
        current: "text to improve",
        suggested: "replacement or action",
        reason: "why this change helps",
      },
    ],
    rationale: "brief selection rationale",
  }),
  `Do not run package installation, build, or content validation commands. The wrapper script owns validation.`,
  `Do not create temporary candidate files. Inspect candidates directly from git when needed.`,
].join("\n");

const primaryJudge = runJudgeCommand(judgeModel, prompt);
if (!primaryJudge.ok) {
  throw new Error(primaryJudge.errorMessage);
}

const primaryTelemetry = getRunTelemetry(judgeModel, primaryJudge);

const secondJudge = secondJudgeModel == null
  ? undefined
  : runJudgeCommand(secondJudgeModel, getSecondJudgePrompt(), [
    targetPath,
    `${reportDir}/judge.md`,
  ].filter((path) => existsSync(path)));
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

const validation = runJudgeValidation();
writeJudgeJsonValidation(validation);

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
    `- Validation: ${validation.ok ? "passed" : "failed"}`,
    `- Validation scope: ${validation.scope}`,
    validation.ok ? undefined : `- Validation error: ${validation.error}`,
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
  const judgeJsonPath = `reports/i18n/${slug}/${locale}/judge.json`;
  const secondJudgePath = `reports/i18n/${slug}/${locale}/judge-second.md`;
  const escalationJudgePath = `reports/i18n/${slug}/${locale}/judge-escalation.md`;
  gitCommit(`i18n judge(${locale}): select translation for ${slug}`, [
    targetRelPath,
    relativeToRepo(reportPath),
    ...(existsSync(judgeDetailPath) ? [judgeDetailPath] : []),
    ...(existsSync(judgeJsonPath) ? [judgeJsonPath] : []),
    ...(existsSync(secondJudgePath) ? [secondJudgePath] : []),
    ...(existsSync(escalationJudgePath) ? [escalationJudgePath] : []),
  ]);
}

function runJudgeValidation() {
  const args = ["run", "i18n:validate", "--slug", slug, "--locale", locale];
  if (!shouldRunFullValidation) args.push("--skip-global");

  try {
    const output = run("bun", args);
    return {
      ok: true,
      scope: shouldRunFullValidation ? "full" : "local",
      command: `bun ${args.join(" ")}`,
      output,
    };
  } catch (error) {
    return {
      ok: false,
      scope: shouldRunFullValidation ? "full" : "local",
      command: `bun ${args.join(" ")}`,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function writeJudgeJsonValidation(validation: ReturnType<typeof runJudgeValidation>) {
  const judgeJsonPath = `${reportDir}/judge.json`;
  const fallback = {
    selectedCommit: parseSelectedCommit(primaryJudge.output) ?? selectedCommit ?? null,
    selectedModel: null,
    scores: {
      readability: null,
      technicalAccuracy: null,
      coherence: null,
      relevance: null,
      translationQuality: null,
      mdxPreservation: null,
    },
    suggestedChanges: [],
    rationale: "Judge did not leave structured JSON; wrapper recorded validation metadata.",
  };

  let parsed: Record<string, unknown> = fallback;
  if (existsSync(judgeJsonPath)) {
    try {
      parsed = JSON.parse(readFileSync(judgeJsonPath, "utf8")) as Record<string, unknown>;
    } catch {
      parsed = fallback;
    }
  }

  writeTextFile(judgeJsonPath, JSON.stringify({
    ...parsed,
    slug,
    locale,
    candidateCommits,
    validation,
  }, null, 2));
}

function runJudgeCommand(model: string, judgePrompt: string, files: string[] = []) {
  return runMeasuredCommand(OPENCODE_COMMAND, [
  "run",
  "--model",
  model,
  ...getVariantArgs(model),
  ...files.flatMap((file) => ["--file", file]),
  "--dangerously-skip-permissions",
  judgePrompt,
  ], timeoutSeconds * 1000);
}

function validateJudgeModels({
  judgeModel,
  secondJudgeModel,
  escalationJudgeModel,
}: {
  judgeModel: string;
  secondJudgeModel?: string;
  escalationJudgeModel?: string;
}) {
  const cheapJudgeModels = [judgeModel, secondJudgeModel].filter((model): model is string => model != null);
  const forbiddenCheapJudges = cheapJudgeModels.filter((model) =>
    model.includes("-fast") ||
    model.startsWith("openrouter/openai/") ||
    model.startsWith("openrouter/anthropic/"),
  );
  const forbiddenEscalation = escalationJudgeModel == null
    ? []
    : [escalationJudgeModel].filter((model) =>
      model.includes("-fast") ||
      model.startsWith("openrouter/openai/"),
    );

  if (forbiddenCheapJudges.length > 0 || forbiddenEscalation.length > 0) {
    throw new Error([
      "Judge models must use cheap non-GPT/non-Anthropic models, except Anthropic is allowed only as the explicit escalation judge.",
      `Forbidden model(s): ${[...forbiddenCheapJudges, ...forbiddenEscalation].join(", ")}`,
    ].join(" "));
  }
}

function getSecondJudgePrompt() {
  return [
    `You are a constrained second-pass reviewer for the selected ${locale} translation of ${slug}.`,
    `Do not run shell commands, git commands, package installation, build, or validation commands.`,
    `Read the attached selected translation and primary judge report.`,
    `Only inspect candidate commits if the selected translation appears structurally broken or obviously mistranslated.`,
    ``,
    `Review the selected ${locale} translation for ${slug}.`,
    `Candidate commits:`,
    candidateSummary,
    ``,
    `Check for MDX/frontmatter breakage, untranslated reader-facing prose, major terminology errors, and obvious tone regressions.`,
    `Write your agreement or disagreement in reports/i18n/${slug}/${locale}/judge-second.md.`,
    `Keep the report concise. If acceptable, include the exact phrase "No escalation required".`,
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
  const commits = output
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((commit) => commitChangesTarget(commit))
    .filter((commit) => candidateModels.length === 0 || candidateModels.includes(getCandidateModel(commit)))
    .reverse();

  return candidateLimit == null ? commits : commits.slice(-candidateLimit);
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
  if (model.includes("gpt-5") || model.includes("gpt-oss") || model.includes("qwen") || model.includes("glm")) {
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

  return parsePositiveInteger(rawValue, "timeout-seconds");
}

function parseOptionalPositiveInteger(rawValue: string | undefined, optionName: string) {
  if (rawValue == null) return undefined;
  return parsePositiveInteger(rawValue, optionName);
}

function parsePositiveInteger(rawValue: string, optionName: string) {
  const parsedValue = Number(rawValue);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`--${optionName} must be a positive integer. Received "${rawValue}".`);
  }

  return parsedValue;
}
