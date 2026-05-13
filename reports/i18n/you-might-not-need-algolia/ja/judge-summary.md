# Translation Judge Summary

- Slug: you-might-not-need-algolia
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug you-might-not-need-algolia --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug you-might-not-need-algolia --locale ja --skip-global
20 |   }
21 | 
22 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
23 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
24 |   if (targetLength < minimumLength || targetLength > maximumLength) {
25 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-03-01--you-might-not-need-algolia/ja/index.mdx changed comparable body length from 4859 chars in English to 2731 chars. Expected 3158-6560 chars (within 35%).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:25:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:26:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.86
- Input tokens: 8529
- Output tokens: 306
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005182

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.15
- Input tokens: 5581
- Output tokens: 220
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003451

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "それは品味だ。" Replacement: "それは「センス」の問題だ。" Reason: '品味' is a literal translation of 'taste' that sounds unnatural in Japanese technical writing. 'センス' or '好みの問題' is better. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "インフラのコスプレに過ぎないかもしれない。" Replacement: "「インフラのコスプレ」になってしまっているかもしれない。" Reason: Adding quotes helps convey the metaphorical nature of 'infrastructure cosplay' in Japanese. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-03-01--you-might-not-need-algolia/ja/index.mdx
- d3fdc63b33cdee42491125e09fdfb21d5b2f76a7 i18n candidate(ja): you-might-not-need-algolia via openrouter/qwen/qwen3.6-plus
- 62e1e5a229a0002f764f61fc33717d0e6c1d3f5a i18n candidate(ja): you-might-not-need-algolia via openrouter/openai/gpt-oss-120b:nitro
- 56fc8b713a264d42f3f5bc2aaa07d58189b13efb i18n candidate(ja): you-might-not-need-algolia via openrouter/qwen/qwen3-32b:nitro
