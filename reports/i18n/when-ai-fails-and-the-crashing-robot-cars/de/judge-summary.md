# Translation Judge Summary

- Slug: when-ai-fails-and-the-crashing-robot-cars
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
- Runtime seconds: 3.39
- Input tokens: 6273
- Output tokens: 383
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004286
- Estimated cost: $0.004286

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.20
- Input tokens: 5114
- Output tokens: 235
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003262
- Estimated cost: $0.003262

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: WennKI versagt" Replacement: "title: Wenn KI versagt" Reason: Missing space between 'Wenn' and 'KI'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "## Robotic Cars: More or Less Crashes?" Replacement: "## Roboterautos: Mehr oder weniger Unfälle?" Reason: The heading was left in English in the selected candidate. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2015-12-18--when-ai-fails-and-the-crashing-robot-cars/de/index.mdx
- 0d29bac3761e22b92828c7d48e44646d2bd985f9 i18n candidate(de): when-ai-fails-and-the-crashing-robot-cars via openrouter/openai/gpt-oss-120b:nitro
- ce20d1cbdc14fbd166afd7caeed8665dbb2bf667 i18n candidate(de): when-ai-fails-and-the-crashing-robot-cars via openrouter/qwen/qwen3-32b:nitro
