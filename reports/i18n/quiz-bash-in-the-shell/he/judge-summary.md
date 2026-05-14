# Translation Judge Summary

- Slug: quiz-bash-in-the-shell
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
- Runtime seconds: 3.46
- Input tokens: 19717
- Output tokens: 277
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010689
- Estimated cost: $0.010689

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.44
- Input tokens: 18876
- Output tokens: 363
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010527
- Estimated cost: $0.010527

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "ברוח ממנו" Replacement: "בצע לו escape" Reason: The phrase 'ברוח ממנו' is a literal/hallucinated translation of 'escape it'. In a technical context, 'בצע לו escape' or 'השתמש בלוכסן אחורי כדי לבטל את משמעות התו' is clearer. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "או בצע לו escape עם לוכסן אחורי" Replacement: "או בצע לו escape (באמצעות לוכסן אחורי `\\`)" Reason: The current text already uses 'בצע לו escape' in the provided MDX, but the judge report mentioned 'ברוח ממנו' which was likely a hallucination in the report or from an earlier version. However, ensuring the backslash is clearly associated with the escape action is better for technical clarity. Note: Exact match not found in selected MDX.

## Candidates
- current not present
- dc93ac450330fd2785855afae333d51654c5ecba i18n candidate(he): quiz-bash-in-the-shell via openrouter/deepseek/deepseek-v4-flash
- 487586a380ab3f3264588a02e2d3b627cdeb903b i18n candidate(he): quiz-bash-in-the-shell via openrouter/openai/gpt-oss-120b:nitro
