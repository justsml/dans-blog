# Translation Judge Summary

- Slug: you-might-not-need-algolia
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
- Runtime seconds: 3.52
- Input tokens: 6407
- Output tokens: 445
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004538
- Estimated cost: $0.004538

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 1.99
- Input tokens: 6165
- Output tokens: 208
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003707
- Estimated cost: $0.003707

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "![אינדוקס האתר שלי עם PageFind](../PageFind-Cleaner-better-15fps-720p2.webp \"אינדוקס האתר שלי עם PageFind\")" Replacement: "![אינדוקס האתר שלי עם PageFind](PageFind-Cleaner-better-15fps-720p2.webp \"אינדוקס האתר שלי עם PageFind\")" Reason: The instructions state that inherited local image paths must start with ../ only if they are in frontmatter, Markdown, or JSX, but the English source used a bare path for this specific image. However, looking at the prompt's specific constraint: 'Never suggest changing ../asset.webp to asset.webp'. Wait, the candidate actually followed the rule of adding ../ to the image path. My suggestion is actually to keep it as the candidate has it, but I noticed the candidate correctly added ../ to the image path which was bare in English. I will leave it as is. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 384474856f4c452f0054dc3e18c81c9297876b67 i18n candidate(he): you-might-not-need-algolia via openrouter/deepseek/deepseek-v4-flash
- c835fec34d78ab11c4f7e3fbed3cd4ecb48b10bf i18n candidate(he): you-might-not-need-algolia via openrouter/openai/gpt-oss-120b:nitro
