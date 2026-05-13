# Translation Judge Summary

- Slug: quiz-css-core-fundamentals
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
- Input tokens: 19449
- Output tokens: 385
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.010880

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.99
- Input tokens: 14881
- Output tokens: 432
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008736

### Pass 2
- Runtime seconds: 3.94
- Input tokens: 14788
- Output tokens: 462
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008780

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "Sélectionnez le UN INVALIDE ❌ `font-size` :" Replacement: "Sélectionnez l'unique `font-size` <em class=\"highlight\">INVALIDE</em> ❌ :" Reason: The original translation 'le UN INVALIDE' is grammatically awkward in French. Using 'l'unique... INVALIDE' is more natural. Note: Exact match not found in selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Comment centrer \"shit\" dans une boîte ?" Replacement: "Comment pouvez-vous centrer « shit » dans une boîte ?" Reason: Consistency with the informal but technical tone, and using standard French guillemets. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "Sélectionnez le <em class=\"highlight\">UN INVALIDE</em> ❌ `font-size` :" Replacement: "Sélectionnez l'unique `font-size` <em class=\"highlight\">INVALIDE</em> ❌ :" Reason: The original translation 'le UN INVALIDE' is grammatically awkward in French. Using 'l'unique... INVALIDE' is more natural. Note: Applied exact replacement to selected MDX.
4. Pass 2: logged medium priority suggestion. Match: "Comment pouvez-vous centrer « shit » dans une boîte ?" Replacement: "Comment pouvez-vous centrer « shit » dans une boîte ?" Reason: Ensuring consistent use of French guillemets and maintaining the informal tone of the source. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current src/content/posts/2024-11-08--quiz-css-core-fundamentals/fr/index.mdx
- f9e2d97f08d4bebae0517d54b2e79cef042a03a3 i18n candidate(fr): quiz-css-core-fundamentals via openrouter/openai/gpt-oss-120b:nitro
- 288b7515f41d0d81ae8b2a61e8192ca7e35504b2 i18n candidate(fr): quiz-css-core-fundamentals via openrouter/qwen/qwen3-32b:nitro
