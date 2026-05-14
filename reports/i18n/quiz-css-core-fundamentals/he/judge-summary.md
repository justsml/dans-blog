# Translation Judge Summary

- Slug: quiz-css-core-fundamentals
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 4.09
- Input tokens: 15447
- Output tokens: 362
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008809
- Estimated cost: $0.008809

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.58
- Input tokens: 15196
- Output tokens: 508
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009122
- Estimated cost: $0.009122

### Pass 2
- Runtime seconds: 3.35
- Input tokens: 15207
- Output tokens: 508
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009128
- Estimated cost: $0.009128

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "האם תוכל לזהות את היחיד קוד הקס ✅ תקף?" Replacement: "האם תוכל לזהות את קוד ההקס התקף היחיד 👍?" Reason: The original translation had awkward word order ('the only hex code valid') and missed the thumbs up emoji from the source. Note: Exact match not found in selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "בוררים: יסודות" Replacement: "סלקטורים: יסודות" Reason: Consistency: The candidate uses 'סלקטורים' in some places and 'בוררים' in others. 'סלקטורים' is more common in technical Hebrew discourse. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "האם תוכל לזהות את <em class=\"highlight\">היחיד</em> קוד הקס ✅ תקף?" Replacement: "האם תוכל לזהות את קוד ההקס <em class=\"highlight\">היחיד</em> התקף 👍?" Reason: The original translation had awkward word order ('the only hex code valid') and used the wrong emoji (check mark instead of thumbs up) compared to the source. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "בוררים: יסודות" Replacement: "סלקטורים: יסודות" Reason: Consistency: The candidate uses 'סלקטורים' in most places but switches to 'בוררים' in index 5. 'סלקטורים' is the standard transliteration used elsewhere in the document. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied medium priority suggestion. Match: "בורר: ספציפיות" Replacement: "סלקטור: ספציפיות" Reason: Consistency: Using 'סלקטור' instead of 'בורר' to match the terminology used in other headings. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- b2436bf3f1f0443dfa650893edd1886715e6ff1d i18n candidate(he): quiz-css-core-fundamentals via openrouter/deepseek/deepseek-v4-flash
- a69257863cfc1c920ed45daee2291b62764ce49f i18n candidate(he): quiz-css-core-fundamentals via openrouter/openai/gpt-oss-120b:nitro
