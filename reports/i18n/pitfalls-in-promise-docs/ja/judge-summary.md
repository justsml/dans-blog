# Translation Judge Summary

- Slug: pitfalls-in-promise-docs
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: low (0.329)
- Confidence signals: 1 high and 0 medium issues; single judge
- High/medium/low issue counts: 1/0/0

## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 3.17
- Input tokens: 5611
- Output tokens: 299
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003703
- Estimated cost: $0.003703

### Round 1, Batch 2
- Runtime seconds: 2.59
- Input tokens: 3718
- Output tokens: 256
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002627
- Estimated cost: $0.002627

## Primary Judge Telemetry
- Runtime seconds: 3.32
- Input tokens: 4708
- Output tokens: 349
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003401
- Estimated cost: $0.003401

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.56
- Input tokens: 4536
- Output tokens: 359
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003345
- Estimated cost: $0.003345

### Pass 2
- Runtime seconds: 2.43
- Input tokens: 4470
- Output tokens: 334
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003237
- Estimated cost: $0.003237

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "1. [CallbackHell.com](#callbackhellcom) 1. [StrongLoop](#strongloop) 1. [RisingStack](#risingstack) 1. [Qライブラリ](#qlibrary)" Replacement: "1. [CallbackHell.com](#callbackhellcom) 1. [StrongLoop](#strongloop) 1. [RisingStack](#risingstack) 1. [Qライブラリ](#qライブラリ)" Reason: The heading link for Q Library must match the translated heading slug '#qライブラリ' to avoid a broken link. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "1. [Qライブラリ](#qlibrary)" Replacement: "1. [Qライブラリ](#qライブラリ)" Reason: The heading link for Q Library must match the translated heading slug '#qライブラリ' to avoid a broken link. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- dcf51f32b296c04eb5067308f4831d30fab9897a i18n candidate(ja): pitfalls-in-promise-docs via openrouter/openai/gpt-oss-120b:nitro
- 3b8619f05977b3b74e8157de580be17cf28640ea i18n candidate(ja): pitfalls-in-promise-docs via openrouter/qwen/qwen3-32b:nitro
- 16bfe862d1186d80babaa8859b9e4d0091c8eb13 i18n candidate(ja): pitfalls-in-promise-docs via deepseek/deepseek-v4-flash
- b83ab973bd6b687b92b9b8575ad3211709b4cb5d i18n candidate(ja): pitfalls-in-promise-docs via qwen/qwen3.6-35b-a3b
