# Translation Judge Summary

- Slug: llm-routing-mastra-ai
- Locale: fr
- Judge model: openrouter/anthropic/claude-sonnet-4.6
- Second judge model: not run
- Escalation judge model: not run
- Selected commit hint: judge selected
- Result: model judging blocked by OpenRouter credit/max_tokens errors; final file is based on candidate `2deb04ba730126f90d4e8af01ab044ec934af9f7` with a manual structural/terminology polish commit.

## Judge Failure Notes

- Primary cheap judge `openrouter/google/gemini-3-flash-preview` failed with an OpenRouter credit/max_tokens error.
- Second cheap judge `openrouter/deepseek/deepseek-v4-flash` failed with an OpenRouter credit/max_tokens error.
- Escalation judge `openrouter/anthropic/claude-sonnet-4.6` was attempted only after the cheap judge outputs were structurally broken, and it also failed with an OpenRouter credit/max_tokens error.

## Primary Judge Telemetry
- Runtime seconds: 1.82
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Estimated cost: unknown

## Candidates
- 55ea895736e87a697942d5d981f996fb376b4d1f i18n candidate(fr): llm-routing-mastra-ai via openrouter/deepseek/deepseek-v4-flash
- 85bf52666d4559d918f89f6ce89118965e339f6a i18n candidate(fr): llm-routing-mastra-ai via openrouter/z-ai/glm-4.7-flash
- 2deb04ba730126f90d4e8af01ab044ec934af9f7 i18n candidate(fr): llm-routing-mastra-ai via openrouter/deepseek/deepseek-v4-flash
