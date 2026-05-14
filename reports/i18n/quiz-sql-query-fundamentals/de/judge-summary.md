# Translation Judge Summary

- Slug: quiz-sql-query-fundamentals
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.72
- Input tokens: 14138
- Output tokens: 232
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007765
- Estimated cost: $0.007765

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.09
- Input tokens: 10521
- Output tokens: 224
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005933
- Estimated cost: $0.005933

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: 'SELECT * FROM users WHERE name = \\', isAnswer: true}," Replacement: "{text: 'SELECT * FROM users WHERE name = \\'John\\';', isAnswer: true }," Reason: The current translation has a broken SQL string in the first challenge options, missing the name and closing quote. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-08--quiz-sql-query-fundamentals/de/index.mdx
- b2bcbe3869612139128889a4f42adce932e6a744 i18n candidate(de): quiz-sql-query-fundamentals via openrouter/openai/gpt-oss-120b:nitro
- 87f9ac6a44b2ad83e59c26974c2cc7bc05450503 i18n candidate(de): quiz-sql-query-fundamentals via openrouter/qwen/qwen3-32b:nitro
