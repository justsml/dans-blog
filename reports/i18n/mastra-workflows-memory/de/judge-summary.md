# Translation Judge Summary

- Slug: mastra-workflows-memory
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
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
- Runtime seconds: 3.27
- Input tokens: 8396
- Output tokens: 330
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005188
- Estimated cost: $0.005188

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.69
- Input tokens: 11614
- Output tokens: 267
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006608
- Estimated cost: $0.006608

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: ''" Replacement: "title: \"Hör auf, unzuverlässige Agenten zu bauen: Nutze Workflows & Memory\"" Reason: The frontmatter title is empty in the candidate, which is a major omission for a reader-facing document. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "[Mastra Workflows Dokumentation](https://mastra.ai/docs/workflows/overview)" Replacement: "[Mastra Workflows-Dokumentation](https://mastra.ai/docs/workflows/overview)" Reason: German compound nouns should be hyphenated or joined; 'Workflows Dokumentation' is a common grammatical error (Deppenleerzeichen). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-05--mastra-workflows-memory/de/index.mdx
- 61cebdaaf4100a45580a9de981734fc392b29e22 i18n candidate(de): mastra-workflows-memory via openrouter/deepseek/deepseek-v4-flash
