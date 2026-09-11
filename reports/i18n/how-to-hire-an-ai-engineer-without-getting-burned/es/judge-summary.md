# Translation Judge Summary

- Slug: how-to-hire-an-ai-engineer-without-getting-burned
- Locale: es
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.881)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug how-to-hire-an-ai-engineer-without-getting-burned --locale es --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug how-to-hire-an-ai-engineer-without-getting-burned --locale es --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-09-09--how-to-hire-an-ai-engineer-without-getting-burned/es/index.mdx failed structural parity with score 0.983 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-09-09--how-to-hire-an-ai-engineer-without-getting-burned/es/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":1}. Differences: {"linkTargets":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.24
- Input tokens: 12638
- Output tokens: 421
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011057
- Estimated cost: $0.011057

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.00
- Input tokens: 12296
- Output tokens: 212
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010017
- Estimated cost: $0.010017

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[\"It scored 94%\" is not a measurement if the same run scores 82% on Tuesday.](/auto-tune-your-llm-judge)" Replacement: "[«Obtuvo un 94%» no es una medición si la misma ejecución da un 82% el martes.](../auto-tune-your-llm-judge)" Reason: The link text was left in English, and the relative internal link in es subfolder needs ../auto-tune-your-llm-judge instead of /auto-tune-your-llm-judge. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- c1427621f9014661b8f745b73c8ca4bf24e284e4 i18n candidate(es): how-to-hire-an-ai-engineer-without-getting-burned via openrouter/openai/gpt-oss-120b:nitro
- 42141d82cb5f73c3a364d15b80b5e1c86bd5a3b4 i18n candidate(es): how-to-hire-an-ai-engineer-without-getting-burned via openrouter/deepseek/deepseek-v4-flash
