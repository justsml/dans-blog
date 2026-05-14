# Translation Judge Summary

- Slug: your-foreign-keys-are-killing-performance
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.47
- Input tokens: 10385
- Output tokens: 263
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005981
- Estimated cost: $0.005981

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.66
- Input tokens: 9790
- Output tokens: 337
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005906
- Estimated cost: $0.005906

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "[إغراء JSONB](../the-jsonb-seduction)" Replacement: "[إغراء JSONB](/the-jsonb-seduction)" Reason: The English source uses an absolute path for this internal link. While the instructions mention assets should use ../, internal post links should generally follow the source's routing style unless it's a file-relative asset. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "[إغراء JSONB](/the-jsonb-seduction)" Replacement: "[إغراء JSONB](/the-jsonb-seduction)" Reason: The current MDX already has the correct absolute path for the internal link as per the source. No change needed, but ensuring consistency with the source's routing. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current not present
- df0b8f037b920d619d9f92ac4ed1869af64d448f i18n candidate(ar): your-foreign-keys-are-killing-performance via openrouter/deepseek/deepseek-v4-flash
- 61ec681905f07be36536144482bc6d7bcfc923c7 i18n candidate(ar): your-foreign-keys-are-killing-performance via openrouter/openai/gpt-oss-120b:nitro
