# Translation Judge Summary

- Slug: mastering-functional-pipelines-passing-state
- Locale: hi
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
- Runtime seconds: 2.68
- Input tokens: 14604
- Output tokens: 260
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008082

### Round 1, Batch 2
- Runtime seconds: 2.07
- Input tokens: 8748
- Output tokens: 164
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004866

## Primary Judge Telemetry
- Runtime seconds: 2.92
- Input tokens: 11592
- Output tokens: 304
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006708

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.02
- Input tokens: 8930
- Output tokens: 372
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005581

### Pass 2
- Runtime seconds: 2.41
- Input tokens: 8930
- Output tokens: 233
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005164

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "`CartHelpers` दोहराए गए आर्गुमेंट `userId` को абстракт करता है।" Replacement: "`CartHelpers` दोहराए गए आर्गुमेंट `userId` को एब्स्ट्रैक्ट (abstract) करता है।" Reason: The candidate contains a word in Cyrillic script ('абстракт') which is a hallucination/error. It should be translated or transliterated into Hindi/English. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "`CartHelpers` दोहराए गए आर्गुमेंट `userId` को абстракт करता है।" Replacement: "`CartHelpers` दोहराए गए आर्गुमेंट `userId` को एब्स्ट्रैक्ट (abstract) करता है।" Reason: The candidate contains a word in Cyrillic script ('абстракт') which is a hallucination/error. It should be translated or transliterated into Hindi/English. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/hi/index.mdx
- 378a699f355906103f911bf29335ecabb2fd28ac i18n candidate(hi): mastering-functional-pipelines-passing-state via openrouter/qwen/qwen3.6-plus
- 6a66a1ec97975474d513f859c16da5a2ef09e43a i18n candidate(hi): mastering-functional-pipelines-passing-state via openrouter/openai/gpt-oss-120b:nitro
- 6514d445eb9f1cf0d73b9e0c66270058b8b7249f i18n candidate(hi): mastering-functional-pipelines-passing-state via openrouter/qwen/qwen3-32b:nitro
- f115f0af24605d419bffeaac3a814866fc77c58e i18n candidate(hi): mastering-functional-pipelines-passing-state via deepseek/deepseek-v4-flash
