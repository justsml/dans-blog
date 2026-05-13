/**
 * Prompt templates for chunked translation.
 *
 * The system prompt encodes Dan Levy's editorial voice:
 *   - direct, technical, allergic to vendor-blog gloss
 *   - concrete tradeoffs over catalog density
 *   - humor as seasoning, not the main dish
 *
 * The user prompt carries article context (summary + previous-chunk
 * context) so the model can maintain consistency across chunks.
 */

import type { ActiveLocale, Locale } from "../../shared/i18n.ts";
import { LOCALE_LABELS } from "../../shared/i18n.ts";

export interface ChunkContext {
  chunkIndex: number;
  totalChunks: number;
  previousTranslation?: string;
  previousSourceContext?: string;
  nextSourceContext?: string;
  articleSummary: string;
}

function voiceGuidance(): string {
  return `
VOICE & STYLE (critical — do not soften):
- The author is direct, technical, and allergic to vendor-blog gloss.
- Keep the scar tissue, remove the brochure.
- Prefer concrete tradeoffs and operational detail over catalog density.
- Humor works best as seasoning. If a bit starts competing with the argument, cut it back.
- For fast-moving AI/search/database content, distinguish measured facts from current impressions.
- For security prose, avoid absolute guarantees. Prefer defense-in-depth wording: "reduces risk", "makes exploitation harder", "limits blast radius".
- Preserve the original sentence rhythm and paragraph structure where possible.
`.trim();
}

function mdxGuidance(): string {
  return `
MDX & CODE PRESERVATION (critical):
- Preserve ALL code blocks exactly. Do NOT translate code, variable names, file paths, or shell commands.
- Preserve ALL MDX component tags and their prop names. Only translate string prop VALUES that are reader-facing text (e.g., question text, labels, alt text).
- Preserve ALL import statements and their relative module paths.
- ALL relative URL paths for images, CSS, links, or other resources should prefix/prepend with a \`../\`.
- Preserve ALL markdown link URLs except relative URLs that need the locale-folder \`../\` prefix. Only translate the link text.
- Preserve ALL inline code spans (\`...\`).
- Do not add or remove blank lines around code fences or components unless the original has them.
`.trim();
}

function quizGuidance(): string {
  return `
QUIZ TRANSLATION RULES (critical):
This is a technical quiz with interactive <Challenge> components. Follow these rules exactly:

1. <Challenge> props to TRANSLATE:
   - title: translate the question title
   - group: translate the section/group name (e.g., "Warmup" → "Calentamiento")

2. <Challenge> props to PRESERVE exactly:
   - index, client:visible, options[].isAnswer
   - All JSX structure, brackets, commas, and prop names

3. options[].text:
   - Translate the answer choice text
   - Preserve the exact string quoting (single quotes in source → single quotes in output)
   - Preserve isAnswer: true/false exactly

4. <slot name="question">:
   - Translate the question prose (the text asking "What does this log?")
   - PRESERVE all code blocks inside the slot EXACTLY
   - Preserve all inline code spans (variable names in backticks)
   - The question text itself should feel like a native speaker wrote it

5. <slot name="explanation">:
   - Translate the educational explanation prose
   - PRESERVE all code blocks exactly
   - Preserve all inline code spans and variable names in backticks
   - Preserve technical terms that shouldn't be translated (e.g., JavaScript API names)
   - Keep the teaching tone: direct, slightly irreverent, authoritative

6. Special strings to handle carefully:
   - "What does this log?" → natural question in target language
   - "What gets logged after Xms?" → natural question in target language
   - Answer choice strings like "ReferenceError", "undefined x5" → translate descriptive parts, keep technical terms
   - Keep code output strings (like "1, 2, 3") as literal values inside quotes
`.trim();
}

export function buildSystemPrompt(locale: Locale, isQuiz: boolean = false): string {
  const language = LOCALE_LABELS[locale];

  const parts = [
    `You are an expert technical translator translating into ${language}.`,
    `Your job is to produce a translation that reads like it was originally written by a senior engineer — not like a translation.`,
    voiceGuidance(),
    mdxGuidance(),
  ];

  if (isQuiz) {
    parts.push(quizGuidance());
  }

  parts.push(`Output ONLY the translated text. Do not wrap it in markdown code fences. Do not add meta-commentary.`);

  return parts.join("\n\n");
}

export function buildUserPrompt(
  chunkText: string,
  locale: ActiveLocale,
  context: ChunkContext,
  isQuiz: boolean = false,
): string {
  return [
    buildCachedChunkContextPrompt(locale, context),
    buildDynamicChunkPrompt(chunkText, locale, context, isQuiz),
  ].filter(Boolean).join("\n\n");
}

export function buildCachedChunkContextPrompt(
  locale: ActiveLocale,
  context: ChunkContext,
): string {
  const language = LOCALE_LABELS[locale];
  const parts: string[] = [];

  parts.push(`TRANSLATION TARGET: ${language}`);
  parts.push("");

  parts.push(`ARTICLE SUMMARY (for consistency across chunks):`);
  parts.push(context.articleSummary);
  parts.push("");

  parts.push("Remember: preserve all code, MDX components, and imports. For images, CSS, links, or other resources, prefix/prepend ALL relative URL paths with `../`. Translate only reader-facing prose.");

  return parts.join("\n");
}

export function buildDynamicChunkPrompt(
  chunkText: string,
  locale: ActiveLocale,
  context: ChunkContext,
  isQuiz: boolean = false,
): string {
  const language = LOCALE_LABELS[locale];
  const parts: string[] = [];

  if (context.previousTranslation) {
    parts.push(`PREVIOUS CHUNK TRANSLATION (end of chunk ${context.chunkIndex}):`);
    parts.push(context.previousTranslation.slice(-400));
    parts.push("");
  }

  if (context.previousSourceContext || context.nextSourceContext) {
    parts.push(`SOURCE CONTEXT PADDING (for continuity only; do not translate this padding in your output):`);
    if (context.previousSourceContext) {
      parts.push(`Before this chunk:`);
      parts.push(context.previousSourceContext);
    }
    if (context.nextSourceContext) {
      parts.push(`After this chunk:`);
      parts.push(context.nextSourceContext);
    }
    parts.push("");
  }

  parts.push(`TRANSLATE the following chunk into ${language}.`);
  parts.push(`This is chunk ${context.chunkIndex + 1} of ${context.totalChunks}.`);
  if (isQuiz) {
    parts.push(`This chunk contains quiz <Challenge> components. Follow the quiz translation rules precisely.`);
  }
  parts.push("");
  parts.push("--- CHUNK START ---");
  parts.push(chunkText);
  parts.push("--- CHUNK END ---");
  parts.push("");

  return parts.join("\n");
}

export function buildSummaryPrompt(frontmatterTitle: string, body: string, isQuiz: boolean = false): string {
  const sample = body.slice(0, 6000);
  const type = isQuiz ? "quiz" : "article";
  return [
    `You are reading a technical ${type} titled "${frontmatterTitle}".`,
    `Write a concise 3-5 sentence summary of the ${type}'s main argument, key points, and intended audience.`,
    `This summary will be fed back to a translation model to help it maintain consistency across chunks.`,
    `Focus on: the core thesis, any specific technologies discussed, the tone (tutorial, rant, analysis, etc.), and any recurring metaphors or framing devices.`,
    isQuiz ? `Also note: this is a quiz with interactive coding questions. The questions test JavaScript/technical concepts with code examples and multiple-choice answers.` : "",
    ``,
    `${type} excerpt:`,
    `---`,
    sample,
    sample.length < body.length ? "... (truncated)" : "",
    `---`,
  ].filter(Boolean).join("\n");
}
