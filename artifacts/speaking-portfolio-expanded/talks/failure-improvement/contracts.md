# Offline check contract

| Input or grant | Question it answers | Boundary |
| --- | --- | --- |
| Sanitized logs | What failed in this window? | Read only; redact before model input |
| Code snapshot | Where does the failure originate? | Pin revision; no production write |
| Trace lookup | What happened before the error? | Tenant scope; retain evidence IDs |
| Isolated browser | Can the symptom be reproduced? | Test account; no real purchase |
| Ticket writer | Who owns the next action? | Stable incident key; deduplicate |

The scheduled job reads a bookmark, collects a bounded overlap window, deduplicates events, and persists its artifact before advancing the bookmark. Routing retries use the artifact and stable incident keys. Classifier output contains family, occurrence count, first/last seen, evidence IDs, severity rationale, proposed owner, and an explicit unknown state.

Promotion requires a reproducing regression, held-out cases controlled separately, an allowed diff scope, and a named reviewer. Money movement, data deletion, customer messaging, and widening customer exposure require a person. The repair agent cannot edit the acceptance policy or held-out fixtures.

## Demo acceptance

Run the regression and holdout as actual commands. Retain their output and exit status. Show a held change after the holdout fails, then an unknown classification held for a person. Fix the candidate, never the holdout to obtain green. Tracker writes require a pre-authorized demo project. The checkbox kit is a teaching aid and is not evidence that these operations ran.
