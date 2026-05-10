# Translation Judge Summary

- Slug: your-foreign-keys-are-killing-performance
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: openrouter/deepseek/deepseek-v4-flash
- Escalation judge model: openrouter/anthropic/claude-sonnet-4.6
- Selected candidate: fa19bd0443cfe54d38b3c5e2d8085ebf746c62d8
- Result: cheap judging was blocked by OpenRouter credit/max-token errors; Sonnet escalation was attempted because the cheap judge outputs were structurally broken and also failed with an OpenRouter credit/max-token error.

## Primary Judge Telemetry
- Runtime seconds: 1.76
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Estimated cost: unknown

## Second Judge Telemetry
- Runtime seconds: 1.54
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Estimated cost: unknown

## Escalation Judge Telemetry
- Runtime seconds: 1.92
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Estimated cost: unknown
- Result: failed before usable judge output; OpenRouter reported the request could only afford 3 output tokens.

## Candidates
- 8462467984b6b35ade3a29ecc5b96d9ca2a02d25 i18n candidate(de): your-foreign-keys-are-killing-performance via openrouter/deepseek/deepseek-v4-flash
- 32ad7b6def68f0fd7403bee0c76fc67a2fefd6f3 i18n candidate(de): your-foreign-keys-are-killing-performance via openrouter/deepseek/deepseek-v3.2
- fa19bd0443cfe54d38b3c5e2d8085ebf746c62d8 i18n candidate(de): your-foreign-keys-are-killing-performance via openrouter/deepseek/deepseek-v3.2

## Notes

- Primary cheap judge `openrouter/google/gemini-3-flash-preview` failed before producing usable output; OpenRouter reported the request could only afford 20 output tokens.
- Second cheap judge `openrouter/deepseek/deepseek-v4-flash` failed before producing usable output; OpenRouter reported the request could only afford 175 output tokens.
- Escalation judge `openrouter/anthropic/claude-sonnet-4.6` was attempted only after the cheap judge outputs were structurally broken, and failed before producing usable output.
