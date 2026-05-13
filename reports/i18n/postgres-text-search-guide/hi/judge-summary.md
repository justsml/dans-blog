# Translation Judge Summary

- Slug: postgres-text-search-guide
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug postgres-text-search-guide --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug postgres-text-search-guide --locale hi --skip-global
207 |     ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
208 |   ];
209 | 
210 |   if (nestedAssetReferences.length === 0) return;
211 | 
212 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-02--postgres-text-search-guide/hi/index.mdx uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:212:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.76
- Input tokens: 44397
- Output tokens: 182
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.022745

### Round 1, Batch 2
- Runtime seconds: 3.60
- Input tokens: 44390
- Output tokens: 309
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.023122

## Primary Judge Telemetry
- Runtime seconds: 2.64
- Input tokens: 35523
- Output tokens: 177
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.018292

## Candidates
- current src/content/posts/2026-05-02--postgres-text-search-guide/hi/index.mdx
- b70c847c384b31d9f234453c6da26cfd8fb7790a i18n candidate(hi): postgres-text-search-guide via openrouter/qwen/qwen3.6-plus
- 6a520356b74eea0f1f69e159d52073a22813944c i18n candidate(hi): postgres-text-search-guide via openrouter/moonshotai/kimi-k2.6
- 19fed039f86d86cb2f006b6a8edcc65dce347a65 i18n candidate(hi): postgres-text-search-guide via openrouter/z-ai/glm-5.1
- d2106d27de2bdfd00327cc3c66782baa46dc8ad4 i18n candidate(hi): postgres-text-search-guide via openrouter/minimax/minimax-m2.7
- fb2399c0660e17f549fcd146c9bf029b562a014a i18n candidate(hi): postgres-text-search-guide via openrouter/openai/gpt-oss-120b:nitro
- 83100c8bdc5564915a55e91c3bd861d13222ba3d i18n candidate(hi): postgres-text-search-guide via openrouter/qwen/qwen3-32b:nitro
