# Second Opinion: beam-search-transformers-js (fr)

## DISAGREE — Cannot Approve Without Corrections

The current selected candidate (`32b6f8fb`, Gemini 3 Flash Preview) has two hard-blocking issues that require resolution before this translation can ship.

---

## Issues Requiring Escalation

### 1. CRITICAL: Frontmatter fields dropped entirely

`32b6f8fb` stripped **all frontmatter fields** except `title` and `subTitle`:

| Missing field | Purpose |
|---|---|
| `date` | Required for post routing and display |
| `modified` | Required for freshness metadata |
| `tags` | Required for taxonomy |
| `category` | Required for category pages |
| `subCategory` | Required for sub-category grouping |
| `draft`, `hidden`, `publish` | Required for visibility model |
| `popularity` | Required for sort scoring |
| `social_image`, `cover_full_width`, `cover_mobile`, `cover_icon` | Required for hero/media rendering |

These were present in candidate 1 (`10b16fd`, DeepSeek) and candidate 2 (`c8401ee`, GLM). Gemini incorrectly dropped them. The post will fail to render or break the build without these fields.

**Fix**: Restore the frontmatter from `10b16fd` (DeepSeek) or the English source.

### 2. Gender of "Beam Search" — systematic inconsistency

`32b6f8fb` uses feminine **"la Beam Search"** throughout. In French technical writing, English loanwords like "beam search" are treated as masculine ("le beam search"). This affects every occurrence in the translation:

- Title: "Implémenter **la** Beam Search" → "Implémenter **le** Beam Search"
- "**La** Beam Search (recherche par faisceau)" → "**Le** beam search"
- "Une **Beam Search correcte**" → "Un **beam search correct**"
- "Lorsque **la** Beam Search élague" → "Lorsque **le** beam search élague"

Candidate 1 (`10b16fd`, DeepSeek) used masculine "le" — the correct choice. Candidate 2 (`c8401ee`, GLM) also used masculine. This regression was introduced by Gemini only.

**Fix**: Revert to masculine "le beam search" throughout, matching candidates 1 and 2, and standard French technical convention.

---

## Candidate Comparison

| Dimension | 1: DeepSeek (`10b16fd`) | 2: GLM (`c8401ee`) | 3: Gemini (`32b6f8fb`) |
|---|---|---|---|
| Frontmatter integrity | ✅ Complete | ✅ Complete | ❌ All dropped |
| Gender ("le beam search") | ✅ Masculine | ✅ Masculine | ❌ Feminine "la" |
| Translation completeness | ✅ 183 lines | ✅ 183-line base | ✅ 167 lines (minus frontmatter) |
| Orphaned "Qui n'a jamais" | ❌ Present | ❌ Present | ✅ Removed |
| CW translation | ✅ Natural ("passez votre chemin") | ⚠️ Different phrasing | ❌ Awkward ("passer votre tour") |
| Headings vs original | ❌ Added hallucinated sections | ⚠️ Modified | ⚠️ Lowercase style drift |
| Phrasing quality | ⚠️ Some rough edges | ✅ Improved | ✅ Solid but gender issue |

## Recommended Path

The **body** of candidate 3 (Gemini) is the strongest overall — it produces the most natural French prose, removes the orphaned "Qui n'a jamais", and has good technical vocabulary. But it cannot ship as-is due to the two blocking issues above.

The preferred approach:
1. Restore **frontmatter** from candidate 1 (DeepSeek) or the English original
2. Revert **"la Beam Search" → "le beam search"** throughout (masculine per technical French convention)
3. Apply Gemini's body text with those two corrections

Alternatively, candidate 1 (DeepSeek) would be a viable base if cleaned up (remove orphaned "Qui n'a jamais", fix CW phrasing) — but it also hallucinates non-existent section headings ("Pourquoi le JavaScript Rend Cela Difficile", "État de la PR") that don't appear in the English original.

## Summary

| Status | Finding |
|---|---|
| **Selection** | `32b6f8fb` (Gemini 3 Flash Preview) |
| **Agreement** | ❌ Disagree without corrections |
| **Blocker 1** | All frontmatter fields missing — breaks build |
| **Blocker 2** | Feminine "la Beam Search" — incorrect gender convention |
| **Resolution** | Restore frontmatter + revert to masculine "le beam search" |