# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 3
- **Total input tokens**: 4989
- **Total output tokens**: 3619
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 22513ms
- **Estimated cost**: $0.001712 (local-openrouter-estimate)

## Article Summary
The article argues that prompts hidden as raw strings in code become fragile, untestable architecture—using injection risks likened to SQL injection—and advocates treating prompts as typed, validated configuration. It presents three patterns: typed prompt templates (using Zod), composable prompt sections, and separating instructions from data in message arrays. The tone is an analytical tutorial with cautionary framing, targeting developers maintaining LLM-based applications. Recurring metaphors include “load-bearing and invisible” to describe critical yet overlooked prompt code, and comparing prompt injection to classic injection attacks.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1271 | 0 | 0 | 748 | 6832 | $0.000387 |
| 2 | 2238 | 0 | 0 | 1557 | 8129 | $0.000749 |
| 3 | 1480 | 0 | 0 | 1314 | 7552 | $0.000575 |
