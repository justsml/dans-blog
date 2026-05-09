# i18n Judge Report: llm-evals-are-broken (de) — Second Review

## Candidates Reviewed

| SHA | Model | Role |
|-----|-------|------|
| `c1dec1081` | openrouter/qwen/qwen3.6-plus | Initial translation (base) |
| `95f2ea1d3` | openrouter/qwen/qwen3.5-flash-02-23 | Edit on top of candidate 1 |
| `22f5ae987` | openrouter/deepseek/deepseek-v4-flash | Edit on top of candidate 2 (currently at HEAD) |

## Assessment

**I disagree with the current HEAD selection (`22f5ae987`, DeepSeek V4 Flash).** Candidate 1 (`c1dec1081`, Qwen 3.6 Plus) is the strongest translation and should be restored with minor polish.

### Why Candidate 1 (Qwen 3.6 Plus) is superior

Candidate 1 has natural, idiomatic German that preserves Dan's direct, punchy voice. Examples that candidate 3 regressed:

| English original | Candidate 1 | Candidate 3 (HEAD) | Problem |
|---|---|---|---|
| "wearing a tuxedo of benchmarks" | "kommt im Smoking **aus** Benchmarks daher" | "erscheint im Smoking **der** Benchmarks" | Genitive "der" is unidiomatic here — "aus" (made of) is correct |
| "cheapest evaluation method" | "**günstigste** Evaluierungsmethode" | "**billigste** Evaluierungsmethode" | "Billigste" carries a cheap-quality connotation; "günstigste" means least expensive |
| "Every new model arrives" | "Jedes neue **Modell kommt** ... **daher**" | "Jedes neue **Model erscheint**" | Typo: "Model" instead of "Modell". Also loses the colloquial "daherkommen" framing |

### Issues with Candidate 2 (Qwen 3.5 Flash)

Candidate 2 introduced several regressions that candidate 3 mostly fixed, but candidate 1 had them right from the start:
- Changed title to "Kämpfe gegen Übel" (weaker)
- Changed "die Frage von jemand anderem" to "eine andere Frage" (loses the original's meaning entirely)
- Changed "angemeldet" to "eingeschrieben" (wrong verb)
- Translated code-block error strings to German (breaks typical developer expectations)
- Introduced English headings ("Vibes-Based Evaluation Tatsächlich Kostet", "Human Eval")

### Candidate 3 fixed many of candidate 2's regressions, but introduced its own

Candidate 3 correctly reverted: code comments back to English, "angemeldet", proper German headings, "die Fragen von jemand anderem". However it introduced the typo and preposition issues above, and the overall phrasing is occasionally more formal/wooden than candidate 1.

## Key Regressions in HEAD vs Candidate 1

1. **`src/content/posts/2026-05-06--llm-evals-are-broken/de/index.mdx:16`** — Typo: "Model" → "Modell"
2. **`src/content/posts/2026-05-06--llm-evals-are-broken/de/index.mdx:16`** — Preposition: "der Benchmarks" → "aus Benchmarks"
3. **`src/content/posts/2026-05-06--llm-evals-are-broken/de/index.mdx:52`** — Word choice: "billigste" → "günstigste"

## Verdict

**Escalate.** Revert to candidate 1 (`c1dec1081c1a69083e039e5fdaf446acef0a7e38`, Qwen 3.6 Plus) as the base translation. It has the most natural flow, best preserves the author's voice, and avoids the typographical and idiomatic errors present in candidate 3. No additional edits to `de/index.mdx` are needed beyond restoring candidate 1's version.
