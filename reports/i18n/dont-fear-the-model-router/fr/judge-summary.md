# Translation Judge Summary

- Slug: dont-fear-the-model-router
- Locale: fr
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.884)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug dont-fear-the-model-router --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug dont-fear-the-model-router --locale fr --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-07-03--dont-fear-the-model-router/fr/index.mdx failed structural parity with score 0.993 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-07-03--dont-fear-the-model-router/fr/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":2}. Differences: {"linkTargets":2}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.14
- Input tokens: 20486
- Output tokens: 432
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016984
- Estimated cost: $0.016984

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.83
- Input tokens: 19575
- Output tokens: 202
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015439
- Estimated cost: $0.015439

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "Parfois, une étape de workflow, un scorer, un plafond strict ou un banal `if` qui vous fait économiser plusieurs milliers par mois." Replacement: "Parfois, une étape de workflow, un scorer, un plafond strict ou un banal `if` qui vous fait économiser plusieurs milliers de dollars par mois." Reason: English 'saves you four figures a month' refers to a four-figure financial saving; adding 'de dollars' makes the phrasing idiomatic in French. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-07-03--dont-fear-the-model-router/fr/index.mdx
- db8b98e735baacf67807acee7d8c7f6271f5641d i18n candidate(fr): dont-fear-the-model-router via openrouter/openai/gpt-5.6-luna
- 28c7a352032f082d6ebeff7fd2d52c46d92c0245 i18n candidate(fr): dont-fear-the-model-router via openrouter/deepseek/deepseek-v4-flash
