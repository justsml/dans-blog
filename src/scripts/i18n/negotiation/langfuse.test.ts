import { test, expect } from "bun:test";
import { nativeUsage } from "./langfuse.ts";
test("native CLI telemetry keeps actual counters and reported cost without guessing", () => {
  expect(
    nativeUsage(
      "claude",
      JSON.stringify({
        usage: {
          input_tokens: 100,
          output_tokens: 20,
          cache_read_input_tokens: 50,
        },
        total_cost_usd: 0.02,
      }),
    ),
  ).toEqual({
    usageDetails: {
      input_tokens: 100,
      output_tokens: 20,
      cache_read_input_tokens: 50,
    },
    costDetails: { total: 0.02 },
  });
  expect(
    nativeUsage(
      "codex",
      [
        JSON.stringify({ type: "thread.started" }),
        JSON.stringify({
          type: "turn.completed",
          usage: {
            input_tokens: 100,
            cached_input_tokens: 40,
            output_tokens: 10,
          },
        }),
      ].join("\n"),
    ),
  ).toEqual({
    usageDetails: {
      input_tokens: 100,
      cached_input_tokens: 40,
      output_tokens: 10,
    },
  });
  expect(nativeUsage("codex", "incomplete receipt")).toEqual({});
  expect(nativeUsage("claude", "{}")).toEqual({});
});
