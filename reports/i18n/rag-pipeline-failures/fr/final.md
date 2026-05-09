# Final Translation Notes

- Slug: rag-pipeline-failures
- Locale: fr
- Final base: 4256c7fafdeec9d5519c7566c993f4aa11479b17 via openrouter/deepseek/deepseek-v4-flash
- Kept from candidate 3: simpler subtitle and some direct phrasing where it improved readability.
- Rejected from candidate 3: localized taxonomy fields, untranslated English fragments, and several French grammar/terminology regressions.
- Cheap judge consensus: Gemini 2.5 Flash Lite accepted the selected DeepSeek base; DeepSeek V4 Flash rejected the Qwen 3.5 candidate regressions and recommended candidate 2 as the safest base.
- Escalation: not run.

Validation:

- `bun run i18n:validate -- --slug rag-pipeline-failures --locale fr`
- `bun run content:check`
