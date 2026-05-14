# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 5
- **Total input tokens**: 7332
- **Total output tokens**: 3021
- **Cache read tokens**: 2560
- **Cache write tokens**: 0
- **Total duration**: 8939ms
- **Estimated cost**: $0.000830 (local-openrouter-estimate)

## Article Summary
The article argues that trying to make large language models (LLMs) execute deterministic business processes directly—by giving them a list of steps or “tool‑calling” prompts—leads to flaky, unpredictable agents, because probabilistic models excel at creative reasoning but not at strict procedural execution. It recommends separating deterministic logic into explicit workflows (with observable, retry‑able steps) and reserving the LLM only for the creative or interpretive parts, illustrating the pattern with a TypeScript example that fetches weather data via a workflow step and then uses an agent to suggest activities. The piece also warns about context‑window misuse, showing how full conversation histories waste tokens and cause “lost‑in‑the‑middle” failures, and introduces Mastra’s memory system that distinguishes working memory from long‑term semantic recall. The tone is a practical tutorial‑style rant aimed at developers and AI product teams building LLM‑powered agents, using the metaphor of “thinking vs. obeying” to frame the shift from creative to deterministic execution.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1200 | 512 | 0 | 485 | 1898 | $0.000134 |
| 2 | 1927 | 512 | 0 | 1019 | 2485 | $0.000259 |
| 3 | 1576 | 512 | 0 | 662 | 2268 | $0.000181 |
| 4 | 1504 | 512 | 0 | 636 | 1556 | $0.000173 |
| 5 | 1125 | 512 | 0 | 219 | 732 | $0.000083 |
