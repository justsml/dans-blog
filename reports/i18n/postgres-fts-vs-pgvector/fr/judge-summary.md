# Translation Judge Summary

- Slug: postgres-fts-vs-pgvector
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: openrouter/deepseek/deepseek-v4-flash
- Escalation judge model: not run
- Selected candidate: af5dcba357a20895c053b73aaaa634d3e14d3fc1
- Final decision: both cheap judges converged on DeepSeek V4 Flash as the best base; the second judge rejected the primary judge's truncated working tree and recommended restoring the full DeepSeek candidate with minor fixes.

## Candidates

- af5dcba357a20895c053b73aaaa634d3e14d3fc1 i18n candidate(fr): postgres-fts-vs-pgvector via openrouter/deepseek/deepseek-v4-flash
- cbcc5c43a8c49d3f13b6cf258951f9360c13541c i18n candidate(fr): postgres-fts-vs-pgvector via openrouter/google/gemini-2.5-flash-lite
- acfb849c700206b68b42b075f89d8656282f2fcf i18n candidate(fr): postgres-fts-vs-pgvector via openrouter/qwen/qwen3.6-plus

## Finalization

The final MDX restores the complete DeepSeek candidate, then applies the second judge's small fixes:

- `ils ont deja PostgreSQL` -> `elles ont deja PostgreSQL`
- `prominente` -> `proeminente`
- `Vous pouvez embedded` -> `Vous pouvez integrer`
- first `racinise` mention includes `(stemming)` for clarity

No Sonnet/GPT escalation was run because the cheap judges agreed on the winning candidate; the disagreement was with the primary judge's truncated file write, not with candidate selection.
