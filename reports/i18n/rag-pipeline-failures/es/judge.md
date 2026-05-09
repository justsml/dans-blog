# Judge Report

Candidate evaluated:

- `bb802ee8d2b82e55ba3719a63b115395d3e4f3bc` - `i18n candidate(es): rag-pipeline-failures via openrouter/deepseek/deepseek-v4-pro`

## Decision

Selected the DeepSeek candidate.

## Why

- Technical accuracy is strong throughout. The Spanish preserves the RAG-specific distinctions from the source: chunking, stale embeddings, precision vs. recall, context placement, and observability.
- The tone matches Dan's direct style. It stays blunt and operational instead of drifting into soft translation or promotional Spanish.
- MDX structure is intact: frontmatter, headings, code fences, inline emphasis, links, and the nested locale-relative asset paths are all preserved correctly.
- The language reads naturally for a technical audience. Only light polishing was needed for a few phrases that felt slightly literal or awkward.

## Light polish applied

- Kept the candidate's title and subtitle because they were already natural and faithful.
- Tightened a few sentences for flow, such as `volver a generar embeddings` and `reindexación incremental`.
- Preserved the code blocks and examples verbatim except for surrounding prose.

## Verdict

Best overall candidate. No competing Spanish candidate was available for this article, and this translation was already good enough to promote with only minimal editorial cleanup.
