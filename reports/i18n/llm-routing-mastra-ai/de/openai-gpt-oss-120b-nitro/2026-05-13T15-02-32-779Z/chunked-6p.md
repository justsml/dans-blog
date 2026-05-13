# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 4
- **Total input tokens**: 4504
- **Total output tokens**: 1699
- **Cache read tokens**: 1920
- **Cache write tokens**: 0
- **Total duration**: 2256ms
- **Estimated cost**: $0.000481 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that engineering teams should stop “marrying” a single large‑language model for all tasks and instead route each request to the model that best fits the specific workload. It introduces Mastra, a lightweight routing framework that lets you define specialist agents (e.g., a code‑focused Claude model, a long‑context Gemini model, and a cheap general‑purpose GPT model) and a cheap router agent that decides which specialist to invoke. By delegating work this way you gain substantial cost savings, higher quality outputs, and resilience to provider outages, without scattering routing logic throughout the codebase. The piece is written as a practical, tutorial‑style analysis aimed at developers and AI‑ops engineers who build production LLM‑powered applications.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 989 | 384 | 0 | 379 | 503 | $0.000107 |
| 2 | 1475 | 512 | 0 | 767 | 498 | $0.000196 |
| 3 | 1109 | 512 | 0 | 380 | 400 | $0.000112 |
| 4 | 931 | 512 | 0 | 173 | 855 | $0.000067 |
