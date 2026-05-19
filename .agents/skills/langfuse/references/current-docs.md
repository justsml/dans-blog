# Current Langfuse Docs Notes

Last checked with Context7 on 2026-05-19 against official Langfuse docs and SDK repositories.

## Documentation Targets

- General docs: `/langfuse/langfuse-docs`
- JS/TS SDK docs: `/langfuse/langfuse-js`
- Python SDK docs: `/langfuse/langfuse-python`
- Kubernetes/self-hosting docs, when needed: `/langfuse/langfuse-k8s`

Use Context7 first for SDK syntax. If the answer depends on a newly released API, browse official Langfuse docs or the relevant SDK repository.

## JS/TS Reminders

Current docs show the OpenAI integration with:

```ts
import OpenAI from "openai";
import { observeOpenAI } from "@langfuse/openai";

const openai = observeOpenAI(new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}));
```

For active spans, current docs show:

```ts
import { startActiveObservation } from "@langfuse/tracing";
```

Some docs also import `LangfuseClient` from `@langfuse/client` for dataset/experiment and client workflows. Confirm installed package versions before assuming all methods are available.

## Python Reminders

Current docs show:

```py
from langfuse import Langfuse, observe, get_client
```

Key lifecycle and validation methods:

- `Langfuse()` reads `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`, and optional `LANGFUSE_BASE_URL`.
- `langfuse.auth_check()` validates credentials.
- `langfuse.flush()` sends buffered data.
- `langfuse.shutdown()` flushes and terminates background workers.

Prompt management pattern:

```py
prompt = langfuse.get_prompt(
    "summarize-article",
    type="text",
    label="production",
    fallback="Summarize: {{article}}",
)
rendered = prompt.compile(article=article)
```

Link prompt versions to generation spans when tracing prompt-managed calls.

## Verification Questions

Before finalizing Langfuse work, answer these in the final note:

- Were real Langfuse credentials available?
- Was a trace or prompt run actually sent?
- Which command or local path exercised the instrumentation?
- Were buffered spans flushed or shut down?
- What sensitive fields are excluded, redacted, or sampled?
