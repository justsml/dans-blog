# Chunked Translation Report

- **Model**: openai/gpt-5.6-luna
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4439
- **Total output tokens**: 2578
- **Cache read tokens**: 1084
- **Cache write tokens**: 3349
- **Total duration**: 26872ms
- **Estimated cost**: $0.003786 (local-openrouter-estimate)

## Article Summary
The article argues that moving from an impressive AI demo to a safe production system requires explicit, layered guardrails because raw LLMs merely continue patterns and can be manipulated, leak PII, or generate harmful content. It presents Mastra’s processor-based agent architecture as a solution, using input and output middleware such as `UnicodeNormalizer`, `PromptInjectionDetector`, `PIIDetector`, `ModerationProcessor`, and `BatchPartsProcessor` to inspect, transform, block, or redact content. The piece has a practical, tutorial-like tone with code examples, while framing production AI as a “fortress” that needs defenses against evolving attacks such as pirate roleplay, invisible Unicode, jailbreaks, and sensitive-data leakage. It is aimed at developers and AI teams deploying LLM agents in production.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2262 | 0 | 2259 | 1381 | 14979 | $0.002110 |
| 2 | 2177 | 1084 | 1090 | 1197 | 11893 | $0.001677 |
