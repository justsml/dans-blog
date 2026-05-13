# Chunked Translation Report

- **Model**: qwen/qwen3.6-35b-a3b
- **Chunk size**: 10p
- **Total chunks**: 5
- **Total input tokens**: 6887
- **Total output tokens**: 22668
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 101486ms
- **Estimated cost**: $0.000000 (unknown)

## Article Summary
The article argues that embedding raw prompt strings in application code creates fragile, unversioned, and insecure systems, advocating instead for treating prompts as structured, load-bearing configuration. It highlights how string interpolation enables prompt injection—analogous to SQL injection—and introduces three TypeScript-based engineering patterns to mitigate these risks: schema-validated templates using Zod, composable prompt builders for modular assembly, and strict instruction-data separation via OpenAI/Anthropic API message formats. Targeted at software engineers and AI application developers, the piece maintains a pragmatic, tutorial-style tone while framing prompts as critical infrastructure that demands the same version control, testing, and architectural rigor as traditional code.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1100 | 0 | 0 | 5336 | 23383 | $0.000000 |
| 2 | 1311 | 0 | 0 | 4497 | 19518 | $0.000000 |
| 3 | 1838 | 0 | 0 | 5339 | 23191 | $0.000000 |
| 4 | 1397 | 0 | 0 | 3177 | 15544 | $0.000000 |
| 5 | 1241 | 0 | 0 | 4319 | 19850 | $0.000000 |
