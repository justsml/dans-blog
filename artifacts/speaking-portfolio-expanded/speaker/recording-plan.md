# Public recording plan

Two recordings cover most application requirements: one 15–30 minute talk with clear audio and captions at a stable URL, and one five-minute technical demo reel for meetup and AI Tinkerers routes.

## Recording 1: the 30-minute talk

**Pick:** The Pager Cried Wolf. It ranks first on the research shortlist (San Diego Python, Denver DevOps, DeveloperWeek), its supporting example is specified in [demo.md](../talks/failure-improvement/demo.md) and not yet built, and it is the talk most engineering programs will ask to preview.

**Cut:** Use the current [30-minute adaptation](../talks/failure-improvement/adaptation-30min.md) and its [presenter script](../talks/failure-improvement/script-30min.md). The former 25-minute cut depended on superseded slide times and is withdrawn. Follow the route’s speech and interaction budgets; do not subtract slide durations from the old edition.

**Readiness:** the hand-authored deck has not been rebuilt; live integration and first-hand evidence remain prerequisites for this recording plan. Supply only the stories named and budgeted in the route. A static fixture supports the talk, but does not demonstrate an executed production integration.

**Production checklist**

- Record locally, not from a meeting tool. Camera at eye level, lapel or dynamic mic, room treated with soft furnishings.
- Slides exported at 1920×1080 with the amber-on-slate style; speaker inset bottom-right.
- Captions: auto-generate, then correct every technical term by hand. Upload as a sidecar file and burn in for the short reel.
- Host on YouTube unlisted first for review, then public. Mirror the file to the blog under a stable path and link both from the speaker page.
- Add chapter markers at each slide boundary from the outline timings.
- Title card: talk title, name, date. No sponsor or product logos.

## Recording 2: the five-minute demo reel

**Constraint:** For opportunities whose current rules require a genuine working demonstration, prepare an executed demo with no slides or pitch and verify that venue’s requirements before submission. This is a separate submission format built from the supporting repository.

**Candidate demo:** the fail-to-win loop from the failure-improvement talk, run live against a sanitized log export. Show a scheduled agent distilling everything since the last check, classifying the result, filing a ticket with the trace, and proposing a PR that the guardrails hold in review until the holdout passes. Five minutes, one terminal, one browser tab.

**Script (timings are targets)**

| Time | Beat |
| --- | --- |
| 0:00–0:30 | The logs, live. A sanitized export with one real incident buried in noise. |
| 0:30–1:30 | Run the scheduled check by hand. Show the distilled list: distinct failures with count, first and last seen, secrets stripped. |
| 1:30–2:30 | The classify loop tags severity and a security class. The ticket appears in the tracker with the trace attached. |
| 2:30–4:00 | The proposed PR and the three gates. Regression passes, holdout fails, held in review. Fix the candidate to satisfy the unchanged holdout; rerun before promotion. |
| 4:00–5:00 | Rerun the check. The failure is now a known case. One sentence on what changed and what did not, and what a person still has to approve. |

**Supporting repository required before recording:** a scheduled agent invocation with distill and classify steps, a sanitized log fixture, an isolated ticket fixture, and the gate script. The talk references captured output from that repository.

## Intended application use once recordings exist

| Application need | Recording 1 | Recording 2 |
| --- | --- | --- |
| "Link to a previous talk" | Yes | Partial |
| "Speaker video or sample" | Yes | Yes |
| AI Tinkerers demo gate | No | Yes |
| Meetup organizer preview | Yes | Yes |
| Education program preview | Weak; record Outsmart or its procurement route next | No |
