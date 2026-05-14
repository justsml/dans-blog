# Translation Judge Summary

- Slug: quiz-bash-in-the-shell
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
- Runtime seconds: 3.48
- Input tokens: 23033
- Output tokens: 446
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.012854
- Estimated cost: $0.012854

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.04
- Input tokens: 18086
- Output tokens: 183
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009592
- Estimated cost: $0.009592

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "options={[ ]}" Replacement: "options={[ { text: \">\" }, { text: \">>\" }, { text: \"|\", isAnswer: true }, { text: \"||\" }, { text: \"|>\" }, { text: \"Error\" }, ]}" Reason: The candidate is missing the options list for the Piping challenge, which is present in the English source. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "options={[ ]}" Replacement: "options={[ { text: \"1>&2\" }, { text: \"&2>&1\" }, { text: \"2>&1\", isAnswer: true }, { text: \"2>1\" }, { text: \"&2>1\" }, ]}" Reason: The candidate is missing the options list for the Standard In/Out challenge, which is present in the English source. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-20--quiz-bash-in-the-shell/ja/index.mdx
- ae1d03cd855b6d863b1f04c8b58ef47a5deafba5 i18n candidate(ja): quiz-bash-in-the-shell via openrouter/openai/gpt-oss-120b:nitro
- 1ee98a52c731bc4b82eea580e0e9162a3bc8ac69 i18n candidate(ja): quiz-bash-in-the-shell via openrouter/qwen/qwen3-32b:nitro
