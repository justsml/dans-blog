export const CHEAP_FAST_TRANSLATION_MODELS = [
  "openrouter/qwen/qwen3.8-max",
  "openrouter/z-ai/glm-5.3-flash",
  "openrouter/deepseek/deepseek-v4-flash",
  "openrouter/openai/gpt-oss-120b:nitro",
  "openrouter/openai/gpt-5.6-luna",
  "openrouter/google/gemini-3.8-flash",
  "openrouter/google/gemini-3.5-flash-lite",
  "openrouter/deepseek/deepseek-v3.2",
  "openrouter/qwen/qwen3-32b:nitro",
  "openrouter/moonshotai/kimi-k2.5",
  "openrouter/moonshotai/kimi-k2.6",
  "openrouter/google/gemma-4-26b-a4b-it:nitro",
  "openrouter/google/gemma-4-31b-it:nitro",
  "openrouter/minimax/minimax-m2.5:nitro",
  "openrouter/minimax/minimax-m2.7",
  "openrouter/minimax/minimax-m2.5",
] as const;

export function resolveCheapFastTranslationModel(input: string) {
  const trimmed = input.trim();
  if (trimmed === "") return trimmed;

  const normalized = normalizeModelSearchText(trimmed);
  return CHEAP_FAST_TRANSLATION_MODELS.find((model) => {
    const normalizedModel = normalizeModelSearchText(model);
    const normalizedWithoutProvider = normalizeModelSearchText(model.replace(/^openrouter\//, ""));
    return normalizedModel.includes(normalized) || normalizedWithoutProvider.includes(normalized);
  }) ?? trimmed;
}

export function resolveCheapFastTranslationModels(inputs: string[]) {
  return inputs.map(resolveCheapFastTranslationModel);
}

function normalizeModelSearchText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^openrouter\//, "");
}
