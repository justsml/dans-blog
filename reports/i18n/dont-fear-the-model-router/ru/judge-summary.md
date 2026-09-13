# Translation Judge Summary

- Slug: dont-fear-the-model-router
- Locale: ru
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.888)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug dont-fear-the-model-router --locale ru --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug dont-fear-the-model-router --locale ru --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-07-03--dont-fear-the-model-router/ru/index.mdx failed structural parity with score 0.993 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-07-03--dont-fear-the-model-router/ru/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":2}. Differences: {"linkTargets":2}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.23
- Input tokens: 20529
- Output tokens: 464
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.017137
- Estimated cost: $0.017137

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.38
- Input tokens: 19843
- Output tokens: 207
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015658
- Estimated cost: $0.015658

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "[Не женитесь на своей модели](/llm-routing-mastra-ai) содержала простой тезис" Replacement: "В статье [«Не женитесь на своей модели»](/llm-routing-mastra-ai) был простой тезис" Reason: Improves grammatical flow and natural Russian phrasing in the opening sentence. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "предотвратить самый embarrassing регресс:" Replacement: "предотвратить самый досадный регресс:" Reason: Translate unnecessary English word 'embarrassing' for better language purity. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-07-03--dont-fear-the-model-router/ru/index.mdx
- 4c4430c0bda47372449046118d24c112f4c111ab i18n candidate(ru): dont-fear-the-model-router via openrouter/openai/gpt-5.6-luna
- f5f949eb8093d9c757b34ea884ea584f8e0a9696 i18n candidate(ru): dont-fear-the-model-router via openrouter/deepseek/deepseek-v4-flash
