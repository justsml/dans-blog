# Translation Judge Summary

- Slug: protect-your-tokens
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 4.01
- Input tokens: 8457
- Output tokens: 502
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005735
- Estimated cost: $0.005735

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.38
- Input tokens: 5897
- Output tokens: 203
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003557
- Estimated cost: $0.003557

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: \"Protegiendo tus Tokens, Claves de API y Secretos\"" Replacement: "social_image: ../desktop-social.webp title: \"Protegiendo tus Tokens, Claves de API y Secretos\"" Reason: The candidate is missing the social_image frontmatter field present in the English source. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "subTitle: ¿Público? ¿Privado? ¿Qué? ---" Replacement: "subTitle: ¿Público? ¿Privado? ¿Qué? date: 2018-10-27 modified: 2024-07-30 tags: [tokens, api-keys, secrets, security, nodejs, json-web-tokens] category: Guides subCategory: secu..." Reason: The candidate is missing several frontmatter fields (date, modified, tags, category, subCategory, cover) and the asset paths must be updated to use ../ as per instructions. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-10-27--protect-your-tokens/es/index.mdx
- 215f9126f49f4d71a2d25be7dbcf6a5070968bc5 i18n candidate(es): protect-your-tokens via openrouter/qwen/qwen3.6-plus
- c321baa20c00cca54bc4f76a678c6adf7a347dcb i18n candidate(es): protect-your-tokens via openrouter/openai/gpt-oss-120b:nitro
- 54d13bc03bd0455dea7cbebf9af82e5f6c90769f i18n candidate(es): protect-your-tokens via openrouter/qwen/qwen3-32b:nitro
