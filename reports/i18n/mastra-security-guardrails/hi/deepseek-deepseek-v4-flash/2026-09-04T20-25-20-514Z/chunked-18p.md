# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4639
- **Total output tokens**: 7041
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 55979ms
- **Estimated cost**: $0.002480 (local-openrouter-estimate)

## Article Summary
The article argues that production AI safety is far more challenging than demo-level testing, as raw LLMs are pattern-completion machines vulnerable to prompt injection, PII leaks, and harmful output. It introduces Mastra’s processor-based framework, which layers input/output guardrails (e.g., `PromptInjectionDetector`, `PIIDetector`, `ModerationProcessor`) onto agents to block, redact, or filter risky content at each stage. The tone is a practical, code-heavy tutorial aimed at developers building production LLM systems, using the recurring metaphor of processors as "middleware for AI interactions" to frame safety as an integral, stackable architecture.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2334 | 0 | 0 | 2788 | 22278 | $0.001107 |
| 2 | 2305 | 1024 | 0 | 4253 | 33701 | $0.001373 |
