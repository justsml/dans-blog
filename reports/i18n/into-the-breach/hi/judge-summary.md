# Translation Judge Summary

- Slug: into-the-breach
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.882)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.02
- Input tokens: 9561
- Output tokens: 263
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005569
- Estimated cost: $0.005569

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.49
- Input tokens: 8930
- Output tokens: 237
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005176
- Estimated cost: $0.005176

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "cover_full_width: ../wide.webp" Replacement: "cover_full_width: ../wide-2.webp" Reason: The English source uses wide-2.webp; the candidate used wide.webp. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-13--into-the-breach/hi/index.mdx
- 97473b6075ebadec469330256076e4e106aac09b i18n candidate(hi): into-the-breach via openrouter/deepseek/deepseek-v4-flash
- 22b6c4a8be6c16f80d5a024fb5ef86242615ca1e i18n candidate(hi): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
