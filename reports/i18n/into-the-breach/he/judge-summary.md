# Translation Judge Summary

- Slug: into-the-breach
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.874)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug into-the-breach --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug into-the-breach --locale he --skip-global
222 | export function assertStructuralParity(input: CompareMdxStructureInput) {
223 |   const comparison = compareMdxStructure(input);
224 |   if (comparison.valid) return;
225 | 
226 |   const targetLabel = input.targetPath ?? "translation";
227 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-13--into-the-breach/he/index.mdx failed structural parity with score 0.936 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-13--into-the-breach/he/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Differences: {"h2":1,"links":-3,"headingSequence":1,"linkTargets":15}. Differences: {"h2":1,"links":-3,"headingSequence":1,"linkTargets":15}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:227:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.75
- Input tokens: 10349
- Output tokens: 356
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006242
- Estimated cost: $0.006242

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.60
- Input tokens: 9478
- Output tokens: 299
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005636
- Estimated cost: $0.005636

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "## 1. שים עבודה מסוכנת בקופסה ## 1. שים עבודה מסוכנת בקופסה" Replacement: "## 1. שים עבודה מסוכנת בקופסה" Reason: The heading is duplicated in the candidate text. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "minimumReleaseAge🧪 שֶׁל pnpm" Replacement: "minimumReleaseAge של pnpm" Reason: Stray emoji and vowel points (niqqud) in the infographic description are inconsistent with the rest of the text. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-13--into-the-breach/he/index.mdx
- 82877f08779dad9014256e7b08296f092a974692 i18n candidate(he): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
- fc4e410f7851a27afd7673ff9af86aa6c20ffcac i18n candidate(he): into-the-breach via openrouter/deepseek/deepseek-v4-flash
