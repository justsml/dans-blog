# Translation Judge Summary

- Slug: securely-using-environment-variables-in-nodejs
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.880)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug securely-using-environment-variables-in-nodejs --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug securely-using-environment-variables-in-nodejs --locale hi --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/hi/index.mdx failed structural parity with score 0.990 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/hi/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":1}. Differences: {"linkTargets":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.04
- Input tokens: 7511
- Output tokens: 264
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004548
- Estimated cost: $0.004548

## Candidates
- current src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/hi/index.mdx
- 40b596b70f1020a772bd9b4ba069b2aafd1b6adc i18n candidate(hi): securely-using-environment-variables-in-nodejs via openrouter/qwen/qwen3-32b:nitro
- 4e21d024e947ecff5f3826de4d8f169ae738e20f i18n candidate(hi): securely-using-environment-variables-in-nodejs via qwen/qwen3.6-35b-a3b
