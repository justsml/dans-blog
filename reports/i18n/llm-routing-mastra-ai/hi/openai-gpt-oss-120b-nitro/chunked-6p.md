# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 4
- **Total input tokens**: 4570
- **Total output tokens**: 1950
- **Cache read tokens**: 1152
- **Cache write tokens**: 0
- **Total duration**: 7791ms
- **Estimated cost**: $0.000529 (local-openrouter-estimate)

## Article Summary
The article argues that engineering teams should stop “marrying” a single language model for all tasks and instead route each request to the model that best fits its specific workload. It introduces Mastra—a lightweight routing framework that lets you define specialist agents (e.g., a code‑focused Claude model, a long‑context Gemini model, and a cheap general‑purpose GPT model) and a cheap router agent that dispatches queries to the appropriate specialist, yielding lower costs, higher quality, and greater resilience to provider outages. The piece is written as a practical, tutorial‑style rant aimed at developers and AI product teams who manage LLM‑driven services, using the metaphor of a manager delegating work to specialized employees.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 979 | 384 | 0 | 446 | 672 | $0.000118 |
| 2 | 1498 | 256 | 0 | 835 | 3117 | $0.000209 |
| 3 | 1142 | 256 | 0 | 455 | 2836 | $0.000126 |
| 4 | 951 | 256 | 0 | 214 | 1166 | $0.000076 |
