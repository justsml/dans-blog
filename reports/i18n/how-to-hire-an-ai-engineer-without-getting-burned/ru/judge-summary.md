# Translation Judge Summary

- Slug: how-to-hire-an-ai-engineer-without-getting-burned
- Locale: ru
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.883)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 4.09
- Input tokens: 13556
- Output tokens: 379
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011588
- Estimated cost: $0.011588

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.12
- Input tokens: 12731
- Output tokens: 394
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011026
- Estimated cost: $0.011026

### Pass 2
- Runtime seconds: 2.64
- Input tokens: 12686
- Output tokens: 192
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010235
- Estimated cost: $0.010235

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[\"It scored 94%\" is not a measurement if the same run scores 82% on Tuesday.](/auto-tune-your-llm-judge)" Replacement: "[«Оценка 94%» — это не измерение, если тот же запуск во вторник дает 82%.](/auto-tune-your-llm-judge)" Reason: The anchor text for the internal article link was left untranslated in English. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied medium priority suggestion. Match: "Панаель, не способный ответить на эти вопросы, готовится к сорокиминутному разговору о «исполнительском присутствии»." Replacement: "Комиссия, не способная ответить на эти вопросы, готовится к сорокаминутному разговору об executive presence." Reason: Fix typos ('Панаель' -> 'Комиссия', 'сорокиминутному' -> 'сорокаминутному') and translate 'panel' idiomatically in Russian hiring context while rendering 'executive presence' properly. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "Вы наследуете помощника поддержки, который черновики ответов и предлагает возвраты." Replacement: "Вам достался помощник службы поддержки, который составляет черновики ответов и предлагает возвраты." Reason: Fix broken grammar / missing verb ('который черновики ответов' -> 'который составляет черновики ответов'). Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- a90027ba02af4eb2fb4d102def63939c6c177076 i18n candidate(ru): how-to-hire-an-ai-engineer-without-getting-burned via openrouter/openai/gpt-oss-120b:nitro
- aeeeec5ec95fb66785fe95a7f29d7e1b6787e090 i18n candidate(ru): how-to-hire-an-ai-engineer-without-getting-burned via openrouter/deepseek/deepseek-v4-flash
