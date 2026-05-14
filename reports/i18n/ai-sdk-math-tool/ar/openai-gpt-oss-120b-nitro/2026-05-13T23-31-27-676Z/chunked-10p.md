# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5348
- **Total output tokens**: 2234
- **Cache read tokens**: 1536
- **Cache write tokens**: 0
- **Total duration**: 6747ms
- **Estimated cost**: $0.000611 (local-openrouter-estimate)

## Article Summary
The article argues that large language models are fundamentally pattern‑matchers, not calculators, so asking them to perform arithmetic leads to unreliable “hallucinated” results. It proposes a pragmatic solution: integrate a dedicated symbolic math tool (e.g., CortexJS Compute Engine) via modern AI SDK tool‑calling, letting the LLM invoke the engine for any numerical or algebraic task while it focuses on natural‑language reasoning. The piece walks through a short TypeScript implementation, emphasizing explicit tool descriptions, batch processing of expressions, and robust error handling. Intended for developers and AI engineers building LLM‑powered applications, the tone is a hands‑on tutorial with occasional rhetorical analogies (gymnast vs. accountant) to frame the mismatch between LLMs and computation.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1274 | 512 | 0 | 735 | 1895 | $0.000182 |
| 2 | 1719 | 512 | 0 | 839 | 2491 | $0.000218 |
| 3 | 1299 | 0 | 0 | 478 | 1309 | $0.000137 |
| 4 | 1056 | 512 | 0 | 182 | 1052 | $0.000074 |
