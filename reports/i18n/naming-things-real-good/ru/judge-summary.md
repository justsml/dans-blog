# Translation Judge Summary

- Slug: naming-things-real-good
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.16
- Input tokens: 8061
- Output tokens: 365
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005125

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.24
- Input tokens: 5394
- Output tokens: 249
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003444

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "enforcing эту «логику»" Replacement: "обеспечения соблюдения этой «логики»" Reason: The candidate left the English word 'enforcing' in the middle of a Russian sentence. It should be translated. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2016-06-01--naming-things-real-good/ru/index.mdx
- c0eb2acd7cc03fe5132b4119e8cfa59b6ab939de i18n candidate(ru): naming-things-real-good via openrouter/qwen/qwen3.6-plus
- aba22e5ce338ed5d7fbefdcbcd30ced31c34035c i18n candidate(ru): naming-things-real-good via openrouter/openai/gpt-oss-120b:nitro
- c85ea566f1e37f1eb8f0012324714a5de02c7aa7 i18n candidate(ru): naming-things-real-good via openrouter/qwen/qwen3-32b:nitro
