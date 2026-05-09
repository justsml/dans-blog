# Judge: ru translation for stop-hardcoding-your-prompts

**Verdict: AGREE** with the selected translation (working tree based on `218e86c7` with enriched frontmatter).

## Candidate Analysis

### `218e86c7` — openrouter/google/gemini-3-flash-preview (selected base)
- **Quality: Excellent.** Natural, idiomatic Russian throughout. All code blocks properly localized to Russian (prompt strings, comments, system messages). Terminology choices are sound: "зашивать промпты в код", "рантайме", "компонуемые секции", "интерполяции строк".
- **Missing frontmatter** on its own: no `date`, `category`, `tags`. These were added in the working tree (uncommitted delta) — correct enrichment.

### `a5f3c8a6` — openrouter/google/gemini-3.1-flash-lite-preview (REJECT)
- **CRITICAL: Visibility breakage.** Adds `draft: true`, `unlisted: true`, `hidden: true`, `publish: false` — would hide the post entirely.
- **CRITICAL: Wrong asset paths.** `social_image: ../desktop-social.webp`, `cover_full_width: ../wide.webp` etc. — these files do not exist in the `ru/` directory; `../` at this nesting resolves incorrectly.
- **REGRESSION: Code blocks in English.** Prompt template strings reverted to English (e.g., `You are a support agent for ${companyName}`, `Tone: formal and thorough`, `Rules: - Only discuss`).
- **Russian prose regressions.** Several passages are less natural than the Gemini 3 Flash base: "правку строки где-то в коде" (awkward), "обращайтесь с ними как с кодом" (formal/instructional tone mismatch).

### `1d0fdd23` — openrouter/qwen/qwen3.5-flash-02-23 (REJECT)
- **Inherits all visibility and asset-path breakage** from the `a5f3c8a6` base it was applied on top of.
- **Calque/unnatural Russian.** "кодобазе" (germanic calque), "биллинг-команду", "несёт нагрузку и невидимо" (incoherent), "композите мелкие части" (non-idiomatic verb choice), "это и есть точка" (literal "that's the point").
- **Style drift.** Title "Перестаньте прятать промпты в коде" loses the "hardcoding" metaphor; "промпт-паттерны, которые переживут продакшн" is awkward.

## Recommendation

**Accept the working tree as-is** (Gemini 3 Flash translation + date/category/tags frontmatter). The two later candidates both introduce unacceptable regressions: broken visibility, wrong asset paths, English in code blocks, and/or degraded Russian quality. No escalation needed.
