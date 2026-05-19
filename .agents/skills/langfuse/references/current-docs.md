# Current Langfuse Integration Notes

Last checked with Context7 and official Langfuse API docs on 2026-05-19 against official Langfuse, AI SDK, and Mastra docs.

## Documentation Targets

- Langfuse docs: `/langfuse/langfuse-docs`
- Langfuse JS SDK docs: `/langfuse/langfuse-js`
- Langfuse API reference: `https://api.reference.langfuse.com`
- AI SDK v7 docs: `/websites/ai-sdk_dev_v7`
- Mastra docs/source: `/mastra-ai/mastra`

For Mastra code, also follow the repo-local `mastra` skill: installed package docs in `node_modules/@mastra/*/dist/docs/` beat remote docs.

## AI SDK + Langfuse

Current AI SDK Langfuse observability docs show this package set for Node.js:

```bash
npm install ai @ai-sdk/openai @langfuse/otel @opentelemetry/sdk-node @ai-sdk/otel
```

Use the repo's package manager and provider package. For this repo, prefer `bun add`.

Current AI SDK v7 pattern:

```ts
import { openai } from "@ai-sdk/openai";
import { registerTelemetry, generateText } from "ai";
import { LegacyOpenTelemetry } from "@ai-sdk/otel";
import { LangfuseSpanProcessor } from "@langfuse/otel";
import { NodeSDK } from "@opentelemetry/sdk-node";

const sdk = new NodeSDK({
  spanProcessors: [new LangfuseSpanProcessor()],
});

sdk.start();
registerTelemetry(new LegacyOpenTelemetry());

const result = await generateText({
  model: openai("gpt-4o"),
  prompt: "Invent a new holiday and describe its traditions.",
  telemetry: {
    functionId: "my-awesome-function",
    metadata: {
      something: "custom",
    },
  },
});

await sdk.shutdown();
```

For Next.js/manual tracer setup, current docs show `NodeTracerProvider`, `registerTelemetry(new LegacyOpenTelemetry())`, and `new LangfuseSpanProcessor()`.

Older Langfuse docs may show `experimental_telemetry`. Current AI SDK v7 docs use `telemetry`; verify the installed major before choosing.

## Mastra + Langfuse

Current Mastra docs show:

```ts
import { LangfuseExporter } from "@mastra/langfuse";

const mastra = new Mastra({
  observability: {
    configs: {
      langfuse: {
        serviceName: "my-service",
        exporters: [new LangfuseExporter()],
      },
    },
  },
});
```

`new LangfuseExporter()` can read Langfuse credentials from environment variables.

## Mastra + AI SDK

Current Mastra docs describe `@mastra/ai-sdk` as the recommended bridge for Mastra and AI SDK. It includes custom route/utilities for chat, workflow, and network handlers plus stream conversion.

For AI SDK v5+ compatible streams:

```ts
import { toAISdkV5Stream } from "@mastra/ai-sdk";

const stream = await agent.stream([
  { role: "user", content: "Help me organize my day" },
]);

const aiSDKStream = toAISdkV5Stream(stream, { from: "agent" });
```

Mastra can use AI SDK provider modules directly, and AI SDK models may be accepted anywhere a Mastra `provider/model` string is accepted. Verify the current installed Mastra docs before relying on that interchange in code.

## Environment

Langfuse SDK/exporters commonly read:

```bash
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_BASE_URL=https://cloud.langfuse.com
```

Set `LANGFUSE_BASE_URL` for non-default Langfuse regions or self-hosted instances.

## Public REST API

Current docs show Basic Auth for public API calls: username is the Langfuse public key and password is the secret key.

Prompt creation currently uses:

```bash
curl -X POST "https://cloud.langfuse.com/api/public/v2/prompts" \
  -u "your-public-key:your-secret-key" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "chat",
    "name": "movie-critic",
    "prompt": [
      { "role": "system", "content": "You are an {{criticlevel}} movie critic" },
      { "role": "user", "content": "Do you like {{movie}}?" }
    ]
  }'
```

Common public API paths to verify against the live API reference before implementation:

- `POST /api/public/v2/prompts` for prompt versions.
- `GET /api/public/datasets` and `POST /api/public/datasets` for datasets.
- `POST /api/public/dataset-items` for dataset items/upserts.
- `POST /api/public/scores` for numeric/boolean/categorical eval scores attached to traces or observations.
- `GET /api/public/traces` and `GET /api/public/traces/:traceId` for trace inspection/export.
- `GET /api/public/observations/:observationId` for observation inspection.
- `GET /api/public/annotation-queues` and `POST /api/public/annotation-queues` for human review queues.

Score creation currently includes fields like:

```json
{
  "traceId": "trace_id_here",
  "observationId": "observation_id_here",
  "name": "correctness",
  "value": 0.9,
  "dataType": "NUMERIC",
  "comment": "Factually correct"
}
```

List endpoints usually paginate with `page` and `limit`, returning `data` and `meta`. Do not assume an endpoint returns all rows in one response.

## Verification Questions

Before finalizing Langfuse work, answer these:

- Which integration path was used: AI SDK OTEL, Mastra exporter, Mastra AI SDK bridge, REST API, or direct OpenAI wrapper?
- Were real Langfuse credentials available?
- Was a trace or API write actually sent?
- Which command or local path produced the trace/API request?
- Did a one-shot process call `sdk.shutdown()`, `flush()`, or the equivalent?
- For REST work, was pagination, idempotency, and error handling covered?
- What sensitive inputs, outputs, or metadata are excluded, redacted, or sampled?
