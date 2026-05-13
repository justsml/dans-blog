# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt1
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-postgres-sql-mastery-pt1 --locale de --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "quiz-postgres-sql-mastery-pt1" --locale de --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/de/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.14
- Input tokens: 22360
- Output tokens: 287
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.012041

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.78
- Input tokens: 16845
- Output tokens: 373
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.009541

### Pass 2
- Runtime seconds: 3.11
- Input tokens: 16839
- Output tokens: 392
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.009595

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: 'They\"'}," Replacement: "{text: 'Sie belegen beide 8 Bytes, aber sie speichern unterschiedliche Daten'}," Reason: The candidate has a broken string/syntax error in the second option of Challenge 4. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "Du hast inmehreren Bereichen" Replacement: "Du hast in mehreren Bereichen" Reason: Missing space between words. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "{text: 'They\"'}," Replacement: "{text: 'Sie belegen beide 8 Bytes, aber sie speichern unterschiedliche Daten'}," Reason: The candidate has a broken string/syntax error in the second option of Challenge 4. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "Du hast inmehreren Bereichen" Replacement: "Du hast in mehreren Bereichen" Reason: Missing space between words. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/de/index.mdx
- bf72457b74530893d362b1e842ba9125bedfdd70 i18n candidate(de): quiz-postgres-sql-mastery-pt1 via openrouter/openai/gpt-oss-120b:nitro
- d42f5de60f05c3f125218921a0d29065713e991b i18n candidate(de): quiz-postgres-sql-mastery-pt1 via openrouter/qwen/qwen3-32b:nitro
