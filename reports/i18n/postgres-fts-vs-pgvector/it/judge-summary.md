# Translation Judge Summary

- Slug: postgres-fts-vs-pgvector
- Locale: it
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: openrouter/deepseek/deepseek-v4-flash
- Escalation judge model: not run
- Selected commit: cbcbf8b6584dcaa66f313a955eeea653c04dad0f
- Selected model: openrouter/qwen/qwen3.5-flash-02-23

## Decision

Both cheap judges selected the Qwen 3.5 Flash candidate. Gemini chose it as the most natural and technically accurate Italian translation. DeepSeek agreed and explicitly marked no escalation needed.

## Candidates

- cbcbf8b6584dcaa66f313a955eeea653c04dad0f i18n candidate(it): postgres-fts-vs-pgvector via openrouter/qwen/qwen3.5-flash-02-23
- cfcd3ee03a0500b311125e527475777fa1bf19fc i18n candidate(it): postgres-fts-vs-pgvector via openrouter/minimax/minimax-m2.7
- 61585e53c1f4597ff8592b544df9caabf997dea2 i18n candidate(it): postgres-fts-vs-pgvector via openrouter/z-ai/glm-5-turbo

## Notes

- MiniMax M2.7 was rejected by both judges because it left Chinese and English fragments in the article body.
- GLM 5 Turbo was valid but less natural and less aligned with the article voice.
- Final metadata was mechanically corrected to preserve controlled frontmatter fields while keeping localized title and subtitle.
