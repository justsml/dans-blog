# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 3
- **Total input tokens**: 3950
- **Total output tokens**: 1874
- **Cache read tokens**: 1792
- **Cache write tokens**: 0
- **Total duration**: 2263ms
- **Estimated cost**: $0.000491 (local-openrouter-estimate)

## Article Summary
The article argues that engineering teams should stop “marrying” a single LLM for all tasks and instead route each request to the model that best fits the specific workload. It introduces Mastra, a lightweight routing framework that lets you define specialist agents (e.g., a code‑focused Claude model, a long‑context Gemini model, and a cheap general‑purpose GPT model) and a cheap router agent that dispatches queries to the appropriate specialist, yielding lower costs, higher quality, and resilience to provider outages. The piece is written as a pragmatic tutorial‑style rant, using the metaphor of hiring different specialists for different jobs, and targets developers and AI product teams who manage LLM‑powered services.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1460 | 512 | 0 | 855 | 820 | $0.000211 |
| 2 | 1481 | 640 | 0 | 774 | 746 | $0.000197 |
| 3 | 1009 | 640 | 0 | 245 | 697 | $0.000083 |
