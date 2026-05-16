import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { ACTIVE_LOCALES, isActiveLocale, LOCALE_LABELS, type ActiveLocale } from "../../shared/i18n.ts";
import {
  collectSourcePosts,
  getPostPaths,
} from "../i18n/corpus-inventory.ts";
import { generateText } from "../i18n/braintrust.ts";
import { buildSystemPrompt } from "../i18n/prompts.ts";
import { usageFromResult } from "../i18n/llm-telemetry.ts";
import { createOpenRouterChatModel, resolveLlmConfig } from "../i18n/core/model-config.ts";
import { translateWithModel } from "../i18n/core/translate.ts";
import {
  reverseTranslation,
  scoreTranslation,
  scoreTranslationConsensus,
  type ScoreConsensusOutput,
} from "../i18n/core/score.ts";
import { validateTranslation } from "../i18n/core/validate.ts";
import { safeModelPathName } from "../i18n/translation-costs.ts";
import {
  createPromptProfileVersion,
  listPromptProfiles,
  promptProfileToTuning,
  type PromptProfileContentKind,
  renderPromptProfilePreview,
  resolvePromptProfile,
  type TranslationPromptProfile,
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
const promptProfileKindSchema = z.enum(["translation", "judge"]);
const promptProfileContentKindSchema = z.enum(["*", "article", "quiz"]);
const promptProfileSchema = z.object({
  id: z.string(),
  kind: promptProfileKindSchema,
  locale: z.union([z.enum(ACTIVE_LOCALES), z.literal("*")]),
  modelPattern: z.string(),
  contentKind: promptProfileContentKindSchema,
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
  confidence: z.enum(["low", "medium", "high"]),
  confidenceScore: z.number(),
  confidenceSignals: z.array(z.string()),
  issueCounts: z.object({
    high: z.number(),
    medium: z.number(),
    low: z.number(),
  }),
  suggestions: z.array(judgeSuggestionSchema),
  rationale: z.string(),
  rawText: z.string(),
  telemetry: telemetrySchema,
  cost: tokenCostSchema,
  roundLabel: z.string().optional(),
  promptProfile: z.object({
    id: z.string(),
    version: z.number().int(),
    notes: z.string().optional(),
  }).optional(),
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
    confidenceScore: z.number(),
    confidenceSignals: z.array(z.string()),
    issueCounts: z.object({
      high: z.number(),
      medium: z.number(),
      low: z.number(),
    }),
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
  promptProfiles: z.array(z.object({
    model: z.string(),
    id: z.string(),
    version: z.number().int(),
    notes: z.string().optional(),
  })).optional(),
});
const reverseTranslationIssueSchema = z.object({
  severity: z.enum(["low", "medium", "high"]),
  category: z.string(),
  message: z.string(),
  referenceExcerpt: z.string().optional(),
  reverseExcerpt: z.string().optional(),
  translatedExcerpt: z.string().optional(),
});
const reverseTranslationErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});
const reverseTranslationScoresSchema = z.object({
  similarity: z.number(),
  faithfulness: z.number(),
  coverage: z.number(),
  technicalFidelity: z.number(),
  structuralCorrespondence: z.number(),
});
const reverseTranslationOutputSchema = z.object({
  locale: z.enum(ACTIVE_LOCALES),
  model: z.string(),
  referenceCompared: z.boolean(),
  reverseTranslation: z.string(),
  similarityScore: z.number().nullable(),
  faithfulness: z.number().nullable(),
  scores: reverseTranslationScoresSchema.nullable(),
  issues: z.array(reverseTranslationIssueSchema),
  errors: z.array(reverseTranslationErrorSchema),
  confidence: z.enum(["low", "medium", "high"]),
  confidenceScore: z.number(),
  convergence: z.object({
    modelCount: z.number(),
    converged: z.boolean().nullable(),
    note: z.string(),
  }),
  interpretationNotes: z.array(z.string()),
  rationale: z.string(),
  rawText: z.object({
    reverse: z.string(),
    comparison: z.string().optional(),
  }),
  telemetry: telemetrySchema,
  cost: tokenCostSchema,
});
const validationOutputSchema = z.object({
  passed: z.boolean(),
  issues: z.array(z.object({
    code: z.string(),
    severity: z.enum(["high", "medium", "low"]),
    message: z.string(),
  })),
});
const consensusIterationSchema = z.object({
  iteration: z.number(),
  candidatePath: z.string(),
  overallScore: z.number(),
  publishReady: z.boolean(),
  appliedSuggestions: z.number(),
  skippedSuggestions: z.number(),
});
const refineConsensusOutputSchema = z.object({
  bestCandidatePath: z.string(),
  bestIteration: z.number(),
  bestOverallScore: z.number(),
  publishReady: z.boolean(),
  iterations: z.array(consensusIterationSchema),
});
const pathAdjustmentOutputSchema = z.object({
  contents: z.string(),
  adjusted: z.number(),
  references: z.array(z.object({
    from: z.string(),
    to: z.string(),
  })),
});
const svgTranslationOutputSchema = z.object({
  sourcePath: z.string(),
  targetPath: z.string(),
  written: z.boolean(),
  textNodes: z.number(),
  translatedTextNodes: z.number(),
  contents: z.string(),
  telemetry: telemetrySchema.optional(),
});
const mdxSvgTranslationOutputSchema = z.object({
  contents: z.string(),
  inlineSvgs: z.number(),
  fileSvgs: z.number(),
  translatedTextNodes: z.number(),
  writtenFiles: z.array(z.string()),
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
        const adjusted = preAdjustRelativeAssetPaths({
          sourcePath: paths.sourcePath,
          targetPath: paths.targetPath,
          contents,
        });
        mkdirSync(dirname(candidatePath), { recursive: true });
        writeFileSync(candidatePath, adjusted.contents, "utf8");
        writeJson(manifestPath, {
          runId: context.runId,
          slug,
          locale,
          model,
          sourcePath: sourcePath ?? relative(repoRoot, paths.sourcePath),
          targetPath: relative(repoRoot, paths.targetPath),
          latestCandidatePath: relative(repoRoot, candidatePath),
          notes: [
            notes,
            adjusted.adjusted > 0 ? `Pre-adjusted ${adjusted.adjusted} relative asset path(s).` : undefined,
          ].filter(Boolean).join(" "),
          updatedAt: new Date().toISOString(),
        });
        appendEvent(context.runId, {
          event: "candidate_written",
          slug,
          locale,
          model,
          candidatePath: relative(repoRoot, candidatePath),
          adjustedRelativePaths: adjusted.adjusted,
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
      description: "List active or archived translation or judge prompt profiles by locale/model/content kind.",
      inputSchema: z.object({
        kind: promptProfileKindSchema.optional(),
        locale: z.union([z.enum(ACTIVE_LOCALES), z.literal("*")]).optional(),
        model: z.string().optional(),
        contentKind: promptProfileContentKindSchema.optional(),
        includeArchived: z.boolean().optional(),
      }),
      outputSchema: z.object({
        profiles: z.array(promptProfileSchema),
      }),
      execute: async ({ kind, locale, model, contentKind, includeArchived }) => ({
        profiles: listPromptProfiles({ kind, locale, model, contentKind, includeArchived }),
      }),
    }),

    getPromptProfile: createTool({
      id: "getPromptProfile",
      description: "Preview the legacy base translation or judge prompt plus the active model/locale prompt tuning overlay.",
      inputSchema: z.object({
        kind: promptProfileKindSchema.optional(),
        locale: z.enum(ACTIVE_LOCALES),
        model: z.string().optional(),
        profileId: z.string().optional(),
        contentKind: promptProfileContentKindSchema.optional(),
        isQuiz: z.boolean().optional(),
      }),
      outputSchema: promptProfilePreviewSchema,
      execute: async ({ kind, locale, model, profileId, contentKind, isQuiz }) => renderPromptProfilePreview({
        kind,
        locale,
        model: model ?? context.defaultTranslationModel,
        profileId,
        contentKind,
        isQuiz,
      }),
    }),

    tuneTranslationPrompt: createTool({
      id: "tuneTranslationPrompt",
      description: "Create a new versioned prompt tuning profile for a locale/model pattern. Put stable reusable guidance in cached/frontmatter/summary fields and per-input instructions in dynamic/quiz-prose fields.",
      inputSchema: z.object({
        locale: z.union([z.enum(ACTIVE_LOCALES), z.literal("*")]),
        modelPattern: z.string(),
        contentKind: promptProfileContentKindSchema.optional(),
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
        const profile = createPromptProfileVersion({ ...input, kind: "translation" });
        appendEvent(context.runId, {
          event: "prompt_profile_version_created",
          profileId: profile.id,
          kind: profile.kind,
          version: profile.version,
          locale: profile.locale,
          modelPattern: profile.modelPattern,
          contentKind: profile.contentKind,
          status: profile.status,
        });
        return profile;
      },
    }),

    tuneJudgePrompt: createTool({
      id: "tuneJudgePrompt",
      description: "Create a new versioned judge/scoring prompt profile for a locale/model pattern. Put stable rubric and output-format guidance in cached fields and case-specific tactics in dynamic fields.",
      inputSchema: z.object({
        locale: z.union([z.enum(ACTIVE_LOCALES), z.literal("*")]),
        modelPattern: z.string(),
        contentKind: promptProfileContentKindSchema.optional(),
        notes: z.string().optional(),
        appendSystem: z.string().optional(),
        appendCachedContext: z.string().optional(),
        appendDynamic: z.string().optional(),
        activate: z.boolean().optional(),
      }),
      outputSchema: promptProfileSchema,
      execute: async (input) => {
        const profile = createPromptProfileVersion({ ...input, kind: "judge" });
        appendEvent(context.runId, {
          event: "prompt_profile_version_created",
          profileId: profile.id,
          kind: profile.kind,
          version: profile.version,
          locale: profile.locale,
          modelPattern: profile.modelPattern,
          contentKind: profile.contentKind,
          status: profile.status,
        });
        return profile;
      },
    }),

    preAdjustRelativePaths: createTool({
      id: "preAdjustRelativePaths",
      description: "Deterministically rewrite local asset references for a localized MDX file before validation or scoring.",
      inputSchema: z.object({
        slug: z.string(),
        locale: z.enum(ACTIVE_LOCALES),
        candidatePath: z.string().optional(),
        targetContents: z.string().optional(),
      }),
      outputSchema: pathAdjustmentOutputSchema,
      execute: async ({ slug, locale, candidatePath, targetContents }) => {
        const paths = getPostPaths(slug, locale);
        const contents = targetContents ?? readFileSync(assertReadablePath(candidatePath ?? latestCandidatePath(context.runId)), "utf8");
        const adjusted = preAdjustRelativeAssetPaths({
          sourcePath: paths.sourcePath,
          targetPath: paths.targetPath,
          contents,
        });
        appendEvent(context.runId, {
          event: "relative_paths_pre_adjusted",
          slug,
          locale,
          candidatePath,
          adjusted: adjusted.adjusted,
          references: adjusted.references,
        });
        return adjusted;
      },
    }),

    translateSvgText: createTool({
      id: "translateSvgText",
      description: "Translate reader-facing SVG text nodes from an SVG file or inline SVG contents using the source article as context. File SVGs keep the original filename when written to the locale folder.",
      inputSchema: z.object({
        slug: z.string(),
        locale: z.enum(ACTIVE_LOCALES),
        svgPath: z.string().optional(),
        svgContents: z.string().optional(),
        model: z.string().optional(),
        articleSummary: z.string().optional(),
        writeToLocale: z.boolean().optional(),
      }),
      outputSchema: svgTranslationOutputSchema,
      execute: async ({ slug, locale, svgPath, svgContents, model, articleSummary, writeToLocale = true }) => {
        const paths = getPostPaths(slug, locale);
        if (svgPath == null && svgContents == null) {
          throw new Error("Either svgPath or svgContents is required.");
        }
        const absoluteSvgPath = svgPath == null ? undefined : assertReadablePath(svgPath);
        const sourceContents = readFileSync(paths.sourcePath, "utf8");
        const sourceSvgContents = svgContents ?? readFileSync(absoluteSvgPath!, "utf8");
        const translated = await translateSvgContents({
          svgContents: sourceSvgContents,
          sourceContents,
          slug,
          locale,
          model: model ?? context.defaultTranslationModel,
          articleSummary,
        });
        const targetPath = absoluteSvgPath == null ? "" : join(dirname(paths.targetPath), basename(absoluteSvgPath));
        const shouldWrite = writeToLocale && !context.dryRun;
        if (shouldWrite && targetPath !== "") {
          mkdirSync(dirname(targetPath), { recursive: true });
          writeFileSync(targetPath, translated.contents, "utf8");
        }
        appendEvent(context.runId, {
          event: "svg_text_translated",
          slug,
          locale,
          model: translated.model,
          sourcePath: absoluteSvgPath == null ? "inline" : relative(repoRoot, absoluteSvgPath),
          targetPath: targetPath === "" ? "" : relative(repoRoot, targetPath),
          written: shouldWrite && targetPath !== "",
          textNodes: translated.textNodes,
          translatedTextNodes: translated.translatedTextNodes,
        });
        return {
          sourcePath: absoluteSvgPath == null ? "inline" : relative(repoRoot, absoluteSvgPath),
          targetPath: targetPath === "" ? "" : relative(repoRoot, targetPath),
          written: shouldWrite && targetPath !== "",
          textNodes: translated.textNodes,
          translatedTextNodes: translated.translatedTextNodes,
          contents: translated.contents,
          telemetry: translated.telemetry,
        };
      },
    }),

    translateMdxSvgs: createTool({
      id: "translateMdxSvgs",
      description: "Translate inline SVG blocks and referenced SVG image files in MDX; writes file SVGs to the locale folder with the original English filename and rewrites references to ./same-name.svg.",
      inputSchema: z.object({
        slug: z.string(),
        locale: z.enum(ACTIVE_LOCALES),
        candidatePath: z.string().optional(),
        targetContents: z.string().optional(),
        model: z.string().optional(),
        articleSummary: z.string().optional(),
        writeFiles: z.boolean().optional(),
      }),
      outputSchema: mdxSvgTranslationOutputSchema,
      execute: async ({ slug, locale, candidatePath, targetContents, model, articleSummary, writeFiles = true }) => {
        const paths = getPostPaths(slug, locale);
        const sourceContents = readFileSync(paths.sourcePath, "utf8");
        let contents = targetContents ?? readFileSync(assertReadablePath(candidatePath ?? latestCandidatePath(context.runId)), "utf8");
        let inlineSvgs = 0;
        let fileSvgs = 0;
        let translatedTextNodes = 0;
        const writtenFiles: string[] = [];

        for (const svgBlock of [...contents.matchAll(/<svg\b[\s\S]*?<\/svg>/gi)].map((match) => match[0])) {
          const translated = await translateSvgContents({
            svgContents: svgBlock,
            sourceContents,
            slug,
            locale,
            model: model ?? context.defaultTranslationModel,
            articleSummary,
          });
          if (translated.translatedTextNodes === 0) continue;
          contents = contents.replace(svgBlock, translated.contents);
          inlineSvgs += 1;
          translatedTextNodes += translated.translatedTextNodes;
        }

        for (const reference of findSvgFileReferences(contents)) {
          const svgPath = resolveReferencedPostAsset(paths.sourcePath, paths.targetPath, reference.url);
          if (svgPath == null) continue;
          const translated = await translateSvgContents({
            svgContents: readFileSync(svgPath, "utf8"),
            sourceContents,
            slug,
            locale,
            model: model ?? context.defaultTranslationModel,
            articleSummary,
          });
          if (translated.translatedTextNodes === 0) continue;
          const targetSvgPath = join(dirname(paths.targetPath), basename(svgPath));
          if (writeFiles && !context.dryRun) {
            mkdirSync(dirname(targetSvgPath), { recursive: true });
            writeFileSync(targetSvgPath, translated.contents, "utf8");
          }
          contents = contents.replace(reference.url, `./${basename(targetSvgPath)}`);
          fileSvgs += 1;
          translatedTextNodes += translated.translatedTextNodes;
          writtenFiles.push(relative(repoRoot, targetSvgPath));
        }

        appendEvent(context.runId, {
          event: "mdx_svgs_translated",
          slug,
          locale,
          inlineSvgs,
          fileSvgs,
          translatedTextNodes,
          writtenFiles,
        });
        return {
          contents,
          inlineSvgs,
          fileSvgs,
          translatedTextNodes,
          writtenFiles,
        };
      },
    }),

    scoreTranslation: createTool({
      id: "scoreTranslation",
      description: "Score a translation candidate or the current localized MDX file with the judge model. Uses active judge prompt profiles by locale/model unless disabled.",
      inputSchema: z.object({
        slug: z.string(),
        locale: z.enum(ACTIVE_LOCALES),
        candidatePath: z.string().optional(),
        targetContents: z.string().optional(),
        model: z.string().optional(),
        candidateId: z.string().optional(),
        current: z.boolean().optional(),
        promptProfileId: z.string().optional(),
        usePromptProfile: z.boolean().optional(),
        contentKind: promptProfileContentKindSchema.optional(),
      }),
      outputSchema: scoreTranslationOutputSchema,
      execute: async ({ slug, locale, candidatePath, targetContents, model, candidateId, promptProfileId, usePromptProfile, contentKind }) => {
        const paths = getPostPaths(slug, locale);
        const sourceContents = readFileSync(paths.sourcePath, "utf8");
        const scoredPath = candidatePath ?? existingTranslationPath(slug, locale) ?? latestCandidatePath(context.runId);
        const candidateContents = targetContents ?? readFileSync(assertReadablePath(scoredPath), "utf8");
        const selectedModel = model ?? context.defaultJudgeModel;
        const promptProfile = usePromptProfile === false
          ? undefined
          : resolvePromptProfile({
            kind: "judge",
            locale,
            model: selectedModel,
            profileId: promptProfileId,
            contentKind: contentKind ?? inferContentKind(sourceContents),
          });
        const score = await scoreTranslation({
          sourceContents,
          targetContents: candidateContents,
          locale,
          model: selectedModel,
          slug,
          targetRelPath: relative(repoRoot, paths.targetPath),
          candidateId: candidateId ?? scoredPath ?? "candidate",
          promptTuning: promptProfileToTuning(promptProfile),
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
          promptProfile: promptProfile == null ? undefined : promptProfileSummary(promptProfile, selectedModel),
          ...score,
        };
        appendJsonl(join(candidateRunDir(context.runId), "scores.jsonl"), record);
        appendJsonl(agentEvalHistoryPath(), { event: "score", ...record });
        return {
          ...score,
          promptProfile: promptProfile == null
            ? undefined
            : { id: promptProfile.id, version: promptProfile.version, notes: promptProfile.notes },
        };
      },
    }),

    scoreTranslationConsensus: createTool({
      id: "scoreTranslationConsensus",
      description: "Build judge consensus by sharing scores and suggestions between judge models, then escalate if disagreement remains. Uses per-model judge prompt profiles unless disabled.",
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
        promptProfileId: z.string().optional(),
        usePromptProfile: z.boolean().optional(),
        contentKind: promptProfileContentKindSchema.optional(),
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
        promptProfileId,
        usePromptProfile,
        contentKind,
      }) => {
        const paths = getPostPaths(slug, locale);
        const sourceContents = readFileSync(paths.sourcePath, "utf8");
        const scoredPath = candidatePath ?? existingTranslationPath(slug, locale) ?? latestCandidatePath(context.runId);
        const candidateContents = targetContents ?? readFileSync(assertReadablePath(scoredPath), "utf8");
        const judgeModels = models ?? context.defaultJudgeModels;
        const escalationJudgeModels = escalationModels ?? context.defaultEscalationJudgeModels;
        const promptProfiles = usePromptProfile === false
          ? []
          : resolveJudgePromptProfiles({
            locale,
            models: [...judgeModels, ...escalationJudgeModels],
            profileId: promptProfileId,
            contentKind: contentKind ?? inferContentKind(sourceContents),
          });
        const consensus = await scoreTranslationConsensus({
          sourceContents,
          targetContents: candidateContents,
          locale,
          slug,
          targetRelPath: relative(repoRoot, paths.targetPath),
          candidateId: candidateId ?? scoredPath ?? "candidate",
          models: judgeModels,
          escalationModels: escalationJudgeModels,
          reconsiderationRounds,
          disagreementThreshold,
          promptTuningByModel: promptTuningMap(promptProfiles),
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
          promptProfiles: promptProfiles.map(({ model, profile }) => promptProfileSummary(profile, model)),
          ...consensus,
        };
        appendJsonl(join(candidateRunDir(context.runId), "consensus-scores.jsonl"), record);
        appendJsonl(agentEvalHistoryPath(), { event: "consensus_score", ...record });
        appendConsensusMarkdown(context.runId, record);
        return {
          ...consensus,
          promptProfiles: promptProfiles.map(({ model, profile }) => ({
            model,
            id: profile.id,
            version: profile.version,
            notes: profile.notes,
          })),
        };
      },
    }),

    reverseTranslation: createTool({
      id: "reverseTranslation",
      description: "Reverse-translate localized MDX back into English and compare it with an English reference to diagnose possible fidelity loss. Low scores are diagnostic, not automatic failure; confirm low or surprising results with other models and prompt variants.",
      inputSchema: z.object({
        slug: z.string().optional(),
        locale: z.enum(ACTIVE_LOCALES),
        translatedPath: z.string().optional(),
        translatedContents: z.string().optional(),
        candidatePath: z.string().optional(),
        referencePath: z.string().optional(),
        referenceContents: z.string().optional(),
        model: z.string().optional(),
      }),
      outputSchema: reverseTranslationOutputSchema,
      execute: async ({
        slug,
        locale,
        translatedPath,
        translatedContents,
        candidatePath,
        referencePath,
        referenceContents,
        model,
      }) => {
        const translated = resolveReverseTranslatedInput({
          runId: context.runId,
          slug,
          locale,
          translatedPath,
          translatedContents,
          candidatePath,
        });
        const reference = resolveReverseReferenceInput({
          slug,
          locale,
          referencePath,
          referenceContents,
        });
        const selectedModel = model ?? context.defaultJudgeModel;
        const check = await reverseTranslation({
          locale,
          translatedInput: translated.input,
          referenceInput: reference?.input,
          model: selectedModel,
          translatedLabel: translated.label,
          referenceLabel: reference?.label,
        });
        const record = {
          at: new Date().toISOString(),
          runId: context.runId,
          slug,
          translatedPath: translated.path,
          referencePath: reference?.path,
          provenance: buildReverseTranslationProvenance({
            slug,
            locale,
            translatedContents: translated.contents,
            referenceContents: reference?.contents,
            translatedPath: translated.path,
            referencePath: reference?.path,
            reverseTranslation: check.reverseTranslation,
          }),
          ...check,
        };
        appendJsonl(join(candidateRunDir(context.runId), "reverse-translations.jsonl"), record);
        appendJsonl(agentEvalHistoryPath(), { event: "reverse_translation", ...record });
        appendEvent(context.runId, {
          event: "reverse_translation_check",
          slug,
          locale,
          model: check.model,
          translatedPath: translated.path,
          referencePath: reference?.path,
          similarityScore: check.similarityScore,
          faithfulness: check.faithfulness,
          issues: check.issues.length,
        });
        return check;
      },
    }),

    scoreCurrentTranslations: createTool({
      id: "scoreCurrentTranslations",
      description: "Score one or more existing localized MDX files already present in src/content/posts. Uses active judge prompt profiles unless disabled.",
      inputSchema: z.object({
        slug: z.string().optional(),
        locales: z.array(z.enum(ACTIVE_LOCALES)).optional(),
        model: z.string().optional(),
        limit: z.number().int().min(1).max(50).optional(),
        promptProfileId: z.string().optional(),
        usePromptProfile: z.boolean().optional(),
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
      execute: async ({ slug, locales, model, limit = 10, promptProfileId, usePromptProfile }) => {
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
            const selectedModel = model ?? context.defaultJudgeModel;
            const promptProfile = usePromptProfile === false
              ? undefined
              : resolvePromptProfile({
                kind: "judge",
                locale,
                model: selectedModel,
                profileId: promptProfileId,
                contentKind: inferContentKind(sourceContents),
              });
            const score = await scoreTranslation({
              sourceContents,
              targetContents,
              locale,
              model: selectedModel,
              slug: post.slug,
              targetRelPath: relative(repoRoot, targetPath),
              candidateId: `current:${post.slug}:${locale}`,
              promptTuning: promptProfileToTuning(promptProfile),
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
              promptProfile: promptProfile == null ? undefined : promptProfileSummary(promptProfile, selectedModel),
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

    refineCandidateWithConsensus: createTool({
      id: "refineCandidateWithConsensus",
      description: "Apply judge-consensus suggestions first, iterate scoring and exact suggestion replacements three times, and keep the highest averaged scoring candidate. Uses per-model judge prompt profiles unless disabled.",
      inputSchema: z.object({
        slug: z.string(),
        locale: z.enum(ACTIVE_LOCALES),
        candidatePath: z.string().optional(),
        targetContents: z.string().optional(),
        models: z.array(z.string()).min(1).optional(),
        escalationModels: z.array(z.string()).optional(),
        iterations: z.number().int().min(1).max(3).optional(),
        reconsiderationRounds: z.number().int().min(0).max(3).optional(),
        disagreementThreshold: z.number().int().min(1).max(50).optional(),
        promptProfileId: z.string().optional(),
        usePromptProfile: z.boolean().optional(),
        contentKind: promptProfileContentKindSchema.optional(),
      }),
      outputSchema: refineConsensusOutputSchema,
      execute: async ({
        slug,
        locale,
        candidatePath,
        targetContents,
        models,
        escalationModels,
        iterations = 3,
        reconsiderationRounds,
        disagreementThreshold,
        promptProfileId,
        usePromptProfile,
        contentKind,
      }) => {
        const paths = getPostPaths(slug, locale);
        const sourceContents = readFileSync(paths.sourcePath, "utf8");
        let currentContents = targetContents
          ?? readFileSync(assertReadablePath(candidatePath ?? latestCandidatePath(context.runId)), "utf8");
        const judgeModels = models ?? context.defaultJudgeModels;
        const escalationJudgeModels = escalationModels ?? context.defaultEscalationJudgeModels;
        const promptProfiles = usePromptProfile === false
          ? []
          : resolveJudgePromptProfiles({
            locale,
            models: [...judgeModels, ...escalationJudgeModels],
            profileId: promptProfileId,
            contentKind: contentKind ?? inferContentKind(sourceContents),
          });
        const iterationSummaries: z.infer<typeof consensusIterationSchema>[] = [];
        let best: {
          iteration: number;
          candidatePath: string;
          consensus: ScoreConsensusOutput;
        } | undefined;

        for (let iteration = 1; iteration <= iterations; iteration += 1) {
          const candidateId = `${slug}:${locale}:consensus-iteration-${iteration}`;
          const consensus = await scoreTranslationConsensus({
            sourceContents,
            targetContents: currentContents,
            locale,
            slug,
            targetRelPath: relative(repoRoot, paths.targetPath),
            candidateId,
            models: judgeModels,
            escalationModels: escalationJudgeModels,
            reconsiderationRounds,
            disagreementThreshold,
            promptTuningByModel: promptTuningMap(promptProfiles),
          });
          const candidatePathForIteration = consensusCandidateFilePath(context.runId, locale, iteration);
          mkdirSync(dirname(candidatePathForIteration), { recursive: true });
          writeFileSync(candidatePathForIteration, currentContents, "utf8");
          const relativeCandidatePath = relative(repoRoot, candidatePathForIteration);
          const record = {
            at: new Date().toISOString(),
            runId: context.runId,
            slug,
            locale,
            iteration,
            scoredPath: relativeCandidatePath,
            provenance: buildScoreProvenance({
              slug,
              locale,
              sourceContents,
              targetContents: currentContents,
              scoredPath: relativeCandidatePath,
              candidateId,
            }),
            promptProfiles: promptProfiles.map(({ model, profile }) => promptProfileSummary(profile, model)),
            ...consensus,
          };
          appendJsonl(join(candidateRunDir(context.runId), "consensus-scores.jsonl"), record);
          appendJsonl(agentEvalHistoryPath(), { event: "consensus_refinement_score", ...record });
          appendConsensusMarkdown(context.runId, record);

          const applied = applyConsensusSuggestions(currentContents, consensus, judgeModels.length);
          iterationSummaries.push({
            iteration,
            candidatePath: relativeCandidatePath,
            overallScore: consensus.consensus.overallScore,
            publishReady: consensus.consensus.publishReady,
            appliedSuggestions: applied.applied,
            skippedSuggestions: applied.skipped,
          });
          if (best == null || consensus.consensus.overallScore > best.consensus.consensus.overallScore) {
            best = {
              iteration,
              candidatePath: relativeCandidatePath,
              consensus,
            };
          }

          appendEvent(context.runId, {
            event: "consensus_refinement_iteration",
            slug,
            locale,
            iteration,
            candidatePath: relativeCandidatePath,
            overallScore: consensus.consensus.overallScore,
            publishReady: consensus.consensus.publishReady,
            appliedSuggestions: applied.applied,
            skippedSuggestions: applied.skipped,
          });
          currentContents = applied.contents;
        }

        if (best == null) throw new Error("Consensus refinement did not produce a candidate.");
        writeJson(join(candidateRunDir(context.runId), "manifest.json"), {
          runId: context.runId,
          slug,
          locale,
          model: "consensus-refinement",
          sourcePath: relative(repoRoot, paths.sourcePath),
          targetPath: relative(repoRoot, paths.targetPath),
          latestCandidatePath: best.candidatePath,
          notes: `Best of ${iterationSummaries.length} consensus refinement iteration(s) by averaged judge score.`,
          updatedAt: new Date().toISOString(),
        });
        appendEvent(context.runId, {
          event: "consensus_refinement_selected",
          slug,
          locale,
          candidatePath: best.candidatePath,
          iteration: best.iteration,
          overallScore: best.consensus.consensus.overallScore,
          publishReady: best.consensus.consensus.publishReady,
        });
        return {
          bestCandidatePath: best.candidatePath,
          bestIteration: best.iteration,
          bestOverallScore: best.consensus.consensus.overallScore,
          publishReady: best.consensus.consensus.publishReady,
          iterations: iterationSummaries,
        };
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

function inferContentKind(sourceContents: string): Exclude<PromptProfileContentKind, "*"> {
  try {
    const frontmatter = sourceContents.startsWith("---")
      ? sourceContents.slice(0, sourceContents.indexOf("\n---", 3) + 4)
      : "";
    if (/^category:\s*["']?Quiz["']?\s*$/m.test(frontmatter)) return "quiz";
  } catch {
    // Fall back to body sniffing below.
  }
  return sourceContents.includes("<Challenge") ? "quiz" : "article";
}

function resolveJudgePromptProfiles({
  locale,
  models,
  profileId,
  contentKind,
}: {
  locale: ActiveLocale;
  models: string[];
  profileId?: string;
  contentKind: PromptProfileContentKind;
}) {
  return models.flatMap((model) => {
    const profile = resolvePromptProfile({
      kind: "judge",
      locale,
      model,
      profileId,
      contentKind,
    });
    return profile == null ? [] : [{ model, profile }];
  });
}

function promptTuningMap(profiles: Array<{ model: string; profile: TranslationPromptProfile }>) {
  const map: Record<string, ReturnType<typeof promptProfileToTuning>> = {};
  for (const { model, profile } of profiles) {
    const tuning = promptProfileToTuning(profile);
    map[model] = tuning;
    try {
      const llmConfig = resolveLlmConfig(model);
      map[llmConfig.modelId] = tuning;
      map[llmConfig.mastraModel] = tuning;
      map[`openrouter/${llmConfig.modelId}`] = tuning;
    } catch {
      // Keep the caller-provided key; malformed model strings will fail in the scorer.
    }
  }
  return map;
}

function promptProfileSummary(profile: TranslationPromptProfile, model: string) {
  return {
    model,
    id: profile.id,
    kind: profile.kind,
    version: profile.version,
    locale: profile.locale,
    modelPattern: profile.modelPattern,
    contentKind: profile.contentKind,
    notes: profile.notes,
  };
}

function preAdjustRelativeAssetPaths({
  sourcePath,
  targetPath,
  contents,
}: {
  sourcePath: string;
  targetPath: string;
  contents: string;
}) {
  const sourceDir = dirname(sourcePath);
  const targetDir = dirname(targetPath);
  const postAssets = new Map(
    readdirSync(sourceDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && isAssetFilename(entry.name))
      .map((entry) => [entry.name, join(sourceDir, entry.name)]),
  );
  const localLocaleAssets = new Map(
    existsSync(targetDir)
      ? readdirSync(targetDir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && isAssetFilename(entry.name))
        .map((entry) => [entry.name, join(targetDir, entry.name)])
      : [],
  );
  const references: Array<{ from: string; to: string }> = [];
  const adjustedContents = contents.replace(
    /(?<prefix>]\(|src=["']|href=["']|:\s*|=["'])(?<url>(?:\.\.?\/)?[^"')\s]+?\.(?:avif|gif|jpe?g|png|svg|webp))(?<suffix>(?:\s+["'][^)]+)?\)|["']|(?=\s|$))/gim,
    (match, prefix: string, url: string, suffix: string) => {
      if (isExternalOrAbsoluteUrl(url)) return match;
      const filename = basename(url);
      const resolvedAsset = localLocaleAssets.get(filename) ?? postAssets.get(filename);
      if (resolvedAsset == null) return match;
      const nextUrl = toMdxRelativePath(relative(targetDir, resolvedAsset));
      if (url === nextUrl) return match;
      references.push({ from: url, to: nextUrl });
      return `${prefix}${nextUrl}${suffix}`;
    },
  );

  return {
    contents: adjustedContents,
    adjusted: references.length,
    references,
  };
}

function isAssetFilename(value: string) {
  return /\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(value);
}

function isExternalOrAbsoluteUrl(value: string) {
  return value.startsWith("/")
    || value.startsWith("#")
    || /^[a-z][a-z0-9+.-]*:/i.test(value);
}

function toMdxRelativePath(value: string) {
  const normalized = value.split(/[\\/]+/).join("/");
  return normalized.startsWith(".") ? normalized : `./${normalized}`;
}

function candidateRunDir(runId: string) {
  return join(candidateRunsRoot, safePathSegment(runId));
}

function candidateFilePath(runId: string, locale: ActiveLocale, model: string) {
  return join(candidateRunDir(runId), "candidates", locale, `${safeModelPathName(model)}.mdx`);
}

function consensusCandidateFilePath(runId: string, locale: ActiveLocale, iteration: number) {
  return join(candidateRunDir(runId), "candidates", locale, `consensus-iteration-${iteration}.mdx`);
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

function resolveReverseTranslatedInput({
  runId,
  slug,
  locale,
  translatedPath,
  translatedContents,
  candidatePath,
}: {
  runId: string;
  slug?: string;
  locale: ActiveLocale;
  translatedPath?: string;
  translatedContents?: string;
  candidatePath?: string;
}) {
  if (translatedContents != null) {
    return {
      input: Buffer.from(translatedContents),
      contents: translatedContents,
      path: undefined,
      label: "provided translatedContents",
    };
  }

  const path = translatedPath
    ?? candidatePath
    ?? (slug == null ? undefined : existingTranslationPath(slug, locale))
    ?? latestCandidatePath(runId);
  const absolutePath = assertReadablePath(path);
  const contents = readFileSync(absolutePath, "utf8");
  const relativePath = relative(repoRoot, absolutePath);
  return {
    input: absolutePath,
    contents,
    path: relativePath,
    label: relativePath,
  };
}

function resolveReverseReferenceInput({
  slug,
  locale,
  referencePath,
  referenceContents,
}: {
  slug?: string;
  locale: ActiveLocale;
  referencePath?: string;
  referenceContents?: string;
}) {
  if (referenceContents != null) {
    return {
      input: Buffer.from(referenceContents),
      contents: referenceContents,
      path: undefined,
      label: "provided referenceContents",
    };
  }

  const path = referencePath ?? (slug == null ? undefined : getPostPaths(slug, locale).sourcePath);
  if (path == null) return undefined;
  const absolutePath = assertReadablePath(path);
  const contents = readFileSync(absolutePath, "utf8");
  const relativePath = relative(repoRoot, absolutePath);
  return {
    input: absolutePath,
    contents,
    path: relativePath,
    label: relativePath,
  };
}

function buildReverseTranslationProvenance({
  slug,
  locale,
  translatedContents,
  referenceContents,
  translatedPath,
  referencePath,
  reverseTranslation,
}: {
  slug?: string;
  locale: ActiveLocale;
  translatedContents: string;
  referenceContents?: string;
  translatedPath?: string;
  referencePath?: string;
  reverseTranslation: string;
}) {
  return {
    slug,
    locale,
    repoHeadSha: gitOutput(["rev-parse", "HEAD"]),
    repoShortSha: gitOutput(["rev-parse", "--short", "HEAD"]),
    translatedSha256: sha256(translatedContents),
    referenceSha256: referenceContents == null ? undefined : sha256(referenceContents),
    reverseTranslationSha256: sha256(reverseTranslation),
    translatedPath,
    referencePath,
  };
}

function appendConsensusMarkdown(runId: string, record: Record<string, unknown>) {
  const consensus = record.consensus as {
    overallScore?: number;
    publishReady?: boolean;
    confidence?: string;
    confidenceScore?: number;
    confidenceSignals?: string[];
    issueCounts?: {
      high?: number;
      medium?: number;
      low?: number;
    };
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
    `- Confidence score: ${typeof consensus?.confidenceScore === "number" ? consensus.confidenceScore.toFixed(3) : "unknown"}`,
    `- Confidence signals: ${consensus?.confidenceSignals?.join("; ") ?? "unknown"}`,
    `- High/medium/low issue counts: ${consensus?.issueCounts == null
      ? "unknown"
      : `${consensus.issueCounts.high ?? 0}/${consensus.issueCounts.medium ?? 0}/${consensus.issueCounts.low ?? 0}`}`,
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

function applyConsensusSuggestions(
  contents: string,
  consensus: ScoreConsensusOutput,
  judgeModelCount: number,
) {
  const orderedSuggestions = [...consensus.consensus.suggestions]
    .filter((suggestion) => suggestion.priority === "high" || suggestion.priority === "medium")
    .sort((a, b) =>
      suggestionAgreementRank(b, judgeModelCount) - suggestionAgreementRank(a, judgeModelCount)
      || priorityRank(b.priority) - priorityRank(a.priority)
    );
  let nextContents = contents;
  let applied = 0;
  let skipped = 0;
  for (const suggestion of orderedSuggestions) {
    if (!nextContents.includes(suggestion.match)) {
      skipped += 1;
      continue;
    }
    nextContents = nextContents.replace(suggestion.match, suggestion.replacement);
    applied += 1;
  }
  return {
    contents: nextContents,
    applied,
    skipped,
  };
}

function suggestionAgreementRank(
  suggestion: ScoreConsensusOutput["consensus"]["suggestions"][number],
  judgeModelCount: number,
) {
  const supportingModels = suggestion.supportingModels.length;
  const requiredAgreement = judgeModelCount > 1 ? 2 : 1;
  return supportingModels >= requiredAgreement ? 100 + supportingModels : supportingModels;
}

function priorityRank(priority: "low" | "medium" | "high") {
  if (priority === "high") return 3;
  if (priority === "medium") return 2;
  return 1;
}

type SvgTextNode = {
  index: number;
  raw: string;
  inner: string;
  text: string;
};

function extractSvgTextNodes(svgContents: string): SvgTextNode[] {
  return [...svgContents.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/gi)]
    .map((match, index) => {
      const raw = match[0];
      const inner = match[1];
      const text = decodeXmlEntities(stripSvgInlineTags(inner).replace(/\s+/g, " ").trim());
      return { index, raw, inner, text };
    })
    .filter((node) => node.text !== "" && /[A-Za-z0-9\u00C0-\uFFFF]/.test(node.text));
}

function stripSvgInlineTags(value: string) {
  return value.replace(/<[^>]+>/g, "");
}

function parseSvgTranslationOutput(rawText: string) {
  const parsed = parseJsonObject(rawText) as { translations?: Array<{ index?: unknown; text?: unknown }> };
  const translations = new Map<number, string>();
  for (const item of parsed.translations ?? []) {
    if (typeof item.index !== "number" || typeof item.text !== "string") continue;
    const text = item.text.trim();
    if (text === "") continue;
    translations.set(item.index, text);
  }
  return translations;
}

async function translateSvgContents({
  svgContents,
  sourceContents,
  slug,
  locale,
  model,
  articleSummary,
}: {
  svgContents: string;
  sourceContents: string;
  slug: string;
  locale: ActiveLocale;
  model: string;
  articleSummary?: string;
}) {
  const textNodes = extractSvgTextNodes(svgContents);
  if (textNodes.length === 0) {
    return {
      contents: svgContents,
      textNodes: 0,
      translatedTextNodes: 0,
      model,
      telemetry: undefined,
    };
  }

  const llmConfig = resolveLlmConfig(model, {
    temperature: 0.1,
    maxTokens: 4_000,
  });
  const startedAt = performance.now();
  const result = await generateText({
    model: createOpenRouterChatModel(llmConfig),
    allowSystemInMessages: true,
    messages: [
      {
        role: "system",
        content: "You translate short SVG labels for technical article graphics. Return strict JSON only.",
      },
      {
        role: "user",
        content: [
          "Stable SVG translation contract:",
          buildSystemPrompt(locale, false),
          "Translate only reader-facing SVG text node values.",
          "Preserve product names, code identifiers, filenames, shell paths, URLs, and API names unless they are ordinary prose.",
          "Keep labels compact enough to fit in roughly the same SVG layout.",
          `Target language: ${LOCALE_LABELS[locale]}.`,
        ].join("\n"),
      },
      {
        role: "user",
        content: [
          `Article slug: ${slug}`,
          articleSummary ? `Article summary: ${articleSummary}` : `Article context excerpt:\n${articleContextExcerpt(sourceContents)}`,
          "Return JSON in this shape:",
          JSON.stringify({ translations: [{ index: 0, text: "translated text" }] }),
          "SVG text nodes:",
          JSON.stringify(textNodes.map((node) => ({ index: node.index, text: node.text })), null, 2),
        ].join("\n\n"),
      },
    ],
    temperature: llmConfig.temperature,
    maxOutputTokens: llmConfig.maxTokens,
    timeout: { totalMs: llmConfig.timeoutMs },
    providerOptions: llmConfig.providerOptions,
  });
  const telemetry = usageFromResult(result.usage, Math.round(performance.now() - startedAt), result.providerMetadata);
  const translations = parseSvgTranslationOutput(result.text);
  return {
    contents: applySvgTextTranslations(svgContents, textNodes, translations),
    textNodes: textNodes.length,
    translatedTextNodes: translations.size,
    model: llmConfig.modelId,
    telemetry,
  };
}

function findSvgFileReferences(contents: string) {
  const references: Array<{ url: string }> = [];
  for (const match of contents.matchAll(/!\[[^\]]*]\((?<url>[^)\s]+?\.svg)(?:\s+["'][^)]+)?\)/gi)) {
    if (match.groups?.url != null && !isExternalOrAbsoluteUrl(match.groups.url)) {
      references.push({ url: match.groups.url });
    }
  }
  for (const match of contents.matchAll(/\b(?:src|href)=["'](?<url>[^"']+?\.svg)["']/gi)) {
    if (match.groups?.url != null && !isExternalOrAbsoluteUrl(match.groups.url)) {
      references.push({ url: match.groups.url });
    }
  }
  return references;
}

function resolveReferencedPostAsset(sourcePath: string, targetPath: string, url: string) {
  const sourceDir = dirname(sourcePath);
  const targetDir = dirname(targetPath);
  const candidates = [
    resolve(targetDir, url),
    resolve(sourceDir, url.replace(/^(\.\.\/)+/, "")),
    join(sourceDir, basename(url)),
  ];
  return candidates.find((candidate) => existsSync(candidate) && isInside(candidate, sourceDir));
}

function parseJsonObject(rawText: string) {
  try {
    return JSON.parse(rawText);
  } catch {
    const fenced = rawText.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
    if (fenced != null) return JSON.parse(fenced);
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");
    if (start !== -1 && end > start) return JSON.parse(rawText.slice(start, end + 1));
    throw new Error("Model did not return a JSON object.");
  }
}

function applySvgTextTranslations(
  svgContents: string,
  textNodes: SvgTextNode[],
  translations: Map<number, string>,
) {
  let result = svgContents;
  for (const node of [...textNodes].reverse()) {
    const translation = translations.get(node.index);
    if (translation == null) continue;
    const translatedNode = node.raw.replace(node.inner, escapeXmlText(translation));
    result = replaceLast(result, node.raw, translatedNode);
  }
  return result;
}

function replaceLast(contents: string, search: string, replacement: string) {
  const index = contents.lastIndexOf(search);
  if (index === -1) return contents;
  return `${contents.slice(0, index)}${replacement}${contents.slice(index + search.length)}`;
}

function articleContextExcerpt(sourceContents: string) {
  return sourceContents
    .replace(/^---[\s\S]*?\n---/, "")
    .replace(/^import\s.+$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 2_500);
}

function decodeXmlEntities(value: string) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'");
}

function escapeXmlText(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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
