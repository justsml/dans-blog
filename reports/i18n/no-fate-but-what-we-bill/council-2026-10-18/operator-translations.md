# Council editorial translation repair: ar, he, hi, ja

Date: 2026-10-18

This is a direct editorial revision by the Codex Council Battle-scarred Operator agent, using the corrected English article as the authoritative source. It is **not** an API pipeline candidate run, model-comparison result, or pipeline judge approval. No external translation/judge API calls were made. Agent session token usage and cost are not available in this report. No commits were created by this agent.

## Scope and rationale

Updated the Arabic, Hebrew, Hindi and Japanese `index.mdx` files under `src/content/posts/2026-10-14--no-fate-but-what-we-bill/`.

Preserved localized titles, subtitles, metadata, opening quotation and the first three explanatory paragraphs. Replaced the outdated argument and sections with faithful translations of the corrected English source. Retained each language's concluding motif while replacing the obsolete key-rotation recovery claim with access-and-persistence containment.

The revised text preserves the distinction between METR human task time and agent runtime; benchmark reliability and measurement limits; the attribution and limitations of the GTG-1002 report; historical cost scenarios; the practice-environment and unresolved-intent caveats in the newer Sysdig case; independent, fixed-probability toy assumptions; hypothetical versus observed persistence; and layered operational controls including runtime monitoring, active-session revocation and recovery verification.

All source URLs and the probability code block are preserved. Figure captions and alt text are translated. All four SVGs use the English source's imported variable names, with `../*.svg?url` paths appropriate to locale directories. This carries over the coordinator's production asset fix rather than retaining raw relative image URLs.

Locale `draft` flags were removed to inherit the now-published English article; no locale `date` field was introduced. `modified` is `2026-10-18`. After applying the full editorial update and SVG imports, `hashPostSource` from `src/scripts/i18n/source-hash.ts` produced `398caaa9e710`, recorded in all four files. This records the source being translated, not an independent quality-score claim.

## Validation

All commands completed with exit code 0:

| Locale | Command | Result |
| --- | --- | --- |
| ar | `bun run i18n:validate -- --slug no-fate-but-what-we-bill --locale ar --skip-global` | Pass |
| he | `bun run i18n:validate -- --slug no-fate-but-what-we-bill --locale he --skip-global` | Pass |
| hi | `bun run i18n:validate -- --slug no-fate-but-what-we-bill --locale hi --skip-global` | Pass |
| ja | `bun run i18n:validate -- --slug no-fate-but-what-we-bill --locale ja --skip-global` | Pass |

These mechanical checks do not substitute for independent linguistic review. The coordinator is arranging cross-review and owns the final production build, localized route, canonical/hreflang and asset checks. This report does not assert those later checks have passed.

No English, SVG, script, unrelated locale or other tracked file was edited during this translation assignment. Earlier defense SVG work is separately documented in the Council review.
