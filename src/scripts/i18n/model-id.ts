const OPENROUTER_MODEL_OWNERS = new Set([
  "anthropic",
  "cohere",
  "deepseek",
  "google",
  "meta-llama",
  "microsoft",
  "minimax",
  "mistralai",
  "moonshotai",
  "openai",
  "qwen",
  "x-ai",
  "z-ai",
]);

const NON_MODEL_LABELS = new Set([
  "",
  "candidate/run/events",
  "candidate/run/events.jsonl",
  "candidate/run/history",
  "candidate/run/history.jsonl",
  "candidate/run/summary",
  "candidate/run/summary.json",
  "candidate/shortfall",
  "candidates",
  "candidates.jsonl",
  "cases",
  "cases.jsonl",
  "final",
  "final/polish",
  "final/quality/score",
  "judge",
  "judge.json",
  "judge/escalation",
  "judge/second",
  "judge/suggestions",
  "judge/suggestions.jsonl",
  "manual",
  "n/a",
  "n/a (human review)",
  "none",
  "run",
  "run.jsonl",
  "shortfall",
  "summary",
  "unknown",
]);

export function normalizeModelId(modelId: string) {
  const trimmed = modelId.trim();
  if (trimmed === "") return "";

  const fromLlmString = parseLlmModel(trimmed);
  let normalized = (fromLlmString ?? trimmed)
    .replace(/^@/, "")
    .replace(/^openrouter\/openrouter\//, "openrouter/")
    .replace(/\/+$/, "");

  if (normalized.startsWith("current/")) return normalized;
  if (normalized.startsWith("openrouter/")) return normalized;
  if (normalized.startsWith("openai/") && normalized.match(/^openai\/gpt-[45]/)) return normalized;

  const owner = normalized.split("/", 1)[0];
  if (OPENROUTER_MODEL_OWNERS.has(owner)) return `openrouter/${normalized}`;

  return normalized;
}

export function modelIdsMatch(left: string, right: string) {
  const leftNormalized = normalizeModelId(left);
  const rightNormalized = normalizeModelId(right);
  if (leftNormalized === rightNormalized) return true;
  return stripOpenRouterPrefix(leftNormalized) === stripOpenRouterPrefix(rightNormalized);
}

export function isTrackableModelId(modelId: string | undefined) {
  if (modelId == null) return false;
  const normalized = normalizeModelId(modelId);
  const lower = normalized.toLowerCase();
  if (NON_MODEL_LABELS.has(lower)) return false;
  if (lower.startsWith("candidate/")) return false;
  if (lower.startsWith("judge/")) return false;
  if (lower.startsWith("final/")) return false;
  if (lower.includes(".json")) return false;
  if (lower.includes(".jsonl")) return false;
  if (lower.endsWith(".md")) return false;
  return normalized.includes("/") && !normalized.includes(" ");
}

function stripOpenRouterPrefix(modelId: string) {
  return modelId.replace(/^openrouter\//, "");
}

function parseLlmModel(modelId: string) {
  if (!modelId.startsWith("llm://")) return undefined;

  const withoutScheme = modelId.slice("llm://".length);
  const withoutQuery = withoutScheme.split(/[?#]/, 1)[0] ?? "";
  const pathParts = withoutQuery.split("/").filter(Boolean);
  if (pathParts.length < 2) return undefined;

  const [providerOrHost, ...modelParts] = pathParts;
  if (providerOrHost === "openrouter" || providerOrHost === "openrouter.ai") {
    return `openrouter/${modelParts.join("/")}`;
  }

  return `${providerOrHost}/${modelParts.join("/")}`;
}
