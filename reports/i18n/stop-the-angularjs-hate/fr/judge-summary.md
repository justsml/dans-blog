# Translation Judge Summary

- Slug: stop-the-angularjs-hate
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
- Runtime seconds: 2.92
- Input tokens: 7475
- Output tokens: 288
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004601

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.33
- Input tokens: 6015
- Output tokens: 281
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003851

### Pass 2
- Runtime seconds: 2.42
- Input tokens: 5894
- Output tokens: 313
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003886

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "ADHD" Replacement: "TDAH" Reason: ADHD is an acronym for Attention Deficit Hyperactivity Disorder, which is TDAH in French. The previous translation used TDA (Traitement, Distribution, Affichage) which is a hallucination/incorrect expansion in this context. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Welcome User" Replacement: "Bienvenue" Reason: The jade block was left in English. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "Just read this section" Replacement: "Lisez simplement cette section" Reason: The sentence was left in English in the middle of the French text. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2015-03-10--stop-the-angularjs-hate/fr/index.mdx
- 6cd578c50ec53994ff6446062c669cacaad4fcf3 i18n candidate(fr): stop-the-angularjs-hate via openrouter/openai/gpt-oss-120b:nitro
- 71dac93438c3e7605ad716185d76836421a3d38d i18n candidate(fr): stop-the-angularjs-hate via openrouter/qwen/qwen3-32b:nitro
