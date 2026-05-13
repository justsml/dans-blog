# Translation Judge Summary

- Slug: pitfalls-in-promise-docs
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
- Runtime seconds: 4.01
- Input tokens: 5713
- Output tokens: 485
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004312

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 1.99
- Input tokens: 4268
- Output tokens: 202
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002740

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "functional river" Replacement: "functional-programming" Reason: The tag was incorrectly translated/hallucinated as 'functional river' instead of 'functional-programming'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "cover: craig-whitehead-433328-unsplash.webp" Replacement: "cover: ../craig-whitehead-433328-unsplash.webp" Reason: Relative paths for images in subdirectories must point to the parent directory (../) to match the English structure and ensure images load. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "cover_mobile: w300_craig-whitehead-433328-unsplash.webp" Replacement: "cover_mobile: ../w300_craig-whitehead-433328-unsplash.webp" Reason: Relative paths for images in subdirectories must point to the parent directory (../). Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "cover_icon: icon_craig-whitehead-433328-unsplash.webp" Replacement: "cover_icon: ../icon_craig-whitehead-433328-unsplash.webp" Reason: Relative paths for images in subdirectories must point to the parent directory (../). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2017-05-10--pitfalls-in-promise-docs/hi/index.mdx
- 2ad5773e0b22bfacdd39bc0c22e6497c11764488 i18n candidate(hi): pitfalls-in-promise-docs via openrouter/qwen/qwen3.6-plus
- 3579bc38d83915a46fdff35d23ad2ad04059a361 i18n candidate(hi): pitfalls-in-promise-docs via openrouter/openai/gpt-oss-120b:nitro
- a16b31bb4f60768d78213979396c7967fd38f041 i18n candidate(hi): pitfalls-in-promise-docs via openrouter/qwen/qwen3-32b:nitro
