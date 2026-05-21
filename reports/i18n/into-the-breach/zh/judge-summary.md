# Translation Judge Summary

- Slug: into-the-breach
- Locale: zh
- Judge model: openrouter/google/gemini-3-flash-preview
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
- Validation error: Command failed: bun run i18n:validate --slug into-the-breach --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug into-the-breach --locale zh --skip-global
222 | export function assertStructuralParity(input: CompareMdxStructureInput) {
223 |   const comparison = compareMdxStructure(input);
224 |   if (comparison.valid) return;
225 | 
226 |   const targetLabel = input.targetPath ?? "translation";
227 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-13--into-the-breach/zh/index.mdx failed structural parity with score 0.970 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-13--into-the-breach/zh/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"links":-1,"linkTargets":9}. Differences: {"links":-1,"linkTargets":9}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:227:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.45
- Input tokens: 8718
- Output tokens: 262
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005145
- Estimated cost: $0.005145

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.30
- Input tokens: 8492
- Output tokens: 257
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005017
- Estimated cost: $0.005017

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "cover_full_width: ../wide.webp" Replacement: "cover_full_width: ../wide-2.webp" Reason: The English source uses wide-2.webp; the candidate used wide.webp. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-13--into-the-breach/zh/index.mdx
- d5ea8444bd4c5d985cb34fc11122f882753e2b51 i18n candidate(zh): into-the-breach via openrouter/deepseek/deepseek-v4-flash
- 5bad4e1a6aeeef2ea4a049f2749615f8034d1ac2 i18n candidate(zh): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
