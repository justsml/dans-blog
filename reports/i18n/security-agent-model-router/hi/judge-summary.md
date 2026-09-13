# Translation Judge Summary

- Slug: security-agent-model-router
- Locale: hi
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.875)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 8.83
- Input tokens: 25186
- Output tokens: 415
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.020446
- Estimated cost: $0.020446

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.71
- Input tokens: 24291
- Output tokens: 180
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.018893
- Estimated cost: $0.018893

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "इसका उत्तर [ExploitHunter.app](../announcing-exploithunter-app) के लिए पाने के लिए" Replacement: "इसका उत्तर [ExploitHunter.app](/announcing-exploithunter-app) के लिए पाने के लिए" Reason: Preserve the absolute post link /announcing-exploithunter-app as in the English source, rather than converting it to a relative link Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-06-30--security-agent-model-router/hi/index.mdx
- 31de95345bc7078b2b626eab6b5b25e9ed6d389f i18n candidate(hi): security-agent-model-router via openrouter/openai/gpt-5.6-luna
- 41c9c278dc1206bc9b1d36ebd655fa4ee645ddd5 i18n candidate(hi): security-agent-model-router via openrouter/deepseek/deepseek-v4-flash
