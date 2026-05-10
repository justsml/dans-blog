# Judge-Second Report: ru translation for beam-search-transformers-js

## Critical Finding: Current `ru/index.mdx` Is Wrong Content

The existing `src/content/posts/2026-04-16--beam-search-transformers-js/ru/index.mdx` (71 lines) is **not a translation of the English original**. It is a different, short tutorial-style article about beam search concepts. The English original (183 lines) is the story of implementing beam search in Transformers.js — the `// TODO: Support beam search` saga, KV cache reordering, diverse beam search, open source latency, etc.

The current ru file must be replaced with a proper translation of the English original. All three candidates correctly translate the English original.

## Candidate Assessment

### Candidate 1: Qwen 3.6 Plus (a6ad069e1471ce469bbd7bcecd7a4bf0caae45fa)

- First-pass translation from scratch (183 lines created).
- Generally accurate. Reasonable terminology.
- Some word-choice issues: "механизмы генерации" vs "guts of text generation" (weaker than "недра").
- "Кто не знает..." at line 42 — awkward handling of the original's fragmentary "Who hasn't".

### Candidate 2: DeepSeek V4 Flash (9296e92824c2c139723dadac15e76a9c1b07f4d8)

**Recommend this one.** Refines candidate 1 with 65 insertions, 67 deletions. Best translation quality.
- "недра генерации текста" — best match for "guts of text generation".
- Most idiomatic Russian phrasing throughout.
- Correctly reverts pseudocode block to English (code blocks should stay language-agnostic).
- Proper two-level sort: "двухуровневую сортировку" (not the hybrid "двух-level" in candidate 3).
- Natural technical terminology throughout. No hybrid anglicisms.
- Preserves the original's tone: direct, slightly informal, technical.

### Candidate 3: MiniMax M2.7 (27e39ee10f7564f9c2d6372b7d667be327c2dabb)

**Reject.** Multiple issues requiring escalation:
1. **Chinese character leak**: Line contains `До追溯тал до` — the Chinese character `追溯` (zhuīsù, "trace back") was left untranslated from an LLM internal reasoning artifact. This is a critical error.
2. **Anglicisms**: "two-level сортировку" (instead of "двухуровневую"), "straightforward" used as transliteration, "инстансами" for instances, "прунинга" for pruning.
3. **Awkward constructions**: "не было до" (unidiomatic), "нердячьи" (non-standard), "вознаграждает" instead of "поощряет" for "rewards".

## Verdict

**Disagree with the first judge's selection of candidate 1.** Candidate 2 (DeepSeek V4 Flash, commit 9296e92) is the best translation. It achieves the most idiomatic Russian while preserving technical accuracy and the author's tone. Candidate 3 should be escalated due to the Chinese character error — the model leaked internal state into the output, which indicates a reliability concern for the minimax model.
