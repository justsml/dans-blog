# Translation Judge Summary

- Slug: honest-priorities
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
- Runtime seconds: 2.96
- Input tokens: 11141
- Output tokens: 310
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006501

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.42
- Input tokens: 6819
- Output tokens: 274
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004232

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "Irgend wird der Umfang" Replacement: "Irgendwann wird der Umfang" Reason: Missing part of the word 'irgendwann' (eventually). Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Engineering-Theater" Replacement: "Engineering-Theaters" Reason: Grammatical case correction (genitive). Note: Applied exact replacement to selected MDX.
3. Pass 2: logged medium priority suggestion. Match: "Wie können wir dieses alberne Spiel der Engineering-Theaters vermeiden?" Replacement: "Wie können wir dieses alberne Spiel des Engineering-Theaters vermeiden?" Reason: Grammatical correction: 'des' is the correct masculine genitive article for 'Engineering-Theater'. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2024-10-23--honest-priorities/de/index.mdx
- b0a98d6affc416efd6057a1d9f86d72f710dab5b i18n candidate(de): honest-priorities via openrouter/qwen/qwen3.6-plus
- 833a1e3f87f6e44f696d2282f1bd79b301b76627 i18n candidate(de): honest-priorities via openrouter/openai/gpt-oss-120b:nitro
- c791672ec0bb96c689cc3385c31f89da56fd0315 i18n candidate(de): honest-priorities via openrouter/qwen/qwen3-32b:nitro
