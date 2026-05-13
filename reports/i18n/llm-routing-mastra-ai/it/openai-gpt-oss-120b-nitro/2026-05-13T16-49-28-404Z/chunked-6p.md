# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 4
- **Total input tokens**: 4501
- **Total output tokens**: 1710
- **Cache read tokens**: 1792
- **Cache write tokens**: 0
- **Total duration**: 4181ms
- **Estimated cost**: $0.000483 (local-openrouter-estimate)

## Article Summary
The article argues that engineering teams should stop “marrying” a single LLM for all tasks and instead route each request to the model that best fits the specific workload. It introduces Mastra, a lightweight routing framework that lets you define specialist agents (e.g., a code‑focused Claude model, a long‑context Gemini model, and a cheap general‑purpose GPT model) and a cheap router agent that dispatches work to the appropriate specialist, yielding lower costs, higher quality, and resilience to provider outages. The piece is written as a practical, tutorial‑style rant aimed at developers and AI product teams who manage LLM‑powered services, using the metaphor of hiring different specialists rather than a one‑size‑fits‑all employee.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 984 | 384 | 0 | 386 | 3012 | $0.000108 |
| 2 | 1478 | 384 | 0 | 760 | 546 | $0.000194 |
| 3 | 1109 | 512 | 0 | 393 | 349 | $0.000114 |
| 4 | 930 | 512 | 0 | 171 | 274 | $0.000067 |
