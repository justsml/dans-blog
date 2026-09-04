# Mastra claims and examples audit

Verified 2026-09-04 against Mastra's current public documentation, the Mastra monorepo at commit [`aeaf231`](https://github.com/mastra-ai/mastra/tree/aeaf23135d39c92f3174969ddeb0330072f422f0), the latest GitHub release, and npm's first-party package metadata.

## Executive summary

The main architecture is current, but one example needs correction and one claim overpromises behavior:

1. **The composite MCP tool example is not valid current Mastra code.** It omits the `createTool` import and input/output schemas; more importantly, its `execute: async ({ context, mastra })` signature is from an older tool API. Current `createTool()` passes validated schema input as the first argument and execution metadata as the optional second argument. The direct calls to MCP tool `.execute({ context: ... })` use the same obsolete shape. See the current [`createTool()` reference](https://mastra.ai/reference/tools/create-tool) and [source documentation at the audited commit](https://github.com/mastra-ai/mastra/blob/aeaf23135d39c92f3174969ddeb0330072f422f0/docs/src/content/en/reference/tools/create-tool.mdx).
2. **The routing article incorrectly implies provider failover is automatic.** A supervisor can delegate among registered agents, but its prompt does not make a failed provider call transparently retry through another agent. Provider resilience requires an explicit fallback/retry policy or application logic. Rephrase “your router can redirect traffic” as a capability you must implement and test, not an emergent side benefit of `agents: { ... }`.
The processors, workflow, memory, supervisor, eval, dataset, and experiment APIs otherwise match current Mastra.

This repository is a blog. Its installed Mastra packages support the translation pipeline; they are not the runtime or compatibility target for the code shown in the articles. The editorial examples were therefore reviewed against the latest public Mastra release, not against this repo's dependency graph. The absence of `@mastra/mcp` from this blog's `package.json` is expected and is not an article defect.

## Scope and inventory

Substantive English content:

| Post | Mastra surface | Result |
| --- | --- | --- |
| `2026-01-02--llm-routing-mastra-ai` | Agent model router, supervisor agents, Memory, LibSQL | One overclaim; code shape current |
| `2026-01-03--mastra-security-guardrails` | Input/output processors and tripwires | Current, with one wording clarification |
| `2026-01-04--mastra-mcp-tool-integrations` | MCPClient, dynamic toolsets, approvals, custom tools | One broken example |
| `2026-01-05--mastra-workflows-memory` | Workflows, memory, semantic recall, observational memory, supervisors | Current; one operational caveat |
| `2026-07-03--dont-fear-the-model-router` | Scorers, `runEvals`, datasets, experiments, live scoring | Current |

`2026-05-13--into-the-breach` only links to a Mastra-titled post. `2026-06-30--security-agent-model-router` uses “Mastra messages” as provenance for the author's own measurements, not as a framework API claim. `src/shared/ossData.ts` gives an accurate high-level description. Locale subdirectories mirror the four January posts and should be regenerated or synchronized after the English source is fixed. Generated `reports/i18n/**` artifacts and lockfiles are not independent editorial claims.

## Version baseline

The latest GitHub release at verification time is [`@mastra/core@1.64.0`, published 2026-09-04](https://github.com/mastra-ai/mastra/releases/tag/%40mastra/core%401.64.0). npm reports current versions of [`@mastra/core` 1.64.0](https://www.npmjs.com/package/@mastra/core), [`@mastra/memory` 1.28.2](https://www.npmjs.com/package/@mastra/memory), [`@mastra/libsql` 1.22.3](https://www.npmjs.com/package/@mastra/libsql), [`@mastra/mcp` 1.17.3](https://www.npmjs.com/package/@mastra/mcp), and [`mastra` 1.27.3](https://www.npmjs.com/package/mastra).

This repo resolves core 1.34.0, memory 1.18.1, libsql 1.10.1, and CLI 1.9.2 for its translation pipeline. Those versions do not determine whether the articles are current and should not be upgraded merely to validate editorial examples. Any translation-pipeline upgrade is a separate engineering task with its own compatibility and regression-testing requirements.

The model router registry currently recognizes every model string used in the posts: `openai/gpt-5.5`, `openai/gpt-5-mini`, `anthropic/claude-sonnet-4-6`, `google/gemini-2.5-pro`, `openrouter/openai/gpt-oss-safeguard-20b`, and `openai/text-embedding-3-small`.

## Detailed findings

### Routing and supervisors

The `Agent` constructor, `provider/model` strings, nested `agents`, descriptions used for delegation, `Memory`, `LibSQLStore`, and registration with `new Mastra({ agents })` remain supported. Mastra explicitly recommends supervisor agents over the deprecated network API; the repo already uses the recommended surface. See Mastra's [network-to-supervisor migration](https://mastra.ai/reference/migrations/network-to-supervisor) and [agent reference](https://mastra.ai/reference/agents/agent).

The claim that the supervisor is an “intelligent proxy” is fair as an analogy, but “your router can redirect traffic” during a provider outage is not implemented by the shown code. The supervisor itself depends on OpenAI and a delegated provider failure does not automatically cause a second delegation. Recommend adding an explicit sentence that failover needs retry/fallback handling and eval coverage.

### Processors and tripwires

The processor imports, constructor options, ordering, and hybrid input/output use are current:

- `UnicodeNormalizer` supports `stripControlChars` and `collapseWhitespace` ([reference](https://mastra.ai/reference/processors/unicode-normalizer)).
- `PromptInjectionDetector` supports the shown model, threshold, four strategies, detection types, and `lastMessageOnly` ([reference](https://mastra.ai/reference/processors/prompt-injection-detector)).
- `PIIDetector` supports input and output processing, `redact`, and `mask | hash | remove | placeholder`; the article's phrase “replace with typed placeholders” corresponds to the `placeholder` method ([reference](https://mastra.ai/reference/processors/pii-detector)).
- `ModerationProcessor` supports the shown categories, thresholds, strategies, and `chunkWindow` ([reference](https://mastra.ai/reference/processors/moderation-processor)).
- Mastra recommends placing `BatchPartsProcessor` before expensive streamed moderation/PII processors, as shown ([batching reference](https://mastra.ai/reference/processors/batch-parts-processor)).

For non-streaming generation, `result.tripwire` is current; for streaming, tripwire parts appear on `fullStream`. The article says a blocking processor “rejects with error” in one place and then demonstrates inspecting a normal result. Current processor docs describe `block` as calling `abort()`, while the processor interface documents tripwire data on the result. Prefer consistently saying “aborts the generation with tripwire metadata” instead of “rejects with error.” See the current [processor interface](https://mastra.ai/reference/processors/processor-interface).

The security caveats are appropriately non-absolute. One useful current addition: Mastra's MCP docs warn that tool results become model input and the transport does not sanitize malicious tool output; agent-layer processors remain necessary ([MCPClient security guidance](https://mastra.ai/reference/tools/mcp-client)).

### MCP

The `MCPClient` constructor supports stdio `command`/`args`, HTTP `url`/`requestInit`, unique `id`, `listTools()`, `listToolsets()`, and `disconnect()`. Current docs specifically recommend `listTools()` for a shared application connection and per-user `listToolsets()` passed through `generate()`/`stream()` for per-user connections—the article matches this pattern ([MCPClient reference](https://mastra.ai/reference/tools/mcp-client)).

Server-level `requireToolApproval` can be a boolean or callback receiving `toolName`, `args`, `requestContext`, and `annotations`. The article correctly treats annotations as advisory rather than a security boundary; Mastra's current docs make the same warning.

The “Building Composite Tools” block must be rewritten. A current shape is:

```typescript
import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

export const smartRouteTool = createTool({
  id: 'smart-route-planner',
  description: 'Plans an optimal route considering traffic and weather',
  inputSchema: z.object({ origin: z.string(), destination: z.string() }),
  outputSchema: z.object({ /* real combined response schema */ }),
  execute: async ({ origin, destination }) => {
    const tools = await mcpClient.listTools()
    const routeData = await tools.googleMaps_getDirections.execute(
      { origin, destination },
      { /* ToolExecutionContext supplied by Mastra in normal agent use */ },
    )
    // Invoke weather with its actual discovered schema and return validated output.
  },
})
```

Do not publish the abbreviated second argument as literal copy/paste code. The precise MCP schemas and execution context depend on the connected servers; the safest article example is either a complete runnable fake MCP server or pseudocode clearly labeled as such. The present claims about particular third-party package/tool names (`wikipedia-mcp`, `googleMaps_getDirections`, `weather_getForecast`) are not guaranteed by Mastra and should also be labeled placeholders.

### Workflows and memory

`createStep`, `execute({ inputData })`, `createWorkflow`, `.then()`, and `.commit()` remain the current workflow API ([workflow overview](https://mastra.ai/docs/workflows/overview), [`Step` reference](https://mastra.ai/reference/workflows/step)). The weather block is representative rather than runnable because `geocodeCity()` and `getWeatherCondition()` are intentionally undefined; say “abridged” near the fence if copy/paste expectations matter.

The Memory example is current. Semantic recall is disabled by default and requires both a vector store and embedder; `topK`, `messageRange`, and `scope: 'resource'` are valid. `ModelRouterEmbeddingModel('openai/text-embedding-3-small')`, `LibSQLVector`, working memory, `lastMessages`, and `observationalMemory: true` are supported ([semantic recall](https://mastra.ai/docs/memory/semantic-recall), [Memory reference](https://mastra.ai/reference/memory/memory-class), [observational memory](https://mastra.ai/docs/memory/observational-memory)).

Operational caveat: `observationalMemory: true` currently selects `google/gemini-2.5-flash` by default, so this “OpenAI agent” example also requires Google model access unless it supplies an explicit observational-memory model. This should be stated because it affects credentials, data routing, and cost.

The prose says working memory “stores persistent structured facts,” but the example only sets `{ enabled: true }` and does not define a structured schema/template. “Persistent facts and state” is safer; structured working memory needs corresponding configuration.

### Evals and datasets

The July eval article tracks the current APIs closely:

- `createScorer({ type: 'agent' })`, function steps, judge-backed prompt-object `.analyze()`, `.generateScore()`, and `.generateReason()` are current ([createScorer](https://mastra.ai/reference/evals/create-scorer)).
- `runEvals({ target, data, scorers, targetOptions, concurrency })` and workflow/step/trajectory scorer maps are current ([runEvals](https://mastra.ai/reference/evals/run-evals)).
- Dataset creation, schemas, `addItems()`, mutation versioning, and historical versions are current ([datasets](https://mastra.ai/docs/evals/datasets)).
- `dataset.startExperiment()` with a registered target/scorers and its returned per-item summary remains current ([experiments](https://mastra.ai/docs/evals/experiments)).
- Agent-attached asynchronous scorers with ratio sampling remain current ([eval overview](https://mastra.ai/docs/evals/overview)).

One improvement is available rather than required: current `runEvals` supports `gates` and scorer thresholds. The hand-written `if (result.scores[...] < ...) throw` logic remains valid, but gates now express CI pass/fail policy inside the eval API.

## Recommended order of work

1. Fix or explicitly label the composite MCP block as pseudocode.
2. Correct the automatic-failover implication in the routing post.
3. Add the observational-memory default-model/data-routing caveat.
4. Normalize tripwire wording.
5. If compile-tested article snippets are desirable, build a separate documentation fixture or CI harness pinned to the intended public Mastra version. Do not couple that harness to the blog's translation-pipeline dependencies.
6. Propagate approved English edits through the locale pipeline rather than hand-editing translated mirrors.
