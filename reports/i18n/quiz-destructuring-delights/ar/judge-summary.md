# Translation Judge Summary

- Slug: quiz-destructuring-delights
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-destructuring-delights --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug quiz-destructuring-delights --locale ar --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-12--quiz-destructuring-delights/ar/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.47
- Input tokens: 16811
- Output tokens: 140
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008826
- Estimated cost: $0.008826

## Candidates
- current not present
- 466cc1040acdf3e080abef097e0bbe7c82b636e4 i18n candidate(ar): quiz-destructuring-delights via openrouter/deepseek/deepseek-v4-flash
- 2e0b0ca4bbb5c9c7c0ae33dbad12dc0cc41124af i18n candidate(ar): quiz-destructuring-delights via openrouter/openai/gpt-oss-120b:nitro
