# Translation Judge Summary

- Slug: llm-routing-mastra-ai
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.886)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 4.08
- Input tokens: 7499
- Output tokens: 487
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005210
- Estimated cost: $0.005210

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.06
- Input tokens: 7322
- Output tokens: 301
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004564
- Estimated cost: $0.004564

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: ''" Replacement: "title: 'モデルと心中するな'" Reason: The frontmatter title was left empty. It should be a localized version of 'Don't Marry Your Model'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "- [Mastra.ai Documentation](https://mastra.ai/docs) - [Mastra GitHub Repository](https://github.com/mastra-ai/mastra)" Replacement: "- [Mastra.ai ドキュメント](https://mastra.ai/docs) - [Mastra GitHub リポジトリ](https://github.com/mastra-ai/mastra)" Reason: Resource links should have localized labels for better readability. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-02--llm-routing-mastra-ai/ja/index.mdx
- 5197627d550e6cdba21504931a09b1989bd2ed6c i18n candidate(ja): llm-routing-mastra-ai via openrouter/qwen/qwen3.6-plus
- 7438a3ddabf3fdf57fe32d99ed62965758aa1d97 i18n candidate(ja): llm-routing-mastra-ai via openrouter/deepseek/deepseek-v4-flash
