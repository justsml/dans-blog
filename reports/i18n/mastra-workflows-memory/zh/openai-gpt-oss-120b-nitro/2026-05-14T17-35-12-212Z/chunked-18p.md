# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 3
- **Total input tokens**: 5530
- **Total output tokens**: 2669
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 6116ms
- **Estimated cost**: $0.000696 (local-openrouter-estimate)

## Article Summary
The articleargues that trying to make large language models (LLMs) execute deterministic business processes directly—by giving them a long list of steps or “tool‑calling” recipes—leads to flaky, unpredictable agents. Instead, developers should separate deterministic logic into explicit workflows (with ordered steps, retries, observability, and strict rule enforcement) and reserve the LLM’s creative capacity for the parts that truly need it, using a memory system to manage short‑term context versus long‑term recall. The piece illustrates this with a TypeScript example that fetches weather data via a deterministic step and then hands the factual result to an LLM‑driven activity‑planner agent, showing how the model never touches the API itself. The tone is a pragmatic tutorial‑style rant aimed at engineers building AI‑augmented services, especially those who currently rely on “agents” for end‑to‑end processes. Recurring metaphors compare the LLM to a creative thinker who must be told when to “obey” rather than keep “thinking,” and the article frames the problem as a mismatch between probabilistic models and deterministic business rules.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2075 | 512 | 0 | 1281 | 3494 | $0.000312 |
| 2 | 2107 | 0 | 0 | 1059 | 1480 | $0.000273 |
| 3 | 1348 | 512 | 0 | 329 | 1142 | $0.000112 |
