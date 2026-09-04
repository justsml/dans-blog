# Translation Judge Summary

- Slug: mastra-mcp-tool-integrations
- Locale: ja
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
- Validation error: Command failed: bun run i18n:validate --slug mastra-mcp-tool-integrations --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-mcp-tool-integrations --locale ja --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-04--mastra-mcp-tool-integrations/ja/index.mdx failed structural parity with score 0.981 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-04--mastra-mcp-tool-integrations/ja/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.68
- Input tokens: 7202
- Output tokens: 201
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004204
- Estimated cost: $0.004204

## Candidates
- current src/content/posts/2026-01-04--mastra-mcp-tool-integrations/ja/index.mdx
- 9881b0db834f430b4dbf2521f8dfa6dc7a4b09a0 i18n candidate(ja): mastra-mcp-tool-integrations via openrouter/deepseek/deepseek-v4-flash
