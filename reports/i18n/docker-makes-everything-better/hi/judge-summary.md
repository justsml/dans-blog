# Translation Judge Summary

- Slug: docker-makes-everything-better
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
- Runtime seconds: 2.70
- Input tokens: 4148
- Output tokens: 313
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003013

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.28
- Input tokens: 3577
- Output tokens: 307
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002710

### Pass 2
- Runtime seconds: 2.07
- Input tokens: 3468
- Output tokens: 223
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002403

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "# Note: using host-based, shared folders #(shared folders are not possible with the VOLUME Dockerfile cmd)" Replacement: "# नोट: होस्ट-आधारित, साझा फोल्डरों का उपयोग कर रहे हैं #(साझा फोल्डरों के साथ VOLUME Dockerfile कमांड के माध्यम से असंभव है)" Reason: The code comments in the bash block were left in English, unlike the current version which translated them for better accessibility. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "## Local data, isolated within instance" Replacement: "## स्थानीय डेटा, इंस्टेंस के भीतर अलग (isolated)" Reason: One comment in the code block was left in English while others were translated. Translating it maintains consistency. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2015-03-12--docker-makes-everything-better/hi/index.mdx
- 7d0db2652ea40c0b20a885f14878f5a9358e4d23 i18n candidate(hi): docker-makes-everything-better via openrouter/openai/gpt-oss-120b:nitro
- d4aa7630b43267ce76cad2475d21fecadc0a95a3 i18n candidate(hi): docker-makes-everything-better via openrouter/qwen/qwen3-32b:nitro
