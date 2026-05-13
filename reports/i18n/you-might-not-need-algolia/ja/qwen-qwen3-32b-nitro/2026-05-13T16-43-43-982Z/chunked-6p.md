# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6331
- **Total output tokens**: 4718
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 41420ms
- **Estimated cost**: $0.001639 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that teams often adopt Algolia prematurely for site search without considering whether their content is static or dynamic. It advocates for **Pagefind** as a simpler, cost-effective alternative for static sites (e.g., blogs, docs, marketing pages) where search indexes are rebuilt on deployment. The core thesis is that **Algolia introduces unnecessary complexity** for static content, as it requires managing synchronization, operational guarantees, and live updates—problems Pagefind avoids by indexing rendered HTML directly. The tone is analytical, comparing the two tools’ architectures and use cases. Key metaphors include “infrastructure cosplay” (over-engineering) and “the villain is adopting a second system before proving the first is insufficient.” The intended audience is developers and technical decision-makers evaluating search solutions for static or content-heavy sites. The article concludes with a decision framework: use **Pagefind for static content** and **Algolia/OpenSearch for dynamic, user-specific, or business-critical needs**.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 904 | 0 | 0 | 961 | 9408 | $0.000303 |
| 2 | 1094 | 0 | 0 | 951 | 9062 | $0.000316 |
| 3 | 1134 | 0 | 0 | 737 | 7130 | $0.000268 |
| 4 | 1154 | 0 | 0 | 628 | 6174 | $0.000243 |
| 5 | 1023 | 0 | 0 | 629 | 1669 | $0.000233 |
| 6 | 1022 | 0 | 0 | 812 | 7977 | $0.000277 |
