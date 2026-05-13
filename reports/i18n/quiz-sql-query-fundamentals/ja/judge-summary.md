# Translation Judge Summary

- Slug: quiz-sql-query-fundamentals
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.79
- Input tokens: 13291
- Output tokens: 257
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.007417

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.05
- Input tokens: 10362
- Output tokens: 220
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005841

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: 'SELECT * FROM users WHERE name = \\', isAnswer: true}," Replacement: "{text: 'SELECT * FROM users WHERE name = \\'John\\';', isAnswer: true }," Reason: The SQL string in the correct answer option was truncated, making the quiz question broken. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-08--quiz-sql-query-fundamentals/ja/index.mdx
- 40e23f7cca8ea20a6c853bd189e6c3537c6ec8af i18n candidate(ja): quiz-sql-query-fundamentals via openrouter/openai/gpt-oss-120b:nitro
- 4a0deff8808943ca979f32058a820164a4002971 i18n candidate(ja): quiz-sql-query-fundamentals via openrouter/qwen/qwen3-32b:nitro
