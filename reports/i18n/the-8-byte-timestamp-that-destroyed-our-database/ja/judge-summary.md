# Translation Judge Summary

- Slug: the-8-byte-timestamp-that-destroyed-our-database
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug the-8-byte-timestamp-that-destroyed-our-database --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "the-8-byte-timestamp-that-destroyed-our-database" --locale ja --skip-global
20 |   }
21 | 
22 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
23 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
24 |   if (targetLength < minimumLength || targetLength > maximumLength) {
25 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/ja/index.mdx changed comparable body length from 9011 chars in English to 5023 chars. Expected 5857-12165 chars (within 35%).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:25:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:26:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.13
- Input tokens: 14665
- Output tokens: 332
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008329

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.24
- Input tokens: 9217
- Output tokens: 731
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006802

### Pass 2
- Runtime seconds: 4.68
- Input tokens: 9504
- Output tokens: 830
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.007242

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "切手" Replacement: "切符" Reason: The word 'ticket' (train ticket) was translated as '切手' (postage stamp) instead of '切符' (transportation ticket) throughout the text. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "ISO 8601 Date and Time Format" Replacement: "ISO 8601 日付と時刻の形式" Reason: The resource link text should be translated for consistency with the rest of the document. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "切手にはこう書かれていた:" Replacement: "切符にはこう書かれていた:" Reason: The word 'ticket' (train ticket) was translated as '切手' (postage stamp) instead of '切符' (transportation ticket). Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "同じ切手の中に" Replacement: "同じ切符の中に" Reason: The word 'ticket' (train ticket) was translated as '切手' (postage stamp) instead of '切符' (transportation ticket). Note: Applied exact replacement to selected MDX.
5. Pass 2: applied high priority suggestion. Match: "電車の切手の場合はどうか" Replacement: "電車の切符の場合はどうか" Reason: The word 'ticket' (train ticket) was translated as '切手' (postage stamp) instead of '切符' (transportation ticket). Note: Applied exact replacement to selected MDX.
6. Pass 2: applied high priority suggestion. Match: "電車の切手と同じことができる" Replacement: "電車の切符と同じことができる" Reason: The word 'ticket' (train ticket) was translated as '切手' (postage stamp) instead of '切符' (transportation ticket). Note: Applied exact replacement to selected MDX.
7. Pass 2: applied high priority suggestion. Match: "東京から切手を予約する人も" Replacement: "東京から切符を予約する人も" Reason: The word 'ticket' (train ticket) was translated as '切手' (postage stamp) instead of '切符' (transportation ticket). Note: Applied exact replacement to selected MDX.
8. Pass 2: applied high priority suggestion. Match: "あの電車の切手は正しかった" Replacement: "あの電車の切符は正しかった" Reason: The word 'ticket' (train ticket) was translated as '切手' (postage stamp) instead of '切符' (transportation ticket). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/ja/index.mdx
- 320144cf563eefbb711a87abd45111b8b844d22b i18n candidate(ja): the-8-byte-timestamp-that-destroyed-our-database via openrouter/qwen/qwen3.6-plus
- bf77446932f62fb2117e1cad06e7b5850569df3a i18n candidate(ja): the-8-byte-timestamp-that-destroyed-our-database via openrouter/openai/gpt-oss-120b:nitro
- e6695cadb781352aa91853d4050ae619b6b0073a i18n candidate(ja): the-8-byte-timestamp-that-destroyed-our-database via openrouter/qwen/qwen3-32b:nitro
