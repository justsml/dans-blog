# Translation Judge Summary

- Slug: postgres-text-search-guide
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug postgres-text-search-guide --locale es --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug postgres-text-search-guide --locale es --skip-global
207 |     ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
208 |   ];
209 | 
210 |   if (nestedAssetReferences.length === 0) return;
211 | 
212 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-02--postgres-text-search-guide/es/index.mdx uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:212:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.59
- Input tokens: 43307
- Output tokens: 182
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.022200

### Round 1, Batch 2
- Runtime seconds: 3.12
- Input tokens: 43255
- Output tokens: 216
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.022276

### Round 1, Batch 3
- Runtime seconds: 1.92
- Input tokens: 26378
- Output tokens: 135
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.013594

## Primary Judge Telemetry
- Runtime seconds: 3.09
- Input tokens: 34819
- Output tokens: 300
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.018309

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.27
- Input tokens: 25921
- Output tokens: 220
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.013621

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "ranking" Replacement: "clasificación" Reason: While 'ranking' is common in tech, 'clasificación' or 'posicionamiento' is more standard in Spanish documentation for search relevance. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-02--postgres-text-search-guide/es/index.mdx
- b515ea61b166d71bae34af4aac9c355e76bfeb4b i18n candidate(es): postgres-text-search-guide via openrouter/qwen/qwen3.6-plus
- 74d85d02a34f95397878ce9e686f1d4920b2877e i18n candidate(es): postgres-text-search-guide via openrouter/moonshotai/kimi-k2.6
- 6271021484ebec235356cfa0d088c667d11f5264 i18n candidate(es): postgres-text-search-guide via openrouter/google/gemini-3-flash-preview
- 7e937dcc886b86df28cd6a600918156adb815065 i18n candidate(es): postgres-text-search-guide via openrouter/z-ai/glm-5.1
- 0b0a34c6fd5d943aa2da5b382fc31e7e56b58e56 i18n candidate(es): postgres-text-search-guide via openrouter/minimax/minimax-m2.7
- 139c754d8a7d1cc9f33514267dd0488209e52652 i18n candidate(es): postgres-text-search-guide via openrouter/openai/gpt-oss-120b:nitro
- 0eb4c6390792f31467138c0f18b1df3559e0e5ca i18n candidate(es): postgres-text-search-guide via openrouter/qwen/qwen3-32b:nitro
