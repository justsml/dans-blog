# Architect independent cross-review: Arabic and Hebrew

Date: 2026-10-18. Reviewed the completed `ar/index.mdx` and `he/index.mdx` only after the coordinator confirmed readiness. Compared against the current English article, sourceHash `398caaa9e710`. This is manual Codex council review, not a pipeline candidate generation or automated judge run. No locale files were edited.

Result: no critical or high findings remain in either translation.

Both versions faithfully retain the substantive corrections:

- METR's human-baseline task duration, 50% reliability, distinction from unattended agent runtime, sixteen-hour measurement caveat, and September 8, 2026 maintenance status.
- Anthropic attribution, approximately thirty targets rather than simultaneous subagents, limited successful cases, jailbreaks, continued human decisions and fabricated model results.
- Hypothetical worker-hour capacity arithmetic rather than a law of successful intrusion growth.
- Historical 2024 cost scenarios rather than current pricing or typical loss; the Ollama case's private practice targets and unresolved eventual intent.
- Shifted inference charges without claiming zero total attacker cost or erased permissions, quotas and detection/revocation controls.
- Independent fixed-probability toy assumptions, correlated failures, lockouts and defensive automation; no direct conversion from METR scores to intrusion probability.
- Persistent surrounding systems rather than universally stateless agents; memory research and three explicitly hypothetical scenarios; copying does not guarantee obedience.
- Short-lived credential limitations, scoped federation and model access, external tool-boundary enforcement, controlled outbound access and consequential-action approval.
- Both edit and execution monitoring, billing alerts distinct from immediate caps, containment and evidence preservation, trigger/queue cleanup, secret rotation and recovery verification, plus session revocation distinct from key replacement.

All four figure captions and alt descriptions retain the corrected boundaries. Source imports use the same four variable names and parent-relative `../*.svg?url` paths, and figures reference those variables. Localized titles/openings/endings are retained without reintroducing key-rotation-only recovery. Locale publication metadata inherits English and both files record the expected modified date and source hash.

Checks run independently:

- `bun run i18n:validate -- --slug no-fate-but-what-we-bill --locale ar --skip-global` — passed.
- `bun run i18n:validate -- --slug no-fate-but-what-we-bill --locale he --skip-global` — passed.
- Exact URL-set, probability-code-fence and `hashPostSource` comparisons — passed for both locales.

This review covers material semantic fidelity and security guidance. It does not claim native-speaker certification or visual RTL/browser sign-off; integrated rendering verification remains coordinator-owned.
