# Translation Judge Summary

- Slug: llm-routing-mastra-ai
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 3
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.316)
- Confidence signals: 2 high and 0 medium issues; single judge
- High/medium/low issue counts: 2/0/0
- Validation error: Command failed: bun run i18n:validate --slug llm-routing-mastra-ai --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug llm-routing-mastra-ai --locale hi --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-02--llm-routing-mastra-ai/hi/index.mdx failed structural parity with score 0.969 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-02--llm-routing-mastra-ai/hi/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.79
- Input tokens: 5326
- Output tokens: 382
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003809
- Estimated cost: $0.003809

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.31
- Input tokens: 7135
- Output tokens: 443
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004896
- Estimated cost: $0.004896

### Pass 2
- Runtime seconds: 3.05
- Input tokens: 7123
- Output tokens: 337
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004573
- Estimated cost: $0.004573

### Pass 3
- Runtime seconds: 3.85
- Input tokens: 7005
- Output tokens: 421
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004765
- Estimated cost: $0.004765

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[सुरक्षा एवं गार्डरेल्स](../mastra-security-guardrails)" Replacement: "[सुरक्षा एवं गार्डरेल्स](/hi/mastra-security-guardrails)" Reason: Internal links to other posts in the series should point to the localized path or follow the site's routing convention. However, the instruction specifically mentioned that assets must use ../. For internal post links, usually, the slug remains or is prefixed. Given the constraint 'Locale files live one folder deeper', the relative link ../ is correct for assets, but for page navigation, it should ensure it doesn't break. More importantly, the English source used absolute-style paths (/mastra-security-guardrails). Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "लंबी‑गंदगी वाली संदर्भ" Replacement: "जटिल और लंबे संदर्भ" Reason: 'Long messy context' was translated too literally as 'long-dirty context'. 'जटिल' (complex) is more appropriate for technical writing. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "[MCP एवं टूल इंटीग्रेशन](../mastra-mcp-tool-integrations)" Replacement: "[MCP एवं टूल इंटीग्रेशन](/hi/mastra-mcp-tool-integrations)" Reason: Internal links must follow the localized path convention (/hi/slug) and match the absolute-style paths used in the English source, rather than using relative parent directory links which may break routing. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "[वर्कफ़्लो एवं मेमोरी](../mastra-workflows-memory)" Replacement: "[वर्कफ़्लो एवं मेमोरी](/hi/mastra-workflows-memory)" Reason: Internal links must follow the localized path convention (/hi/slug) and match the absolute-style paths used in the English source. Note: Applied exact replacement to selected MDX.
5. Pass 3: applied high priority suggestion. Match: "[सुरक्षा एवं गार्डरेल्स](../mastra-security-guardrails)" Replacement: "[सुरक्षा एवं गार्डरेल्स](/hi/mastra-security-guardrails)" Reason: Internal links must follow the localized path convention (/hi/slug) to ensure consistent navigation across the site, matching the absolute-style paths in the English source. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-02--llm-routing-mastra-ai/hi/index.mdx
- 7ebd4dc068c963334a5a083cf63c236a06e290fe i18n candidate(hi): llm-routing-mastra-ai via openrouter/openai/gpt-oss-120b:nitro
