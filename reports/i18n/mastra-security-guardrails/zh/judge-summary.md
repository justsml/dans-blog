# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: zh
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.893)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug mastra-security-guardrails --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-security-guardrails --locale zh --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/zh/index.mdx failed structural parity with score 0.925 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/zh/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Differences: {"h3":1,"links":-1,"headingSequence":4,"linkTargets":8}. Differences: {"h3":1,"links":-1,"headingSequence":4,"linkTargets":8}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.14
- Input tokens: 6295
- Output tokens: 251
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003900
- Estimated cost: $0.003900

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.94
- Input tokens: 8597
- Output tokens: 289
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005165
- Estimated cost: $0.005165

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "### 3. 内容审核 ### 3. 内容审核" Replacement: "### 3. 内容审核" Reason: The candidate accidentally duplicated the H3 heading '### 3. 内容审核', which violates the structural count requirement (English has one H3 here, candidate has two). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/zh/index.mdx
- c4f0ee90540f92095f855c9a217a8261696dfb0d i18n candidate(zh): mastra-security-guardrails via openrouter/deepseek/deepseek-v4-flash
