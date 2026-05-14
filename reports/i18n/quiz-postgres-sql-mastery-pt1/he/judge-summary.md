# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt1
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-postgres-sql-mastery-pt1 --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "quiz-postgres-sql-mastery-pt1" --locale he --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/he/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.94
- Input tokens: 17814
- Output tokens: 387
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010068
- Estimated cost: $0.010068

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.88
- Input tokens: 17449
- Output tokens: 394
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009907
- Estimated cost: $0.009907

### Pass 2
- Runtime seconds: 2.20
- Input tokens: 17303
- Output tokens: 179
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009189
- Estimated cost: $0.009189

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: 'הם\\'}," Replacement: "{text: 'הם ניתנים להחלפה מאז גרסה 10'}," Reason: The candidate has a broken string/syntax error in the options for Challenge index 4. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Intervals are a powerful tool for simplifying date range operations!" Replacement: "מרווחים (Intervals) הם כלי רב עוצמה לפישוט פעולות על טווחי תאריכים!" Reason: One sentence was left untranslated in the explanation for Challenge index 3. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "{text: 'הם\\'}," Replacement: "{text: 'הם ניתנים להחלפה מאז גרסה 10'}," Reason: The candidate has a broken string/syntax error in the options for Challenge index 4. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "Date arithmetic in PostgreSQL:" Replacement: "אריתמטיקה של תאריכים ב-PostgreSQL:" Reason: One sentence was left untranslated in the explanation for Challenge index 3. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 0d4b27d0fd9e62bfd86200dec97627ba90e03404 i18n candidate(he): quiz-postgres-sql-mastery-pt1 via openrouter/deepseek/deepseek-v4-flash
- 5a76cc25c759bc4447ef8af6af9592d75e904897 i18n candidate(he): quiz-postgres-sql-mastery-pt1 via openrouter/openai/gpt-oss-120b:nitro
