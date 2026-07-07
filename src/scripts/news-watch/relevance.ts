import type { CapturedItem, RelevanceResult } from "./types.ts";

type WeightedTerm = {
  term: string;
  weight: number;
};

const WEIGHTED_TERMS: WeightedTerm[] = [
  { term: "frontier model", weight: 0.22 },
  { term: "foundation model", weight: 0.18 },
  { term: "large language model", weight: 0.18 },
  { term: "local llm", weight: 0.22 },
  { term: "llama.cpp", weight: 0.2 },
  { term: "ollama", weight: 0.18 },
  { term: "vllm", weight: 0.18 },
  { term: "openai", weight: 0.18 },
  { term: "anthropic", weight: 0.18 },
  { term: "claude", weight: 0.16 },
  { term: "google deepmind", weight: 0.18 },
  { term: "gemini", weight: 0.14 },
  { term: "mistral", weight: 0.16 },
  { term: "deepseek", weight: 0.16 },
  { term: "qwen", weight: 0.16 },
  { term: "xai", weight: 0.14 },
  { term: "model router", weight: 0.2 },
  { term: "model routing", weight: 0.2 },
  { term: "agentic", weight: 0.22 },
  { term: "ai agent", weight: 0.22 },
  { term: "agents", weight: 0.1 },
  { term: "tool calling", weight: 0.18 },
  { term: "mcp", weight: 0.2 },
  { term: "rag", weight: 0.18 },
  { term: "retrieval augmented", weight: 0.18 },
  { term: "vector search", weight: 0.16 },
  { term: "inference", weight: 0.16 },
  { term: "quantization", weight: 0.18 },
  { term: "gpu", weight: 0.12 },
  { term: "efficiency", weight: 0.14 },
  { term: "evals", weight: 0.18 },
  { term: "prompt injection", weight: 0.18 },
  { term: "ai security", weight: 0.2 },
  { term: "coding assistant", weight: 0.16 },
  { term: "code generation", weight: 0.14 },
];

const CONTEXT_TERMS: WeightedTerm[] = [
  { term: "startup", weight: 0.06 },
  { term: "enterprise", weight: 0.06 },
  { term: "consulting", weight: 0.04 },
  { term: "developer", weight: 0.06 },
  { term: "software", weight: 0.06 },
  { term: "security", weight: 0.08 },
  { term: "workflow", weight: 0.06 },
  { term: "automation", weight: 0.06 },
  { term: "latency", weight: 0.06 },
  { term: "cost", weight: 0.06 },
];

export function scoreRelevance(item: CapturedItem): RelevanceResult {
  const haystack = normalize([
    item.title,
    item.summary,
    item.author,
    item.sourceName,
    item.canonicalUrl,
  ].filter(Boolean).join("\n"));

  const matchedTerms: string[] = [];
  const reasons: string[] = [];
  let score = 0;

  for (const weighted of WEIGHTED_TERMS) {
    if (!haystack.includes(normalize(weighted.term))) continue;
    matchedTerms.push(weighted.term);
    score += weighted.weight;
  }

  for (const weighted of CONTEXT_TERMS) {
    if (!haystack.includes(normalize(weighted.term))) continue;
    score += weighted.weight;
  }

  if (item.sourceKey.includes("local-llama")) {
    score += 0.16;
    reasons.push("specialty source: local LLM community");
  }

  if (item.sourceKey.includes("openai") || item.sourceKey.includes("machine-learning")) {
    score += 0.08;
    reasons.push("specialty source: AI/ML community");
  }

  if (matchedTerms.length > 0) {
    reasons.push(`matched terms: ${matchedTerms.slice(0, 8).join(", ")}`);
  }

  return {
    score: Math.min(1, Number(score.toFixed(3))),
    reasons,
    matchedTerms,
  };
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}
