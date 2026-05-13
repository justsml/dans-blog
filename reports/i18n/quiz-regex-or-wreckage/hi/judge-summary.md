# Translation Judge Summary

- Slug: quiz-regex-or-wreckage
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 4.56
- Input tokens: 25834
- Output tokens: 661
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.014900

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "The \\b represents a word boundary, which matches:" Replacement: "\\b एक शब्द सीमा (word boundary) को दर्शाता है, जो मेल खाता है:" Reason: The explanation for Challenge 5 was left in English in this candidate. Note: Exact match not found in selected MDX.
2. Pass 1: logged high priority suggestion. Match: "- Between a word character and a non-word character - At the start/end of the string if there's a word character So /\\bcat\\b/ matches \"cat\" only when it's a complete word, not p..." Replacement: "- एक शब्द वर्ण (word character) और गैर-शब्द वर्ण के बीच - स्ट्रिंग की शुरुआत/अंत में यदि वहां एक शब्द वर्ण है इसलिए /\\bcat\\b/ केवल \"cat\" से मेल खाता है जब वह एक पूर्ण शब्द हो, न..." Reason: The explanation for Challenge 5 was left in English in this candidate. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2024-11-15--quiz-regex-or-wreckage/hi/index.mdx
- b7f4ac05fbf6aa431f9beaea3ced9a077dbf9500 i18n candidate(hi): quiz-regex-or-wreckage via openrouter/openai/gpt-oss-120b:nitro
- 72661a4f13c7ad07c8816d5c46a297b2e3f9ba37 i18n candidate(hi): quiz-regex-or-wreckage via openrouter/qwen/qwen3-32b:nitro
