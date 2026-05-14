# Translation Judge Summary

- Slug: into-the-breach
- Locale: zh
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug into-the-breach --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug into-the-breach --locale zh --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-13--into-the-breach/zh/index.mdx changed heading counts. H4: English has 1, translation has 2
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.35
- Input tokens: 19796
- Output tokens: 193
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010477
- Estimated cost: $0.010477

## Candidates
- current not present
- 78734fe52a3af7c057b252263aec6fefad9102b2 i18n candidate(zh): into-the-breach via openrouter/deepseek/deepseek-v4-flash
- b80f4df226292c8678b7a8ece9232bcc6a77359b i18n candidate(zh): into-the-breach via openrouter/google/gemini-3-flash-preview
