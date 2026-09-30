/**
 * Per-article translation style sheet: one glossary + register decision per
 * source post and locale, shared by every chunk, frontmatter field, quiz
 * Challenge, and candidate model that translates that post.
 *
 * Chunks are translated independently with only a few hundred characters of
 * cross-chunk context, so without a shared sheet the same metric drifts
 * between names ("Routengenauigkeit" → "Routenpräzision"), the reader flips
 * from "du" to "Sie" halfway through, and quiz group labels multiply.
 *
 * The sheet is generated once from the FULL English source with one
 * structured call and cached on disk keyed by (source hash, locale, prompt
 * version). Any model may write it; every later run for the same source and
 * locale reuses it, which is what makes candidates comparable.
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { LanguageModel } from "ai";
import { jsonrepair } from "jsonrepair";
import { z } from "zod";
import { generateText } from "./ai-sdk.ts";
import { extractJsonObject } from "./judge-utils.ts";
import {
  assertGenerationNotTokenLimited,
  cachedUserMessage,
  diagnosticsFromResult,
  plainUserMessage,
  usageFromResult,
  type TranslationTelemetry,
} from "./llm-telemetry.ts";
import type { ActiveLocale } from "../../shared/i18n.ts";
import { LOCALE_LABELS } from "../../shared/i18n.ts";

// Bump when the sheet prompt or schema changes so stale sheets are not reused.
export const STYLE_SHEET_PROMPT_VERSION = 1;
export const MAX_STYLE_SHEET_TERMS = 40;
const STYLE_SHEET_HASH_LENGTH = 16;

const TermSchema = z.object({
  source: z.string().trim().min(1),
  target: z.string().trim().min(1),
  keepEnglish: z.boolean(),
  note: z.string().trim().min(1).optional(),
});

const GroupSchema = z.object({
  source: z.string(),
  target: z.string().trim().min(1),
});

export const StyleSheetSchema = z.object({
  version: z.number().int(),
  locale: z.string(),
  sourceHash: z.string(),
  model: z.string(),
  createdAt: z.string(),
  register: z.object({
    addressForm: z.string().trim().min(1),
    guidance: z.string().trim().min(1),
  }),
  terms: z.array(TermSchema).max(MAX_STYLE_SHEET_TERMS),
  challengeGroups: z.array(GroupSchema),
});

export type StyleSheet = z.infer<typeof StyleSheetSchema>;
export type StyleSheetTerm = z.infer<typeof TermSchema>;

// Lenient shape for what the model returns; normalizeStyleSheetResponse()
// tightens it into a StyleSheet.
const ModelResponseSchema = z.object({
  register: z.object({
    addressForm: z.string(),
    guidance: z.string(),
  }),
  terms: z.array(z.object({
    source: z.string(),
    target: z.string().nullish(),
    keepEnglish: z.boolean().nullish(),
    note: z.string().nullish(),
  })).default([]),
  challengeGroups: z.array(z.object({
    source: z.string(),
    target: z.string().nullish(),
  })).default([]),
});

export interface StyleSheetModelCall {
  model: LanguageModel;
  modelId: string;
  temperature?: number;
  maxOutputTokens: number;
  timeoutMs: number;
  providerOptions?: Parameters<typeof generateText>[0]["providerOptions"];
}

export interface StyleSheetRef {
  path: string;
  hash: string;
  sourceHash: string;
  version: number;
  model: string;
  generatedInRun: boolean;
}

/** Hash of the full source (frontmatter + body); the sheet is built from both. */
export function hashStyleSheetSource(sourceRaw: string) {
  return createHash("sha256").update(sourceRaw).digest("hex").slice(0, STYLE_SHEET_HASH_LENGTH);
}

export function getStyleSheetPath(cacheDir: string, locale: ActiveLocale, sourceHash: string) {
  return join(cacheDir, "style-sheets", `${locale}-${sourceHash}-v${STYLE_SHEET_PROMPT_VERSION}.json`);
}

/**
 * Unique `group="..."` values from `<Challenge>` openings, in source order.
 * Uses the same prop regex as quiz-parser so the overwrite after reassembly
 * sees identical source keys.
 */
export function extractChallengeGroups(source: string): string[] {
  const groups: string[] = [];
  const pieces = source.split(/^[ \t]*<Challenge\b/m).slice(1);
  for (const piece of pieces) {
    const propsEnd = piece.search(/<slot\b|<\/Challenge>/);
    const props = propsEnd === -1 ? piece : piece.slice(0, propsEnd);
    const group = props.match(/group="([^"]*)"/)?.[1];
    if (group != null && group.trim() !== "" && !groups.includes(group)) {
      groups.push(group);
    }
  }
  return groups;
}

export function buildStyleSheetPrompt(sourceRaw: string, locale: ActiveLocale, groups: string[]) {
  const language = LOCALE_LABELS[locale];
  const stable = [
    `You are preparing a translation style sheet for one technical article that will be translated into ${language} in many independent pieces (body chunks, frontmatter fields, quiz questions) by different translators.`,
    `Every translator will receive your sheet and must follow it exactly, so decide once and decide well.`,
    ``,
    `Return one JSON object with exactly these fields:`,
    `- register.addressForm: the single way to address the reader throughout, stated concretely in ${language} terms. For languages with a familiar/formal distinction (e.g. German du/Sie, French tu/vous, Spanish tú/usted, Italian tu/Lei, Russian ты/вы, Hindi तुम/आप, Chinese 你/您) name the pronoun; for Japanese name the politeness style (e.g. です/ます体 or だ/である体). Match the author's direct, conversational engineering voice.`,
    `- register.guidance: 1-3 sentences on tone and register in ${language} (how informal, how to carry jokes, sentence rhythm).`,
    `- terms: up to ${MAX_STYLE_SHEET_TERMS} entries {source, target, keepEnglish, note?} for the article's key technical terms, metric names, recurring coined phrases or running jokes, and product/component names that appear more than once or are central to the argument. Use the exact English wording from the article as source. target is the ONE ${language} rendering every translator must use. Set keepEnglish: true (and target equal to source) when ${language}-speaking engineers normally keep the English term. Use note only for a short disambiguation (e.g. "a metric, not general precision").`,
    `- challengeGroups: one {source, target} entry for EVERY quiz section name listed below, with source copied exactly and target a short natural ${language} label. Return an empty array when none are listed.`,
    ``,
    `Rules:`,
    `- Do not list code identifiers, API names, CLI commands, file paths, or anything in backticks: those always stay untranslated and need no entry.`,
    `- Prefer the established ${language} term used by practitioners over a literal coinage. Pick distinct targets for distinct concepts (never map two different metrics to the same word).`,
    `- Output raw JSON only. No markdown fences, no commentary.`,
  ].join("\n");

  const dynamic = [
    `QUIZ SECTION NAMES (<Challenge group="...">):`,
    groups.length === 0 ? `(none)` : groups.map((group) => `- ${JSON.stringify(group)}`).join("\n"),
    ``,
    `FULL ENGLISH SOURCE (frontmatter + body):`,
    `--- SOURCE START ---`,
    sourceRaw,
    `--- SOURCE END ---`,
  ].join("\n");

  return { stable, dynamic };
}

export function parseStyleSheetResponse(
  text: string,
  meta: { locale: ActiveLocale; sourceHash: string; model: string; sourceRaw: string; groups: string[]; createdAt?: string },
): StyleSheet {
  const jsonText = extractJsonObject(text);
  if (jsonText == null) {
    throw new Error("Style sheet response did not contain a JSON object.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    parsed = JSON.parse(jsonrepair(jsonText));
  }

  const validated = ModelResponseSchema.safeParse(parsed);
  if (!validated.success) {
    throw new Error(`Style sheet JSON validation failed: ${validated.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")}`);
  }

  const response = validated.data;
  const sourceLower = meta.sourceRaw.toLowerCase();
  const seen = new Set<string>();
  const terms: StyleSheetTerm[] = [];
  for (const term of response.terms) {
    const source = term.source.trim();
    const key = source.toLowerCase();
    const keepEnglish = term.keepEnglish === true;
    const target = keepEnglish ? source : (term.target ?? "").trim();
    // Drop invented, duplicate, and empty entries rather than failing the run.
    if (source === "" || target === "" || seen.has(key) || !sourceLower.includes(key)) continue;
    seen.add(key);
    const note = term.note?.trim();
    terms.push({ source, target, keepEnglish, ...(note ? { note } : {}) });
    if (terms.length >= MAX_STYLE_SHEET_TERMS) break;
  }

  const groupTargets = new Map<string, string>();
  for (const group of response.challengeGroups) {
    const target = (group.target ?? "").trim();
    if (target !== "") groupTargets.set(group.source.trim().toLowerCase(), target);
  }
  const missingGroups = meta.groups.filter((group) => !groupTargets.has(group.trim().toLowerCase()));
  if (missingGroups.length > 0) {
    throw new Error(`Style sheet is missing Challenge group translations for: ${missingGroups.map((group) => JSON.stringify(group)).join(", ")}`);
  }

  return StyleSheetSchema.parse({
    version: STYLE_SHEET_PROMPT_VERSION,
    locale: meta.locale,
    sourceHash: meta.sourceHash,
    model: meta.model,
    createdAt: meta.createdAt ?? new Date().toISOString(),
    register: {
      addressForm: response.register.addressForm.trim(),
      guidance: response.register.guidance.trim(),
    },
    terms,
    challengeGroups: meta.groups.map((source) => ({
      source,
      target: groupTargets.get(source.trim().toLowerCase())!,
    })),
  });
}

function readCachedStyleSheet(path: string, locale: ActiveLocale, sourceHash: string, groups: string[]) {
  if (!existsSync(path)) return undefined;
  try {
    const sheet = StyleSheetSchema.parse(JSON.parse(readFileSync(path, "utf8")));
    const mapped = new Set(sheet.challengeGroups.map((group) => group.source));
    const complete = groups.every((group) => mapped.has(group));
    if (sheet.version === STYLE_SHEET_PROMPT_VERSION && sheet.locale === locale && sheet.sourceHash === sourceHash && complete) {
      return sheet;
    }
    console.warn(`⚠️  Ignoring style sheet that does not match its cache key: ${path}`);
  } catch (error) {
    console.warn(`⚠️  Ignoring unreadable style sheet ${path}: ${error instanceof Error ? error.message : String(error)}`);
  }
  return undefined;
}

function serializeStyleSheet(sheet: StyleSheet) {
  return JSON.stringify(sheet, null, 2) + "\n";
}

function hashContents(contents: string) {
  return createHash("sha256").update(contents).digest("hex").slice(0, 12);
}

/**
 * Return the cached sheet for (source, locale, prompt version), generating and
 * writing it first when missing or when `refresh` is set. `call` is only
 * resolved when a generation is needed, so a cached sheet costs nothing.
 */
export async function loadOrCreateStyleSheet(options: {
  sourceRaw: string;
  locale: ActiveLocale;
  cacheDir: string;
  refresh?: boolean;
  call: () => StyleSheetModelCall;
}): Promise<{
  sheet: StyleSheet;
  path: string;
  hash: string;
  generated: boolean;
  telemetry?: TranslationTelemetry;
}> {
  const sourceHash = hashStyleSheetSource(options.sourceRaw);
  const path = getStyleSheetPath(options.cacheDir, options.locale, sourceHash);
  const groups = extractChallengeGroups(options.sourceRaw);

  if (options.refresh !== true) {
    const cached = readCachedStyleSheet(path, options.locale, sourceHash, groups);
    if (cached != null) {
      return { sheet: cached, path, hash: hashContents(readFileSync(path, "utf8")), generated: false };
    }
  }

  const call = options.call();
  const prompt = buildStyleSheetPrompt(options.sourceRaw, options.locale, groups);
  const start = performance.now();
  const result = await generateText({
    model: call.model,
    allowSystemInMessages: true,
    messages: [
      {
        role: "system",
        content: "You are a senior localization lead for technical writing. Respond with valid JSON only.",
      },
      cachedUserMessage(prompt.stable),
      plainUserMessage(prompt.dynamic),
    ],
    ...(call.temperature == null ? {} : { temperature: call.temperature }),
    maxOutputTokens: call.maxOutputTokens,
    timeout: { totalMs: call.timeoutMs },
    ...(call.providerOptions == null ? {} : { providerOptions: call.providerOptions }),
  });
  const durationMs = Math.round(performance.now() - start);
  assertGenerationNotTokenLimited("Style sheet generation", result, call.maxOutputTokens);

  const sheet = parseStyleSheetResponse(result.text, {
    locale: options.locale,
    sourceHash,
    model: call.modelId,
    sourceRaw: options.sourceRaw,
    groups,
  });
  const contents = serializeStyleSheet(sheet);
  mkdirSync(dirname(path), { recursive: true });
  // Write-then-rename so a concurrent reader never sees a half-written sheet.
  const tempPath = `${path}.${process.pid}.tmp`;
  writeFileSync(tempPath, contents, "utf8");
  renameSync(tempPath, path);

  return {
    sheet,
    path,
    hash: hashContents(contents),
    generated: true,
    telemetry: usageFromResult(result.usage, durationMs, result.providerMetadata, diagnosticsFromResult(result)),
  };
}

/** Binding prompt block; deterministic so it stays inside the cached prefix. */
export function renderStyleSheet(sheet: StyleSheet): string {
  const lines = [
    `ARTICLE STYLE SHEET (binding; shared by every chunk, frontmatter field, and quiz question of this article):`,
    `- Address the reader as: ${sheet.register.addressForm}. Use this address form throughout, from the first sentence to the last. Never switch.`,
    `- Register: ${sheet.register.guidance}`,
  ];

  if (sheet.terms.length > 0) {
    lines.push(`- Terminology: use EXACTLY these target terms whenever the source term (or an inflection of it) appears. Do not substitute synonyms or alternate renderings. Inflect the target only as grammar requires.`);
    for (const term of sheet.terms) {
      const rendering = term.keepEnglish ? `keep in English: ${JSON.stringify(term.source)}` : JSON.stringify(term.target);
      lines.push(`  - ${JSON.stringify(term.source)} → ${rendering}${term.note ? ` (${term.note})` : ""}`);
    }
  }

  if (sheet.challengeGroups.length > 0) {
    lines.push(`- Quiz section names (Challenge group): use exactly these labels.`);
    for (const group of sheet.challengeGroups) {
      lines.push(`  - ${JSON.stringify(group.source)} → ${JSON.stringify(group.target)}`);
    }
  }

  lines.push(`- Code, identifiers, API names, commands, and inline code stay untranslated regardless of this sheet.`);
  return lines.join("\n");
}

/**
 * Deterministically replace each translated Challenge `group` with the sheet's
 * target for its source group, so every section label is identical.
 */
export function applyStyleSheetChallengeGroups<T extends { group: string }>(
  sheet: StyleSheet,
  sourceChallenges: Array<{ group: string }>,
  translatedChallenges: T[],
): T[] {
  const targets = new Map(sheet.challengeGroups.map((group) => [group.source, group.target]));
  return translatedChallenges.map((challenge, index) => {
    const target = targets.get(sourceChallenges[index]?.group ?? "");
    return target == null ? challenge : { ...challenge, group: target };
  });
}

/**
 * Warn-only post-check: glossary terms that occur in the source but whose
 * target rendering never appears in the output. Inflecting languages can
 * produce false positives, so callers should log these, not fail on them.
 */
export function findUnusedStyleSheetTerms(sheet: StyleSheet, sourceText: string, outputText: string): StyleSheetTerm[] {
  const source = sourceText.toLowerCase();
  const output = outputText.toLocaleLowerCase();
  return sheet.terms.filter((term) => (
    source.includes(term.source.toLowerCase())
    && !output.includes(term.target.toLocaleLowerCase())
  ));
}

export function toStyleSheetRef(
  loaded: { sheet: StyleSheet; path: string; hash: string; generated: boolean },
  relativePath: (path: string) => string,
): StyleSheetRef {
  return {
    path: relativePath(loaded.path),
    hash: loaded.hash,
    sourceHash: loaded.sheet.sourceHash,
    version: loaded.sheet.version,
    model: loaded.sheet.model,
    generatedInRun: loaded.generated,
  };
}
