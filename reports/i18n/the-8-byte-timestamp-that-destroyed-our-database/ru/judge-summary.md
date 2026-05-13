# Translation Judge Summary

- Slug: the-8-byte-timestamp-that-destroyed-our-database
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.94
- Input tokens: 15821
- Output tokens: 301
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008814

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.50
- Input tokens: 9457
- Output tokens: 249
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005476

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "Когда друг забирает меня в Чикаго, ей нужно знать" Replacement: "Когда подруга забирает меня в Чикаго, ей нужно знать" Reason: The English text uses 'she', and the context implies a female friend. 'Друг' is masculine; 'подруга' matches the pronoun 'ей' better in Russian. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/ru/index.mdx
- 8b15e2fe29f84add043b62671e15b7e1006c06c9 i18n candidate(ru): the-8-byte-timestamp-that-destroyed-our-database via openrouter/qwen/qwen3.6-plus
- c7b21e93e6622e521dd8b1ef6be6e4e04d19fd14 i18n candidate(ru): the-8-byte-timestamp-that-destroyed-our-database via openrouter/openai/gpt-oss-120b:nitro
- c6f842fc6f89d3733d84d4750443ee208681b231 i18n candidate(ru): the-8-byte-timestamp-that-destroyed-our-database via openrouter/qwen/qwen3-32b:nitro
