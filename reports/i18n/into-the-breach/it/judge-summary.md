# Translation Judge Summary

- Slug: into-the-breach
- Locale: it
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: low (0.350)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 4.55
- Input tokens: 16432
- Output tokens: 272
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009032
- Estimated cost: $0.009032

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2026-05-13--into-the-breach/it/index.mdx
- c1c6c7e49b44cf5ac0ed4a9848cf704515a09a7a i18n candidate(it): into-the-breach via deepseek/deepseek-v4-flash:nitro
- 87302e62d669ecd9ea970530a8bfd7f75b57fea7 i18n candidate(it): into-the-breach via openrouter/qwen/qwen3-32b:nitro
- cbc1d1a8ba8da178dbb7c4cc1abf03d3fea0af82 i18n candidate(it): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
