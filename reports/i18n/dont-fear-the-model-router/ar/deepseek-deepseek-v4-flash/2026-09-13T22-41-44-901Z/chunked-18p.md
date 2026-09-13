# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 5
- **Total input tokens**: 11955
- **Total output tokens**: 15970
- **Cache read tokens**: 4096
- **Cache write tokens**: 0
- **Total duration**: 130375ms
- **Estimated cost**: $0.001867 (openrouter-2026-09-13)

## Article Summary
This tutorial-style article for developers building LLM agents extends the author's earlier "Don't Marry Your Model" argument—use cheap models for cheap work, strong models for hard work—by insisting that adding a router creates a new system behavior that must itself be tested. The core thesis is that the router is "a hypothesis about how your system should behave," not an answer, and that a router without measurement is "vibes with a dispatch table." Using Mastra's evaluation infrastructure (scorers, `runEvals`, datasets, experiments), the author demonstrates how to make routing decisions scorable via a structured JSON contract (route, confidence, reason) and test them across four axes: quality, cost, speed, and safety/privacy/observability. Recurring framing devices include the visible "paragraph" vs. the hidden "trajectory" where bugs live, and the preference for "boring seams"—deterministic, function-based scorers over LLM judges—as the most reliable way to catch mundane production failures.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1922 | 0 | 0 | 6199 | 49974 | $0.000654 |
| 2 | 3113 | 1024 | 0 | 2753 | 22296 | $0.000361 |
| 3 | 2866 | 1024 | 0 | 3380 | 26740 | $0.000406 |
| 4 | 2090 | 1024 | 0 | 1979 | 17291 | $0.000241 |
| 5 | 1964 | 1024 | 0 | 1659 | 14074 | $0.000206 |
