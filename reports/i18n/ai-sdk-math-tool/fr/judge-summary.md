# Translation Judge Summary

- Slug: ai-sdk-math-tool
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.56
- Input tokens: 12530
- Output tokens: 160
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006745

### Round 1, Batch 2
- Runtime seconds: 3.77
- Input tokens: 10386
- Output tokens: 503
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006702

## Primary Judge Telemetry
- Runtime seconds: 3.73
- Input tokens: 10272
- Output tokens: 525
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006711

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.07
- Input tokens: 8041
- Output tokens: 215
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004666

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "// Initialize the engine once" Replacement: "// Initialiser le moteur une seule fois" Reason: The comment in the code block was left in English. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "description: 'Evaluate mathematical expressions and solve equations with guaranteed accuracy. MUST be used for all mathematical operations to verify correctness - do not attempt..." Replacement: "description: 'Évaluer des expressions mathématiques et résoudre des équations avec une précision garantie. DOIT être utilisé pour toutes les opérations mathématiques afin de vér..." Reason: The tool description should be translated as it is part of the logic/prompting provided to the model. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "'Array of mathematical expressions in LaTeX or plain notation, e.g. [\"2 + 2\", \"\\\\frac{x^2 + 1}{x - 1}\", \"\\\\int x^2 dx\"]'" Replacement: "'Tableau d\\'expressions mathématiques en notation LaTeX ou simple, ex: [\"2 + 2\", \"\\\\frac{x^2 + 1}{x - 1}\", \"\\\\int x^2 dx\"]'" Reason: The parameter description should be translated. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-06--ai-sdk-math-tool/fr/index.mdx
- 0cd00d8fc4a30f618a63242fe3b28de1e80a8fc3 i18n candidate(fr): ai-sdk-math-tool via openrouter/qwen/qwen3.6-plus
- 0c53bef68999112665e22e93cc4b978d76b5d3be i18n candidate(fr): ai-sdk-math-tool via openrouter/deepseek/deepseek-v4-flash
- 7c27cd5b377ca71613fba4cb5e33aeb8c970d7ae i18n candidate(fr): ai-sdk-math-tool via openrouter/minimax/minimax-m2.7
- ce5f6670641ac4897d3537662cdf8694d9a45ffe i18n candidate(fr): ai-sdk-math-tool via openrouter/openai/gpt-oss-120b:nitro
- fa4b5505bb3ac642e73c028c68d1b280a8a083ca i18n candidate(fr): ai-sdk-math-tool via openrouter/qwen/qwen3-32b:nitro
