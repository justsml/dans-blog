# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt1
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-postgres-sql-mastery-pt1 --locale es --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "quiz-postgres-sql-mastery-pt1" --locale es --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/es/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.97
- Input tokens: 21852
- Output tokens: 303
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011835

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.83
- Input tokens: 16671
- Output tokens: 365
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.009430

### Pass 2
- Runtime seconds: 3.55
- Input tokens: 16617
- Output tokens: 496
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.009796

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: 'They\"'}," Replacement: "{text: 'Son intercambiables desde Pg v10'}," Reason: The candidate has a corrupted option text in Challenge 4, losing the original meaning. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "group=\"Tiposde Postgres\"" Replacement: "group=\"Tipos de Postgres\"" Reason: Missing space in the group name for Challenge 8. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "{text: 'They\"'}," Replacement: "{text: 'Son intercambiables desde Pg v10'}," Reason: The candidate has a corrupted option text in Challenge 4, losing the original meaning and breaking the syntax. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "group=\"Tiposde Postgres\"" Replacement: "group=\"Tipos de Postgres\"" Reason: Missing space in the group name for Challenge 8. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/es/index.mdx
- 683b11adcdb3c322a03780cd38984a3f0c1e5e45 i18n candidate(es): quiz-postgres-sql-mastery-pt1 via openrouter/openai/gpt-oss-120b:nitro
- 6cb69653e5e0b572a25f1c957d6c6b7a30358c7c i18n candidate(es): quiz-postgres-sql-mastery-pt1 via openrouter/qwen/qwen3-32b:nitro
