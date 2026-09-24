# Fresh translations against frozen gold

`src/scripts/i18n/translation-battle.ts` generates new translations from English only, then conducts two independently blinded paired assessments against the immutable consensus reference. It never promotes outputs to the site or changes the reference dataset.

The September run uses all five `consensus-gold/v1` cases and the 13 exact model IDs in its saved OpenRouter catalog. GPT-6 Terra remains unavailable. All generators use their catalog's lowest supported reasoning setting, a 24,000-token output ceiling, and zero automatic retries. GPT-6 Sol and Opus 5.5 review at high reasoning. Each call is exported through the existing official Langfuse AI SDK integration.

```sh
bun src/scripts/i18n/translation-battle.ts reports/i18n/translation-battles/2026-09-24-gold-v1 canary
bun src/scripts/i18n/translation-battle.ts reports/i18n/translation-battles/2026-09-24-gold-v1 full
bun src/scripts/i18n/translation-battle-repair.ts reports/i18n/translation-battles/2026-09-24-gold-v1
bun src/scripts/i18n/translation-battle-report.ts reports/i18n/translation-battles/2026-09-24-gold-v1
bun src/scripts/i18n/translation-battle-verify.ts reports/i18n/translation-battles/2026-09-24-gold-v1
```

Run identity includes catalog, harness, prompts and frozen input hashes. Resume reuses identical receipts, including failures; it never silently retries failed rows. Use a new directory and explicit cohort for changed settings or retries. A new run directory must contain an OpenRouter catalog snapshot with the selected model metadata. Generation/review calls require network access and configured OpenRouter/Langfuse credentials. Reviewers must also exist in that snapshot.

Each source fits a single request. This isolates model translation quality and avoids chunk-boundary effects; the measured latency is not production multi-chunk pipeline throughput. Production mechanical import/asset normalization and inherited-frontmatter omission apply equally to every candidate. Raw model output is retained. Strict structural/protected-token checks are recorded separately from fluency assessment; locale number formatting can trigger a strict literal mismatch without proving an error.

Reports provide complete request latency, token totals, reasoning/cache counters, catalog-equivalent cost, gateway and upstream receipts separately, paired reference-relative scores, preferences, ten dimension scores, readiness, serious issues, per-case results and reviewer agreement. Never add gateway and upstream costs without understanding the billing route. Effective output tokens per request-second is not streaming decoding speed. Missing costs remain unknown.

The reference is the requested synthetic consensus gold. It is still scored independently in each blinded pair. Two reviewers reduce reliance on one evaluator but do not establish human-calibrated accuracy or eliminate self-preference. Five Spanish/Japanese cases support a pilot comparison, not claims about other languages or universal superiority. Raw lineage remains available with the frozen dataset.

The optional repair command removes only trailing JSON commas outside quoted strings. It preserves original parse failures in `parse-recovery.jsonl` and leaves provider responses untouched. It cannot repair or invent assessments. Run it before reporting after a resumed battle reprocesses receipts.
