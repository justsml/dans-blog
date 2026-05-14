# Translation Judge Summary

- Slug: quiz-destructuring-delights
- Locale: zh
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-destructuring-delights --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug quiz-destructuring-delights --locale zh --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-12--quiz-destructuring-delights/zh/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.15
- Input tokens: 21053
- Output tokens: 193
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011106
- Estimated cost: $0.011106

## Candidates
- current not present
- 622ac19e6da54d0975705472d0331483581318ca i18n candidate(zh): quiz-destructuring-delights via deepseek/deepseek-v4-flash
- 02e9a3bf194af6e334a614d11d7f88d406e2746f i18n candidate(zh): quiz-destructuring-delights via openrouter/openai/gpt-oss-120b:nitro
- f684185c2a1b0a3c21150bc37b2ee0f3f6c43668 i18n candidate(zh): quiz-destructuring-delights via openrouter/google/gemini-3-flash-preview
