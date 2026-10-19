# Architect translation repair: Spanish, French, Italian

Date: 2026-10-18. Method: manual Codex council revision by the Architect agent, using the article-i18n-translator skill and the corrected English article. This is not a pipeline candidate generation or automated LLM judge run. No external translation API calls were made; no candidate or judge provenance is claimed.

Updated `es/index.mdx`, `fr/index.mdx`, and `it/index.mdx` under `src/content/posts/2026-10-14--no-fate-but-what-we-bill/`.

Preserved localized titles, subtitles, the opening film quotation and opening paragraphs, and the ending's localized rhetorical framing. Replaced the argument and defense sections to match the corrected source: human-baseline METR units and reliability/measurement limits; GTG campaign scope versus concurrency and remaining human decisions; historical cost scenarios; private-practice Ollama targets and unresolved intent; nonzero attacker costs and remaining controls; independence and correlated failure caveats; stateful agent systems and explicitly hypothetical persistence scenarios; tool-boundary authorization; edit plus runtime/spend monitoring; containment, evidence preservation and recovery verification.

Translated all four figure captions and alt descriptions. Preserved every source URL and the entire probability code fence exactly. Added the four parent-relative `../*.svg?url` imports with the English variable names and corresponding `src={...}` expressions so Astro emits production assets. Omitted locale `draft` and `date` to inherit English publication state. Set `modified: 2026-10-18` and sourceHash `398caaa9e710`, computed with `hashPostSource` after incorporating the current source's asset imports and completing the faithful repair.

Validation:

- `bun run i18n:validate -- --slug no-fate-but-what-we-bill --locale es --skip-global` — passed.
- `bun run i18n:validate -- --slug no-fate-but-what-we-bill --locale fr --skip-global` — passed.
- `bun run i18n:validate -- --slug no-fate-but-what-we-bill --locale it --skip-global` — passed.
- Additional direct comparison confirmed identical source URL sets, exact probability code fences, and current computed source hashes for all three locales.

Initial validator attempts rejected correct parent-relative SVG imports because relative-path normalization did not strip the source's `./` prefix. The coordinator repaired the shared validator; all three commands were rerun and passed. This agent did not modify validation scripts, English, or SVG files during the translation repair. Git commits and integrated production validation remain coordinator-owned.
