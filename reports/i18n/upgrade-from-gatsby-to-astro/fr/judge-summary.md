# Translation Judge Summary

- Slug: upgrade-from-gatsby-to-astro
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.885)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug upgrade-from-gatsby-to-astro --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug upgrade-from-gatsby-to-astro --locale fr --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/fr/index.mdx failed structural parity with score 0.967 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/fr/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"links":-1,"linkTargets":19}. Differences: {"links":-1,"linkTargets":19}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.64
- Input tokens: 13574
- Output tokens: 223
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007456
- Estimated cost: $0.007456

## Candidates
- current src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/fr/index.mdx
- 6a4baa26eb85c37b7d86d5fdfdfcf8cb626c67d6 i18n candidate(fr): upgrade-from-gatsby-to-astro via openrouter/openai/gpt-oss-120b:nitro
- c6c072aec2521359703e3e2cd3ad69bbcf12d04e i18n candidate(fr): upgrade-from-gatsby-to-astro via openrouter/deepseek/deepseek-v4-flash
