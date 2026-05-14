# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt1
- Locale: zh
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-postgres-sql-mastery-pt1 --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "quiz-postgres-sql-mastery-pt1" --locale zh --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/zh/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.95
- Input tokens: 21100
- Output tokens: 185
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011105
- Estimated cost: $0.011105

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.48
- Input tokens: 16246
- Output tokens: 274
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008945
- Estimated cost: $0.008945

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "它们\\'}" Replacement: "它们可以互换（自 Pg v10 起）" Reason: The translation was truncated in the candidate, leaving a broken string. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "{text: '它们可以互换（自 Pg v10 起）," Replacement: "{text: '它们可以互换（自 Pg v10 起）'}," Reason: The translation was truncated in the candidate, leaving a broken string and invalid JS object syntax. Note: Exact match not found in selected MDX.

## Candidates
- current not present
- 097a4b2bc14f3ed23594c7a12a6342bb10fbbbf4 i18n candidate(zh): quiz-postgres-sql-mastery-pt1 via openrouter/openai/gpt-oss-120b:nitro
- cf674905cce96a5aaa386b34d5d389076c8f7a5b i18n candidate(zh): quiz-postgres-sql-mastery-pt1 via deepseek/deepseek-v4-flash
- 1213098ddcc066cd200c34514e1839586ce02f3c i18n candidate(zh): quiz-postgres-sql-mastery-pt1 via openrouter/qwen/qwen3-32b:nitro
