# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.889)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug mastra-security-guardrails --locale de --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-security-guardrails --locale de --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/de/index.mdx failed structural parity with score 0.953 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/de/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Differences: {"h3":1,"headingSequence":4,"linkTargets":3}. Differences: {"h3":1,"headingSequence":4,"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.76
- Input tokens: 6703
- Output tokens: 337
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004363
- Estimated cost: $0.004363

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.69
- Input tokens: 9185
- Output tokens: 264
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005385
- Estimated cost: $0.005385

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "subTitle: Wenn Ihr Agent keine Schutz" Replacement: "subTitle: \"Wenn Ihr Agent keine Guardrails hat, sind Sie nicht bereit für die Produktion.\"" Reason: The subtitle is truncated and missing the closing quote. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "### 3. Inhaltsmoderation ### 3. Inhaltsmoderation" Replacement: "### 3. Inhaltsmoderation" Reason: Duplicate heading level 3. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "### Resources" Replacement: "### Ressourcen" Reason: Heading should be translated for consistency. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied medium priority suggestion. Match: "## Read the Series" Replacement: "## Die Serie lesen" Reason: Heading should be translated for consistency. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/de/index.mdx
- cc86416fd4f2daebb319377200f1b6e6e82c3fdb i18n candidate(de): mastra-security-guardrails via openrouter/deepseek/deepseek-v4-flash
