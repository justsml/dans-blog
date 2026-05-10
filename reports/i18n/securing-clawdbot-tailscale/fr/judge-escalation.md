# Escalation Report: securing-clawdbot-tailscale (fr)

## Summary

**Selected candidate**: DeepSeek-V4-Flash (`29188becc50beead58b4bf3c0f0e12c09c195be6`)
**Final file**: `src/content/posts/2026-01-26--securing-clawdbot-tailscale/fr/index.mdx`
**Escalation reason**: Second judge disagreed with the first judge's apparent selection and flagged that MiniMax (`2d5d2f45`) — which became HEAD after the third candidate commit — contains multiple critical errors.

---

## What Caused the Disagreement

The first judge (`judge.md`) selected DeepSeek-V4-Flash as the best candidate and described making refinements. However, the first judge commit was followed by the MiniMax candidate commit (`2d5d2f455ad37f000b50bc45e9a68e72d79b2a1e`), which landed on top as HEAD. The second judge (`judge-second.md`) reviewed the working file (MiniMax, as HEAD) and flagged it as a regression from the DeepSeek candidate the first judge had chosen.

Both judges are in agreement on the underlying substance: **DeepSeek is the correct base**. The apparent "disagreement" was a sequencing artifact — the judge reports reference the same correct selection, but the second judge saw MiniMax in the working tree and raised the alarm correctly.

---

## Issues Confirmed in MiniMax (`2d5d2f45`)

All of the following were verified against the raw `git show` output of the MiniMax commit:

| # | Error | MiniMax text | Correct text |
|---|-------|-------------|--------------|
| 1 | Hallucination | "LAN/tailnet/lièvre personnalisé" | "LAN/tailnet/personnalisée" (DeepSeek) |
| 2 | Nonsense portmanteau | "le.renamemage en OpenClaw" | "le renommage en OpenClaw" (DeepSeek) |
| 3 | Anglicism | "512 findings" | "512 résultats" (DeepSeek) |
| 4 | Mixed-language sentence | "Treat `--fix` comme un aide utile" | "Considérez `--fix` comme un outil utile" (DeepSeek) |
| 5 | Gender agreement | "un aide utile" | "un outil utile" / "une aide utile" |
| 6 | Missing hyphen | "assurezvous" | "assurez-vous" (DeepSeek) |
| 7 | Missing accent | "inevitables" | "inévitables" (DeepSeek) |
| 8 | Wrong word | "ingérence publique inutile" ("interference") | "entrées publiques superflues" (DeepSeek) |

---

## Why DeepSeek Was Selected

DeepSeek-V4-Flash (`29188bec`) was already clearly superior across all dimensions the first judge evaluated:

- **Complete frontmatter**: tags, category, subCategory, all cover images using correct parent-relative paths (`../hero_wide.webp`)
- **Technical terminology**: consistent use of "passerelle" for gateway, "loopback" retained where it is the standard technical term in French documentation, "liaison personnalisée" for custom binding
- **Zero hallucinations**: no invented words, no anglicisms left untranslated, no gender errors
- **Title casing**: section headings use appropriate title case matching the English original's convention
- **Natural French flow**: reads as professional technical prose, not machine-translated scaffolding

The Qwen candidate (`2b48ceb3`) was excluded because it stripped necessary frontmatter (tags, category, cover images), making it structurally incomplete regardless of prose quality.

---

## Light Polish Applied Over DeepSeek

The final file is DeepSeek's output with one minor prose improvement:

- "Tout le monde sur internet ne voit rien" → "Tout le reste d'internet ne voit rien" — the DeepSeek phrasing was slightly ambiguous in French; the polished version is more idiomatic and precise.

No other changes were made. All technical content, MDX structure, frontmatter, asset paths, code blocks, links, and checklist items are exactly as DeepSeek produced them.

---

## Escalation Decision

**Revert HEAD to DeepSeek state.** The MiniMax commit (`2d5d2f45`) should not stand as the translation for this post. The final polished file has been written to `src/content/posts/2026-01-26--securing-clawdbot-tailscale/fr/index.mdx`, restoring the DeepSeek content with the single prose correction noted above.
