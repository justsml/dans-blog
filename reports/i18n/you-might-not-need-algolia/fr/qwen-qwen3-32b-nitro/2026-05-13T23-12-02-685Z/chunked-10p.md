# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 4517
- **Total output tokens**: 4343
- **Cache read tokens**: 512
- **Cache write tokens**: 0
- **Total duration**: 10536ms
- **Estimated cost**: $0.001404 (local-openrouter-estimate)

## Article Summary
The article argues that **Pagefind** is often a better fit than **Algolia** for static content sites, emphasizing simplicity over over-engineered solutions. It frames the decision as a choice between *static indexing* (Pagefind, which builds search indexes from deployed HTML) and *live search systems* (Algolia, which requires managing dynamic data, synchronization, and operational complexity). Key metaphors include "infrastructure cosplay" (using hosted services unnecessarily) and "the index follows the artifact" (Pagefind’s alignment with static builds). The tone is analytical and pragmatic, targeting developers and teams building blogs, documentation, or static sites. The core thesis: **start with Pagefind if your search index can be rebuilt from static output; use Algolia only when live data, personalization, or business rules demand it.**

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1092 | 0 | 0 | 1132 | 2892 | $0.000359 |
| 2 | 1233 | 0 | 0 | 1027 | 2629 | $0.000345 |
| 3 | 1204 | 512 | 0 | 1134 | 2535 | $0.000368 |
| 4 | 988 | 0 | 0 | 1050 | 2480 | $0.000331 |
