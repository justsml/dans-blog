# Translation Judge Summary

- Slug: quiz-sql-query-fundamentals
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
- Runtime seconds: 2.80
- Input tokens: 10804
- Output tokens: 241
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006125
- Estimated cost: $0.006125

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.27
- Input tokens: 10596
- Output tokens: 252
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006054
- Estimated cost: $0.006054

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: 'SELECT * FROM users WHERE name = \\\"', isAnswer: true}," Replacement: "{text: \"SELECT * FROM users WHERE name = 'John';\", isAnswer: true}," Reason: The SQL query in the answer option was truncated and missing the actual value and closing quote. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 71c087dd022b69203a7b887ed8c0a77e951e7a50 i18n candidate(ar): quiz-sql-query-fundamentals via openrouter/deepseek/deepseek-v4-flash
- 8063e479630f45e7d0b49f1a69112c6538684674 i18n candidate(ar): quiz-sql-query-fundamentals via openrouter/openai/gpt-oss-120b:nitro
