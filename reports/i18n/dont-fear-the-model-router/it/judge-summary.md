# Translation Judge Summary

- Slug: dont-fear-the-model-router
- Locale: it
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.892)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug dont-fear-the-model-router --locale it --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug dont-fear-the-model-router --locale it --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-07-03--dont-fear-the-model-router/it/index.mdx failed structural parity with score 0.990 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-07-03--dont-fear-the-model-router/it/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.31
- Input tokens: 19932
- Output tokens: 327
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016175
- Estimated cost: $0.016175

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.88
- Input tokens: 19298
- Output tokens: 246
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015396
- Estimated cost: $0.015396

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[Non sposare il tuo modello](/llm-routing-mastra-ai)" Replacement: "[Non sposare il tuo modello](../llm-routing-mastra-ai)" Reason: Relative internal link in locale folder depth must link to ../llm-routing-mastra-ai like the other links and other posts Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-07-03--dont-fear-the-model-router/it/index.mdx
- d2ed733dcd158feb37d6b6576deb2e5330ca5faf i18n candidate(it): dont-fear-the-model-router via openrouter/deepseek/deepseek-v4-flash
- 27cc9cf61a1fecd50e0ed8b088d57a306fbc56ba i18n candidate(it): dont-fear-the-model-router via openrouter/openai/gpt-5.6-luna
