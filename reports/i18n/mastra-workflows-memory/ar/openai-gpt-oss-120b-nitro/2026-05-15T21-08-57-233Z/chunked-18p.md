# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 3
- **Total input tokens**: 6198
- **Total output tokens**: 2924
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 7551ms
- **Estimated cost**: $0.000768 (local-openrouter-estimate)

## Article Summary
The article argues that trying to make large language models (LLMs) execute deterministic business processes directly is a recipe for flaky agents; instead, developers should separate hard‑coded, ordered logic into traditional workflows and reserve the LLM only for the creative or interpretive parts, using a memory layer for context management. It illustrates this with a TypeScript example from the Mastra framework, showing a two‑step workflow where a weather API fetch is deterministic and an “activity‑planner” agent generates suggestions, and explains why the LLM should never be tasked with the API call itself. The piece is written as a practical tutorial‑style rant aimed at engineers building AI‑augmented agents, repeatedly framing the problem with the metaphor of “thinking vs. obeying” and warning about the hidden cost of sending full conversation histories (the “lost‑in‑the‑middle” issue). The intended audience is software developers and product teams who are integrating LLMs into business‑critical pipelines and need guidance on when to use workflows, retry logic, and structured memory instead of raw prompt engineering.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2365 | 768 | 0 | 1376 | 3420 | $0.000340 |
| 2 | 2277 | 0 | 0 | 1160 | 2711 | $0.000298 |
| 3 | 1556 | 0 | 0 | 388 | 1420 | $0.000131 |
