# Translation Judge Summary

- Slug: mastering-functional-pipelines-passing-state
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug mastering-functional-pipelines-passing-state --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastering-functional-pipelines-passing-state --locale ja --skip-global
20 |   }
21 | 
22 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
23 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
24 |   if (targetLength < minimumLength || targetLength > maximumLength) {
25 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/ja/index.mdx changed comparable body length from 8431 chars in English to 5479 chars. Expected 5480-11382 chars (within 35%).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:25:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:26:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.57
- Input tokens: 11174
- Output tokens: 229
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006274

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.31
- Input tokens: 8534
- Output tokens: 247
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005008

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "####欠点" Replacement: "#### 短所" Reason: Missing space after heading markers and inconsistent terminology with the 'Pros' section. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/ja/index.mdx
- a4a2b96c84bf334de567c5c21ee895bc87711791 i18n candidate(ja): mastering-functional-pipelines-passing-state via openrouter/openai/gpt-oss-120b:nitro
- 7367f219117b2082dea98c129b9be2a74fd8adcb i18n candidate(ja): mastering-functional-pipelines-passing-state via deepseek/deepseek-v4-flash
