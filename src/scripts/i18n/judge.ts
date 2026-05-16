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
import { getRunTelemetry, renderTelemetryLines } from "./telemetry.ts";
import { OPENROUTER_USAGE_ACCOUNTING } from "./llm-telemetry.ts";
import { generateText } from "./braintrust.ts";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  assertNoOutOfCreditMarker,
  isOutOfCreditError,
  recordOutOfCreditIssue,
} from "./out-of-credit.ts";
import {
  averageJudgeScore,
  deriveJudgeConfidence,
  buildEscalationPrompt,
  buildPrePublishRescorePrompt,
  buildPrimaryJudgePrompt,
  buildSecondJudgePrompt,
  getJudgeJsonShape,
  isBlockingSuggestion,
  normalizeLegacySuggestedChanges,
  normalizeJudgeScores,
  normalizeSuggestions,
  normalizeSelectedCandidate,
  parseJudgeOutput,
  parseSelectedCommit,
  readSuggestionsFromParsed,
  shouldEscalateSecondJudge,
  type CandidateRef,
  type JudgeConfidence,
  type JudgeSuggestion,
} from "./judge-utils.ts";

type SuggestionLogEntry = JudgeSuggestion & {
  pass: number;
  applied: boolean;
  note: string;
};

type JudgeCommandResult = {
  ok: boolean;
  runtimeMs: number;
  output: string;
  errorMessage?: string;
};


type JudgeOperationKind = "candidate-batch" | "final" | "fix-rescore" | "second" | "escalation";

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
assertNoOutOfCreditMarker();
const sourceRelPath = relativeToRepo(sourcePath);
const targetRelPath = relativeToRepo(targetPath);
const articleReportDir = join(process.cwd(), "reports/i18n", slug);
const judgementsPath = join(articleReportDir, "judgements.jsonl");
const maxCandidatesPerJudgePass = Math.min(
  3,
  parseOptionalPositiveInteger(optionalString(options, "judge-batch-size"), "judge-batch-size") ?? 3,
);
const maxPrePublishFixPasses =
  parseOptionalPositiveInteger(optionalString(options, "fix-pass-limit"), "fix-pass-limit") ?? 2;

const releaseJudgeLock = acquireJudgeLock();
try {
  const candidateCommits = getCandidateCommits();
  const initialCandidates = getInitialCandidateRefs(candidateCommits);
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
  const currentSummary = existsSync(targetPath)
    ? `- current ${targetRelPath}`
    : "- current not present";

  const tournament = await selectCandidateInBatches(initialCandidates, candidateSummary);
  let primaryJudge = tournament.finalJudge;
  if (!primaryJudge.ok) {
    throw new Error(primaryJudge.errorMessage);
  }
  materializePrimaryJudgeResult(primaryJudge, tournament.finalCandidates);

  const primaryTelemetry = getRunTelemetry(judgeModel, primaryJudge);
  const prePublishRescoreTelemetries: Array<{ pass: number; telemetry: ReturnType<typeof getRunTelemetry> }> = [];
  const suggestionLog = await applyHighPrioritySuggestionsAndRescore({
    initialJudge: primaryJudge,
    latestCandidates: tournament.finalCandidates,
    candidateSummary,
    telemetrySink: prePublishRescoreTelemetries,
  });
  primaryJudge = suggestionLog.latestJudge;

  const secondJudge = secondJudgeModel == null
    ? undefined
    : await runJudgeOperation(secondJudgeModel, getSecondJudgePrompt(candidateSummary), [
      targetPath,
      `${reportDir}/judge.md`,
    ].filter((path) => existsSync(path)), "second");
  if (secondJudge != null && !secondJudge.ok) {
    throw new Error(secondJudge.errorMessage);
  }
  if (secondJudge != null) {
    writeTextFile(`${reportDir}/judge-second.md`, renderJudgeMarkdown(secondJudge.output));
  }

  const secondTelemetry = secondJudge == null || secondJudgeModel == null
    ? undefined
    : getRunTelemetry(secondJudgeModel, secondJudge);

  const shouldEscalate = secondJudge != null && shouldEscalateSecondJudge({
    primaryOutput: primaryJudge.output,
    secondOutput: secondJudge.output,
  });
  const escalationJudge = shouldEscalate && escalationJudgeModel != null
    ? await runJudgeOperation(escalationJudgeModel, getEscalationPrompt(candidateSummary), tournament.finalCandidates, "escalation")
    : undefined;
  if (escalationJudge != null && !escalationJudge.ok) {
    throw new Error(escalationJudge.errorMessage);
  }
  if (escalationJudge != null) {
    materializePrimaryJudgeResult(escalationJudge, tournament.finalCandidates, "judge-escalation.md", escalationJudgeModel);
  }

  const escalationTelemetry = escalationJudge == null || escalationJudgeModel == null
    ? undefined
    : getRunTelemetry(escalationJudgeModel, escalationJudge);

  const validation = runJudgeValidation();
  writeJudgeJsonValidation(validation, primaryJudge, candidateCommits, suggestionLog.entries);
  const judgeRunConfidence = deriveJudgeRunConfidence({
    primaryJudge,
    primaryJudgeModel: judgeModel,
    secondJudge,
    secondJudgeModel,
    escalationJudge,
    escalationJudgeModel,
    shouldEscalate,
  });
  appendJudgement({
    event: "confidence",
    scoreSource: "judge",
    operation: "final-run",
    slug,
    locale,
    judgeModel,
    confidence: judgeRunConfidence.level,
    confidenceScore: judgeRunConfidence.score,
    confidenceSignals: judgeRunConfidence.signals,
    issueCounts: judgeRunConfidence.issueCounts,
    validationOk: validation.ok,
    secondJudgeModel,
    escalationJudgeModel: escalationJudge == null ? undefined : escalationJudgeModel,
    escalated: escalationJudge != null,
    shouldEscalate,
  });

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
      `- Max candidate commits per judge call: ${maxCandidatesPerJudgePass}`,
      `- Fix pass limit: ${maxPrePublishFixPasses}`,
      `- Selected commit hint: ${selectedCommit ?? "judge selected"}`,
      `- Validation: ${validation.ok ? "passed" : "failed"}`,
      `- Validation scope: ${validation.scope}`,
      `- Confidence: ${judgeRunConfidence.level} (${judgeRunConfidence.score.toFixed(3)})`,
      `- Confidence signals: ${judgeRunConfidence.signals.join("; ") || "none"}`,
      `- High/medium/low issue counts: ${judgeRunConfidence.issueCounts.high}/${judgeRunConfidence.issueCounts.medium}/${judgeRunConfidence.issueCounts.low}`,
      validation.ok ? undefined : `- Validation error: ${validation.error}`,
      ``,
      tournament.telemetries.length === 0 ? undefined : `## Batch Judge Telemetry`,
      ...tournament.telemetries.flatMap(({ round, batch, telemetry }) => [
        `### Round ${round}, Batch ${batch}`,
        ...renderTelemetryLines(telemetry),
        ``,
      ]),
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
      currentSummary,
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
    const judgementsRelPath = `reports/i18n/${slug}/judgements.jsonl`;
    gitCommit(`i18n judge(${locale}): select translation for ${slug}`, [
      targetRelPath,
      relativeToRepo(reportPath),
      ...(existsSync(judgeDetailPath) ? [judgeDetailPath] : []),
      ...(existsSync(judgeJsonPath) ? [judgeJsonPath] : []),
      ...(existsSync(secondJudgePath) ? [secondJudgePath] : []),
      ...(existsSync(escalationJudgePath) ? [escalationJudgePath] : []),
      ...(suggestionLog.entries.length > 0 ? [suggestionRelPath] : []),
      ...(existsSync(judgementsRelPath) ? [judgementsRelPath] : []),
    ]);
  }
} finally {
  releaseJudgeLock();
}


async function applyHighPrioritySuggestionsAndRescore({
  initialJudge,
  latestCandidates,
  candidateSummary,
  telemetrySink,
}: {
  initialJudge: JudgeCommandResult;
  latestCandidates: CandidateRef[];
  candidateSummary: string;
  telemetrySink: Array<{ pass: number; telemetry: ReturnType<typeof getRunTelemetry> }>;
}) {
  let latestJudge = initialJudge;
  const entries: SuggestionLogEntry[] = [];

  for (let pass = 1; pass <= maxPrePublishFixPasses; pass += 1) {
    const suggestions = readJudgeSuggestions();
    const blockingSuggestions = suggestions.filter((suggestion) => isBlockingSuggestion(suggestion));
    if (blockingSuggestions.length === 0) {
      console.log(`[i18n judge] pre-publish suggestion pass ${pass}: no medium/high suggestions.`);
      break;
    }

    let appliedCount = 0;
    for (const suggestion of blockingSuggestions) {
      const entry = applyJudgeSuggestion(suggestion, pass);
      entries.push(entry);
      appendJudgement({
        event: "fix-application",
        slug,
        locale,
        pass,
        priority: entry.priority,
        applied: entry.applied,
        note: entry.note,
        reason: entry.reason,
      });
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

    const rescoreJudge = await runJudgeOperation(judgeModel, getPrePublishRescorePrompt(pass, candidateSummary), [
      sourcePath,
      targetPath,
      `${reportDir}/judge.md`,
      `${reportDir}/judge.json`,
    ].filter((path) => existsSync(path)), "fix-rescore", { pass });
    if (!rescoreJudge.ok) {
      throw new Error(rescoreJudge.errorMessage);
    }

    materializePrimaryJudgeResult(rescoreJudge, latestCandidates);
    telemetrySink.push({
      pass,
      telemetry: getRunTelemetry(judgeModel, rescoreJudge),
    });
    latestJudge = rescoreJudge;
  }

  if (entries.some((entry) => isBlockingSuggestion(entry) && !entry.applied)) {
    console.warn("[i18n judge] Some medium/high-priority suggestions were not auto-applied; see judge-suggestions.jsonl and judge-summary.md.");
  }

  return { latestJudge, entries };
}

function applyJudgeSuggestion(suggestion: JudgeSuggestion, pass: number): SuggestionLogEntry {
  if (!isBlockingSuggestion(suggestion)) {
    return {
      ...suggestion,
      pass,
      applied: false,
      note: "Not medium/high priority; recorded for manual review.",
    };
  }

  if (suggestion.match.trim() === "" || suggestion.replacement.trim() === "") {
    return {
      ...suggestion,
      pass,
      applied: false,
      note: "Medium/high-priority suggestion did not include a non-empty exact match and replacement.",
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
  primaryJudge: JudgeCommandResult,
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
  const confidence = deriveJudgeOutputConfidence(parsed, judgeModel);

  writeTextFile(judgeJsonPath, JSON.stringify({
    ...parsed,
    slug,
    locale,
    candidateCommits,
    suggestionLog: suggestionLogEntries,
    validation,
    confidence: confidence.level,
    confidenceScore: confidence.score,
    confidenceSignals: confidence.signals,
    issueCounts: confidence.issueCounts,
  }, null, 2));
}

function acquireJudgeLock() {
  const lockDir = join(process.cwd(), ".git", `codex-i18n-judge-${slug}-${locale}.lock`);
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

async function selectCandidateInBatches(candidates: CandidateRef[], candidateSummary: string) {
  let round = 1;
  const currentCandidate = candidates.find((candidate) => candidate.source === "current");
  let remaining = candidates.filter((candidate) => candidate.source === "commit");
  const telemetries: Array<{ round: number; batch: number; telemetry: ReturnType<typeof getRunTelemetry> }> = [];

  while (remaining.length > maxCandidatesPerJudgePass) {
    const winners: CandidateRef[] = [];
    const batches = chunkArray(remaining, maxCandidatesPerJudgePass);

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex += 1) {
      const batch = batches[batchIndex];
      const comparisonCandidates = withCurrentCandidate(batch, currentCandidate);
      const batchJudge = await runJudgeOperation(
        judgeModel,
        getPrimaryJudgePrompt(candidateSummary, comparisonCandidates, `round ${round}, batch ${batchIndex + 1}`),
        comparisonCandidates,
        "candidate-batch",
        { round, batch: batchIndex + 1 },
      );
      if (!batchJudge.ok) throw new Error(batchJudge.errorMessage);

      telemetries.push({
        round,
        batch: batchIndex + 1,
        telemetry: getRunTelemetry(judgeModel, batchJudge),
      });
      winners.push(resolveSelectedCandidate(batchJudge, comparisonCandidates));
    }

    remaining = uniqueCandidates(winners).filter((candidate) => candidate.source === "commit");
    if (remaining.length === 0 && currentCandidate != null) {
      remaining = [];
      break;
    }
    round += 1;
  }

  const finalCandidates = withCurrentCandidate(remaining, currentCandidate);
  const finalJudge = await runJudgeOperation(
    judgeModel,
    getPrimaryJudgePrompt(candidateSummary, finalCandidates, "final"),
    finalCandidates,
    "final",
    { round },
  );
  if (!finalJudge.ok) throw new Error(finalJudge.errorMessage);

  return {
    finalJudge,
    finalCandidates,
    telemetries,
  };
}

function getPrimaryJudgePrompt(candidateSummary: string, candidates: CandidateRef[], passLabel: string) {
  return buildPrimaryJudgePrompt(candidateSummary, candidates, passLabel, {
    slug,
    locale,
    targetRelPath,
    selectedCommit: selectedCommit ?? undefined,
  });
}

async function runJudgeOperation(
  model: string,
  judgePrompt: string,
  contextItems: Array<CandidateRef | string>,
  kind: JudgeOperationKind,
  extra: Record<string, unknown> = {},
) {
  const result = await runJudgeCommand(model, judgePrompt, contextItems);
  const parsed = result.ok ? parseJudgeOutput(result.output) : {};
  const selected = parsed.selectedCommit;
  const translationModel = getSelectedTranslationModel(parsed, selected, contextItems);
  const confidence = result.ok ? deriveJudgeOutputConfidence(parsed, model) : undefined;
  appendJudgement({
    event: kind,
    slug,
    locale,
    judgeModel: model,
    translationModel,
    ok: result.ok,
    runtimeMs: result.runtimeMs,
    selected,
    context: contextItems.map(describeJudgeContextItem),
    errorMessage: result.errorMessage,
    ...confidenceLogFields(confidence),
    ...extra,
  });
  const scores = normalizeJudgeScores(parsed.scores);
  if (result.ok && scores != null) {
    appendJudgement({
      event: "score",
      scoreSource: "judge",
      operation: kind,
      slug,
      locale,
      judgeModel: model,
      selected,
      translationModel,
      scores,
      overallScore: averageJudgeScore(scores),
      ...confidenceLogFields(confidence ?? deriveJudgeOutputConfidence(parsed, model)),
      rationale: typeof parsed.rationale === "string" ? parsed.rationale : undefined,
      runtimeMs: result.runtimeMs,
      context: contextItems.map(describeJudgeContextItem),
      ...extra,
    });
  }
  return result;
}

function getSelectedTranslationModel(
  parsed: Record<string, unknown>,
  selected: unknown,
  contextItems: Array<CandidateRef | string>,
) {
  const parsedModel = stringValue(parsed.selectedModel);
  if (parsedModel != null) return parsedModel;
  if (typeof selected !== "string") return undefined;

  const selectedContext = contextItems.find((item): item is CandidateRef => (
    typeof item !== "string"
    && item.id === selected
  ));
  return selectedContext?.model;
}

function stringValue(value: unknown) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

function appendJudgement(data: Record<string, unknown>) {
  mkdirSync(dirname(judgementsPath), { recursive: true });
  appendFileSync(judgementsPath, `${JSON.stringify({
    at: new Date().toISOString(),
    ...data,
  })}\n`, "utf8");
}

function deriveJudgeOutputConfidence(parsed: Record<string, unknown>, model: string) {
  const scores = normalizeJudgeScores(parsed.scores);
  const suggestions = readSuggestionsFromParsed(parsed);
  const overallScore = scores == null ? undefined : averageJudgeScore(scores);
  const publishReady = suggestions.some((suggestion) => isBlockingSuggestion(suggestion))
    ? false
    : overallScore == null ? undefined : overallScore >= 82;
  return deriveJudgeConfidence({
    scores,
    overallScore,
    suggestions,
    publishReady,
    judgeModel: model,
  });
}

function deriveJudgeRunConfidence({
  primaryJudge,
  primaryJudgeModel,
  secondJudge,
  secondJudgeModel,
  escalationJudge,
  escalationJudgeModel,
  shouldEscalate,
}: {
  primaryJudge: JudgeCommandResult;
  primaryJudgeModel: string;
  secondJudge?: JudgeCommandResult;
  secondJudgeModel?: string;
  escalationJudge?: JudgeCommandResult;
  escalationJudgeModel?: string;
  shouldEscalate: boolean;
}) {
  const outputs = [
    { result: primaryJudge, model: primaryJudgeModel },
    ...(secondJudge == null || secondJudgeModel == null ? [] : [{ result: secondJudge, model: secondJudgeModel }]),
    ...(escalationJudge == null || escalationJudgeModel == null ? [] : [{ result: escalationJudge, model: escalationJudgeModel }]),
  ]
    .filter(({ result }) => result.ok)
    .map(({ result, model }) => {
      const parsed = parseJudgeOutput(result.output);
      const scores = normalizeJudgeScores(parsed.scores);
      return {
        model,
        parsed,
        scores,
        overallScore: scores == null ? undefined : averageJudgeScore(scores),
      };
    });
  const scoredOutputs = outputs.filter((output) =>
    typeof output.overallScore === "number"
  ) as Array<(typeof outputs)[number] & { overallScore: number }>;
  const scoreRange = scoredOutputs.length <= 1
    ? 0
    : Math.max(...scoredOutputs.map((output) => output.overallScore))
      - Math.min(...scoredOutputs.map((output) => output.overallScore));
  const finalParsed = outputs.at(-1)?.parsed ?? parseJudgeOutput(primaryJudge.output);
  const suggestions = readSuggestionsFromParsed(finalParsed);
  const finalScores = normalizeJudgeScores(finalParsed.scores);
  const finalOverallScore = finalScores == null ? scoredOutputs.at(-1)?.overallScore : averageJudgeScore(finalScores);

  return deriveJudgeConfidence({
    scores: finalScores,
    overallScore: finalOverallScore,
    suggestions,
    judgeCount: outputs.length,
    scoreRange,
    blockingSuggestionDisagreement: shouldEscalate,
    uncertaintyDetected: shouldEscalate && escalationJudge == null,
    publishReady: !suggestions.some((suggestion) => isBlockingSuggestion(suggestion))
      && finalOverallScore != null
      && finalOverallScore >= 82,
    frontierScores: scoredOutputs
      .filter((output) => /(?:gpt-5|claude|sonnet|opus|gemini-3-pro|grok-4)/i.test(output.model))
      .map((output) => output.overallScore),
  });
}

function confidenceLogFields(confidence: JudgeConfidence | undefined) {
  if (confidence == null) return {};
  return {
    confidence: confidence.level,
    confidenceScore: confidence.score,
    confidenceSignals: confidence.signals,
    issueCounts: confidence.issueCounts,
  };
}


function getOpenRouterProviderCost(providerMetadata: unknown) {
  const metadata = recordValue(providerMetadata);
  const usage = recordValue(recordValue(metadata?.openrouter)?.usage);
  const cost = usage?.cost;
  return typeof cost === "number" && Number.isFinite(cost) ? cost : undefined;
}

function recordValue(value: unknown): Record<string, unknown> | undefined {
  return value != null && typeof value === "object" ? value as Record<string, unknown> : undefined;
}

async function runJudgeCommand(
  model: string,
  judgePrompt: string,
  contextItems: Array<CandidateRef | string> = [],
): Promise<JudgeCommandResult> {
  const startedAt = Date.now();
  const provider = createOpenRouter({});
  const modelId = model.replace(/^openrouter\//, "");

  try {
    assertNoOutOfCreditMarker();
    const result = await generateText({
      model: provider.chat(modelId, OPENROUTER_USAGE_ACCOUNTING),
      system: [
        "You are a constrained translation judge.",
        "You cannot edit files or run shell commands.",
        "Return strict JSON only. No markdown fences.",
        'When selecting a candidate, use one of the provided ids exactly. Commit candidates use full SHAs; the pre-existing translation uses "current".',
      ].join("\n"),
      prompt: [
        judgePrompt,
        "",
        buildJudgeContext(contextItems),
        "",
        "Return strict JSON with this shape:",
        JSON.stringify(getJudgeJsonShape()),
      ].join("\n"),
      temperature: 0.1,
      maxOutputTokens: 4000,
      timeout: { totalMs: timeoutSeconds * 1000 },
      providerOptions: getReasoningProviderOptions(model),
    });
    const runtimeMs = Date.now() - startedAt;
    const usage = result.usage as {
      inputTokens?: number;
      outputTokens?: number;
      inputTokenDetails?: {
        cacheReadTokens?: number;
        cacheWriteTokens?: number;
      };
    } | undefined;
    const usageLine = JSON.stringify({
      usage: {
        inputTokens: usage?.inputTokens,
        outputTokens: usage?.outputTokens,
        cachedInputTokens: usage?.inputTokenDetails?.cacheReadTokens,
        cache_write_tokens: usage?.inputTokenDetails?.cacheWriteTokens,
        cost: getOpenRouterProviderCost(result.providerMetadata),
      },
    });

    return {
      ok: true,
      runtimeMs,
      output: `${result.text.trim()}\n${usageLine}`,
    };
  } catch (error) {
    if (isOutOfCreditError(error)) {
      recordOutOfCreditIssue(error, {
        script: "judge",
        slug,
        locale,
        model,
        operation: "judge",
      });
    }
    return {
      ok: false,
      runtimeMs: Date.now() - startedAt,
      output: "",
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
}

function buildJudgeContext(contextItems: Array<CandidateRef | string>) {
  const sections = [
    renderContextSection(sourceRelPath, readFileSync(sourcePath, "utf8")),
  ];

  for (const item of contextItems) {
    if (typeof item !== "string") {
      sections.push(renderContextSection(
        item.label,
        readCandidateContents(item),
      ));
      continue;
    }

    if (/^[a-f0-9]{40}$/i.test(item)) {
      sections.push(renderContextSection(
        `candidate ${item} (${getCandidateModel(item)})`,
        readCandidateCommitContents(item),
      ));
      continue;
    }

    if (existsSync(item)) {
      sections.push(renderContextSection(relativeToRepo(item), readFileSync(item, "utf8")));
    }
  }

  return sections.join("\n\n");
}

function readCandidateContents(candidate: CandidateRef) {
  if (candidate.source === "current") return readFileSync(targetPath, "utf8");
  return readCandidateCommitContents(candidate.id);
}

function readCandidateCommitContents(commit: string) {
  if (commitChangesTarget(commit)) {
    return run("git", ["show", `${commit}:${targetRelPath}`]);
  }

  const candidatePath = getCandidatePathFromCommit(commit);
  if (candidatePath != null) {
    return run("git", ["show", `${commit}:${candidatePath}`]);
  }

  throw new Error(`Candidate commit ${commit} does not contain ${targetRelPath} or a report-backed candidate.mdx.`);
}

function describeJudgeContextItem(item: CandidateRef | string) {
  if (typeof item !== "string") {
    return {
      id: item.id,
      source: item.source,
      model: item.model,
    };
  }

  return {
    id: item,
    source: /^[a-f0-9]{40}$/i.test(item) ? "commit" : "file",
  };
}

function renderContextSection(label: string, contents: string) {
  return [
    `--- BEGIN ${label} ---`,
    contents,
    `--- END ${label} ---`,
  ].join("\n");
}

function materializePrimaryJudgeResult(
  judge: JudgeCommandResult,
  candidates: CandidateRef[],
  judgeReportName = "judge.md",
  reportJudgeModel = judgeModel,
) {
  const parsed = parseJudgeOutput(judge.output);
  const selected = normalizeSelectedCandidate(parsed.selectedCommit, candidates, selectedCommit ?? undefined);
  const selectedBody = readCandidateContents(selected);
  const rationale = typeof parsed.rationale === "string"
    ? parsed.rationale
    : `Selected ${selected.id}.`;
  const confidence = deriveJudgeOutputConfidence(parsed, reportJudgeModel);

  writeTextFile(targetPath, selectedBody);
  writeTextFile(`${reportDir}/${judgeReportName}`, [
    `# Translation Judge`,
    ``,
    `- Selected candidate: ${selected.id}`,
    `- Selected model: ${parsed.selectedModel ?? selected.model}`,
    `- Judge model: ${reportJudgeModel}`,
    `- Confidence: ${confidence.level} (${confidence.score.toFixed(3)})`,
    ``,
    rationale,
  ].join("\n"));
  writeTextFile(`${reportDir}/judge.json`, JSON.stringify({
    ...getJudgeJsonShape(),
    ...parsed,
    selectedCommit: selected.id,
    selectedModel: parsed.selectedModel ?? selected.model,
    confidence: confidence.level,
    confidenceScore: confidence.score,
    confidenceSignals: confidence.signals,
    issueCounts: confidence.issueCounts,
    rationale,
  }, null, 2));
}

function renderJudgeMarkdown(output: string) {
  const parsed = parseJudgeOutput(output);
  return [
    `# Translation Judge Pass`,
    ``,
    parsed.selectedCommit == null ? undefined : `- Selected candidate: ${parsed.selectedCommit}`,
    parsed.selectedModel == null ? undefined : `- Selected model: ${parsed.selectedModel}`,
    ``,
    typeof parsed.rationale === "string" ? parsed.rationale : output.trim(),
  ].filter((line) => line != null).join("\n");
}

function resolveSelectedCandidate(judge: JudgeCommandResult, candidates: CandidateRef[]) {
  return normalizeSelectedCandidate(parseJudgeOutput(judge.output).selectedCommit, candidates, selectedCommit ?? undefined);
}

function getReasoningProviderOptions(model: string) {
  if (model.includes("gpt-5") || model.includes("gpt-oss") || model.includes("qwen") || model.includes("glm")) {
    return { openrouter: { reasoning: { effort: "low" } } };
  }

  if (model.includes("gemini-3")) {
    return { openrouter: { reasoning: { effort: "minimal" } } };
  }

  return undefined;
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
  return buildPrePublishRescorePrompt(pass, candidateSummary, {
    slug,
    locale,
    targetRelPath,
    sourcePath: sourceRelPath,
  });
}

function getSecondJudgePrompt(candidateSummary: string) {
  return buildSecondJudgePrompt(candidateSummary, { slug, locale, targetRelPath });
}

function getEscalationPrompt(candidateSummary: string) {
  return buildEscalationPrompt(candidateSummary, { slug, locale, targetRelPath });
}

function getCandidateCommits() {
  const grep = `i18n candidate(${locale}): ${slug} via`;
  const output = run("git", ["log", "--format=%H", "--grep", grep]);
  const commits = output
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((commit) => commitChangesTarget(commit) || getCandidatePathFromCommit(commit) != null)
    .filter((commit) => candidateModels.length === 0 || candidateModels.includes(getCandidateModel(commit)))
    .reverse();

  return candidateLimit == null ? commits : commits.slice(-candidateLimit);
}

function getInitialCandidateRefs(candidateCommits: string[]): CandidateRef[] {
  const refs = candidateCommits.map((commit) => ({
    id: commit,
    label: `<candidate id="${commit}" model="${getCandidateModel(commit)}">`,
    source: "commit" as const,
    model: getCandidateModel(commit),
  }));

  if (!existsSync(targetPath)) return refs;

  return [
    {
      id: "current",
      label: `<current path="${targetRelPath}">`,
      source: "current",
      model: "current/pre-existing",
    },
    ...refs,
  ];
}

function chunkArray<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function uniqueCandidates(candidates: CandidateRef[]) {
  const seen = new Set<string>();
  return candidates.filter((candidate) => {
    if (seen.has(candidate.id)) return false;
    seen.add(candidate.id);
    return true;
  });
}

function withCurrentCandidate(candidates: CandidateRef[], currentCandidate: CandidateRef | undefined) {
  return currentCandidate == null ? candidates : uniqueCandidates([currentCandidate, ...candidates]);
}

function getCandidateModel(commit: string) {
  const subject = run("git", ["show", "-s", "--format=%s", commit]);
  return subject.match(/ via (.+)$/)?.[1] ?? "";
}

function getCandidatePathFromCommit(commit: string) {
  const candidatesRelPath = `reports/i18n/${slug}/candidates.jsonl`;
  const model = getCandidateModel(commit);
  let contents = "";

  try {
    contents = run("git", ["show", `${commit}:${candidatesRelPath}`]);
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
    .filter((row) => row.locale === locale)
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

function normalizeModelId(model: string) {
  return model.replace(/^openrouter\//, "");
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
