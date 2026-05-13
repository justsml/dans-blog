# Translation Judge Summary

- Slug: should-you-use-named-or-default-exports
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
- Runtime seconds: 3.77
- Input tokens: 7283
- Output tokens: 435
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004947

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.31
- Input tokens: 6121
- Output tokens: 206
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003678

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "Экспортв ESM: именованный или по умолчанию?" Replacement: "ESM-экспорты: именованные или по умолчанию?" Reason: Fixes a typo (missing space) and improves natural phrasing in the title. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "Назвать илине назвать?" Replacement: "Называть или не называть?" Reason: Fixes a typo (missing space) in the subtitle. Note: Applied exact replacement to selected MDX.
3. Pass 1: logged medium priority suggestion. Match: "именные экспорт" Replacement: "именованные экспорты" Reason: Grammar fix: 'именные экспорт' is incorrect; should be plural 'именованные экспорты'. Note: Exact match not found in selected MDX.
4. Pass 1: applied medium priority suggestion. Match: "пожалуйста, `export` делайте так, как вы действительно имеете в виду." Replacement: "пожалуйста, экспортируйте так, будто вам не всё равно." Reason: The original English 'export like you fucking mean it' is an idiomatic expression of passion/intent. The translation is a bit literal. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2023-08-18--should-you-use-named-or-default-exports/ru/index.mdx
- 68a859f14c8109a557b95f31ceb3e5d9b7cf11f0 i18n candidate(ru): should-you-use-named-or-default-exports via openrouter/openai/gpt-oss-120b:nitro
- 1336f38a06eb398eefff3ec9f8443d3039f0b8f4 i18n candidate(ru): should-you-use-named-or-default-exports via openrouter/qwen/qwen3-32b:nitro
