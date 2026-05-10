# Judge-Second Report: Postgres Text Searching Guide 2026 (RU)

## Agreement

**I agree** with the selection of `b801db95268489d01bea672faf3744f263f09c06` (openrouter/qwen/qwen3.6-plus) as the base translation, and with the three polishing edits applied in commit `23c34ab8`.

## Analysis

### Candidate Quality Assessment

| Candidate | Verdict | Key Issues |
|---|---|---|
| `b801db95` (qwen3.6-plus) | **Selected** | Best natural Russian, consistent terminology, clean MDX/SVG |
| `4447f9a5` (qwen3.5-flash) | Rejected | Left "sophistication" untranslated at line ~33; "токенизирует текст в леммы" conflates tokens with lemmas; rendered internal link display text to English |
| `9c20da23` (deepseek-v4-flash) | Rejected | "покрывает много ground" — English word `ground` leaked into Russian text (analogous to the Chinese character bug in b801db95); "чисто компонуются" where "комбинируются" is correct |

### Why b801db95 wins decisively

1. **Natural Russian prose.** The qwen3.6-plus translation reads fluently throughout. Technical terms are rendered with the right balance of transliteration (`стеммирует`, `эмбеддингов`) and native phrasing (`нечёткий поиск имён`, `сопоставить инструмент с формой запроса`).

2. **SVG content preserved correctly.** All `<text>` elements inside inline SVGs were translated without breaking layout or introducing off-by-one positioning issues.

3. **Internal link consistency.** The cross-reference link `[Семантический векторный поиск и гибридные стратегии](/semantic-vector-search-landscape)` retained its Russian display text. Both Flash models changed this to English, which would be inconsistent with the rest of the blog's RU content.

4. **Terminology discipline.** "ship" → `выпускают` (after judge polish), "sophistication" → `продвинутости`, "blocks" → `блоки` (not `фрагменты`), "lexemes" → `лексемы` (not `леммы`).

### Judge Polish Verified

The three edits in `23c34ab8` are all appropriate:

| Line | Before | After | Rationale |
|---|---|---|---|
| 16 | `доставляют` | `выпускают` | Better dev-speak for "ship" — "выпускают продукт" is standard |
| 24 | `схлопываются...вознаграждает...в заметных позициях` | `сводятся к одной лексеме...учитывает частоту...заметность` | More natural and precise Russian for how ts_rank works |
| 168 | `лингвистических背景` | `лингвистических групп` | **Critical bug fix** — Chinese character 背景 (bèijǐng, "background") leaked from the model. This must not appear in published content. |

### Remaining Concern (low severity, no escalation needed)

The very brief `reports/i18n/postgres-text-search-guide/ru/judge.md` omits documentation of the Chinese character bug (`背景`) found in b801db95's original output. For the record: the character appeared at line 168 in the phrase `лингвистических背景` — clearly a hallucinated character from the model's Chinese training data. The judge caught and fixed it. Future judge reports should note such leaks explicitly in their selection rationale to strengthen the evaluation trail.

## Conclusion

No escalation required. The selected translation is high quality, the polishing is correct, and the file is ready for publication.