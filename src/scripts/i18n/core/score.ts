import { generateText as defaultGenerateText } from "../braintrust.ts";
import {
  averageJudgeScore,
  getJudgeJsonShape,
  isBlockingSuggestion,
  normalizeJudgeScores,
  parseJudgeOutput,
  readSuggestionsFromParsed,
  type JudgeScoreMap,
  type JudgeSuggestion,
} from "../judge-utils.ts";
import {
  assertGenerationNotTokenLimited,
  cachedUserMessage,
  diagnosticsFromResult,
  plainUserMessage,
  usageFromResult,
  type TranslationTelemetry,
} from "../llm-telemetry.ts";
import { getLengthValidationGuidance } from "../localized-mdx.ts";
import { estimateTokenCost, type TokenCostEstimate } from "../translation-costs.ts";
import { type ActiveLocale } from "../../../shared/i18n.ts";
import { createOpenRouterChatModel, resolveLlmConfig } from "./model-config.ts";

type GenerateTextLike = typeof defaultGenerateText;

export type ScoreTranslationInput = {
  sourceContents: string;
  targetContents: string;
  locale: ActiveLocale;
  model: string;
  slug?: string;
  targetRelPath?: string;
  candidateId?: string;
  generateText?: GenerateTextLike;
  priorAssessments?: JudgeAssessmentSummary[];
  roundLabel?: string;
};

export type ScoreTranslationOutput = {
  candidateId: string;
  model: string;
  scores: TranslationScoreMap;
  judgeScores?: JudgeScoreMap;
  overallScore: number;
  publishReady: boolean;
  suggestions: JudgeSuggestion[];
  rationale: string;
  rawText: string;
  telemetry: TranslationTelemetry;
  cost: TokenCostEstimate;
  roundLabel?: string;
};

export type JudgeAssessmentSummary = {
  model: string;
  roundLabel?: string;
  overallScore: number;
  publishReady: boolean;
  scores: TranslationScoreMap;
  suggestions: JudgeSuggestion[];
  rationale: string;
};

export type ScoreConsensusInput = Omit<ScoreTranslationInput, "model" | "priorAssessments" | "roundLabel"> & {
  models: string[];
  escalationModels?: string[];
  reconsiderationRounds?: number;
  disagreementThreshold?: number;
  generateText?: GenerateTextLike;
};

export type ScoreConsensusOutput = {
  candidateId: string;
  models: string[];
  escalationModels: string[];
  consensus: {
    overallScore: number;
    scores: TranslationScoreMap;
    publishReady: boolean;
    confidence: "low" | "medium" | "high";
    rationale: string;
    suggestions: Array<JudgeSuggestion & { supportingModels: string[] }>;
  };
  escalated: boolean;
  disagreement: ConsensusDisagreement;
  assessments: ScoreTranslationOutput[];
  totals: {
    inputTokens: number;
    outputTokens: number;
    reasoningTokens: number;
    totalTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    durationMs: number;
    costUsd: number;
    providerCostUsd?: number;
    providerUpstreamCostUsd?: number;
  };
};

export type ConsensusDisagreement = {
  scoreRange: number;
  publishReadyDisagreement: boolean;
  blockingSuggestionDisagreement: boolean;
  uncertaintyDetected: boolean;
  shouldEscalate: boolean;
};

export type TranslationScoreMap = {
  fidelity: number;
  mdxPreservation: number;
  localeQuality: number;
  tone: number;
  publishReadiness: number;
};

export async function scoreTranslation(input: ScoreTranslationInput): Promise<ScoreTranslationOutput> {
  const llmConfig = resolveLlmConfig(input.model, {
    temperature: 0,
    maxTokens: 8_000,
  });
  const generateText = input.generateText ?? defaultGenerateText;
  const startedAt = performance.now();
  const model = createOpenRouterChatModel(llmConfig);
  const result = await generateText({
    model,
    allowSystemInMessages: true,
    messages: [
      {
        role: "system",
        content: "You are a constrained translation judge. Return strict JSON only.",
      },
      cachedUserMessage(buildScoreTranslationContract(input)),
      cachedUserMessage(buildScoreSourceBlock(input)),
      cachedUserMessage(buildScoreCandidateBlock(input)),
      plainUserMessage(buildScoreDynamicTask(input)),
    ],
    temperature: llmConfig.temperature,
    maxOutputTokens: llmConfig.maxTokens,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });

  const telemetry = usageFromResult(
    result.usage,
    Math.round(performance.now() - startedAt),
    result.providerMetadata,
    diagnosticsFromResult(result),
  );
  assertGenerationNotTokenLimited(`Translation judge ${llmConfig.modelId}`, result, llmConfig.maxTokens);
  const cost = estimateTokenCost(
    llmConfig.modelId,
    telemetry.inputTokens,
    telemetry.outputTokens + telemetry.reasoningTokens,
    telemetry.cacheReadTokens,
    { providerCostUsd: telemetry.providerCostUsd },
  );
  const parsed = parseJudgeOutput(result.text);
  const judgeScores = normalizeJudgeScores(parsed.scores);
  const suggestions = readSuggestionsFromParsed(parsed);
  const scores = toTranslationScoreMap(judgeScores);
  const overallScore = judgeScores == null
    ? averageTranslationScore(scores)
    : Math.round(averageJudgeScore(judgeScores));
  const publishReady = booleanValue(parsed.publishReady)
    ?? (overallScore >= 82 && suggestions.every((suggestion) => suggestion.priority === "low"));

  return {
    candidateId: input.candidateId ?? "candidate",
    model: llmConfig.modelId,
    scores,
    judgeScores,
    overallScore,
    publishReady,
    suggestions,
    rationale: typeof parsed.rationale === "string" ? parsed.rationale : "",
    rawText: result.text,
    telemetry,
    cost,
    roundLabel: input.roundLabel,
  };
}

export async function scoreTranslationConsensus(input: ScoreConsensusInput): Promise<ScoreConsensusOutput> {
  const models = uniqueNonEmpty(input.models);
  if (models.length === 0) throw new Error("At least one judge model is required.");

  const assessments: ScoreTranslationOutput[] = [];
  const initialAssessments = await Promise.all(models.map((model) =>
    scoreTranslation({
      ...input,
      model,
      roundLabel: "initial",
    })
  ));
  assessments.push(...initialAssessments);

  const reconsiderationRounds = Math.max(0, Math.min(input.reconsiderationRounds ?? 1, 3));
  let latest = initialAssessments;
  for (let round = 1; round <= reconsiderationRounds; round += 1) {
    const summaries = latest.map(toJudgeAssessmentSummary);
    latest = await Promise.all(models.map((model) =>
      scoreTranslation({
        ...input,
        model,
        priorAssessments: summaries.filter((assessment) => assessment.model !== resolveLlmConfig(model).modelId),
        roundLabel: `reconsideration-${round}`,
      })
    ));
    assessments.push(...latest);
  }

  let disagreement = analyzeDisagreement(latest, input.disagreementThreshold ?? 12);
  const escalationModels = uniqueNonEmpty(input.escalationModels ?? []);
  let escalationAssessments: ScoreTranslationOutput[] = [];
  if (disagreement.shouldEscalate && escalationModels.length > 0) {
    const summaries = latest.map(toJudgeAssessmentSummary);
    escalationAssessments = await Promise.all(escalationModels.map((model) =>
      scoreTranslation({
        ...input,
        model,
        priorAssessments: summaries,
        roundLabel: "escalation",
      })
    ));
    assessments.push(...escalationAssessments);
    latest = [...latest, ...escalationAssessments];
    disagreement = analyzeDisagreement(latest, input.disagreementThreshold ?? 12);
  }

  return {
    candidateId: input.candidateId ?? "candidate",
    models,
    escalationModels,
    consensus: buildConsensus(latest, disagreement),
    escalated: escalationAssessments.length > 0,
    disagreement,
    assessments,
    totals: totalAssessmentUsage(assessments),
  };
}

function buildScoreTranslationContract(input: ScoreTranslationInput) {
  return [
    `You are judging a ${input.locale} translation.`,
    "Compare the candidate against the English source.",
    "Score these dimensions from 0 to 100:",
    "- technicalAccuracy/fidelity: preserves meaning, technical claims, correct quiz answers, and code-adjacent facts.",
    "- mdxPreservation: preserves MDX components, imports, props, fences, headings, links, asset path rules, and structure.",
    "- languagePurity/localeQuality: reader-facing prose is natural target-language prose without instruction leakage.",
    "- culturalAdaptation/tone: preserves Dan's direct technical style while localizing idioms and jokes naturally.",
    "- publishReadiness: high only when no medium/high fixes remain.",
    "Return concrete medium/high-priority fixes in suggestions with exact match/replacement strings from the candidate.",
    "Do not require titles, subtitles, headings, or quiz title/group values to remain in English; they are reader-facing.",
    "Do preserve code, component names, prop names, imports, API names, URLs, and non-reader-facing metadata.",
    getLengthValidationGuidance(input.locale),
  ].filter(Boolean).join("\n");
}

function buildScoreSourceBlock(input: ScoreTranslationInput) {
  return [
    "<english-source>",
    input.sourceContents,
    "</english-source>",
  ].join("\n");
}

function buildScoreCandidateBlock(input: ScoreTranslationInput) {
  return [
    "<candidate>",
    input.targetContents,
    "</candidate>",
  ].join("\n");
}

function buildScoreDynamicTask(input: ScoreTranslationInput) {
  const jsonShape = {
    ...getJudgeJsonShape(),
    selectedCommit: input.candidateId ?? "candidate",
    selectedModel: "model id if known",
    publishReady: false,
  };

  return [
    `Judge this candidate${input.slug ? ` for ${input.slug}` : ""}.`,
    `Candidate id: ${input.candidateId ?? "candidate"}`,
    `Target path: ${input.targetRelPath ?? "unknown"}`,
    buildPeerAssessmentPrompt(input),
    "Use this JSON shape:",
    JSON.stringify(jsonShape),
  ].filter(Boolean).join("\n");
}

function toTranslationScoreMap(judgeScores: JudgeScoreMap | undefined): TranslationScoreMap {
  if (judgeScores == null) {
    return {
      fidelity: 0,
      mdxPreservation: 0,
      localeQuality: 0,
      tone: 0,
      publishReadiness: 0,
    };
  }

  const fidelity = Math.round((judgeScores.technicalAccuracy + judgeScores.translationQuality) / 2);
  const localeQuality = Math.round((judgeScores.languagePurity + judgeScores.readability + judgeScores.coherence) / 3);
  const tone = Math.round((judgeScores.culturalAdaptation + judgeScores.relevance) / 2);
  return {
    fidelity,
    mdxPreservation: judgeScores.mdxPreservation,
    localeQuality,
    tone,
    publishReadiness: Math.round((fidelity + judgeScores.mdxPreservation + localeQuality + tone) / 4),
  };
}

function averageTranslationScore(scores: TranslationScoreMap) {
  const values = Object.values(scores);
  return Math.round(values.reduce((sum, score) => sum + score, 0) / values.length);
}

function booleanValue(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}

function buildPeerAssessmentPrompt(input: ScoreTranslationInput) {
  if (input.priorAssessments == null || input.priorAssessments.length === 0) return "";

  return [
    "",
    "Critical reconsideration round:",
    "Other judge models have shared their scores, suggestions, and rationales below.",
    "Re-check your assessment against their strongest concrete objections, but do not be a push-over.",
    "Keep your score if the peer criticism is vague, stylistic preference, or conflicts with the source/MDX contract.",
    "Change your score or suggestions only when the peer assessment points to a real issue you can verify in the source and candidate.",
    JSON.stringify(input.priorAssessments, null, 2),
  ].join("\n");
}

function toJudgeAssessmentSummary(output: ScoreTranslationOutput): JudgeAssessmentSummary {
  return {
    model: output.model,
    roundLabel: output.roundLabel,
    overallScore: output.overallScore,
    publishReady: output.publishReady,
    scores: output.scores,
    suggestions: output.suggestions,
    rationale: output.rationale,
  };
}

function analyzeDisagreement(outputs: ScoreTranslationOutput[], threshold: number): ConsensusDisagreement {
  const overallScores = outputs.map((output) => output.overallScore);
  const scoreRange = overallScores.length === 0 ? 0 : Math.max(...overallScores) - Math.min(...overallScores);
  const publishValues = new Set(outputs.map((output) => output.publishReady));
  const blockingFlags = new Set(outputs.map((output) => output.suggestions.some(isBlockingSuggestion)));
  const uncertaintyDetected = outputs.some((output) =>
    output.judgeScores == null
    || output.overallScore <= 0
    || /\b(maybe|uncertain|not sure|hard to tell|ambiguous|cannot determine)\b/i.test(output.rationale)
  );
  const publishReadyDisagreement = publishValues.size > 1;
  const blockingSuggestionDisagreement = blockingFlags.size > 1;

  return {
    scoreRange,
    publishReadyDisagreement,
    blockingSuggestionDisagreement,
    uncertaintyDetected,
    shouldEscalate: scoreRange > threshold
      || publishReadyDisagreement
      || blockingSuggestionDisagreement
      || uncertaintyDetected,
  };
}

function buildConsensus(
  outputs: ScoreTranslationOutput[],
  disagreement: ConsensusDisagreement,
): ScoreConsensusOutput["consensus"] {
  const scores = averageScoreMaps(outputs.map((output) => output.scores));
  const overallScore = Math.round(outputs.reduce((sum, output) => sum + output.overallScore, 0) / outputs.length);
  const publishReadyVotes = outputs.filter((output) => output.publishReady).length;
  const blockingSuggestions = outputs.flatMap((output) => output.suggestions).filter(isBlockingSuggestion);
  const publishReady = publishReadyVotes > outputs.length / 2 && overallScore >= 82 && blockingSuggestions.length === 0;
  const confidence = disagreement.shouldEscalate
    ? "low"
    : disagreement.scoreRange <= 6 && (publishReadyVotes === outputs.length || publishReadyVotes === 0)
      ? "high"
      : "medium";

  return {
    overallScore,
    scores,
    publishReady,
    confidence,
    rationale: [
      `Consensus from ${outputs.length} judge assessment${outputs.length === 1 ? "" : "s"}.`,
      `Score range ${disagreement.scoreRange}; publish-ready votes ${publishReadyVotes}/${outputs.length}.`,
      blockingSuggestions.length > 0
        ? `${blockingSuggestions.length} blocking suggestion${blockingSuggestions.length === 1 ? "" : "s"} kept the candidate out of publish-ready status.`
        : "No blocking suggestions reached the consensus set.",
    ].join(" "),
    suggestions: mergeSuggestions(outputs),
  };
}

function averageScoreMaps(scoreMaps: TranslationScoreMap[]): TranslationScoreMap {
  return {
    fidelity: averageKey(scoreMaps, "fidelity"),
    mdxPreservation: averageKey(scoreMaps, "mdxPreservation"),
    localeQuality: averageKey(scoreMaps, "localeQuality"),
    tone: averageKey(scoreMaps, "tone"),
    publishReadiness: averageKey(scoreMaps, "publishReadiness"),
  };
}

function averageKey(scoreMaps: TranslationScoreMap[], key: keyof TranslationScoreMap) {
  return Math.round(scoreMaps.reduce((sum, scores) => sum + scores[key], 0) / scoreMaps.length);
}

function mergeSuggestions(outputs: ScoreTranslationOutput[]) {
  const merged = new Map<string, JudgeSuggestion & { supportingModels: string[] }>();
  for (const output of outputs) {
    for (const suggestion of output.suggestions) {
      const key = [
        suggestion.priority,
        suggestion.match.trim(),
        suggestion.replacement.trim(),
      ].join("\u0000");
      const existing = merged.get(key);
      if (existing == null) {
        merged.set(key, { ...suggestion, supportingModels: [output.model] });
      } else if (!existing.supportingModels.includes(output.model)) {
        existing.supportingModels.push(output.model);
      }
    }
  }

  return [...merged.values()].sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority));
}

function priorityRank(priority: JudgeSuggestion["priority"]) {
  if (priority === "high") return 3;
  if (priority === "medium") return 2;
  return 1;
}

function totalAssessmentUsage(outputs: ScoreTranslationOutput[]): ScoreConsensusOutput["totals"] {
  const totals: ScoreConsensusOutput["totals"] = {
    inputTokens: 0,
    outputTokens: 0,
    reasoningTokens: 0,
    totalTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    durationMs: 0,
    costUsd: 0,
  };

  for (const output of outputs) {
    totals.inputTokens += output.telemetry.inputTokens;
    totals.outputTokens += output.telemetry.outputTokens;
    totals.reasoningTokens += output.telemetry.reasoningTokens;
    totals.totalTokens += output.telemetry.totalTokens;
    totals.cacheReadTokens += output.telemetry.cacheReadTokens;
    totals.cacheWriteTokens += output.telemetry.cacheWriteTokens;
    totals.durationMs += output.telemetry.durationMs;
    totals.costUsd += output.cost.totalUsd;
    totals.providerCostUsd = addOptionalNumber(totals.providerCostUsd, output.telemetry.providerCostUsd);
    totals.providerUpstreamCostUsd = addOptionalNumber(
      totals.providerUpstreamCostUsd,
      output.telemetry.providerUpstreamCostUsd,
    );
  }

  return totals;
}

function uniqueNonEmpty(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function addOptionalNumber(current: number | undefined, value: number | undefined) {
  if (value == null) return current;
  return (current ?? 0) + value;
}
