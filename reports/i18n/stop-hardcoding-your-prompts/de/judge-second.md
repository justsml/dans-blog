# Second Judge: de Translation — stop-hardcoding-your-prompts

**Current file selected**: `src/content/posts/2026-05-07--stop-hardcoding-your-prompts/de/index.mdx`

## Verdict: AGREE

The current `de/index.mdx` is based on candidate **e84807f** (openrouter/google/gemini-3-flash-preview) with only minor post-processing:
- Full frontmatter fields added (date, tags, category, image paths with `../` prefix, etc.)
- `locale` default changed from `'en-US'` to `'de-DE'`

The body text is identical between e84807f and the current file. The translation is high quality — natural German that preserves Dan's direct, technical voice.

## Candidate Assessment

| SHA | Model | Verdict | Reason |
|-----|-------|---------|--------|
| `dd22f2c` | google/gemini-2.5-flash-lite | **REJECT** | Not translated — English content written into `de/` directory verbatim |
| `88c4cb1` | qwen/qwen3.5-flash-02-23 | **REJECT** | Multiple quality issues: `"konkatadiert"` (not a German word), `"shippede"` (typo), `"Ternär-Verklemmung"` (wrong meaning — "deadlock" not "hiding"), `"Zusammengeführt"` (should be "Zusammenfassung"), missing image frontmatter |
| `e84807f` | google/gemini-3-flash-preview | **ACCEPT** | Natural German throughout, consistent terminology (`Nutzer`, `Sektionen`, `Pattern`), accurate technical register, correct treatment of code blocks, proper section headers |

## Notable Choices in Selected Translation

- `"Hör auf, Prompts im Code zu vergraben"` — captures the imperative tone of "Stop Burying" better than 88c4cb1's `"Verstecke Prompts nicht im Code"`
- `"Prompt-Patterns, die den Produktionseinsatz überleben."` — natural, idiomatic subtitle
- `"Compiler-Zeit-Vertrag"` — slightly unusual for "compile-time contract" but perfectly understandable in context
- `locale: 'de-DE'` — correct adaptation for a German audience

No escalation needed. The selected translation (e84807f) is the best candidate and was properly polished with frontmatter before landing.
