# I18n Judge Report: rag-pipeline-failures (ru)

**Date**: 2026-05-09
**Judge**: openrouter/google/gemini-3-flash-preview (via Opencode)

## Candidates
1. `755f444bb830dc7cf5fe418c60c9475018be244e` - **Qwen 3.6 Plus**
2. `cabff02be7d640a903c9b11299d8e78c220716f6` - **Qwen 3.5 Flash** (Identical to 3.6 Plus in content)
3. `8efd36942dbd6be11b45ecbd74fba2af6589fb61` - **DeepSeek V4 Flash**

## Decision: Qwen 3.6 Plus (`755f444`)

### Reasoning
- **Technical Accuracy**: Excellent. Correctly uses terms like "ретривал", "эмбеддинг", "чанк", "фингерпринтинг".
- **Natural Language & Tone**: Captures Dan's direct, slightly cynical, and engineering-focused voice better than DeepSeek. DeepSeek felt slightly more "generic translator" (e.g., using "дробления" for chunking instead of the more common "чанкування/разбиение на чанки" or just "чанкование").
- **MDX Preservation**: Perfect. Correctly updated relative image paths to `../` and preserved all code blocks and components.
- **Terminology**: Qwen 3.6 Plus chose "протухают" for stale embeddings, which fits Dan's style perfectly.

### Polishing Notes
- No significant polishing required beyond verifying the relative asset paths, which Qwen already handled.
- DeepSeek used "проде" which is good, but Qwen's "продакшене" is more stable for this type of technical post while maintaining a conversational flow.
