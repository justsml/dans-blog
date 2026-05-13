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
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type JudgeSuggestion = {
  priority: "low" | "medium" | "high";
  match: string;
  replacement: string;
  reason: string;
};

type SuggestionLogEntry = JudgeSuggestion & {
  pass: number;
  applied: boolean;
  note: string;
};

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
const { sourcePath, targetPath, reportDir } = getPostPaths(slug, locale);
const sourceRelPath = relativeToRepo(sourcePath);
const targetRelPath = relativeToRepo(targetPath);
const maxPrePublishFixPasses = 2;

const releaseJudgeLock = acquireJudgeLock();
try {
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
    `The final MDX must preserve the English file's per-level heading counts: same number of H1, H2, H3, H4, H5, and H6 headings. Translate heading text, but do not add, remove, promote, or demote headings.`,
    `The final translated body must be longer than 600 characters and within 35% of the English body length.`,
    `Use git show <sha>:${targetRelPath} to inspect candidates.`,
    `Write the final selected and lightly polished MDX to ${targetRelPath}.`,
    `Also explain the decision in reports/i18n/${slug}/${locale}/judge.md.`,
    `Also write strict JSON to reports/i18n/${slug}/${locale}/judge.json with this shape:`,
    JSON.stringify(getJudgeJsonShape()),
    `Use suggestions only for concrete pre-publish fixes. Each high-priority suggestion must include an exact match string and exact replacement string from ${targetRelPath}.`,
    `Do not run package installation, build, or content validation commands. The wrapper script owns validation.`,
    `Do not create temporary candidate files. Inspect candidates directly from git when needed.`,
  ].join("\n");

  let primaryJudge = runJudgeCommand(judgeModel, prompt);
  if (!primaryJudge.ok) {
    throw new Error(primaryJudge.errorMessage);
  }

  const primaryTelemetry = getRunTelemetry(judgeModel, primaryJudge);
  const prePublishRescoreTelemetries: Array<{ pass: number; telemetry: ReturnType<typeof getRunTelemetry> }> = [];
  const suggestionLog = applyHighPrioritySuggestionsAndRescore({
    initialJudge: primaryJudge,
    candidateSummary,
    telemetrySink: prePublishRescoreTelemetries,
  });
  primaryJudge = suggestionLog.latestJudge;

  const secondJudge = secondJudgeModel == null
    ? undefined
    : runJudgeCommand(secondJudgeModel, getSecondJudgePrompt(candidateSummary), [
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
    ? runJudgeCommand(escalationJudgeModel, getEscalationPrompt(candidateSummary))
    : undefined;
  if (escalationJudge != null && !escalationJudge.ok) {
    throw new Error(escalationJudge.errorMessage);
  }

  const escalationTelemetry = escalationJudge == null || escalationJudgeModel == null
    ? undefined
    : getRunTelemetry(escalationJudgeModel, escalationJudge);

  const validation = runJudgeValidation();
  writeJudgeJsonValidation(validation, primaryJudge, candidateCommits, suggestionLog.entries);

  const suggestionLogPath = `${reportDir}/judge-suggestions.jsonl`;
  if (suggestionLog.entries.length > 0) {
    writeTextFile(
      suggestionLogPath,
      suggestionLog.entries.map((entry) => JSON.stringify(entry)).join("\n") + "\n",
    );
  }

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
      prePublishRescoreTelemetries.length === 0 ? undefined : `## Pre-Publish Rescore Telemetry`,
      ...prePublishRescoreTelemetries.flatMap(({ pass, telemetry }) => [
        `### Pass ${pass}`,
        ...renderTelemetryLines(telemetry),
        ``,
      ]),
      suggestionLog.entries.length === 0 ? undefined : `## Judge Suggestions`,
      ...renderSuggestionLogLines(suggestionLog.entries),
      suggestionLog.entries.length === 0 ? undefined : ``,
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
    const suggestionRelPath = `reports/i18n/${slug}/${locale}/judge-suggestions.jsonl`;
    gitCommit(`i18n judge(${locale}): select translation for ${slug}`, [
      targetRelPath,
      relativeToRepo(reportPath),
      ...(existsSync(judgeDetailPath) ? [judgeDetailPath] : []),
      ...(existsSync(judgeJsonPath) ? [judgeJsonPath] : []),
      ...(existsSync(secondJudgePath) ? [secondJudgePath] : []),
      ...(existsSync(escalationJudgePath) ? [escalationJudgePath] : []),
      ...(suggestionLog.entries.length > 0 ? [suggestionRelPath] : []),
    ]);
  }
} finally {
  releaseJudgeLock();
}

function getJudgeJsonShape() {
  return {
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
    suggestions: [
      {
        priority: "high",
        match: "exact translated text currently in the selected MDX",
        replacement: "exact replacement text to write into the selected MDX",
        reason: "English explanation of why this change is needed",
      },
    ],
    rationale: "brief selection rationale",
  };
}

function applyHighPrioritySuggestionsAndRescore({
  initialJudge,
  candidateSummary,
  telemetrySink,
}: {
  initialJudge: ReturnType<typeof runJudgeCommand>;
  candidateSummary: string;
  telemetrySink: Array<{ pass: number; telemetry: ReturnType<typeof getRunTelemetry> }>;
}) {
  let latestJudge = initialJudge;
  const entries: SuggestionLogEntry[] = [];

  for (let pass = 1; pass <= maxPrePublishFixPasses; pass += 1) {
    const suggestions = readJudgeSuggestions();
    if (suggestions.length === 0) {
      console.log(`[i18n judge] pre-publish suggestion pass ${pass}: no suggestions.`);
      break;
    }

    let appliedCount = 0;
    for (const suggestion of suggestions) {
      const entry = applyJudgeSuggestion(suggestion, pass);
      entries.push(entry);
      if (entry.applied) appliedCount += 1;
      console.log([
        `[i18n judge] pre-publish suggestion pass ${pass}:`,
        entry.applied ? "applied" : "logged",
        `${entry.priority} priority`,
        `match=${JSON.stringify(entry.match)}`,
        `replacement=${JSON.stringify(entry.replacement)}`,
        `reason=${entry.reason}`,
        `note=${entry.note}`,
      ].join(" "));
    }

    if (appliedCount === 0) break;

    const rescoreJudge = runJudgeCommand(judgeModel, getPrePublishRescorePrompt(pass, candidateSummary), [
      sourcePath,
      targetPath,
      `${reportDir}/judge.md`,
      `${reportDir}/judge.json`,
    ].filter((path) => existsSync(path)));
    if (!rescoreJudge.ok) {
      throw new Error(rescoreJudge.errorMessage);
    }

    telemetrySink.push({
      pass,
      telemetry: getRunTelemetry(judgeModel, rescoreJudge),
    });
    latestJudge = rescoreJudge;
  }

  if (entries.some((entry) => entry.priority === "high" && !entry.applied)) {
    console.warn("[i18n judge] Some high-priority suggestions were not auto-applied; see judge-suggestions.jsonl and judge-summary.md.");
  }

  return { latestJudge, entries };
}

function applyJudgeSuggestion(suggestion: JudgeSuggestion, pass: number): SuggestionLogEntry {
  if (suggestion.priority !== "high") {
    return {
      ...suggestion,
      pass,
      applied: false,
      note: "Not high priority; recorded for manual review.",
    };
  }

  if (suggestion.match.trim() === "" || suggestion.replacement.trim() === "") {
    return {
      ...suggestion,
      pass,
      applied: false,
      note: "High-priority suggestion did not include a non-empty exact match and replacement.",
    };
  }

  if (suggestion.match === suggestion.replacement) {
    return {
      ...suggestion,
      pass,
      applied: false,
      note: "Exact match and replacement are identical; no MDX change needed.",
    };
  }

  const contents = readFileSync(targetPath, "utf8");
  const matchIndex = contents.indexOf(suggestion.match);
  if (matchIndex === -1) {
    return {
      ...suggestion,
      pass,
      applied: false,
      note: "Exact match not found in selected MDX.",
    };
  }

  writeFileSync(
    targetPath,
    `${contents.slice(0, matchIndex)}${suggestion.replacement}${contents.slice(matchIndex + suggestion.match.length)}`,
    "utf8",
  );

  return {
    ...suggestion,
    pass,
    applied: true,
    note: "Applied exact replacement to selected MDX.",
  };
}

function readJudgeSuggestions() {
  const judgeJsonPath = `${reportDir}/judge.json`;
  if (!existsSync(judgeJsonPath)) return [];

  try {
    const parsed = JSON.parse(readFileSync(judgeJsonPath, "utf8")) as Record<string, unknown>;
    const suggestions = normalizeSuggestions(parsed.suggestions);
    if (suggestions.length > 0) return suggestions;

    return normalizeLegacySuggestedChanges(parsed.suggestedChanges);
  } catch {
    return [];
  }
}

function normalizeSuggestions(value: unknown): JudgeSuggestion[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (item == null || typeof item !== "object") return undefined;
      const record = item as Record<string, unknown>;
      const priority = normalizePriority(record.priority);
      const match = normalizeSuggestionString(record.match);
      const replacement = normalizeSuggestionString(record.replacement);
      const reason = normalizeSuggestionString(record.reason);
      if (priority == null || match == null || replacement == null || reason == null) return undefined;
      return { priority, match, replacement, reason };
    })
    .filter((suggestion): suggestion is JudgeSuggestion => suggestion != null);
}

function normalizeLegacySuggestedChanges(value: unknown): JudgeSuggestion[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (item == null || typeof item !== "object") return undefined;
      const record = item as Record<string, unknown>;
      const priority = normalizePriority(record.severity);
      const match = normalizeSuggestionString(record.current);
      const replacement = normalizeSuggestionString(record.suggested);
      const reason = normalizeSuggestionString(record.reason);
      if (priority == null || match == null || replacement == null || reason == null) return undefined;
      return { priority, match, replacement, reason };
    })
    .filter((suggestion): suggestion is JudgeSuggestion => suggestion != null);
}

function normalizePriority(value: unknown): JudgeSuggestion["priority"] | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.toLowerCase();
  if (normalized === "critical") return "high";
  if (normalized === "high" || normalized === "medium" || normalized === "low") return normalized;
  return undefined;
}

function normalizeSuggestionString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function renderSuggestionLogLines(entries: SuggestionLogEntry[]) {
  if (entries.length === 0) return [];

  return entries.map((entry, index) =>
    [
      `${index + 1}. Pass ${entry.pass}: ${entry.applied ? "applied" : "logged"} ${entry.priority} priority suggestion.`,
      `Match: ${truncateForReport(entry.match)}`,
      `Replacement: ${truncateForReport(entry.replacement)}`,
      `Reason: ${entry.reason}`,
      `Note: ${entry.note}`,
    ].join(" "),
  );
}

function truncateForReport(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length <= 180 ? JSON.stringify(normalized) : JSON.stringify(`${normalized.slice(0, 177)}...`);
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

function writeJudgeJsonValidation(
  validation: ReturnType<typeof runJudgeValidation>,
  primaryJudge: ReturnType<typeof runJudgeCommand>,
  candidateCommits: string[],
  suggestionLogEntries: SuggestionLogEntry[],
) {
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
    suggestions: [],
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
    suggestionLog: suggestionLogEntries,
    validation,
  }, null, 2));
}

function acquireJudgeLock() {
  const lockDir = join(process.cwd(), ".git/codex-i18n-judge.lock");
  const ownerPath = join(lockDir, "owner.json");
  const staleCleanupAfterMs = 6 * 60 * 1000;
  const logEveryMs = 30 * 1000;
  const startedWaitingAt = Date.now();
  let lastLogAt = 0;
  let cleanedStaleLock = false;

  while (true) {
    try {
      mkdirSync(lockDir);
      writeFileSync(ownerPath, JSON.stringify({
        pid: process.pid,
        slug,
        locale,
        startedAt: new Date().toISOString(),
      }, null, 2), "utf8");
      return () => rmSync(lockDir, { recursive: true, force: true });
    } catch (error) {
      if (!existsSync(lockDir)) throw error;

      const now = Date.now();
      if (now - lastLogAt >= logEveryMs) {
        const owner = readJudgeLockOwner(ownerPath);
        const ownerLabel = owner == null
          ? "unknown owner"
          : `pid ${owner.pid ?? "unknown"} (${owner.slug ?? "unknown slug"} ${owner.locale ?? "unknown locale"})`;
        console.error(`Waiting for i18n judge lock held by ${ownerLabel}.`);
        lastLogAt = now;
      }

      if (!cleanedStaleLock && now - startedWaitingAt >= staleCleanupAfterMs) {
        const owner = readJudgeLockOwner(ownerPath);
        if (owner == null || !isProcessAlive(owner.pid)) {
          console.error("Cleaning stale i18n judge lock after waiting more than 6 minutes.");
          rmSync(lockDir, { recursive: true, force: true });
          cleanedStaleLock = true;
          continue;
        }
      }

      sleep(1000);
    }
  }
}

function readJudgeLockOwner(ownerPath: string): Record<string, unknown> | undefined {
  try {
    return JSON.parse(readFileSync(ownerPath, "utf8")) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

function isProcessAlive(pid: unknown) {
  if (typeof pid !== "number" || !Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function sleep(milliseconds: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
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

function getPrePublishRescorePrompt(pass: number, candidateSummary: string) {
  return [
    `You are re-scoring the current selected ${locale} translation for ${slug} after pre-publish fixes pass ${pass}.`,
    `Do not run shell commands, git commands, package installation, build, or validation commands.`,
    `Read the attached English source, selected translation, judge report, and judge JSON.`,
    `Candidate commits for context:`,
    candidateSummary,
    ``,
    `Check ${targetRelPath} against ${sourceRelPath} for technical accuracy, natural language quality, Dan's direct style, MDX preservation, per-level heading count preservation, and comparable body length.`,
    `Do not edit ${targetRelPath}. The wrapper script applies exact high-priority replacements after you write JSON.`,
    `Update reports/i18n/${slug}/${locale}/judge.md with the refreshed scoring and pre-publish status.`,
    `Update reports/i18n/${slug}/${locale}/judge.json as strict JSON with this shape:`,
    JSON.stringify(getJudgeJsonShape()),
    `Use suggestions only for concrete pre-publish fixes. Each high-priority suggestion must include an exact match string currently present in ${targetRelPath}, an exact replacement string, and an English reason.`,
    `If no high-priority fixes remain, return "suggestions": [].`,
  ].join("\n");
}

function getSecondJudgePrompt(candidateSummary: string) {
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
    `Check for MDX/frontmatter breakage, heading count mismatches by level, untranslated reader-facing prose, major terminology errors, and obvious tone regressions.`,
    `Write your agreement or disagreement in reports/i18n/${slug}/${locale}/judge-second.md.`,
    `Keep the report concise. If acceptable, include the exact phrase "No escalation required".`,
    `Do not edit ${targetRelPath}. If you disagree, state the exact candidate SHA or issue that requires escalation.`,
  ].join("\n");
}

function getEscalationPrompt(candidateSummary: string) {
  return [
    `Resolve the judge disagreement for ${locale} translation candidates for ${slug}.`,
    `Candidate commits:`,
    candidateSummary,
    ``,
    `Read reports/i18n/${slug}/${locale}/judge.md and reports/i18n/${slug}/${locale}/judge-second.md.`,
    `Use git show <sha>:${targetRelPath} to inspect candidates.`,
    `The final MDX must preserve the English file's per-level heading counts: same number of H1, H2, H3, H4, H5, and H6 headings.`,
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
