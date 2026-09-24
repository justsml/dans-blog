import { generateText, streamText } from "./braintrust.ts";
import {
  createOpenRouterChatModel,
  resolveLlmConfig,
} from "./core/model-config.ts";
import { traceNegotiation } from "./negotiation/langfuse.ts";
import { mkdirSync, appendFileSync } from "node:fs";
const dir = "reports/i18n/cost-observability";
mkdirSync(dir, { recursive: true });
const config = resolveLlmConfig(
  "llm://openrouter/openai/gpt-6-luna?reasoning_effort=none",
);
await traceNegotiation(
  { verification: "real-provider-cost-canary", model: config.modelId },
  (ids) => {
    appendFileSync(
      dir + "/canary.jsonl",
      JSON.stringify({ at: new Date().toISOString(), ...ids }) + "\n",
    );
    console.log(JSON.stringify(ids));
  },
  async () => {
    const model = createOpenRouterChatModel(config);
    const first = await generateText({
      model,
      prompt: "Reply with OK.",
      maxOutputTokens: 32,
      maxRetries: 0,
      providerOptions: config.providerOptions,
    });
    const stream = streamText({
      model,
      prompt: "Reply with OK.",
      maxOutputTokens: 32,
      maxRetries: 0,
      providerOptions: config.providerOptions,
    });
    await stream.consumeStream();
    const results = [
      {
        kind: "generate",
        usage: first.usage,
        providerMetadata: first.providerMetadata,
      },
      {
        kind: "stream",
        usage: await stream.usage,
        providerMetadata: await stream.providerMetadata,
      },
    ];
    appendFileSync(
      dir + "/provider-results.jsonl",
      results.map((r) => JSON.stringify(r)).join("\n") + "\n",
    );
    return results;
  },
);
