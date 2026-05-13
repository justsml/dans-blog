# Translation Judge Summary

- Slug: naming-things-real-good
- Locale: it
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.62
- Input tokens: 8034
- Output tokens: 491
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005490

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.87
- Input tokens: 5508
- Output tokens: 452
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004110

### Pass 2
- Runtime seconds: 2.40
- Input tokens: 5458
- Output tokens: 210
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003359

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "![rifattorizzazione dello schema][schema_refactor]" Replacement: "![schema refactor][schema_refactor]" Reason: The alt text for images should generally remain consistent with the original or be more concise, but more importantly, the reference link [schema_refactor] is defined at the bottom. The translation of alt text is fine, but keeping it simple is better for MDX stability. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif" Replacement: "[schema_refactor]: ../bldg-collapse__wsZKhIc_kafcha.gif" Reason: The local relative path is preferred over the external cloudinary URL to match the project's asset structure as seen in the current version. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "![rifattorizzazione dello schema][schema_refactor]" Replacement: "![schema refactor][schema_refactor]" Reason: The alt text for images should generally remain consistent with the original or be more concise. Keeping it simple is better for MDX stability. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif" Replacement: "[schema_refactor]: ../bldg-collapse__wsZKhIc_kafcha.gif" Reason: The local relative path is preferred over the external cloudinary URL to match the project's asset structure as seen in the current version. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2016-06-01--naming-things-real-good/it/index.mdx
- 287c0ba862cd5a9103b9ed7eca63ea92bf3e81b5 i18n candidate(it): naming-things-real-good via openrouter/qwen/qwen3.6-plus
- f18c702b05cf87663af7a47c1327e3b4044a7878 i18n candidate(it): naming-things-real-good via openrouter/openai/gpt-oss-120b:nitro
- 9597d4a77fc5fb8a658aca496547e9061a1146a1 i18n candidate(it): naming-things-real-good via openrouter/qwen/qwen3-32b:nitro
