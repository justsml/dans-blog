# Translation Judge Summary

- Slug: semantic-vector-search-landscape
- Locale: zh
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 3
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.883)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.71
- Input tokens: 22815
- Output tokens: 282
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.018169
- Estimated cost: $0.018169

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.54
- Input tokens: 22512
- Output tokens: 312
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.018054
- Estimated cost: $0.018054

### Pass 2
- Runtime seconds: 3.04
- Input tokens: 22416
- Output tokens: 167
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.017438
- Estimated cost: $0.017438

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[如何阅读这份对比](#如何阅读这张对比表)" Replacement: "[如何阅读这份对比](#如何阅读这份对比)" Reason: The anchor target must match the generated slug from the heading text below it ('如何阅读这份对比' or corresponding heading). Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "[如何阅读这份对比](#如何阅读这份对比)" Replacement: "[如何阅读这份对比](#如何阅读这张对比表)" Reason: The anchor target must resolve to the actual translated H3 heading, which is '### 如何阅读这张对比表' (slug: '#如何阅读这张对比表'). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-01--semantic-vector-search-landscape/zh/index.mdx
- 5c408b77af39618ea12af96ddc1cfa0c40c2ddb0 i18n candidate(zh): semantic-vector-search-landscape via openrouter/deepseek/deepseek-v4.1-flash
- 8a8c11337aae9b32b3fe3a5d8ebabad3f69d7bc1 i18n candidate(zh): semantic-vector-search-landscape via openrouter/openai/gpt-5.6-luna
