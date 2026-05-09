# Second Judge Report: postgres-fts-vs-pgvector (fr)

## Decision

**Disagree with current working tree state. Agree with judge.md that DeepSeek V4 Flash (`af5dcba3`) is the best candidate, but the working tree is not based on it.**

## Issue Requiring Escalation

### 1. Working tree is severely truncated (65% content loss)

The current working copy of `src/content/posts/2026-05-08--postgres-fts-vs-pgvector/fr/index.mdx` has been manually edited down to **138 lines** from the committed 399-line translation. All three candidate commits (DeepSeek, Gemini, Qwen) produced **complete 399-line translations** of the original post. The uncommitted working tree edits have deleted the following entire sections:

- **"When You Need Both"** — The hybrid search section with the full Reciprocal Rank Fusion SQL implementation (~45 lines)
- **"The Practical Decision Tree"** — The decision framework and "FTS vs. Semantic: The Short Version" guidance (~30 lines)
- **"If You Do Need a Dedicated Vector Store"** — The entire feature matrix with 17-vendor comparison table, sparse vectors explanation, multimodal native details, disk-based index analysis, max dimensions discussion, simplified decision guide (~130 lines)
- **"One Thing to Not Do"** — The critical warning against using vector search for exact-match problems (~8 lines)
- **pg_trgm section** — Second SQL example block (autocomplete, `word_similarity`, prefix search), decision table was removed (~30 lines)

The original English post is a comprehensive guide. Removing these sections makes the translation incomplete and omits significant practical value (the RRF hybrid query, the comparison matrix, the decision tree).

**Recommendation**: Restore the full 399-line translation from commit `af5dcba3` (DeepSeek V4 Flash).

### 2. DeepSeek candidate is the best base, but needs polishing

The DeepSeek candidate (`af5dcba3`) is the strongest starting point. Issues that should be fixed when restoring:

| Issue | Location | Fix |
|-------|----------|-----|
| `"ils ont déjà PostgreSQL"` (line 24) | Gender disagreement — `"équipes"` is feminine | Change to `"elles ont déjà PostgreSQL"` (already correct in commit `acfb849c`) |
| Missing `cover_icon: ../square.webp` | Frontmatter | Add it (present in commits `cbcc5c43` and `acfb849c`) |
| `"prominente"` (line 34) | Missing accent | Change to `"proéminente"` (correct in `cbcc5c43` and `acfb849c`) |
| `"Vous pouvez embedded"` (line 91) | Unconjugated English verb | Change to `"Vous pouvez intégrer"` or `"Vous pouvez embedder"` |
| Missing `(stemming)` on first use of `"racinise"` (line 34) | Reader clarity | Add `(stemming)` in parentheses (Qwen added it in `acfb849c` but changed the term to `"radicalise"`) |

### 3. Candidate quality comparison

| Candidate | SHA | Lines | Quality | Issues |
|-----------|-----|-------|---------|--------|
| **DeepSeek V4 Flash** | `af5dcba3` | 399 | Best | Minor: gender, accent, unconjugated verb (see above) |
| Gemini 2.5 Flash-lite | `cbcc5c43` | 399 | Weakest | Literalisms: `"maintenir honnêtes"` for "keep honest"; mixed register |
| Qwen 3.6 Plus | `acfb849c` | 399 | Good/fixes some issues but introduces others | `"gagnent leur salaire"` (too literal for "earn their keep"); inconsistent `"full-text"` / `"plein texte"`; anglicisms |

## Summary

**Escalation required**: The working tree has an uncommitted truncation that removes ~65% of the translated content. Restore the full translation from `af5dcba3` after applying the minor fixes listed above. Do not merge the truncated working copy.
