# Translation Judge Summary

- Slug: prompt-injection-new-sql-injection
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: openrouter/deepseek/deepseek-v4-flash
- Escalation judge model: not run
- Selected commit: 6b033655a4667bf8be8d716616e6b83f75c749c6
- Result: both cheap judges agreed on the Qwen 3.6 Plus candidate; no Sonnet escalation was needed.
- Note: the judge wrapper exited during validation after a bad asset-path edit from the second judge. The final file restores `../` inherited asset paths and keeps the accepted grammar polish.

## Candidates

- 6b033655a4667bf8be8d716616e6b83f75c749c6 i18n candidate(ru): prompt-injection-new-sql-injection via openrouter/qwen/qwen3.6-plus
- bb4eea449d6d57a47e6bac7a7bbd0f469fbfafcf i18n candidate(ru): prompt-injection-new-sql-injection via openrouter/qwen/qwen3.5-flash-02-23
- 4582564be8e40dde289199e75ab058107e1912a4 i18n candidate(ru): prompt-injection-new-sql-injection via openrouter/deepseek/deepseek-v4-flash

## Validation

- `PATH=/Users/dan/.bun/bin:/Users/dan/.opencode/bin:$PATH bun run i18n:validate -- --slug prompt-injection-new-sql-injection --locale ru`
