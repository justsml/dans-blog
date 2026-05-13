# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 7
- **Total input tokens**: 9405
- **Total output tokens**: 3668
- **Cache read tokens**: 1920
- **Cache write tokens**: 0
- **Total duration**: 10769ms
- **Estimated cost**: $0.001027 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that trying to make large language models (LLMs) execute deterministic business processes directly is a recipe for flaky agents; instead, developers should separate hard‑coded, order‑sensitive logic into explicit workflows and reserve the LLM’s creative abilities for tasks that benefit from nuance. It illustrates this with a TypeScript example using Mastra’s `createWorkflow` and `createStep` APIs: a deterministic step fetches weather data, then an LLM‑driven agent suggests activities, showing how the model never touches the API call itself. The piece also warns about context‑window bloat (“lost in the middle”) and promotes Mastra’s memory system to keep recent “working memory” while querying long‑term storage when needed. The tone is a pragmatic tutorial with occasional rant‑like commentary, aimed at engineers building LLM‑powered agents, especially those handling customer‑service or other business‑critical workflows.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 892 | 0 | 0 | 340 | 1934 | $0.000096 |
| 2 | 1295 | 384 | 0 | 418 | 492 | $0.000126 |
| 3 | 1860 | 256 | 0 | 974 | 2589 | $0.000248 |
| 4 | 1541 | 256 | 0 | 581 | 2115 | $0.000165 |
| 5 | 1194 | 256 | 0 | 409 | 1185 | $0.000120 |
| 6 | 1399 | 512 | 0 | 576 | 1373 | $0.000158 |
| 7 | 1224 | 256 | 0 | 370 | 1081 | $0.000114 |
