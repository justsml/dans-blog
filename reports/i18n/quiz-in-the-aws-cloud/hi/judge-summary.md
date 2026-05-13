# Translation Judge Summary

- Slug: quiz-in-the-aws-cloud
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
- Runtime seconds: 3.52
- Input tokens: 39767
- Output tokens: 381
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.021027

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.76
- Input tokens: 29789
- Output tokens: 273
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.015713

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "Dive deep into AWS Storage Services! This quiz will test your knowledge of S3, DynamoDB, Aurora, RDS, ElastiCache, and more. From best practices to tricky gotchas, we'll explore..." Replacement: "AWS स्टोरेज सेवाओं की गहराई में उतरें! यह क्विज़ S3, DynamoDB, Aurora, RDS, ElastiCache और बहुत कुछ के बारे में आपके ज्ञान का परीक्षण करेगा। सर्वोत्तम प्रथाओं से लेकर पेचीदा बार..." Reason: The candidate left the introductory paragraph in English. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-12-28--quiz-in-the-aws-cloud/hi/index.mdx
- 104995240d48ac83885a804a2e3125a751fe7f63 i18n candidate(hi): quiz-in-the-aws-cloud via openrouter/openai/gpt-oss-120b:nitro
- 93c7db574f3a7474e64ff97eefdd9ba0931fc5bd i18n candidate(hi): quiz-in-the-aws-cloud via openrouter/qwen/qwen3-32b:nitro
