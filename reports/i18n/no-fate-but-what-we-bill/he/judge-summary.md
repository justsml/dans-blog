# Translation Judge Summary

- Slug: no-fate-but-what-we-bill
- Locale: he
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.880)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 6.10
- Input tokens: 13128
- Output tokens: 321
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011050
- Estimated cost: $0.011050

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.83
- Input tokens: 12041
- Output tokens: 209
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009815
- Estimated cost: $0.009815

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "<img src=\".././capability-curves.svg\"" Replacement: "<img src=\"../capability-curves.svg\"" Reason: Clean up the malformed path segment '.././' into standard '../'. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- e756c489d12ceab44def7235391d6cf8a96c9c62 i18n candidate(he): no-fate-but-what-we-bill via openrouter/google/gemini-3.8-flash
- 0908f2a558d92ecfc0c7ba71bbeee7fcc8e1536b i18n candidate(he): no-fate-but-what-we-bill via openrouter/minimax/minimax-m2.5:nitro
