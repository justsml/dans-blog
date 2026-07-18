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
- Confidence: high (0.882)
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
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/fr/index.mdx failed structural parity with score 0.966 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/fr/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Differences: {"h2":-1,"headingSequence":3,"linkTargets":7}. Differences: {"h2":-1,"headingSequence":3,"linkTargets":7}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 3.88
- Input tokens: 13565
- Output tokens: 375
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007907
- Estimated cost: $0.007907

### Round 1, Batch 2
- Runtime seconds: 3.67
- Input tokens: 7521
- Output tokens: 598
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005555
- Estimated cost: $0.005555

## Primary Judge Telemetry
- Runtime seconds: 2.80
- Input tokens: 10669
- Output tokens: 301
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006237
- Estimated cost: $0.006237

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.75
- Input tokens: 10066
- Output tokens: 290
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005903
- Estimated cost: $0.005903

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: '# Leçons tirées de la mise à niveau de mon blog'" Replacement: "title: \"Leçons tirées de la mise à niveau de mon blog\"" Reason: The frontmatter title should not contain a Markdown H1 hash symbol and should use standard quotes to match the source style. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 3a1730a570af74047206e2d163dcc752d34ec8de i18n candidate(fr): upgrade-from-gatsby-to-astro via openrouter/qwen/qwen3-32b:nitro
- 4ffe6d57597c39064f9c4f333254927ffc79af00 i18n candidate(fr): upgrade-from-gatsby-to-astro via deepseek/deepseek-v4-flash
- 635b2c6ef9549316638bc58416d326adb71905ed i18n candidate(fr): upgrade-from-gatsby-to-astro via qwen/qwen3.6-35b-a3b
- 741649d117d008b83a97eeb7ffb840184b0cfd66 i18n candidate(fr): upgrade-from-gatsby-to-astro via openrouter/openai/gpt-oss-120b:nitro
