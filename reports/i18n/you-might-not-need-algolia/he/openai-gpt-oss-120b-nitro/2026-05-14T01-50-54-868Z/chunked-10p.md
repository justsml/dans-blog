# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5116
- **Total output tokens**: 2089
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 4103ms
- **Estimated cost**: $0.000576 (local-openrouter-estimate)

## Article Summary
The articleargues that before reaching for a hosted search service like Algolia, teams should first ask whether their search index can be rebuilt from the static HTML they already generate. For sites whose searchable content is produced at build time—blogs, docs, marketing pages, internal handbooks, and many “app” pages—the author recommends Pagefind, a static‑site search tool that indexes the final HTML and ships the index as CDN‑hosted assets, eliminating the need for a separate search server and its synchronization headaches. Algolia (or similar live‑search systems) remains appropriate only when the index must change independently of deployments, such as for live inventory, per‑user permissions, custom ranking, federated sources, or analytics. The tone is a pragmatic tutorial/analysis, using the metaphor of “extra system” versus “single artifact” to frame the decision‑making process. The intended audience is developers and product teams evaluating search solutions for static or content‑driven sites.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1205 | 512 | 0 | 519 | 1766 | $0.000140 |
| 2 | 1402 | 768 | 0 | 730 | 845 | $0.000186 |
| 3 | 1375 | 768 | 0 | 649 | 780 | $0.000170 |
| 4 | 1134 | 0 | 0 | 191 | 712 | $0.000079 |
