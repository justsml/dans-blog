import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { Agent } from "@mastra/core/agent";
import { Mastra } from "@mastra/core";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { resolveLlmConfig } from "../i18n/core/model-config.ts";
import { createTranslationAgentTools, type TranslationAgentToolContext } from "./tools.ts";

export type TranslationAgentRuntimeOptions = {
  threadId: string;
  resourceId: string;
  runId: string;
  dryRun: boolean;
  agentModel: string;
  translationModel: string;
  judgeModel: string;
  judgeModels: string[];
  escalationJudgeModels: string[];
};

export const DEFAULT_AGENT_MODEL =
  "llm://openrouter/google/gemini-3-flash-preview?temp=0.2&max=12000&cache=true";
export const DEFAULT_TRANSLATION_MODEL =
  "llm://openrouter/deepseek/deepseek-v4-flash?temp=0.15&max=16000&cache=true";
export const DEFAULT_JUDGE_MODEL =
  "llm://openrouter/google/gemini-3-flash-preview?temp=0&max=8000&cache=true";
export const DEFAULT_SECOND_JUDGE_MODEL =
  "llm://openrouter/deepseek/deepseek-v4-flash?temp=0&max=8000&cache=true";

export async function createTranslationAgentRuntime(options: TranslationAgentRuntimeOptions) {
  mkdirSync(join(process.cwd(), ".cache/i18n-agent"), { recursive: true });

  const agentModel = resolveLlmConfig(options.agentModel, {
    temperature: 0.2,
    reasoningEffort: "low",
    maxTokens: 12_000,
  });
  const storage = new LibSQLStore({
    id: "i18n-agent-storage",
    url: "file:.cache/i18n-agent/memory.db",
  });
  await storage.init();

  const toolContext: TranslationAgentToolContext = {
    runId: options.runId,
    dryRun: options.dryRun,
    defaultTranslationModel: options.translationModel,
    defaultJudgeModel: options.judgeModel,
    defaultJudgeModels: options.judgeModels.length > 0 ? options.judgeModels : [options.judgeModel],
    defaultEscalationJudgeModels: options.escalationJudgeModels,
  };
  const tools = createTranslationAgentTools(toolContext);
  const memory = new Memory({
    storage,
    options: {
      lastMessages: 20,
      workingMemory: {
        enabled: true,
        scope: "thread",
        template: [
          "# Translation Working Memory",
          "",
          "## Active Task",
          "- Slug:",
          "- Locale:",
          "- Candidate Run:",
          "- Current Candidate:",
          "- Open Questions:",
          "",
          "## Prompt Strategy",
          "- Translation Prompt Notes:",
          "- Judge Prompt Notes:",
          "- Validation Focus:",
          "",
          "## Locale Notes",
          "- Style/Tone:",
          "- Terms:",
          "- Known Pitfalls:",
          "",
          "## Model Notes",
          "- Agent Model:",
          "- Translation Model:",
          "- Judge Model:",
        ].join("\n"),
      },
      observationalMemory: {
        model: agentModel.mastraModel,
        scope: "resource",
        observation: {
          messageTokens: 12_000,
          instruction:
            "Track durable translation observations: per-locale style notes, model failure modes, judge complaints, prompt fixes, and validation gotchas. Ignore transient shell chatter.",
          modelSettings: {
            temperature: 0,
            maxOutputTokens: 2_000,
          },
        },
        reflection: {
          observationTokens: 36_000,
          instruction:
            "Condense observations into practical translation operating notes grouped by locale, model, prompt, and validation behavior.",
          modelSettings: {
            temperature: 0,
            maxOutputTokens: 3_000,
          },
        },
      },
    },
  });

  const translationAgent = new Agent({
    id: "translation-agent",
    name: "TranslationAgent",
    description: "Agentic i18n translator for DanLevy.net MDX posts.",
    model: agentModel.mastraModel,
    memory,
    tools,
    instructions: [
      "You are TranslationAgent, a local CLI agent for translating DanLevy.net MDX posts.",
      "Use tools instead of guessing file contents. Prefer listPosts before translating if the slug is ambiguous.",
      "All final translations must go through the candidate workflow: read source, translateWithModel, writeCandidate, validateTranslation, scoreTranslation, then promoteCandidate only when appropriate.",
      "For publish decisions, prefer scoreTranslationConsensus over a single scoreTranslation call. The consensus tool shares judge scores/suggestions across models, asks for critical reconsideration, and escalates unresolved disagreement when configured.",
      "When improving a judged candidate, use refineCandidateWithConsensus: it applies judge-agreed suggestions first, iterates up to three score/fix passes, and selects the highest averaged consensus score as the latest candidate.",
      "Before validation, scoring, or promotion, make local asset paths deterministic with writeCandidate's built-in pre-adjustment or the preAdjustRelativePaths tool; it resolves assets against the English post and locale target folder instead of trusting model-written ../ guesses.",
      "When an article graphic is an SVG with reader-facing text, use translateSvgText or translateMdxSvgs to localize labels with article context. Keep the original English SVG filename, write that same filename into the locale folder, and point localized MDX at ./same-name.svg.",
      "When asked to score current translations, use scoreCurrentTranslations or scoreTranslation against the existing localized MDX file; do not create a candidate first.",
      "Treat consensus publishReady=false seriously when any judge keeps high/medium concrete fixes; do not average away blocking MDX, quiz-answer, or terminology issues.",
      "Use eval-history and consensus summaries as the durable record of scores, costs, token usage, repo SHAs, and content hashes over time.",
      "When asked to tune prompts, keep the legacy i18n prompt as the base and create small versioned overlays with tuneTranslationPrompt, scoped by locale and model pattern.",
      "Keep prompt tuning cache-friendly: stable locale/model guidance belongs in cached prompt-profile fields; per-chunk text, current file paths, candidate ids, peer assessments, and one-off fixes belong in dynamic fields.",
      "Use getPromptProfile before changing prompt profiles when the user asks to inspect the effective prompt. Use listPromptProfiles to discover existing tuning.",
      "Never write final localized MDX with writeCandidate or readFile. promoteCandidate is the only final publish path.",
      "When dry-run is enabled, do not promote. Explain where candidate artifacts were written.",
      "Preserve MDX, code fences, imports, component prop names, URLs, asset path rules, quiz Challenge structure, and Dan's direct technical tone.",
      "Use recordNote when you learn a recurring locale/model/prompt/validation lesson.",
    ].join("\n"),
    defaultOptions: {
      maxSteps: 12,
      modelSettings: {
        temperature: agentModel.temperature,
        maxOutputTokens: agentModel.maxTokens,
      },
    },
  });

  const mastra = new Mastra({
    storage,
    agents: {
      translationAgent,
    },
  });

  return {
    mastra,
    translationAgent,
    memory,
    model: agentModel,
  };
}
