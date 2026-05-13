# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 5
- **Total input tokens**: 6726
- **Total output tokens**: 8845
- **Cache read tokens**: 384
- **Cache write tokens**: 0
- **Total duration**: 60505ms
- **Estimated cost**: $0.003366 (local-openrouter-estimate)

## Article Summary
The article argues that prompts should be treated as configuration, not buried in code, because raw string interpolation leads to prompt injection and unmanageable system behavior. It presents three patterns—typed prompt templates (using Zod), composable prompt sections (via a `PromptBuilder` class), and separating instructions from data (using structured chat message arrays)—to make prompts typed, testable, and versioned. The tone is a tutorial with analytical warnings, drawing a recurring metaphor that treating user data as trusted prompt content is analogous to SQL injection. The intended audience is developers building production LLM applications who need to manage prompt complexity and security.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1071 | 0 | 0 | 1497 | 8712 | $0.000569 |
| 2 | 1297 | 384 | 0 | 2400 | 19060 | $0.000801 |
| 3 | 1757 | 0 | 0 | 1857 | 11950 | $0.000766 |
| 4 | 1374 | 0 | 0 | 1488 | 12159 | $0.000609 |
| 5 | 1227 | 0 | 0 | 1603 | 8624 | $0.000621 |
