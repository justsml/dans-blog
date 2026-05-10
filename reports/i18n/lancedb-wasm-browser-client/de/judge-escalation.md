# i18n Escalation Report: lancedb-wasm-browser-client (de)

- **Escalated by**: Second judge (`judge-second.md`)
- **Base candidate retained**: `ecf6694f3ad8276b76bdb2541021754b58fd67b7` (Qwen 3.6 Plus)
- **Resolution**: Targeted surgical fixes applied to Qwen base; no candidate accepted as-is.

## Why Escalation Was Required

The first judge (`judge.md`) selected Qwen's output on grounds of naturalness and technical prose quality, which was correct overall. However, the second judge identified a **semantic inversion** in the Transformers section so significant that it inverted the author's stated intent — a class of error that cannot be left in a published translation.

### Critical Error: Transformers Section

**Original English** (author expresses doubt about scope):
> "It's also the thing I'm least sure belongs in this PR."

**Qwen (as selected)** duplicated phrasing from the earlier Rust-artifact paragraph:
> "Es ist auch das, bei dem ich am frohesten bin, ihn in Rust statt in JavaScript gebaut zu haben."
> ("It's also the thing I'm most glad I built in Rust instead of JavaScript.")

This is not a stylistic weakness — it inverts the meaning from *doubt about scope* to *satisfaction about implementation choice*, and it repeats a sentiment already expressed three paragraphs earlier. The argument in the Transformers section became incoherent in German.

### Why No Candidate Was Accepted Clean

| Candidate | Critical error | Other issues |
| :--- | :--- | :--- |
| Qwen `ecf6694f` | Semantic inversion in Transformers section; mixed English residue (`genuinely`, `cautiously`) | Compound word error (`Konstanten listen`); stray English `"what"` |
| DeepSeek `c862f8d1` | Fixes critical error | ~15 register/vocabulary regressions (`billiger`, `Betreuer`, `Veraltung`, grammar error in "die ich merken muss synchron zu halten") |
| MiniMax `f5fe76ca` | Fixes critical error | Hard typos (`Kächste-Nachbarn`, `fronteitig`, `fein.Name`); untranslated `"reasoning about"` |

Qwen remained the best foundation. DeepSeek's fixes would have required accepting ~15 vocabulary and grammar regressions throughout the article. MiniMax introduced hard spelling errors. The correct resolution was a targeted patch of the Qwen base.

## Fixes Applied

The following five changes were applied to the Qwen base file to produce the final translation:

### 1. Transformers section — semantic inversion (critical)

**Before:**
```
Es ist auch das, bei dem ich am frohesten bin, ihn in Rust statt in JavaScript gebaut zu haben.
Es ist genuinely nützlich und bereits implementiert, ...
```

**After:**
```
Es ist auch das, bei dem ich mir am wenigsten sicher bin, ob es in diesen PR gehört.
Es ist wirklich nützlich und bereits implementiert, ...
```

This restores the author's intended meaning: uncertainty about whether the Transformers feature belongs in this PR, not satisfaction about the Rust implementation.

### 2. `"genuinely unsicher"` → `"wirklich unsicher"` (Sidecar section, line 88)

English adverb left untranslated. `"wirklich"` is the natural German equivalent in this register.

### 3. `"cautiously optimistisch"` → `"vorsichtig optimistisch"` (closing paragraph, line 124)

English adverb left untranslated. `"vorsichtig"` is the standard German equivalent.

### 4. `"parallele Konstanten listen"` → `"parallele Konstantenlisten"` (What I'd Do Differently, line 112)

Missing compound: German requires `"Konstantenlisten"` (one word) for "constant lists."

### 5. Stray English `"what"` → `"was"` (browser-safe section, line 92)

Residual English word in `"eine Einschätzung darüber, what der Browser leisten kann"` corrected to `"was"`.

## Final State

The file at `src/content/posts/2026-04-16--lancedb-wasm-browser-client/de/index.mdx` is the Qwen base with the five targeted fixes above. All other Qwen choices — `"Begleitdateien"` for sidecar, `"herkömmliche"` for traditional, `"günstig"` for cheap, compound nouns, technical term preservation — are retained unchanged.
