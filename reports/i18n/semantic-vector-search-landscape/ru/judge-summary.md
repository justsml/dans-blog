# Translation Judge Summary

- Slug: semantic-vector-search-landscape
- Locale: ru
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 3
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.891)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 4.31
- Input tokens: 25531
- Output tokens: 323
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.020359
- Estimated cost: $0.020359

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.80
- Input tokens: 23877
- Output tokens: 307
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.019059
- Estimated cost: $0.019059

### Pass 2
- Runtime seconds: 2.62
- Input tokens: 23853
- Output tokens: 181
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.018569
- Estimated cost: $0.018569

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[Как читать это сравнение](#как-читать-сравнение)" Replacement: "[Как читать это сравнение](#как-читать-сравнение-1)" Reason: The anchor link must resolve to the second occurrence's slug (как-читать-сравнение-1) because GitHub/Gatsby/MDX generates -1 for duplicate heading slugs, or better align with the actual translated H3 heading. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "[Как читать это сравнение](#как-читать-сравнение-1)" Replacement: "[Как читать это сравнение](#как-читать-сравнение)" Reason: The target heading is '### Как читать сравнение', which slugs to '#как-читать-сравнение' (there is no previous heading with this slug, so no '-1' suffix is generated). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-01--semantic-vector-search-landscape/ru/index.mdx
- f62ee72b54acd81a773ecd37dea3499b1987352a i18n candidate(ru): semantic-vector-search-landscape via openrouter/deepseek/deepseek-v4.1-flash
- f2c99045d611ae08262a7ca07e0e9258c3e0e399 i18n candidate(ru): semantic-vector-search-landscape via openrouter/openai/gpt-5.6-luna
