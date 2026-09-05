# Evidence and claim boundaries

Verified 2026-09-04. Primary source brief: `/Users/dan/.codex/attachments/dfaf0bc7-3dea-43ff-8eb2-3abe4d1eedc4/pasted-text.txt`, section 3.

| Claim used | Primary source | Boundary |
|---|---|---|
| Routing and orchestrator-worker patterns support task-dependent allocation. | [Anthropic, Building effective agents, December 19, 2024](https://www.anthropic.com/engineering/building-effective-agents) | Pattern guidance; no universal superiority over a fixed workflow. |
| Parallel research can use an orchestrator and specialized workers, with coordination and token costs. | [Anthropic, How we built our multi-agent research system, June 13, 2025](https://www.anthropic.com/engineering/multi-agent-research-system) | Vendor's research workload, not a guarantee for debugging or shared-state coding. No numeric speedup is reused. |
| Learned model routing can trade quality against cost using preference signals. | [Ong et al., RouteLLM, 2024](https://arxiv.org/abs/2406.18665) | Results depend on routing data, candidate models, and evaluation tasks. No savings guarantee. |
| Test-time allocation is an optimization variable studied under explicit experimental assumptions. | [Snell et al., Scaling LLM Test-Time Compute Optimally, 2024](https://arxiv.org/abs/2408.03314) | Does not imply more tokens always improve every task. |
| Agent outcomes and process evidence both matter to evaluation. | [Anthropic, Demystifying evals for AI agents, January 9, 2026](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Supports evaluation practice; proposed deployment gates remain design recommendations. |

## Proposed architecture

The validated planner contract, atomic resource reservations, request-time versus policy-promotion loops, workload-specific confidence checks, model qualification workflow, and deterministic compilation are proposed system design. No autonomous service or periodic model monitor has been configured. An operating goal in a document is not authorization to spend or contact users.

## Confidence and agreement

Agreement can prioritize a check; it cannot prove correctness. Shared models and evidence can induce shared failures. A confidence value must be assessed against held-out outcomes for the actual task and strategy before it controls escalation. The demo uses explicit fixture flags, not a trained or calibrated probability estimator.

## Demo values

Lookup: $0.001, 0.02 seconds, zero agents. Simple: $0.02, two seconds, one agent. Novel: $0.30, fifteen seconds, three agents. These are illustrative policy inputs; they are neither provider prices nor measured latency. High risk routes to a human, and insufficient budget or deadline blocks dispatch. Live planning, cancellation, concurrency, provider accounting, and model quality remain outside the fixture demonstration.
