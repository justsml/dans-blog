# Five-minute paper walkthrough: the ingest that changed

Slide 10. Paper trace, no API calls. The room decides before you reveal. Fixtures are hidden until this slide; slide 8 only states the principle.

| Time | Reveal | Ask | Expected transition |
| --- | --- | --- | --- |
| 0:00 to 1:00 | Contract v8 renames `zip` to `postal_code`; country stays US. The orchestrator conjures a diff agent with read-sample and read-contract. | Is the name alone enough? | It reads the contract, proposes copy-string, and asks for run-fixtures; policy grants it |
| 1:00 to 2:00 | Fixtures below, one at a time | Which record must not be silently repaired? | Conflicting values quarantine; the proposal enters a bounded canary |
| 2:00 to 3:00 | Status changes from Boolean to `pending`; no definition anywhere | Which Boolean do we use? | Neither. Quarantine, escalate with samples and the exact question |
| 3:00 to 4:00 | The verification provider accepted the batch, then the response was lost | Submit to another provider now? | Reconcile the saved operation identity; hold the reservation |
| 4:00 to 5:00 | Daily report in contracts.md, including the denied write-database request | What does the engineer do first? | Resolve the status meaning; then the unknown job; then read the canary evidence |

## Fixtures, revealed one at a time

| Fixture | Expected result | Reason |
| --- | --- | --- |
| `{"postal_code":"02108","country":"US"}` plus the rename contract | Candidate output keeps `"02108"` | String copy preserves the leading zero |
| `{"zip":"02108","postal_code":"90210","country":"US"}` | Quarantine | Conflicting source values; the repair has no right to pick |
| `{"postal_code":"SW1A 1AA"}` | Quarantine under this US-only contract | Country absent; do not infer a US ZIP transform |
| `{"status":"pending"}` | Semantic escalation | Unknown business meaning cannot become truthiness |

Canary success needs the independent fixtures, full input accounting, and downstream checks. It does not prove universal correctness. If the room proposes a country-aware mapping, it is a separate policy candidate with its own evidence.

Four-minute route: fold the two negative fixtures into one minute. Two-minute lightning route: rename with evidence, status without meaning, timeout without outcome; ask which deserves automatic continuation.
