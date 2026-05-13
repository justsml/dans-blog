# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6442
- **Total output tokens**: 5864
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 95990ms
- **Estimated cost**: $0.001923 (local-openrouter-estimate)

## Article Summary
The article argues that large language models (LLMs) are fundamentally unreliable for mathematical tasks due to their pattern-matching nature, emphasizing that they "don't compute anything" but instead predict likely tokens based on training data. The core thesis is that developers should stop relying on LLMs for math and instead pair them with symbolic computation engines like CortexJS Compute Engine via modern AI SDKs (e.g., Vercel's AI SDK v5/v6), using structured tool calls to delegate precise calculations. Key points include the risks of hallucination in multi-step math, the importance of explicit tool-level prompt engineering (e.g., "MUST be used" directives), and the efficiency of batching expressions to reduce latency. The tone is analytical but cautionary, using metaphors like "asking a gymnast to balance your checkbook" to critique mismatched expectations. Intended for developers integrating LLMs into applications requiring mathematical accuracy, the article frames the solution as a collaboration between AI's language strengths and specialized tools for computation.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1002 | 0 | 0 | 879 | 16098 | $0.000291 |
| 2 | 1036 | 0 | 0 | 1237 | 20437 | $0.000380 |
| 3 | 1341 | 0 | 0 | 857 | 13665 | $0.000313 |
| 4 | 1082 | 0 | 0 | 1273 | 20309 | $0.000392 |
| 5 | 1073 | 0 | 0 | 1036 | 15989 | $0.000334 |
| 6 | 908 | 0 | 0 | 582 | 9492 | $0.000212 |
