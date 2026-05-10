# Judge-Second Report: ai-sdk-math-tool (ru)

## Decision: DISAGREE — Escalation required

The first judge selected Qwen 3.6 Plus (`e79c7ba`) and applied "light polishing" in commit `775f8a7c`. The polishing introduced **critical frontmatter corruption** and **at least one typo** that was not present in the Qwen candidate. The selection should be reverted to the unmodified Qwen candidate, with additional fixes for a pre-existing mistranslation.

---

## Issues Found

### CRITICAL: Frontmatter Corruption (introduced by judge, commit `775f8a7c`)

The judge's polish inserted literal line-number prefixes into the frontmatter. Lines 8–13 of the current `ru/index.mdx` read:

```
8: subCategory: Engineering
9: social_image: desktop-social.webp
10: cover_full_width: ../wide.webp
11: cover_mobile: ../square.webp
12: cover_icon: ../square.webp
13: ---
```

The Qwen candidate had clean frontmatter:

```
subCategory: Engineering
social_image: desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
```

These `8:`, `9:`, etc. prefixes are copy-paste artifacts (likely from a text editor showing line numbers). **This will break Astro's content collection parsing** — the `subCategory`, `social_image`, `cover_full_width`, `cover_mobile`, and `cover_icon` fields will not be recognized, and `---` is on line 13 instead of standalone. The file will likely fail to build.

### Typo on Line 108 (introduced by judge, commit `775f8a7c`)

Current: `## За пределалы базовой арифметики`
Qwen candidate: `## За пределы базовой арифметики`

"пределалы" is a typo for "пределы" (or "пределами", depending on desired case). The Qwen candidate was correct.

### Judging Inconsistency on Line 31

The first judge's report criticized DeepSeek for adding `(tool calling)` as an English gloss, calling it "clutter". Yet the judge's own polish added `(tool calling)` to Qwen's clean line:

Qwen candidate: `Вызов инструментов в современных AI SDK позволяет...`
Judge's version: `Вызов инструментов (tool calling) в современных AI SDK позволяет...`

### Pre-existing Issue: Line 124 Mistranslation (present in Qwen candidate)

Original: `hand off the actual work to something built for the job`
Current: `передаёт реальную работу тому, что для неё создан`

Problems:
- `для неё` (feminine, referring to "модель") means "built for the model" — the original says "built for the job."
- `создан` (masculine) disagrees with `неё` (feminine) within the same clause.
- Should be: `создано для этой работы/задачи`

---

## Recommendation

1. **Revert the frontmatter** to the Qwen candidate's clean version (remove `8:`–`13:` prefixes).
2. **Revert line 108** to the Qwen candidate's `За пределы базовой арифметики`.
3. **Remove `(tool calling)`** from line 31 for consistency with the judge's own stated standard.
4. **Fix line 124**: change `для неё создан` to `для этой работы создано` (neuter, referring to the job/task).
5. **No changes needed to the Qwen candidate's prose**, which is otherwise strong.

The Qwen 3.6 Plus model produced the best raw translation. The errors are in the judge's "polish" layer, not in the candidate itself.
