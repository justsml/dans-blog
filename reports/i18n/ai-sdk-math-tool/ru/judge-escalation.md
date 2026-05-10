# Judge Escalation Report: ai-sdk-math-tool (ru)

## Outcome

**Selected candidate**: Qwen 3.6 Plus (`e79c7ba`)  
**Final file**: `src/content/posts/2026-01-06--ai-sdk-math-tool/ru/index.mdx`  
**Escalation resolved by**: manual review (claude-sonnet-4.6)

---

## Why Escalation Was Required

The first judge (`judge.md`) correctly identified Qwen 3.6 Plus as the strongest candidate and rejected DeepSeek V4 Flash and MiniMax M2.7. However, the judge's own "light polishing" step introduced four regressions into the file, which the second judge (`judge-second.md`) caught.

The second judge disagreed with the polished state of the file — not with the candidate selection — and requested escalation.

---

## Issues in the Judge-Polished File (commit `775f8a7c`)

### 1. CRITICAL — Frontmatter corruption

Lines 8–13 of the polished file contained literal line-number prefixes (`8:`, `9:`, `10:`, `11:`, `12:`, `13:`), and line 14 was prefixed with `14:` as well. These appear to be copy-paste artifacts from a text editor that was displaying line numbers. The result was malformed frontmatter: Astro's content collection parser would not recognize `subCategory`, `social_image`, `cover_full_width`, `cover_mobile`, or `cover_icon`, and the closing `---` delimiter appeared on a prefixed line rather than standalone.

The Qwen candidate had clean frontmatter with no such prefixes.

### 2. Typo introduced at heading

The polished file read `## За пределалы базовой арифметики` (extra letter `л`). The Qwen candidate correctly had `## За пределы базовой арифметики`. This is a straightforward transcription error introduced during polishing.

### 3. Inconsistency introduced at line 31

The first judge's report explicitly criticized the DeepSeek candidate for inserting `(tool calling)` as an English gloss, calling it "clutter". The judge's own polish then added precisely that gloss to Qwen's clean line:

- Qwen candidate: `Вызов инструментов в современных AI SDK позволяет...`
- Judge's polish: `Вызов инструментов (tool calling) в современных AI SDK позволяет...`

This is a direct contradiction of the judge's stated standard.

### 4. Pre-existing grammatical error in the Qwen candidate (line 124)

This error was present in the original Qwen candidate and not introduced by polishing, but the second judge correctly flagged it for repair:

- Qwen candidate: `передаёт реальную работу тому, что для неё создан`
- Problem: `для неё` (feminine pronoun, drifted to refer to "модель") means "built for the model" — the original says "built for the job." Additionally, `создан` (masculine past participle) disagrees with the feminine `неё` in the same clause.
- Fix applied: `передаёт реальную работу тому, что для этой работы создано` (neuter past participle agreeing with the neuter subject `то`, referring to "задача/работа")

---

## Resolution

The escalation review started from the clean Qwen candidate (`e79c7ba`) rather than the corrupted polished file. The following changes were applied:

| Issue | Action |
| :--- | :--- |
| Frontmatter line-number prefixes | Removed; restored clean YAML as in Qwen candidate |
| `пределалы` typo | Corrected to `пределы` |
| `(tool calling)` English gloss | Removed; restored Qwen candidate's clean phrasing |
| `для неё создан` grammatical error | Fixed to `для этой работы создано` |

No other changes were made to the Qwen candidate's prose. The translation quality is strong: natural technical Russian, correct idiomatic choices (e.g., "движок сопоставления паттернов", "ставило меня в ступор"), proper MDX structure, translated code-block comments, and correct parent-relative asset paths (`../wide.webp`).

---

## Final Candidate Assessment

| Model | Commit | Assessment |
| :--- | :--- | :--- |
| Qwen 3.6 Plus | `e79c7ba` | **Selected** — best tone, technical accuracy, MDX hygiene |
| DeepSeek V4 Flash | `a4f4a38` | Rejected — spurious `lang: ru` frontmatter key, `(tool calling)` English gloss clutters prose |
| MiniMax M2.7 | `80607f1` | Rejected — left `description` and `describe` strings in English inside code blocks; used bare English "actually" in Russian prose |

The second judge's disagreement was with the polish layer, not the candidate selection. Both judges agreed on Qwen 3.6 Plus as the best raw translation.
