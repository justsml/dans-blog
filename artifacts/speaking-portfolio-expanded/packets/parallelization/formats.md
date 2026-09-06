# Formats: Rethinking parallelization in the agentic era

The refreshed 16-slide [browser deck](../../../reveal-talks/parallelization.html) follows the [40-minute outline](../../outlines/parallelization-40min.md). Use the HTML deck for presentation.

| Slot | Preparation |
| --- | --- |
| 5 minutes | Read the lightning script below; show slides 1, 4, 8, 11, 13, 16 |
| 10 minutes | Lightning script plus the five-minute paper walkthrough in demo.md |
| 15 minutes | [Script](script-15min.md) and [route](../../outlines/parallelization-15min-adaptation.md) |
| 30 minutes | [Script](script-30min.md) and [route](../../outlines/parallelization-30min-adaptation.md) |
| 40 minutes | [Script](script-40min.md) and [outline](../../outlines/parallelization-40min.md) |
| 45 minutes | 40-minute route plus five minutes of Q&A |
| 60 minutes | Workshop below |
| 75 minutes | Workshop plus 15-minute peer review |

## Five-minute lightning script

0:00 to 0:45, slide 1. Your agent is allowed four concurrent tool calls. Each batch tool accepts ten prompts. Every local limit passes, and forty provider jobs start for a customer who bought ten. Count the work underneath the call.

0:45 to 1:30, slide 4. A prompt asking the model to coordinate cannot stop two conversations and a scheduled job from spending the same balance. Every dispatch crosses shared admission. Reserve entitlement and spend atomically, enforce provider limits, and queue or reject work that does not fit.

1:30 to 2:30, slide 8. A long-running batch needs persisted item state and a stable job identity. A local timeout does not prove the provider rejected the job. Reconcile uncertain acceptance before resubmitting. Keep notification state separate so an email retry never regenerates the images.

2:30 to 3:30, slide 11. Now run complete design attempts in parallel. Give a minimalist, a maintainer and a security/performance reviewer the same requirements, separate first drafts and one shared budget. Their differing priorities may expose tradeoffs. They can still share a blind spot.

3:30 to 4:30, slide 13. Judge candidates against requirements declared in advance. Reject failures before comparing preferences. If you combine the small interface from one candidate with the recovery design from another, that combination is a new candidate. Resolve incompatible assumptions and run the gates again.

4:30 to 5:00, slide 16. Bound the work, preserve the artifacts, and verify the accepted result. Inspect one expensive tool. Count what it can launch underneath itself, and put the limit where that work begins.

Pause on the fan-out, job-state and synthesis diagrams. The five-minute route retains both execution parallelism and independent solution attempts. Timings are rehearsal targets.

## Sixty-minute workshop

| Minutes | Activity | Output |
| --- | --- | --- |
| 0 to 8 | Opening problem and baseline | One recurring workload |
| 8 to 20 | Write the contract using contracts.md | Goal, evidence, budget, authority, stop |
| 20 to 32 | Walk the batch failure fixtures in demo.md | Annotated state transitions |
| 32 to 45 | Compare the three candidate designs against the fixed rubric | Rejected candidate and evidence |
| 45 to 57 | Combine compatible ideas, then attack the synthesis with a restart | Revalidation plan and one rejected transition |
| 57 to 60 | Each participant chooses a first change | One bounded experiment |

For 75 minutes, insert a 15-minute peer review before the final three-minute close. Bring a workload description with sensitive data removed. No paid accounts or live model access required. The 10-minute format is a narrated design demonstration; venues requiring a functioning live AI demo need a separately built and validated implementation.
