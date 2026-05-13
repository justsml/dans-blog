# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5358
- **Total output tokens**: 2575
- **Cache read tokens**: 2304
- **Cache write tokens**: 0
- **Total duration**: 2488ms
- **Estimated cost**: $0.000672 (local-openrouter-estimate)

## Article Summary
**Summary**

The article argues that large language models (LLMs) should not be asked to perform raw arithmetic because they are pattern‑matching generators, not symbolic calculators; their “answers” are probabilistic token predictions that become unreliable on multi‑step or uncommon numeric tasks. Instead, the author recommends augmenting LLMs with dedicated math tools—specifically a symbolic compute engine accessed via modern AI SDK tool‑calling—so the model delegates any calculation to a reliable library while retaining its natural‑language strengths. The piece includes a concise TypeScript example showing how to define a `mathTool` (using the Vercel AI SDK and CortexJS Compute Engine), batch‑process expressions, and enforce tool usage through prompt engineering. Intended for developers and AI practitioners who build LLM‑powered applications, the tone is a pragmatic tutorial with occasional rhetorical analogies (e.g., “gymnast balancing your checkbook”) to emphasize the mismatch between LLMs and pure computation.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1300 | 0 | 0 | 649 | 586 | $0.000168 |
| 2 | 1703 | 768 | 0 | 1186 | 822 | $0.000280 |
| 3 | 1299 | 768 | 0 | 495 | 733 | $0.000140 |
| 4 | 1056 | 768 | 0 | 245 | 347 | $0.000085 |
