# Translation Judge Summary

- Slug: securing-clawdbot-tailscale
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug securing-clawdbot-tailscale --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug securing-clawdbot-tailscale --locale hi --skip-global
207 |     ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
208 |   ];
209 | 
210 |   if (nestedAssetReferences.length === 0) return;
211 | 
212 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-26--securing-clawdbot-tailscale/hi/index.mdx uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:212:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.73
- Input tokens: 20523
- Output tokens: 193
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.010840

### Round 1, Batch 2
- Runtime seconds: 2.51
- Input tokens: 20819
- Output tokens: 212
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011045

### Round 1, Batch 3
- Runtime seconds: 2.56
- Input tokens: 12849
- Output tokens: 269
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.007232

## Primary Judge Telemetry
- Runtime seconds: 2.54
- Input tokens: 21025
- Output tokens: 205
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011128

## Candidates
- current src/content/posts/2026-01-26--securing-clawdbot-tailscale/hi/index.mdx
- e8c037cedb58f33b5e79169473d5e483eeeac0af i18n candidate(hi): securing-clawdbot-tailscale via openrouter/qwen/qwen3.6-plus
- 24bb6a77b41d848fec3153aa6255af43263fa300 i18n candidate(hi): securing-clawdbot-tailscale via openrouter/moonshotai/kimi-k2.6
- 6c3fe6697159665487a8709692f2338b3aa452aa i18n candidate(hi): securing-clawdbot-tailscale via openrouter/google/gemini-3-flash-preview
- 9073ad7239878fcc2e66fb23dd1db8d6b3d5b697 i18n candidate(hi): securing-clawdbot-tailscale via openrouter/z-ai/glm-5.1
- 64b48ae86d98fc0919d8733909fe7353822d58be i18n candidate(hi): securing-clawdbot-tailscale via openrouter/minimax/minimax-m2.7
- 85cfe177190cac3087d26ab1ea5fa9caf9143fa9 i18n candidate(hi): securing-clawdbot-tailscale via openrouter/openai/gpt-oss-120b:nitro
- c1d0d6dcfad0a8cb77698f350acd4c82b4b0d93a i18n candidate(hi): securing-clawdbot-tailscale via openrouter/qwen/qwen3-32b:nitro
