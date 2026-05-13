# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale hi --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/hi/index.mdx changed heading counts. H1: English has 0, translation has 15; H2: English has 10, translation has 9; H3: English has 17, translation has 14; H4: English has 11, translation has 8
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.46
- Input tokens: 39053
- Output tokens: 194
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.020109

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/hi/index.mdx
- 6e71ade27afda2f6e40db61d256cd6f3075e2a0c i18n candidate(hi): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 13e9a080a5e591f3f7d4ad893403ca81fa69e797 i18n candidate(hi): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
