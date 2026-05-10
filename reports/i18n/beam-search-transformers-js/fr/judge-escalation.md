# Escalation Decision: beam-search-transformers-js (fr)

**Escalation model**: claude-sonnet-4.6 (openrouter/anthropic/claude-sonnet-4.6)
**Reason for escalation**: Second judge disagreed with first judge's selection (`32b6f8fb`, Gemini 3 Flash Preview) on two blocking issues.

---

## Summary

The first judge selected `32b6f8fb` (Gemini 3 Flash Preview) as the winner. The second judge disagreed and could not approve without corrections, citing two hard blockers. This escalation resolves the disagreement with a composite approach: Gemini's prose body combined with DeepSeek's complete frontmatter, plus corrections for the gender error and orphaned-line fidelity.

---

## Candidates Reviewed

| SHA | Model | Status |
|---|---|---|
| `10b16fde` | openrouter/deepseek/deepseek-v4-flash | Candidate |
| `c8401eed` | openrouter/z-ai/glm-5-turbo | Candidate |
| `32b6f8fb` | openrouter/google/gemini-3-flash-preview | First judge winner; second judge rejected |

---

## Blocker Resolution

### Blocker 1: Frontmatter stripped by Gemini

`32b6f8fb` dropped all frontmatter except `title` and `subTitle`. The following fields were missing entirely: `date`, `modified`, `tags`, `category`, `subCategory`, `draft`, `hidden`, `publish`, `popularity`, `social_image`, `cover_full_width`, `cover_mobile`, `cover_icon`.

**Resolution**: Frontmatter restored from `10b16fde` (DeepSeek), which carried the complete set. Asset paths adjusted from `../` prefix (correct for locale subdirectory) as DeepSeek had them. English source used to verify field values.

### Blocker 2: Incorrect grammatical gender for "beam search"

`32b6f8fb` used feminine agreement throughout: "la Beam Search", "Une Beam Search correcte", "Lorsque la Beam Search élague". In French technical writing, English loanwords default to masculine unless a clear feminine equivalent exists. "Le beam search" is the established convention — confirmed by candidates `10b16fde` (DeepSeek) and `c8401eed` (GLM), both of which used masculine correctly.

**Resolution**: All instances of feminine "la Beam Search" replaced with masculine "le beam search". Capitalization also normalized (the English original does not capitalize "beam search" as a proper noun; Gemini was inconsistent on this).

---

## Additional Polish Applied

### CW phrasing
Gemini's CW used "passer votre tour" (awkward — "skip your turn" as in a game). DeepSeek used "passez votre chemin" (idiomatic — "move along"). The final uses "passez peut-être votre chemin", blending Gemini's lighter "peut-être" hedge with DeepSeek's idiomatic phrasing.

### Orphaned "Qui n'a jamais" line
The English source contains an intentional orphaned fragment "Who hasn't " at line 42 — an editorial artifact preserved in the source. DeepSeek and GLM both carried "Qui n'a jamais" (DeepSeek) or similar. Gemini removed it. Since it is present in the English original, it is restored in the final as "Qui n'a jamais " to maintain fidelity.

### Hallucinated section headings (DeepSeek)
DeepSeek introduced two section headings not present in the English source: "Pourquoi le JavaScript Rend Cela Difficile" and "État de la PR". These were not in the English original and were not carried forward. Gemini's heading structure, which matched the English original more faithfully, was used as the base.

### Heading capitalization
Gemini applied French typographic convention for headings (sentence case only), which is appropriate. DeepSeek overcapitalized ("Le Bug le Plus Agaçant", "La File de Priorité"). Gemini's lowercase style preserved throughout.

---

## Composite Strategy

The final translation was built as:

1. **Frontmatter**: From `10b16fde` (DeepSeek) — complete, correct, correct asset paths
2. **Body prose**: From `32b6f8fb` (Gemini) — superior sentence rhythm, cleaner vocabulary, better-matched heading structure
3. **Gender corrections**: "le beam search" (masculine) applied throughout, replacing Gemini's "la Beam Search"
4. **Orphaned fragment**: "Qui n'a jamais " restored for source fidelity
5. **CW line**: Gemini base with "passez peut-être votre chemin" (idiomatic + hedged)

---

## Rationale for Composite Over Single Winner

Neither candidate was individually shippable:

- **Gemini** (`32b6f8fb`): Best prose, but missing all frontmatter (build-breaking) and wrong gender.
- **DeepSeek** (`10b16fde`): Complete frontmatter, correct gender, but introduces hallucinated sections and rougher prose.
- **GLM** (`c8401eed`): Complete frontmatter, correct gender, but prose quality sits between the other two and CW phrasing is weaker.

The composite preserves the genuine strengths of each without carrying forward any model's specific failure modes. This is the standard escalation path for disagreement when no single candidate is clean.

---

## Final File

`src/content/posts/2026-04-16--beam-search-transformers-js/fr/index.mdx`
