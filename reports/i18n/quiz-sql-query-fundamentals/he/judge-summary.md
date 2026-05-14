# Translation Judge Summary

- Slug: quiz-sql-query-fundamentals
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
- Runtime seconds: 2.96
- Input tokens: 11520
- Output tokens: 251
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006513
- Estimated cost: $0.006513

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.52
- Input tokens: 10950
- Output tokens: 217
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006126
- Estimated cost: $0.006126

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: 'SELECT * FROM users WHERE name = \"', isAnswer: true}," Replacement: "{text: \"SELECT * FROM users WHERE name = 'John';\", isAnswer: true}," Reason: The candidate truncated the correct answer option, making the quiz broken. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 70a66815a6c8378588906f314ef96681b76ae41a i18n candidate(he): quiz-sql-query-fundamentals via openrouter/deepseek/deepseek-v4-flash
- e552e34a93c8d81365e1caed46b52d50d13554be i18n candidate(he): quiz-sql-query-fundamentals via openrouter/openai/gpt-oss-120b:nitro
