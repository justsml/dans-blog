import { generateText as defaultGenerateText } from "../braintrust.ts";
import {
  averageJudgeScore,
  getJudgeJsonShape,
  normalizeJudgeScores,
  parseJudgeOutput,
  readSuggestionsFromParsed,
  type JudgeScoreMap,
  type JudgeSuggestion,
} from "../judge-utils.ts";
import { cachedText, usageFromResult, type TranslationTelemetry } from "../llm-telemetry.ts";
import { getLengthValidationGuidance } from "../localized-mdx.ts";
import { type ActiveLocale } from "../../../shared/i18n.ts";
import { createOpenRouterChatModel, resolveLlmConfig } from "./model-config.ts";

export type ScoreTranslationInput = {
  sourceContents: string;
  targetContents: string;
  locale: ActiveLocale;
  model: string;
  slug?: string;
  targetRelPath?: string;
  candidateId?: string;
  generateText?: typeof defaultGenerateText;
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
      {
        role: "user",
        content: [
          cachedText(buildScoreTranslationPrompt(input)),
          {
            type: "text",
            text: [
              "<english-source>",
              input.sourceContents,
              "</english-source>",
              "",
              `<candidate id="${input.candidateId ?? "candidate"}">`,
              input.targetContents,
              "</candidate>",
            ].join("\n"),
          },
        ],
      },
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
  };
}

function buildScoreTranslationPrompt(input: ScoreTranslationInput) {
  const jsonShape = {
    ...getJudgeJsonShape(),
    selectedCommit: input.candidateId ?? "candidate",
    selectedModel: "model id if known",
    publishReady: false,
  };

  return [
    `Judge the ${input.locale} translation${input.slug ? ` for ${input.slug}` : ""}.`,
    `Target path: ${input.targetRelPath ?? "unknown"}`,
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
    "Use this JSON shape:",
    JSON.stringify(jsonShape),
  ].join("\n");
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
