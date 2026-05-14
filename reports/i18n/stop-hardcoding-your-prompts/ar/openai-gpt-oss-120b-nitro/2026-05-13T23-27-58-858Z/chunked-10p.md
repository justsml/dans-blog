# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 5
- **Total input tokens**: 7315
- **Total output tokens**: 3147
- **Cache read tokens**: 2304
- **Cache write tokens**: 0
- **Total duration**: 9792ms
- **Estimated cost**: $0.000852 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that embedding LLM prompts directly as raw strings in application code is a hidden, brittle form of configuration that leads to maintenance nightmares and security risks such as prompt injection. It advocates treating prompts as first‑class, typed configuration—validated with schemas, composed from reusable sections, and kept separate from user data—so they can be versioned, tested, and reasoned about like any other code. The piece demonstrates three concrete patterns: (1) Typed prompt templates using libraries like Zod to enforce contracts; (2) Composable prompt sections with a builder that orders and conditionally includes named blocks; and (3) Separating system instructions from user‑supplied data by using the native message‑array format of LLM APIs. The tone is a pragmatic tutorial‑style rant aimed at developers building LLM‑powered products, using the metaphor of “buried prompts” as invisible load‑bearing strings that should be surfaced and managed like regular code.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1195 | 0 | 0 | 400 | 1185 | $0.000119 |
| 2 | 1406 | 512 | 0 | 622 | 1683 | $0.000167 |
| 3 | 1841 | 768 | 0 | 1048 | 2770 | $0.000260 |
| 4 | 1507 | 512 | 0 | 560 | 1832 | $0.000160 |
| 5 | 1366 | 512 | 0 | 517 | 2322 | $0.000146 |
