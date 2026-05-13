# Translation Judge Summary

- Slug: protect-your-tokens
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
- Runtime seconds: 3.29
- Input tokens: 6786
- Output tokens: 365
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004488

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 1.98
- Input tokens: 5595
- Output tokens: 215
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003442

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "** ‼️ Important:** `Secret keys` **MUST** be ignored by Git _AND_ omitted in all browser code. [_How to use dotenv_](../#-how-to-handle-secrets-safely)" Replacement: "** ‼️ 重要:** `シークレットキー`は **Gitで無視し**、かつすべてのブラウザコードから**除外しなければなりません**。 [_dotenvの使用方法_](../#-how-to-handle-secrets-safely)" Reason: The candidate left a critical warning paragraph in English. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "### Checklist: Handling Secrets Safely" Replacement: "### チェックリスト：シークレットを安全に扱うために" Reason: Heading was left in English. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "#### Quick Overview" Replacement: "#### クイック概要" Reason: Heading was left in English. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx
- f52f2a4b676f394f554309e65984734be23e1e18 i18n candidate(ja): protect-your-tokens via openrouter/openai/gpt-oss-120b:nitro
- 803b157880eab551ea3346ff40f8897ac9903366 i18n candidate(ja): protect-your-tokens via openrouter/qwen/qwen3-32b:nitro
