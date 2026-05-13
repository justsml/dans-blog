# Translation Judge Summary

- Slug: weakmap-the-javascript-feature-you-dont-use
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug weakmap-the-javascript-feature-you-dont-use --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug weakmap-the-javascript-feature-you-dont-use --locale ja --skip-global
20 |   }
21 | 
22 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
23 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
24 |   if (targetLength < minimumLength || targetLength > maximumLength) {
25 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/ja/index.mdx changed comparable body length from 6461 chars in English to 3611 chars. Expected 4199-8723 chars (within 35%).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:25:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:26:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.68
- Input tokens: 10579
- Output tokens: 273
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006109

### Round 1, Batch 2
- Runtime seconds: 2.61
- Input tokens: 10576
- Output tokens: 285
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006143

## Primary Judge Telemetry
- Runtime seconds: 2.30
- Input tokens: 8545
- Output tokens: 196
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004861

## Candidates
- current src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/ja/index.mdx
- c1d3df1552e6085207cae4f3a9b4ec1971412ca5 i18n candidate(ja): weakmap-the-javascript-feature-you-dont-use via openrouter/qwen/qwen3.6-plus
- 814a06c082327eee91a893fffb43cb987fbe030b i18n candidate(ja): weakmap-the-javascript-feature-you-dont-use via openrouter/moonshotai/kimi-k2.6
- 3a82ddad4ab9a5a8aa8d99797ec463cb8399818b i18n candidate(ja): weakmap-the-javascript-feature-you-dont-use via openrouter/google/gemini-3-flash-preview
- 78f78d067c697d0a7932a6027acf9da472ea048e i18n candidate(ja): weakmap-the-javascript-feature-you-dont-use via openrouter/z-ai/glm-5.1
- 0355b839ebadbc2ddccb4d2522b052dd7f047bee i18n candidate(ja): weakmap-the-javascript-feature-you-dont-use via openrouter/openai/gpt-oss-120b:nitro
- 99d4caea4398b5345b2532cb181b7157ae9e0daf i18n candidate(ja): weakmap-the-javascript-feature-you-dont-use via openrouter/qwen/qwen3-32b:nitro
