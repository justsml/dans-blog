# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 3520
- **Total output tokens**: 1817
- **Cache read tokens**: 512
- **Cache write tokens**: 0
- **Total duration**: 4366ms
- **Estimated cost**: $0.000464 (local-openrouter-estimate)

## Article Summary
The article argues that large language models (LLMs) should not be asked to perform raw arithmetic because they are pattern‑matching generators, not symbolic calculators; even advanced models can confidently produce large numerical errors. It proposes a practical solution: integrate a dedicated math‑tool (e.g., a symbolic compute engine accessed via modern AI SDK tool‑calling) that the LLM invokes whenever a calculation is required, ensuring accurate results while letting the model handle natural‑language framing. The piece includes concrete TypeScript examples using the Vercel AI SDK, Anthropic models, and CortexJS Compute Engine, and emphasizes prompt engineering (e.g., “MUST be used”) and batch processing for efficiency. Intended for developers and AI practitioners building LLM‑augmented applications, the tone is a hands‑on tutorial with a mildly ranting edge about the misuse of LLMs for math.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1866 | 0 | 0 | 1160 | 2763 | $0.000282 |
| 2 | 1654 | 512 | 0 | 657 | 1603 | $0.000183 |
