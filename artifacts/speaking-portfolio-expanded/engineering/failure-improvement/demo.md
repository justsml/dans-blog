# Four-minute stage demo: a lesson needs a promotion gate

Open [the offline stage kit](../../demos/index.html), select **Automating Improvement From Failure**, and reload before rehearsal. No server or account is required. Keep `demo-logic.js` next to the HTML file. All inputs are synthetic.

| Clock | Action | Expected output and stage line |
|---|---|---|
| 0:00–0:45 | Start with `connect ECONNREFUSED 127.0.0.1:5433`. | Normalizes to `connect econnrefused localhost:<port>`. Known case proposes readiness check. “A search hit is a candidate, not a diagnosis.” |
| 0:45–1:15 | Switch to `connect ECONNREFUSED localhost:5444`. | Same normalized family and prior record. Scope: local integration tests requiring the database service. “Changing the port should not erase yesterday's lesson.” |
| 1:15–2:00 | Evaluate with all three gates unchecked. Then check regression only. | `Keep proposed fix in review` in both cases. “One reproducer does not establish generality.” |
| 2:00–2:45 | Check holdout, leaving scope unchecked. Then check scope. | First remains in review. Only all three yield `Promote scoped readiness check`. “Promotion depends on three separate pieces of evidence.” |
| 2:45–3:15 | Uncheck holdout. | `Keep proposed fix in review`. “A better-looking fix still fails the gate when a required check fails.” |
| 3:15–4:00 | Switch to permission-denied error. | No known resolution. “The retrieval policy should admit it does not know.” End with the intervention hierarchy: eliminate, prevent, code/test/hook, tool, skill, scoped knowledge, instruction. |

## Honesty on stage

The checkboxes represent evidence a real pipeline must gather. Clicking them neither runs a test nor proves the root cause. The browser does not edit files, promote code, operate a database, call a model, or train anything. Readiness enforcement, negative startup cases, canarying, and pruning are proposed extensions explained in the talk. The fixture only demonstrates normalization, conservative matching, and a three-input gate.

## Spoken fallback

Read the two errors and ask whether they look like the same incident. Reveal their shared normalized form. Present three cards marked regression, holdout, scope; turn each over in order. Only all three permit the proposed change. Finish with a permission-denied card and leave it unmatched. The decision is understandable without animation or a terminal.

## Validation

The shared kit's Bun tests exercise normalization, unknown failures, and promotion behavior. See [the shared runbook](../../demos/DEMO-RUNBOOK.md). These validate demonstration mechanics, not agent effectiveness. The readiness scenarios on the surrounding slides are authored future test requirements, not results from this demo.
