# Translation Judge Summary

- Slug: quiz-data-structures-algorithms
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
- Runtime seconds: 3.21
- Input tokens: 20319
- Output tokens: 343
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011189
- Estimated cost: $0.011189

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.18
- Input tokens: 18992
- Output tokens: 322
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010462
- Estimated cost: $0.010462

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "ואלגוריתמים (), ובמורכבות זמן." Replacement: "ואלגוריתמים, ובסיבוכיות זמן." Reason: The empty parentheses are a leftover from the English source and should be removed. 'סיבוכיות' is the standard technical term for complexity in Hebrew CS contexts. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "האם אתה יכול לעבוד על עץ בינארי?" Replacement: "האם אתה יכול לבלף עץ בינארי?" Reason: The subtitle 'Can you BS a Binary Tree?' is a play on words. 'לעבוד על' is okay but 'לבלף' captures the 'BS' nuance better in a casual technical context. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "ואלגוריתמים, ובסיבוכיות זמן." Replacement: "ואלגוריתמים, ובסיבוכיות זמן." Reason: The previous judge suggested a fix for empty parentheses that are not actually present in the current selected MDX. No change needed here, but keeping the technical term 'סיבוכיות'. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current not present
- 5a0ceb1a327eb988c5f5aa9843e8d02def65b2f3 i18n candidate(he): quiz-data-structures-algorithms via openrouter/deepseek/deepseek-v4-flash
- d4bcdcba1837aa6d5f03dbf807cc64a9d7978df0 i18n candidate(he): quiz-data-structures-algorithms via openrouter/openai/gpt-oss-120b:nitro
