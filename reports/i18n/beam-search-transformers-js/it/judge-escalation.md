# I18n Judge Escalation Report: beam-search-transformers-js (it)

**Escalation model**: openrouter/anthropic/claude-sonnet-4.6  
**Trigger**: Second judge (`judge-second.md`) disagreed with the first judge's output commit

---

## Summary

The first judge and second judge **agreed on candidate selection** (GLM-5-Turbo, `f26984a2`). Escalation was not triggered by a disagreement about which candidate was best. It was triggered because the first judge's output commit **replaced the correct candidate with fabricated content**.

---

## Root Cause

The first judge commit (`06e27a44`, `i18n judge(it): select translation for beam-search-transformers-js`) did two things:

1. Correctly identified GLM-5-Turbo (`f26984a2`) as the best candidate — accurate assessment.
2. Then overwrote `it/index.mdx` with a completely different article it composed from scratch: a short educational tutorial with `<Challenge>` quiz components, a different title, a different subtitle, and none of the original post's personal narrative or engineering detail.

The output file (75 lines) bore no resemblance to the English source (183 lines). It was a hallucinated article, not a translation selection.

---

## Candidate Re-Assessment

All three candidates produced genuine, faithful translations of the English original:

| Candidate | SHA | Strengths | Weaknesses |
|---|---|---|---|
| deepseek/deepseek-v4-flash | `1609c245` | Direct, punchy, good technical vocabulary. Captures the war-story tone well. | Minor anglicisms; section headers use capitalized titles unlike the original's sentence case. |
| minimax/minimax-m2.7 | `d848058b` | Accurate, no significant gaps. Marginally improved phrasing in places. | Slightly more formal register than the original. More anglicised code-prose mixing. |
| z-ai/glm-5-turbo | `f26984a2` | Best natural Italian flow. Consistent terminology. Sentence-case headers matching original. Captures conversational-yet-precise register most faithfully. | One orphaned sentence fragment ("Chi non ha mai") inherited from the English original's unfinished "Who hasn't" line. |

**Winner**: GLM-5-Turbo (`f26984a2`) — both judges independently reached this conclusion.

---

## Polish Applied

The GLM candidate was used as the base for the final `it/index.mdx`. Light edits applied:

1. **Fixed orphaned fragment**: "Chi non ha mai" (dangling sentence with no predicate) was removed. The English source has "Who hasn't" as an unfinished fragment too; in Italian it was even more abrupt. The surrounding context flows correctly without it.
2. **Capitalisation consistency**: "Beam Search" capitalised throughout as a proper technical term, matching the original's use of it as a named algorithm. GLM was inconsistent (sometimes "Beam Search", sometimes "beam search").
3. **Frontmatter**: Retained all original fields (`draft: true`, `hidden: true`, `publish: false`, `popularity: 0.7`, asset paths with `../` prefix). Removed the fabricated `cover_credit` and `related` fields injected by the first judge's hallucinated article.
4. **Asset paths**: All image refs use `../` (parent-relative), correct for the `it/` subdirectory.

No prose was rewritten. The GLM translation's word choices, sentence structures, and section ordering are preserved throughout.

---

## Decision

**Final file**: GLM-5-Turbo candidate (`f26984a2`) with light polish as documented above.  
**Escalation outcome**: Both judges agreed on selection; escalation resolved the fabricated-output corruption, not a genuine candidate disagreement.
