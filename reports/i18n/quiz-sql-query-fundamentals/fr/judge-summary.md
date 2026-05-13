# Translation Judge Summary

- Slug: quiz-sql-query-fundamentals
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.00
- Input tokens: 14003
- Output tokens: 289
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.007869

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.61
- Input tokens: 10624
- Output tokens: 260
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006092

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: 'SELECT * FROM users WHERE name = \\', isAnswer: true}," Replacement: "{text: \"SELECT * FROM users WHERE name = 'John';\", isAnswer: true}," Reason: The SQL string in the second option is truncated/broken in the source and all candidates, making the quiz question invalid. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "title: \"IS NULLvs IS NOT NULL\"" Replacement: "title: \"IS NULL vs IS NOT NULL\"" Reason: Missing space between operators in the title of challenge 6. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2024-11-08--quiz-sql-query-fundamentals/fr/index.mdx
- 028b7a2edaf3484e6ef1799d82eed3c4df036fc0 i18n candidate(fr): quiz-sql-query-fundamentals via openrouter/openai/gpt-oss-120b:nitro
- fd41c6bfdfe51abb09b91c6849702572ab64c583 i18n candidate(fr): quiz-sql-query-fundamentals via openrouter/qwen/qwen3-32b:nitro
