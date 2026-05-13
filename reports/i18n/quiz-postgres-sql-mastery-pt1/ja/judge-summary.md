# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt1
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-postgres-sql-mastery-pt1 --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "quiz-postgres-sql-mastery-pt1" --locale ja --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/ja/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.69
- Input tokens: 21723
- Output tokens: 243
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011591

## Candidates
- current src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/ja/index.mdx
- 658781ba0751c3901df30d474f7ec70a3b68b8e6 i18n candidate(ja): quiz-postgres-sql-mastery-pt1 via openrouter/openai/gpt-oss-120b:nitro
- 1a14e95b3eaae847c7e8696d92d53098ce2df688 i18n candidate(ja): quiz-postgres-sql-mastery-pt1 via openrouter/qwen/qwen3-32b:nitro
