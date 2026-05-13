# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt1
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-postgres-sql-mastery-pt1 --locale ru --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "quiz-postgres-sql-mastery-pt1" --locale ru --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/ru/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.76
- Input tokens: 22114
- Output tokens: 640
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.012977

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.12
- Input tokens: 17171
- Output tokens: 195
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.009170

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "PostgreSQL's rich set of network types do not include `ipv4`. Every single time I attempt to use it without googling, I get it wrong. Perhaps `macaddr8` makes me feel there _mus..." Replacement: "Богатый набор сетевых типов PostgreSQL не включает `ipv4`. Каждый раз, когда я пытаюсь использовать его без поиска в Google, я ошибаюсь. Возможно, наличие `macaddr8` заставляет ..." Reason: The candidate left a large block of explanation text in English in Challenge index 7. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "{text: 'They\"'}," Replacement: "{text: 'Они взаимозаменяемы начиная с версии Pg v10'}," Reason: The candidate has a broken string/truncated text in the options for Challenge index 4. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/ru/index.mdx
- f675e67bf43eb5efc56f64c4d80cf79a5557c2e1 i18n candidate(ru): quiz-postgres-sql-mastery-pt1 via openrouter/openai/gpt-oss-120b:nitro
- ee98ea5d99a65ed217c89bdaac5eb058dd8f83c8 i18n candidate(ru): quiz-postgres-sql-mastery-pt1 via openrouter/qwen/qwen3-32b:nitro
