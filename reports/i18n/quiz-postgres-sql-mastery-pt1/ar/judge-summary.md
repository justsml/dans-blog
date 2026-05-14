# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt1
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-postgres-sql-mastery-pt1 --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "quiz-postgres-sql-mastery-pt1" --locale ar --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/ar/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.70
- Input tokens: 17031
- Output tokens: 244
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009248
- Estimated cost: $0.009248

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.12
- Input tokens: 16831
- Output tokens: 312
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009352
- Estimated cost: $0.009352

### Pass 2
- Runtime seconds: 2.64
- Input tokens: 16831
- Output tokens: 325
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009390
- Estimated cost: $0.009390

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: 'هم\\'}," Replacement: "{text: 'إنهما قابلان للتبادل منذ الإصدار 10'}," Reason: The original text was truncated/corrupted in the candidate, losing the meaning of 'They\'re interchangeable since Pg v10'. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "{text: 'هم\\'}," Replacement: "{text: 'إنهما قابلان للتبادل منذ الإصدار 10'}," Reason: The original text was truncated/corrupted in the candidate, losing the meaning of 'They\'re interchangeable since Pg v10'. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 9b3033b9226de51948e4294d441da8751e558f5e i18n candidate(ar): quiz-postgres-sql-mastery-pt1 via openrouter/deepseek/deepseek-v4-flash
- ce0a6d03c118eeaef5625709bfaac3ab6553a2b2 i18n candidate(ar): quiz-postgres-sql-mastery-pt1 via openrouter/openai/gpt-oss-120b:nitro
