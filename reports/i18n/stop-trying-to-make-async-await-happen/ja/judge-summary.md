# Translation Judge Summary

- Slug: stop-trying-to-make-async-await-happen
- Locale: ja
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
- Input tokens: 14510
- Output tokens: 264
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008047

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.42
- Input tokens: 9242
- Output tokens: 248
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005365

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "response.ststus" Replacement: "response.status" Reason: Fixing a typo in the code block inherited from the original English text to ensure technical accuracy. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/ja/index.mdx
- 6305b795fa815b0cb8fb4a240062ed8b2f42fa10 i18n candidate(ja): stop-trying-to-make-async-await-happen via openrouter/qwen/qwen3.6-plus
- 3c2bfe2ba4ff617ff9ef9c2c0ac8ea43b548c0a4 i18n candidate(ja): stop-trying-to-make-async-await-happen via openrouter/openai/gpt-oss-120b:nitro
- ee782985d5abd47eea7db1a39a1a7024efc52444 i18n candidate(ja): stop-trying-to-make-async-await-happen via openrouter/qwen/qwen3-32b:nitro
