# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6017
- **Total output tokens**: 1539
- **Cache read tokens**: 3584
- **Cache write tokens**: 0
- **Total duration**: 3141ms
- **Estimated cost**: $0.000512 (local-openrouter-estimate)

## Article Summary
The articleargues that most teams consider Algolia too late, without first asking whether their search needs can be satisfied by a static‑site index. It proposes a simple decision rule: if the searchable content is generated at build time, use Pagefind—a CLI that scans the already‑rendered HTML, creates a static search index, and ships it alongside the site on a CDN; only turn to Algolia (or another live search service) when the index must change independently of deployments—e.g., for live inventory, per‑user permissions, custom ranking, or analytics. The piece contrasts the operational overhead of maintaining a separate Algolia index (sync failures, ranking ownership, tier limits) with Pagefind’s “no extra system” approach, and provides a brief walkthrough of Pagefind’s setup via CLI or static‑site‑generator plugins. The tone is a pragmatic tutorial‑style analysis aimed at developers and product teams building blogs, docs, marketing sites, or similar content‑driven sites.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 958 | 384 | 0 | 304 | 585 | $0.000092 |
| 2 | 1033 | 640 | 0 | 277 | 502 | $0.000090 |
| 3 | 1035 | 640 | 0 | 258 | 364 | $0.000087 |
| 4 | 1063 | 640 | 0 | 298 | 548 | $0.000095 |
| 5 | 994 | 640 | 0 | 214 | 510 | $0.000077 |
| 6 | 934 | 640 | 0 | 188 | 632 | $0.000070 |
