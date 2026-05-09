# Escalation Decision

Escalation was required because the primary judge selected `86a874f41c0a466952ca34a7ecb0b38c03e4015f`, while the second judge wrote `Decision: agree` but named `23df3d9430ceba6a20951339662506b36a5713da` as the chosen candidate.

The escalation model (`openrouter/anthropic/claude-sonnet-4.6`) returned a `502 provider_unavailable` after emitting its decision text, so there is no reliable telemetry for the run. The usable decision was clear: keep the Gemini candidate as the base, because the GLM candidate has a publication-blocking untranslated English word (`avoids`) in explanatory prose. However, the GLM candidate had the better Russian rendering of the pager/on-call metaphor, so the final text adopts `вызов дежурного`.

Final selection:

- Base candidate: `86a874f41c0a466952ca34a7ecb0b38c03e4015f`
- Borrowed phrase: `вызов дежурного` from `23df3d9430ceba6a20951339662506b36a5713da`
- Rejected: `2661c40ea69483220405f5a2f132a1547abdae74` due to weaker Russian and heavier anglicisms

The final MDX preserves the quiz structure, `client:visible` directives, imports, component props, links, and parent-relative asset paths.
