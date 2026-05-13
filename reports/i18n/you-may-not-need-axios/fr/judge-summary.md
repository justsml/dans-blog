# Translation Judge Summary

- Slug: you-may-not-need-axios
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug you-may-not-need-axios --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug you-may-not-need-axios --locale fr --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-11-15--you-may-not-need-axios/fr/index.mdx changed heading counts. H3: English has 17, translation has 18
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.37
- Input tokens: 12404
- Output tokens: 144
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006634

## Candidates
- current src/content/posts/2018-11-15--you-may-not-need-axios/fr/index.mdx
- b566b4f6175aeffa8433c0165a2ca94be21c5e40 i18n candidate(fr): you-may-not-need-axios via openrouter/openai/gpt-oss-120b:nitro
- 84d37ea4004a2a6114aa909b0e6b6f352ef36aba i18n candidate(fr): you-may-not-need-axios via openrouter/qwen/qwen3-32b:nitro
