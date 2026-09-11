# Translation Judge Summary

- Slug: how-to-hire-an-ai-engineer-without-getting-burned
- Locale: it
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.878)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 4.72
- Input tokens: 13251
- Output tokens: 430
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011551
- Estimated cost: $0.011551

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.50
- Input tokens: 12607
- Output tokens: 171
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010096
- Estimated cost: $0.010096

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[\"It scored 94%\" non è una misurazione se la stessa esecuzione ottiene l'82% martedì.](../auto-tune-your-llm-judge)" Replacement: "[\"Ha ottenuto il 94%\" non è una misurazione se la stessa esecuzione ottiene l'82% di martedì.](/auto-tune-your-llm-judge)" Reason: Translates the English sentence fragment inside the link and fixes the internal route link from relative '../' to root-relative '/' like the English source. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "test fallimentare" Replacement: "test che fallisce" Reason: In Italian software terminology, 'test fallimentare' means related to bankruptcy or doomed to fail, whereas 'test che fallisce' accurately captures a 'failing test'. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 3a18d181e4e53122f34f71637f1d7220f4722526 i18n candidate(it): how-to-hire-an-ai-engineer-without-getting-burned via openrouter/openai/gpt-oss-120b:nitro
- a787a86e158a12bfcdffbc4395ecccaa53695402 i18n candidate(it): how-to-hire-an-ai-engineer-without-getting-burned via openrouter/deepseek/deepseek-v4-flash
