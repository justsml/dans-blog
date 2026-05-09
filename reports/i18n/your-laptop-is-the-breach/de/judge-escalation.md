# Escalation Resolution

- Slug: `your-laptop-is-the-breach`
- Locale: `de`
- Escalation model: `openrouter/anthropic/claude-sonnet-4.6`
- Candidate selected: `12cef06afa9bc90b67b761c499d9573bec010de8`

## Decision

Both cheap judges agreed that `12cef06afa9bc90b67b761c499d9573bec010de8` is the best German candidate. The second judge requested escalation only because the Haiku candidate, `332ee27dc6bd8c5c77f813e58f087d785e7f8ef1`, used informal `du`/`dein` register and drifted from the formal German tone used by the site.

The escalation run inspected the candidates and confirmed the same outcome before timing out in the wrapper: accept the Gemini 3.1 Flash Lite candidate, reject the Haiku candidate for register mismatch, and apply only light polish to the selected file.

## Final Polish Applied

- Kept the formal `Sie` register throughout.
- Fixed a few idiomatic German issues in the selected candidate.
- Preserved MDX structure, links, tables, code spans, frontmatter shape, and route slug.
- No inherited local asset paths were present in this article.
