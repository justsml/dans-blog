# Translation Judge Summary

- Slug: just-add-more-engineers-fallacy
- Locale: ar
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
- Input tokens: 9710
- Output tokens: 327
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005836
- Estimated cost: $0.005836

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.27
- Input tokens: 9287
- Output tokens: 424
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005915
- Estimated cost: $0.005915

### Pass 2
- Runtime seconds: 2.96
- Input tokens: 9289
- Output tokens: 440
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005965
- Estimated cost: $0.005965

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "يومئ نائب الرئيس بالموافقة. يحدّث مدير المنتج الجدول الزمني." Replacement: "يومئ نائب الرئيس بالموافقة، ويحدّث مدير المنتج الجدول الزمني." Reason: Improved flow in Arabic by using a conjunction instead of short, choppy sentences. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "في كتاب *هندسة الفرق*" Replacement: "في كتاب *Team Topologies*" Reason: The book title is better left in English or with the English title in parentheses as it is a specific technical methodology title, though the candidate's translation is acceptable, consistency with the 'Further Reading' section is better. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "يومئ نائب الرئيس بالموافقة، ويحدّث مدير المنتج الجدول الزمني. يشعر الجميع بالإنتاجية." Replacement: "يومئ نائب الرئيس بالموافقة، ويحدّث مدير المنتج الجدول الزمني، ويشعر الجميع بالإنتاجية." Reason: Arabic prose flows better with conjunctions (waw al-atf) rather than short, isolated sentences which can feel choppy. Note: Exact match not found in selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "في كتاب *ملهم*" Replacement: "في كتاب *Inspired*" Reason: Technical book titles are generally more recognizable in their original English form within the Arabic tech community, or should at least be consistent with the English titles used in the 'Further Reading' section. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- b321c950a728ce606ae193f59afb9a982ae7a5fa i18n candidate(ar): just-add-more-engineers-fallacy via openrouter/deepseek/deepseek-v4-flash
- ba92d3237c982f6c8cb52da41a6124810a0a086f i18n candidate(ar): just-add-more-engineers-fallacy via openrouter/openai/gpt-oss-120b:nitro
