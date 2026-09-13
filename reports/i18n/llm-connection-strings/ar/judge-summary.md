# Translation Judge Summary

- Slug: llm-connection-strings
- Locale: ar
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.888)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.39
- Input tokens: 7155
- Output tokens: 324
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006581
- Estimated cost: $0.006581

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.04
- Input tokens: 6871
- Output tokens: 159
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005750
- Estimated cost: $0.005750

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "فاذهب ولمس العشب." Replacement: "فاخرج واستنشق بعض الهواء والمس العشب." Reason: Improves naturalness and clarity of the localized 'go touch grass' idiom in Arabic. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-30--llm-connection-strings/ar/index.mdx
- 904eddb228b3fbe8597026fe2073ecca9a029107 i18n candidate(ar): llm-connection-strings via openrouter/openai/gpt-5.6-luna
- d5389c172b489a70fb88367aefabad36d685dca4 i18n candidate(ar): llm-connection-strings via openrouter/deepseek/deepseek-v4-flash
