# Five-minute paper walkthrough: the ingest that changed

Slide 10. Paper trace, no API calls. Job ingest-1042 has 900 inputs: 882 eligible/mapped, 18 quarantined for unknown status. The 100-record canary is inside the 882; the unresolved verification job is an operation status, not an extra record. The room decides before you reveal. Hide answer columns and the answer-bearing SVG until after the decision.

| Time | Reveal | Ask | Expected transition |
| --- | --- | --- | --- |
| 0:00 to 1:00 | Contract v8 renames `zip` to `postal_code`; country stays US. The orchestrator conjures a diff agent with read-sample and read-contract. | Is the name alone enough? | It reads the contract, proposes copy-string, and asks for run-fixtures; policy grants it |
| 1:00 to 2:00 | Candidate `String(Number(value))`; schema allows any string; type check passes. First show `90210`, then reveal `02108` → `2108` | Does the green check establish preserved meaning? | No. Leading-zero fixture rejects the candidate. Copy-string must pass all held-out fixtures before a canary |
| 2:00 to 3:00 | Status changes from Boolean to `pending`; no definition anywhere | Which Boolean do we use? | Neither. Quarantine, escalate with samples and the exact question |
| 3:00 to 4:00 | The verification provider accepted the batch, then the response was lost | Submit to another provider now? | Reconcile the saved operation identity; hold the reservation |
| 4:00 to 5:00 | Daily report in contracts.md, including denied write, database and send requests | What does the engineer do first? | Resolve the status meaning; then the unknown job; then read the canary evidence |

## Candidate before the reveal

Show `const postalCode = String(Number(value))` and a validator that checks only `typeof postalCode === "string"`. Give a normal input `"90210"` first. Ask what evidence is still missing; accept rejection immediately if someone spots the loss. Never script the room approving it. Then reveal `"02108"` becomes `"2108"`: type-correct, meaning damaged. Do not assert an actual failed delivery without an address-verification result. The intended lesson survives whether the room catches the defect or needs the reveal.

The proposing agent cannot promote this candidate. Independent tests reject it, and the corrected copy-string proposal reruns the full suite. A later reconciliation worker can query status but cannot submit or pay.

## Fixtures, revealed one at a time

| Fixture | Expected result | Reason |
| --- | --- | --- |
| `{"postal_code":"02108","country":"US"}` plus the rename contract | Candidate output keeps `"02108"` | String copy preserves the leading zero |
| `{"zip":"02108","postal_code":"90210","country":"US"}` | Quarantine | Conflicting source values; the repair has no right to pick |
| `{"postal_code":"SW1A 1AA"}` | Quarantine under this US-only contract | Country absent; do not infer a US ZIP transform |
| `{"status":"pending"}` | Semantic escalation | Unknown business meaning cannot become truthiness |

Canary success needs the independent fixtures, full input accounting, and downstream checks. It does not prove universal correctness. If the room proposes a country-aware mapping, it is a separate policy candidate with its own evidence.

## Route budgets

- 40-minute talk: five-minute walkthrough; two minutes spoken, three interaction. Use all five rows; first-minute setup stays brief, with the bulk of response time on the lossy mapping.
- 30-minute talk: four-minute walkthrough; 1.75 spoken, 2.25 interaction. Contract and candidate: 1.5 minutes; leading-zero and conflict reveals: 1 minute; status and timeout decisions: 1 minute; report: 0.5 minute.
- 15-minute talk: 2.5-minute walkthrough; 1.5 spoken (including compute bridge), one interaction. Setup and green check: 0.5 minute; leading-zero reveal: 0.75 minute; status and timeout: 0.75 minute; landing and compute bridge: 0.5 minute. Omit the report and secondary negative fixtures.

These budgets include the scripted prose; do not add a second narration of every table row.
