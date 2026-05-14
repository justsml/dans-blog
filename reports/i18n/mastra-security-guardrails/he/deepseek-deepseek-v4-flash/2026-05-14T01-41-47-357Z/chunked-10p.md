# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5504
- **Total output tokens**: 6263
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 38964ms
- **Estimated cost**: $0.002419 (local-openrouter-estimate)

## Article Summary
The article argues that raw LLMs are inherently unsafe in production due to prompt injection, PII leakage, and harmful content, and proposes a solution using Mastra's processor-based middleware architecture. It describes input/output processors (UnicodeNormalizer, PromptInjectionDetector, PIIDetector, ModerationProcessor) that inspect, modify, or block content before and after model inference. The tone is analytical and tutorial, aimed at developers building production AI systems, with a recurring framing of processors as "safety layers" or "middleware for AI interactions." The core thesis is that safety must be built into the agent architecture from the start, not bolted on later.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1104 | 0 | 0 | 1982 | 15716 | $0.000710 |
| 2 | 1956 | 0 | 0 | 2586 | 13496 | $0.000998 |
| 3 | 1375 | 384 | 0 | 1174 | 6415 | $0.000469 |
| 4 | 1069 | 384 | 0 | 521 | 3337 | $0.000243 |
