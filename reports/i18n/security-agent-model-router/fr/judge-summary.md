# Translation Judge Summary

- Slug: security-agent-model-router
- Locale: fr
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.882)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 10.43
- Input tokens: 17605
- Output tokens: 504
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015094
- Estimated cost: $0.015094

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 6.16
- Input tokens: 25144
- Output tokens: 243
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.019769
- Estimated cost: $0.019769

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "<img src=\".././docker-lab-score-matrix.svg\"" Replacement: "<img src=\"../docker-lab-score-matrix.svg\"" Reason: Clean up awkward redundant relative path notation '.././' for markdown/HTML image source. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "<img src=\".././cost-quality-frontier.svg\"" Replacement: "<img src=\"../cost-quality-frontier.svg\"" Reason: Clean up awkward redundant relative path notation '.././' for markdown/HTML image source. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "<img src=\".././frontier-tool-behavior.svg\"" Replacement: "<img src=\"../frontier-tool-behavior.svg\"" Reason: Clean up awkward redundant relative path notation '.././' for markdown/HTML image source. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "<img src=\".././command-tool-pass-rates.svg\"" Replacement: "<img src=\"../command-tool-pass-rates.svg\"" Reason: Clean up awkward redundant relative path notation '.././' for markdown/HTML image source. Note: Applied exact replacement to selected MDX.
5. Pass 1: applied medium priority suggestion. Match: "[ExploitHunter.app](../announcing-exploithunter-app)" Replacement: "[ExploitHunter.app](/announcing-exploithunter-app)" Reason: Preserve root-relative post link rather than treating it as an asset path. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-06-30--security-agent-model-router/fr/index.mdx
- 5ea343a4a6da4279ef65b4d45bb197584fd186b8 i18n candidate(fr): security-agent-model-router via openrouter/openai/gpt-5.6-luna
