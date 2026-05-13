# Translation Judge Summary

- Slug: quiz-regex-or-wreckage
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
- Runtime seconds: 3.37
- Input tokens: 25805
- Output tokens: 327
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.013884

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.30
- Input tokens: 19589
- Output tokens: 396
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.010982

### Pass 2
- Runtime seconds: 4.67
- Input tokens: 19555
- Output tokens: 721
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011940

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "Comment ças'est passé ?" Replacement: "Comment ça s'est passé ?" Reason: Missing space in the heading. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Allez à [ma salle](../challenges/)" Replacement: "Allez à [ma salle](/challenges/)" Reason: The link path should be absolute or match the English structure; the candidate added an extra '../' which might break the link depending on the routing. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "Comment ça s'est passé ?" Replacement: "Comment ça s'est passé ? 🧐" Reason: Restoring the emoji from the original heading for stylistic consistency. Note: Exact match not found in selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "Allez à [ma salle](../challenges/)" Replacement: "Allez à [ma salle](/challenges/)" Reason: The link path should be absolute to match the English source and ensure it works across different URL depths. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-15--quiz-regex-or-wreckage/fr/index.mdx
- 974c80e330df1cfc613f00e6f2db274eaa5dc7db i18n candidate(fr): quiz-regex-or-wreckage via openrouter/openai/gpt-oss-120b:nitro
- 9482117e1443fcb607d22e47f89a956dabed066c i18n candidate(fr): quiz-regex-or-wreckage via openrouter/qwen/qwen3-32b:nitro
