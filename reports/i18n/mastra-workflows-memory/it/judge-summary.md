# Translation Judge Summary

- Slug: mastra-workflows-memory
- Locale: it
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.886)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug mastra-workflows-memory --locale it --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-workflows-memory --locale it --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-05--mastra-workflows-memory/it/index.mdx failed structural parity with score 0.978 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-05--mastra-workflows-memory/it/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.56
- Input tokens: 8350
- Output tokens: 207
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004796
- Estimated cost: $0.004796

## Candidates
- current src/content/posts/2026-01-05--mastra-workflows-memory/it/index.mdx
- f28afa61eccc9005a56292f000f96cd9ebb2f736 i18n candidate(it): mastra-workflows-memory via openrouter/deepseek/deepseek-v4-flash
