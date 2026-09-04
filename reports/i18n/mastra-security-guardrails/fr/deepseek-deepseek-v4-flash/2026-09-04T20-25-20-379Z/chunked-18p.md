# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4533
- **Total output tokens**: 4174
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 37745ms
- **Estimated cost**: $0.001663 (local-openrouter-estimate)

## Article Summary
The article argues that production AI safety is fundamentally harder than demo success, because LLMs lack inherent boundaries and are easily exploited via prompt injection, PII leakage, or harmful output. It presents Mastra’s framework as a solution, using configurable input and output processors (like `UnicodeNormalizer`, `PromptInjectionDetector`, `PIIDetector`, and `ModerationProcessor`) that inspect, modify, or block content as middleware. Written in a tutorial/analysis tone with TypeScript code examples, the piece targets developers building production AI agents and emphasizes pre-built, stackable guardrails rather than post-hoc fixes. The recurring metaphor frames processors as “middleware for AI interactions.”

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2334 | 0 | 0 | 1886 | 16884 | $0.000855 |
| 2 | 2199 | 1024 | 0 | 2288 | 20861 | $0.000808 |
