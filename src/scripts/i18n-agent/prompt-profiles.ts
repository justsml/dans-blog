import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { z } from "zod";
import { buildSystemPrompt } from "../i18n/prompts.ts";
import { ACTIVE_LOCALES, type ActiveLocale } from "../../shared/i18n.ts";
import { safeModelPathName } from "../i18n/translation-costs.ts";

export type PromptProfileStatus = "active" | "archived";

export type TranslationPromptTuning = {
  profileId?: string;
  version?: number;
  appendSystem?: string;
  appendCachedContext?: string;
  appendDynamic?: string;
  appendFrontmatter?: string;
  appendSummary?: string;
  appendQuizProse?: string;
};

export type TranslationPromptProfile = TranslationPromptTuning & {
  id: string;
  locale: ActiveLocale | "*";
  modelPattern: string;
  version: number;
  status: PromptProfileStatus;
  basedOn: "legacy-i18n-prompts";
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

const PromptProfileSchema = z.object({
  id: z.string().min(1),
  locale: z.union([z.enum(ACTIVE_LOCALES), z.literal("*")]),
  modelPattern: z.string().min(1),
  version: z.number().int().min(1),
  status: z.enum(["active", "archived"]),
  basedOn: z.literal("legacy-i18n-prompts"),
  notes: z.string().optional(),
  appendSystem: z.string().optional(),
  appendCachedContext: z.string().optional(),
  appendDynamic: z.string().optional(),
  appendFrontmatter: z.string().optional(),
  appendSummary: z.string().optional(),
  appendQuizProse: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const PromptProfilesFileSchema = z.object({
  profiles: z.array(PromptProfileSchema),
});

const defaultProfilesPath = join(process.cwd(), "src/scripts/i18n-agent/prompt-profiles.json");

export function listPromptProfiles(filters: {
  locale?: ActiveLocale | "*";
  model?: string;
  includeArchived?: boolean;
} = {}) {
  const registry = readPromptProfileRegistry();
  return registry.profiles.filter((profile) => {
    if (filters.includeArchived !== true && profile.status !== "active") return false;
    if (filters.locale != null && profile.locale !== "*" && profile.locale !== filters.locale) return false;
    if (filters.model != null && !modelMatches(profile.modelPattern, filters.model)) return false;
    return true;
  });
}

export function resolvePromptProfile({
  locale,
  model,
  profileId,
}: {
  locale: ActiveLocale;
  model: string;
  profileId?: string;
}): TranslationPromptProfile | undefined {
  const profiles = readPromptProfileRegistry().profiles;
  if (profileId != null && profileId.trim() !== "") {
    return profiles
      .filter((profile) => profile.id === profileId && profile.status === "active")
      .sort((a, b) => b.version - a.version)[0];
  }

  return profiles
    .filter((profile) => profile.status === "active")
    .filter((profile) => profile.locale === locale || profile.locale === "*")
    .filter((profile) => modelMatches(profile.modelPattern, model))
    .sort((a, b) => profileSpecificity(b, locale, model) - profileSpecificity(a, locale, model) || b.version - a.version)[0];
}

export function createPromptProfileVersion(input: {
  locale: ActiveLocale | "*";
  modelPattern: string;
  notes?: string;
  appendSystem?: string;
  appendCachedContext?: string;
  appendDynamic?: string;
  appendFrontmatter?: string;
  appendSummary?: string;
  appendQuizProse?: string;
  activate?: boolean;
}) {
  const registry = readPromptProfileRegistry();
  const locale = input.locale;
  const modelPattern = input.modelPattern.trim();
  if (modelPattern === "") throw new Error("modelPattern is required.");

  const id = promptProfileId(locale, modelPattern);
  const previous = registry.profiles
    .filter((profile) => profile.id === id)
    .sort((a, b) => b.version - a.version)[0];
  const now = new Date().toISOString();
  const activate = input.activate !== false;
  const profile: TranslationPromptProfile = {
    id,
    locale,
    modelPattern,
    version: (previous?.version ?? 0) + 1,
    status: activate ? "active" : "archived",
    basedOn: "legacy-i18n-prompts",
    notes: input.notes,
    appendSystem: emptyToUndefined(input.appendSystem),
    appendCachedContext: emptyToUndefined(input.appendCachedContext),
    appendDynamic: emptyToUndefined(input.appendDynamic),
    appendFrontmatter: emptyToUndefined(input.appendFrontmatter),
    appendSummary: emptyToUndefined(input.appendSummary),
    appendQuizProse: emptyToUndefined(input.appendQuizProse),
    createdAt: previous?.createdAt ?? now,
    updatedAt: now,
  };

  const updatedProfiles = registry.profiles.map((existing) => {
    if (!activate || existing.id !== id || existing.status !== "active") return existing;
    return { ...existing, status: "archived" as const, updatedAt: now };
  });
  updatedProfiles.push(profile);
  writePromptProfileRegistry({ profiles: updatedProfiles });
  return profile;
}

export function renderPromptProfilePreview(input: {
  locale: ActiveLocale;
  model: string;
  profileId?: string;
  isQuiz?: boolean;
}) {
  const profile = resolvePromptProfile(input);
  const legacySystemPrompt = buildSystemPrompt(input.locale, input.isQuiz ?? false);
  return {
    profile,
    base: {
      basedOn: "legacy-i18n-prompts",
      systemPrompt: legacySystemPrompt,
    },
    effective: {
      systemPrompt: joinPrompt(legacySystemPrompt, profile?.appendSystem),
      cachedContextAppend: profile?.appendCachedContext,
      dynamicAppend: profile?.appendDynamic,
      frontmatterAppend: profile?.appendFrontmatter,
      summaryAppend: profile?.appendSummary,
      quizProseAppend: profile?.appendQuizProse,
    },
  };
}

export function promptProfileToTuning(profile: TranslationPromptProfile | undefined): TranslationPromptTuning | undefined {
  if (profile == null) return undefined;
  return {
    profileId: profile.id,
    version: profile.version,
    appendSystem: profile.appendSystem,
    appendCachedContext: profile.appendCachedContext,
    appendDynamic: profile.appendDynamic,
    appendFrontmatter: profile.appendFrontmatter,
    appendSummary: profile.appendSummary,
    appendQuizProse: profile.appendQuizProse,
  };
}

export function joinPrompt(base: string, append: string | undefined, label = "PROMPT PROFILE TUNING") {
  if (append == null || append.trim() === "") return base;
  return [base.trim(), "", `${label}:`, append.trim()].join("\n");
}

function readPromptProfileRegistry() {
  const profilesPath = promptProfilesPath();
  if (!existsSync(profilesPath)) return { profiles: [] as TranslationPromptProfile[] };
  const parsed = PromptProfilesFileSchema.parse(JSON.parse(readFileSync(profilesPath, "utf8")));
  return { profiles: parsed.profiles as TranslationPromptProfile[] };
}

function writePromptProfileRegistry(registry: { profiles: TranslationPromptProfile[] }) {
  const profilesPath = promptProfilesPath();
  mkdirSync(dirname(profilesPath), { recursive: true });
  writeFileSync(profilesPath, `${JSON.stringify(registry, null, 2)}\n`, "utf8");
}

function promptProfilesPath() {
  return process.env.I18N_AGENT_PROMPT_PROFILES_PATH ?? defaultProfilesPath;
}

function promptProfileId(locale: ActiveLocale | "*", modelPattern: string) {
  return `${locale}-${safeModelPathName(modelPattern)}`;
}

function modelMatches(pattern: string, model: string) {
  if (pattern === "*" || pattern === "default") return true;
  const normalizedPattern = normalizeModelText(pattern);
  const normalizedModel = normalizeModelText(model);
  return normalizedModel === normalizedPattern
    || normalizedModel.includes(normalizedPattern)
    || normalizedModel.endsWith(`/${normalizedPattern}`);
}

function profileSpecificity(profile: TranslationPromptProfile, locale: ActiveLocale, model: string) {
  let score = 0;
  if (profile.locale === locale) score += 100;
  if (profile.modelPattern !== "*" && profile.modelPattern !== "default") score += 10;
  if (normalizeModelText(profile.modelPattern) === normalizeModelText(model)) score += 10;
  return score;
}

function normalizeModelText(value: string) {
  return value.trim().toLowerCase().replace(/^llm:\/\/openrouter\//, "").replace(/^openrouter\//, "");
}

function emptyToUndefined(value: string | undefined) {
  return value == null || value.trim() === "" ? undefined : value.trim();
}
