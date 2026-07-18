# Translation Judge Summary

- Slug: security-agent-model-router
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.885)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug security-agent-model-router --locale ru --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug security-agent-model-router --locale ru --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-06-30--security-agent-model-router/ru/index.mdx failed structural parity with score 0.981 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-06-30--security-agent-model-router/ru/index.mdx: Table count or row/column shape changed; errant line breaks may have broken a Markdown table. Differences: {"tableColumns":2,"tableShapes":2}. Differences: {"tableColumns":2,"tableShapes":2}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.88
- Input tokens: 27856
- Output tokens: 254
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.014690
- Estimated cost: $0.014690

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.40
- Input tokens: 26090
- Output tokens: 258
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.013819
- Estimated cost: $0.013819

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "The product answer is a router:" Replacement: "Ответ для продукта — это маршрутизатор:" Reason: One sentence was left in English in the middle of the Russian text. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 6cb3d40bac6f8d7f9717a9f1a438dfb399fe0cbc i18n candidate(ru): security-agent-model-router via openrouter/deepseek/deepseek-v4-flash
- 4cc7e25f16895347f68fe2fb6417c0fa938617a8 i18n candidate(ru): security-agent-model-router via openrouter/openai/gpt-oss-120b:nitro
