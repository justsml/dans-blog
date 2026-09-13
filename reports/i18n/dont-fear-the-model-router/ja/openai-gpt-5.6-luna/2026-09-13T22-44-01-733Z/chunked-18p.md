# Chunked Translation Report

- **Model**: openai/gpt-5.6-luna
- **Chunk size**: 18p
- **Total chunks**: 5
- **Total input tokens**: 12409
- **Total output tokens**: 6720
- **Cache read tokens**: 4924
- **Cache write tokens**: 7470
- **Total duration**: 48070ms
- **Estimated cost**: $0.009659 (openrouter-2026-09-13)

## Article Summary
The article argues that adding a model router is not enough: routing becomes a new system behavior that must be evaluated for correct route selection, tool use, evidence preservation, stopping behavior, quality, cost, speed, and safety. It presents Mastra’s scorers, `runEvals`, datasets, and experiments as infrastructure for making routing hypotheses observable and testable, emphasizing explicit structured decisions such as `route`, `confidence`, and `reason`. The excerpt uses a practical tutorial/analysis tone, with TypeScript examples and specialist routes for `code`, `long-context`, and `general` tasks; it favors deterministic scorers for simple failures before using LLM judges. Its recurring framing is that the router is a hypothesis—not an answer—and that final prose can hide bugs in the agent’s underlying trajectory.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1973 | 0 | 1970 | 1125 | 8614 | $0.001745 |
| 2 | 3278 | 1231 | 2044 | 1889 | 11890 | $0.002701 |
| 3 | 2971 | 1231 | 1737 | 1615 | 9948 | $0.002311 |
| 4 | 2150 | 1231 | 916 | 1122 | 8949 | $0.001555 |
| 5 | 2037 | 1231 | 803 | 969 | 8669 | $0.001349 |
