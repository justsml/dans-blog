# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4534
- **Total output tokens**: 7355
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 62008ms
- **Estimated cost**: $0.002554 (local-openrouter-estimate)

## Article Summary
The article argues that production AI systems are inherently unsafe because raw LLMs lack built-in guardrails, making them vulnerable to prompt injection, PII leaks, and harmful content. Its core thesis is that safety must be embedded into agent architecture from the start, not added later—using Mastra's processor-based middleware (e.g., `UnicodeNormalizer`, `PromptInjectionDetector`, `PIIDetector`, `ModerationProcessor`) as safety layers that inspect, modify, or block input/output. The tone is a technical tutorial with code examples, aimed at developers building production AI agents. The recurring framing is "processors as safety layers," analogous to middleware, stacked automatically on every request.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2335 | 0 | 0 | 4559 | 37916 | $0.001603 |
| 2 | 2199 | 1024 | 0 | 2796 | 24092 | $0.000950 |
