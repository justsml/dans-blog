# Second Judge Report: mastra-mcp-tool-integrations (de)

## Decision

**Agree** with the selection of `ebb8e64c9dd962f91be34aeeb7986f1f6311c4a3` (DeepSeek V4 Flash).

No changes requested. The current `de/index.mdx` reflects the correct selection and requires no further edits.

## Reasoning

DeepSeek's translation outperforms both Qwen and MiniMax on every axis relevant to Dan's blog:

**Qwen (5239bc6d)** — Generally competent but weaker in flow and idiom. "Dein schöner Agent kann einfach nicht" drops the required "es", making it feel incomplete. "Kindprozesse" for child processes is technically correct but nonstandard in German tech writing. "Augen in deine tatsächlichen Geschäftssysteme" is a literal calque of "eyes into your business systems" that doesn't land naturally in German.

**MiniMax (5155ae14)** — The most aggressive candidate, but introduced several regressions: "straightforward" left untranslated (Denglish), "Per-User-Authentifizierung" instead of natural German compounds, "wrappen" and "interagieren" as unnecessary anglicisms, and translating the code block's `instructions` string (a mixed blessing that makes the example less authentic for a primarily English-codebase audience). "Haftung" alone is too thin for "liability" — "Haftungsrisiko" (DeepSeek) is the correct term.

**DeepSeek (ebb8e64c)** — Consistently idiomatic across all sections:
- "Zugang zu deinen echten Geschäftssystemen" avoids literal calques
- "fest verdrahten" for hardcoding is the established German tech idiom
- "kapseln" over "wrappen", "zusammenwirken" over "interagieren"
- "Haftungsrisiko" accurately captures "liability"
- Code comments translated to German without over-reaching into the `instructions` string
- Image path `../desktop-social.webp` is correct for the `de/` subdirectory
- Staccato rhythm in the traditional-solution paragraph matches the original's voice

The current translation is ready to publish without further polishing.