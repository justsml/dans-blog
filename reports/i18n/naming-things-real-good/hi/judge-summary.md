# Translation Judge Summary

- Slug: naming-things-real-good
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.77
- Input tokens: 6549
- Output tokens: 318
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004228

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.37
- Input tokens: 5373
- Output tokens: 281
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003530

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[schema_refactor]: ../https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif" Replacement: "[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif" Reason: The candidate added an incorrect '../' prefix to an absolute URL, breaking the image link. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2016-06-01--naming-things-real-good/hi/index.mdx
- 2fdcf544b834c6b63ba18c2db93f1fe0b167577a i18n candidate(hi): naming-things-real-good via openrouter/openai/gpt-oss-120b:nitro
- 068c7c235853a5db182c34780811a8f7f0ebb74d i18n candidate(hi): naming-things-real-good via openrouter/qwen/qwen3-32b:nitro
