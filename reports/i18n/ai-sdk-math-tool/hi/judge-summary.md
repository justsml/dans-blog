# Translation Judge Summary

- Slug: ai-sdk-math-tool
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug ai-sdk-math-tool --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug ai-sdk-math-tool --locale hi --skip-global
207 |     ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
208 |   ];
209 | 
210 |   if (nestedAssetReferences.length === 0) return;
211 | 
212 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-06--ai-sdk-math-tool/hi/index.mdx uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:212:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 3.06
- Input tokens: 12328
- Output tokens: 342
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.007190

### Round 1, Batch 2
- Runtime seconds: 2.06
- Input tokens: 12107
- Output tokens: 185
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006608

### Round 1, Batch 3
- Runtime seconds: 2.93
- Input tokens: 7214
- Output tokens: 299
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004504

## Primary Judge Telemetry
- Runtime seconds: 2.56
- Input tokens: 12038
- Output tokens: 247
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006760

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.40
- Input tokens: 7850
- Output tokens: 241
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004648

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "दिनांतर हेरफेर" Replacement: "तारीख हेरफेर" Reason: 'दिनांतर' is not a standard term for date manipulation; 'तारीख' or 'दिनांक' is more natural. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-06--ai-sdk-math-tool/hi/index.mdx
- 87c627ed2b01a4c19169df4ccd4a92bb1643693e i18n candidate(hi): ai-sdk-math-tool via openrouter/qwen/qwen3.6-plus
- 57048839ff17f8e9aea5ed59db70355d300392e5 i18n candidate(hi): ai-sdk-math-tool via openrouter/moonshotai/kimi-k2.6
- 9aa562139a5d76450d18be887724f559c68cac36 i18n candidate(hi): ai-sdk-math-tool via openrouter/google/gemini-3-flash-preview
- 2b141c093f217a2dc57e4017dd92ffc4a76339aa i18n candidate(hi): ai-sdk-math-tool via openrouter/z-ai/glm-5.1
- ad5622848049b17e15b00fcc4f11a415fec40fda i18n candidate(hi): ai-sdk-math-tool via openrouter/minimax/minimax-m2.7
- 8dd2e86f8a473fac847f855633e67ba104c95574 i18n candidate(hi): ai-sdk-math-tool via openrouter/openai/gpt-oss-120b:nitro
- e0a19aa8343a48c19b1945ef1e212f2650d0ed89 i18n candidate(hi): ai-sdk-math-tool via openrouter/qwen/qwen3-32b:nitro
