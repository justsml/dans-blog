# Translation Judge Summary

- Slug: into-the-breach
- Locale: zh
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug into-the-breach --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug into-the-breach --locale zh --skip-global
118 |     })
119 |     .filter((message): message is string => message != null);
120 | 
121 |   if (mismatches.length === 0) return;
122 | 
123 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-13--into-the-breach/zh/index.mdx changed heading counts. H2: English has 9, translation has 12; H3: English has 5, translation has 7; H4: English has 0, translation has 2
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:123:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 3.51
- Input tokens: 31238
- Output tokens: 275
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016444
- Estimated cost: $0.016444

### Round 1, Batch 2
- Runtime seconds: 3.28
- Input tokens: 30202
- Output tokens: 273
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015920
- Estimated cost: $0.015920

### Round 1, Batch 3
- Runtime seconds: 2.87
- Input tokens: 30641
- Output tokens: 255
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016085
- Estimated cost: $0.016085

### Round 1, Batch 4
- Runtime seconds: 2.57
- Input tokens: 24151
- Output tokens: 212
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.012712
- Estimated cost: $0.012712

### Round 2, Batch 1
- Runtime seconds: 2.80
- Input tokens: 30331
- Output tokens: 239
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015883
- Estimated cost: $0.015883

### Round 2, Batch 2
- Runtime seconds: 3.22
- Input tokens: 17699
- Output tokens: 340
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009869
- Estimated cost: $0.009869

## Primary Judge Telemetry
- Runtime seconds: 2.63
- Input tokens: 23994
- Output tokens: 248
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.012741
- Estimated cost: $0.012741

## Candidates
- current src/content/posts/2026-05-13--into-the-breach/zh/index.mdx
- 78734fe52a3af7c057b252263aec6fefad9102b2 i18n candidate(zh): into-the-breach via openrouter/deepseek/deepseek-v4-flash
- b80f4df226292c8678b7a8ece9232bcc6a77359b i18n candidate(zh): into-the-breach via openrouter/google/gemini-3-flash-preview
- 2bdd012a810ae8066923e974a645c9aaefa2bc24 i18n candidate(zh): into-the-breach via openrouter/google/gemini-3-flash-preview
- d4de6a7102cdc27d837793d0edb1b7573e97fea3 i18n candidate(zh): into-the-breach via deepseek/deepseek-v4-flash
- aeba88f9359c59766a116e64b1db6b57aa4bbd83 i18n candidate(zh): into-the-breach via openrouter/qwen/qwen3-32b:nitro
- f1fa2ba7679b74a49bb08ae85677d683c1c8c1a7 i18n candidate(zh): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
- e5cec1b7d0b0e960f76e091d8c584bffb8936c46 i18n candidate(zh): into-the-breach via openrouter/qwen/qwen3-32b:nitro
- 282dd917495d3cfb2378e984366e4e60ea061e18 i18n candidate(zh): into-the-breach via deepseek/deepseek-v4-flash
- 4394dd0bfb746ce796ce0ae8024bafa765e57c50 i18n candidate(zh): into-the-breach via openrouter/google/gemini-3-flash-preview
- 7085623492d11c6aee1398b2071671b1c1b8ecae i18n candidate(zh): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
- b952daa5f33cda185cbd7ff3a212988446eb46bc i18n candidate(zh): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
- 37096a632c547555306e230d328054f560a30a44 i18n candidate(zh): into-the-breach via openrouter/deepseek/deepseek-v4-flash
