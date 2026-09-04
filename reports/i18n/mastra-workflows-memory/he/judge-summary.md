# Translation Judge Summary

- Slug: mastra-workflows-memory
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.317)
- Confidence signals: 1 high and 0 medium issues; single judge
- High/medium/low issue counts: 1/0/0
- Validation error: Command failed: bun run i18n:validate --slug mastra-workflows-memory --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-workflows-memory --locale he --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-05--mastra-workflows-memory/he/index.mdx failed structural parity with score 0.969 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-05--mastra-workflows-memory/he/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"links":1,"linkTargets":4}. Differences: {"links":1,"linkTargets":4}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.53
- Input tokens: 9013
- Output tokens: 408
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005731
- Estimated cost: $0.005731

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.16
- Input tokens: 12303
- Output tokens: 474
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007574
- Estimated cost: $0.007574

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: ''" Replacement: "title: 'הפסיקו לבנות סוכנים לא יציבים: השתמשו בתהליכי עבודה ובזיכרון'" Reason: The frontmatter title is empty in the translation but present in the English source. It must be translated. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "[ניתוב LLM](../llm-routing-mastra-ai)" Replacement: "[ניתוב LLM](/llm-routing-mastra-ai)" Reason: The English source uses absolute paths for the series links. The translation changed them to relative paths, which will break if the folder structure doesn't match exactly or if the site expects root-relative URLs. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "[**זרימות עבודה וזיכרון** (פוסט זה)](../mastra-workflows-memory)" Replacement: "**זרימות עבודה וזיכרון** (פוסט זה)" Reason: In the series list, the current post should not be a link to itself, matching the English source's bold text. Note: Applied exact replacement to selected MDX.
4. Pass 2: logged high priority suggestion. Match: "1. [ניתוב LLM](/llm-routing-mastra-ai) 2. [אבטחה ומעקות בטיחות](../mastra-security-guardrails) 3. [שילובי MCP וכלים](../mastra-mcp-tool-integrations) 4. **זרימות עבודה וזיכרון**..." Replacement: "1. [ניתוב LLM](/llm-routing-mastra-ai) 2. [אבטחה ומעקות בטיחות](/mastra-security-guardrails) 3. [שילובי MCP וכלים](/mastra-mcp-tool-integrations) 4. **זרימות עבודה וזיכרון** (פו..." Reason: The English source uses root-relative paths for the series links. The translation introduced relative paths (../) which break site navigation consistency. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2026-01-05--mastra-workflows-memory/he/index.mdx
- 514d565d9b927a2e3a1a2eec03228a5de35951a6 i18n candidate(he): mastra-workflows-memory via openrouter/deepseek/deepseek-v4-flash
