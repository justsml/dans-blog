# Translation Judge Summary

- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 4.34
- Input tokens: 4481
- Output tokens: 342
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003266
- Estimated cost: $0.003266

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.21
- Input tokens: 4618
- Output tokens: 234
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003011
- Estimated cost: $0.003011

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "מדריך הפקה" Replacement: "צ'ק-ליסט לפרודקשן" Reason: 'Production Playbook' is better translated as a checklist or strategy for production environments rather than 'Production Guide' (מדריך הפקה) which sounds like movie production. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "תור המיקרו-משימות אכל את שיעורי הבית שלי" Replacement: "תור המיקרו-טאסקים אכל לי את שיעורי הבית" Reason: 'Microtasks' is standard technical jargon in Hebrew dev circles, and 'אכל לי את' is the idiomatic way to say 'ate my' in this context. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 6c21dc1c863d69f1ddfb0b46005d7dc7690354f5 i18n candidate(he): async-stack-traces-why-error-stack-lies-in-production via openrouter/deepseek/deepseek-v4-flash
- eba98d2870c24bcfe7cad955254ae78dea1e04b8 i18n candidate(he): async-stack-traces-why-error-stack-lies-in-production via openrouter/openai/gpt-oss-120b:nitro
