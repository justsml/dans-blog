# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6912
- **Total output tokens**: 2331
- **Cache read tokens**: 2176
- **Cache write tokens**: 0
- **Total duration**: 4291ms
- **Estimated cost**: $0.000689 (local-openrouter-estimate)

## Article Summary
**Summary for “Stop Asking LLMs to Do Math”**

The article argues that large language models (LLMs) are fundamentally pattern‑matchers, not calculators, so expecting them to perform reliable arithmetic or symbolic math leads to confident but often wrong answers. The author illustrates this with a real‑world failure (a mortgage‑payment calculation off by $400) and explains that even as LLMs improve their reasoning, they still lack true symbolic computation. The proposed solution is to augment LLMs with external “math tools”—specifically a symbolic compute engine accessed via modern AI SDKs (e.g., Vercel’s AI SDK v5/v6 paired with CortexJS Compute Engine). By defining a tool with a strict description (“MUST be used for all mathematical operations”) and batching expressions, the model can delegate any numeric or algebraic task to the engine, preserving its natural‑language strengths while guaranteeing mathematical accuracy.  

*Intended audience*: developers and AI engineers building applications that combine LLMs with reliable computation.  
*Tone*: pragmatic tutorial‑style with a mildly ranting edge, using the metaphor of asking a gymnast to balance a checkbook to highlight the mismatch between LLMs and calculators.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1078 | 384 | 0 | 472 | 534 | $0.000127 |
| 2 | 1113 | 640 | 0 | 330 | 333 | $0.000103 |
| 3 | 1416 | 640 | 0 | 663 | 488 | $0.000175 |
| 4 | 1158 | 256 | 0 | 319 | 1332 | $0.000103 |
| 5 | 1157 | 256 | 0 | 354 | 973 | $0.000109 |
| 6 | 990 | 0 | 0 | 193 | 631 | $0.000073 |
