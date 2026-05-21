# Translation Judge Summary

- Slug: into-the-breach
- Locale: it
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.886)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.80
- Input tokens: 9481
- Output tokens: 317
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005692
- Estimated cost: $0.005692

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.24
- Input tokens: 8995
- Output tokens: 261
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005280
- Estimated cost: $0.005280

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "cover_full_width: ../wide.webp" Replacement: "cover_full_width: ../wide-2.webp" Reason: The English source uses wide-2.webp, but the translation used wide.webp. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-13--into-the-breach/it/index.mdx
- 00caeb05fc4d556962422369d96d499b77c32a5b i18n candidate(it): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
- b978d2e5f3d5b6427451a0c279ee6b8e160e0dcc i18n candidate(it): into-the-breach via openrouter/deepseek/deepseek-v4-flash
