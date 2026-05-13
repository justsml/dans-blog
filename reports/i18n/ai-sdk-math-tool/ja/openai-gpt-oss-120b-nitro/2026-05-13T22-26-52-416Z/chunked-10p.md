# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5856
- **Total output tokens**: 2669
- **Cache read tokens**: 1536
- **Cache write tokens**: 0
- **Total duration**: 2605ms
- **Estimated cost**: $0.000709 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that large language models (LLMs) are fundamentally pattern‑matchers, not calculators, so asking them to perform arithmetic or symbolic math leads to unreliable, often confidently wrong answers. The author proposes a pragmatic solution: instead of waiting for “smarter” models, integrate a dedicated math tool (e.g., a symbolic compute engine accessed via tool‑calling in modern AI SDKs) and explicitly instruct the LLM to invoke it whenever a calculation is required. The piece includes a concise TypeScript example showing how to define a `mathTool` with a strict description, batch‑process expressions, and handle errors, then demonstrates its use with Claude‑Sonnet‑4‑5 to solve a multi‑step problem. The tone is a mix of technical tutorial and mild rant, using the metaphor of “asking a gymnast to balance your checkbook” to illustrate the mismatch between LLM capabilities and numeric computation. The intended audience is developers and AI engineers who build applications that combine LLMs with external tools for reliable mathematical reasoning.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1320 | 0 | 0 | 897 | 903 | $0.000213 |
| 2 | 1883 | 768 | 0 | 969 | 699 | $0.000248 |
| 3 | 1384 | 768 | 0 | 630 | 648 | $0.000167 |
| 4 | 1269 | 0 | 0 | 173 | 355 | $0.000081 |
