# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 3
- **Total input tokens**: 3894
- **Total output tokens**: 1744
- **Cache read tokens**: 1280
- **Cache write tokens**: 0
- **Total duration**: 1454ms
- **Estimated cost**: $0.000466 (local-openrouter-estimate)

## Article Summary
The article argues that engineering teams should stop “marrying” a single LLM for all tasks and instead route each request to the model that best fits the specific workload. It introduces Mastra, a lightweight routing framework that lets you define specialist agents (e.g., a code‑focused Claude model, a long‑context Gemini model, and a cheap general‑purpose GPT model) and a cheap router agent that dispatches work to the appropriate specialist, yielding lower costs, higher quality, and resilience to provider outages. The tone is a pragmatic tutorial‑style rant, using the metaphor of hiring different specialists for different jobs, and it targets developers and AI product teams who manage LLM‑driven services.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1457 | 0 | 0 | 733 | 650 | $0.000189 |
| 2 | 1451 | 640 | 0 | 704 | 508 | $0.000183 |
| 3 | 986 | 640 | 0 | 307 | 296 | $0.000094 |
