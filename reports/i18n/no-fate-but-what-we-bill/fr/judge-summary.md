# Translation Judge Summary

- Slug: no-fate-but-what-we-bill
- Locale: fr
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.888)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 6.52
- Input tokens: 11805
- Output tokens: 473
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010627
- Estimated cost: $0.010627

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 5.47
- Input tokens: 11298
- Output tokens: 178
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009141
- Estimated cost: $0.009141

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "```text p = 1% per attempt, n = 100: 1 − 0.99^100 ≈ 63% p = 0.5%, n = 100: ≈ 39% p = 0.5%, n = 300: ≈ 78% p = 0.1%, n = 1000: ≈ 63% ```" Replacement: "```text p = 1 % par tentative, n = 100 : 1 − 0,99^100 ≈ 63 % p = 0,5 %, n = 100 : ≈ 39 % p = 0,5 %, n = 300 : ≈ 78 % p = 0,1 %, n = 1000 : ≈ 63 % ```" Reason: Localize mathematical code sample annotations and decimal points into French. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- f0a97575793805a0ba6c3daaf3e3d9a4f8be15b5 i18n candidate(fr): no-fate-but-what-we-bill via openrouter/google/gemini-3.8-flash
- 12fb087a19f5aaedd285bf0a2b73a41b201654d6 i18n candidate(fr): no-fate-but-what-we-bill via openrouter/minimax/minimax-m2.5:nitro
