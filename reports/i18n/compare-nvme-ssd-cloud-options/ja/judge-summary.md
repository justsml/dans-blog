# Translation Judge Summary

- Slug: compare-nvme-ssd-cloud-options
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.74
- Input tokens: 7328
- Output tokens: 322
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004630

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.19
- Input tokens: 5088
- Output tokens: 197
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003135

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "## クラウドパフォーマンスを最大70%向上" Replacement: "## クラウドパフォーマンスを最大70%向上させる" Reason: The original English is a call to action/benefit statement. Adding 'させる' or keeping it as a heading is fine, but the current candidate is missing the H2 heading level in the 'current' version (it used plain text). This candidate correctly uses H2. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/ja/index.mdx
- 8fe897146e658eadc43409ad815f39cc1131833a i18n candidate(ja): compare-nvme-ssd-cloud-options via openrouter/qwen/qwen3.6-plus
- 7d14e1f1bc75a88f02aee786365c690c85689843 i18n candidate(ja): compare-nvme-ssd-cloud-options via openrouter/openai/gpt-oss-120b:nitro
- a08a6bd02c77901325bd6036a5881fbea2f56976 i18n candidate(ja): compare-nvme-ssd-cloud-options via openrouter/qwen/qwen3-32b:nitro
