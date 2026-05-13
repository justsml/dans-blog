# Translation Judge Summary

- Slug: docker-rocks
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.87
- Input tokens: 4297
- Output tokens: 353
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003207

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.19
- Input tokens: 3187
- Output tokens: 218
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002247

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "## Docker Rocks" Replacement: "## Docker déchire" Reason: The H2 heading was left in English. Translating it to 'Docker déchire' matches the title and the informal tone of the original. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2015-06-11--docker-rocks/fr/index.mdx
- 03d42c1f91f9545ccd4e07a508743f4b2b1b2476 i18n candidate(fr): docker-rocks via openrouter/openai/gpt-oss-120b:nitro
- 7a21478604d9f76a49fac88a40717f48af2fbeee i18n candidate(fr): docker-rocks via openrouter/qwen/qwen3-32b:nitro
- a69c196c189a6b33e8b4d5eeea77ed113ea22a5c i18n candidate(fr): docker-rocks via deepseek/deepseek-v4-flash
