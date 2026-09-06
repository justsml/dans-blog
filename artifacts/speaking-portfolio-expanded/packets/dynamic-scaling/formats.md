# Formats: Dynamic Scaling of Agentic Workloads

The 14-slide [browser deck](../../../reveal-talks/dynamic-scaling.html) follows the [40-minute outline](../../outlines/dynamic-scaling-40min.md). Scripts, adaptations and the deck are generated from the outline by `build-talk.ts`; edit the outline, then rebuild.

| Slot | Preparation |
| --- | --- |
| 5 minutes | Lightning script below; slides 1, 4, 7, 8, 14 |
| 10 minutes | Lightning script plus the walkthrough in demo.md |
| 15 minutes | [Script](script-15min.md) and [route](../../outlines/dynamic-scaling-15min-adaptation.md) |
| 30 minutes | [Script](script-30min.md) and [route](../../outlines/dynamic-scaling-30min-adaptation.md) |
| 40 minutes | [Script](script-40min.md) and [outline](../../outlines/dynamic-scaling-40min.md) |
| 45 minutes | 40-minute route plus five minutes of Q&A |
| 60 minutes | Workshop below |
| 75 minutes | Workshop plus 15-minute peer review |

## Five-minute lightning script

0:00 to 1:00, slide 1. A customer asks for ten images. A chat turn, a crashed worker's retry, a nightly cron and a second browser tab each call the batch tool. Every local limit passes. The provider renders forty. We put the limit on the wrong unit of work.

1:00 to 2:00, slide 4. A prompt that says only run one expensive tool is guidance, not a lock. Every dispatch crosses one shared admission controller that reserves entitlement and spend atomically, enforces provider limits, and queues or rejects what does not fit.

2:00 to 3:15, slide 7. Now the inversion. The orchestrator asks for compute the way it asks for a tool: eight sandboxes, six minutes, this region, this cap. The scheduler resolves it against a catalog and a tenant budget and returns a lease with a teardown. Per-job economics, no idle fleet, and least privilege for free: six minutes, three domains, one credential. The agent chooses; it does not grant.

3:15 to 4:15, slide 8. The substrate exists. Fly.io Sprites create isolated VMs in seconds with egress set from outside. Depot bills sandboxes per second. Modal scales GPUs to zero; Vast.ai rents spare ones cheaply. Cloudflare Durable Objects hold the state that survives everything else being torn down. EC2 Spot is the old version of the idea. None of them ship the ledger. That is still yours.

4:15 to 5:00, slide 14. Inspect one expensive tool in your system. Count the work it can launch underneath itself. Put the limit where that work begins.

## Sixty-minute workshop

| Minutes | Activity | Output |
| --- | --- | --- |
| 0 to 8 | Opening problem and baseline | One recurring workload and its current scaling rule |
| 8 to 20 | Write the batch contract and compute request using contracts.md | Limits, catalog class, cap, lease |
| 20 to 32 | Walk the restart trace in demo.md, including the reclaimed worker | Annotated state transitions |
| 32 to 45 | Score the three candidates against the gates | Each candidate's failed gate |
| 45 to 57 | Combine compatible ideas, then attack the synthesis with a spot reclaim | Revalidation plan and one rejected transition |
| 57 to 60 | Each participant chooses a first change | One bounded experiment |

For 75 minutes, insert a 15-minute peer review before the close. Bring a workload description with sensitive data removed. No paid accounts or live model access required.
