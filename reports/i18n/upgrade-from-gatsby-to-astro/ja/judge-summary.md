# Translation Judge Summary

- Slug: upgrade-from-gatsby-to-astro
- Locale: ja
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
- Validation error: Command failed: bun run i18n:validate --slug upgrade-from-gatsby-to-astro --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug upgrade-from-gatsby-to-astro --locale ja --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/ja/index.mdx failed structural parity with score 0.974 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/ja/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"links":-1,"linkTargets":15}. Differences: {"links":-1,"linkTargets":15}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.89
- Input tokens: 13047
- Output tokens: 218
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007177
- Estimated cost: $0.007177

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.53
- Input tokens: 9592
- Output tokens: 234
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005498
- Estimated cost: $0.005498

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "## Table of Contents" Replacement: "## 目次" Reason: The heading should be translated for consistency with the rest of the document. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 36fa51f4641bd82b511c122b87d521426ce46c1b i18n candidate(ja): upgrade-from-gatsby-to-astro via deepseek/deepseek-v4-flash
- db5b5d3297343df65ac19a20e5574c11f6e3c58f i18n candidate(ja): upgrade-from-gatsby-to-astro via qwen/qwen3.6-35b-a3b
- 3fcc48a832b4c7bb9d0f5377de45e52a3f9dc12c i18n candidate(ja): upgrade-from-gatsby-to-astro via openrouter/openai/gpt-oss-120b:nitro
