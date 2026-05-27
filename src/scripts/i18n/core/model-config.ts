import { createOpenRouter, type OpenRouterProviderSettings } from "@openrouter/ai-sdk-provider";
import type { ProviderOptions } from "@ai-sdk/provider-utils";
import { parse as parseLlmString, normalize, validate } from "llm-strings";
import { createAiSdkProviderOptions } from "llm-strings/ai-sdk";
import type { LanguageModel } from "ai";
import { OPENROUTER_USAGE_ACCOUNTING } from "../llm-telemetry.ts";

export type OpenRouterProviderOptions = ProviderOptions & {
  openrouter: {
    reasoning: {
      effort: string;
      max_tokens?: number;
      exclude?: boolean;
    };
  };
};

export type ResolvedLlmConfig = {
  source: string;
  provider: string | undefined;
  modelId: string;
  mastraModel: string;
  providerSettings: OpenRouterProviderSettings;
  providerOptions: OpenRouterProviderOptions;
  reasoningEffort: string;
  temperature: number;
  maxTokens: number;
  timeoutMs: number;
};

const DEFAULT_REASONING_EFFORT = "low";
const DEFAULT_TIMEOUT_MS = 200_000;

export function resolveLlmConfig(
  input: string,
  defaults: {
    temperature?: number;
    maxTokens?: number;
    timeoutMs?: number;
    reasoningEffort?: string;
  } = {},
): ResolvedLlmConfig {
  const source = input.trim();
  if (source === "") throw new Error("Model config cannot be empty.");

  if (!source.startsWith("llm://")) {
    const modelId = source.replace(/^openrouter\//, "");
    const reasoningEffort = defaults.reasoningEffort ?? DEFAULT_REASONING_EFFORT;
    return {
      source,
      provider: "openrouter",
      modelId,
      mastraModel: `openrouter/${modelId}`,
      providerSettings: {},
      providerOptions: {
        openrouter: {
          reasoning: {
            effort: reasoningEffort,
            exclude: shouldExcludeReasoning(modelId),
          },
        },
      } as OpenRouterProviderOptions,
      reasoningEffort,
      temperature: defaults.temperature ?? defaultTemperatureForModel(modelId),
      maxTokens: defaults.maxTokens ?? 16_000,
      timeoutMs: defaults.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    };
  }

  const issues = validate(source);
  const blockingIssues = issues.filter((issue) => issue.severity === "error");
  if (blockingIssues.length > 0) {
    throw new Error(
      [
        `Invalid LLM connection string: ${source}`,
        ...blockingIssues.map((issue) => `- ${issue.param ?? "config"}: ${issue.message}`),
      ].join("\n"),
    );
  }

  const parsed = parseLlmString(source);
  const normalized = normalize(parsed);
  const params = normalized.config.params;
  const aiSdkOptions = createAiSdkProviderOptions(normalized);
  const provider = aiSdkOptions.provider;
  const host = normalized.config.host;
  const modelId = normalized.config.model.replace(/^openrouter\//, "");
  const reasoningEffort = stringParam(params, ["reasoning_effort", "reasoningEffort", "effort"])
    ?? defaults.reasoningEffort
    ?? DEFAULT_REASONING_EFFORT;

  const providerOptions = {
    ...aiSdkOptions.providerOptions,
    openrouter: {
      ...(aiSdkOptions.providerOptions.openrouter ?? {}),
      reasoning: {
        ...((aiSdkOptions.providerOptions.openrouter?.reasoning as Record<string, unknown> | undefined) ?? {}),
        effort: reasoningEffort,
        exclude: booleanParam(params, ["reasoning_exclude", "reasoningExclude"], shouldExcludeReasoning(modelId)),
      },
    },
  } as OpenRouterProviderOptions;

  return {
    source,
    provider,
    modelId,
    mastraModel: provider === "openrouter" ? `openrouter/${modelId}` : `${provider ?? "openrouter"}/${modelId}`,
    providerSettings: {
      apiKey: normalized.config.apiKey,
      baseURL: openRouterBaseUrl(host),
    },
    providerOptions,
    reasoningEffort,
    temperature: numberParam(params, ["temperature", "temp"], defaults.temperature ?? defaultTemperatureForModel(modelId)),
    maxTokens: numberParam(
      params,
      ["max_tokens", "maxOutputTokens", "maxTokens", "max_completion_tokens", "max"],
      defaults.maxTokens ?? 16_000,
    ),
    timeoutMs: numberParam(params, ["timeout_ms", "timeoutMs", "timeout"], defaults.timeoutMs ?? DEFAULT_TIMEOUT_MS),
  };
}

function defaultTemperatureForModel(modelId: string) {
  const normalized = modelId.replace(/^openrouter\//, "");
  return normalized.includes("gpt-oss") ? 0.1 : 0.3;
}

function shouldExcludeReasoning(modelId: string) {
  const normalized = modelId.replace(/^openrouter\//, "");
  return (
    normalized.includes("gpt-oss")
    || normalized.includes("qwen")
    || normalized.includes("deepseek")
    || normalized.includes("glm")
    || normalized.includes("gemini-3")
  );
}

function openRouterBaseUrl(host: string | undefined) {
  if (host == null || host === "" || host === "openrouter.ai") return undefined;
  if (host === "openrouter.ai/api/v1") return undefined;
  return `https://${host}`;
}

export function createOpenRouterChatModel(config: ResolvedLlmConfig): LanguageModel {
  const provider = createOpenRouter(config.providerSettings);
  return provider.chat(config.modelId, OPENROUTER_USAGE_ACCOUNTING);
}

function stringParam(params: Record<string, string>, keys: string[]) {
  for (const key of keys) {
    const value = params[key];
    if (typeof value === "string" && value.trim() !== "") return value.trim();
  }
  return undefined;
}

function numberParam(params: Record<string, string>, keys: string[], fallback: number) {
  for (const key of keys) {
    const value = params[key];
    if (value == null) continue;
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function booleanParam(params: Record<string, string>, keys: string[], fallback: boolean) {
  for (const key of keys) {
    const value = params[key];
    if (value == null) continue;
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "yes"].includes(normalized)) return true;
    if (["false", "0", "no"].includes(normalized)) return false;
  }
  return fallback;
}
