# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.325)
- Confidence signals: 1 high and 1 medium issues; single judge
- High/medium/low issue counts: 1/1/0
- Validation error: Command failed: bun run i18n:validate --slug mastra-security-guardrails --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-security-guardrails --locale fr --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/fr/index.mdx failed structural parity with score 0.953 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/fr/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Differences: {"h3":1,"headingSequence":4,"linkTargets":3}. Differences: {"h3":1,"headingSequence":4,"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.06
- Input tokens: 6756
- Output tokens: 329
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004365
- Estimated cost: $0.004365

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.64
- Input tokens: 9174
- Output tokens: 426
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005865
- Estimated cost: $0.005865

### Pass 2
- Runtime seconds: 6.31
- Input tokens: 9187
- Output tokens: 424
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005866
- Estimated cost: $0.005866

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "### 3. Modération du contenu ### 3. Modération du contenu" Replacement: "### 3. Modération du contenu" Reason: The heading is duplicated in the candidate. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "[Routage LLM](../llm-routing-mastra-ai)" Replacement: "[Routage LLM](/fr/llm-routing-mastra-ai)" Reason: The link should point to the localized version or follow the site's routing convention; however, the prompt specifically warned about relative paths for assets. For internal post links, consistency with the series list is key. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "[Intégrations MCP et outils](../mastra-mcp-tool-integrations)" Replacement: "[Intégrations MCP et outils](/fr/mastra-mcp-tool-integrations)" Reason: Internal series links should use absolute localized paths for consistency with the first link in the list, rather than relative paths which might break depending on the deployment environment. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "[Workflows et mémoire](../mastra-workflows-memory)" Replacement: "[Workflows et mémoire](/fr/mastra-workflows-memory)" Reason: Internal series links should use absolute localized paths for consistency with the first link in the list. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/fr/index.mdx
- 489ad802553132cd701032908f8a1ccd26aa8ed2 i18n candidate(fr): mastra-security-guardrails via openrouter/deepseek/deepseek-v4-flash
