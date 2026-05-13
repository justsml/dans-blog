# Translation Judge Summary

- Slug: are-promises-broken
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 4.42
- Input tokens: 14548
- Output tokens: 280
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008114

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.16
- Input tokens: 9049
- Output tokens: 383
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005673

### Pass 2
- Runtime seconds: 15.22
- Input tokens: 9055
- Output tokens: 324
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005500

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "src=\"https://repl.it/@justsml/throwing-errors-in-javascript?lite=true\"" Replacement: "src=\"../@justsml/throwing-errors-in-javascript?lite=true\"" Reason: The iframe source needs to use the relative path consistent with other assets in the project structure to avoid potential loading issues or external dependency inconsistencies. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "Chaquevaleur retournée" Replacement: "Chaque valeur retournée" Reason: Missing space between words 'Chaque' and 'valeur'. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged medium priority suggestion. Match: "src=\"../@justsml/throwing-errors-in-javascript?lite=true\"" Replacement: "src=\"https://repl.it/@justsml/throwing-errors-in-javascript?lite=true\"" Reason: The previous fix incorrectly changed an external iframe URL to a relative path. This is an external tool (repl.it), not a local asset, so it must remain a full URL. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2018-10-06--are-promises-broken/fr/index.mdx
- 5ecd9b32f69afc7389bc1cc320634f8a0d290ddf i18n candidate(fr): are-promises-broken via openrouter/qwen/qwen3.6-plus
- 7a1c18d9204345cd2140fc0f7d8cb4638663bd43 i18n candidate(fr): are-promises-broken via openrouter/openai/gpt-oss-120b:nitro
- 0b4218118e03564be4ff612cf7580dfa6f5451b4 i18n candidate(fr): are-promises-broken via openrouter/qwen/qwen3-32b:nitro
