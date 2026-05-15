# Translation Judge Summary

- Slug: postgres-text-search-guide
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.79
- Input tokens: 27449
- Output tokens: 342
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.014750
- Estimated cost: $0.014750

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.42
- Input tokens: 26344
- Output tokens: 267
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.013973
- Estimated cost: $0.013973

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "وزّعها إذا كان الاسترجاع منخفضًا" Replacement: "قم بتوسيعها إذا كان الاسترجاع منخفضًا" Reason: 'وزّعها' (distribute it) is a mistranslation of 'Widen it' in the context of a search limit/pool. 'توسيعها' is more accurate. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-02--postgres-text-search-guide/ar/index.mdx
- 4affe079b7b14fda9f58fe3a02725635ee1b2a8c i18n candidate(ar): postgres-text-search-guide via openrouter/openai/gpt-oss-120b:nitro
