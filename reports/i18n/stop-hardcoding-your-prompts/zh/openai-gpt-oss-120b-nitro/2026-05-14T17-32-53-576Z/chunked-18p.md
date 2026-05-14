# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 3
- **Total input tokens**: 5428
- **Total output tokens**: 2706
- **Cache read tokens**: 512
- **Cache write tokens**: 0
- **Total duration**: 6977ms
- **Estimated cost**: $0.000699 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that embedding LLM prompts directly as raw strings in application code is a hidden, fragile configuration that should be treated like any other runtime‑controlled code. It warns that such “buried” prompts invite bugs, make roll‑backs impossible, and expose the system to prompt‑injection attacks similar to SQL injection when user data is interpolated unchecked. To solve this, the author proposes three concrete patterns: (1) **Typed Prompt Templates** – define a schema (e.g., with Zod) for all prompt variables, validate them, and generate the prompt in a single, testable function; (2) **Composable Prompt Sections** – break a prompt into named, prioritized pieces that can be assembled conditionally, improving readability, versioning, and testability; (3) **Separate Instructions from Data** – use the chat‑message format (system/user roles) instead of a monolithic string, keeping instruction and user‑supplied content distinct to mitigate injection. The tone is a pragmatic tutorial‑style rant, using the metaphor of “prompt as architecture” and comparing raw interpolation to unsafe SQL concatenation. The intended audience is developers building LLM‑powered products who need reliable, maintainable prompt management.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1431 | 0 | 0 | 649 | 1608 | $0.000173 |
| 2 | 2354 | 512 | 0 | 1417 | 3770 | $0.000347 |
| 3 | 1643 | 0 | 0 | 640 | 1599 | $0.000179 |
