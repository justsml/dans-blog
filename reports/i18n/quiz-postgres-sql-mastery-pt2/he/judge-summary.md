# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt2
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.90
- Input tokens: 18354
- Output tokens: 218
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009831
- Estimated cost: $0.009831

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.45
- Input tokens: 17497
- Output tokens: 289
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009616
- Estimated cost: $0.009616

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: '\\'}" Replacement: "{text: '\\'first.name\\''}," Reason: The candidate accidentally truncated the option text for the single-quote choice in Challenge 7. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "{text: '\\'first.name\\''},," Replacement: "{text: '\\'first.name\\''}," Reason: The candidate has a double comma syntax error in the options list for Challenge 7. Note: Exact match not found in selected MDX.

## Candidates
- current not present
- c313b1e0b2bdb674425881ad469ede0cebcc34a9 i18n candidate(he): quiz-postgres-sql-mastery-pt2 via openrouter/deepseek/deepseek-v4-flash
- d83c590db20e0c698fa8cf3b0d512a80cff8261d i18n candidate(he): quiz-postgres-sql-mastery-pt2 via openrouter/openai/gpt-oss-120b:nitro
