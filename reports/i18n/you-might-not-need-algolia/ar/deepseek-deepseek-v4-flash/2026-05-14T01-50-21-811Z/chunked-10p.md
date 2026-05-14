# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 4802
- **Total output tokens**: 3710
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 21502ms
- **Estimated cost**: $0.001606 (local-openrouter-estimate)

## Article Summary
This article argues that many teams prematurely adopt hosted search services like Algolia for static content sites, when a simpler, build-time solution like Pagefind often suffices. The core thesis is that if your searchable content is generated at build time (e.g., blogs, documentation), Pagefind’s static index—built from already-shipped HTML—avoids the operational complexity of maintaining a separate, synchronized search system. The tone is a pragmatic, analysis-driven guide, not a rant, using the recurring metaphor of “infrastructure cosplay” to describe unnecessary complexity. The intended audience is developers and technical decision-makers evaluating search for content-heavy sites, with the key decision rule: start with Pagefind unless live writes, permissions, or custom ranking require a live index.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1126 | 0 | 0 | 1079 | 6552 | $0.000460 |
| 2 | 1332 | 384 | 0 | 1484 | 7812 | $0.000549 |
| 3 | 1291 | 0 | 0 | 804 | 4711 | $0.000406 |
| 4 | 1053 | 384 | 0 | 343 | 2427 | $0.000191 |
