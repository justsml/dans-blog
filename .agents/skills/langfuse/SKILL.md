---
name: langfuse
description: Use Langfuse with TypeScript LLM apps, especially Vercel AI SDK, Mastra, and REST API integrations. Trigger when Codex needs to add or debug Langfuse observability for AI SDK generateText/streamText telemetry, OpenTelemetry setup with @ai-sdk/otel and @langfuse/otel, Mastra observability with @mastra/langfuse, Mastra-to-AI-SDK streaming via @mastra/ai-sdk, RESTful management of prompts/datasets/scores/annotation queues, prompt/version metadata, datasets/evals, trace verification, or safe Langfuse environment configuration.
---

# Langfuse

Use this skill to add Langfuse observability and management automation to TypeScript AI applications. Bias toward AI SDK, Mastra, and Langfuse Public API integrations; use raw OpenAI wrappers only when the app is not built on AI SDK or Mastra.

## First Pass

1. Identify the integration path:
   - AI SDK call sites: `generateText`, `streamText`, tool calls, or provider models from `ai` and `@ai-sdk/*`.
   - Mastra app: `Mastra`, `Agent`, workflows, model router strings, or `@mastra/*` packages.
   - Hybrid Mastra + AI SDK UI: Mastra streams converted for AI SDK consumers.
   - Management automation: prompts, datasets, dataset items/runs, scores, annotation queues, traces, or observations via `/api/public/*`.
2. Verify current APIs before editing:
   - AI SDK: use Context7 for `/websites/ai-sdk_dev_v7` or the installed package docs/types.
   - Mastra: follow the `mastra` skill; prefer embedded docs in `node_modules/@mastra/*/dist/docs/` when installed.
   - Langfuse: use Context7 for `/langfuse/langfuse-docs` and `/langfuse/langfuse-js`.
3. Check installed versions and package manager. In Bun repos, use `bun add`; otherwise preserve the repo's existing manager.
4. Add the narrowest telemetry wiring that matches the runtime.
5. Run type checks and one trace-producing path when credentials are available.

## Packages

AI SDK + Langfuse OpenTelemetry:

```bash
bun add ai @ai-sdk/otel @langfuse/otel @opentelemetry/sdk-node
```

Add the provider package already used by the app, for example:

```bash
bun add @ai-sdk/openai
```

Mastra + Langfuse:

```bash
bun add @mastra/langfuse
```

Mastra streams or API routes consumed by AI SDK UIs:

```bash
bun add @mastra/ai-sdk
```

Only add `@langfuse/openai` for direct OpenAI SDK call sites that are not going through AI SDK or Mastra.

REST-only automation does not require an SDK package. Use `fetch`, the repo's existing HTTP client, or generated API clients if already present.

## Environment

Use environment variables unless the app already has a typed config layer:

```bash
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_BASE_URL=https://cloud.langfuse.com
```

Set `LANGFUSE_BASE_URL` for non-default regions or self-hosted instances. Add non-secret examples to `.env.example` when that convention exists; never print or commit real keys.

Useful trace attributes:

- `serviceName`: stable app or worker name
- `environment`: `development`, `staging`, or `production`
- `release`: git SHA, app version, or deployment id
- `functionId`: stable AI SDK operation name
- `userId`, `sessionId`, `tags`, `metadata`: safe identifiers only

For REST calls, authenticate with HTTP Basic Auth using `LANGFUSE_PUBLIC_KEY` as the username and `LANGFUSE_SECRET_KEY` as the password. Never assemble a Basic Auth header in logged strings.

## AI SDK

For AI SDK v7-style telemetry, wire OpenTelemetry once near app startup, then attach per-call metadata with `telemetry`.

Node script or worker pattern:

```ts
import { openai } from "@ai-sdk/openai";
import { LegacyOpenTelemetry } from "@ai-sdk/otel";
import { LangfuseSpanProcessor } from "@langfuse/otel";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { generateText, registerTelemetry } from "ai";

const sdk = new NodeSDK({
  spanProcessors: [new LangfuseSpanProcessor()],
});

sdk.start();
registerTelemetry(new LegacyOpenTelemetry());

try {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt,
    telemetry: {
      functionId: "translate-candidate",
      metadata: {
        release: process.env.GIT_SHA,
        tags: ["i18n", "eval"],
      },
    },
  });

  return result.text;
} finally {
  await sdk.shutdown();
}
```

Next.js or long-running server pattern:

```ts
import { LegacyOpenTelemetry } from "@ai-sdk/otel";
import { LangfuseSpanProcessor } from "@langfuse/otel";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { registerTelemetry } from "ai";

registerTelemetry(new LegacyOpenTelemetry());

const tracerProvider = new NodeTracerProvider({
  spanProcessors: [new LangfuseSpanProcessor()],
});

tracerProvider.register();
```

Older examples may use `experimental_telemetry`; check the installed AI SDK major before copying them. Prefer `telemetry` for current AI SDK v7 code.

## Mastra

When the app is Mastra-based, prefer Mastra's Langfuse exporter instead of manually wrapping model calls.

```ts
import { LangfuseExporter } from "@mastra/langfuse";
import { Mastra } from "@mastra/core";

export const mastra = new Mastra({
  // agents, workflows, storage, logger, etc.
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

Follow the `mastra` skill before writing Mastra code:

- Check `node_modules/@mastra/` and read embedded docs for the installed version.
- Verify provider/model names with the Mastra provider registry before changing models.
- Use Mastra Studio or `mastra api` when a human-visible or machine-readable trace/debug loop helps.

## Mastra + AI SDK UI

Use `@mastra/ai-sdk` when a Mastra agent stream needs to feed an AI SDK v5+ compatible consumer.

```ts
import { toAISdkV5Stream } from "@mastra/ai-sdk";

const agent = mastra.getAgent("supportAgent");
const stream = await agent.stream([
  { role: "user", content: message },
]);

return toAISdkV5Stream(stream, { from: "agent" });
```

Keep Langfuse at the Mastra observability layer for these paths unless the AI SDK edge route also makes independent model calls.

## REST API

Use the Langfuse Public API when Codex needs to manage prompt versions, datasets, dataset items, scores, annotation queues, traces, or observations from scripts, CLIs, CI jobs, admin tools, or backend routes.

Always verify request/response shapes in the current API reference before implementation. Common current paths:

| Task | Method/path | Notes |
| --- | --- | --- |
| Create prompt version | `POST /api/public/v2/prompts` | Supports text and chat prompts; prompt variables use `{{variable}}` templates. |
| List/fetch datasets | `GET /api/public/datasets` | Paginated list of dataset metadata. |
| Create/update dataset | `POST /api/public/datasets` | Use stable names and metadata for eval suites. |
| Create/upsert item | `POST /api/public/dataset-items` | Include dataset name, input, expected output, metadata, and optional source trace/observation IDs. |
| Record score/eval result | `POST /api/public/scores` | Attach `NUMERIC`, `BOOLEAN`, `CATEGORICAL`, or text-like scores to traces/observations when supported by current API. |
| Inspect traces | `GET /api/public/traces`, `GET /api/public/traces/:traceId` | Use for exports, regression triage, or eval dataset mining. |
| Inspect observations | `GET /api/public/observations/:observationId` | Use for detailed generation/tool-call debugging. |
| Manage annotation queues | `GET/POST /api/public/annotation-queues` | Useful for human review workflows tied to score configs. |

Minimal REST helper pattern:

```ts
const langfuseBaseUrl = process.env.LANGFUSE_BASE_URL ?? "https://cloud.langfuse.com";
const auth = Buffer.from(
  `${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`,
).toString("base64");

export async function langfuseApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${langfuseBaseUrl}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      authorization: `Basic ${auth}`,
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Langfuse API ${response.status} ${response.statusText}: ${body}`);
  }

  return response.json() as Promise<T>;
}
```

Prompt creation example:

```ts
await langfuseApi("/api/public/v2/prompts", {
  method: "POST",
  body: JSON.stringify({
    type: "chat",
    name: "translation-candidate",
    prompt: [
      { role: "system", content: "Translate to {{locale}} while preserving MDX." },
      { role: "user", content: "{{source}}" },
    ],
    labels: ["staging"],
    tags: ["i18n"],
    commitMessage: "Add staging translation candidate prompt",
  }),
});
```

Score creation example:

```ts
await langfuseApi("/api/public/scores", {
  method: "POST",
  body: JSON.stringify({
    traceId,
    name: "mdx-valid",
    value: 1,
    dataType: "NUMERIC",
    comment: "MDX parsed successfully",
  }),
});
```

REST automation rules:

- Make create/upsert scripts idempotent with stable names, ids, labels, and metadata.
- Include pagination handling for list endpoints; do not assume the first page is complete.
- Keep eval run names deterministic enough to compare, but unique enough to avoid overwriting history.
- Prefer SDK helpers when the repo already uses Langfuse SDKs for the same operation; use REST when SDK coverage is missing, CLI scripts need a tiny dependency footprint, or an admin route needs explicit HTTP behavior.
- Do not send broad production exports to Langfuse or pull broad trace data without stating scope.

## Prompts, Evals, And Datasets

- Put prompt name, prompt version or label, model, locale, eval slug, and release in trace metadata when they explain a run.
- Keep source-controlled prompt fixtures for tests even if production prompts are managed in Langfuse.
- Use Langfuse datasets/experiments for repeatable comparisons across prompts, models, agents, or Mastra workflow versions.
- Separate deterministic checks from LLM-as-judge checks. Deterministic failures should block; judge findings should include examples.
- For API-managed evals, persist score names, data types, scorer versions, and source trace/dataset item IDs so results can be audited later.
- State upload scope before running broad evals because Langfuse may receive prompts, outputs, metadata, and scores.

## Verification

Before finishing:

1. Run the repo's type check or the smallest targeted test for touched files.
2. Confirm env validation works without exposing keys.
3. Exercise one `generateText`, `streamText`, Mastra agent, or Mastra workflow path that emits a trace when credentials are available.
4. For REST work, exercise a harmless read endpoint or a scoped test write, then verify the returned id/status.
5. Shut down or flush OpenTelemetry exporters in scripts, workers, tests, and one-shot CLIs.
6. Check logs for authentication, exporter, network, pagination, or rate-limit errors.
7. Report whether a real Langfuse trace/API write was sent, which command/path produced it, and what sensitive data is excluded or redacted.

## Privacy

- Do not send secrets, auth headers, private documents, or full user records into metadata.
- Redact or disable input/output capture for sensitive payloads.
- Prefer stable internal IDs over emails or names.
- Add sampling before instrumenting high-volume paths.
- Say Langfuse improves observability and evaluation evidence; do not claim it proves correctness.

## References

Read `references/current-docs.md` before SDK- or API-specific edits. It records the current AI SDK, Mastra, Langfuse package, and REST API touchpoints and which docs to re-check.
