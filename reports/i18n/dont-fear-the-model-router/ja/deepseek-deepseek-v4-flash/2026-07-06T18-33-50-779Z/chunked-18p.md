# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 5
- **Total input tokens**: 12787
- **Total output tokens**: 14276
- **Cache read tokens**: 2304
- **Cache write tokens**: 0
- **Total duration**: 152157ms
- **Estimated cost**: $0.005471 (local-openrouter-estimate)

## Article Summary
The article argues that once you introduce a model router, you must test its decisions—not just output quality—or risk operating on “vibes with a dispatch table.” It frames the router as a hypothesis to be validated through structured evals using Mastra tools like scorers, `runEvals`, datasets, and experiments. The author advocates for making the routing decision explicit (e.g., via a JSON contract with route, confidence, and reason) and scoring along four axes: quality, cost, speed, and safety/observability. Practical examples include a `route-accuracy` scorer that parses JSON rather than relying on an LLM judge for deterministic failures. Written in a tutorial/analysis tone with informal metaphors (“scar tissue,” “boring seams”), the piece targets developers building multi-model systems who need to move from ad‑hoc routing to measurable, debuggable behavior.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2041 | 0 | 0 | 4125 | 47053 | $0.001441 |
| 2 | 3315 | 0 | 0 | 3348 | 38577 | $0.001402 |
| 3 | 2759 | 0 | 0 | 1546 | 12917 | $0.000819 |
| 4 | 2541 | 1024 | 0 | 1571 | 12981 | $0.000655 |
| 5 | 2131 | 1280 | 0 | 3686 | 40629 | $0.001155 |
