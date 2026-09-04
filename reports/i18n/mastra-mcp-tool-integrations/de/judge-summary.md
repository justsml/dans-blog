# Translation Judge Summary

- Slug: mastra-mcp-tool-integrations
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.331)
- Confidence signals: 1 high and 0 medium issues; single judge
- High/medium/low issue counts: 1/0/0
- Validation error: Command failed: bun run i18n:validate --slug mastra-mcp-tool-integrations --locale de --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-mcp-tool-integrations --locale de --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-04--mastra-mcp-tool-integrations/de/index.mdx failed structural parity with score 0.981 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-04--mastra-mcp-tool-integrations/de/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.14
- Input tokens: 7346
- Output tokens: 422
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004939
- Estimated cost: $0.004939

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.52
- Input tokens: 10108
- Output tokens: 448
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006398
- Estimated cost: $0.006398

### Pass 2
- Runtime seconds: 3.53
- Input tokens: 10126
- Output tokens: 383
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006212
- Estimated cost: $0.006212

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "1. [LLM-Routing](../llm-routing-mastra-ai)" Replacement: "1. [LLM-Routing](/de/llm-routing-mastra-ai)" Reason: The relative path ../llm-routing-mastra-ai will break in the production routing structure. It should point to the localized path /de/slug or the absolute slug if handled by the framework, but usually, cross-post links in localized content need the locale prefix or to remain consistent with the site's routing logic. However, the prompt specifically warned about asset paths needing ../, but for internal MDX links, they should resolve to the correct localized URL. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "2. [Sicherheit & Schutzmaßnahmen](../mastra-security-guardrails)" Replacement: "2. [Sicherheit & Schutzmaßnahmen](/de/mastra-security-guardrails)" Reason: Internal links to other posts must use the localized absolute path (e.g., /de/slug) to ensure they resolve correctly in the production routing environment, rather than relative file paths. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "4. [Workflows & Memory](../mastra-workflows-memory)" Replacement: "4. [Workflows & Memory](/de/mastra-workflows-memory)" Reason: Internal links to other posts must use the localized absolute path (e.g., /de/slug) to ensure they resolve correctly in the production routing environment. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-04--mastra-mcp-tool-integrations/de/index.mdx
- 03bbd064eda44929db6c50ec7a0e515ce78ea6a3 i18n candidate(de): mastra-mcp-tool-integrations via openrouter/deepseek/deepseek-v4-flash
