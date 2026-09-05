# Public recording plan

Two recordings cover most application requirements: one 15–30 minute talk with clear audio and captions at a stable URL, and one five-minute technical demo reel for meetup and AI Tinkerers routes.

## Recording 1: the 25-minute talk

**Pick:** Automating Improvement From Failure. It ranks first on the research shortlist (San Diego Python, Denver DevOps, DeveloperWeek), it has a working offline demo, and it is the talk most engineering programs will ask to preview.

**Cut:** Use the [30-minute adaptation](../../outlines/failure-improvement-30min-adaptation.md) and drop slides 12 and 13 (GEPA/DSPy and the managed stack) to land at 25 minutes. Keep the demo at full length.

**Production checklist**

- Record locally, not from a meeting tool. Camera at eye level, lapel or dynamic mic, room treated with soft furnishings.
- Slides exported at 1920×1080 with the amber-on-slate style; speaker inset bottom-right.
- Captions: auto-generate, then correct every technical term by hand. Upload as a sidecar file and burn in for the short reel.
- Host on YouTube unlisted first for review, then public. Mirror the file to the blog under a stable path and link both from the speaker page.
- Add chapter markers at each slide boundary from the outline timings.
- Title card: talk title, name, date. No sponsor or product logos.

## Recording 2: the five-minute demo reel

**Constraint:** AI Tinkerers requires a genuine working demo of something you built, no slides, no pitch. The offline kit is a deterministic replay and does not qualify on its own.

**Candidate demo:** the readiness-check loop from the failure-improvement talk, run live. Show a real agent session hitting the connection-refused error, the post-tool hook writing the case record, the trigram lookup retrieving the prior case, and the promotion gate blocking until the holdout passes. Five minutes, one terminal, one browser tab.

**Script (timings are targets)**

| Time | Beat |
| --- | --- |
| 0:00–0:30 | The failure, live. Run the tests while the database is starting. Red. |
| 0:30–1:30 | The hook fires. Show the case record it wrote, secrets stripped. |
| 1:30–2:30 | Second session, different port. The lookup finds the prior case. Show the applicability filter rejecting the permission-denied case. |
| 2:30–4:00 | The candidate patch and the three gates. Regression passes, holdout fails, promotion blocked. Fix the holdout, promote. |
| 4:00–5:00 | Rerun the original command. Green, with the readiness check in the log. One sentence on what changed and what did not. |

**Build required before recording:** a real harness with hooks, a case store with pg_trgm, and the gate script. This is a small project, not a slide edit. The kit's `demo-logic.js` documents the intended behavior.

## What each recording satisfies

| Application need | Recording 1 | Recording 2 |
| --- | --- | --- |
| "Link to a previous talk" | Yes | Partial |
| "Speaker video or sample" | Yes | Yes |
| AI Tinkerers demo gate | No | Yes |
| Meetup organizer preview | Yes | Yes |
| Education program preview | Weak; record the skeptic talk next | No |
