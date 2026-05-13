# Translation Judge Summary

- Slug: you-may-not-need-axios
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
- Runtime seconds: 2.70
- Input tokens: 12000
- Output tokens: 284
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006852

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.49
- Input tokens: 9410
- Output tokens: 270
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005515

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "## Fetch Recipes" Replacement: "## Рецепты fetch" Reason: The heading was left in English while the rest of the document is translated. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "##### Source: Progress Helper" Replacement: "##### Источник: Помощник прогресса" Reason: Consistency with other translated headings. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "### Recursive Retry Helper" Replacement: "### Помощник рекурсивных повторов" Reason: Consistency with other translated headings. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-11-15--you-may-not-need-axios/ru/index.mdx
- 792d5231a45862cc0ab6ac086f4493ac9a24608b i18n candidate(ru): you-may-not-need-axios via openrouter/openai/gpt-oss-120b:nitro
- f95d1f3b70c6efe4f4628bbbee132e28a3327549 i18n candidate(ru): you-may-not-need-axios via openrouter/qwen/qwen3-32b:nitro
