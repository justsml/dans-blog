# Translation Judge Summary

- Slug: guerrilla-types-in-typescript
- Locale: zh
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug guerrilla-types-in-typescript --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug guerrilla-types-in-typescript --locale zh --skip-global
82 |   }
83 | 
84 |   const sourceFences = sourceContents.match(/```/g)?.length ?? 0;
85 |   const targetFences = targetContents.match(/```/g)?.length ?? 0;
86 |   if (sourceFences !== targetFences) {
87 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2023-09-06--guerrilla-types-in-typescript/zh/index.mdx changed fenced code block count from 22 to 23
      at assertProtectedTokens (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:87:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.34
- Input tokens: 12196
- Output tokens: 220
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006758
- Estimated cost: $0.006758

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.77
- Input tokens: 9804
- Output tokens: 220
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005562
- Estimated cost: $0.005562

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "反叛字体设计" Replacement: "叛逆的类型设计" Reason: The subtitle 'Renegade Type Design' refers to programming types, not fonts (字体). Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 6ef6b5928646e8b118fbf4edb91ed6da72256a3a i18n candidate(zh): guerrilla-types-in-typescript via deepseek/deepseek-v4-flash
- 8a0f02aa7ae4c68a74834c65e03f931a48b6eb62 i18n candidate(zh): guerrilla-types-in-typescript via openrouter/qwen/qwen3-32b:nitro
- ff7bced0792ad96bd91261476c8ce789f47519c2 i18n candidate(zh): guerrilla-types-in-typescript via openrouter/google/gemini-3-flash-preview
