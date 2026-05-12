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

import { generateText } from "ai";
import { z } from "zod";
import { createOpenRouter, type OpenRouterProviderSettings } from "@openrouter/ai-sdk-provider";
import type { QuizChallenge, ParsedQuiz } from "./quiz-parser.ts";
import { slotToTranslatable, slotFromTranslatable } from "./quiz-parser.ts";
import type { ActiveLocale } from "../../shared/i18n.ts";
import { LOCALE_LABELS } from "../../shared/i18n.ts";

const TranslationSchema = z.object({
  title: z.string().describe("Translated question title"),
  group: z.string().describe("Translated group/section name"),
  options: z.array(
    z.object({
      text: z.string().describe("Translated answer choice text"),
      hint: z.string().optional().describe("Translated hint text (if present)"),
    }),
  ).describe("Answer options — same count and order as input"),
  questionProse: z.array(
    z.string().describe("Translated prose segments from the question slot (same count, same order)"),
  ),
  explanationProse: z.array(
    z.string().describe("Translated prose segments from the explanation slot (same count, same order)"),
  ),
});

type TranslationResult = z.infer<typeof TranslationSchema>;

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
}

interface TranslationTelemetry {
  inputTokens: number;
  outputTokens: number;
  durationMs: number;
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
    `3. Answer options may contain code snippets (like \`'95'::INTEGER\`). Preserve the code exactly, only translate any descriptive text around it.`,
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

function buildQuizUserPrompt(
  challenge: QuizChallenge,
  locale: ActiveLocale,
  quizDescription: string,
): string {
  const { prose: questionProse, codeBlocks: questionCode } = slotToTranslatable(challenge.question);
  const { prose: explanationProse, codeBlocks: explanationCode } = slotToTranslatable(challenge.explanation);

  const payload = {
    title: challenge.title,
    group: challenge.group,
    options: challenge.options.map((o) => ({
      text: o.text,
      hint: o.hint,
    })),
    questionProse,
    questionCode: questionCode.map((c) => ({ language: c.language, code: "[PRESERVED — do not translate]" })),
    explanationProse,
    explanationCode: explanationCode.map((c) => ({ language: c.language, code: "[PRESERVED — do not translate]" })),
  };

  return [
    `QUIZ CONTEXT:`,
    quizDescription,
    ``,
    `Translate this Challenge (index ${challenge.index}) into ${LOCALE_LABELS[locale]}.`,
    ``,
    `INPUT JSON:`,
    JSON.stringify(payload, null, 2),
    ``,
    `Return a JSON object with these exact fields:`,
    `- title: translated title`,
    `- group: translated group name`,
    `- options: array of {text, hint?} — SAME COUNT as input`,
    `- questionProse: array of strings — SAME COUNT as input questionProse`,
    `- explanationProse: array of strings — SAME COUNT as input explanationProse`,
    ``,
    `The code blocks are preserved automatically. Only translate the prose fields.`,
    ``,
    `Your entire response must be a single valid JSON object. Do not include markdown code fences (\`\`\`json) or any text outside the JSON.`,
  ].join("\n");
}

export async function translateChallenge(
  challenge: QuizChallenge,
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  quizDescription: string,
  isQuiz: boolean,
): Promise<{ challenge: QuizChallenge; telemetry: TranslationTelemetry }> {
  const start = performance.now();

  const provider = createOpenRouter(llmConfig.providerSettings);
  const model = provider.chat(llmConfig.modelId);

  const result = await generateText({
    model,
    system: buildQuizSystemPrompt(locale, isQuiz),
    prompt: buildQuizUserPrompt(challenge, locale, quizDescription),
    temperature: llmConfig.temperature,
    maxOutputTokens: llmConfig.maxTokens,
    providerOptions: llmConfig.providerOptions,
  });

  const durationMs = Math.round(performance.now() - start);

  // Parse JSON from text response
  let parsed: unknown;
  try {
    const cleaned = result.text.trim().replace(/^```json\s*/, "").replace(/```\s*$/, "");
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("\n❌ Failed to parse JSON response. Raw text:");
    console.error(result.text);
    throw new Error(`JSON parse failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  // Validate with Zod
  const validated = TranslationSchema.safeParse(parsed);
  if (!validated.success) {
    console.error("\n❌ JSON validation failed. Parsed object:");
    console.error(JSON.stringify(parsed, null, 2));
    console.error("Errors:", validated.error.issues);
    throw new Error(`JSON validation failed: ${validated.error.issues.map((issue) => issue.message).join("; ")}`);
  }

  const translated = validated.data;

  // Merge translation back into challenge
  const merged = mergeTranslation(challenge, translated);

  return {
    challenge: merged,
    telemetry: {
      inputTokens: result.usage?.inputTokens ?? 0,
      outputTokens: result.usage?.outputTokens ?? 0,
      durationMs,
    },
  };
}

function mergeTranslation(
  original: QuizChallenge,
  translated: TranslationResult,
): QuizChallenge {
  const merged: QuizChallenge = { ...original };

  merged.title = translated.title;
  merged.group = translated.group;

  // Merge options
  merged.options = original.options.map((opt, i) => {
    const t = translated.options[i];
    if (!t) return opt;
    return {
      text: t.text,
      isAnswer: opt.isAnswer,
      hint: t.hint ?? opt.hint,
    };
  });

  // Merge question slot
  merged.question = slotFromTranslatable(original.question, translated.questionProse);

  // Merge explanation slot
  merged.explanation = slotFromTranslatable(original.explanation, translated.explanationProse);

  return merged;
}

/** Generate a short quiz description from the intro/outro for translation context. */
export async function generateQuizDescription(
  quiz: ParsedQuiz,
  llmConfig: LlmConfig,
): Promise<string> {
  const context = [
    quiz.intro.slice(0, 800),
    "---",
    quiz.outro.slice(0, 400),
  ].join("\n");

  const provider = createOpenRouter(llmConfig.providerSettings);
  const model = provider.chat(llmConfig.modelId);

  const result = await generateText({
    model,
    system: `You are a technical editor. Summarize quiz content concisely. You must respond with valid JSON only. Do not wrap in markdown code fences.`,
    prompt: [
      `Summarize this technical quiz in 2-3 sentences.`,
      `Focus on: what skills it tests, the difficulty level, and the teaching tone.`,
      `Also list the key topics and target audience.`,
      ``,
      `Respond with a JSON object having these fields: description, topics (array of strings), audience.`,
      ``,
      `Quiz excerpt:`,
      `---`,
      context,
      `---`,
    ].join("\n"),
    temperature: 0.3,
    maxOutputTokens: 500,
    providerOptions: llmConfig.providerOptions,
  });

  let parsed: unknown;
  try {
    const cleaned = result.text.trim().replace(/^```json\s*/, "").replace(/```\s*$/, "");
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse quiz description JSON:", result.text);
    throw new Error(`Quiz description JSON parse failed: ${err instanceof Error ? err.message : String(err)}`);
  }

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
  return [
    d.description,
    `Topics: ${d.topics.join(", ")}`,
    `Audience: ${d.audience}`,
  ].join("\n");
}
