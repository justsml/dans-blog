# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 7
- **Total input tokens**: 8298
- **Total output tokens**: 3114
- **Cache read tokens**: 3968
- **Cache write tokens**: 0
- **Total duration**: 3966ms
- **Estimated cost**: $0.000884 (local-openrouter-estimate)

## Article Summary
The article argues that trying to make large language models (LLMs) execute deterministic business processes directly—as “flaky agents” that call tools step‑by‑step—is fundamentally unreliable; instead, developers should separate hard, rule‑based logic into explicit workflows and reserve the LLM only for the creative or interpretive parts. It illustrates this with a TypeScript example (Mastra’s `activityPlannerWorkflow`) that fetches weather data via a deterministic step and then hands the factual result to a GPT‑5‑based agent to generate activity suggestions, showing how strict ordering, observability, retries, and memory management become easier with workflows. The tone is a pragmatic tutorial‑style rant, using the metaphor of “thinking vs. obeying” to frame the shift from probabilistic model control to deterministic orchestration, and it targets engineers building AI‑augmented products, especially those integrating LLMs into business logic or chatbot pipelines.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 899 | 384 | 0 | 288 | 317 | $0.000087 |
| 2 | 1088 | 640 | 0 | 309 | 531 | $0.000098 |
| 3 | 1656 | 384 | 0 | 930 | 553 | $0.000232 |
| 4 | 1313 | 640 | 0 | 485 | 597 | $0.000139 |
| 5 | 1113 | 640 | 0 | 307 | 368 | $0.000099 |
| 6 | 1201 | 640 | 0 | 464 | 900 | $0.000130 |
| 7 | 1028 | 640 | 0 | 331 | 700 | $0.000100 |
