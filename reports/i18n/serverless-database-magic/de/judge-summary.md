# Translation Judge Summary

- Slug: serverless-database-magic
- Locale: de
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
- Input tokens: 18672
- Output tokens: 241
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.010059

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.52
- Input tokens: 11092
- Output tokens: 327
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006527

### Pass 2
- Runtime seconds: 2.81
- Input tokens: 11077
- Output tokens: 311
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006471

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "// \"Connect\" to a URL path" Replacement: "// „Verbindung“ zu einem URL-Pfad" Reason: The comment in the code block was left in English. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "// SQL + vector search combination" Replacement: "// Kombination aus SQL + Vektorsuche" Reason: The comment in the LanceDB code block was left in English. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "Klebe code" Replacement: "Glue-Code" Reason: Incorrect spacing and capitalization for the technical term 'glue code' in German. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-09-15--serverless-database-magic/de/index.mdx
- bea0508e308ece416bf1f92c4d18ae6c0c5efa5d i18n candidate(de): serverless-database-magic via openrouter/qwen/qwen3.6-plus
- 3a44ef7d83e96f94b85f24e00d1c609ac71fa139 i18n candidate(de): serverless-database-magic via openrouter/openai/gpt-oss-120b:nitro
- 22e7c69fd19a8f6bb01e204ae71dd5330259986a i18n candidate(de): serverless-database-magic via openrouter/qwen/qwen3-32b:nitro
