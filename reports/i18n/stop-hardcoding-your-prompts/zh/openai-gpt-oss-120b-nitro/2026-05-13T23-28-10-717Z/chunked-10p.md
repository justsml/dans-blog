# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 5
- **Total input tokens**: 7595
- **Total output tokens**: 2873
- **Cache read tokens**: 1536
- **Cache write tokens**: 0
- **Total duration**: 7571ms
- **Estimated cost**: $0.000813 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that embedding LLM prompts as raw string literals inside application code is a hidden, brittle form of configuration that leads to maintenance, testing, and security problems. It frames prompts as “system architecture” and warns that unchecked string interpolation creates prompt‑injection vulnerabilities analogous to SQL injection. To fix this, the author proposes three concrete patterns aimed at developers: (1) **Typed Prompt Templates** – define a schema (e.g., with Zod) for all prompt variables, validate them, and generate the prompt in a single, testable function; (2) **Composable Prompt Sections** – break a prompt into named, prioritized chunks that can be conditionally assembled, making each piece discoverable and unit‑testable; (3) **Separate Instructions From Data** – use the chat‑message format (system/user roles) instead of a monolithic string, keeping model instructions distinct from user‑supplied content to mitigate injection. The tone is a pragmatic, slightly rant‑like tutorial aimed at software engineers building LLM‑powered products, using the metaphor of “buried prompts” as invisible load‑bearing code.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1227 | 512 | 0 | 378 | 1339 | $0.000116 |
| 2 | 1503 | 512 | 0 | 475 | 1174 | $0.000144 |
| 3 | 1873 | 0 | 0 | 1029 | 2465 | $0.000258 |
| 4 | 1572 | 0 | 0 | 492 | 1345 | $0.000150 |
| 5 | 1420 | 512 | 0 | 499 | 1248 | $0.000145 |
