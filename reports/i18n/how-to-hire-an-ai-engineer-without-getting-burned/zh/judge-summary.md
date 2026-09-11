# Translation Judge Summary

- Slug: how-to-hire-an-ai-engineer-without-getting-burned
- Locale: zh
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.880)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 8.31
- Input tokens: 11828
- Output tokens: 405
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010390
- Estimated cost: $0.010390

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.53
- Input tokens: 11897
- Output tokens: 170
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009560
- Estimated cost: $0.009560

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[\"若周二重跑同样的任务只得82分，'94%的得分'就不是一个有效的度量。](/auto-tune-your-llm-judge)" Replacement: "[“得分 94%”并不是度量，如果同一次运行在周二得分 82%。](/auto-tune-your-llm-judge)" Reason: The markdown link syntax was broken with mismatched quotes inside brackets, leading to malformed markdown text. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- d6d2a0737e3e02498fcec1725b4a37795d6d9874 i18n candidate(zh): how-to-hire-an-ai-engineer-without-getting-burned via openrouter/openai/gpt-oss-120b:nitro
- 4d0465e33d759d60ee7b89f60927575bf8e5a1f6 i18n candidate(zh): how-to-hire-an-ai-engineer-without-getting-burned via openrouter/deepseek/deepseek-v4-flash
