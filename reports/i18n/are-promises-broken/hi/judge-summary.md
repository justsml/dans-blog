# Translation Judge Summary

- Slug: are-promises-broken
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.865)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug are-promises-broken --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug are-promises-broken --locale hi --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-06--are-promises-broken/hi/index.mdx failed structural parity with score 0.984 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-06--are-promises-broken/hi/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.95
- Input tokens: 9600
- Output tokens: 310
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005730
- Estimated cost: $0.005730

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.52
- Input tokens: 9319
- Output tokens: 283
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005509
- Estimated cost: $0.005509

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[Promises को कुछ न कुछ पकड़ना चाहिए](#1-promises-need-something-to-hang-on-to)" Replacement: "[Promises को कुछ न कुछ पकड़ना चाहिए](#1-promises-को-कुछ-न-कुछ-पकड़ना-चाहिए)" Reason: The heading link fragment must match the localized heading slug to avoid broken links. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-10-06--are-promises-broken/hi/index.mdx
- 66c242ed261b5c6f20185db7019aa6e097407711 i18n candidate(hi): are-promises-broken via openrouter/openai/gpt-oss-120b:nitro
