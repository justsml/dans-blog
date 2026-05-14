# Translation Judge Summary

- Slug: promise-gotchas
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
- Input tokens: 3437
- Output tokens: 277
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002550
- Estimated cost: $0.002550

## Judge Suggestions
1. Pass 1: logged medium priority suggestion. Match: "יקריאו console.log עם 42?" Replacement: "ידפיסו 42 ל-console.log?" Reason: 'יקריאו' (will read out loud) is incorrect for console output; 'ידפיסו' (will print) is the standard technical term. Note: Exact match not found in selected MDX.

## Candidates
- current not present
- 1e2fa8b9f8fa3b9ff18af026568a49003faf3c67 i18n candidate(he): promise-gotchas via openrouter/deepseek/deepseek-v4-flash
- d0761b8ae4753b01948e7754316dda15e0d48f71 i18n candidate(he): promise-gotchas via openrouter/openai/gpt-oss-120b:nitro
