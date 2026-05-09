# i18n Judge Escalation Report: llm-evals-are-broken (de)

## Summary

**Escalation trigger**: `judge-second.md` disagreed with the current HEAD (`22f5ae987`, DeepSeek V4 Flash) and called for reverting to candidate 1 (`c1dec1081`, Qwen 3.6 Plus).

**Escalation outcome**: The second judge's verdict is upheld. The final file restores candidate 1 with minor polish applied on top.

---

## Candidates

| SHA | Model | Status |
|-----|-------|--------|
| `c1dec1081` | openrouter/qwen/qwen3.6-plus | **Selected** |
| `95f2ea1d3` | openrouter/qwen/qwen3.5-flash-02-23 | Rejected |
| `22f5ae987` | openrouter/deepseek/deepseek-v4-flash | Rejected (was HEAD) |

---

## Why the Second Judge Triggered Escalation

`judge.md` (first judge) correctly selected candidate 1 as the winner. However, the working file at the time of the second review was the DeepSeek commit (`22f5ae987`) — the sequential nature of the three commits meant each one rewrote the file. The second judge reviewed the HEAD state, confirmed it was the wrong candidate, and flagged three concrete regressions:

1. **Typo**: "Model" (line 16 of HEAD) should be "Modell"
2. **Wrong preposition**: "im Smoking **der** Benchmarks" — the genitive "der" is unidiomatic; candidate 1's "**aus** Benchmarks" (made of) is correct
3. **Word choice**: "billigste Evaluierungsmethode" carries a cheap-quality connotation; candidate 1's "günstigste" means least expensive without that undertone

Both judges independently chose the same winner. Escalation simply confirmed the working tree needed to be restored to candidate 1's content.

---

## Decision

**Winner: `c1dec1081` (Qwen 3.6 Plus)**

Candidate 1 was the superior translation from the start:

- Natural, idiomatic German that preserves Dan's direct, punchy voice ("kommt im Smoking **aus** Benchmarks daher")
- Correct technical terminology ("Modell" not "Model", "günstigste" not "billigste")
- Better structural fidelity: code block comments stay in English, headings are idiomatic German throughout, no introduced English headings
- The "die Frage von jemand anderem" phrasing (singular, possessive) correctly mirrors the original's meaning; candidate 2 weakened this to "eine andere Frage"
- `subTitle` "Dein System braucht eigene **Messwerte**" (candidate 1) is more precise than "eigene **Maße**" (DeepSeek)

---

## Polish Applied on Top of Candidate 1

Two improvements beyond the raw candidate 1 content were retained in the final file:

| Location | Raw candidate 1 | Final (polished) | Reason |
|----------|----------------|------------------|--------|
| Lines 176–177 | `/* Basislinie bestanden */ && /* Kandidat fehlgeschlagen */` (commented pseudocode) | `baselinePassed && !candidatePassed` / `!baselinePassed && candidatePassed` | The original had placeholder comments where real boolean logic should be; these are replaced with correct TypeScript |
| Line 259 | "Was würde hier „gut" aussehen?" | "Was würde „gut" hier aussehen?" | Minor word-order refinement for natural German flow |

No other changes were made. Asset paths (`../desktop-social.webp`, etc.) were already correct in candidate 1 and remain unchanged.

---

## Final State

`src/content/posts/2026-05-06--llm-evals-are-broken/de/index.mdx` contains candidate 1 (`c1dec1081`) with the two polish edits described above. The DeepSeek candidate's content has been discarded.
