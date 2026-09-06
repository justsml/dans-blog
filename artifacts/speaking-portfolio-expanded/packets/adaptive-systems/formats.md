# Formats: Adaptive, agentic apps

The refreshed 16-slide [browser deck](../../../reveal-talks/adaptive-systems.html) follows the [40-minute outline](../../outlines/adaptive-systems-40min.md). Legacy PPTX files remain superseded reference exports; use the HTML deck for this revision.

| Slot | Preparation |
| --- | --- |
| 5 minutes | Read the lightning script below; show slides 1, 4, 10, 16 |
| 10 minutes | Lightning script plus the five-minute paper walkthrough in demo.md |
| 15 minutes | [Script](script-15min.md) and [route](../../outlines/adaptive-systems-15min-adaptation.md) |
| 30 minutes | [Script](script-30min.md) and [route](../../outlines/adaptive-systems-30min-adaptation.md) |
| 40 minutes | [Script](script-40min.md) and [outline](../../outlines/adaptive-systems-40min.md) |
| 45 minutes | 40-minute route plus five minutes of Q&A |
| 60 minutes | Workshop below |
| 75 minutes | Workshop plus 15-minute peer review |

## Five-minute lightning script

0:00 to 1:00, slide 1. The API still returns 200. Authentication works. The vendor's status page is green. Your ingest is broken because somebody renamed a field. If you work around B2B integrations, this is a very boring way to have a very expensive morning.

1:00 to 2:00, slide 4. A name resemblance is a hypothesis. It is not evidence that two fields mean the same thing. A postal code is not always a US ZIP code. Preserve leading zeros and country context. ZIP+4 has a four-digit extension, and throwing it away is a policy decision.

2:00 to 4:00, slide 10. Let us run the design against three events. The rename has contract evidence and passes both positive and negative fixtures. Our policy permits a canary of that mapping version. The job continues for matching records. The status change lacks semantic evidence. The job isolates affected records, reports what remains incomplete, and gives an owner the samples and the question they need to answer. The provider timeout has an uncertain external outcome. The controller queries the saved job ID instead of submitting another extraction. Where it cannot establish status, it retains the unresolved operation. All three are valid outcomes. If your dashboard only has success and failure, it will hide the most interesting operational state.

4:00 to 5:00, slide 16. Return to the field that changed overnight. We did not predict its spelling. We did define what had to remain true, what evidence a repair needed, and how far the application could go without us. That is the promise I care about. The next surprise costs less attention because the application can do the investigation, preserve the evidence, and either recover within policy or hand us a useful unresolved question. Choose one recurring integration failure. Give an agent a bounded way to investigate it, a test that can reject its proposal, and a place to record what happened. That is enough to start.

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
