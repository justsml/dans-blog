# Translation Judge Summary

- Slug: into-the-breach
- Locale: ru
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
- Runtime seconds: 3.98
- Input tokens: 9770
- Output tokens: 348
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005929
- Estimated cost: $0.005929

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.97
- Input tokens: 9205
- Output tokens: 249
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005350
- Estimated cost: $0.005350

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "cover_full_width: ../wide.webp" Replacement: "cover_full_width: ../wide-2.webp" Reason: The English source uses wide-2.webp. This ensures the correct asset is loaded. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-13--into-the-breach/ru/index.mdx
- 1a2696ab1bf6da629317da8fa0c9f99934be0a73 i18n candidate(ru): into-the-breach via openrouter/deepseek/deepseek-v4-flash
- 017da0ed7e448ec4ec0491e5c1d706fb08fb149e i18n candidate(ru): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
