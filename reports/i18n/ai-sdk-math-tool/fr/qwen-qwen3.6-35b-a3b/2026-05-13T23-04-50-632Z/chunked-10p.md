# Chunked Translation Report

- **Model**: qwen/qwen3.6-35b-a3b
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5215
- **Total output tokens**: 18048
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 92407ms
- **Estimated cost**: $0.018830 (local-openrouter-estimate)

## Article Summary
The article argues that large language models are fundamentally pattern-matching engines rather than computational tools, making them inherently unreliable for mathematical tasks despite their fluency in natural language. Rather than waiting for improved model reasoning, developers should offload calculations to dedicated symbolic math engines via structured tool calling. Using the AI SDK and CortexJS Compute Engine, the author provides a TypeScript tutorial demonstrating how to batch expressions, enforce explicit tool routing, and implement robust error handling. Targeted at AI application developers, the piece maintains a pragmatic, tutorial-driven tone while framing the LLM-math mismatch as a fundamental architectural flaw—likened to asking a gymnast to balance a checkbook—that is best resolved through a clear separation of natural language generation and symbolic computation.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1264 | 0 | 0 | 7151 | 39674 | $0.007341 |
| 2 | 1705 | 0 | 0 | 5024 | 25086 | $0.005280 |
| 3 | 1262 | 0 | 0 | 3978 | 18259 | $0.004167 |
| 4 | 984 | 0 | 0 | 1895 | 9388 | $0.002043 |
