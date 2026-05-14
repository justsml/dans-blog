# Translation Judge Summary

- Slug: quiz-can-you-count-to-bigint
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
- Runtime seconds: 3.70
- Input tokens: 14656
- Output tokens: 459
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008705
- Estimated cost: $0.008705

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.21
- Input tokens: 14682
- Output tokens: 218
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007995
- Estimated cost: $0.007995

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "<p class=\"inset\">מחפש מנוחה אחרי כל כך הרבה בינארי?<br />פחח, זכור: הפסקה *אחרי* כישורים! <br /><br />לחץ על [החדר כושר שלי](../challenges/) כדי לרסק עוד אתגרים! 💪</p>" Replacement: "<p class=\"inset\">מחפשים מנוחה אחרי כל כך הרבה בינארי?<br />פחח, זכרו: הפסקה עושים רק *אחרי* שרוכשים מיומנות! <br /><br />קפצו ל[חדר הכושר שלי](../challenges/) כדי לפצח עוד אתגרי..." Reason: The original translation was a bit too literal and used masculine singular instead of the more natural plural/neutral address for a general audience. 'Break after skills' is an idiom that needed a more natural Hebrew phrasing. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- dd0f4849754cc1d353697388939312d6abd18c32 i18n candidate(he): quiz-can-you-count-to-bigint via openrouter/deepseek/deepseek-v4-flash
- 840b70ca175065a2f6ea5ec848ddfdc1cc89d4c8 i18n candidate(he): quiz-can-you-count-to-bigint via openrouter/openai/gpt-oss-120b:nitro
