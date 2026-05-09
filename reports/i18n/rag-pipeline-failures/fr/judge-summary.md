# Translation Judge Summary

- Slug: rag-pipeline-failures
- Locale: fr
- Primary judge attempts:
  - openrouter/google/gemini-3-flash-preview: provider returned invalid_request before writing a usable primary report.
  - openrouter/google/gemini-2.5-flash-lite: inspected all three candidates and accepted the DeepSeek V4 Flash candidate as the safest base with light polish.
- Second judge model: openrouter/deepseek/deepseek-v4-flash
- Second judge result: candidate 3 introduced untranslated English and word-choice regressions; candidate 2 is the safest base, or candidate 3 must be corrected.
- Escalation judge model: not run
- Final decision: use the DeepSeek V4 Flash candidate as the base, keep the simpler subtitle from Qwen 3.5 Flash, preserve repository taxonomy (`tags` and `category` values), and apply the second judge's concrete fixes.

## Candidates

- a3b78af89850c71d749ed24d5dc15c4b7c1261d4 i18n candidate(fr): rag-pipeline-failures via openrouter/qwen/qwen3.6-plus
- 4256c7fafdeec9d5519c7566c993f4aa11479b17 i18n candidate(fr): rag-pipeline-failures via openrouter/deepseek/deepseek-v4-flash
- d867130fbfc17c942670c2157db495791149763e i18n candidate(fr): rag-pipeline-failures via openrouter/qwen/qwen3.5-flash-02-23

## Final Corrections

- Restored controlled taxonomy to `tags: [ai, rag, vector-search, llm, production, embeddings, architecture]` and `category: AI`.
- Replaced untranslated English fragments: `struggle avec`, `connecté back à`.
- Fixed wrong/awkward French: `rencontre cela finement`, `modèle de croisé`, `reclasse`, `volez à l'aveugle`, and agreement issues.
- Preserved draft/private visibility from the English source.
