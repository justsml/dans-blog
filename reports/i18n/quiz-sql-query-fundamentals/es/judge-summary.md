# Translation Judge Summary

- Slug: quiz-sql-query-fundamentals
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.05
- Input tokens: 13612
- Output tokens: 269
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007613
- Estimated cost: $0.007613

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.21
- Input tokens: 10449
- Output tokens: 251
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005978
- Estimated cost: $0.005978

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: 'SELECT * FROM users WHERE name = \\', isAnswer: true}," Replacement: "{text: 'SELECT * FROM users WHERE name = \\'John\\';', isAnswer: true}," Reason: The SQL string in the correct answer option was truncated, making the quiz question broken. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-08--quiz-sql-query-fundamentals/es/index.mdx
- 241757374a0f554b3d3279f3663689726e7611a7 i18n candidate(es): quiz-sql-query-fundamentals via openrouter/openai/gpt-oss-120b:nitro
- ddead6fb9a69272cc3b74084bd4ffae03fe58272 i18n candidate(es): quiz-sql-query-fundamentals via openrouter/qwen/qwen3-32b:nitro
