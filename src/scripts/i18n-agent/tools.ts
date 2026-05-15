import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { ACTIVE_LOCALES, isActiveLocale, type ActiveLocale } from "../../shared/i18n.ts";
import {
  collectSourcePosts,
  getPostPaths,
} from "../i18n/corpus-inventory.ts";
import { translateWithModel } from "../i18n/core/translate.ts";
import { scoreTranslation, scoreTranslationConsensus } from "../i18n/core/score.ts";
import { validateTranslation } from "../i18n/core/validate.ts";
import { safeModelPathName } from "../i18n/translation-costs.ts";
import {
  createPromptProfileVersion,
  listPromptProfiles,
  promptProfileToTuning,
  renderPromptProfilePreview,
  resolvePromptProfile,
} from "./prompt-profiles.ts";

export type TranslationAgentToolContext = {
  runId: string;
  dryRun: boolean;
  defaultTranslationModel: string;
  defaultJudgeModel: string;
  defaultJudgeModels: string[];
  defaultEscalationJudgeModels: string[];
};

const repoRoot = process.cwd();
const agentReportsRoot = join(repoRoot, "reports/i18n-agent");
const candidateRunsRoot = join(agentReportsRoot, "runs");

const optionalNumber = z.number().optional();
const telemetrySchema = z.object({
  inputTokens: z.number(),
  outputTokens: z.number(),
  totalTokens: z.number(),
  reasoningTokens: z.number(),
  cacheReadTokens: z.number(),
  cacheWriteTokens: z.number(),
  durationMs: z.number(),
  finishReason: z.string().optional(),
  rawFinishReason: z.string().optional(),
  warnings: z.array(z.unknown()).optional(),
  providerCostUsd: optionalNumber,
  providerUpstreamCostUsd: optionalNumber,
  pricingSource: z.string().optional(),
  openRouterUsage: z.record(z.string(), z.unknown()).optional(),
});
const translationRunTelemetrySchema = z.object({
  model: z.string(),
  chunkSize: z.string(),
  totalChunks: z.number(),
  totalInputTokens: z.number(),
  totalOutputTokens: z.number(),
  totalReasoningTokens: z.number(),
  totalCacheReadTokens: z.number(),
  totalCacheWriteTokens: z.number(),
  providerCostUsd: optionalNumber,
  providerUpstreamCostUsd: optionalNumber,
  totalDurationMs: z.number(),
  totalCostUsd: z.number(),
  pricingSource: z.string(),
  chunks: z.array(telemetrySchema.extend({
    index: z.number(),
    label: z.string().optional(),
    costUsd: z.number(),
  })),
});
const tokenCostSchema = z.object({
  inputUsd: z.number(),
  outputUsd: z.number(),
  totalUsd: z.number(),
  pricingSource: z.string(),
  providerCostUsd: optionalNumber,
});
const promptProfileSchema = z.object({
  id: z.string(),
  locale: z.union([z.enum(ACTIVE_LOCALES), z.literal("*")]),
  modelPattern: z.string(),
  version: z.number().int(),
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
const promptProfilePreviewSchema = z.object({
  profile: promptProfileSchema.optional(),
  base: z.object({
    basedOn: z.literal("legacy-i18n-prompts"),
    systemPrompt: z.string(),
  }),
  effective: z.object({
    systemPrompt: z.string(),
    cachedContextAppend: z.string().optional(),
    dynamicAppend: z.string().optional(),
    frontmatterAppend: z.string().optional(),
    summaryAppend: z.string().optional(),
    quizProseAppend: z.string().optional(),
  }),
});
const translationScoreSchema = z.object({
  fidelity: z.number(),
  mdxPreservation: z.number(),
  localeQuality: z.number(),
  tone: z.number(),
  publishReadiness: z.number(),
});
const judgeScoreSchema = z.object({
  readability: z.number(),
  technicalAccuracy: z.number(),
  coherence: z.number(),
  relevance: z.number(),
  translationQuality: z.number(),
  mdxPreservation: z.number(),
  culturalAdaptation: z.number(),
  languagePurity: z.number(),
});
const judgeSuggestionSchema = z.object({
  priority: z.enum(["low", "medium", "high"]),
  match: z.string(),
  replacement: z.string(),
  reason: z.string(),
});
const scoreTranslationOutputSchema = z.object({
  candidateId: z.string(),
  model: z.string(),
  scores: translationScoreSchema,
  judgeScores: judgeScoreSchema.optional(),
  overallScore: z.number(),
  publishReady: z.boolean(),
  suggestions: z.array(judgeSuggestionSchema),
  rationale: z.string(),
  rawText: z.string(),
  telemetry: telemetrySchema,
  cost: tokenCostSchema,
  roundLabel: z.string().optional(),
});
const consensusOutputSchema = z.object({
  candidateId: z.string(),
  models: z.array(z.string()),
  escalationModels: z.array(z.string()),
  consensus: z.object({
    overallScore: z.number(),
    scores: translationScoreSchema,
    publishReady: z.boolean(),
    confidence: z.enum(["low", "medium", "high"]),
    rationale: z.string(),
    suggestions: z.array(judgeSuggestionSchema.extend({
      supportingModels: z.array(z.string()),
    })),
  }),
  escalated: z.boolean(),
  disagreement: z.object({
    scoreRange: z.number(),
    publishReadyDisagreement: z.boolean(),
    blockingSuggestionDisagreement: z.boolean(),
    uncertaintyDetected: z.boolean(),
    shouldEscalate: z.boolean(),
  }),
  assessments: z.array(scoreTranslationOutputSchema),
  totals: z.object({
    inputTokens: z.number(),
    outputTokens: z.number(),
    reasoningTokens: z.number(),
    totalTokens: z.number(),
    cacheReadTokens: z.number(),
    cacheWriteTokens: z.number(),
    durationMs: z.number(),
    costUsd: z.number(),
    providerCostUsd: optionalNumber,
    providerUpstreamCostUsd: optionalNumber,
  }),
});
const validationOutputSchema = z.object({
  passed: z.boolean(),
  issues: z.array(z.object({
    code: z.string(),
    severity: z.enum(["high", "medium", "low"]),
    message: z.string(),
  })),
});

export function createTranslationAgentTools(context: TranslationAgentToolContext) {
  return {
    listPosts: createTool({
      id: "listPosts",
      description: "List source posts by slug, title, or category and show existing locale folders.",
      inputSchema: z.object({
        query: z.string().optional(),
        limit: z.number().int().min(1).max(50).optional(),
      }),
      outputSchema: z.object({
        posts: z.array(z.object({
          slug: z.string(),
          directory: z.string(),
          title: z.string(),
          category: z.string(),
          locales: z.array(z.string()),
        })),
      }),
      execute: async ({ query, limit = 10 }) => {
        const normalized = query?.trim().toLowerCase();
        const posts = collectSourcePosts()
          .filter((post) => {
            if (!normalized) return true;
            return [
              post.slug,
              post.directory,
              post.title,
              post.category,
            ].some((value) => value.toLowerCase().includes(normalized));
          })
          .slice(0, limit)
          .map((post) => ({
            slug: post.slug,
            directory: post.directory,
            title: post.title,
            category: post.category,
            locales: existingLocales(post.postDir),
          }));
        return { posts };
      },
    }),

    readFile: createTool({
      id: "readFile",
      description: "Read a repo-scoped file relevant to translation work.",
      inputSchema: z.object({
        path: z.string(),
      }),
      outputSchema: z.object({
        path: z.string(),
        contents: z.string(),
      }),
      execute: async ({ path }) => {
        const absolutePath = assertReadablePath(path);
        return {
          path: relative(repoRoot, absolutePath),
          contents: readFileSync(absolutePath, "utf8"),
        };
      },
    }),

    writeCandidate: createTool({
      id: "writeCandidate",
      description: "Write a translated MDX candidate artifact for this agent run. This does not publish final localized MDX.",
      inputSchema: z.object({
        slug: z.string(),
        locale: z.enum(ACTIVE_LOCALES),
        model: z.string(),
        contents: z.string(),
        sourcePath: z.string().optional(),
        notes: z.string().optional(),
      }),
      outputSchema: z.object({
        candidatePath: z.string(),
        manifestPath: z.string(),
      }),
      execute: async ({ slug, locale, model, contents, sourcePath, notes }) => {
        const paths = getPostPaths(slug, locale);
        const candidatePath = candidateFilePath(context.runId, locale, model);
        const manifestPath = join(candidateRunDir(context.runId), "manifest.json");
        mkdirSync(dirname(candidatePath), { recursive: true });
        writeFileSync(candidatePath, contents, "utf8");
        writeJson(manifestPath, {
          runId: context.runId,
          slug,
          locale,
          model,
          sourcePath: sourcePath ?? relative(repoRoot, paths.sourcePath),
          targetPath: relative(repoRoot, paths.targetPath),
          latestCandidatePath: relative(repoRoot, candidatePath),
          notes,
          updatedAt: new Date().toISOString(),
        });
        appendEvent(context.runId, {
          event: "candidate_written",
          slug,
          locale,
          model,
          candidatePath: relative(repoRoot, candidatePath),
        });
        return {
          candidatePath: relative(repoRoot, candidatePath),
          manifestPath: relative(repoRoot, manifestPath),
        };
      },
    }),

    translateWithModel: createTool({
      id: "translateWithModel",
      description: "Translate a source post or provided MDX contents with the selected translation model. Uses active prompt profiles by locale/model unless disabled.",
      inputSchema: z.object({
        slug: z.string().optional(),
        sourceContents: z.string().optional(),
        locale: z.enum(ACTIVE_LOCALES),
        model: z.string().optional(),
        chunkSize: z.string().optional(),
        skipSummary: z.boolean().optional(),
        promptProfileId: z.string().optional(),
        usePromptProfile: z.boolean().optional(),
      }),
      outputSchema: z.object({
        contents: z.string(),
        body: z.string(),
        frontmatter: z.record(z.string(), z.unknown()),
        model: z.string(),
        locale: z.string(),
        isQuiz: z.boolean(),
        articleSummary: z.string(),
        telemetry: translationRunTelemetrySchema,
        promptProfile: z.object({
          id: z.string(),
          version: z.number().int(),
          notes: z.string().optional(),
        }).optional(),
      }),
      execute: async ({ slug, sourceContents, locale, model, chunkSize, skipSummary, promptProfileId, usePromptProfile }) => {
        const source = sourceContents ?? readSourceBySlug(slug);
        const selectedModel = model ?? context.defaultTranslationModel;
        const promptProfile = usePromptProfile === false
          ? undefined
          : resolvePromptProfile({ locale, model: selectedModel, profileId: promptProfileId });
        const result = await translateWithModel({
          sourceContents: source,
          locale,
          model: selectedModel,
          slug,
          chunkSize,
          skipSummary,
          promptTuning: promptProfileToTuning(promptProfile),
        });
        appendEvent(context.runId, {
          event: "translation_completed",
          slug,
          locale,
          model: result.model,
          promptProfile: promptProfile == null
            ? undefined
            : { id: promptProfile.id, version: promptProfile.version },
          inputTokens: result.telemetry.totalInputTokens,
          outputTokens: result.telemetry.totalOutputTokens,
          reasoningTokens: result.telemetry.totalReasoningTokens,
          cacheReadTokens: result.telemetry.totalCacheReadTokens,
          cacheWriteTokens: result.telemetry.totalCacheWriteTokens,
          durationMs: result.telemetry.totalDurationMs,
          providerCostUsd: result.telemetry.providerCostUsd,
          providerUpstreamCostUsd: result.telemetry.providerUpstreamCostUsd,
          costUsd: result.telemetry.totalCostUsd,
          pricingSource: result.telemetry.pricingSource,
        });
        return {
          ...result,
          promptProfile: promptProfile == null
            ? undefined
            : { id: promptProfile.id, version: promptProfile.version, notes: promptProfile.notes },
        };
      },
    }),

    listPromptProfiles: createTool({
      id: "listPromptProfiles",
      description: "List active or archived translation prompt profiles by locale/model.",
      inputSchema: z.object({
        locale: z.union([z.enum(ACTIVE_LOCALES), z.literal("*")]).optional(),
        model: z.string().optional(),
        includeArchived: z.boolean().optional(),
      }),
      outputSchema: z.object({
        profiles: z.array(promptProfileSchema),
      }),
      execute: async ({ locale, model, includeArchived }) => ({
        profiles: listPromptProfiles({ locale, model, includeArchived }),
      }),
    }),

    getPromptProfile: createTool({
      id: "getPromptProfile",
      description: "Preview the legacy base translation prompt plus the active model/locale prompt tuning overlay.",
      inputSchema: z.object({
        locale: z.enum(ACTIVE_LOCALES),
        model: z.string().optional(),
        profileId: z.string().optional(),
        isQuiz: z.boolean().optional(),
      }),
      outputSchema: promptProfilePreviewSchema,
      execute: async ({ locale, model, profileId, isQuiz }) => renderPromptProfilePreview({
        locale,
        model: model ?? context.defaultTranslationModel,
        profileId,
        isQuiz,
      }),
    }),

    tuneTranslationPrompt: createTool({
      id: "tuneTranslationPrompt",
      description: "Create a new versioned prompt tuning profile for a locale/model pattern. Put stable reusable guidance in cached/frontmatter/summary fields and per-input instructions in dynamic/quiz-prose fields.",
      inputSchema: z.object({
        locale: z.union([z.enum(ACTIVE_LOCALES), z.literal("*")]),
        modelPattern: z.string(),
        notes: z.string().optional(),
        appendSystem: z.string().optional(),
        appendCachedContext: z.string().optional(),
        appendDynamic: z.string().optional(),
        appendFrontmatter: z.string().optional(),
        appendSummary: z.string().optional(),
        appendQuizProse: z.string().optional(),
        activate: z.boolean().optional(),
      }),
      outputSchema: promptProfileSchema,
      execute: async (input) => {
        const profile = createPromptProfileVersion(input);
        appendEvent(context.runId, {
          event: "prompt_profile_version_created",
          profileId: profile.id,
          version: profile.version,
          locale: profile.locale,
          modelPattern: profile.modelPattern,
          status: profile.status,
        });
        return profile;
      },
    }),

    scoreTranslation: createTool({
      id: "scoreTranslation",
      description: "Score a translation candidate or the current localized MDX file with the judge model.",
      inputSchema: z.object({
        slug: z.string(),
        locale: z.enum(ACTIVE_LOCALES),
        candidatePath: z.string().optional(),
        targetContents: z.string().optional(),
        model: z.string().optional(),
        candidateId: z.string().optional(),
        current: z.boolean().optional(),
      }),
      outputSchema: scoreTranslationOutputSchema,
      execute: async ({ slug, locale, candidatePath, targetContents, model, candidateId }) => {
        const paths = getPostPaths(slug, locale);
        const sourceContents = readFileSync(paths.sourcePath, "utf8");
        const scoredPath = candidatePath ?? existingTranslationPath(slug, locale) ?? latestCandidatePath(context.runId);
        const candidateContents = targetContents ?? readFileSync(assertReadablePath(scoredPath), "utf8");
        const score = await scoreTranslation({
          sourceContents,
          targetContents: candidateContents,
          locale,
          model: model ?? context.defaultJudgeModel,
          slug,
          targetRelPath: relative(repoRoot, paths.targetPath),
          candidateId: candidateId ?? scoredPath ?? "candidate",
        });
        const record = {
          at: new Date().toISOString(),
          runId: context.runId,
          slug,
          locale,
          scoredPath: scoredPath == null ? undefined : relative(repoRoot, resolve(repoRoot, scoredPath)),
          provenance: buildScoreProvenance({
            slug,
            locale,
            sourceContents,
            targetContents: candidateContents,
            scoredPath,
            candidateId: candidateId ?? scoredPath ?? "candidate",
          }),
          ...score,
        };
        appendJsonl(join(candidateRunDir(context.runId), "scores.jsonl"), record);
        appendJsonl(agentEvalHistoryPath(), { event: "score", ...record });
        return score;
      },
    }),

    scoreTranslationConsensus: createTool({
      id: "scoreTranslationConsensus",
      description: "Build judge consensus by sharing scores and suggestions between judge models, then escalate if disagreement remains.",
      inputSchema: z.object({
        slug: z.string(),
        locale: z.enum(ACTIVE_LOCALES),
        candidatePath: z.string().optional(),
        targetContents: z.string().optional(),
        models: z.array(z.string()).min(1).optional(),
        escalationModels: z.array(z.string()).optional(),
        candidateId: z.string().optional(),
        reconsiderationRounds: z.number().int().min(0).max(3).optional(),
        disagreementThreshold: z.number().int().min(1).max(50).optional(),
      }),
      outputSchema: consensusOutputSchema,
      execute: async ({
        slug,
        locale,
        candidatePath,
        targetContents,
        models,
        escalationModels,
        candidateId,
        reconsiderationRounds,
        disagreementThreshold,
      }) => {
        const paths = getPostPaths(slug, locale);
        const sourceContents = readFileSync(paths.sourcePath, "utf8");
        const scoredPath = candidatePath ?? existingTranslationPath(slug, locale) ?? latestCandidatePath(context.runId);
        const candidateContents = targetContents ?? readFileSync(assertReadablePath(scoredPath), "utf8");
        const consensus = await scoreTranslationConsensus({
          sourceContents,
          targetContents: candidateContents,
          locale,
          slug,
          targetRelPath: relative(repoRoot, paths.targetPath),
          candidateId: candidateId ?? scoredPath ?? "candidate",
          models: models ?? context.defaultJudgeModels,
          escalationModels: escalationModels ?? context.defaultEscalationJudgeModels,
          reconsiderationRounds,
          disagreementThreshold,
        });
        const record = {
          at: new Date().toISOString(),
          runId: context.runId,
          slug,
          locale,
          scoredPath: scoredPath == null ? undefined : relative(repoRoot, resolve(repoRoot, scoredPath)),
          provenance: buildScoreProvenance({
            slug,
            locale,
            sourceContents,
            targetContents: candidateContents,
            scoredPath,
            candidateId: candidateId ?? scoredPath ?? "candidate",
          }),
          ...consensus,
        };
        appendJsonl(join(candidateRunDir(context.runId), "consensus-scores.jsonl"), record);
        appendJsonl(agentEvalHistoryPath(), { event: "consensus_score", ...record });
        appendConsensusMarkdown(context.runId, record);
        return consensus;
      },
    }),

    scoreCurrentTranslations: createTool({
      id: "scoreCurrentTranslations",
      description: "Score one or more existing localized MDX files already present in src/content/posts.",
      inputSchema: z.object({
        slug: z.string().optional(),
        locales: z.array(z.enum(ACTIVE_LOCALES)).optional(),
        model: z.string().optional(),
        limit: z.number().int().min(1).max(50).optional(),
      }),
      outputSchema: z.object({
        results: z.array(z.object({
          slug: z.string(),
          locale: z.string(),
          targetPath: z.string(),
          overallScore: z.number(),
          publishReady: z.boolean(),
          suggestions: z.number(),
        })),
        skipped: z.array(z.object({
          slug: z.string(),
          locale: z.string(),
          reason: z.string(),
        })),
      }),
      execute: async ({ slug, locales, model, limit = 10 }) => {
        const requestedLocales = locales ?? [...ACTIVE_LOCALES];
        const posts = collectSourcePosts()
          .filter((post) => slug == null || post.slug === slug || post.directory === slug)
          .slice(0, limit);
        const results: Array<{
          slug: string;
          locale: string;
          targetPath: string;
          overallScore: number;
          publishReady: boolean;
          suggestions: number;
        }> = [];
        const skipped: Array<{ slug: string; locale: string; reason: string }> = [];

        for (const post of posts) {
          for (const locale of requestedLocales) {
            const targetPath = existingTranslationPath(post.slug, locale);
            if (targetPath == null) {
              skipped.push({ slug: post.slug, locale, reason: "no current localized file" });
              continue;
            }

            const paths = getPostPaths(post.slug, locale);
            const sourceContents = readFileSync(paths.sourcePath, "utf8");
            const targetContents = readFileSync(targetPath, "utf8");
            const score = await scoreTranslation({
              sourceContents,
              targetContents,
              locale,
              model: model ?? context.defaultJudgeModel,
              slug: post.slug,
              targetRelPath: relative(repoRoot, targetPath),
              candidateId: `current:${post.slug}:${locale}`,
            });
            const record = {
              at: new Date().toISOString(),
              runId: context.runId,
              slug: post.slug,
              locale,
              scoredPath: relative(repoRoot, targetPath),
              source: "current",
              provenance: buildScoreProvenance({
                slug: post.slug,
                locale,
                sourceContents,
                targetContents,
                scoredPath: targetPath,
                candidateId: `current:${post.slug}:${locale}`,
              }),
              ...score,
            };
            appendJsonl(join(candidateRunDir(context.runId), "scores.jsonl"), record);
            appendJsonl(agentEvalHistoryPath(), { event: "score", ...record });
            results.push({
              slug: post.slug,
              locale,
              targetPath: relative(repoRoot, targetPath),
              overallScore: score.overallScore,
              publishReady: score.publishReady,
              suggestions: score.suggestions.length,
            });
          }
        }

        if (slug != null && posts.length === 0) {
          skipped.push({ slug, locale: requestedLocales.join(","), reason: "no matching source post" });
        }

        return { results, skipped };
      },
    }),

    validateTranslation: createTool({
      id: "validateTranslation",
      description: "Run structural and integrity checks against a translation candidate.",
      inputSchema: z.object({
        slug: z.string(),
        locale: z.enum(ACTIVE_LOCALES),
        candidatePath: z.string().optional(),
        targetContents: z.string().optional(),
      }),
      outputSchema: validationOutputSchema,
      execute: async ({ slug, locale, candidatePath, targetContents }) => {
        const paths = getPostPaths(slug, locale);
        const sourceContents = readFileSync(paths.sourcePath, "utf8");
        const candidateContents = targetContents ?? readFileSync(assertReadablePath(candidatePath ?? latestCandidatePath(context.runId)), "utf8");
        const result = validateTranslation({
          sourceContents,
          targetContents: candidateContents,
          targetPath: paths.targetPath,
          locale,
        });
        appendJsonl(join(candidateRunDir(context.runId), "validation.jsonl"), {
          at: new Date().toISOString(),
          slug,
          locale,
          candidatePath,
          ...result,
        });
        return result;
      },
    }),

    promoteCandidate: createTool({
      id: "promoteCandidate",
      description: "Publish a candidate artifact to the final localized MDX path. Disabled when --dry-run is set.",
      inputSchema: z.object({
        slug: z.string(),
        locale: z.enum(ACTIVE_LOCALES),
        candidatePath: z.string().optional(),
      }),
      outputSchema: z.object({
        promoted: z.boolean(),
        targetPath: z.string(),
        reason: z.string().optional(),
      }),
      execute: async ({ slug, locale, candidatePath }) => {
        const paths = getPostPaths(slug, locale);
        const targetPath = paths.targetPath;
        if (context.dryRun) {
          return {
            promoted: false,
            targetPath: relative(repoRoot, targetPath),
            reason: "dry-run is enabled",
          };
        }

        const resolvedCandidate = assertReadablePath(candidatePath ?? latestCandidatePath(context.runId));
        if (!isInside(resolvedCandidate, candidateRunDir(context.runId))) {
          throw new Error(`Refusing to promote a file outside this run: ${relative(repoRoot, resolvedCandidate)}`);
        }

        mkdirSync(dirname(targetPath), { recursive: true });
        writeFileSync(targetPath, readFileSync(resolvedCandidate, "utf8"), "utf8");
        appendEvent(context.runId, {
          event: "candidate_promoted",
          slug,
          locale,
          candidatePath: relative(repoRoot, resolvedCandidate),
          targetPath: relative(repoRoot, targetPath),
        });
        return {
          promoted: true,
          targetPath: relative(repoRoot, targetPath),
        };
      },
    }),

    recordNote: createTool({
      id: "recordNote",
      description: "Record an observational note about a locale, model, prompt, judge result, or validation behavior.",
      inputSchema: z.object({
        scope: z.enum(["locale", "model", "prompt", "judge", "validation", "general"]),
        note: z.string(),
        locale: z.enum(ACTIVE_LOCALES).optional(),
        model: z.string().optional(),
      }),
      outputSchema: z.object({
        notePath: z.string(),
      }),
      execute: async (input) => {
        const notePath = join(repoRoot, ".cache/i18n-agent/notes.jsonl");
        appendJsonl(notePath, {
          at: new Date().toISOString(),
          runId: context.runId,
          ...input,
        });
        return {
          notePath: relative(repoRoot, notePath),
        };
      },
    }),
  };
}

function existingLocales(postDir: string) {
  return readdirSync(postDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && isActiveLocale(entry.name))
    .map((entry) => entry.name);
}

function readSourceBySlug(slug: string | undefined) {
  if (slug == null || slug.trim() === "") {
    throw new Error("Either slug or sourceContents is required.");
  }
  const paths = getPostPaths(slug, "es");
  return readFileSync(paths.sourcePath, "utf8");
}

function existingTranslationPath(slug: string, locale: ActiveLocale) {
  const paths = getPostPaths(slug, locale);
  if (existsSync(paths.targetPath)) return paths.targetPath;
  if (existsSync(paths.fallbackTargetPath)) return paths.fallbackTargetPath;
  return undefined;
}

function candidateRunDir(runId: string) {
  return join(candidateRunsRoot, safePathSegment(runId));
}

function candidateFilePath(runId: string, locale: ActiveLocale, model: string) {
  return join(candidateRunDir(runId), "candidates", locale, `${safeModelPathName(model)}.mdx`);
}

function latestCandidatePath(runId: string) {
  const manifestPath = join(candidateRunDir(runId), "manifest.json");
  if (!existsSync(manifestPath)) throw new Error(`No candidate manifest found for run ${runId}.`);
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as { latestCandidatePath?: string };
  if (typeof manifest.latestCandidatePath !== "string") {
    throw new Error(`Candidate manifest for run ${runId} does not include latestCandidatePath.`);
  }
  return manifest.latestCandidatePath;
}

function assertReadablePath(path: string) {
  const absolutePath = resolve(repoRoot, path);
  const allowedRoots = [
    join(repoRoot, "src/content/posts"),
    join(repoRoot, "src/scripts/i18n"),
    join(repoRoot, "src/scripts/i18n-agent"),
    join(repoRoot, "reports/i18n"),
    agentReportsRoot,
  ];
  if (!allowedRoots.some((root) => isInside(absolutePath, root))) {
    throw new Error(`Path is outside allowed translation areas: ${path}`);
  }
  if (!existsSync(absolutePath)) {
    throw new Error(`File does not exist: ${path}`);
  }
  return absolutePath;
}

function isInside(path: string, root: string) {
  const relativePath = relative(resolve(root), resolve(path));
  return relativePath === "" || (!relativePath.startsWith("..") && !relativePath.startsWith("/"));
}

function writeJson(path: string, value: unknown) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function appendJsonl(path: string, value: unknown) {
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, `${JSON.stringify(value)}\n`, "utf8");
}

function appendEvent(runId: string, event: Record<string, unknown>) {
  appendJsonl(join(candidateRunDir(runId), "events.jsonl"), {
    at: new Date().toISOString(),
    runId,
    ...event,
  });
}

function agentEvalHistoryPath() {
  return join(agentReportsRoot, "eval-history.jsonl");
}

function buildScoreProvenance({
  slug,
  locale,
  sourceContents,
  targetContents,
  scoredPath,
  candidateId,
}: {
  slug: string;
  locale: ActiveLocale;
  sourceContents: string;
  targetContents: string;
  scoredPath?: string;
  candidateId?: string;
}) {
  return {
    slug,
    locale,
    candidateId,
    repoHeadSha: gitOutput(["rev-parse", "HEAD"]),
    repoShortSha: gitOutput(["rev-parse", "--short", "HEAD"]),
    sourceSha256: sha256(sourceContents),
    targetSha256: sha256(targetContents),
    scoredPath: scoredPath == null ? undefined : relative(repoRoot, resolve(repoRoot, scoredPath)),
  };
}

function appendConsensusMarkdown(runId: string, record: Record<string, unknown>) {
  const consensus = record.consensus as {
    overallScore?: number;
    publishReady?: boolean;
    confidence?: string;
    rationale?: string;
  } | undefined;
  const totals = record.totals as {
    inputTokens?: number;
    outputTokens?: number;
    reasoningTokens?: number;
    cacheReadTokens?: number;
    cacheWriteTokens?: number;
    costUsd?: number;
  } | undefined;
  const disagreement = record.disagreement as {
    scoreRange?: number;
    publishReadyDisagreement?: boolean;
    blockingSuggestionDisagreement?: boolean;
    uncertaintyDetected?: boolean;
  } | undefined;
  const summaryPath = join(
    candidateRunDir(runId),
    `consensus-${safePathSegment(String(record.slug ?? "unknown"))}-${safePathSegment(String(record.locale ?? "unknown"))}.md`,
  );
  writeFileSync(summaryPath, [
    "# Translation Judge Consensus",
    "",
    `- Slug: ${record.slug}`,
    `- Locale: ${record.locale}`,
    `- Overall score: ${consensus?.overallScore ?? "unknown"}`,
    `- Publish ready: ${consensus?.publishReady ?? "unknown"}`,
    `- Confidence: ${consensus?.confidence ?? "unknown"}`,
    `- Escalated: ${record.escalated ?? false}`,
    `- Score range: ${disagreement?.scoreRange ?? "unknown"}`,
    `- Publish-ready disagreement: ${disagreement?.publishReadyDisagreement ?? "unknown"}`,
    `- Blocking-suggestion disagreement: ${disagreement?.blockingSuggestionDisagreement ?? "unknown"}`,
    `- Uncertainty detected: ${disagreement?.uncertaintyDetected ?? "unknown"}`,
    `- Input tokens: ${totals?.inputTokens ?? 0}`,
    `- Output tokens: ${totals?.outputTokens ?? 0}`,
    `- Reasoning tokens: ${totals?.reasoningTokens ?? 0}`,
    `- Cache read tokens: ${totals?.cacheReadTokens ?? 0}`,
    `- Cache write tokens: ${totals?.cacheWriteTokens ?? 0}`,
    `- Cost USD: ${typeof totals?.costUsd === "number" ? totals.costUsd.toFixed(6) : "unknown"}`,
    "",
    consensus?.rationale ?? "",
  ].join("\n"));
}

function sha256(contents: string) {
  return createHash("sha256").update(contents).digest("hex");
}

function gitOutput(args: string[]) {
  try {
    return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();
  } catch {
    return undefined;
  }
}

function safePathSegment(value: string) {
  return value.replace(/[^a-z0-9._-]+/gi, "-");
}
