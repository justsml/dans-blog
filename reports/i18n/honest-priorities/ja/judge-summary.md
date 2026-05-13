# Translation Judge Summary

- Slug: honest-priorities
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug honest-priorities --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug honest-priorities --locale ja --skip-global
20 |   }
21 | 
22 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
23 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
24 |   if (targetLength < minimumLength || targetLength > maximumLength) {
25 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-10-23--honest-priorities/ja/index.mdx changed comparable body length from 5527 chars in English to 3122 chars. Expected 3592-7462 chars (within 35%).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:25:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:26:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.88
- Input tokens: 10707
- Output tokens: 258
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006128

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.54
- Input tokens: 6609
- Output tokens: 283
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004154

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "ビザロートロフィールーム" Replacement: "ビザロ・トロフィールーム" Reason: 'Bizzaro' is a reference to the DC Comics character/world where everything is the opposite. Adding a middle dot makes it more readable as a loanword phrase in Japanese. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-10-23--honest-priorities/ja/index.mdx
- d48b6a4c8bc3a31df12dd7e1b5a790895205677a i18n candidate(ja): honest-priorities via openrouter/qwen/qwen3.6-plus
- feb79662e4e109ed81cf648aa3fb048d68770a3d i18n candidate(ja): honest-priorities via openrouter/openai/gpt-oss-120b:nitro
- 2f036179066133293b8e318c14ca4a52d35c5a59 i18n candidate(ja): honest-priorities via openrouter/qwen/qwen3-32b:nitro
