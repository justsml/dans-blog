# Translation Judge Summary

- Slug: are-promises-broken
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.59
- Input tokens: 11750
- Output tokens: 278
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006709

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.58
- Input tokens: 8888
- Output tokens: 313
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005383

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "src=\"https://repl.it/@justsml/throwing-errors-in-javascript?lite=true\"" Replacement: "src=\"../@justsml/throwing-errors-in-javascript?lite=true\"" Reason: The iframe source path needs to be relative to match the project structure and other assets, ensuring it loads correctly in the localized context. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "src=\"../@justsml/throwing-errors-in-javascript?lite=true\"" Replacement: "src=\"https://repl.it/@justsml/throwing-errors-in-javascript?lite=true\"" Reason: The previous fix incorrectly changed an external URL to a relative path. This is an external iframe and must remain a full URL to function. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2018-10-06--are-promises-broken/de/index.mdx
- 36d6e5ef52312f4fcad9823b52426fe466e1d4a1 i18n candidate(de): are-promises-broken via openrouter/openai/gpt-oss-120b:nitro
- 23765761dc45db837d19d4d6d39fee27d17c9962 i18n candidate(de): are-promises-broken via openrouter/qwen/qwen3-32b:nitro
