# Translation Judge Summary

- Slug: semantic-vector-search-landscape
- Locale: hi
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 3
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.879)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.83
- Input tokens: 16084
- Output tokens: 324
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.013278
- Estimated cost: $0.013278

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.79
- Input tokens: 22874
- Output tokens: 295
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.018262
- Estimated cost: $0.018262

### Pass 2
- Runtime seconds: 2.59
- Input tokens: 22826
- Output tokens: 185
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.017813
- Estimated cost: $0.017813

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[इस तुलना को कैसे पढ़ें](#तुलना-को-कैसे-पढ़ें)" Replacement: "[इस तुलना को कैसे पढ़ें](#तुलना-को-कैसे-पढ़ें)" Reason: The localized anchor generated from 'तुलना को कैसे पढ़ें' or 'तुलना को कैसे पढ़ें' depends on character encoding; in the document H3 is '### तुलना को कैसे पढ़ें' which produces slug 'तुलना-को-कैसे-पढ़ें'. But in markdown GitHub-slugger normalization often maps 'ढ़' / 'ढ़' with nukta; keeping the exact generated slug ensures smooth in-page navigation. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "[इस तुलना को कैसे पढ़ें](#तुलना-को-कैसे-पढ़ें)" Replacement: "[इस तुलना को कैसे पढ़ें](#तुलना-को-कैसे-पढ़ें)" Reason: The target heading in the document uses nukta 'पढ़ें' (U+0922 + U+093C = ढ़), which generates slug '#तुलना-को-कैसे-पढ़ें'. The link currently uses precomposed rha without nukta (U+095C = ढ़), resulting in a broken same-page anchor link. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-01--semantic-vector-search-landscape/hi/index.mdx
- 9db1c69f2be469310d04eb154a210e644a4552d6 i18n candidate(hi): semantic-vector-search-landscape via openrouter/openai/gpt-5.6-luna
