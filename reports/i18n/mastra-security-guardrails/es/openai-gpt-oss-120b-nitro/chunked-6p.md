# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6822
- **Total output tokens**: 2331
- **Cache read tokens**: 1536
- **Cache write tokens**: 0
- **Total duration**: 8089ms
- **Estimated cost**: $0.000686 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that deploying large‑language‑model (LLM) applications without built‑in safety “guardrails” is a recipe for data leaks, prompt‑injection attacks, and regulatory headaches, and that the gap between a demo‑only model and a production‑ready system is far larger than most teams anticipate. It presents Mastra’s “processor” architecture as a concrete solution: middleware‑style input and output processors (e.g., Unicode normalizer, PromptInjectionDetector, PIIDetector, ModerationProcessor) that automatically inspect, modify, or block content before it reaches the model or is stored. Code snippets illustrate how developers can configure detection thresholds, redaction strategies, and category filters to handle pirate‑style jailbreaks, personally identifiable information, and harmful content. The tone is a pragmatic, slightly urgent tutorial‑rant aimed at engineers and product teams building AI‑powered services who need actionable patterns for making LLMs safe in production.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 963 | 256 | 0 | 264 | 1019 | $0.000085 |
| 2 | 1276 | 256 | 0 | 518 | 1480 | $0.000143 |
| 3 | 1272 | 256 | 0 | 446 | 1672 | $0.000130 |
| 4 | 1258 | 256 | 0 | 514 | 1803 | $0.000142 |
| 5 | 1116 | 512 | 0 | 261 | 1100 | $0.000091 |
| 6 | 937 | 0 | 0 | 328 | 1015 | $0.000096 |
