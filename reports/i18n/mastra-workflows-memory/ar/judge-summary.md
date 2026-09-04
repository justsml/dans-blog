# Translation Judge Summary

- Slug: mastra-workflows-memory
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: medium (0.665)
- Confidence signals: low blocking-issue rate; single judge
- High/medium/low issue counts: 0/1/0

## Primary Judge Telemetry
- Runtime seconds: 3.05
- Input tokens: 8586
- Output tokens: 281
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005136
- Estimated cost: $0.005136

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.98
- Input tokens: 11734
- Output tokens: 360
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006947
- Estimated cost: $0.006947

### Pass 2
- Runtime seconds: 2.85
- Input tokens: 11735
- Output tokens: 360
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006947
- Estimated cost: $0.006947

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "تسمح لك وكلاء الإشراف" Replacement: "يسمح لك وكلاء الإشراف" Reason: Grammatical agreement in Arabic: 'وكلاء' is plural, but the verb 'تسمح' (feminine singular) is less natural here than 'يسمح' (masculine singular/plural) for this construct. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied medium priority suggestion. Match: "تسمح لك وكلاء الإشراف" Replacement: "يسمح لك وكلاء الإشراف" Reason: Grammatical agreement in Arabic: 'وكلاء' is a broken plural (masculine), so the verb 'يسمح' (masculine) is more appropriate than 'تسمح' (feminine) in this context. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-05--mastra-workflows-memory/ar/index.mdx
- d76bd493a6777a37e86ddd0f9b357ac7146edf67 i18n candidate(ar): mastra-workflows-memory via openrouter/deepseek/deepseek-v4-flash
