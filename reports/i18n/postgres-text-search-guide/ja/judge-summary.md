# Translation Judge Summary

- Slug: postgres-text-search-guide
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug postgres-text-search-guide --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug postgres-text-search-guide --locale ja --skip-global
207 |     ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
208 |   ];
209 | 
210 |   if (nestedAssetReferences.length === 0) return;
211 | 
212 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-02--postgres-text-search-guide/ja/index.mdx uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:212:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.47
- Input tokens: 43309
- Output tokens: 177
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.022186

### Round 1, Batch 2
- Runtime seconds: 2.35
- Input tokens: 43437
- Output tokens: 191
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.022291

### Round 1, Batch 3
- Runtime seconds: 2.41
- Input tokens: 26337
- Output tokens: 192
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.013744

## Primary Judge Telemetry
- Runtime seconds: 3.03
- Input tokens: 34728
- Output tokens: 271
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.018177

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.58
- Input tokens: 25840
- Output tokens: 244
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.013652

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "sophistication" Replacement: "洗練度" Reason: The candidate left the English word 'sophistication' untranslated in the text. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-02--postgres-text-search-guide/ja/index.mdx
- 55f12900b475b600a88dc81d0b1fb5dff6d735df i18n candidate(ja): postgres-text-search-guide via openrouter/qwen/qwen3.6-plus
- d6c9939b4d5ad1ec7a82c54b6ed9603cac869788 i18n candidate(ja): postgres-text-search-guide via openrouter/moonshotai/kimi-k2.6
- 35aef4d9cc4b17bbb0d77b94c56917c7a4362126 i18n candidate(ja): postgres-text-search-guide via openrouter/google/gemini-3-flash-preview
- 50f1120bea6153edbd714d61574595991d61faf5 i18n candidate(ja): postgres-text-search-guide via openrouter/z-ai/glm-5.1
- f26e4065890f99f8ed03f5bdf94ccb8ae1080f53 i18n candidate(ja): postgres-text-search-guide via openrouter/minimax/minimax-m2.7
- 9893ab08e7a3f6730994c53d8184db1bf972a8dd i18n candidate(ja): postgres-text-search-guide via openrouter/qwen/qwen3-32b:nitro
- 21bdb4aee438c1f04fe7cd7f512a43cbe2951306 i18n candidate(ja): postgres-text-search-guide via openrouter/openai/gpt-oss-120b:nitro
