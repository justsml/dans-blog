# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 5
- **Total input tokens**: 12968
- **Total output tokens**: 7317
- **Cache read tokens**: 6144
- **Cache write tokens**: 0
- **Total duration**: 5969ms
- **Estimated cost**: $0.001823 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that adding a model‑router is not a cure‑all; it creates a new system behavior that must be rigorously tested. Building on the earlier “Don’t Marry Your Model” post, the author shows how Mastra’s evaluation tools (scorers, `runEvals`, datasets, experiments) let developers turn the router’s routing hypothesis into measurable checks. The core thesis is to evaluate the router itself along four axes—quality, cost, speed, and safety—by exposing its decision (route, confidence, reason) as a structured JSON payload and writing lightweight scorers that verify correct routing, cost avoidance, latency, and compliance. The piece is a tutorial‑style guide aimed at engineers and ML practitioners who are implementing multi‑model routing pipelines and need concrete, test‑driven methods to ensure the router behaves as intended. Recurring metaphors frame the router as a “hypothesis” or “dispatch table” that must be turned into observable evidence rather than left to “vibes.”

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2087 | 1024 | 0 | 1014 | 1054 | $0.000264 |
| 2 | 3358 | 1280 | 0 | 2147 | 1624 | $0.000517 |
| 3 | 2787 | 1280 | 0 | 1514 | 1120 | $0.000381 |
| 4 | 2573 | 1280 | 0 | 1511 | 1133 | $0.000372 |
| 5 | 2163 | 1280 | 0 | 1131 | 1038 | $0.000288 |
