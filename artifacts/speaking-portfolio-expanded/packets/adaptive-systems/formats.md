# Formats: Adaptive, agentic apps

The 15-slide [browser deck](../../../reveal-talks/adaptive-systems.html) follows the [40-minute outline](../../outlines/adaptive-systems-40min.md). Scripts, adaptations and the deck are generated from the outline by `build-talk.ts`; edit the outline, then rebuild.

| Slot | Preparation |
| --- | --- |
| 5 minutes | Lightning script below; slides 1, 3, 4, 15 |
| 10 minutes | Lightning script plus the walkthrough in demo.md |
| 15 minutes | [Script](script-15min.md) and [route](../../outlines/adaptive-systems-15min-adaptation.md) |
| 30 minutes | [Script](script-30min.md) and [route](../../outlines/adaptive-systems-30min-adaptation.md) |
| 40 minutes | [Script](script-40min.md) and [outline](../../outlines/adaptive-systems-40min.md) |
| 45 minutes | 40-minute route plus five minutes of Q&A |
| 60 minutes | Workshop below |
| 75 minutes | Workshop plus 15-minute peer review |

## Five-minute lightning script

0:00 to 1:00, slide 1. The API still returns 200. Authentication works. The status page is green. Your ingest is broken because somebody renamed a field. An app can notice, investigate, propose, prove, and keep the other ninety-eight percent flowing before you wake up, without holding a permission you would be scared to give it.

1:00 to 2:00, slide 3. Zoom out. We are building toward an assistant with every customer's data and tools that email, refund, delete and deploy. Most of its damage will be accidents; some will be people who mean it, and a vendor payload is now untrusted input read by something that can act. Never build that one assistant. Conjure a small one per job.

2:00 to 4:00, slide 4. An orchestrator reads the failure, writes a job with goal, evidence, tools, budget and stop conditions, and generates an agent with a tailored prompt and only the tools it needs. If it needs more, it asks through tool search; policy decides; the answer is logged either way. The orchestrator loops: done, another specialist, or stop. The known mapping runs as code and conjures nothing. The log of denied requests taught me more about my permissions than any audit.

4:00 to 5:00, slide 15. We never built the assistant with everything. We built a factory for small ones with a short tool list, a hard budget, and a log of every time they asked for more. Pick one integration that costs your team mornings. Give it a conjured agent, a test it did not write, and a place to record what happened.

## Sixty-minute workshop

| Minutes | Activity | Output |
| --- | --- | --- |
| 0 to 8 | Opening problem and baseline | One recurring workload and its alert-and-wait cost |
| 8 to 20 | Write the job contract and tool list using contracts.md | Goal, evidence, tools, risk class, budget, stop |
| 20 to 35 | Walk the fixtures in demo.md | Annotated decisions: repair, quarantine, reconcile |
| 35 to 47 | Pairs attack the design: a poisoned payload, an over-broad tool request, a restart | One rejected transition and one denied request |
| 47 to 57 | Define validation, a narrow canary, and a compute request | Acceptance gates, rollback owner, cost cap |
| 57 to 60 | Each participant picks a first change | One bounded experiment |

For 75 minutes, insert a 15-minute peer review before the close. Bring a workload description with sensitive data removed. No paid accounts or live model access required.
