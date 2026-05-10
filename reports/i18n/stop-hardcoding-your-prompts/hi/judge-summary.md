# Translation Judge Summary

- Slug: stop-hardcoding-your-prompts
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: openrouter/deepseek/deepseek-v4-flash
- Escalation judge model: openrouter/anthropic/claude-sonnet-4.6
- Selected commit: ae1992555935dbb7a025a3e2682658e9085df675
- Selected model: openrouter/z-ai/glm-5-turbo
- Validation: passed with `/Users/dan/.bun/bin/bun run i18n:validate -- --slug stop-hardcoding-your-prompts --locale hi`

## Judge Outcome

Gemini 3 Flash Preview selected `b5c0acea170aa03e7f7ad294ce8a9ddb3c6f161e` (MiniMax M2.7). DeepSeek V4 Flash disagreed and recommended `ae1992555935dbb7a025a3e2682658e9085df675` (GLM 5 Turbo), citing stronger formal Hindi register, translated headings, Hindi code comments, and less Hinglish.

Because the judges disagreed on the winning candidate, the Sonnet 4.6 escalation step was run. Sonnet selected GLM 5 Turbo as the base and lightly polished the final MDX, keeping the stronger MiniMax M2.7 title and fixing a small Hindi gender-agreement issue in the opening line.

The escalation OpenCode process wrote the final MDX and `judge-escalation.md`, then hit the 240-second wrapper timeout before the normal script-generated summary and commit step. This summary records that completed judge outcome.

## Candidates

- b5c0acea170aa03e7f7ad294ce8a9ddb3c6f161e i18n candidate(hi): stop-hardcoding-your-prompts via openrouter/minimax/minimax-m2.7
- ae1992555935dbb7a025a3e2682658e9085df675 i18n candidate(hi): stop-hardcoding-your-prompts via openrouter/z-ai/glm-5-turbo
- 4ad891b55528ea4f92c4373fcee54be0e13d639d i18n candidate(hi): stop-hardcoding-your-prompts via openrouter/minimax/minimax-m2.5

## Failure Notes

- openrouter/qwen/qwen3.6-plus: rejected after touching unrelated files during parallel work.
- openrouter/deepseek/deepseek-v4-flash: rejected because the expected target file was missing.
- openrouter/z-ai/glm-4.7-flash: rejected after unrelated parallel-work files changed during the run.
- openrouter/google/gemini-3-flash-preview: rejected because the candidate dropped the preserved `ModelResponse` MDX component.
- openrouter/deepseek/deepseek-v3.2: rejected after the 240-second OpenCode timeout.
