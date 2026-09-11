# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4590
- **Total output tokens**: 2333
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 1587ms
- **Estimated cost**: $0.000599 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that the transition from “working in a demo” to “safe in production” is far riskier than most AI teams anticipate, because raw LLMs have no built‑in sense of what they should or shouldn’t do and will obey malicious prompts such as pirate‑role‑play or data‑leak attempts. It presents Mastra’s “guardrails‑by‑design” architecture as a solution, treating input and output processors as middleware that can normalize text, detect prompt‑injection, redact PII, and enforce content moderation before the model sees or returns data. Code snippets illustrate three concrete processors—`PromptInjectionDetector`, `PIIDetector`, and `ModerationProcessor`—showing configurable thresholds, strategies (block, warn, redact, etc.), and placement in the request pipeline. The tone is a pragmatic, slightly urgent tutorial aimed at developers and product teams building production‑grade AI assistants who need concrete, plug‑and‑play safety mechanisms.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2364 | 896 | 0 | 1283 | 768 | $0.000323 |
| 2 | 2226 | 1152 | 0 | 1050 | 819 | $0.000276 |
