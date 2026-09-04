# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: ja
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
- Validation error: Command failed: bun run i18n:validate --slug mastra-security-guardrails --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-security-guardrails --locale ja --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/ja/index.mdx failed structural parity with score 0.953 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/ja/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Differences: {"h3":1,"headingSequence":4,"linkTargets":3}. Differences: {"h3":1,"headingSequence":4,"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.80
- Input tokens: 6574
- Output tokens: 278
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004121
- Estimated cost: $0.004121

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.79
- Input tokens: 8932
- Output tokens: 263
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005255
- Estimated cost: $0.005255

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "### 3. コンテンツモデレーション ### 3. コンテンツモデレーション" Replacement: "### 3. コンテンツモデレーション" Reason: The H3 heading is duplicated in the candidate. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: \"エージェントにガードレールがなければ、本番環境への準備はできていません。\"" Reason: The subTitle in frontmatter was left empty but should be translated. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/ja/index.mdx
- 1216f7bf5b17249dbd83014ea704d74b895c93bd i18n candidate(ja): mastra-security-guardrails via openrouter/deepseek/deepseek-v4-flash
