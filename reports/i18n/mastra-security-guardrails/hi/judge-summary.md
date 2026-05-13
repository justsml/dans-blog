# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug mastra-security-guardrails --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-security-guardrails --locale hi --skip-global
207 |     ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
208 |   ];
209 | 
210 |   if (nestedAssetReferences.length === 0) return;
211 | 
212 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/hi/index.mdx uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:212:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.50
- Input tokens: 13331
- Output tokens: 175
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.007190

### Round 1, Batch 2
- Runtime seconds: 2.22
- Input tokens: 13032
- Output tokens: 199
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.007113

### Round 1, Batch 3
- Runtime seconds: 2.37
- Input tokens: 8130
- Output tokens: 243
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004794

## Primary Judge Telemetry
- Runtime seconds: 2.29
- Input tokens: 10749
- Output tokens: 185
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005929

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/hi/index.mdx
- 3eb5577b15b0abdfba658e8d82a1a204a3e55c66 i18n candidate(hi): mastra-security-guardrails via openrouter/qwen/qwen3.6-plus
- 7c13f90a10f83728e7e442206ba9c0be55315bdf i18n candidate(hi): mastra-security-guardrails via openrouter/moonshotai/kimi-k2.6
- dfe316a3290cdbe32728d6874c0a34cfd9253bc9 i18n candidate(hi): mastra-security-guardrails via openrouter/google/gemini-3-flash-preview
- de686f45fd0b3842f45d122848e85b861936e0c2 i18n candidate(hi): mastra-security-guardrails via openrouter/z-ai/glm-5.1
- f3f290dbff0b912169b7c6cc3a2977865186b0c6 i18n candidate(hi): mastra-security-guardrails via openrouter/minimax/minimax-m2.7
- ff907776c0ca41a77c6853dd6aa208db00914e1d i18n candidate(hi): mastra-security-guardrails via openrouter/openai/gpt-oss-120b:nitro
- ee03ed849a8824942d9d9e55e152714283527395 i18n candidate(hi): mastra-security-guardrails via openrouter/qwen/qwen3-32b:nitro
