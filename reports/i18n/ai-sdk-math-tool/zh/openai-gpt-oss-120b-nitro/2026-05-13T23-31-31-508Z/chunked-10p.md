# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5873
- **Total output tokens**: 1973
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 6501ms
- **Estimated cost**: $0.000584 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that large language models (LLMs) are fundamentally pattern‑matchers, not calculators, so asking them to perform arithmetic or symbolic math leads to confident but often incorrect answers. The author proposes a pragmatic solution: instead of waiting for “smarter” models, integrate a dedicated math tool (e.g., a symbolic compute engine) via modern AI SDKs’ tool‑calling feature, letting the LLM invoke the engine whenever a calculation is required. The piece walks through a concise TypeScript implementation using the Vercel AI SDK, CortexJS Compute Engine, and explicit tool descriptions to ensure reliable, batched, and error‑aware computation, and demonstrates the approach on complex expressions beyond simple arithmetic. The tone is a mix of technical tutorial and mild rant, using the metaphor of “asking a gymnast to balance your checkbook” to illustrate the mismatch between LLMs and numeric computation. The intended audience is developers and engineers building AI‑augmented applications who need accurate mathematical results.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1324 | 512 | 0 | 624 | 2540 | $0.000164 |
| 2 | 1879 | 512 | 0 | 775 | 2249 | $0.000213 |
| 3 | 1402 | 512 | 0 | 426 | 1112 | $0.000131 |
| 4 | 1268 | 512 | 0 | 148 | 600 | $0.000076 |
