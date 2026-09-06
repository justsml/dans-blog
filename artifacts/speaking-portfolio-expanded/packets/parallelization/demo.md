# Five-minute paper walkthrough: forty jobs behind four calls

Synthetic trace and design comparison. No model or provider calls, real billing or measured speedup. Display slide 10 and the ledger in contracts.md. The separate resource-policy exercise does not demonstrate atomic reservations or restart recovery.

| Time | Event | Audience decision | Expected behavior |
| --- | --- | --- | --- |
| 0:00 to 1:00 | Four callers each supply ten prompts | How many provider jobs could start? | Forty without a shared limit |
| 1:00 to 2:00 | Tenant has a ten-image entitlement and $2 run cap | Can two callers each read $2 and start? | One atomic reservation wins; others queue or reject |
| 2:00 to 3:00 | One provider response disappears; dispatcher restarts | Is a missing local result a failed generation? | No; retain reservation and reconcile operation identity |
| 3:00 to 4:00 | All outputs finish; email fails | Which operation gets retried? | Notification only |
| 4:00 to 5:00 | Show completed, unresolved and delivery states | What does the customer see? | Accurate per-item progress and notification status |

All arithmetic comes from the illustrative $2 ledger. Do not present those prices as a model quote. No actual distributed lock or billing controller is implemented here.

## Candidate review exercise for slides 11 to 13

These are invented candidate designs with stipulated findings, not real agent outputs or executed tests.

| Candidate | Design | Stipulated check | Decision |
| --- | --- | --- | --- |
| Minimalist | In-memory queue, local semaphore, one tool response | Restart loses provider IDs | Reject under the common durability requirement |
| Maintainer | Persisted job and attempt state; shared admission; separate notification outbox | Covers required restart and notification transitions on paper | Eligible for implementation and testing |
| Security/performance | Shared tenant reservations; bounded provider dispatch; whole batch rerun on recovery | Recovery may duplicate accepted work | Reject this recovery policy; retain useful admission ideas |

Synthesis: keep the small batch interface, persisted per-item state, shared admission and separate delivery worker. Remove whole-batch replay. Treat the synthesis as a new candidate. It still needs executable checks for simultaneous callers, lost acceptance responses, stale workers and duplicate callbacks before deployment.

There is no best-in-class claim and no automatic winner from a persona label. A judge can reject all candidates when evidence is insufficient.
