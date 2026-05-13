# Translation Judge Summary

- Slug: the-unassuming-power-of-multiple-choice-questions
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug the-unassuming-power-of-multiple-choice-questions --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug the-unassuming-power-of-multiple-choice-questions --locale ja --skip-global
20 |   }
21 | 
22 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
23 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
24 |   if (targetLength < minimumLength || targetLength > maximumLength) {
25 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-01--the-unassuming-power-of-multiple-choice-questions/ja/index.mdx changed comparable body length from 4206 chars in English to 2140 chars. Expected 2733-5679 chars (within 35%).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:25:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:26:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.40
- Input tokens: 7523
- Output tokens: 234
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004463

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.13
- Input tokens: 4960
- Output tokens: 233
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003179

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "navigating する" Replacement: "見極める" Reason: The English word 'navigating' was left in the middle of a Japanese sentence; it should be translated for better flow. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-01-01--the-unassuming-power-of-multiple-choice-questions/ja/index.mdx
- 7b37f5bae86588ceb46f22f5c835829bee7ded7e i18n candidate(ja): the-unassuming-power-of-multiple-choice-questions via openrouter/qwen/qwen3.6-plus
- 77bc6295d28d4a66fb156131d0380a53917de9e0 i18n candidate(ja): the-unassuming-power-of-multiple-choice-questions via openrouter/openai/gpt-oss-120b:nitro
- 58f385c08d1c654cf18c1b9757f5555f8ee56994 i18n candidate(ja): the-unassuming-power-of-multiple-choice-questions via openrouter/qwen/qwen3-32b:nitro
