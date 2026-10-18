# Detail Detective — integrated closure review

Reviewed 2026-10-18. Verdict: all five original high-importance findings resolved; no remaining critical/high finding in the reviewed article and four SVGs. This is editorial/factual approval, not a claim about deployment or repository-wide checks.

- H1 closed: index.mdx:37–55 distinguishes human-baseline task difficulty, 50% reliability, task distribution, stale-series date and measurement ceiling. capability-curves.svg explicitly separates human time from runtime and labels work budgets hypothetical.
- H2 closed: index.mdx:57–84 uses canonical Anthropic URL, attributes findings, includes jailbreaks/human decisions/errors and separates thirty targets from worker concurrency. Capability SVG likewise distinguishes campaign scope and hypothetical capacity arithmetic.
- H3 closed: index.mdx:86–115 and who-pays.svg distinguish transferred inference costs from attacker operating costs; permissions, quotas, revocation and detection remain effective controls. Historical cost estimates are labeled as scenarios rather than contemporary invoices.
- H4 closed: index.mdx:117–147 and swarm-odds.svg state independent equal-p toy assumptions, correlated failures and defender intervention. Formula-derived curves replace hand-drawn approximations; unsupported swarm distribution and universal human/zero-cost assertions are gone. Rounded example values remain correct.
- H5 closed: index.mdx:149–217 distinguishes persisted agent inputs from model-call state, labels scenarios, cites memory research, and includes runtime monitoring, containment, new issuance, queues and persistence cleanup. defense-layers.svg uses reduced-risk wording rather than guarantees.

New source verification: the [June 2026 Sysdig URL](https://www.sysdig.com/blog/llmjacking-evolved-attackers-are-using-stolen-ai-compute-to-build-offensive-agentic-tools) loads. Its private-practice-range section explicitly limits observed targets and leaves eventual intent unresolved; the revised paragraph accurately preserves those qualifications. The [Microsoft memory research URL](https://www.microsoft.com/en-us/security/blog/2026/06/22/guarding-ai-memory/) also loads and supports delayed influence across sessions, with its own illustrative scenario labeled hypothetical.

Visibility/provenance check against HEAD: English frontmatter is draft:false. Exactly ten locale index.mdx files have only draft:true added; all original bytes otherwise match HEAD, including sourceHash. No translation generation/evaluation calls were made.

All four SVGs parsed successfully as XML. Reviewed final visible text of all four. No tracked file edits made during this closure review.
