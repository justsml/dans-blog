# Translation Judge Summary

- Slug: semantic-vector-search-landscape
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug semantic-vector-search-landscape --locale es --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug semantic-vector-search-landscape --locale es --skip-global
207 |     ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
208 |   ];
209 | 
210 |   if (nestedAssetReferences.length === 0) return;
211 | 
212 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-01--semantic-vector-search-landscape/es/index.mdx uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:212:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 4.46
- Input tokens: 38892
- Output tokens: 164
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.019938

### Round 1, Batch 2
- Runtime seconds: 2.71
- Input tokens: 31384
- Output tokens: 308
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.016616

## Primary Judge Telemetry
- Runtime seconds: 2.28
- Input tokens: 31280
- Output tokens: 188
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.016204

## Candidates
- current src/content/posts/2026-05-01--semantic-vector-search-landscape/es/index.mdx
- 8e35a85c8c89e19c7f242ebd949cc3982a78272d i18n candidate(es): semantic-vector-search-landscape via openrouter/qwen/qwen3.6-plus
- 7093a8acf18ea159a1ecd9df982f86b9af2427bc i18n candidate(es): semantic-vector-search-landscape via openrouter/google/gemini-3-flash-preview
- 197698a8b427534e6c257ad68d9fabf46e27bf80 i18n candidate(es): semantic-vector-search-landscape via openrouter/z-ai/glm-5.1
- a414394e9a5d7e5de0ebff01a6081177f97cb1ce i18n candidate(es): semantic-vector-search-landscape via openrouter/openai/gpt-oss-120b:nitro
- 69d16ad3bc1478a5091ca8de534ed72edc3611ad i18n candidate(es): semantic-vector-search-landscape via openrouter/qwen/qwen3-32b:nitro
