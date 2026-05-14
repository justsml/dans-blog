# Chunked Translation Report

- **Model**: google/gemini-3-flash-preview
- **Chunk size**: 18p
- **Total chunks**: 3
- **Total input tokens**: 5259
- **Total output tokens**: 2784
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 17210ms
- **Estimated cost**: $0.010981 (local-openrouter-estimate)

## Article Summary
This technical analysis argues that prompts should be treated as critical configuration rather than hardcoded string literals. The author contends that "burying" prompts in business logic leads to maintenance debt and security vulnerabilities like prompt injection, drawing a parallel to the risks of unparameterized SQL queries. Intended for software engineers and AI architects, the article advocates for structured patterns such as typed schemas (using Zod), composable prompt builders, and the separation of instructions from data. The tone is prescriptive and cautionary, utilizing metaphors of "load-bearing" architecture and "archaeology" to describe the evolution of unmanaged codebase prompts.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1317 | 0 | 0 | 631 | 4379 | $0.002551 |
| 2 | 2386 | 0 | 0 | 1512 | 8306 | $0.005729 |
| 3 | 1556 | 0 | 0 | 641 | 4525 | $0.002701 |
