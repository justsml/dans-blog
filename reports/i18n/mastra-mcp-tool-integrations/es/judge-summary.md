# Translation Judge Summary

- Slug: mastra-mcp-tool-integrations
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.889)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug mastra-mcp-tool-integrations --locale es --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-mcp-tool-integrations --locale es --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-04--mastra-mcp-tool-integrations/es/index.mdx failed structural parity with score 0.981 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-04--mastra-mcp-tool-integrations/es/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.91
- Input tokens: 7202
- Output tokens: 567
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005302
- Estimated cost: $0.005302

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.43
- Input tokens: 10102
- Output tokens: 270
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005861
- Estimated cost: $0.005861

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "1. [Enrutamiento LLM](../llm-routing-mastra-ai)" Replacement: "1. [Enrutamiento LLM](/es/llm-routing-mastra-ai)" Reason: The link should point to the localized version of the post. Using ../ is for assets, but internal post links in this project structure usually follow the /es/slug pattern or relative slug. However, the candidate changed the absolute path /llm-routing-mastra-ai to a relative one ../llm-routing-mastra-ai which might break depending on the router. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "2. [Seguridad y Barreras de Protección](../mastra-security-guardrails)" Replacement: "2. [Seguridad y Barreras de Protección](/es/mastra-security-guardrails)" Reason: Internal links to other posts should be localized. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "4. [Flujos de Trabajo y Memoria](../mastra-workflows-memory)" Replacement: "4. [Flujos de Trabajo y Memoria](/es/mastra-workflows-memory)" Reason: Internal links to other posts should be localized. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-04--mastra-mcp-tool-integrations/es/index.mdx
- 1823dafa5e2d0227e7d87fc2d6c4b917024d7df8 i18n candidate(es): mastra-mcp-tool-integrations via openrouter/deepseek/deepseek-v4-flash
