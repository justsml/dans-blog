# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 3906
- **Total output tokens**: 2220
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 2372ms
- **Estimated cost**: $0.000552 (local-openrouter-estimate)

## Article Summary
The article argues that engineering teams should stop “marrying” a single language model for all AI tasks and instead route each request to the model that best fits the specific workload. It illustrates this with Mastra, a framework that defines specialist agents (e.g., a code‑focused Claude model, a long‑context Gemini model, and a cheap general‑purpose GPT model) and a lightweight supervisor that intelligently delegates work, yielding lower costs, higher quality, and greater resilience to provider outages. The piece is written as a pragmatic tutorial‑style rant, using the metaphor of hiring different specialists for different jobs, and targets developers and AI product teams who manage LLM integrations.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2438 | 0 | 0 | 1853 | 1843 | $0.000429 |
| 2 | 1468 | 1024 | 0 | 367 | 529 | $0.000123 |
