# Formats: Rethinking parallelization in the agentic era

The refreshed 16-slide [browser deck](../../../reveal-talks/parallelization.html) follows the [40-minute outline](../../outlines/parallelization-40min.md). Legacy PPTX files remain superseded reference exports; use the HTML deck for this revision.

| Slot | Preparation |
| --- | --- |
| 5 minutes | Read the lightning script below; show slides 1, 4, 10, 16 |
| 10 minutes | Lightning script plus the five-minute paper walkthrough in demo.md |
| 15 minutes | [Script](script-15min.md) and [route](../../outlines/parallelization-15min-adaptation.md) |
| 30 minutes | [Script](script-30min.md) and [route](../../outlines/parallelization-30min-adaptation.md) |
| 40 minutes | [Script](script-40min.md) and [outline](../../outlines/parallelization-40min.md) |
| 45 minutes | 40-minute route plus five minutes of Q&A |
| 60 minutes | Workshop below |
| 75 minutes | Workshop plus 15-minute peer review |

## Five-minute lightning script

0:00 to 1:00, slide 1. Your agent is allowed four concurrent tool calls. Your image tool accepts ten prompts and fans them out. Everything obeys its local limit. You now have forty image jobs running for one customer.

1:00 to 2:00, slide 4. A prompt saying only run one expensive tool is useful guidance. It is not a lock. Two conversations, a restarted worker and a scheduled job can all arrive at once.

2:00 to 4:00, slide 10. Start with two callers each requesting a full batch. The first reserves the available entitlement. The second cannot reserve the same balance; it queues or receives an explicit rejection. Now lose one provider response. We keep that item unresolved and keep its reservation. Restart the dispatcher. It reloads the job, checks provider status where supported and collects completed outputs. It does not treat a missing local result as proof that nothing happened. Finally fail the notification. The delivery worker retries the notification against the completed job. Our expensive generation is untouched. That is the abstraction we wanted from the batch tool: one job with a recoverable lifecycle and honest accounting.

4:00 to 5:00, slide 16. Back to the four tool calls. Forty provider jobs were legal according to four local counters. The missing piece was a shared account of what the application had promised and what it had already started. The same discipline applies when the outputs are competing designs. Bound the attempts, preserve their artifacts, judge them against the requirement, and verify the combined result. Parallelism gives us more opportunities to find a good answer. It also gives us more opportunities to spend money without one. Inspect one expensive tool in your system. Count the work it can launch underneath itself. Put the limit where that work actually begins.

Pause on the failure states and point to the corresponding diagram. Rehearse once with a timer; these are target slots, not measured delivery times.

## Sixty-minute workshop

| Minutes | Activity | Output |
| --- | --- | --- |
| 0 to 8 | Opening problem and baseline | One recurring workload |
| 8 to 20 | Write the contract using contracts.md | Goal, evidence, budget, authority, stop |
| 20 to 35 | Walk the failure fixtures in demo.md | Annotated state transitions |
| 35 to 47 | Pairs attack the design with a restart or ambiguous outcome | One rejected unsafe transition |
| 47 to 57 | Define validation and a narrow rollout | Acceptance gates and rollback owner |
| 57 to 60 | Each participant chooses a first change | One bounded experiment |

For 75 minutes, insert a 15-minute peer review before the final three-minute close. Bring a workload description with sensitive data removed. No paid accounts or live model access required. The 10-minute format is a narrated design demonstration; venues requiring a functioning live AI demo need a separately built and validated implementation.
