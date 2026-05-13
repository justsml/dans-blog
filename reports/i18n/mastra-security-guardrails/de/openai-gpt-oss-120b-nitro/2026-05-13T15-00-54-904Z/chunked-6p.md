# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6728
- **Total output tokens**: 2378
- **Cache read tokens**: 3328
- **Cache write tokens**: 0
- **Total duration**: 4998ms
- **Estimated cost**: $0.000690 (local-openrouter-estimate)

## Article Summary
The article argues that deploying large‑language‑model (LLM) applications without built‑in safety mechanisms is a hidden risk: raw models obey any prompt, so “demo‑ready” code quickly becomes unsafe in production. It frames the problem as a gap between functional prototypes and real‑world guardrails, using the metaphor of a “fortress” where processors act as middleware that inspect, modify, or block inputs and outputs. The piece introduces Mastra’s architecture—input and output processors such as Unicode normalizers, PromptInjectionDetector, PIIDetector, and ModerationProcessor—that provide configurable, layered defenses against prompt injection, PII leakage, and harmful content. Written in an analytical‑tutorial tone for engineers and product teams building AI‑powered services, it showcases concrete TypeScript examples and emphasizes that safety should be baked into the agent design rather than added as an afterthought.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 945 | 384 | 0 | 284 | 353 | $0.000088 |
| 2 | 1266 | 640 | 0 | 545 | 533 | $0.000147 |
| 3 | 1258 | 640 | 0 | 460 | 1066 | $0.000132 |
| 4 | 1236 | 640 | 0 | 529 | 384 | $0.000143 |
| 5 | 1102 | 640 | 0 | 296 | 509 | $0.000096 |
| 6 | 921 | 384 | 0 | 264 | 2153 | $0.000083 |
