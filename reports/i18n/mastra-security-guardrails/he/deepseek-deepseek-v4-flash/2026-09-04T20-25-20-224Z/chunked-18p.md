# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4650
- **Total output tokens**: 9104
- **Cache read tokens**: 1792
- **Cache write tokens**: 0
- **Total duration**: 76694ms
- **Estimated cost**: $0.002954 (local-openrouter-estimate)

## Article Summary
The article argues that the gap between demo-quality AI and production-safe systems is dangerously wide, because raw LLMs lack inherent safety constraints and can be tricked by prompt injections, PII leaks, or harmful outputs. It presents Mastra’s processor-based architecture as a solution: input and output processors act as guardrails (like middleware) to detect and block threats before and after model inference. Specific technologies include `UnicodeNormalizer`, `PromptInjectionDetector`, `PIIDetector`, and `ModerationProcessor`, each configurable with thresholds and strategies (block, redact, warn). The tone is a practical tutorial paired with a cautionary analysis, using metaphors like "pirates" for injection attacks and "middleware" for processors. The intended audience is developers building AI agents who need ready-made safety layers.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2367 | 768 | 0 | 3236 | 27916 | $0.001132 |
| 2 | 2283 | 1024 | 0 | 5868 | 48778 | $0.001822 |
