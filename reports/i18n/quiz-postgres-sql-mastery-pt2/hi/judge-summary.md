# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt2
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.94
- Input tokens: 22405
- Output tokens: 305
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.012117

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.43
- Input tokens: 16920
- Output tokens: 653
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.010419

### Pass 2
- Runtime seconds: 4.85
- Input tokens: 17385
- Output tokens: 782
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011038

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "> **Part 2 of 2.** [Back to Part 1](/quiz-postgres-sql-mastery-pt1/)" Replacement: "> **भाग 2 (कुल 2)।** [भाग 1 पर वापस जाएं](/quiz-postgres-sql-mastery-pt1/)" Reason: The candidate left the introductory navigation link in English. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "options={[ ]}" Replacement: "options={[ {text: 'ON a.id = b.id', isAnswer: true}, {text: 'ON a.id > b.id'}, {text: 'ON a.id >= b.id'}, {text: 'HASH JOIN ON a.id = b.id ...'} ]}" Reason: The options for Challenge index 4 (Hash Join Eligibility) are missing in the translated file. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "options={[ ]}" Replacement: "options={[ {text: '...students SAMPLETABLE BERNOULLI (0.10)'}, {text: '...students TABLESAMPLE USER (10)'}, {text: '...students TABLESAMPLE RANDOM (10)'}, {text: '...students SA..." Reason: The options for Challenge index 8 (TABLESAMPLE Syntax) are missing in the translated file. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "{text: '\\'}" Replacement: "{text: '\\'first.name\\''}" Reason: The single quote option in Challenge index 7 was truncated or incorrectly escaped. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-28--quiz-postgres-sql-mastery-pt2/hi/index.mdx
- 6addb4758ac681f9668f90b5fe3d3458f41c6e2d i18n candidate(hi): quiz-postgres-sql-mastery-pt2 via openrouter/openai/gpt-oss-120b:nitro
- 5437f1a3848df6fd37eb8ea3800122da8215736a i18n candidate(hi): quiz-postgres-sql-mastery-pt2 via openrouter/qwen/qwen3-32b:nitro
