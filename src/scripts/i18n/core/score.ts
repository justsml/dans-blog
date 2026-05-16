import { readFileSync } from "node:fs";
import { generateText as defaultGenerateText } from "../braintrust.ts";
import {
  averageJudgeScore,
  countJudgeSuggestionPriorities,
  deriveJudgeConfidence,
  getJudgeJsonShape,
  isFrontierJudgeModel,
  isBlockingSuggestion,
  normalizeJudgeScores,
  parseJudgeOutput,
  readSuggestionsFromParsed,
  type JudgeConfidenceLevel,
  type JudgeIssueCounts,
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
  promptTuning?: JudgePromptTuning;
};

export type ScoreTranslationOutput = {
  candidateId: string;
  model: string;
  scores: TranslationScoreMap;
  judgeScores?: JudgeScoreMap;
  overallScore: number;
  publishReady: boolean;
  confidence: JudgeConfidenceLevel;
  confidenceScore: number;
  confidenceSignals: string[];
  issueCounts: JudgeIssueCounts;
  suggestions: JudgeSuggestion[];
  rationale: string;
  rawText: string;
  telemetry: TranslationTelemetry;
  cost: TokenCostEstimate;
  roundLabel?: string;
};

export type JudgePromptTuning = {
  profileId?: string;
  version?: number;
  appendSystem?: string;
  appendCachedContext?: string;
  appendDynamic?: string;
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
  promptTuningByModel?: Record<string, JudgePromptTuning | undefined>;
};

export type ReverseTranslationInput = {
  locale: ActiveLocale;
  translatedInput: string | Buffer;
  referenceInput?: string | Buffer;
  model: string;
  translatedLabel?: string;
  referenceLabel?: string;
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
    confidenceScore: number;
    confidenceSignals: string[];
    issueCounts: JudgeIssueCounts;
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

export type ReverseTranslationIssue = {
  severity: "low" | "medium" | "high";
  category: string;
  message: string;
  referenceExcerpt?: string;
  reverseExcerpt?: string;
  translatedExcerpt?: string;
};

export type ReverseTranslationError = {
  code: string;
  message: string;
};

export type ReverseTranslationScores = {
  similarity: number;
  faithfulness: number;
  coverage: number;
  technicalFidelity: number;
  structuralCorrespondence: number;
};

export type ReverseTranslationOutput = {
  locale: ActiveLocale;
  model: string;
  referenceCompared: boolean;
  reverseTranslation: string;
  similarityScore: number | null;
  faithfulness: number | null;
  scores: ReverseTranslationScores | null;
  issues: ReverseTranslationIssue[];
  errors: ReverseTranslationError[];
  confidence: "low" | "medium" | "high";
  confidenceScore: number;
  convergence: {
    modelCount: number;
    converged: boolean | null;
    note: string;
  };
  interpretationNotes: string[];
  rationale: string;
  rawText: {
    reverse: string;
    comparison?: string;
  };
  telemetry: TranslationTelemetry;
  cost: TokenCostEstimate;
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
        content: joinPrompt(
          "You are a constrained translation judge. Return strict JSON only.",
          input.promptTuning?.appendSystem,
          "JUDGE PROMPT PROFILE TUNING",
        ),
      },
      cachedUserMessage(joinPrompt(
        buildScoreTranslationContract(input),
        input.promptTuning?.appendCachedContext,
        "JUDGE PROMPT PROFILE STABLE TUNING",
      )),
      cachedUserMessage(buildScoreSourceBlock(input)),
      cachedUserMessage(buildScoreCandidateBlock(input)),
      plainUserMessage(joinPrompt(
        buildScoreDynamicTask(input),
        input.promptTuning?.appendDynamic,
        "JUDGE PROMPT PROFILE DYNAMIC TUNING",
      )),
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
  const confidence = deriveJudgeConfidence({
    overallScore,
    scores: judgeScores,
    suggestions,
    publishReady,
    judgeModel: llmConfig.mastraModel,
  });

  return {
    candidateId: input.candidateId ?? "candidate",
    model: llmConfig.modelId,
    scores,
    judgeScores,
    overallScore,
    publishReady,
    confidence: confidence.level,
    confidenceScore: confidence.score,
    confidenceSignals: confidence.signals,
    issueCounts: confidence.issueCounts,
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
      promptTuning: promptTuningForModel(input, model),
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
        promptTuning: promptTuningForModel(input, model),
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
        promptTuning: promptTuningForModel(input, model),
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

export async function reverseTranslation(input: ReverseTranslationInput): Promise<ReverseTranslationOutput> {
  const llmConfig = resolveLlmConfig(input.model, {
    temperature: 0,
    maxTokens: 10_000,
  });
  const generateText = input.generateText ?? defaultGenerateText;
  const model = createOpenRouterChatModel(llmConfig);
  const translatedContents = readPathOrBuffer(input.translatedInput);
  const referenceContents = input.referenceInput == null ? undefined : readPathOrBuffer(input.referenceInput);

  const reverseStartedAt = performance.now();
  const reverseResult = await generateText({
    model,
    allowSystemInMessages: true,
    messages: [
      {
        role: "system",
        content: "You are a constrained reverse translator. Return strict JSON only.",
      },
      cachedUserMessage(buildReverseTranslationContract(input.locale)),
      plainUserMessage([
        `Translated input label: ${input.translatedLabel ?? "translated input"}`,
        "<translated-input>",
        translatedContents,
        "</translated-input>",
        "Return JSON in this exact shape:",
        JSON.stringify({
          reverseTranslation: "English back-translation of the localized input",
          errors: [{ code: "optional-short-code", message: "Only include real reverse-translation problems." }],
        }),
      ].join("\n")),
    ],
    temperature: llmConfig.temperature,
    maxOutputTokens: llmConfig.maxTokens,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });
  const reverseTelemetry = usageFromResult(
    reverseResult.usage,
    Math.round(performance.now() - reverseStartedAt),
    reverseResult.providerMetadata,
    diagnosticsFromResult(reverseResult),
  );
  assertGenerationNotTokenLimited(`Reverse translation ${llmConfig.modelId}`, reverseResult, llmConfig.maxTokens);

  const reverseParsed = parseJudgeOutput(reverseResult.text);
  const reverseText = stringValue(reverseParsed.reverseTranslation)
    ?? stringValue(reverseParsed.backTranslation)
    ?? stringValue(reverseParsed.translation)
    ?? reverseResult.text.trim();
  const reverseErrors = normalizeReverseErrors(reverseParsed.errors);

  if (referenceContents == null) {
    const telemetry = reverseTelemetry;
    return {
      locale: input.locale,
      model: llmConfig.modelId,
      referenceCompared: false,
      reverseTranslation: reverseText,
      similarityScore: null,
      faithfulness: null,
      scores: null,
      issues: [],
      errors: [
        ...reverseErrors,
        {
          code: "missing-reference",
          message: "No English reference was provided, so similarity and faithfulness were not scored.",
        },
      ],
      confidence: "low",
      confidenceScore: 0.2,
      convergence: singleModelConvergenceNote(),
      interpretationNotes: reverseTranslationInterpretationNotes(),
      rationale: "Generated a reverse translation only. Provide an English reference to score fidelity loss.",
      rawText: { reverse: reverseResult.text },
      telemetry,
      cost: costForTelemetry(llmConfig.modelId, telemetry),
    };
  }

  const comparisonStartedAt = performance.now();
  const comparisonResult = await generateText({
    model,
    allowSystemInMessages: true,
    messages: [
      {
        role: "system",
        content: "You are a constrained reverse-translation fidelity judge. Return strict JSON only.",
      },
      cachedUserMessage(buildReverseComparisonContract(input.locale)),
      cachedUserMessage([
        `English reference label: ${input.referenceLabel ?? "reference input"}`,
        "<english-reference>",
        referenceContents,
        "</english-reference>",
      ].join("\n")),
      cachedUserMessage([
        "<reverse-translation>",
        reverseText,
        "</reverse-translation>",
      ].join("\n")),
      plainUserMessage([
        "Compare the English reference to the reverse translation.",
        "Use this JSON shape:",
        JSON.stringify({
          scores: {
            similarity: 0,
            faithfulness: 0,
            coverage: 0,
            technicalFidelity: 0,
            structuralCorrespondence: 0,
          },
          issues: [{
            severity: "low|medium|high",
            category: "meaning|technical|terminology|structure|reverse-translation|other",
            referenceExcerpt: "optional exact excerpt from the English reference",
            reverseExcerpt: "optional exact excerpt from the reverse translation",
            translatedExcerpt: "optional excerpt if visible from the localized input is needed",
            message: "specific issue",
          }],
          errors: [{ code: "optional-short-code", message: "Only include real assessment problems." }],
          confidence: "low|medium|high",
          confidenceScore: 0,
          rationale: "short explanation",
        }),
      ].join("\n")),
    ],
    temperature: llmConfig.temperature,
    maxOutputTokens: llmConfig.maxTokens,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });
  const comparisonTelemetry = usageFromResult(
    comparisonResult.usage,
    Math.round(performance.now() - comparisonStartedAt),
    comparisonResult.providerMetadata,
    diagnosticsFromResult(comparisonResult),
  );
  assertGenerationNotTokenLimited(`Reverse translation comparison ${llmConfig.modelId}`, comparisonResult, llmConfig.maxTokens);

  const comparisonParsed = parseJudgeOutput(comparisonResult.text);
  const scores = normalizeReverseTranslationScores(comparisonParsed.scores);
  const issues = normalizeReverseTranslationIssues(comparisonParsed.issues);
  const telemetry = combineTelemetry([reverseTelemetry, comparisonTelemetry]);

  return {
    locale: input.locale,
    model: llmConfig.modelId,
    referenceCompared: true,
    reverseTranslation: reverseText,
    similarityScore: scores.similarity,
    faithfulness: scores.faithfulness,
    scores,
    issues,
    errors: [...reverseErrors, ...normalizeReverseErrors(comparisonParsed.errors)],
    confidence: normalizeConfidence(comparisonParsed.confidence),
    confidenceScore: normalizeScore(comparisonParsed.confidenceScore),
    convergence: singleModelConvergenceNote(),
    interpretationNotes: reverseTranslationInterpretationNotes(),
    rationale: stringValue(comparisonParsed.rationale) ?? "",
    rawText: {
      reverse: reverseResult.text,
      comparison: comparisonResult.text,
    },
    telemetry,
    cost: costForTelemetry(llmConfig.modelId, telemetry),
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
  const suggestions = mergeSuggestions(outputs);
  const issueCounts = countJudgeSuggestionPriorities(suggestions);
  const confidence = deriveJudgeConfidence({
    overallScore,
    highIssueCount: issueCounts.high,
    mediumIssueCount: issueCounts.medium,
    lowIssueCount: issueCounts.low,
    judgeCount: outputs.length,
    scoreRange: disagreement.scoreRange,
    publishReady,
    publishReadyDisagreement: disagreement.publishReadyDisagreement,
    blockingSuggestionDisagreement: disagreement.blockingSuggestionDisagreement,
    uncertaintyDetected: disagreement.uncertaintyDetected,
    frontierScores: outputs
      .filter((output) => isFrontierJudgeModel(output.model))
      .map((output) => output.overallScore),
  });

  return {
    overallScore,
    scores,
    publishReady,
    confidence: confidence.level,
    confidenceScore: confidence.score,
    confidenceSignals: confidence.signals,
    issueCounts: confidence.issueCounts,
    rationale: [
      `Consensus from ${outputs.length} judge assessment${outputs.length === 1 ? "" : "s"}.`,
      `Score range ${disagreement.scoreRange}; publish-ready votes ${publishReadyVotes}/${outputs.length}.`,
      blockingSuggestions.length > 0
        ? `${blockingSuggestions.length} blocking suggestion${blockingSuggestions.length === 1 ? "" : "s"} kept the candidate out of publish-ready status.`
        : "No blocking suggestions reached the consensus set.",
    ].join(" "),
    suggestions,
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

  return [...merged.values()].sort((a, b) =>
    b.supportingModels.length - a.supportingModels.length
    || priorityRank(b.priority) - priorityRank(a.priority)
  );
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

function promptTuningForModel(input: ScoreConsensusInput, model: string) {
  const explicit = input.promptTuningByModel?.[model];
  if (explicit != null) return explicit;

  const resolved = resolveLlmConfig(model);
  return input.promptTuningByModel?.[resolved.modelId]
    ?? input.promptTuningByModel?.[resolved.mastraModel]
    ?? input.promptTuningByModel?.[`openrouter/${resolved.modelId}`]
    ?? input.promptTuning;
}

function uniqueNonEmpty(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function addOptionalNumber(current: number | undefined, value: number | undefined) {
  if (value == null) return current;
  return (current ?? 0) + value;
}

function buildReverseTranslationContract(locale: ActiveLocale) {
  return [
    `Reverse-translate the ${locale} localized input back into English.`,
    "Do not polish the prose into what you think the original probably said.",
    "Preserve ambiguity, awkward phrasing, missing details, changed claims, code-adjacent terms, links, headings, and MDX-like structure as much as possible.",
    "Keep product names, API names, filenames, code identifiers, URLs, and component names literal.",
    "Return strict JSON only.",
  ].join("\n");
}

function buildReverseComparisonContract(locale: ActiveLocale) {
  return [
    `You are checking lost fidelity after a ${locale} translation has been reverse-translated to English.`,
    "Compare the English reference to the reverse translation, not to an ideal rewrite.",
    "Score from 0 to 100:",
    "- similarity: semantic closeness between reference and reverse translation.",
    "- faithfulness: whether claims, causality, emphasis, caveats, humor, and technical meaning survived.",
    "- coverage: whether important details and examples remain present.",
    "- technicalFidelity: whether code-adjacent facts, identifiers, API behavior, commands, and quiz answers are intact.",
    "- structuralCorrespondence: whether headings, frontmatter-like fields, MDX/components, links, and examples line up.",
    "Report concrete issues, but do not treat every paraphrase as damage.",
    "Low scores are diagnostic, not automatic failure: they can mean the original translation lost fidelity, or that this reverse-translation model/prompt failed.",
    "With a single model, do not claim convergence. Confidence in fidelity findings increases when multiple models using the same prompt converge; if they disagree, switch or tune prompts before deciding.",
    "Return strict JSON only.",
  ].join("\n");
}

function readPathOrBuffer(input: string | Buffer) {
  return typeof input === "string" ? readFileSync(input, "utf8") : input.toString("utf8");
}

function normalizeReverseTranslationScores(value: unknown): ReverseTranslationScores {
  const record = value != null && typeof value === "object" ? value as Record<string, unknown> : {};
  return {
    similarity: normalizeScore(record.similarity),
    faithfulness: normalizeScore(record.faithfulness),
    coverage: normalizeScore(record.coverage),
    technicalFidelity: normalizeScore(record.technicalFidelity),
    structuralCorrespondence: normalizeScore(record.structuralCorrespondence),
  };
}

function normalizeReverseTranslationIssues(value: unknown): ReverseTranslationIssue[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (item == null || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const message = stringValue(record.message);
    if (message == null || message.trim() === "") return [];
    return [{
      severity: normalizeSeverity(record.severity),
      category: stringValue(record.category) ?? "other",
      message,
      referenceExcerpt: stringValue(record.referenceExcerpt),
      reverseExcerpt: stringValue(record.reverseExcerpt),
      translatedExcerpt: stringValue(record.translatedExcerpt),
    }];
  });
}

function normalizeReverseErrors(value: unknown): ReverseTranslationError[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (item == null || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const message = stringValue(record.message);
    if (message == null || message.trim() === "") return [];
    return [{
      code: stringValue(record.code) ?? "model-reported",
      message,
    }];
  });
}

function normalizeScore(value: unknown) {
  const score = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function normalizeConfidence(value: unknown): ReverseTranslationOutput["confidence"] {
  if (typeof value !== "string") return "low";
  const normalized = value.toLowerCase();
  if (normalized === "high" || normalized === "medium" || normalized === "low") return normalized;
  return "low";
}

function normalizeSeverity(value: unknown): ReverseTranslationIssue["severity"] {
  if (typeof value !== "string") return "low";
  const normalized = value.toLowerCase();
  if (normalized === "high" || normalized === "medium" || normalized === "low") return normalized;
  return "low";
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function singleModelConvergenceNote(): ReverseTranslationOutput["convergence"] {
  return {
    modelCount: 1,
    converged: null,
    note: "Convergence is not assessed from one model run. Re-run this check with other models using the same prompt, then tune or switch prompts if low scores do not converge.",
  };
}

function reverseTranslationInterpretationNotes() {
  return [
    "Similarity and faithfulness are diagnostic signals, not pass/fail gates.",
    "A low score can reflect lost fidelity in the localized text or a weak reverse translation by this model.",
    "Treat findings as higher value when independent models converge on the same issues.",
  ];
}

function combineTelemetry(items: TranslationTelemetry[]): TranslationTelemetry {
  const combined: TranslationTelemetry = {
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    reasoningTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    durationMs: 0,
  };

  for (const item of items) {
    combined.inputTokens += item.inputTokens;
    combined.outputTokens += item.outputTokens;
    combined.totalTokens += item.totalTokens;
    combined.reasoningTokens += item.reasoningTokens;
    combined.cacheReadTokens += item.cacheReadTokens;
    combined.cacheWriteTokens += item.cacheWriteTokens;
    combined.durationMs += item.durationMs;
    combined.providerCostUsd = addOptionalNumber(combined.providerCostUsd, item.providerCostUsd);
    combined.providerUpstreamCostUsd = addOptionalNumber(combined.providerUpstreamCostUsd, item.providerUpstreamCostUsd);
  }
  combined.pricingSource = combined.providerCostUsd == null ? undefined : "openrouter-usage-accounting";
  return combined;
}

function costForTelemetry(modelId: string, telemetry: TranslationTelemetry) {
  return estimateTokenCost(
    modelId,
    telemetry.inputTokens,
    telemetry.outputTokens + telemetry.reasoningTokens,
    telemetry.cacheReadTokens,
    { providerCostUsd: telemetry.providerCostUsd },
  );
}

function joinPrompt(base: string, append: string | undefined, label: string) {
  if (append == null || append.trim() === "") return base;
  return [base.trim(), "", `${label}:`, append.trim()].join("\n");
}
