import { test, expect } from "bun:test";
import { nativeUsage } from "./langfuse.ts";
test("CLI costs and disjoint token buckets preserve unknowns and aggregate steps", () => {
  const claude = nativeUsage(
    "claude",
    JSON.stringify({
      usage: {
        input_tokens: 100,
        output_tokens: 20,
        cache_read_input_tokens: 50,
      },
      total_cost_usd: 0.02,
    }),
  );
  expect(claude.usageDetails).toEqual({
    input: 100,
    input_cached: 50,
    output: 20,
  });
  expect(claude.costDetails?.total).toBe(0.02);
  const codex = nativeUsage(
    "codex",
    "noise\n" +
      JSON.stringify({
        type: "turn.completed",
        usage: {
          input_tokens: 100,
          cached_input_tokens: 40,
          output_tokens: 10,
        },
      }),
    "openai/gpt-6-sol",
  );
  expect(codex.usageDetails).toEqual({
    input: 60,
    input_cached: 40,
    output: 10,
  });
  expect(codex.metadata.costBasis).toBe("api-equivalent-estimate");
  const event = JSON.stringify({
    type: "step_finish",
    part: {
      tokens: {
        input: 10,
        output: 8,
        reasoning: 2,
        cache: { read: 5, write: 0 },
      },
      cost: 0.01,
    },
  });
  const opencode = nativeUsage("opencode", event + "\n" + event);
  expect(opencode.costDetails?.total).toBe(0.02);
  expect(opencode.usageDetails).toEqual({
    input: 20,
    input_cached: 10,
    input_cache_write: 0,
    output: 16,
    output_reasoning: 4,
  });
  expect(
    nativeUsage("codex", "incomplete receipt").costDetails,
  ).toBeUndefined();
  expect(nativeUsage("claude", "{}").metadata.costKnown).toBe(false);
});

test("a missing step cost does not masquerade as a complete reported total", () => {
  const events = [
    {
      type: "step_finish",
      part: { tokens: { input: 10, output: 5 }, cost: 0.01 },
    },
    { type: "step_finish", part: { tokens: { input: 10, output: 5 } } },
  ];
  expect(
    nativeUsage("opencode", events.map((e) => JSON.stringify(e)).join("\n"))
      .costDetails,
  ).toBeUndefined();
});
