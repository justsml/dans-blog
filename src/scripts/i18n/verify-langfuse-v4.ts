// Writes one clearly marked synthetic trace; no provider or LLM inference calls.
import { generateText } from "./ai-sdk.ts";
import { MockLanguageModelV4 } from "ai/test";
import {
  traceNegotiation,
  traceNegotiationEvent,
} from "./negotiation/langfuse.ts";
import { langfuseConnection } from "./langfuse-score-projection.ts";
import { listLangfuseObservations } from "./langfuse-v4.ts";

const connection = langfuseConnection();
if (!connection) throw Error("Langfuse credentials and base URL required");
const projectResponse = await fetch(connection.base + "/api/public/projects", {
  headers: connection.headers,
  signal: AbortSignal.timeout(20000),
});
if (!projectResponse.ok) throw Error("Langfuse project lookup failed");
const projects = (await projectResponse.json()).data;
if (projects.length !== 1 || projects[0].name !== "dans-blog")
  throw Error("Refusing canary outside the dans-blog Langfuse project");

const marker = "v4-migration-canary-" + crypto.randomUUID();
let ids: { traceId: string; observationId: string } | undefined;
await traceNegotiation(
  { verification: marker, synthetic: true, noInference: true },
  (value) => {
    ids = value;
  },
  async () => {
    await generateText({
      model: new MockLanguageModelV4({
        modelId: "synthetic-migration-canary-no-inference",
        doGenerate: {
          content: [{ type: "text", text: marker }],
          finishReason: { unified: "stop", raw: "stop" },
          usage: {
            inputTokens: { total: 0, noCache: 0, cacheRead: 0, cacheWrite: 0 },
            outputTokens: { total: 0, text: 0, reasoning: 0 },
          },
          warnings: [],
        },
      }),
      prompt: marker,
      maxRetries: 0,
    });
    traceNegotiationEvent({ type: "migration-canary-event", marker });
    return { marker, synthetic: true, noInference: true };
  },
);
let observations: any[] = [];
for (let attempt = 0; attempt < 10; attempt++) {
  observations = await listLangfuseObservations({ traceId: ids!.traceId });
  if (observations.some((o) => o.type === "EVENT")) break;
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
const root = observations.find((o) => o.id === ids!.observationId);
const generation = observations.find((o) => o.type === "GENERATION");
const event = observations.find((o) => o.type === "EVENT");
const json = (value: any) =>
  typeof value === "string" ? JSON.parse(value) : value;
if (!root || !generation || !event)
  throw Error("Missing root/generation/event in v2 readback");
if (
  json(root.input)?.verification !== marker ||
  json(root.output)?.marker !== marker
)
  throw Error("Root observation IO readback mismatch");
for (const observation of [root, generation, event]) {
  if (
    observation.traceId !== ids!.traceId ||
    observation.traceName !== "translation-negotiation" ||
    observation.metadata?.verification !== marker
  )
    throw Error("V4 trace context did not propagate to every observation");
}
if (
  generation.parentObservationId !== root.id ||
  event.parentObservationId !== root.id
)
  throw Error("V4 canary parent linkage mismatch");
if (json(event.output)?.marker !== marker)
  throw Error("V4 event output readback mismatch");
console.log(
  JSON.stringify({
    ...ids,
    verifiedObservationIds: [root.id, generation.id, event.id],
    verification: marker,
    observations: observations.length,
    noInference: true,
    verified: true,
  }),
);
