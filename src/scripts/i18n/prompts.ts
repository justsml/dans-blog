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
- Preserve ALL import statements and relative paths.
- Preserve ALL markdown link URLs. Only translate the link text.
- Preserve ALL inline code spans (\`...\`).
- Do not add or remove blank lines around code fences or components unless the original has them.
`.trim();
}

export function buildSystemPrompt(locale: Locale): string {
  const language = LOCALE_LABELS[locale];

  return [
    `You are an expert technical translator translating into ${language}.`,
    `Your job is to produce a translation that reads like it was originally written by a senior engineer — not like a translation.`,
    voiceGuidance(),
    mdxGuidance(),
    `Output ONLY the translated text. Do not wrap it in markdown code fences. Do not add meta-commentary.`,
  ].join("\n\n");
}

export function buildUserPrompt(
  chunkText: string,
  locale: ActiveLocale,
  context: ChunkContext,
): string {
  const language = LOCALE_LABELS[locale];
  const parts: string[] = [];

  parts.push(`ARTICLE SUMMARY (for consistency across chunks):`);
  parts.push(context.articleSummary);
  parts.push("");

  if (context.previousTranslation) {
    parts.push(`PREVIOUS CHUNK TRANSLATION (end of chunk ${context.chunkIndex}):`);
    parts.push(context.previousTranslation.slice(-400));
    parts.push("");
  }

  parts.push(`TRANSLATE the following chunk into ${language}.`);
  parts.push(`This is chunk ${context.chunkIndex + 1} of ${context.totalChunks}.`);
  parts.push("");
  parts.push("--- CHUNK START ---");
  parts.push(chunkText);
  parts.push("--- CHUNK END ---");
  parts.push("");
  parts.push("Remember: preserve all code, MDX components, imports, and paths. Translate only reader-facing prose.");

  return parts.join("\n");
}

export function buildSummaryPrompt(frontmatterTitle: string, body: string): string {
  const sample = body.slice(0, 6000);
  return [
    `You are reading a technical article titled "${frontmatterTitle}".`,
    `Write a concise 3-5 sentence summary of the article's main argument, key points, and intended audience.`,
    `This summary will be fed back to a translation model to help it maintain consistency across chunks.`,
    `Focus on: the core thesis, any specific technologies discussed, the tone (tutorial, rant, analysis, etc.), and any recurring metaphors or framing devices.`,
    ``,
    `Article excerpt:`,
    `---`,
    sample,
    sample.length < body.length ? "... (truncated)" : "",
    `---`,
  ].filter(Boolean).join("\n");
}
