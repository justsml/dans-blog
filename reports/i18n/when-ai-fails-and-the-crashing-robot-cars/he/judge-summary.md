# Translation Judge Summary

- Slug: when-ai-fails-and-the-crashing-robot-cars
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
- Runtime seconds: 2.74
- Input tokens: 4737
- Output tokens: 255
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003134
- Estimated cost: $0.003134

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.50
- Input tokens: 4657
- Output tokens: 312
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003265
- Estimated cost: $0.003265

### Pass 2
- Runtime seconds: 2.28
- Input tokens: 4630
- Output tokens: 312
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003251
- Estimated cost: $0.003251

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "נסיעה על השול או" Replacement: "נסיעה על השול או..." Reason: The sentence ends abruptly in the source ('driving on a shoulder or'), but the Hebrew translation should at least maintain the trailing sense or ellipsis if it was intended as an incomplete thought. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "נסיעה על השול או" Replacement: "נסיעה על השול או..." Reason: The English source ends with 'driving on a shoulder or', implying an incomplete thought or list. The Hebrew translation should include the ellipsis to match the stylistic choice and indicate the sentence is intentionally unfinished. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 29dd1be2102562bbea5e93519d18cfab03442019 i18n candidate(he): when-ai-fails-and-the-crashing-robot-cars via openrouter/deepseek/deepseek-v4-flash
- 9ed5e8a994a79a23c58d64ee71beab2d1adeefb0 i18n candidate(he): when-ai-fails-and-the-crashing-robot-cars via openrouter/openai/gpt-oss-120b:nitro
