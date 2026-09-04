# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4885
- **Total output tokens**: 7221
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 57591ms
- **Estimated cost**: $0.002425 (local-openrouter-estimate)

## Article Summary
The article argues that production AI systems are vulnerable to prompt injection, PII leaks, and harmful outputs because raw LLMs lack built-in safety boundaries. As a solution, it presents Mastra's guardrail framework, which enforces safety through configurable input and output processors—such as UnicodeNormalizer, PromptInjectionDetector, PIIDetector, and ModerationProcessor—analogous to middleware layers. The tone is analytical and tutorial, with concrete code examples aimed at developers deploying LLMs in production. A recurring framing describes these processors as "safety layers" that intercept and validate content before and after model inference.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2471 | 1024 | 0 | 3870 | 30857 | $0.001289 |
| 2 | 2414 | 1024 | 0 | 3351 | 26734 | $0.001136 |
