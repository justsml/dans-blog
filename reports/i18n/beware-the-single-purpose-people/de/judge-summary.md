# Translation Judge Summary

- Slug: beware-the-single-purpose-people
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.67
- Input tokens: 14372
- Output tokens: 282
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008032

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 1.95
- Input tokens: 8379
- Output tokens: 199
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004786

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "language: German" Replacement: "language: de" Reason: The language field should use the ISO code 'de' for consistency with the site's i18n system. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "tags: [software development, code organization, maintainability, testing, dogma, pragmatism]" Replacement: "tags: [software-development, code-organization, maintainability, testing, dogma, pragmatism]" Reason: Preserve the original tag formatting with hyphens. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-04-03--beware-the-single-purpose-people/de/index.mdx
- 42325fc8afa1b684db06efae843277801f1a6bab i18n candidate(de): beware-the-single-purpose-people via openrouter/qwen/qwen3.6-plus
- 221548c27555af43202d7dcf6c08cc8e13380c35 i18n candidate(de): beware-the-single-purpose-people via openrouter/openai/gpt-oss-120b:nitro
- b3e77248ae24594d4fce2b66d711b766c40c5374 i18n candidate(de): beware-the-single-purpose-people via openrouter/qwen/qwen3-32b:nitro
