# Translation Judge Summary

- Slug: quiz-regex-or-wreckage
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
- Runtime seconds: 3.69
- Input tokens: 25148
- Output tokens: 304
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.013486

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.31
- Input tokens: 19178
- Output tokens: 473
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011008

### Pass 2
- Runtime seconds: 3.14
- Input tokens: 19276
- Output tokens: 473
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011057

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "リテラルのドル記号にマッチさせるにはエスケープします: `\\\\$`" Replacement: "リテラルのドル記号にマッチさせるにはエスケープします: `\\$`" Reason: The candidate used double backslashes in the text description which is unnecessary and confusing in this context compared to the single backslash used in the code block below it. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "特殊文字は文字通りマッチさせるために `\\\\` でエスケープする必要があります" Replacement: "特殊文字は文字通りマッチさせるために `\\` でエスケープする必要があります" Reason: The candidate used double backslashes in the text description which is unnecessary and confusing in this context compared to the single backslash used in the code block below it. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "リテラルのドル記号にマッチさせるにはエスケープします: `\\\\$`" Replacement: "リテラルのドル記号にマッチさせるにはエスケープします: `\\$`" Reason: The candidate used double backslashes in the text description which is unnecessary and confusing in this context compared to the single backslash used in the code block below it. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-15--quiz-regex-or-wreckage/ja/index.mdx
- 08267f3e6345146245ce8910cf532bf1a8b4710f i18n candidate(ja): quiz-regex-or-wreckage via openrouter/openai/gpt-oss-120b:nitro
- 95cba6d5da4edc9d7c40646316865a93dc7b6c7a i18n candidate(ja): quiz-regex-or-wreckage via openrouter/qwen/qwen3-32b:nitro
