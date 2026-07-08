# Translation Judge Summary

- Slug: protect-your-tokens
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.880)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug protect-your-tokens --locale es --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug protect-your-tokens --locale es --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-27--protect-your-tokens/es/index.mdx failed structural parity with score 0.991 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-27--protect-your-tokens/es/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":1}. Differences: {"linkTargets":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.07
- Input tokens: 6276
- Output tokens: 319
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004095
- Estimated cost: $0.004095

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.01
- Input tokens: 6105
- Output tokens: 259
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003830
- Estimated cost: $0.003830

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[_Cómo usar dotenv_](#-how-to-handle-secrets-safely)" Replacement: "[_Cómo usar dotenv_](#lista-de-verificación-manejo-seguro-de-secretos)" Reason: The link fragment must match the localized heading slug to avoid a broken link. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-10-27--protect-your-tokens/es/index.mdx
- c321baa20c00cca54bc4f76a678c6adf7a347dcb i18n candidate(es): protect-your-tokens via openrouter/openai/gpt-oss-120b:nitro
- 54d13bc03bd0455dea7cbebf9af82e5f6c90769f i18n candidate(es): protect-your-tokens via openrouter/qwen/qwen3-32b:nitro
