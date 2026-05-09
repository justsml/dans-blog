# I18n Judge Report: postgres-fts-vs-pgvector (ru)

## Decision

Selected candidate: `521606182da7926a6c79e5dbe5137dd6cf020eff` (`openrouter/qwen/qwen3.6-plus`)

## Reasoning

The selected candidate provides the most natural Russian technical prose while preserving the article's MDX structure and protected code examples.

- It keeps the English stemming examples intact where the article is explaining PostgreSQL English full-text search behavior.
- It has a more idiomatic Russian technical register than the Qwen 3.5 Flash candidate.
- It avoids the DeepSeek candidate's substitutions of some code-adjacent examples into Russian.
- It preserves asset paths, code fences, MDX structure, and the lean localized frontmatter shape.

## Candidates Evaluated

- `4337872ee1468579d54686c22335577f23f724e2` (`openrouter/deepseek/deepseek-v4-flash`)
- `b08389e585c00c87469b22fad19b1c3e12d53dfd` (`openrouter/qwen/qwen3.5-flash-02-23`)
- `521606182da7926a6c79e5dbe5137dd6cf020eff` (`openrouter/qwen/qwen3.6-plus`) - selected

