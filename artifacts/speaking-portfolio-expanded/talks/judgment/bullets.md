# Code Is Cheap. Judgment Is Expensive: bullet outline

Protect review capacity by changing arrivals, variance, and utilization.

Generated from [the 40-minute outline](../judgment-40min.md) by `bun artifacts/speaking-portfolio-expanded/bullets.ts`. Edit the outline, not this file. 14 slides, 40 minutes, no Q&A. Every Story line needs Dan's own record before delivery. Shorter routes: [15](../judgment-15min-adaptation.md) · [30](../judgment-30min-adaptation.md).

## Spine

1. **The morning four good implementations arrive** — 00:00 · warm · 02:30
2. **Point at the queue** — 02:30 · warm · 02:30
3. **A queue does not care how you feel about it** — 05:00 · build · 03:00
4. **The stage you didn't speed up** — 08:00 · build · 02:30
5. **You cannot inspect quality in** — 10:30 · build · 02:30
6. **"Add enterprise permissions"** — 13:00 · build · 03:00
7. **A spec reduces variance** — 16:00 · build · 03:00
8. **What review actually catches** — 19:00 · build · 03:00
9. **Demo: the rubber stamp** — 22:00 · peak · 04:00
10. **Do not appoint a crumple zone** — 26:00 · build · 03:00
11. **Essence and accident** — 29:00 · build · 03:00
12. **Three levers on the queue** — 32:00 · build · 03:00
13. **Measure the wait, not the output** — 35:00 · land · 03:00
14. **Knowing when to stop** — 38:00 · land · 02:00

## Slides

### 1. The morning four good implementations arrive

00:00–02:30 · warm · 02:30

> 95% utilized → 19× waiting
> Four plausible implementations. One reviewer.

- Four good implementations arrive before lunch.
- If your organization uses AI to build an infinite feature machine, you have tragically missed the potential of the magic AI genie.
- Here is the scope once: the queue and permission examples are teaching models, not measurements of your team.
- Story — The change that waited longer for review than it took to write. Bring arrival, first-review, and acceptance timestamps.

### 2. Point at the queue

02:30–05:00 · warm · 02:30

> Idea → specification → code → review → release
> Not where it takes skill. Where it sits untouched.

- Where does your work wait? Not where does it take skill.
- A team can have an implementation bottleneck on Monday and a review bottleneck on Friday.
- Draw a boundary around the review system.
- Do — Budget 45 seconds for hands on each stage. Take one answer about where work waits and use it for the diagram.

### 3. A queue does not care how you feel about it

05:00–08:00 · build · 03:00

> Wq ≈ ((ca² + cs²) / 2) × ρ / (1 − ρ) × E[S]
> V = 1: 80% → 4×; 90% → 9×; 95% → 19×

- Kingman's single-server approximation separates three things: variability, utilization, and mean service time.
- Fifteen percentage points of utilization bought nearly five times the wait.
- Little's law gives a separate accounting identity for a stable system: average work in progress equals throughput times average time in the system.
- Diagram — Kingman: queue wait vs reviewer utilization, variability factor one
- Do — Trace the curve and do both divisions. Ask what happens if variability doubles; show that it multiplies the wait too.
- Source — J. F. C. Kingman (1961), [The single server queue in heavy traffic](https://www.cambridge.org/core/journals/mathematical-proceedings-of-the-cambridge-philosophical-society/article/abs/single-server-queue-in-heavy-traffic/81C55BC00A68FE6D5385638AA0B0AF37), 57(4), 902–904. John D. C. Little (1961), [A Proof for the Queuing Formula: L = λW](https://pubsonline.informs.org/doi/abs/10.1287/opre.9.3.383), Operations Research 9(3), 383–387.

### 4. The stage you didn't speed up

08:00–10:30 · build · 02:30

> Fixed-work example: review is 30% of service time
> Infinite generation speed → 1 / 0.30 = 3.33×

- Take a fixed job. Seventy percent of its service time is producing the implementation, thirty percent is review.
- This is Amdahl's argument applied to a sequence of work.
- If you want more than that ceiling, change the remaining work.
- Source — Gene M. Amdahl (1967), [Validity of the single processor approach to achieving large scale computing capabilities](https://doi.org/10.1145/1465482.1465560), AFIPS Spring Joint Computer Conference, 483–485.

### 5. You cannot inspect quality in

10:30–13:00 · build · 02:30

> Fewer arrivals. Smaller surprises.
> Fix the process producing the queue.

- Deming's third point says to stop depending on inspection to achieve quality and build quality into the process.
- Keep review. Change what it receives. An unasked-for abstraction, an unexplained permission change, and a speculative feature all consume the same person's attention.
- Hiring can increase capacity. It is still worth fixing arrivals first.
- Source — W. Edwards Deming (1986), Out of the Crisis, MIT Center for Advanced Engineering Study; Point 3 of the Fourteen Points. Applied to review by the [Deming Institute](https://deming.org/software-code-reviews-from-a-deming-perspective/).

### 6. "Add enterprise permissions"

13:00–16:00 · build · 03:00

> Who can do what, in which tenant?
> What happens when access changes?
> What must never happen?

- Add enterprise permissions. That is the entire request.
- Spend sixty seconds with the person next to you.
- Who can grant a role? Does it apply to one tenant or every tenant?
- We made code cheap and left the question expensive.
- Do — Read the request once. Give pairs sixty seconds here, thirty in the 15-minute cut. Collect two answers, then introduce the tenant and revocation questions.

### 7. A spec reduces variance

16:00–19:00 · build · 03:00

> Actor + tenant + action + resource
> Revocation changes the next decision
> Denied actions leave state unchanged

- For this example, an administrator can grant a role only inside the tenant they administer.
- Those statements produce cases. An admin in tenant A requests a change in A: allow.
- Tie this back to the curve. Clear boundaries reduce the number of interpretations arriving at review.
- Do — Write the three cases beside the request. Keep the cross-tenant case visible in the handout, not beside the later demo’s initial code.

### 8. What review actually catches

19:00–22:00 · build · 03:00

> Understanding is work
> Defect finding · knowledge transfer · alternative designs

- Bacchelli and Bird studied modern code review at Microsoft.
- That gives the review queue more than one job.
- Keep junior engineers in the reasoning. Let them write the acceptance case, explain a rejection, and follow a change through its consequences.
- Do — Spend 45 seconds on how a junior engineer would learn the permission boundary from this change.
- Source — Alberto Bacchelli and Christian Bird (2013), [Expectations, Outcomes, and Challenges of Modern Code Review](https://www.cabird.com/pubs/bacchelli2013eoc.pdf), ICSE 2013.

### 9. Demo: the rubber stamp

22:00–26:00 · peak · 04:00

> canEdit(user, resourceTenant) = user.roles.includes("admin")
> Test: admin user → allowed
> PASS

- Here is the implementation. Here is its test.
- The resource tenant is right there in the signature.
- Would you approve it? Now run the case where that administrator belongs to tenant A and the resource belongs to tenant B.
- The model wrote the test that agrees with the bug.
- Bainbridge asks what automation leaves the operator doing.
- Do — Open contracts.md only after the vote. Run `bun artifacts/speaking-portfolio-expanded/packets/judgment/demo.ts` for PASS, then add `--holdout` for the actual failing assertion. Do not assume the room approves; if someone catches it, ask which evidence caught their attention.
- Source — Lisanne Bainbridge (1983), [Ironies of automation](https://www.sciencedirect.com/science/article/pii/0005109883900468), Automatica 19(6), 775–779. Linda J. Skitka, Kathleen L. Mosier and Mark Burdick (1999), [Does automation bias decision-making?](https://doi.org/10.1006/ijhc.1999.0252), International Journal of Human-Computer Studies 51(5), 991–1006. A flight-simulation task with a monitoring aid, not a code-review trial.

### 10. Do not appoint a crumple zone

26:00–29:00 · build · 03:00

> Responsibility must come with control
> Who accepts, recovers, and maintains?

- Elish calls the human who absorbs blame without enough control a moral crumple zone.
- Can that person stop arrivals? Can they demand another test?
- For the permissions change, name who accepts the behavior, who receives the incident, and who maintains the policy next year.
- Source — Madeleine Clare Elish (2019), [Moral Crumple Zones: Cautionary Tales in Human-Robot Interaction](https://estsjournal.org/index.php/ests/article/download/260/177/), Engaging Science, Technology, and Society 5, 40–60.

### 11. Essence and accident

29:00–32:00 · build · 03:00

> Generating a branch is cheap
> Choosing the permission boundary is still work

- Brooks distinguished the essential conceptual work of software from the accidental difficulty of expressing it in a machine.
- The syntax of the role check is the easy part.
- So invest the saved time in the model of the problem.
- Source — Frederick P. Brooks Jr., [No Silver Bullet: Essence and Accidents of Software Engineering](https://www.cs.unc.edu/techreports/86-020.pdf), UNC technical report, 1986; published in Computer 20(4), 1987, 10–19.

### 12. Three levers on the queue

32:00–35:00 · build · 03:00

> Arrivals: decline work before generating it
> Variance: bounded diffs and explicit behavior
> Utilization: reserve actual review capacity

- Fewer arrivals means deciding which changes should exist, including declining a second implementation after the first already met the need.
- Smaller variance means reducing surprises at review.
- Protect slack by reserving review time and limiting work in progress.

### 13. Measure the wait, not the output

35:00–38:00 · land · 03:00

> Ready → first review → accepted
> Hands-on review time ÷ available review time
> Queue age and escaped defects beside throughput

- Start with timestamps. When was the change ready, when did somebody first inspect it, and when was it accepted?
- Estimate review utilization against time actually available for review, after meetings and incident duty.
- Take forty-five seconds. Estimate yours, or write down the missing measurement.
- Do — Give 45 seconds. Invite one estimate and ask what counted as available time. Do not prescribe a universal utilization threshold.

### 14. Knowing when to stop

38:00–40:00 · land · 02:00

> What should exist? Does it work?
> Is it worth maintaining?

- Back to the curve. The reviewer did not get slower.
- Ninety-five percent utilization is not efficiency.
- Sometimes the right result is a smaller change.
- Diagram — Kingman: queue wait vs reviewer utilization, variability factor one
- Do — Leave the utilization curve up for questions.
