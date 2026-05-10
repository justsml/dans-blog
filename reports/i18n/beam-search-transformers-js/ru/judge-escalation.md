# Escalation Report: ru translation for beam-search-transformers-js

**Escalation model**: openrouter/anthropic/claude-sonnet-4.6  
**Trigger**: Disagreement between judge-1 (Qwen/a6ad069) and judge-2 (DeepSeek/9296e92)  
**Decision**: **DeepSeek V4 Flash (9296e92)**, with light polishing applied

---

## Why Escalation Was Necessary

The first judge selected Qwen 3.6 Plus (a6ad069). The second judge disagreed and recommended DeepSeek V4 Flash (9296e92), citing stronger idiomaticity and a critical disqualifying defect in MiniMax (Chinese character leak). The second judge also flagged that the existing `ru/index.mdx` was entirely wrong content — a generic beam-search tutorial rather than a translation of the English post.

Both disagreements required human-level assessment against the English source.

---

## Escalation Analysis

### The existing file problem

Confirmed: the pre-existing `ru/index.mdx` (71 lines) was a different article — a short tutorial with `<Challenge>` quiz components and `<CodeTabs>` unrelated to the English post. All three candidates correctly replaced it with a full translation of the 183-line English original. The second judge's finding is accurate.

### Candidate 1 (Qwen, a6ad069) — Not selected

Technically acceptable but weaker on two key points:

- **subTitle**: "механизмы генерации текста" translates "guts of text generation" as "mechanisms of text generation". The English word "guts" is visceral and informal — it is the entire register of the subtitle. "Механизмы" is clinical and wrong in tone. DeepSeek's "недра генерации текста" ("depths/innards of text generation") preserves the register.
- **Footnote 2**: "Они просто vibes" — English loan word used without inflection. Reads as a code-switch artifact rather than a stylistic choice.
- **CW note phrasing**: Slightly more stiff than the original's joke structure.

### Candidate 2 (DeepSeek, 9296e92) — Selected

- **subTitle**: "недра генерации текста" — best available Russian rendering of "guts". Visceral, slightly informal, technically plausible.
- **CW note**: "кончай со своими probs, Max" — captures the joke's structure more faithfully.
- **Body prose**: More idiomatic throughout. "Проследил до" (traced back to), "не то прошлое" (the wrong past), "гиковской радостью" (nerdy joy) — all natural.
- **Footnote 2**: "Они просто на вибрациях" — Russian rendering of "They're just vibes" that reads naturally as a calque while preserving the throwaway tone.
- **Code blocks**: Pseudocode section (`for each step...`) correctly left in English, matching the original's intent. Qwen also did this, but DeepSeek is cleaner throughout.
- **Two-level sort**: "двухуровневую сортировку" — correct in both candidates; no advantage either way.

### Candidate 3 (MiniMax, 27e39ee) — Disqualified

The second judge's disqualification stands. The Chinese character `追溯` embedded in a Russian sentence (`До追溯тал до`) is a model hallucination leak from internal reasoning — not a formatting artifact. This is a reliability failure, not an editing fix. Reject.

---

## Polishing Applied to DeepSeek Base

Minor changes from the DeepSeek candidate (9296e92) to the final file:

1. **CW note**: Tightened punctuation: "кончай со своими probs, Max" → kept as-is; removed a stray em-dash variant for consistency.
2. **Footnote 2**: Kept "Они просто на вибрациях" unchanged — best available.
3. **Section heading "Самая противная ошибка"**: Kept (matches the informal register of "Most Annoying Bug").
4. **Asset paths**: Verified all four image paths use `../` prefix. Correct in DeepSeek candidate; preserved.
5. **Frontmatter**: Matched English original exactly (draft/hidden/publish flags, tags array format, subCategory field).
6. **No structural changes**: All MDX structure, props, code blocks, footnotes, and URLs preserved identically.

---

## Final Verdict

**Selected**: DeepSeek V4 Flash (9296e92824c2c139723dadac15e76a9c1b07f4d8)  
**Reason**: Superior idiomaticity, strongest rendering of the title's register, correct code block language handling, no hybrid anglicisms. The second judge's assessment is accurate on every enumerated point.  
**MiniMax status**: Disqualified (Chinese character leak — model internal state contaminated the output).  
**First judge disagreement explanation**: The first judge assessed Qwen as having "natural technical terminology" but did not compare the subTitle against the English source closely. The word "guts" is a deliberate register choice by the author; "механизмы" loses it entirely.
