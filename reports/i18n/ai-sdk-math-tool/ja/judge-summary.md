# Translation Judge Summary

- Slug: ai-sdk-math-tool
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug ai-sdk-math-tool --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug ai-sdk-math-tool --locale ja --skip-global
191 |     ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
192 |   ];
193 | 
194 |   if (nestedAssetReferences.length === 0) return;
195 | 
196 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-06--ai-sdk-math-tool/ja/index.mdx uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:196:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:30:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.29
- Input tokens: 11396
- Output tokens: 304
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006610
- Estimated cost: $0.006610

## Candidates
- current src/content/posts/2026-01-06--ai-sdk-math-tool/ja/index.mdx
- 509025717919581bc0d2ff32d2327fb7965f265a i18n candidate(ja): ai-sdk-math-tool via openrouter/z-ai/glm-5.1
- 304d00fc39aa42d10c041e7505991e74364eecbb i18n candidate(ja): ai-sdk-math-tool via openrouter/minimax/minimax-m2.7
- 6abfd446afb591078ba949a6ef8569d30987539d i18n candidate(ja): ai-sdk-math-tool via openrouter/qwen/qwen3-32b:nitro
