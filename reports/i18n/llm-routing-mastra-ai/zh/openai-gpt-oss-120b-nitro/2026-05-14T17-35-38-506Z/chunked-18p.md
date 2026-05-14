# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 3204
- **Total output tokens**: 1501
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 5047ms
- **Estimated cost**: $0.000395 (local-openrouter-estimate)

## Article Summary
The article argues that engineeringteams should stop “marrying” a single LLM for all tasks and instead route each request to the model that best fits the specific workload. It introduces Mastra, a lightweight routing framework that lets you define specialist agents (e.g., a code‑focused Claude model, a long‑context Gemini model, and a cheap general‑purpose GPT model) and a cheap router agent that delegates work, yielding lower costs, higher quality, and resilience to provider outages. The piece is a practical, tutorial‑style rant aimed at developers and AI product teams who manage LLM integrations, using the metaphor of hiring different specialists rather than a one‑size‑fits‑all employee.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1952 | 512 | 0 | 1308 | 3637 | $0.000312 |
| 2 | 1252 | 512 | 0 | 193 | 1410 | $0.000084 |
