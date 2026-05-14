# Translation Judge Summary

- Slug: weakmap-the-javascript-feature-you-dont-use
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.60
- Input tokens: 7695
- Output tokens: 246
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004586
- Estimated cost: $0.004586

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.73
- Input tokens: 7194
- Output tokens: 304
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004509
- Estimated cost: $0.004509

### Pass 2
- Runtime seconds: 2.77
- Input tokens: 7184
- Output tokens: 320
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004552
- Estimated cost: $0.004552

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "מקרסקת את הדפדפן" Replacement: "גורמת לקריסת הדפדפן" Reason: 'מקרסקת' is a slang/transliteration of 'crashing'. Using a proper Hebrew verb is more professional while maintaining the tone. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied medium priority suggestion. Match: "שהמטון ישרוד" Replacement: "שהמטמון ישרוד" Reason: Typo fix: 'המטון' should be 'המטמון' (the cache). Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 907d7cb2132f7701c0d02aad466565ebf187a844 i18n candidate(he): weakmap-the-javascript-feature-you-dont-use via openrouter/deepseek/deepseek-v4-flash
- 18ef7044f5dc6ecbe3afc69e2f1ea3b21c1f3d9b i18n candidate(he): weakmap-the-javascript-feature-you-dont-use via openrouter/openai/gpt-oss-120b:nitro
