# Translation Judge Summary

- Slug: mastra-mcp-tool-integrations
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug mastra-mcp-tool-integrations --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-mcp-tool-integrations --locale hi --skip-global
207 |     ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
208 |   ];
209 | 
210 |   if (nestedAssetReferences.length === 0) return;
211 | 
212 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-04--mastra-mcp-tool-integrations/hi/index.mdx uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:212:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.80
- Input tokens: 13321
- Output tokens: 260
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.007441

### Round 1, Batch 2
- Runtime seconds: 2.55
- Input tokens: 10751
- Output tokens: 228
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006059

## Primary Judge Telemetry
- Runtime seconds: 2.07
- Input tokens: 10770
- Output tokens: 202
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005991

## Candidates
- current src/content/posts/2026-01-04--mastra-mcp-tool-integrations/hi/index.mdx
- d8f2f28ac8fa38473647f4477b7dbb1dd7e6b9c5 i18n candidate(hi): mastra-mcp-tool-integrations via openrouter/qwen/qwen3.6-plus
- 5d47c4b7618819a4b84218476a2125113beecfb5 i18n candidate(hi): mastra-mcp-tool-integrations via openrouter/moonshotai/kimi-k2.6
- 40e031e429539adb39f0015a0d3f1f9fa096e39c i18n candidate(hi): mastra-mcp-tool-integrations via openrouter/google/gemini-3-flash-preview
- ddda3b80731db5927eb4b9065c4b5203e7acfd5e i18n candidate(hi): mastra-mcp-tool-integrations via openrouter/z-ai/glm-5.1
- a95fb8f753baa5d4cbe663fca581444d5ff5bf93 i18n candidate(hi): mastra-mcp-tool-integrations via openrouter/minimax/minimax-m2.7
