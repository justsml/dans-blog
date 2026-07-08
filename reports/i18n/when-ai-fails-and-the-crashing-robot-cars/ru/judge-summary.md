# Translation Judge Summary

- Slug: when-ai-fails-and-the-crashing-robot-cars
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: low (0.319)
- Confidence signals: 1 high and 1 medium issues; single judge
- High/medium/low issue counts: 1/1/0

## Primary Judge Telemetry
- Runtime seconds: 3.09
- Input tokens: 4914
- Output tokens: 330
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003447
- Estimated cost: $0.003447

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.78
- Input tokens: 4935
- Output tokens: 492
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003943
- Estimated cost: $0.003943

### Pass 2
- Runtime seconds: 3.59
- Input tokens: 4923
- Output tokens: 407
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003683
- Estimated cost: $0.003683

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "References" Replacement: "Ссылки" Reason: The heading 'References' should be translated to 'Ссылки' for consistency with the rest of the Russian content. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "трудно сливается в плотный" Replacement: "испытывать трудности при слиянии с плотным" Reason: Grammatical correction: the original phrasing was awkward. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "быстрый поток на шоссе" Replacement: "быстрым потоком на шоссе" Reason: Grammatical case mismatch: 'слиянии с' requires the instrumental case ('потоком'), not nominative ('поток'). Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "проблема трамвайного переключателя" Replacement: "проблема вагонетки" Reason: The standard, universally recognized Russian term for 'the trolley problem' is 'проблема вагонетки'. 'Трамвайный переключатель' is a literal and non-standard translation. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied medium priority suggestion. Match: "безвиновного робота" Replacement: "ни в чем не повинного робота" Reason: The word 'безвиновного' is archaic/unnatural in modern Russian. 'Ни в чем не повинного' is the idiomatic way to say 'innocent' in this context. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2015-12-18--when-ai-fails-and-the-crashing-robot-cars/ru/index.mdx
- eba622e999885d50c4f00dfc2c7d4c1faf7fc0a9 i18n candidate(ru): when-ai-fails-and-the-crashing-robot-cars via openrouter/openai/gpt-oss-120b:nitro
