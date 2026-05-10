# Escalation Report: mastra-workflows-memory (fr)

**Escalation model:** human review (escalation triggered by second-judge disagreement flag)

## Why Escalation Was Triggered

The second judge (`judge-second.md`) agreed with the first judge's candidate selection (DeepSeek V4 Flash, `6d68992b49ded8b3ce5b98cfe8343550f70d2055`) but raised a blocking correctness issue:

> The translation changes `category: AI` to `category: IA`. This is invalid per `src/content.config.ts` where `editorialCategories` is an English-only enum. A build would fail Zod validation.

Per the i18n skill's escalation rules, a second-judge disagreement — even a partial one flagging a structural defect — requires escalation before writing the final file.

## Candidate Comparison Summary

| Candidate | SHA | Verdict |
|---|---|---|
| DeepSeek V4 Flash | `6d68992` | **Selected** — strongest voice fidelity, correct asset paths |
| Qwen 3.6 Plus | `b128f75` | Runner-up — good prose, wrong `social_image` path (`desktop-social.webp` instead of `../desktop-social.webp`) |
| MiniMax M2.7 | `de45bcd` | Rejected — untranslated English ("basically la même chose"), over-capitalized French headings, wrong asset path |

## Escalation Decision

**Retain DeepSeek V4 Flash as the base.** The second judge's objection was a single-field correctness bug, not a translation quality concern.

The working tree at the time of escalation already had `category: AI` corrected (the field was fixed before this report was written, consistent with the second judge's recommended one-line fix). No other structural issues were found.

## Additional Polish Applied

Beyond the `category` fix (already present in working tree), three light editorial corrections were made to the DeepSeek base:

1. **Guillemet punctuation** (`line 21`): `d'« obéir. »` → `d'« obéir ».` — Period moved outside the closing guillemet per standard French typographic convention. The original placement (period inside guillemets) is used in French for full quoted sentences, not for a single quoted word mid-sentence.

2. **Subject–verb agreement** (`line 134`): `Ils brûlent` → `Il brûle` — The grammatical subject is the singular "Le développeur", not the 47 messages. DeepSeek used third-person plural, which was a minor agreement error.

3. **Anglicism removal** (`final paragraph`): `Votre mileage peut varier` → `Les résultats peuvent varier` — "Mileage" is an English idiom with no natural French equivalent at this register. The replacement is idiomatic and preserves the hedging intent of the original "Your mileage may vary."

## Final State

- **Base candidate:** `6d68992b49ded8b3ce5b98cfe8343550f70d2055` (DeepSeek V4 Flash)
- **File written:** `src/content/posts/2026-01-05--mastra-workflows-memory/fr/index.mdx`
- **Net changes from base:** four targeted edits (category field already corrected + three prose fixes above)
- **Asset paths:** correct (`../desktop-social.webp`, `../wide.webp`, `../square.webp`)
- **Tags:** translated to French (`IA, Workflows, Mémoire, Mastra, Réseaux d'agents, Orchestration`) — acceptable for locale file; tags are free-form strings per `src/content.config.ts`
- **Category:** `AI` (English enum value, required by Zod schema)
