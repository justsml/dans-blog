# Translation Judge Summary

- Slug: angularjs-v2-impending-schism
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.62
- Input tokens: 3384
- Output tokens: 277
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002523

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.61
- Input tokens: 3178
- Output tokens: 355
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002654

### Pass 2
- Runtime seconds: 2.20
- Input tokens: 3104
- Output tokens: 281
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002395

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "</div" Replacement: "</div>" Reason: The candidate has broken HTML tags (missing the closing bracket) in two places. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "</div" Replacement: "</div>" Reason: The candidate has a broken HTML tag (missing the closing bracket) at the end of the file. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "`Basic Shell Usage` y `Gulp or Grunt? Godsend+Misery!`" Replacement: "`Uso básico de la terminal` y `¿Gulp o Grunt? ¡Bendición+Miseria!`" Reason: Translating these terms makes the content more accessible to Spanish speakers while maintaining the technical context. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2015-08-05--angularjs-v2-impending-schism/es/index.mdx
- 0ca9fb1f208bcd562211a047969398d423c15f4a i18n candidate(es): angularjs-v2-impending-schism via openrouter/openai/gpt-oss-120b:nitro
- 7261d5e62fcee80bb7858009c0fa9ee758e6cd18 i18n candidate(es): angularjs-v2-impending-schism via openrouter/qwen/qwen3-32b:nitro
