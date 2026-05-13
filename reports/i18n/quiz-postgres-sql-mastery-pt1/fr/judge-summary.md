# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt1
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-postgres-sql-mastery-pt1 --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "quiz-postgres-sql-mastery-pt1" --locale fr --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/fr/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.84
- Input tokens: 22530
- Output tokens: 259
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.012042

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.84
- Input tokens: 17008
- Output tokens: 209
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.009131

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: 'They\"'}," Replacement: "{text: 'Ils sont interchangeables depuis Pg v10'}," Reason: The candidate has a broken string/truncated text in one of the options for the timestamptz question. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/fr/index.mdx
- 4c47e58a435006b8bf7f1b470555d4516b057891 i18n candidate(fr): quiz-postgres-sql-mastery-pt1 via openrouter/openai/gpt-oss-120b:nitro
- 9fd7bc6112501f42f858504c5370b61f5b1f7ab8 i18n candidate(fr): quiz-postgres-sql-mastery-pt1 via openrouter/qwen/qwen3-32b:nitro
