# Translation Judge Summary

- Slug: deathmatch-git-rebase-vs-merge
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
- Runtime seconds: 2.44
- Input tokens: 10010
- Output tokens: 250
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005755

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.48
- Input tokens: 7684
- Output tokens: 462
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005228

### Pass 2
- Runtime seconds: 3.15
- Input tokens: 7783
- Output tokens: 457
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005262

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "एसक्वेश मर्ज" Replacement: "स्क्वैश मर्ज" Reason: Consistency: 'Squash' is translated as 'स्क्वैश' elsewhere in the document; 'एसक्वेश' is a phonetic misspelling. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "आकृति-विहीन कला" Replacement: "तराशी हुई कला" Reason: The English 'sculpted work of art' was translated as 'आकृति-विहीन' (shapeless/formless), which is the opposite of the intended meaning. 'तराशी हुई' correctly conveys 'sculpted'. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "अपनाहीन PR टिप्पणियाँ" Replacement: "orphan PR टिप्पणियाँ" Reason: The term 'अपनाहीन' is not a standard Hindi word for 'orphan'. 'अनाथ' or 'orphan' (transliterated) is better understood in a technical context. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "अवनत होगा" Replacement: "नुकसानदेह होगा" Reason: 'अवनत' (degraded/declined) is too formal and slightly awkward here. 'नुकसानदेह' (disadvantageous) fits the context of comparing strategies better. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/hi/index.mdx
- 3225034e4b62d3c4680a09f8acc394b729c71e41 i18n candidate(hi): deathmatch-git-rebase-vs-merge via openrouter/openai/gpt-oss-120b:nitro
- bdf59d8e8adc048dbdc3c5b7c9b4fa8c8484b494 i18n candidate(hi): deathmatch-git-rebase-vs-merge via openrouter/qwen/qwen3-32b:nitro
