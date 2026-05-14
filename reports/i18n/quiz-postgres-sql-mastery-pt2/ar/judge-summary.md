# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt2
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
- Runtime seconds: 3.29
- Input tokens: 17464
- Output tokens: 208
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009356
- Estimated cost: $0.009356

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.51
- Input tokens: 17021
- Output tokens: 277
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009342
- Estimated cost: $0.009342

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: '\\'}" Replacement: "{text: '\\'first.name\\''}" Reason: The candidate accidentally truncated the single-quote option in Challenge 7, leaving only a backslash. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "{text: '\\''}" Replacement: "{text: '\\'first.name\\''}" Reason: The candidate accidentally truncated the single-quote option in Challenge 7, leaving only a backslash/quote fragment. Note: Exact match not found in selected MDX.

## Candidates
- current not present
- 5d5a4c5189a7597b23c13c189930a8ddaf84078a i18n candidate(ar): quiz-postgres-sql-mastery-pt2 via openrouter/deepseek/deepseek-v4-flash
- e2e7ee16f95e442546c69de721bdfbf4cf8b58ea i18n candidate(ar): quiz-postgres-sql-mastery-pt2 via openrouter/openai/gpt-oss-120b:nitro
