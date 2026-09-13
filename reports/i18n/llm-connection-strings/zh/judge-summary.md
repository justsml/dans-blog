# Translation Judge Summary

- Slug: llm-connection-strings
- Locale: zh
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.881)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug llm-connection-strings --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug llm-connection-strings --locale zh --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-30--llm-connection-strings/zh/index.mdx failed structural parity with score 0.950 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-30--llm-connection-strings/zh/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"links":1,"linkTargets":3}. Differences: {"links":1,"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.80
- Input tokens: 6557
- Output tokens: 345
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006212
- Estimated cost: $0.006212

## Candidates
- current src/content/posts/2026-01-30--llm-connection-strings/zh/index.mdx
- e4c48c370b9b01a9ee57ed7e46a438cf9d0c11d6 i18n candidate(zh): llm-connection-strings via openrouter/openai/gpt-5.6-luna
- f7cb9dcc9db0f240a1d59c26a4f03c43da44b461 i18n candidate(zh): llm-connection-strings via openrouter/deepseek/deepseek-v4-flash
