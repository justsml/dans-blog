# Translation Judge Summary

- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.42
- Input tokens: 6155
- Output tokens: 432
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004373

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.12
- Input tokens: 4573
- Output tokens: 351
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003340

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "// 1. Envolver la request" Replacement: "// 1. Wrap the request" Reason: The original code comments should remain in English to match the rest of the code block's style and the English source. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "// 2. Llamar código asíncrono profundo" Replacement: "// 2. Call deep async code" Reason: The original code comments should remain in English to match the rest of the code block's style and the English source. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "// 3. En lo profundo de processOrder:" Replacement: "// 3. Deep inside processOrder:" Reason: The original code comments should remain in English to match the rest of the code block's style and the English source. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied medium priority suggestion. Match: "console.log(`[${requestId}] Fallo al procesar la orden`);" Replacement: "console.log(`[${requestId}] Failed to process order`);" Reason: Code strings in examples are usually kept in English unless they are user-facing UI strings. Note: Applied exact replacement to selected MDX.
5. Pass 2: logged high priority suggestion. Match: "// 1. Wrap the request" Replacement: "// 1. Wrap the request" Reason: The current translation already has English comments in the code block, but the previous judge report suggested they were translated. Upon inspection of the provided MDX, they are already in English. No change needed, but keeping the suggestion block empty if no fixes are required. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/es/index.mdx
- 408be021e08a335da4092beafc3f0296a5a97388 i18n candidate(es): async-stack-traces-why-error-stack-lies-in-production via openrouter/qwen/qwen3.6-plus
- 9701f02fd71927f84248deb84723b84357e69eb8 i18n candidate(es): async-stack-traces-why-error-stack-lies-in-production via openrouter/openai/gpt-oss-120b:nitro
- dd03120922efa44ab5ae7cb8d95237571873617f i18n candidate(es): async-stack-traces-why-error-stack-lies-in-production via openrouter/qwen/qwen3-32b:nitro
