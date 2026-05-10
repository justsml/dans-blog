# Judge Second Review: postgres-text-search-guide (fr)

**Reviewer**: manual (second judge)
**Date**: 2026-05-09

## Candidates Reviewed

| SHA | Model | Verdict |
|-----|-------|---------|
| 04de9a7a | openrouter/qwen/qwen3.6-plus | **AGREE** |
| afb375fb | openrouter/qwen/qwen3.5-flash-02-23 | **DISAGREE** — multiple regressions |
| f0875d61 | openrouter/deepseek/deepseek-v4-flash | **DISAGREE** — SVG layout breakage |

## Analysis

### 04de9a7a (qwen3.6-plus) — AGREE

This is the correct selection. Key strengths:

- **Terminology**: Uses `recherche plein texte` consistently — this is the standard French translation for PostgreSQL full-text search. The term `recherche textuelle` (used by the other two candidates) reads as generic "text search" rather than the specific PostgreSQL feature.
- **Consistency**: Maintains `FTS` in SVG labels and code comments, matching the SQL examples. Avoids introducing `RFT` (a non-standard French abbreviation).
- **Frontmatter integrity**: Preserves `modified: 2026-05-03` and `subCategory: Databases` (controlled taxonomy).
- **SVG layout**: No changes to element positioning — the SVG diagrams render correctly.
- **Link correctness**: Keeps `/semantic-vector-search-landscape` (English slug). No `/fr/` prefix, which is correct unless a French translation of that article exists.
- **Voice**: Matches Dan's direct, technical style. No gratuitous title-casing of headings.

### afb375fb (qwen3.5-flash-02-23) — DISAGREE

Multiple regressions vs. the qwen3.6-plus candidate:

1. **Removes `modified: 2026-05-03`** from frontmatter (data loss).
2. **Changes `subCategory: Databases` to `Bases de données`** — breaks controlled taxonomy.
3. **Switches terminology** from `recherche plein texte` to `recherche textuelle` and introduces `RFT` — non-standard. The SQL code and documentation consistently refer to "full-text search" / `FTS`; introducing `RFT` creates confusion for French readers who will encounter the English term in tooling.
4. **Capitalizes all section headings** (`## Les Trois Outils`, `## Quand la Recherche Textuelle Gagne`) — unnecessary and inconsistent with the source article's casing conventions.
5. **Localizes the vector search link to `/fr/semantic-vector-search-landscape`** — incorrect unless the French translation exists.
6. **SVG label changes**: `lexical` → `lexicale`, `FTS` → `RFT` in SVG card labels without verifying text fit.
7. **Minor quality issues**: `"qui peut être sûrement faux"` misses the original meaning of `"confident but wrong"`.

### f0875d61 (deepseek-v4-flash) — DISAGREE

Builds on afb375fb and fixes some issues (restores `modified`, `subCategory: Databases`, guillemets) but introduces critical SVG layout breakage:

1. **SVG card layout corrupted**: In the "Quand la Recherche Plein Texte Gagne" section, the `stm-card` SVG elements have shifted Y-positions. Lines 88-93 show four `<text>` elements at y=562, 588, 614, 638 with the last three being additions that overflow the card box (height=186 starting at y=436). This will render broken overlapping text on the published page.
2. **SVG RRF card truncated**: Similar issue in the RRF diagram — the merge card text is split across 4 lines instead of 3, with y positions 342, 368, 394, 424 that may overflow.
3. **Abbreviation in SVG label**: `Réf. API` instead of `Référence API` — unnecessary truncation.
4. **Terminology drift**: Alternates between `recherche plein texte` and `recherche textuelle` inconsistently.
5. **Title change**: `Postgres` → `PostgreSQL` in the title — the original post uses "Postgres" consistently.
6. **Link**: Restores `/semantic-vector-search-landscape` (English) ✓ but removes the French link text variant.

## Verdict

**AGREE** with the qwen3.6-plus candidate (SHA `04de9a7a`). No changes needed to `src/content/posts/2026-05-02--postgres-text-search-guide/fr/index.mdx`.

If a final polish pass is desired, the only area worth touching is confirming the `subCategory: Databases` value matches the current controlled taxonomy in `src/content.config.ts` — but this is not a blocker.
