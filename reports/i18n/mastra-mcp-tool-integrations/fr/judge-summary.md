# Translation Judge Summary

- Slug: mastra-mcp-tool-integrations
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.893)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug mastra-mcp-tool-integrations --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-mcp-tool-integrations --locale fr --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-04--mastra-mcp-tool-integrations/fr/index.mdx failed structural parity with score 0.981 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-04--mastra-mcp-tool-integrations/fr/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.73
- Input tokens: 7320
- Output tokens: 237
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004371
- Estimated cost: $0.004371

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.63
- Input tokens: 9965
- Output tokens: 245
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005718
- Estimated cost: $0.005718

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: \"Pourquoi MCP est l'USB-C de l'intelligence artificielle.\"" Reason: The subtitle was left empty in the candidate but is reader-facing content that should be translated. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-04--mastra-mcp-tool-integrations/fr/index.mdx
- 2a28285c98feb07a4ffbc913661258125598cbc2 i18n candidate(fr): mastra-mcp-tool-integrations via openrouter/deepseek/deepseek-v4-flash
