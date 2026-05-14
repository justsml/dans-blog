# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 5
- **Total input tokens**: 7599
- **Total output tokens**: 3193
- **Cache read tokens**: 2816
- **Cache write tokens**: 0
- **Total duration**: 9415ms
- **Estimated cost**: $0.000871 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that embedding LLM prompts directly as raw strings in application code is a hidden, brittle form of configuration that leads to maintenance, testing, and security problems. It frames prompts as “system architecture” and warns that unchecked string interpolation creates prompt‑injection vulnerabilities much like SQL‑injection. To fix this, the author proposes three concrete patterns aimed at developers building AI‑enabled services: (1) **Typed Prompt Templates** – define a schema (e.g., with Zod) for all prompt variables, validate them, and generate the prompt in a single function; (2) **Composable Prompt Sections** – break a prompt into named, prioritized pieces that can be conditionally assembled, making each piece searchable, testable, and version‑controlled; (3) **Separate Instructions from Data** – use the chat‑message format (system/user roles) instead of a monolithic string, keeping model instructions distinct from user‑supplied content to mitigate injection. The tone is a pragmatic tutorial‑style rant, using the metaphor of “buried prompts” as invisible load‑bearing code, and it targets software engineers and product teams who integrate LLMs into production systems.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1241 | 512 | 0 | 437 | 1978 | $0.000127 |
| 2 | 1473 | 512 | 0 | 520 | 1388 | $0.000151 |
| 3 | 1887 | 512 | 0 | 1099 | 2836 | $0.000271 |
| 4 | 1567 | 768 | 0 | 598 | 1881 | $0.000169 |
| 5 | 1431 | 512 | 0 | 539 | 1332 | $0.000153 |
