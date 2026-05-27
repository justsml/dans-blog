/**
 * Structured quiz translator.
 *
 * Translates one Challenge at a time using structured JSON output.
 * Uses generateText (not generateObject) for maximum provider compatibility,
 * then parses and validates the JSON response manually.
 *
 * The word "json" is included in every prompt to satisfy providers that
 * require it when emitting JSON (e.g., Alibaba/Qwen via OpenRouter).
 */

import { generateText } from "./braintrust.ts";
import { jsonrepair } from "jsonrepair";
import { z } from "zod";
import { createOpenRouter, type OpenRouterProviderSettings } from "@openrouter/ai-sdk-provider";
import type { QuizChallenge, ParsedQuiz } from "./quiz-parser.ts";
import { normalizeMarkdownIndentation, slotToTranslatable, slotFromTranslatable } from "./quiz-parser.ts";
import type { ActiveLocale } from "../../shared/i18n.ts";
import { LOCALE_LABELS } from "../../shared/i18n.ts";
import {
  OPENROUTER_USAGE_ACCOUNTING,
  assertGenerationNotTokenLimited,
  cachedUserMessage,
  diagnosticsFromResult,
  plainUserMessage,
  usageFromResult,
  type TranslationTelemetry,
} from "./llm-telemetry.ts";
import { assertNoOutOfCreditMarker } from "./out-of-credit.ts";

const TranslationSchema = z.object({
  title: z.string().describe("Translated question title"),
  group: z.string().describe("Translated group/section name"),
  options: z.array(
    z.object({
      text: z.string().describe("Translated answer choice text"),
      hint: z.string().optional().describe("Translated hint text (if present)"),
    }),
  ).describe("Answer options — same count and order as input"),
  objectives: z.array(
    z.string().describe("Translated learning objective text"),
  ).describe("Learning objectives — same count and order as input"),
  questionProse: z.array(
    z.string().describe("Translated prose segments from the question slot (same count, same order)"),
  ),
  hintsProse: z.array(
    z.string().describe("Translated prose segments from the hints slot (same count, same order)"),
  ),
  explanationProse: z.array(
    z.string().describe("Translated prose segments from the explanation slot (same count, same order)"),
  ),
});

export type TranslationResult = z.infer<typeof TranslationSchema>;

export interface LlmConfig {
  modelId: string;
  providerSettings: OpenRouterProviderSettings;
  providerOptions: {
    openrouter: {
      reasoning: {
        effort: string;
      };
    };
  };
  temperature: number;
  maxTokens: number;
  timeoutMs: number;
}

export interface QuizPromptTuning {
  appendSystem?: string;
  appendCachedContext?: string;
  appendDynamic?: string;
  appendQuizProse?: string;
  appendSummary?: string;
}

function buildQuizSystemPrompt(locale: ActiveLocale, isQuiz: boolean): string {
  const language = LOCALE_LABELS[locale];

  const parts = [
    `You are an expert technical translator translating quiz content into ${language}.`,
    `You must respond with valid JSON. Do not wrap the JSON in markdown code fences. Output raw JSON only.`,
    ``,
    `CRITICAL RULES:`,
    `1. Translate ONLY reader-facing prose. Do NOT translate code, variable names, or API names.`,
    `2. Preserve ALL inline code spans (backtick content) exactly — do not translate variable names, function names, or code syntax inside backticks.`,
    `3. Answer options may contain code snippets or validator-sensitive labels (like \`'95'::INTEGER\`, \`Width: 110px\`, \`Filename must end w/ .scss\`, or \`cat cbt\`). Preserve those code-like option strings exactly; only translate plainly descriptive options.`,
    `4. Hints should be short, helpful, and natural in ${language}.`,
    `5. Question text should read like a native speaker wrote it — direct, slightly irreverent, authoritative.`,
    `6. Explanation text should maintain the teaching tone: explain WHY, not just WHAT.`,
    `7. Preserve markdown formatting (bold, italic, lists) in the translated text.`,
    `8. Preserve all markdown link URLs — only translate link text if there is any.`,
  ];

  if (isQuiz) {
    parts.push(`9. This is a technical coding quiz. Keep technical terms accurate but translate instructional language.`);
  }

  parts.push(`10. Output count and order must exactly match input count and order for arrays.`);
  parts.push(`11. Respond with a single valid JSON object. No commentary before or after.`);

  return parts.join("\n");
}

function buildCachedQuizPromptContext(
  locale: ActiveLocale,
  quizDescription: string,
  isQuiz: boolean,
): string {
  const contextLines = quizDescription ? [`QUIZ CONTEXT:`, quizDescription, ``] : [];

  return [
    `STABLE QUIZ TRANSLATION CONTRACT (cache this across all challenges):`,
    buildQuizSystemPrompt(locale, isQuiz),
    ``,
    ...contextLines,
    `Return a JSON object with these exact fields:`,
    `- title: translated title`,
    `- group: translated group name`,
    `- options: array of {text, hint?} — SAME COUNT as input`,
    `- objectives: array of strings — SAME COUNT as input objectives`,
    `- questionProse: array of strings — SAME COUNT as input questionProse`,
    `- hintsProse: array of strings — SAME COUNT as input hintsProse`,
    `- explanationProse: array of strings — SAME COUNT as input explanationProse`,
    ``,
    `The code blocks are preserved automatically. Only translate the prose fields.`,
    `Your entire response must be a single valid JSON object. Do not include markdown code fences (\`\`\`json) or any text outside the JSON.`,
  ].join("\n");
}

function buildDynamicQuizPrompt(challenge: QuizChallenge): string {
  const { prose: questionProse, codeBlocks: questionCode } = slotToTranslatable(challenge.question);
  const { prose: hintsProse, codeBlocks: hintsCode } = slotToTranslatable(challenge.hints);
  const { prose: explanationProse, codeBlocks: explanationCode } = slotToTranslatable(challenge.explanation);

  const payload = {
    title: challenge.title,
    group: challenge.group,
    options: challenge.options.map((o) => ({
      text: o.text,
      hint: o.hint,
      preserveText: isCodeLikeOptionText(o.text),
    })),
    objectives: challenge.objectives,
    questionProse,
    questionCode: questionCode.map((c) => ({ language: c.language, code: "[PRESERVED — do not translate]" })),
    hintsProse,
    hintsCode: hintsCode.map((c) => ({ language: c.language, code: "[PRESERVED — do not translate]" })),
    explanationProse,
    explanationCode: explanationCode.map((c) => ({ language: c.language, code: "[PRESERVED — do not translate]" })),
  };

  return [
    `Translate this Challenge (index ${challenge.index}).`,
    `If an option has preserveText: true, return its text unchanged. The pipeline will keep the source text exactly.`,
    ``,
    `INPUT JSON:`,
    JSON.stringify(payload, null, 2),
  ].join("\n");
}

export async function translateChallenge(
  challenge: QuizChallenge,
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  quizDescription: string,
  isQuiz: boolean,
  promptTuning?: QuizPromptTuning,
): Promise<{
  challenge: QuizChallenge;
  translation: TranslationResult;
  rawText: string;
  telemetry: TranslationTelemetry;
}> {
  const start = performance.now();

  const provider = createOpenRouter(llmConfig.providerSettings);
  const model = provider.chat(llmConfig.modelId, OPENROUTER_USAGE_ACCOUNTING);
  assertNoOutOfCreditMarker();

  const result = await generateText({
    model,
    allowSystemInMessages: true,
    messages: [
      {
        role: "system",
        content: joinPrompt(
          "You are a technical quiz translator. Follow the stable quiz translation contract in the user message. Respond with valid JSON only.",
          promptTuning?.appendSystem,
        ),
      },
      cachedUserMessage(joinPrompt(
        buildCachedQuizPromptContext(locale, quizDescription, isQuiz),
        promptTuning?.appendCachedContext,
      )),
      plainUserMessage(joinPrompt(
        buildDynamicQuizPrompt(challenge),
        promptTuning?.appendQuizProse ?? promptTuning?.appendDynamic,
        "QUIZ CHALLENGE PROMPT PROFILE TUNING",
      )),
    ],
    temperature: llmConfig.temperature,
    maxOutputTokens: llmConfig.maxTokens,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });

  const durationMs = Math.round(performance.now() - start);
  assertGenerationNotTokenLimited(`Quiz challenge ${challenge.index} translation`, result, llmConfig.maxTokens);

  const parsed = parseLlmJson(result.text, "challenge translation");

  // Validate with Zod
  const validated = TranslationSchema.safeParse(parsed);
  if (!validated.success) {
    console.error("\n❌ JSON validation failed. Parsed object:");
    console.error(JSON.stringify(parsed, null, 2));
    console.error("Errors:", validated.error.issues);
    throw new Error(`JSON validation failed: ${validated.error.issues.map((issue) => issue.message).join("; ")}`);
  }

  const translated = validated.data;
  assertTranslatedCounts(challenge, translated);

  // Merge translation back into challenge
  const merged = mergeTranslation(challenge, translated);
  assertMergedChallengeIntegrity(challenge, merged);

  return {
    challenge: merged,
    translation: translated,
    rawText: result.text,
    telemetry: usageFromResult(result.usage, durationMs, result.providerMetadata, diagnosticsFromResult(result)),
  };
}

function mergeTranslation(
  original: QuizChallenge,
  translated: TranslationResult,
): QuizChallenge {
  const merged: QuizChallenge = { ...original };

  merged.title = translated.title;
  merged.group = translated.group;
  merged.objectives = original.objectives.map((objective, i) => translated.objectives[i] ?? objective);

  // Merge options
  merged.options = original.options.map((opt, i) => {
    const t = translated.options[i];
    if (!t) return opt;
    return {
      text: isCodeLikeOptionText(opt.text) ? opt.text : t.text,
      isAnswer: opt.isAnswer,
      hint: t.hint ?? opt.hint,
    };
  });

  // Merge question slot
  merged.question = slotFromTranslatable(original.question, translated.questionProse);

  // Merge hints slot
  merged.hints = slotFromTranslatable(original.hints, translated.hintsProse);

  // Merge explanation slot
  merged.explanation = slotFromTranslatable(original.explanation, translated.explanationProse);

  return merged;
}

export function isCodeLikeOptionText(value: string) {
  const trimmed = value.trim();
  return (
    /^(?:NaN|null|undefined|TypeError|RangeError|ReferenceError|SyntaxError)(?::|$)/.test(trimmed)
    || /(?:\b[A-Za-z_$][\w$]*\s*\(|=>|::|[;]|\\|\\'|\\")/.test(trimmed)
    || /(?:^|\s)(?:\$\(|\$\{|[12]>&[12]|[|&<>!=]=?|&&|\|\|)/.test(trimmed)
    || /(?:^|\s)\.[A-Za-z][\w-]*\b/.test(trimmed)
    || /<\/?[A-Za-z][^>]*>/.test(trimmed)
    || /^(?:cat|grep|sed|awk|curl|bun|npm|node|git|docker|pnpm)\s+\S+/.test(trimmed)
    || /(?:^|[\s/])[-a-z0-9_]+\.(?:js|jsx|ts|tsx|mjs|cjs|css|scss|html|json|mdx?|ya?ml|sql)\b/.test(trimmed)
    || /(?:^|[\s])\/[^/\n]+\/[a-z]*\b/i.test(trimmed)
    || /['"`][^'"`]*(?:\(|\)|::|\\|[{}[\];]|=>)[^'"`]*['"`]/.test(trimmed)
    || /^[A-Za-z][\w -]{0,24}:\s*[-#.$%()\w]+$/.test(trimmed)
  );
}

function assertMergedChallengeIntegrity(original: QuizChallenge, merged: QuizChallenge) {
  if (original.options.length !== merged.options.length) {
    throw new Error(`Challenge ${original.index} option count changed after merge.`);
  }

  for (let index = 0; index < original.options.length; index += 1) {
    const source = original.options[index];
    const output = merged.options[index];
    if (output == null) {
      throw new Error(`Challenge ${original.index} option ${index + 1} is missing after merge.`);
    }
    if (output.text.trim() === "") {
      throw new Error(`Challenge ${original.index} option ${index + 1} is empty after translation.`);
    }
    if (source.isAnswer !== output.isAnswer) {
      throw new Error(`Challenge ${original.index} option ${index + 1} changed isAnswer.`);
    }
    if (source.hint != null && output.hint == null) {
      throw new Error(`Challenge ${original.index} option ${index + 1} dropped its hint.`);
    }
    if (isCodeLikeOptionText(source.text) && output.text !== source.text) {
      throw new Error(`Challenge ${original.index} option ${index + 1} changed preserved code-like text.`);
    }
  }
}

function assertTranslatedCounts(original: QuizChallenge, translated: TranslationResult) {
  const { prose: questionProse } = slotToTranslatable(original.question);
  const { prose: hintsProse } = slotToTranslatable(original.hints);
  const { prose: explanationProse } = slotToTranslatable(original.explanation);
  const checks: Array<[string, number, number]> = [
    ["options", original.options.length, translated.options.length],
    ["objectives", original.objectives.length, translated.objectives.length],
    ["questionProse", questionProse.length, translated.questionProse.length],
    ["hintsProse", hintsProse.length, translated.hintsProse.length],
    ["explanationProse", explanationProse.length, translated.explanationProse.length],
  ];

  const mismatches = checks
    .filter(([, expected, actual]) => expected !== actual)
    .map(([field, expected, actual]) => `${field}: expected ${expected}, got ${actual}`);

  if (mismatches.length > 0) {
    throw new Error(`Quiz translation changed array counts for Challenge ${original.index}: ${mismatches.join("; ")}`);
  }
}

/** Generate a short quiz description from the intro/outro for translation context. */
export async function generateQuizDescription(
  quiz: ParsedQuiz,
  llmConfig: LlmConfig,
  promptTuning?: QuizPromptTuning,
): Promise<{ description: string; telemetry: TranslationTelemetry; rawText: string }> {
  const start = performance.now();
  const context = [
    quiz.intro.slice(0, 800),
    "---",
    quiz.outro.slice(0, 400),
  ].join("\n");

  const provider = createOpenRouter(llmConfig.providerSettings);
  const model = provider.chat(llmConfig.modelId, OPENROUTER_USAGE_ACCOUNTING);
  assertNoOutOfCreditMarker();

  const result = await generateText({
    model,
    allowSystemInMessages: true,
    messages: [
      {
        role: "system",
        content: joinPrompt(
          `You are a technical editor. Summarize quiz content concisely. You must respond with valid JSON only. Do not wrap in markdown code fences.`,
          promptTuning?.appendSystem,
        ),
      },
      cachedUserMessage([
        `Summarize this technical quiz in 2-3 sentences.`,
        `Focus on: what skills it tests, the difficulty level, and the teaching tone.`,
        `Also list the key topics and target audience.`,
        ``,
        `Respond with a JSON object having these fields: description, topics (array of strings), audience.`,
      ].join("\n")),
      plainUserMessage([
        `Quiz excerpt:`,
        `---`,
        joinPrompt(context, promptTuning?.appendSummary, "QUIZ SUMMARY PROMPT PROFILE TUNING"),
        `---`,
      ].join("\n")),
    ],
    temperature: 0.3,
    maxOutputTokens: 500,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });
  const durationMs = Math.round(performance.now() - start);
  assertGenerationNotTokenLimited("Quiz description generation", result, 500);

  const parsed = parseLlmJson(result.text, "quiz description");

  const descSchema = z.object({
    description: z.string(),
    topics: z.array(z.string()),
    audience: z.string(),
  });

  const validated = descSchema.safeParse(parsed);
  if (!validated.success) {
    console.error("Quiz description validation failed:", parsed);
    throw new Error(`Quiz description validation failed`);
  }

  const d = validated.data;
  const description = normalizeMarkdownIndentation([
    d.description,
    `Topics: ${d.topics.join(", ")}`,
    `Audience: ${d.audience}`,
  ].join("\n"));

  return {
    description,
    rawText: result.text,
    telemetry: usageFromResult(result.usage, durationMs, result.providerMetadata, diagnosticsFromResult(result)),
  };
}

function parseLlmJson(text: string, label: string): unknown {
  const cleaned = stripJsonFences(text);

  try {
    return JSON.parse(cleaned);
  } catch (firstErr) {
    try {
      return JSON.parse(jsonrepair(cleaned));
    } catch (repairErr) {
      console.error(`\n❌ Failed to parse ${label} JSON response. Raw text:`);
      console.error(text);
      throw new Error([
        `${label} JSON parse failed`,
        `parse: ${firstErr instanceof Error ? firstErr.message : String(firstErr)}`,
        `repair: ${repairErr instanceof Error ? repairErr.message : String(repairErr)}`,
      ].join("; "));
    }
  }
}

function stripJsonFences(text: string) {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

function joinPrompt(base: string, append: string | undefined, label = "PROMPT PROFILE TUNING") {
  if (append == null || append.trim() === "") return base;
  return [base.trim(), "", `${label}:`, append.trim()].join("\n");
}
