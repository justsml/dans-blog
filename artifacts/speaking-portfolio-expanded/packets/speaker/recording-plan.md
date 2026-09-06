# Public recording plan

Two recordings cover most application requirements: one 15–30 minute talk with clear audio and captions at a stable URL, and one five-minute technical demo reel for meetup and AI Tinkerers routes.

## Recording 1: the 25-minute talk

**Pick:** Automating Improvement From Failure. It ranks first on the research shortlist (San Diego Python, Denver DevOps, DeveloperWeek), it has a working offline demo, and it is the talk most engineering programs will ask to preview.

**Cut:** Use the [30-minute adaptation](../../outlines/failure-improvement-30min-adaptation.md) and drop slides 13 and 14 (correlation and the proactive notice) to land at 25 minutes. Keep the guardrail demo at full length.

**Production checklist**

- Record locally, not from a meeting tool. Camera at eye level, lapel or dynamic mic, room treated with soft furnishings.
- Slides exported at 1920×1080 with the amber-on-slate style; speaker inset bottom-right.
- Captions: auto-generate, then correct every technical term by hand. Upload as a sidecar file and burn in for the short reel.
- Host on YouTube unlisted first for review, then public. Mirror the file to the blog under a stable path and link both from the speaker page.
- Add chapter markers at each slide boundary from the outline timings.
- Title card: talk title, name, date. No sponsor or product logos.

## Recording 2: the five-minute demo reel

**Constraint:** AI Tinkerers requires a genuine working demo of something you built, no slides, no pitch. The offline kit is a deterministic replay and does not qualify on its own.

**Candidate demo:** the fail-to-win loop from the failure-improvement talk, run live against a sanitized log export. Show a scheduled agent distilling everything since the last check, classifying the result, filing a ticket with the trace, and proposing a PR that the guardrails hold in review until the holdout passes. Five minutes, one terminal, one browser tab.

**Script (timings are targets)**

| Time | Beat |
| --- | --- |
| 0:00–0:30 | The logs, live. A sanitized export with one real incident buried in noise. |
| 0:30–1:30 | Run the scheduled check by hand. Show the distilled list: distinct failures with count, first and last seen, secrets stripped. |
| 1:30–2:30 | The classify loop tags severity and a security class. The ticket appears in the tracker with the trace attached. |
| 2:30–4:00 | The proposed PR and the three gates. Regression passes, holdout fails, held in review. Fix the holdout, promote. |
| 4:00–5:00 | Rerun the check. The failure is now a known case. One sentence on what changed and what did not, and what a person still has to approve. |

**Build required before recording:** a scheduled agent invocation with a distill skill and a classify skill, a sanitized log export, write access to a ticket tracker, and the gate script. This is a small project, not a slide edit. The kit's `demo-logic.js` documents the intended gate behavior.

## What each recording satisfies

| Application need | Recording 1 | Recording 2 |
| --- | --- | --- |
| "Link to a previous talk" | Yes | Partial |
| "Speaker video or sample" | Yes | Yes |
| AI Tinkerers demo gate | No | Yes |
| Meetup organizer preview | Yes | Yes |
| Education program preview | Weak; record the skeptic talk next | No |
