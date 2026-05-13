# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug mastra-security-guardrails --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-security-guardrails --locale ja --skip-global
207 |     ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
208 |   ];
209 | 
210 |   if (nestedAssetReferences.length === 0) return;
211 | 
212 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/ja/index.mdx uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:212:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.27
- Input tokens: 12627
- Output tokens: 167
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006815

### Round 1, Batch 2
- Runtime seconds: 2.62
- Input tokens: 12645
- Output tokens: 198
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006916

### Round 1, Batch 3
- Runtime seconds: 3.22
- Input tokens: 8048
- Output tokens: 461
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005407

## Primary Judge Telemetry
- Runtime seconds: 2.03
- Input tokens: 12724
- Output tokens: 155
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006827

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/ja/index.mdx
- fb1628238f1d15cd8265ba1e597647c7c0a99f2c i18n candidate(ja): mastra-security-guardrails via openrouter/qwen/qwen3.6-plus
- c05809c009d2f35fc936d6b70014bb90638f08ff i18n candidate(ja): mastra-security-guardrails via openrouter/moonshotai/kimi-k2.6
- 42db8649c160e66e33e7afd2c4bf5ecf1d175b2d i18n candidate(ja): mastra-security-guardrails via openrouter/google/gemini-3-flash-preview
- 5f3ecf42ad58c4d8a5de0e64ca17b5b4f6914cb5 i18n candidate(ja): mastra-security-guardrails via openrouter/z-ai/glm-5.1
- 91b28248dbb0a2a78f35e41244a034900ba20f3f i18n candidate(ja): mastra-security-guardrails via openrouter/minimax/minimax-m2.7
- 89060ae2bc24af5ef9a31f8fb43d78ec44a98e47 i18n candidate(ja): mastra-security-guardrails via openrouter/openai/gpt-oss-120b:nitro
- 84e73f502d0a2e0a443dc9dfc6acb6b09a0d810d i18n candidate(ja): mastra-security-guardrails via openrouter/qwen/qwen3-32b:nitro
