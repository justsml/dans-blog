# Five-minute paper walkthrough: the ingest that changed

Synthetic design exercise. No API calls, autonomous repair, production promotion or measured recovery rate. Use slide 10 and the handout. The older offline adaptive-systems kit demonstrates strategy selection and caps; it does not implement these schema-repair fixtures.

| Time | Reveal | Ask | Expected transition |
| --- | --- | --- | --- |
| 0:00 to 1:00 | Contract v8 explicitly renames `zip` to `postal_code`; country remains US | Is the name alone enough? | Read contract evidence, propose copy-string mapping |
| 1:00 to 2:00 | Positive and negative fixtures below | Which record must not be silently repaired? | Reject conflicting values; eligible proposal enters bounded canary |
| 2:00 to 3:00 | Status changes from Boolean to `pending`; no semantic definition | Which Boolean should we use? | Neither; quarantine and assign semantic question |
| 3:00 to 4:00 | Provider accepted extraction but response was lost | Submit to another provider now? | Reconcile saved operation identity; preserve uncertainty |
| 4:00 to 5:00 | Daily report in contracts.md | What does the engineer need to do? | Resolve status meaning; review unknown job; inspect canary evidence |

## Fixtures to reveal one at a time

| Fixture | Expected result | Reason |
| --- | --- | --- |
| `{"postal_code":"02108","country":"US"}` plus approved rename contract | Candidate output keeps `"02108"` | String preserves leading zero |
| `{"zip":"02108","postal_code":"90210","country":"US"}` | Quarantine | Conflicting source values |
| `{"postal_code":"SW1A 1AA"}` | Quarantine under this deliberately narrow US contract | Country absent; do not infer a US ZIP transformation |
| `{"status":"pending"}` | Semantic escalation | Unknown business meaning cannot become truthiness |

Canary success requires the independent fixtures, accounted input disposition and downstream checks. It does not establish universal correctness. If the audience proposes a wider country-aware mapping, treat it as a separate policy candidate with its own evidence.

Four-minute route: compress the positive and negative fixture discussion to one minute total. Two-minute lightning route: say rename with evidence, status without meaning, timeout without outcome; ask which deserves automatic continuation. No browser interaction is required.
