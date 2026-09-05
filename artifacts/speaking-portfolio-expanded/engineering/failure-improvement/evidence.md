# Evidence and claim boundaries

Verified 2026-09-04. Primary source brief: `/Users/dan/.codex/attachments/dfaf0bc7-3dea-43ff-8eb2-3abe4d1eedc4/pasted-text.txt`, section 2. The talk's hierarchy, pruning lifecycle, and proposed implementation are Dan's design positions developed from that brief. They are not attributed research results.

| Claim used | Evidence | Boundary |
|---|---|---|
| Agent evaluation can combine code, model, and human graders; observed outcomes differ from claims in a transcript. | [Anthropic, Demystifying evals for AI agents, January 9, 2026](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Engineering guidance from a vendor, not a controlled universal comparison. |
| Routing, evaluator-optimizer, and orchestrator-worker patterns are established implementation options. | [Anthropic, Building effective agents, December 19, 2024](https://www.anthropic.com/engineering/building-effective-agents) | Historical architecture reference; its live page warns some tooling has changed. No current SDK API claims used. |

## Proposed engineering practices

Failure records, the eliminate/prevent/code/tool/skill/memory/instruction hierarchy, promotion gates, and old-rule pruning are recommendations illustrated with synthetic cases. Neither cited article establishes this exact eight-step hierarchy. Adoption requires workload-specific testing and an owner. No claim that the model weights learn, no fine-tuning claim, no guarantee that every failure is preventable.

## Demo boundaries

The local replay normalizes two connection errors, proposes a scoped readiness intervention, and requires regression, holdout, and scope checks before promotion. Permission-denied stays unknown. All cases are authored fixtures. They establish that the example policy follows its assertions, not production effectiveness, learned root cause, or reliable autonomous improvement.

## Claim hygiene

Do not turn the five-dollar-loop nickname into a price quote. Do not claim lower support cost, better pass rate, or actual field experience without adding measured evidence. A retrievable memory is advisory data; never promote untrusted trace text directly into policy. Low trigger frequency alone is insufficient reason to delete a critical rule.
