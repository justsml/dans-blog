# Translation Judge Summary

- Slug: postgres-fts-vs-pgvector
- Locale: ja
- Candidate models: openrouter/qwen/qwen3.6-plus, openrouter/deepseek/deepseek-v4-flash, openrouter/google/gemini-3-flash-preview
- Judge models: openrouter/google/gemini-3-flash-preview, openrouter/deepseek/deepseek-v4-flash
- Escalation judge: not run; both cheap judges agreed
- Selected candidate: ec1597f39395fa37d3c522f30fd03cbaff6bf9a6

## Consensus

Both judge models selected the DeepSeek V4 Flash candidate. Gemini's first judge selected Candidate B for technical accuracy, natural Japanese, direct style, and MDX preservation. DeepSeek's second judge agreed and explicitly stated that no escalation was needed.

## Notes

The final MDX keeps the DeepSeek candidate's direct `だ/である` voice and includes the agreed light polish:

- `trigram` terminology normalized to `トライグラム` in translated prose.
- `プローズ` normalized to `プロス`.
- `実質的に無制限` tightened to `実質無制限`.
- The `when-you-need-both` link was corrected to the Japanese heading anchor.

Validation passed with `bun run i18n:validate -- --slug postgres-fts-vs-pgvector --locale ja`.
