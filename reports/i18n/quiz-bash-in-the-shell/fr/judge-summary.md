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
- Runtime seconds: 3.19
- Input tokens: 23814
- Output tokens: 283
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.012756

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.83
- Input tokens: 18008
- Output tokens: 546
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.010642

### Pass 2
- Runtime seconds: 4.08
- Input tokens: 18285
- Output tokens: 677
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011173

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "Quel affichera `It's 🔨 Time!` ?" Replacement: "Lequel affichera `It's 🔨 Time!` ?" Reason: Grammar: 'Quel' is used as an adjective, 'Lequel' is the correct pronoun for 'Which one'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "avec toutes ces guillemets" Replacement: "avec tous ces guillemets" Reason: Gender: 'guillemet' is masculine in French. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "options={[ ]}" Replacement: "options={[ { text: \">\" }, { text: \">>\" }, { text: \"|\", isAnswer: true }, { text: \"||\" }, { text: \"|>\" }, { text: \"Error\" }, ]}" Reason: The translation is missing all options for Challenge index 9 (Piping), making the quiz unplayable. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "options={[ ]}" Replacement: "options={[ { text: \"1>&2\" }, { text: \"&2>&1\" }, { text: \"2>&1\", isAnswer: true }, { text: \"2>1\" }, { text: \"&2>1\" }, ]}" Reason: The translation is missing all options for Challenge index 15 (Standard In/Out), making the quiz unplayable. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied medium priority suggestion. Match: "avec toutes ces guillemets" Replacement: "avec tous ces guillemets" Reason: Grammar: 'guillemet' is a masculine noun in French. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-20--quiz-bash-in-the-shell/fr/index.mdx
- 3fcb2e9089dd78bf5102d45b605de4a49da1bdbb i18n candidate(fr): quiz-bash-in-the-shell via openrouter/openai/gpt-oss-120b:nitro
- 86cf74c799c8b710515dc3e861d50c00f0e4eee6 i18n candidate(fr): quiz-bash-in-the-shell via openrouter/qwen/qwen3-32b:nitro
