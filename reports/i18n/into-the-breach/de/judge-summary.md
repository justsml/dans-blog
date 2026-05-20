# Translation Judge Summary

- Slug: into-the-breach
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.880)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.61
- Input tokens: 16692
- Output tokens: 321
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009309
- Estimated cost: $0.009309

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.29
- Input tokens: 11865
- Output tokens: 242
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006659
- Estimated cost: $0.006659

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "<p class=\"inset\"> The question is not whether you can avoid every bad click. The question is whether one bad click can read everything, use everything, and leave before you noti..." Replacement: "<p class=\"inset\"> Die Frage ist nicht, ob man jeden falschen Klick vermeiden kann. Die Frage ist, ob ein einziger falscher Klick alles auslesen, alles nutzen und verschwinden ka..." Reason: The candidate left a paragraph of prose in English. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-13--into-the-breach/de/index.mdx
- ab76f1571f8bec45ac19d9677adfbd94e86a12d9 i18n candidate(de): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
- eb13e4c561af47204945f6212fe4b2c4ba99d595 i18n candidate(de): into-the-breach via openrouter/qwen/qwen3-32b:nitro
- 39f2861ed0eba4b32024692bd37256f103db5369 i18n candidate(de): into-the-breach via deepseek/deepseek-v4-flash:nitro
