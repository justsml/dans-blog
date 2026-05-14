# Translation Judge Summary

- Slug: rag-pipeline-failures
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.67
- Input tokens: 16456
- Output tokens: 244
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008960
- Estimated cost: $0.008960

## Judge Suggestions
1. Pass 1: logged medium priority suggestion. Match: "ベクターランクより遅い" Replacement: "ベクトル類似度計算より低速" Reason: 'Vector rank' is a bit of a literal translation; 'vector similarity calculation' is more standard in Japanese technical contexts. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2026-05-05--rag-pipeline-failures/ja/index.mdx
- 94c028588e4d37c6edeadcb4f6a91bfd119a76d8 i18n candidate(ja): rag-pipeline-failures via openrouter/google/gemini-3-flash-preview
- e5fcabf6ec299d63a3fa61bdb84b3e9a8590a850 i18n candidate(ja): rag-pipeline-failures via openrouter/openai/gpt-oss-120b:nitro
- bf40cc615a6d134c90d1286d1b145db4c0b15a0a i18n candidate(ja): rag-pipeline-failures via openrouter/qwen/qwen3-32b:nitro
