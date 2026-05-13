# Translation Judge Summary

- Slug: llm-connection-strings
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug llm-connection-strings --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug llm-connection-strings --locale ja --skip-global
20 |   }
21 | 
22 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
23 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
24 |   if (targetLength < minimumLength || targetLength > maximumLength) {
25 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-30--llm-connection-strings/ja/index.mdx changed comparable body length from 4678 chars in English to 2935 chars. Expected 3040-6316 chars (within 35%).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:25:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:26:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.14
- Input tokens: 9347
- Output tokens: 209
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005300

### Round 1, Batch 2
- Runtime seconds: 2.70
- Input tokens: 9211
- Output tokens: 308
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005529

## Primary Judge Telemetry
- Runtime seconds: 2.45
- Input tokens: 7464
- Output tokens: 233
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004431

## Candidates
- current src/content/posts/2026-01-30--llm-connection-strings/ja/index.mdx
- a4343c45eb31e810b4d600a64af11ea55f87655a i18n candidate(ja): llm-connection-strings via openrouter/qwen/qwen3.6-plus
- 6da61a7a83231a7c355a2e9f234d1c218bf62076 i18n candidate(ja): llm-connection-strings via openrouter/moonshotai/kimi-k2.6
- 27f1960e7fb5b202d11323b6f2379458878fc213 i18n candidate(ja): llm-connection-strings via openrouter/google/gemini-3-flash-preview
- 56999e102a49461606be74f4ae821c271a9cc740 i18n candidate(ja): llm-connection-strings via openrouter/z-ai/glm-5.1
- 84ecc4d8f70a8a7c5eaba9790b4970b48333a4cd i18n candidate(ja): llm-connection-strings via openrouter/openai/gpt-oss-120b:nitro
- 566e6365ff987f28a46bc17ea8555b6f6ab0ea04 i18n candidate(ja): llm-connection-strings via openrouter/qwen/qwen3-32b:nitro
