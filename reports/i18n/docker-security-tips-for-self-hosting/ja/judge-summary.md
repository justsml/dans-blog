# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: ja
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.350)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale ja --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx failed structural parity with score 0.983 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":10}. Differences: {"linkTargets":10}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 8.38
- Input tokens: 47275
- Output tokens: 1212
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.040001
- Estimated cost: $0.040001

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx
- 73da8dab0f3738ba204db60554e0560657e20dd5 i18n candidate(ja): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
- 24e3086de3a09c7cb56656b5e6136da500c187e9 i18n candidate(ja): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 09549252159700f84843fc09cc1888db3dfc6ff2 i18n candidate(ja): docker-security-tips-for-self-hosting via openrouter/openai/gpt-5.6-luna
