# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6955
- **Total output tokens**: 2132
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 8443ms
- **Estimated cost**: $0.000655 (local-openrouter-estimate)

## Article Summary
**Summary for “Stop Asking LLMs to Do Math”**

The article argues that large language models (LLMs) are fundamentally pattern‑matchers, not calculators, so asking them to perform arithmetic or symbolic math leads to confident but often incorrect answers. The author demonstrates this failure with a real‑world example (a mortgage‑payment miscalculation) and explains why even future, more “reasoning‑capable” models will still rely on probabilistic token prediction rather than true computation.  

To solve the problem, the piece advocates a tool‑calling architecture: keep the LLM for natural‑language handling but delegate every mathematical operation to an external symbolic engine (e.g., CortexJS Compute Engine) via the AI SDK’s tool‑routing features. A concise TypeScript example shows how to define a “mathTool” that parses LaTeX or plain expressions, evaluates them accurately, batches requests, and returns per‑expression results or errors.  

The intended audience is developers and AI engineers who build applications that combine LLMs with reliable back‑ends. The tone is a pragmatic tutorial mixed with a mild rant about misuse of LLMs, using the recurring metaphor of “asking a gymnast to balance your checkbook” to frame the mismatch between language modeling and computation.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1089 | 256 | 0 | 409 | 2899 | $0.000116 |
| 2 | 1129 | 256 | 0 | 314 | 866 | $0.000101 |
| 3 | 1423 | 0 | 0 | 593 | 1477 | $0.000162 |
| 4 | 1159 | 256 | 0 | 318 | 908 | $0.000102 |
| 5 | 1159 | 0 | 0 | 347 | 1266 | $0.000108 |
| 6 | 996 | 0 | 0 | 151 | 1027 | $0.000066 |
