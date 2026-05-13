# Translation Judge Summary

- Slug: quiz-data-structures-algorithms
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-data-structures-algorithms --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug quiz-data-structures-algorithms --locale ja --skip-global
20 |   }
21 | 
22 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
23 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
24 |   if (targetLength < minimumLength || targetLength > maximumLength) {
25 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-10-31--quiz-data-structures-algorithms/ja/index.mdx changed comparable body length from 17373 chars in English to 10567 chars. Expected 11292-23454 chars (within 35%).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:25:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:26:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.85
- Input tokens: 20664
- Output tokens: 261
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011115

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.72
- Input tokens: 16587
- Output tokens: 304
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.009206

### Pass 2
- Runtime seconds: 3.40
- Input tokens: 16532
- Output tokens: 385
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.009421

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "subTitle: バイナリツリーをBSできるか？" Replacement: "subTitle: \"バイナリツリーをBSできるか？\"" Reason: The subTitle value should be wrapped in quotes for consistency and to avoid potential YAML parsing issues with special characters. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "subTitle: バイナリツリーをBSできるか？" Replacement: "subTitle: \"バイナリツリーをBSできるか？\"" Reason: The subTitle value should be wrapped in quotes for consistency and to avoid potential YAML parsing issues with special characters like question marks. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-10-31--quiz-data-structures-algorithms/ja/index.mdx
- 305b6da1d8cefb75a98687ba9a19680a168f4ab1 i18n candidate(ja): quiz-data-structures-algorithms via openrouter/openai/gpt-oss-120b:nitro
- f1afa39b1f1a9f8c673c44cbb31f7d3db1238f11 i18n candidate(ja): quiz-data-structures-algorithms via openrouter/qwen/qwen3-32b:nitro
