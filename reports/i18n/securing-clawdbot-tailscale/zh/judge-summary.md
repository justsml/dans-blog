# Translation Judge Summary

- Slug: securing-clawdbot-tailscale
- Locale: zh
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug securing-clawdbot-tailscale --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug securing-clawdbot-tailscale --locale zh --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-26--securing-clawdbot-tailscale/zh/index.mdx changed heading counts. H3: English has 8, translation has 7
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.45
- Input tokens: 18180
- Output tokens: 179
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009627
- Estimated cost: $0.009627

## Candidates
- current src/content/posts/2026-01-26--securing-clawdbot-tailscale/zh/index.mdx
- 0ac6d96f6c3754c6eb0ef5dfa1b50b4339ef0dbb i18n candidate(zh): securing-clawdbot-tailscale via openrouter/qwen/qwen3-32b:nitro
- f6aac862112412d06e0c96517c961dc5421e47fd i18n candidate(zh): securing-clawdbot-tailscale via openrouter/google/gemini-3-flash-preview
- b399e165e4f19d9607a5ecdfa29e7378e561a12d i18n candidate(zh): securing-clawdbot-tailscale via openrouter/openai/gpt-oss-120b:nitro
