# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5387
- **Total output tokens**: 7129
- **Cache read tokens**: 1152
- **Cache write tokens**: 0
- **Total duration**: 50351ms
- **Estimated cost**: $0.002592 (local-openrouter-estimate)

## Article Summary
The article argues that production AI systems are inherently unsafe because raw LLMs lack built-in guardrails, making them vulnerable to prompt injection, PII leaks, and harmful outputs. It presents Mastra’s processor-based architecture as a solution, where input and output processors (e.g., UnicodeNormalizer, PromptInjectionDetector, PIIDetector, ModerationProcessor) act as middleware to inspect, modify, or block content. The tone is analytical and tutorial, using the metaphor of “middleware for AI interactions” and framing processors as safety layers. The intended audience is developers building production AI systems who need practical, configurable safety mechanisms.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1093 | 0 | 0 | 1569 | 9220 | $0.000592 |
| 2 | 1908 | 384 | 0 | 3209 | 19617 | $0.001113 |
| 3 | 1343 | 384 | 0 | 2053 | 18320 | $0.000710 |
| 4 | 1043 | 384 | 0 | 298 | 3194 | $0.000177 |
