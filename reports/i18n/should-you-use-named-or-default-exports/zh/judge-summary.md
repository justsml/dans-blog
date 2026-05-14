# Translation Judge Summary

- Slug: should-you-use-named-or-default-exports
- Locale: zh
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.90
- Input tokens: 6954
- Output tokens: 288
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004341
- Estimated cost: $0.004341

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.22
- Input tokens: 5740
- Output tokens: 211
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003503
- Estimated cost: $0.003503

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "// You can alias using both!" Replacement: "// 两种方式都可以起别名！" Reason: The code comment was left in English. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "// However, once declared you can export a const var as the default." Replacement: "// 但是，一旦声明，你就可以将 const 变量作为默认导出。" Reason: The code comment was left in English. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "// For completeness:" Replacement: "// 为了完整起见：" Reason: The code comment was left in English. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 5a1bd36f0f858751ad4b6a63e9ef0c624a3738df i18n candidate(zh): should-you-use-named-or-default-exports via openrouter/google/gemini-3-flash-preview
- 1a3da4adb4882832b3910b9661264d5106620745 i18n candidate(zh): should-you-use-named-or-default-exports via deepseek/deepseek-v4-flash
- db6ae830fab31fc0d6d1924171d3b1a3444df65e i18n candidate(zh): should-you-use-named-or-default-exports via openrouter/qwen/qwen3-32b:nitro
