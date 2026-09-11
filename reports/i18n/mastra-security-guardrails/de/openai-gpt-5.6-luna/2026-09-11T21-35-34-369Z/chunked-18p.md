# Chunked Translation Report

- **Model**: openai/gpt-5.6-luna
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4345
- **Total output tokens**: 2323
- **Cache read tokens**: 1063
- **Cache write tokens**: 3276
- **Total duration**: 20688ms
- **Estimated cost**: $0.003465 (local-openrouter-estimate)

## Article Summary
The article argues that moving an LLM agent from a successful demo to safe production requires explicit, architectural guardrails because raw language models will follow manipulative or unsafe prompts by default. It presents Mastra’s processor framework as middleware for AI, using input and output processors such as `UnicodeNormalizer`, `PromptInjectionDetector`, `PIIDetector`, `ModerationProcessor`, and `BatchPartsProcessor` to detect, redact, block, or rewrite risky content. The piece is a practical, tutorial-style guide aimed at developers and AI teams deploying production agents, while using a mildly alarmist framing—“pirates,” “fortresses,” and the gap between demos and production—to emphasize evolving threats and operational risks.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2240 | 0 | 2237 | 1284 | 10392 | $0.001989 |
| 2 | 2105 | 1063 | 1039 | 1039 | 10296 | $0.001476 |
