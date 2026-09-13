# Translation Judge Summary

- Slug: security-agent-model-router
- Locale: ja
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.888)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 4.54
- Input tokens: 25858
- Output tokens: 414
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.020946
- Estimated cost: $0.020946

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 6.22
- Input tokens: 24903
- Output tokens: 164
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.019292
- Estimated cost: $0.019292

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "- /Users/dan/code/oss/agent-security/evals/results/browser-e2e/five-model-post-tuning-gpt-oss-serial-triplicate-20260719/report.md */" Replacement: "- /Users/dan/code/oss/agent-security/evals/results/browser-e2e/five-model-post-tuning-gpt-oss-serial-triplicate-20260719/report.md */}" Reason: Close the JSX comment properly with */} instead of */ to avoid MDX parsing fragility. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-06-30--security-agent-model-router/ja/index.mdx
- e8a13a805e2891be184f6cc86cfccb6a9edf45eb i18n candidate(ja): security-agent-model-router via openrouter/deepseek/deepseek-v4-flash
- 937851780d84294f8155f9d3bfc5c0b19a979c83 i18n candidate(ja): security-agent-model-router via openrouter/openai/gpt-5.6-luna
