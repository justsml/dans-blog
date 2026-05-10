# Translation Judge Summary

- Slug: semantic-vector-search-landscape
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: openrouter/deepseek/deepseek-v4-flash
- Escalation judge model: openrouter/anthropic/claude-sonnet-4.6 (timed out after confirming truncation)
- Selected commit: 5ba0398b5ece8d5752ba1e8704f16e4af5e83687
- Final result: restored complete DeepSeek translation

## Candidates

- c0358d6f398a48a3e470131aab58e37e84995fe1 i18n candidate(fr): semantic-vector-search-landscape via openrouter/qwen/qwen3.6-plus
- 5ba0398b5ece8d5752ba1e8704f16e4af5e83687 i18n candidate(fr): semantic-vector-search-landscape via openrouter/deepseek/deepseek-v4-flash
- c5f28fee796296976fdd890c0b5151082a2e14e2 i18n candidate(fr): semantic-vector-search-landscape via openrouter/minimax/minimax-m2.7

## Outcome

Gemini Flash selected the DeepSeek translation, then produced a truncated edited working copy. DeepSeek Flash caught the truncation and recommended restoring the complete DeepSeek candidate. The Sonnet 4.6 escalation attempt timed out at 240 seconds after independently confirming the same issue, so the final file was restored from the complete DeepSeek candidate instead of retrying the expensive model.
