# Translation Judge Summary

- Slug: your-laptop-is-the-breach
- Locale: ja
- Judge model: openrouter/openai/gpt-5.4-mini
- Second judge model: openrouter/openai/gpt-5-mini
- Escalation judge model: openrouter/anthropic/claude-sonnet-4.6
- Selected commit: 556c1802c80eb09cc719ae209eb61b56fd41a1bd

## Primary Judge Telemetry

- Runtime seconds: unknown
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Estimated cost: unknown

## Second Judge Telemetry

- Runtime seconds: unknown
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Estimated cost: unknown

## Escalation Judge Telemetry

- Runtime seconds: timed out after writing report
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Estimated cost: unknown

## Candidates

- 556c1802c80eb09cc719ae209eb61b56fd41a1bd i18n candidate(ja): your-laptop-is-the-breach via openrouter/google/gemini-3.1-flash-lite-preview
- c582da7be02ae55c66b14121ddbafdf4712de300 i18n candidate(ja): your-laptop-is-the-breach via openrouter/google/gemini-2.5-flash-lite
- 5edb14559e918faa3d1d518412e31b57369e6bcb i18n candidate(ja): your-laptop-is-the-breach via openrouter/minimax/minimax-m2.7

## Outcome

Both cheap judges selected or approved `556c1802c80eb09cc719ae209eb61b56fd41a1bd`. Escalation confirmed the same selection and rejected `5edb14559e918faa3d1d518412e31b57369e6bcb` because it contained mixed-language corruption.

