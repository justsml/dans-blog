# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5680
- **Total output tokens**: 2397
- **Cache read tokens**: 2304
- **Cache write tokens**: 0
- **Total duration**: 2429ms
- **Estimated cost**: $0.000653 (local-openrouter-estimate)

## Article Summary
The articleargues that deploying large‑language‑model (LLM) applications “as‑is” is dangerously naïve because raw models lack any built‑in sense of safety and are easily subverted by prompt‑injection, PII leakage, or harmful content generation. It frames the problem as a widening gap between demo‑level functionality and production‑grade security, using the metaphor of a “fortress” built with layered guardrails. The core solution presented is Mastra’s processor‑based architecture, which treats input‑ and output‑filters (Unicode normalizer, PromptInjectionDetector, PIIDetector, ModerationProcessor, etc.) as middleware that can inspect, modify, or block requests before they reach the model and after it responds. The tone is a pragmatic, tutorial‑style analysis aimed at engineers and product teams responsible for shipping AI‑powered services, with code snippets illustrating how to configure safety thresholds, redaction strategies, and category‑specific moderation.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1188 | 0 | 0 | 484 | 660 | $0.000133 |
| 2 | 1964 | 768 | 0 | 1086 | 800 | $0.000272 |
| 3 | 1414 | 768 | 0 | 571 | 632 | $0.000158 |
| 4 | 1114 | 768 | 0 | 256 | 337 | $0.000090 |
