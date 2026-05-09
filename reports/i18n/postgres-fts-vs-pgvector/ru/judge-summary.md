# Translation Judge Summary

- Slug: postgres-fts-vs-pgvector
- Locale: ru
- Selected candidate: `521606182da7926a6c79e5dbe5137dd6cf020eff`
- Selected model: `openrouter/qwen/qwen3.6-plus`
- Primary cheap judge: `openrouter/google/gemini-3-flash-preview`
- Second cheap judge: `openrouter/deepseek/deepseek-v4-flash`
- Escalation judge: not run

## Outcome

Both cheap judges selected or agreed with the Qwen 3.6 Plus candidate. No Sonnet escalation was needed.

## Candidates

- `4337872ee1468579d54686c22335577f23f724e2` `i18n candidate(ru): postgres-fts-vs-pgvector via openrouter/deepseek/deepseek-v4-flash`
- `b08389e585c00c87469b22fad19b1c3e12d53dfd` `i18n candidate(ru): postgres-fts-vs-pgvector via openrouter/qwen/qwen3.5-flash-02-23`
- `521606182da7926a6c79e5dbe5137dd6cf020eff` `i18n candidate(ru): postgres-fts-vs-pgvector via openrouter/qwen/qwen3.6-plus`

## Notes

The full `i18n:judge` wrapper was attempted with the requested cheap judges and `--timeout-seconds 240`, but both OpenCode judge processes wrote useful decisions before returning nonzero due to timeout/tool chatter. The final file was validated with the Bun i18n validator after the selected candidate was restored.

