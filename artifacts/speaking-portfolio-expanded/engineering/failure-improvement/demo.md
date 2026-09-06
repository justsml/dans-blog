# Guardrail demo: a proposed fix needs a gate

This demo supports slide 8 only. The talk's spine is the scheduled log-reading loop; the kit illustrates what happens once that loop proposes a fix. Open [the offline stage kit](../../demos/index.html), select **Failure loop**, and reload before rehearsal. No server or account is required. Keep `demo-logic.js` next to the HTML file. All inputs are synthetic.

| Clock | Action | Expected output and stage line |
| --- | --- | --- |
| 0:00–0:45 | Start with `connect ECONNREFUSED 127.0.0.1:5433`. | Normalizes to `connect econnrefused localhost:<port>`. Known case proposes a readiness check. "The loop found a prior case. A search hit is a candidate, not a diagnosis." |
| 0:45–1:15 | Switch to `connect ECONNREFUSED localhost:5444`. | Same family, same prior record. "Distillation on slide 5 is what makes these two one failure, not two." |
| 1:15–2:00 | Evaluate with all three gates unchecked. Then check regression only. | `Keep proposed fix in review` both times. "One reproducer does not earn a merge." |
| 2:00–2:45 | Check holdout, leaving scope unchecked. Then check scope. | Only all three yield `Promote scoped readiness check`. "Three separate pieces of evidence before the PR leaves the queue." |
| 2:45–3:15 | Uncheck holdout. | Back to review. "A nicer-looking fix still stops when a gate fails." |
| 3:15–4:00 | Switch to the permission-denied error. | No known resolution. "The loop should say it does not know. And nothing here touches money; that gate is a person." |

## Honesty on stage

The checkboxes represent evidence a real pipeline must gather. Clicking them neither runs a test nor proves a root cause. The browser does not read logs, edit files, promote code, call a model, or train anything. The scheduled check, classification loops, ticket and PR creation, and feedback correlation described in the talk are not in this kit; they are described from practice and the `Story` lines carry the specifics.

## Spoken fallback

Read the two errors and ask whether they look like the same incident. Reveal their shared normalized form. Present three cards marked regression, holdout, scope; turn each over in order. Only all three permit the change. Finish with a permission-denied card left unmatched, and a fourth card marked "money" that only a person may turn.

## Validation

The shared kit's Bun tests exercise normalization, unknown failures, and promotion behavior. See [the shared runbook](../../demos/DEMO-RUNBOOK.md). These validate demonstration mechanics, not the effectiveness of any loop described in the talk.
