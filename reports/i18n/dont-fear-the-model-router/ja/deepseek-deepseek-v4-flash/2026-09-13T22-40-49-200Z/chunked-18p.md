# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 5
- **Total input tokens**: 13027
- **Total output tokens**: 24797
- **Cache read tokens**: 3072
- **Cache write tokens**: 0
- **Total duration**: 170416ms
- **Estimated cost**: $0.002757 (openrouter-2026-09-13)

## Article Summary
This follow-up to "Don't Marry Your Model" argues that adding a model router creates a new system behavior that must be evaluated: the router is "a hypothesis about how your system should behave," not the answer, and without measurement it's "vibes with a dispatch table." The article is a practical tutorial on Mastra's eval stack (scorers, runEvals, datasets, experiments, createScorer), showing how to expose routing decisions as structured JSON (route, confidence, reason) and score route accuracy with cheap deterministic functions rather than LLM judges. Its central framing is that the final paragraph is only the visible part—"the trajectory is where the bugs live"—so it tests behavior across four axes: quality, cost, speed, and an "Other" category for safety/privacy/observability constraints ("where the production scar tissue lives"). The tone is pragmatic and mildly aphoristic, aimed at LLM application developers who need to test routing decisions, not just final-answer quality.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2067 | 0 | 0 | 1590 | 14260 | $0.000246 |
| 2 | 3374 | 1024 | 0 | 2341 | 19268 | $0.000337 |
| 3 | 3069 | 1024 | 0 | 2262 | 18922 | $0.000315 |
| 4 | 2382 | 0 | 0 | 14506 | 84610 | $0.001425 |
| 5 | 2135 | 1024 | 0 | 4098 | 33356 | $0.000434 |
