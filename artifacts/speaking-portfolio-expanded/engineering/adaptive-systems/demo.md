# Four-minute stage demo: runtime choices inside fixed limits

Open [the offline stage kit](../../demos/index.html) and select **Building Adaptive & Dynamic AI Systems**. Reload to reset. No server, provider, account, or model is involved.

| Clock | Action | Expected output and explanation |
|---|---|---|
| 0:00–0:40 | Choose known lookup with budget $1 and deadline 30 seconds. | `Deterministic lookup`: $0.001, 0.02 seconds, zero agents. These are assigned illustrative values. |
| 0:40–1:10 | Select routine/simple task. | `One small-model attempt + checks`: $0.02, two seconds, one agent. No agent actually runs. |
| 1:10–1:50 | Select novel intermittent failure. | `Two independent hypotheses + verification`: $0.30, fifteen seconds, three agents. “An additional worker should answer a distinct question.” |
| 1:50–2:30 | Set budget to $0.10. | `Stop and request more resources`: no accepted strategy fits both caps. No agents dispatched. Restore budget to $1. |
| 2:30–3:00 | Set deadline to five seconds. | Same stop result. Restore 30 seconds. “A plan does not grant itself more time.” |
| 3:00–3:40 | Enable consequential-action gate. | `Human decision gate` regardless of resource availability. Human cost/time excluded from the displayed zero machine allocation. |
| 3:40–4:00 | Disable gate and conclude. | “This fixture picks among policies. A real planner must earn its choices on your workload.” |

## Honest limits

The branching policy is deterministic. It does not create a DAG, run model agents, gather hypotheses, verify answers, estimate confidence, or measure actual costs and latency. High-risk classification is a supplied input. Production implementation needs validated plans, scoped access, atomic reservations, accounting reconciliation, cancellation, calibration, and regression-gated strategy promotion. Agreement is not proof; the three-agent label does not establish independent evidence or correctness.

## Spoken fallback

Use three strategy cards with the assigned cost/time/agent values. Compare each against a $0.10 budget and five-second deadline. Then introduce an authority card: consequential action still needs accountable review even when the resource limits permit it. This makes resource eligibility visibly different from permission to act.

## Validation

See [the shared runbook](../../demos/DEMO-RUNBOOK.md) and `demo.test.js` beside it. Tests check strategy selection, caps, and the human gate. Their results say nothing about actual model quality. No recurring evaluation service, model-release monitor, or autoscheduler is configured.
