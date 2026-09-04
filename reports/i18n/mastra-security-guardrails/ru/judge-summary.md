# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
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
- Validation error: Command failed: bun run i18n:validate --slug mastra-security-guardrails --locale ru --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-security-guardrails --locale ru --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/ru/index.mdx failed structural parity with score 0.936 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/ru/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"links":-3,"linkTargets":11}. Differences: {"links":-3,"linkTargets":11}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.48
- Input tokens: 6663
- Output tokens: 234
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004033
- Estimated cost: $0.004033

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.13
- Input tokens: 8971
- Output tokens: 257
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005256
- Estimated cost: $0.005256

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: 'Если у вашего агента нет защитных барьеров, вы не готовы к продакшну.'" Reason: The subTitle was left empty in the translation but contains important reader-facing text in the source. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/ru/index.mdx
- 8c5a8548c4e9a1b5eab0287195dba1d15075936c i18n candidate(ru): mastra-security-guardrails via openrouter/deepseek/deepseek-v4-flash
