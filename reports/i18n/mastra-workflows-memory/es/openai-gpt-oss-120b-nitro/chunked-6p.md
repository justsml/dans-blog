# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 7
- **Total input tokens**: 8275
- **Total output tokens**: 2906
- **Cache read tokens**: 4224
- **Cache write tokens**: 0
- **Total duration**: 4437ms
- **Estimated cost**: $0.000846 (local-openrouter-estimate)

## Article Summary
The article argues that trying to make large language models (LLMs) execute deterministic business processes directly—as “flaky agents” that call tools step‑by‑step—fails because probabilistic models will skip, reorder, or hallucinate steps. Instead, developers should separate hard, rule‑based logic into explicit workflows (with retry, logging, and ordering guarantees) and reserve the LLM only for the creative or interpretive parts, using a memory layer to keep recent context while fetching historic data on demand. The piece illustrates this with a TypeScript example that fetches weather data via a deterministic step and then hands the result to an LLM‑driven activity‑planner agent, showing how the pattern avoids “lost‑in‑the‑middle” token waste and improves observability. It is written as a practical tutorial/analysis for engineers building AI‑augmented applications, especially those using Mastra’s workflow and memory framework.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 899 | 384 | 0 | 249 | 392 | $0.000080 |
| 2 | 1081 | 640 | 0 | 301 | 363 | $0.000096 |
| 3 | 1655 | 640 | 0 | 879 | 1219 | $0.000223 |
| 4 | 1308 | 640 | 0 | 464 | 618 | $0.000135 |
| 5 | 1108 | 640 | 0 | 283 | 1067 | $0.000094 |
| 6 | 1194 | 640 | 0 | 433 | 400 | $0.000125 |
| 7 | 1030 | 640 | 0 | 297 | 378 | $0.000094 |
