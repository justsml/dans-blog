# Translation Judge Summary

- Slug: llm-routing-mastra-ai
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.333)
- Confidence signals: 1 high and 0 medium issues; single judge
- High/medium/low issue counts: 1/0/0
- Validation error: Command failed: bun run i18n:validate --slug llm-routing-mastra-ai --locale ru --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug llm-routing-mastra-ai --locale ru --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-02--llm-routing-mastra-ai/ru/index.mdx failed structural parity with score 0.969 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-02--llm-routing-mastra-ai/ru/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.12
- Input tokens: 7610
- Output tokens: 444
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005137
- Estimated cost: $0.005137

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.65
- Input tokens: 7415
- Output tokens: 435
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005012
- Estimated cost: $0.005012

### Pass 2
- Runtime seconds: 2.42
- Input tokens: 7339
- Output tokens: 316
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004618
- Estimated cost: $0.004618

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[Безопасность и защитные механизмы](../mastra-security-guardrails)" Replacement: "[Безопасность и защитные механизмы](/ru/mastra-security-guardrails)" Reason: The link should point to the localized path or the absolute path defined in the series, but the candidate used a relative path that might break depending on the routing setup. However, more importantly, the other candidate failed to translate the frontmatter title entirely. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "[Интеграции MCP и инструментов](../mastra-mcp-tool-integrations)" Replacement: "[Интеграции MCP и инструментов](/ru/mastra-mcp-tool-integrations)" Reason: Localized series links must use absolute paths starting with the locale prefix (/ru/) to ensure consistent navigation across the site structure. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "[Рабочие процессы и память](../mastra-workflows-memory)" Replacement: "[Рабочие процессы и память](/ru/mastra-workflows-memory)" Reason: Localized series links must use absolute paths starting with the locale prefix (/ru/) to ensure consistent navigation across the site structure. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-02--llm-routing-mastra-ai/ru/index.mdx
- 34fa28acd2f8edd57154aea057773d86975d0280 i18n candidate(ru): llm-routing-mastra-ai via openrouter/deepseek/deepseek-v4-flash
- cee2e6941fb68dea41712296b9c1138fcfdf0ef9 i18n candidate(ru): llm-routing-mastra-ai via openrouter/qwen/qwen3.6-plus
