# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 5
- **Total input tokens**: 7135
- **Total output tokens**: 2892
- **Cache read tokens**: 2304
- **Cache write tokens**: 0
- **Total duration**: 2080ms
- **Estimated cost**: $0.000799 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that embedding LLM prompts directly as raw strings in application code is a hidden, brittle form of configuration that leads to maintenance chaos and security risks such as prompt injection. It advocates treating prompts as first‑class, typed configuration—validated with schemas, composable from named sections, and kept separate from user data—so they can be versioned, tested, and safely edited. The piece walks through three concrete patterns (typed prompt templates with Zod, a `PromptBuilder` for composable sections, and splitting system instructions from user data using the chat‑message format) and demonstrates how each adds compile‑time contracts, runtime safety, and clearer boundaries. The tone is a pragmatic tutorial‑style rant aimed at developers building AI‑augmented products, especially those using TypeScript/Node.js and OpenAI‑style APIs. Recurring metaphors compare buried prompts to “load‑bearing invisible strings” and liken raw interpolation to unsafe SQL concatenation.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1177 | 0 | 0 | 368 | 351 | $0.000112 |
| 2 | 1374 | 0 | 0 | 510 | 386 | $0.000145 |
| 3 | 1823 | 768 | 0 | 1012 | 578 | $0.000253 |
| 4 | 1452 | 768 | 0 | 524 | 387 | $0.000151 |
| 5 | 1309 | 768 | 0 | 478 | 378 | $0.000137 |
