# I18n Judge Report: postgres-text-search-guide (de)

## Candidates
- **DeepSeek (9ca379d)**: `openrouter/deepseek/deepseek-v4-flash`
- **Qwen (28c65f2)**: `openrouter/qwen/qwen3.5-flash-02-23`
- **Gemini (aed9d64)**: `openrouter/google/gemini-3-flash-preview`

## Decision: DeepSeek (9ca379d) with light polishing

### Reasoning
- **DeepSeek** provided the most natural and direct German translation. It successfully captured Dan's direct, technical voice (e.g., using "kostspieligen Umweg" for "costly detour"). It also correctly handled the technical nuances like "Lexeme" and "Wortstamm".
- **Gemini** used "Sie"-form ("bereits in Ihrer Datenbank"), which is too formal for Dan's blog. It also used "Stammformenbildung" which is correct but slightly more clunky than "Wortstamm".
- **Qwen** used some awkward phrasing like "Rangierfunktion" for "ranking function" (which usually refers to shunting in rail transport) and "Trigramme ... Schnipsel".

### Polishing
- Replaced Gemini-style formal address if any remained.
- Ensured "Postgres" is used consistently (DeepSeek used it, Qwen used "PostgreSQL").
- Verified all asset paths are parent-relative (e.g., `../desktop-social.webp`).
- Maintained MDX component structure and SVG content perfectly.

## Final Result
DeepSeek (9ca379d) selected and polished.
