# Translation Judge Summary

- Slug: developer-workstation-blast-radius
- Locale: fr
- Candidate models: openrouter/qwen/qwen3.6-plus, openrouter/z-ai/glm-4.7-flash, openrouter/qwen/qwen3.5-flash-02-23
- Judge models: openrouter/google/gemini-3-flash-preview, openrouter/deepseek/deepseek-v4-flash
- Escalation judge: not run; the Sonnet escalation was stopped because both cheap judges converged on the Qwen 3.6 Plus candidate
- Selected candidate: 9f4c3e0dbfc4579f21e1936ece31e88a48c3383f

## Consensus

The primary judge selected the Qwen 3.6 Plus candidate for technical accuracy, natural French phrasing, and MDX preservation. The second judge rejected the GLM and Qwen 3.5 alternatives and said to keep the current Qwen 3.6 Plus file.

## Final Polish

The final file keeps the judge-selected Qwen 3.6 Plus translation and restores controlled taxonomy frontmatter fields to their canonical English values:

- `category: Security`
- `subCategory: Best Practices`

Validation passed with `bun run i18n:validate -- --slug developer-workstation-blast-radius --locale fr`.
