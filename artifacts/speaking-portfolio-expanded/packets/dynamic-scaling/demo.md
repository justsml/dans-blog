# Five-minute paper walkthrough: restart the batch

Slide 11. Paper trace, no provider calls. Ask the room for each transition before revealing it. Arithmetic comes from the $2 ledger in contracts.md.

| Time | Event | Ask | Expected behavior |
| --- | --- | --- | --- |
| 0:00 to 1:00 | Chat turn, retry, cron and second tab each request the batch | How many provider jobs could start? | Forty without shared admission; one job ID with it |
| 1:00 to 2:00 | Tenant has a ten-image entitlement and a $2 cap | Can two callers each read $2 and start? | One atomic reservation wins; the other queues with a reason |
| 2:00 to 3:00 | Spot worker reclaimed with two minutes' notice mid-batch | Does the render stop when the box does? | No; lease expires, reservations stay held, a new worker reloads the job |
| 3:00 to 4:00 | One provider response never arrives | Is a missing local result a failed generation? | No; keep it unresolved, query the saved provider ID, do not resubmit |
| 4:00 to 5:00 | All outputs stored; email fails | Which operation is retried? | Notification only; the customer sees per-item state and delivery status |

## Candidate review exercise, slide 12

Invented candidates with stipulated findings. Every candidate fails at least one gate; that is the exercise. The room finds the failure before you reveal it.

| Candidate | Design | Failed gate | Keep |
| --- | --- | --- | --- |
| Minimalist | In-memory queue, local semaphore, one tool response | Restart loses provider IDs; reclaimed worker would resubmit | The small interface and the explicit list of rejected complexity |
| Maintainer | Persisted job and attempt state, shared admission, notification outbox | Dispatches queued items after the deadline because deadline is checked at admission only | The state machine and the outbox |
| Security/performance | Shared tenant reservations, bounded provider dispatch, whole-batch rerun on recovery | Whole-batch replay duplicates accepted work | The admission protocol and the abuse cases |

Synthesis: small interface, persisted per-item state, shared admission, deadline re-checked before every external attempt, per-item recovery, separate delivery worker. It is a new candidate. It still needs executable checks for simultaneous callers, lost acceptance responses, stale workers, reclaimed instances and duplicate callbacks.

There is no automatic winner from a persona label, and the judge may reject the room.
