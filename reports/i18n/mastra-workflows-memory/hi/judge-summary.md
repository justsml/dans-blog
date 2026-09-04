# Translation Judge Summary

- Slug: mastra-workflows-memory
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.321)
- Confidence signals: 1 high and 0 medium issues; single judge
- High/medium/low issue counts: 1/0/0
- Validation error: Command failed: bun run i18n:validate --slug mastra-workflows-memory --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-workflows-memory --locale hi --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-05--mastra-workflows-memory/hi/index.mdx failed structural parity with score 0.978 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-05--mastra-workflows-memory/hi/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.45
- Input tokens: 8446
- Output tokens: 326
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005201
- Estimated cost: $0.005201

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.63
- Input tokens: 11661
- Output tokens: 434
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007132
- Estimated cost: $0.007132

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: ''" Replacement: "title: \"फ्लैकी एजेंट बनाना बंद करें: वर्कफ़्लो और मेमोरी का उपयोग करें\"" Reason: The frontmatter title was left empty in the translation. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "[LLM रूटिंग](../llm-routing-mastra-ai)" Replacement: "[LLM रूटिंग](/hi/llm-routing-mastra-ai)" Reason: The link should point to the localized path or the absolute path provided in the source, but the candidate changed it to a relative path that might break depending on the routing setup. More importantly, the title was missing. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "1. [LLM रूटिंग](/hi/llm-routing-mastra-ai) 2. [सुरक्षा और गार्डरेल्स](../mastra-security-guardrails) 3. [MCP और टूल एकीकरण](../mastra-mcp-tool-integrations)" Replacement: "1. [LLM रूटिंग](/hi/llm-routing-mastra-ai) 2. [सुरक्षा और गार्डरेल्स](/hi/mastra-security-guardrails) 3. [MCP और टूल एकीकरण](/hi/mastra-mcp-tool-integrations)" Reason: Internal series links must use consistent localized absolute paths (/hi/...) rather than relative paths (../) to ensure routing works correctly across the site structure. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2026-01-05--mastra-workflows-memory/hi/index.mdx
- 1a4eda607d5808aca88fc86a87975c204681e2a2 i18n candidate(hi): mastra-workflows-memory via openrouter/deepseek/deepseek-v4-flash
