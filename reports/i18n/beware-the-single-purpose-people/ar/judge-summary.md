# Translation Judge Summary

- Slug: beware-the-single-purpose-people
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
- Runtime seconds: 2.57
- Input tokens: 8809
- Output tokens: 260
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005184
- Estimated cost: $0.005184

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.75
- Input tokens: 8317
- Output tokens: 317
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005110
- Estimated cost: $0.005110

### Pass 2
- Runtime seconds: 2.04
- Input tokens: 8283
- Output tokens: 194
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004724
- Estimated cost: $0.004724

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "![مكونات، مكونات في كل مكان](software-patterns__the-mc-escher-stack.webp \"نمط إيشر\")" Replacement: "![مكونات، مكونات في كل مكان](../software-patterns__the-mc-escher-stack.webp \"نمط إيشر\")" Reason: The image path is missing the required '../' prefix for localized content folders. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "![مكونات، مكونات في كل مكان](software-patterns__the-mc-escher-stack.webp \"نمط إيشر\")" Replacement: "![مكونات، مكونات في كل مكان](../software-patterns__the-mc-escher-stack.webp \"نمط إيشر\")" Reason: The image path is missing the required '../' prefix for localized content folders to correctly reference assets in the parent directory. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 9f67cb7d542631ed91f1bd27663981e5664aefbd i18n candidate(ar): beware-the-single-purpose-people via openrouter/deepseek/deepseek-v4-flash
- 1da1ce937e9f255ba4b0a86069e874e5d3d31631 i18n candidate(ar): beware-the-single-purpose-people via openrouter/openai/gpt-oss-120b:nitro
