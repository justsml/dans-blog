---
name: langfuse
description: Use Langfuse for LLM observability, tracing, prompt management, datasets, experiments, evals, and debugging. Trigger when Codex needs to instrument JavaScript/TypeScript or Python LLM apps with Langfuse, add OpenAI/LangChain tracing, wire prompt versions to generations, inspect or design Langfuse-backed evaluation workflows, configure Langfuse Cloud or self-hosted credentials, or verify traces without exposing secrets.
---

# Langfuse

Use this skill to add or maintain Langfuse in LLM applications. Prefer the app's existing telemetry patterns, package manager, runtime, and deployment conventions.

## First Pass

1. Identify the runtime and integration path:
   - JS/TS OpenAI SDK: use `@langfuse/openai` and wrap the OpenAI client with `observeOpenAI`.
   - JS/TS custom spans or agents: use `@langfuse/client` plus `@langfuse/tracing` primitives.
   - Python functions or agents: use `langfuse`, `@observe`, and `get_client()`.
   - Python LangChain: use `langfuse.langchain.CallbackHandler`.
2. Read current official docs before changing SDK APIs. Use Context7 for `Langfuse`, `/langfuse/langfuse-js`, or `/langfuse/langfuse-python`; fall back to official `langfuse.com/docs` only when Context7 lacks the needed detail.
3. Check the repo's package manager and lockfile. Keep Bun/pnpm/npm/uv/poetry choices consistent with the project.
4. Check existing environment/config patterns. Never print, hard-code, or commit Langfuse keys.
5. Make one narrow instrumentation change, then run the smallest local verification that exercises a trace or prompt path.

## Environment

Use environment variables unless the host app already centralizes secrets differently:

```bash
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_BASE_URL=https://cloud.langfuse.com
```

For EU Cloud or self-hosted instances, set `LANGFUSE_BASE_URL` to that instance's URL. Add non-secret examples to `.env.example` or deployment docs when the repo has that convention; do not add real keys.

Useful optional metadata:

- `environment`: `development`, `staging`, or `production`
- `release`: git SHA, app version, or deployment id
- `sample_rate`: reduce volume for high-throughput paths
- `userId`, `sessionId`, `tags`, and `metadata`: add only values that are safe under the app's privacy policy

## JavaScript/TypeScript

Install only the packages needed by the integration path. Examples:

```bash
bun add langfuse @langfuse/openai
bun add @langfuse/client @langfuse/tracing @langfuse/openai
```

Use the repo's package manager equivalent if it is not Bun.

OpenAI tracing pattern:

```ts
import OpenAI from "openai";
import { observeOpenAI } from "@langfuse/openai";

const openai = observeOpenAI(new OpenAI({ apiKey: process.env.OPENAI_API_KEY }), {
  traceName: "answer-question",
  environment: process.env.NODE_ENV,
  tags: ["llm"],
});

const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: input }],
});
```

Custom span pattern:

```ts
import { startActiveObservation } from "@langfuse/tracing";

await startActiveObservation("answer-question", async (span) => {
  span.update({ input });
  const output = await answerQuestion(input);
  span.update({ output });
  return output;
});
```

For scripts, queues, tests, and serverless handlers, flush or shut down before process exit if the SDK exposes a lifecycle method in the installed version. Verify the current method name from docs or local types.

## Python

Install with the repo's Python package manager:

```bash
pip install langfuse
```

Decorator tracing pattern:

```py
from langfuse import Langfuse, observe, get_client

langfuse = Langfuse()

@observe(as_type="agent", name="answer-question")
def answer_question(question: str) -> str:
    answer = call_model(question)
    get_client().update_current_trace(
        tags=["llm"],
        metadata={"component": "qa"},
    )
    return answer

try:
    answer_question("What is Langfuse?")
finally:
    langfuse.shutdown()
```

Use `langfuse.auth_check()` when validating credentials, and `flush()` or `shutdown()` for short-lived processes.

LangChain pattern:

```py
from langfuse.langchain import CallbackHandler

handler = CallbackHandler()
response = chain.invoke(
    {"question": question},
    config={"callbacks": [handler]},
)
```

## Prompt Management

When prompts belong in Langfuse instead of source code:

1. Fetch by stable prompt name and label.
2. Provide a safe fallback only when the app should keep running if Langfuse is unavailable.
3. Compile variables explicitly.
4. Link the prompt object/version to the generation so traces explain which prompt produced the output.

Python pattern:

```py
prompt = langfuse.get_prompt(
    "summarize-article",
    type="text",
    label="production",
    fallback="Summarize: {{article}}",
)
rendered = prompt.compile(article=article)
```

Prefer source-controlled prompt fixtures for tests even when production prompts live in Langfuse.

## Evals And Datasets

Use Langfuse datasets/experiments when the task needs reproducible comparisons across prompts, models, or agent versions.

- Keep dataset item inputs, expected outputs, metadata, and run names deterministic.
- Record model, prompt version, release, environment, and code version on every run.
- Treat evaluator code as production logic: test pure scorers locally and version changes.
- Separate deterministic checks from LLM-as-judge checks. Deterministic failures should block; judge findings should include examples.
- When adding CI gates, make the upload scope explicit because Langfuse may receive prompts, outputs, metadata, and eval results.

## Verification

Before finishing:

1. Run type checks or targeted tests for touched code.
2. Exercise one local path that creates a trace, unless credentials are unavailable.
3. For unavailable credentials, verify env validation and SDK imports without sending data.
4. Confirm buffered events are flushed for scripts/serverless paths.
5. Check logs for authentication, network, or exporter errors.
6. State what was verified and whether a trace was actually sent.

## Privacy And Safety

- Do not log secrets, raw auth headers, API keys, private documents, or full user records into trace metadata.
- Redact or disable input/output capture for sensitive payloads.
- Use stable internal IDs instead of emails or names when possible.
- Add sampling before high-volume instrumentation.
- Avoid claiming Langfuse proves correctness; say it improves observability, debugging, and evaluation evidence.

## References

Read `references/current-docs.md` for current package names, API reminders, and doc lookup hints before making SDK-specific edits.
