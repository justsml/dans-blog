# Translation Judge Summary

- Slug: security-agent-model-router
- Locale: ar
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.879)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug security-agent-model-router --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug security-agent-model-router --locale ar --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-06-30--security-agent-model-router/ar/index.mdx failed structural parity with score 0.948 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-06-30--security-agent-model-router/ar/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":1}. Differences: {"linkTargets":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 13.92
- Input tokens: 27413
- Output tokens: 510
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.022472
- Estimated cost: $0.022472

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.80
- Input tokens: 25883
- Output tokens: 211
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.020203
- Estimated cost: $0.020203

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "<img src=\".././docker-lab-score-matrix.svg\"" Replacement: "<img src=\"../docker-lab-score-matrix.svg\"" Reason: Fix redundant './' in locale relative image path so asset resolution is clean. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "<img src=\".././cost-quality-frontier.svg\"" Replacement: "<img src=\"../cost-quality-frontier.svg\"" Reason: Fix redundant './' in locale relative image path so asset resolution is clean. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "<img src=\".././frontier-tool-behavior.svg\"" Replacement: "<img src=\"../frontier-tool-behavior.svg\"" Reason: Fix redundant './' in locale relative image path so asset resolution is clean. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "<img src=\".././command-tool-pass-rates.svg\"" Replacement: "<img src=\"../command-tool-pass-rates.svg\"" Reason: Fix redundant './' in locale relative image path so asset resolution is clean. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-06-30--security-agent-model-router/ar/index.mdx
- a127b630dec8483ef87a7f498728f02f65fdc401 i18n candidate(ar): security-agent-model-router via openrouter/openai/gpt-5.6-luna
- 0d343a5b2f1f17c7a1293bc3cfa6eaa7590ce485 i18n candidate(ar): security-agent-model-router via openrouter/deepseek/deepseek-v4-flash
