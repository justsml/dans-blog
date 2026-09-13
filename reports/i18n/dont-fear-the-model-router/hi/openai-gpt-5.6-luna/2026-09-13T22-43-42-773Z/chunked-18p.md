# Chunked Translation Report

- **Model**: openai/gpt-5.6-luna
- **Chunk size**: 18p
- **Total chunks**: 5
- **Total input tokens**: 11213
- **Total output tokens**: 5666
- **Cache read tokens**: 4296
- **Cache write tokens**: 6902
- **Total duration**: 39718ms
- **Estimated cost**: $0.008269 (openrouter-2026-09-13)

## Article Summary
The article argues that model routing is not merely a provider-selection mechanism but a testable hypothesis about system behavior: the right route, tools, evidence, cost, latency, and stopping point must all be evaluated. Using Mastra technologies such as `scorers`, `runEvals`, datasets, and experiments, it presents a tutorial-like approach to testing specialist routes (`code`, `long-context`, and `general`) with explicit structured decisions and deterministic scorers. Its central framing contrasts visible answer quality with the hidden “trajectory” where routing and agent failures occur, warning that an unmeasured router is “vibes with a dispatch table.” The intended audience is developers building production agent systems who need provider flexibility and evidence-based evaluation rather than attachment to a single model.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1815 | 0 | 1812 | 972 | 7442 | $0.001529 |
| 2 | 2940 | 1074 | 1863 | 1751 | 11249 | $0.002496 |
| 3 | 2669 | 1074 | 1592 | 1439 | 9461 | $0.002067 |
| 4 | 1968 | 1074 | 891 | 801 | 5897 | $0.001161 |
| 5 | 1821 | 1074 | 744 | 703 | 5669 | $0.001014 |
