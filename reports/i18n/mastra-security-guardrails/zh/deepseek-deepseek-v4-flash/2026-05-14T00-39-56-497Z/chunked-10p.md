# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5497
- **Total output tokens**: 3657
- **Cache read tokens**: 1152
- **Cache write tokens**: 0
- **Total duration**: 19533ms
- **Estimated cost**: $0.001635 (local-openrouter-estimate)

## Article Summary
The article argues that production AI systems are inherently unsafe because raw LLMs lack built-in guardrails, creating a dangerous gap between demo and deployment. It presents Mastra's processor-based architecture as a solution, using middleware-like input/output processors (UnicodeNormalizer, PromptInjectionDetector, PIIDetector, ModerationProcessor) to catch prompt injection, PII leaks, and harmful content before they reach the model or logs. The tone is a pragmatic tutorial/analysis aimed at developers, framed around the recurring metaphor of "processors as safety layers" that stack like middleware to enforce security without breaking the application.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1090 | 0 | 0 | 497 | 3414 | $0.000292 |
| 2 | 1967 | 384 | 0 | 1046 | 5173 | $0.000516 |
| 3 | 1358 | 384 | 0 | 1811 | 8942 | $0.000645 |
| 4 | 1082 | 384 | 0 | 303 | 2004 | $0.000184 |
