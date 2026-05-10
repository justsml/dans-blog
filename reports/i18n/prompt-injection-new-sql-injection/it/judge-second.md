# I18n Judge-Second Report: Prompt Injection Is SQL Injection for Agents (it)

## Decision

**AGREE** with the first judge. DeepSeek V4 Flash (`e9c79f18b7ec4d0368c88558d46ed58bde4a80f7`) is the correct selection.

## Rationale

The DeepSeek candidate produces the best balance of accuracy, naturalness, and voice preservation across all three candidates.

### DeepSeek V4 Flash (`e9c79f18`)

Strengths:
- Natural, idiomatic Italian with consistent register (second-person singular "tu" throughout, matching Dan's direct English voice)
- Correct technical terminology: "chiamate di funzione" (not the anglicism "function call"), "iniezione multimodale", "cache di autorizzazione con ambito limitato"
- Translates code-block string literals and comments (the Qwen base left English comments intact)
- "spedito" for "ship it" captures the developer slang better than Qwen's "si shipa" (unnatural anglicism) or Gemini's "si va in produzione" (too literal)
- "testo di policy" correctly translates "policy text" — Qwen's "testo politico" is a mistranslation
- "See also" link text properly uses the Italian article title
- Frontmatter fully preserved

### Qwen 3.6 Plus (`7abbeca0`)

Issues disqualifying it vs. DeepSeek:
- "si shipa" — unnatural anglicism
- "testo politico" — mistranslates "policy text" as "political text"
- "Loggate tutto" — unnatural anglicism for "log everything"
- Inconsistent register (alternates between "tu" and "voi")
- Code comments left in English
- "Dirottamento del contesto" — reasonable but DeepSeek's "Hijacking del contesto" is more standard in Italian security writing

### Gemini 3 Flash Preview (`16e2228f`)

**Significant issues requiring escalation if this were selected:**

1. **Frontmatter truncation**: All fields except `title` and `subTitle` were dropped — `date`, `modified`, `tags`, `category`, `subCategory`, `draft`, `unlisted`, `hidden`, `publish`, `popularity`, and all four `social_image`/`cover_*` paths are missing. This would break draft status, image rendering, and taxonomy.
2. **Wrong grammatical gender**: "Un SQL injection" and "Un prompt injection" — should be "Una SQL injection" and "Il prompt injection"
3. **"Un sviluppatore"** — should be "Uno sviluppatore"
4. **"Si scotteranno"** for "will get hurt" — poetic but odd in context
5. **"Procedure memorizzate"** for "stored procedures" — not the standard Italian technical term (Italian developers use "stored procedure")
6. **Untranslated "See also" link text**: Left as "Production AI is Terrifying (And How to Fix It)" in English
7. **"È l'equivalent di"** — should be "È l'equivalente di"

## Conclusion

DeepSeek V4 Flash (`e9c79f18`) is the correct winner. The current `it/index.mdx` reflects its output faithfully. No changes or reversion needed.