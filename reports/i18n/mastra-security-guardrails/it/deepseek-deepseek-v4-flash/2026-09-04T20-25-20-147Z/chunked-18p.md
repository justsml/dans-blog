# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4557
- **Total output tokens**: 7609
- **Cache read tokens**: 1792
- **Cache write tokens**: 0
- **Total duration**: 62045ms
- **Estimated cost**: $0.002523 (local-openrouter-estimate)

## Article Summary
This article argues that raw LLMs are inherently unsafe for production due to their susceptibility to prompt injection, PII leaks, and harmful output, and presents Mastra’s **processor-based guardrails** as the solution. The tone is a tutorial (with TypeScript examples) and analysis, framing processors as **middleware** that intercept inputs/outputs to detect and block attacks, redact PII, and moderate content. Key technologies include the `UnicodeNormalizer`, `PromptInjectionDetector`, `PIIDetector`, and `ModerationProcessor`. The intended audience is developers building production AI systems who need built-in safety rather than ad-hoc fixes. The recurring metaphor is **“guardrails built into the agent architecture from the start.”**

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2348 | 768 | 0 | 3944 | 31150 | $0.001328 |
| 2 | 2209 | 1024 | 0 | 3665 | 30895 | $0.001195 |
