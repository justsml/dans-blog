import { estimateTokenCost } from "./translation-costs.ts";
export const numberOrUnknown = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : undefined;
/** Langfuse usage buckets are disjoint. Totals must not repeat cached/reasoning tokens. */
export function accountUsage(
  model: string,
  usage: {
    input?: number;
    output?: number;
    cached?: number;
    cacheWrite?: number;
    reasoning?: number;
  },
  reportedCost?: number,
  basis = "provider-reported",
) {
  const details: Record<string, number> = {};
  const put = (k: string, v: number | undefined) => {
    if (v !== undefined) details[k] = v;
  };
  put(
    "input",
    usage.input === undefined
      ? undefined
      : Math.max(
          0,
          usage.input - (usage.cached ?? 0) - (usage.cacheWrite ?? 0),
        ),
  );
  put("input_cached", usage.cached);
  put("input_cache_write", usage.cacheWrite);
  put(
    "output",
    usage.output === undefined
      ? undefined
      : Math.max(0, usage.output - (usage.reasoning ?? 0)),
  );
  put("output_reasoning", usage.reasoning);
  let cost = numberOrUnknown(reportedCost),
    costBasis = cost === undefined ? "unknown" : basis,
    pricingSource: string | undefined;
  if (
    cost === undefined &&
    usage.input !== undefined &&
    usage.output !== undefined &&
    !usage.cacheWrite
  ) {
    const longContext =
      usage.input >= 272000 &&
      ["openai/gpt-6-sol", "openai/gpt-6-astra"].includes(model);
    const estimate = estimateTokenCost(
      model,
      usage.input * (longContext ? 2 : 1),
      usage.output * (longContext ? 1.5 : 1),
      (usage.cached ?? 0) * (longContext ? 2 : 1),
    );
    if (estimate.pricingSource !== "unknown") {
      cost = estimate.totalUsd;
      costBasis = "api-equivalent-estimate";
      pricingSource =
        estimate.pricingSource +
        (longContext ? ":272k-tier-verified-2026-09-24" : "");
    }
  }
  return {
    usageDetails: details,
    ...(cost !== undefined ? { costDetails: { total: cost } } : {}),
    metadata: {
      costBasis,
      costKnown: cost !== undefined,
      ...(pricingSource ? { pricingSource } : {}),
      billingNote:
        costBasis === "api-equivalent-estimate"
          ? "Token-price estimate, not subscription invoice allocation"
          : basis === "cli-reported-estimate"
            ? "CLI-reported API-equivalent cost, not subscription invoice allocation"
            : "Provider response cost when supplied",
    },
  };
}
export function sdkAccounting(event: {
  modelId: string;
  provider?: string;
  usage: any;
  providerMetadata?: any;
}) {
  const u = event.usage ?? {},
    r = event.providerMetadata?.openrouter?.usage;
  const accounting = accountUsage(
    event.modelId.includes("/")
      ? event.modelId
      : (event.provider?.split(".")[0] ?? "unknown") + "/" + event.modelId,
    {
      input: numberOrUnknown(u.inputTokens),
      output: numberOrUnknown(u.outputTokens),
      cached: numberOrUnknown(u.inputTokenDetails?.cacheReadTokens),
      cacheWrite: numberOrUnknown(u.inputTokenDetails?.cacheWriteTokens),
      reasoning: numberOrUnknown(u.outputTokenDetails?.reasoningTokens),
    },
    numberOrUnknown(r?.cost),
    "openrouter-reported",
  );
  const upstream = numberOrUnknown(
    r?.costDetails?.upstreamInferenceCost ??
      r?.cost_details?.upstream_inference_cost,
  );
  return {
    ...accounting,
    metadata: {
      ...accounting.metadata,
      ...(upstream !== undefined
        ? {
            upstreamInferenceCostUsd: upstream,
            upstreamCostNote:
              "Raw completion field may repeat gateway cost on non-BYOK routes. Verify is_byok via generation lookup; not a reconciled provider invoice.",
          }
        : {}),
    },
  };
}
