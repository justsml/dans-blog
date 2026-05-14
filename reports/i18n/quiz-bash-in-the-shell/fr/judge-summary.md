# Translation Judge Summary

- Slug: quiz-bash-in-the-shell
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
- Runtime seconds: 3.56
- Input tokens: 23742
- Output tokens: 484
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.013323
- Estimated cost: $0.013323

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.45
- Input tokens: 18416
- Output tokens: 222
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009874
- Estimated cost: $0.009874

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "options={[ ]}" Replacement: "options={[ { text: \">\" }, { text: \">>\" }, { text: \"|\", isAnswer: true }, { text: \"||\" }, { text: \"|>\" }, { text: \"Error\" }, ]}" Reason: The candidate is missing the options for the Piping challenge (index 9). Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "options={[ ]}" Replacement: "options={[ { text: \"1>&2\" }, { text: \"&2>&1\" }, { text: \"2>&1\", isAnswer: true }, { text: \"2>1\" }, { text: \"&2>1\" }, ]}" Reason: The candidate is missing the options for the Standard In/Out challenge (index 15). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-20--quiz-bash-in-the-shell/fr/index.mdx
- 3fcb2e9089dd78bf5102d45b605de4a49da1bdbb i18n candidate(fr): quiz-bash-in-the-shell via openrouter/openai/gpt-oss-120b:nitro
- 86cf74c799c8b710515dc3e861d50c00f0e4eee6 i18n candidate(fr): quiz-bash-in-the-shell via openrouter/qwen/qwen3-32b:nitro
