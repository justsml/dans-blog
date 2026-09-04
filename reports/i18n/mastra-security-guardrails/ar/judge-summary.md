# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.877)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug mastra-security-guardrails --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-security-guardrails --locale ar --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/ar/index.mdx failed structural parity with score 0.953 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/ar/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Differences: {"h3":1,"headingSequence":4,"linkTargets":3}. Differences: {"h3":1,"headingSequence":4,"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.33
- Input tokens: 6851
- Output tokens: 244
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004157
- Estimated cost: $0.004157

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.73
- Input tokens: 9147
- Output tokens: 246
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005312
- Estimated cost: $0.005312

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "### 3. مراقبة المحتوى ### 3. مراقبة المحتوى" Replacement: "### 3. مراقبة المحتوى" Reason: The heading '### 3. Content Moderation' was duplicated in the translation, violating the structural heading count requirement. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/ar/index.mdx
- b1c33680d458dcdcf7810cd2a4010fe0e69c171f i18n candidate(ar): mastra-security-guardrails via openrouter/deepseek/deepseek-v4-flash
