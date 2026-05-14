# Translation Judge Summary

- Slug: visualizing-promises
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
- Runtime seconds: 3.76
- Input tokens: 5123
- Output tokens: 397
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003753
- Estimated cost: $0.003753

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.67
- Input tokens: 5324
- Output tokens: 371
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003775
- Estimated cost: $0.003775

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "![ציר זמן המציג השהייה של 1000 ואז ריצת console.log לאחר שנייה אחת](../N_1000ms_log.webp)" Replacement: "![ציר זמן המציג השהייה של 1000 ואז ריצת console.log לאחר שנייה אחת](N_1000ms_log.webp)" Reason: The instruction to use ../ for assets only applies if the locale file is deeper than the English file. However, in this project structure, the locale file is in a subfolder (he/), so the relative path to the image (which is in the same folder as the English index.md) must be ../image.webp. Wait, looking at the prompt: 'Locale files live one folder deeper than English... Any inherited local image... must start with ../'. The candidate correctly followed this. My suggestion was wrong based on the prompt's specific constraint. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "![ציר זמן המציג השהייה של 1000 ואז ריצת console.log לאחר שנייה אחת](N_1000ms_log.webp)" Replacement: "![ציר זמן המציג השהייה של 1000 ואז ריצת console.log לאחר שנייה אחת](../N_1000ms_log.webp)" Reason: The first image path is missing the '../' prefix required for locale files located in subdirectories (he/) to correctly reference assets in the parent directory. Note: Exact match not found in selected MDX.

## Candidates
- current not present
- f7223b26e88e8d01191aead7db3d4ca30ed69aaf i18n candidate(he): visualizing-promises via openrouter/deepseek/deepseek-v4-flash
- b360839bd73f5ac27b2d81594c3732eb4dd42fbc i18n candidate(he): visualizing-promises via openrouter/openai/gpt-oss-120b:nitro
