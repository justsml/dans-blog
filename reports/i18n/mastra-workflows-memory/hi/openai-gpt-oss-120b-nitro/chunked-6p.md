# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 7
- **Total input tokens**: 8549
- **Total output tokens**: 3369
- **Cache read tokens**: 2176
- **Cache write tokens**: 0
- **Total duration**: 8980ms
- **Estimated cost**: $0.000940 (local-openrouter-estimate)

## Article Summary
The article argues that trying to make large language models (LLMs) execute deterministic business processes directly—as “flaky agents” that call tools step‑by‑step—inevitably fails because probabilistic models excel at reasoning but not at rigid recipes. Instead, developers should separate deterministic logic into explicit workflows (with retry, logging, and ordering guarantees) and reserve the LLM’s creativity for the parts that truly need it, as illustrated by a TypeScript example that fetches weather data via a workflow step and then uses an agent only to generate activity suggestions. The piece is written in a pragmatic, tutorial‑style tone, peppered with metaphors of “thinking vs. obeying” and “lost in the middle” to highlight the mismatch between probabilistic reasoning and deterministic requirements. It targets engineers building AI‑augmented applications, especially those who are currently wiring LLMs as autonomous agents for tasks like refunds or support ticket handling.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 901 | 256 | 0 | 350 | 1097 | $0.000098 |
| 2 | 1133 | 256 | 0 | 336 | 957 | $0.000105 |
| 3 | 1689 | 256 | 0 | 937 | 2423 | $0.000235 |
| 4 | 1360 | 256 | 0 | 530 | 1663 | $0.000148 |
| 5 | 1142 | 512 | 0 | 389 | 1194 | $0.000115 |
| 6 | 1244 | 384 | 0 | 515 | 497 | $0.000141 |
| 7 | 1080 | 256 | 0 | 312 | 1149 | $0.000098 |
