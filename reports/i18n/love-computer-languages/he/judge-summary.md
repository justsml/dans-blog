# Translation Judge Summary

- Slug: love-computer-languages
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
- Runtime seconds: 3.76
- Input tokens: 9988
- Output tokens: 384
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006146
- Estimated cost: $0.006146

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.33
- Input tokens: 9636
- Output tokens: 228
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005502
- Estimated cost: $0.005502

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "בלי המורכבות/מלכודות שבדרך כלל תופסות" Replacement: "בלי המורכבות/המלכודות שבדרך כלל מפילות" Reason: 'מפילות' (tripping up) is more natural than 'תופסות' (catching) in the context of programming pitfalls. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "בלי צורך באוסף זבל איטי!" Replacement: "בלי צורך במנגנון איסוף זבל איטי!" Reason: 'Garbage collector' is better translated as 'מנגנון איסוף זבל' or simply 'איסוף זבל' rather than 'אוסף זבל' (which sounds like a person collecting trash). Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 59694d8eaca8533d027d43e86da1c92a7678c696 i18n candidate(he): love-computer-languages via openrouter/deepseek/deepseek-v4-flash
- 23ecd8c79d2b301f482186a363252dae29758431 i18n candidate(he): love-computer-languages via openrouter/openai/gpt-oss-120b:nitro
