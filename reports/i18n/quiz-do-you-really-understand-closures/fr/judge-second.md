# I18n Second Judge Report: fr/quiz-do-you-really-understand-closures

- **Slug**: `quiz-do-you-really-understand-closures`
- **Locale**: `fr`
- **Judged at**: 2026-05-09

## Review of Selected Translation

The initial judge (`judge.md`) selected **da2550c1** (Qwen 3.6 Plus). However, two subsequent commits amended the file on top of da2550c1:

1. **4a045423** (DeepSeek V4 Flash) — purist localization: "closures" → "fermetures", "factory functions" → "fonctions d'usine", "pattern module" → "motif de module"
2. **aa6377fd** (Qwen 3.5 Flash) — further edits: introduced anglicisms ("pretty much"), grammar errors ("le closure" for feminine "la closure"), awkward register ("étiquette du bouton"), and inconsistent terminology

The working tree (current `fr/index.mdx`) reverts these deviations and restores the stronger Qwen 3.6 Plus foundation.

## Decision

**I agree** with the working tree version (uncommitted changes on `codex/fr-closures-quiz-temp`).

## Reasoning

The working tree version correctly:

- **Uses "closures" consistently** — the industry-standard term in French developer communities. The purist "fermetures" (from 4a045423, 2/3 of aa6377fd) reads as academic and non-idiomatic for this audience.
- **Preserves natural technical anglicisms**: "factory functions", "pattern module", "codebases legacy", "dep array", "code review" — these are the actual terms French JS developers use. Translating them is both inaccurate and jarring.
- **Fixes grammar from aa6377fd**: corrects "le closure" → "la closure" (when used as French noun), proper adjective agreement.
- **Removes gratuitous English** introduced by aa6377fd: "pretty much partout ailleurs" → "à peu près partout ailleurs".
- **Restores Dan's voice**: direct, technical, allergic-to-brochure register ("retirer le plancher", "ça mord encore les gens", "Probablement effrayant en pair-programming").
- **Maintains clean MDX**: all slots, imports, tailwind classes, and `client:visible` directives preserved correctly.
- **Corrects punctuation**: uses French guillemets « » and proper spacing, reverts aa6377fd's inconsistent quote styles.

## Escalation Notes

No escalation needed. The working tree effectively implements the original judge's intent (select da2550c1, polish terminology to "closures", fix relative paths) while rejecting the regressions introduced by 4a045423 and aa6377fd. The uncommitted changes should be committed as the final `i18n final(fr)` for this post.