# Adaptive, agentic apps: bullet outline

Give each job exactly enough agent, prove every repair, and let the app ask for its own scale.

Generated from [the 40-minute outline](../adaptive-systems-40min.md) by `bun artifacts/speaking-portfolio-expanded/bullets.ts`. Edit the outline, not this file. 15 slides, 40 minutes, no Q&A. Every Story line needs Dan's own record before delivery. Shorter routes: [15](../adaptive-systems-15min-adaptation.md) · [30](../adaptive-systems-30min-adaptation.md).

## Spine

1. **The vendor renamed a field** — 00:00 · warm · 02:00
2. **The Bar Is a Pager** — 02:00 · warm · 02:00
3. **Sorry, You're Building It** — 04:00 · build · 04:30
4. **Conjure the agent the job needs** — 08:30 · peak · 03:30
5. **Guard the tools that can hurt** — 12:00 · build · 03:00
6. **Repair syntax; prove meaning** — 15:00 · build · 02:00
7. **The repair is a versioned artifact** — 17:00 · steady · 01:30
8. **The agent does not write its own exam** — 18:30 · steady · 01:30
9. **A lost response leaves a question** — 20:00 · steady · 01:30
10. **Walkthrough: one ingest, three decisions** — 21:30 · peak · 04:30
11. **Compute Is a Tool Too** — 26:00 · build · 02:30
12. **Ironies of Automation** — 28:30 · steady · 03:00
13. **Widen Per Class, Never Per Streak** — 31:30 · land · 02:30
14. **Start smaller: remember what happened** — 34:00 · steady · 03:30
15. **The next surprise should cost less** — 37:30 · land · 02:30

## Slides

### 1. The vendor renamed a field

00:00–02:00 · warm · 02:00

> Yesterday: zip
> Today: postal_code
> Your ingest stops. The status page is green.

- The API still returns 200. Authentication works.
- Here is the promise of this talk. An application can notice that, investigate it, propose a fix, prove the fix, and keep the other ninety-eight percent of records flowing, all before you wake up.
- The design is mine. The incidents are composites; I have had this exact morning more than once.
- Diagram — HTTP success does not establish that the payload still matches your contract.
- Story — The vendor rename you actually lived through. Name the field, the hour you noticed, and what it cost.
- Do — Hands up for a 200 response that carried a breaking change. Take one story, thirty seconds, and return to the ingest job.

### 2. The Bar Is a Pager

02:00–04:00 · warm · 02:00

> Baseline: alert, wait for a person, replay
> Agent: investigate, propose, prove, continue
> Win condition: faster recovery, zero new false repairs

- Before anyone gets excited about agents, name the boring alternative.
- The agent has to beat that. Not on vibes.
- So every slide from here is about buying recovery speed without buying corruption.
- Do — Write the three metrics on the board and leave them there.

### 3. Sorry, You're Building It

04:00–08:30 · build · 04:30

> Browsers, CLIs, every SaaS: an agent layer you opt out of with --no-agent
> Ten tools is forty-five pairs. One more integration is not one more path.
> Accidents first. Then people who mean it.

- Zoom out from the ingest job. The assistant with every customer's data and a toolbox that can send email, issue refunds, delete records and ship code is not a design we get to decline.
- Browsers ship a chat that drives the page.
- Here is the hazard, and it applies to the small systems too.
- Most of the damage will be accidents: a confident mapping, a helpful cleanup, a tool called with the wrong ID.
- So the question is not whether to grant access.
- Diagram — Every integration multiplies the pathways from something the agent can read to something it can do; nobody reviews the combinations.
- Story — Your own near miss with an over-permissioned agent, or the tool pairing you only noticed after it fired.
- Do — Write 10 → 45 on the board. Ask who could list every read-to-write pathway in the agent they run today. Pause on the third line; let the room feel that the accident case is the common one.

### 4. Conjure the agent the job needs

08:30–12:00 · peak · 03:30

> Tailored prompt, minimum tools, hard budget
> Tool search on request, policy decides, request logged
> Orchestrator loops: done, more help, or stop

- Here is the shape. An orchestrator reads the failure and writes a job: goal, evidence it may read, actions it may take, deadline, spend, and the conditions that end it.
- If the agent needs something else, it asks.
- The orchestrator loops on the result: done, needs another specialist, or must stop.
- This is a prototype on my own integrations.
- Diagram — The orchestrator writes a tailored prompt, selects the minimum tools from a catalog, and loops until the job is done or must stop.
- Story — What the prototype's first denied tool request was, and what it revealed.
- Do — Draw the three boxes: orchestrator, generated agent, tool catalog with policy gate. Show one request crossing the gate and being refused.

### 5. Guard the tools that can hurt

12:00–15:00 · build · 03:00

> High-risk classes: write, send, pay, delete, deploy, export
> Reads customer data? Then it never posts to a vendor.
> A signed URL is a credential

- Two guards do most of the work. First, tools come in risk classes.
- This is least privilege, written down by Saltzer and Schroeder in 1975.
- Second, watch the boundary between systems.
- For sensitive processing the planner gets an opaque job reference.
- Diagram — Proposed boundary: the dispatcher grants worker access; only allowlisted status returns to the planner.
- Story — The client setup with local models for sensitive data and a frontier orchestrator. Say which parts were real and which are the stronger design you would build now.
- Do — Point at the filter between worker and planner. Ask what else crosses it: prompts, traces, error bodies, notification previews.
- Source — Saltzer and Schroeder (1975), [The Protection of Information in Computer Systems](https://doi.org/10.1109/PROC.1975.9939), Proceedings of the IEEE 63(9), 1278 to 1308. Least privilege is their principle (f).

### 6. Repair syntax; prove meaning

15:00–17:00 · build · 02:00

> zip → postal_code: investigate
> status: true → pending: stop

- Back to the ingest. A name resemblance is a hypothesis, not evidence.
- A Boolean status becoming an enum is harder.
- So the generated agent may propose a reversible mapping when evidence supports equivalence, and it must quarantine the rest.
- Diagram — A documented rename can preserve meaning; an undefined business state needs an owner.
- Do — Show {zip:"02108"} and {postal_code:"02108"}, then {status:"pending"}. Ask what evidence is missing in each. Two answers, then move.

### 7. The repair is a versioned artifact

17:00–18:30 · steady · 01:30

> Input fingerprint + mapping version
> Evidence + fixtures + rollback
> No silent mutation of the database

- The agent produces a mapping artifact, not a paragraph saying it fixed things.
- A narrow mapping change can pass a pre-authorized canary policy.
- Diagram — Promote a tested mapping within its allowed scope; reconcile writes if you roll back.
- Do — Walk the mapping artifact in contracts.md. Point at parent version, activation scope, replay reference.

### 8. The agent does not write its own exam

18:30–20:00 · steady · 01:30

> Held-out fixtures under separate control
> Conflicting old and new fields
> Watch the denominator

- Here is where we try to embarrass the repair before a customer does.
- Schema validation says the output has the right shape.
- Do — Keep the fixtures hidden. They are revealed in the walkthrough.

### 9. A lost response leaves a question

20:00–21:30 · steady · 01:30

> Did it fail?
> Or did the answer disappear?

- The same ingest calls an address-verification provider.
- Record an operation identity before dispatch.
- Diagram — Reconcile the operation identity before another submission; retain unresolved reservations.
- Do — Mark the moment on the timeline where your process knows less than the provider does.

### 10. Walkthrough: one ingest, three decisions

21:30–26:00 · peak · 04:30

> Rename → validated mapping, canary
> Unknown status → quarantine, owner
> Lost response → reconcile, hold the reservation

- Run the design. The rename has contract evidence.
- The status change has no semantic evidence.
- The provider timeout has an uncertain outcome.
- Three events, three different right answers, none of them success or failure.
- Diagram — Recovery, quarantine and reconciliation are all legitimate outcomes of the same ingest job.
- Do — Five minutes from demo.md. Reveal fixtures before expected results. Ask the room for the next decision before showing it.

### 11. Compute Is a Tool Too

26:00–28:30 · build · 02:30

> Old: ops sizes the fleet for everyone
> New: the job describes its shape and asks
> Per-customer, per-job cost controls and pay-for-performance

- One more thing the orchestrator can conjure: compute.
- So it asks. The request names shape, size, duration and a cost cap, charged to this job rather than a shared cluster.
- The guard is the tool guard. The agent chooses from a catalog of approved instance classes, the scheduler enforces leases and teardown, and an unapproved faster region is not a candidate no matter how good the latency looks.
- Diagram — The orchestrator requests shape, size and duration inside a per-customer ceiling; the scheduler resolves it against a catalog and issues a lease.
- Story — A job where per-customer compute would have changed the pricing conversation.
- Do — Contrast one autoscaler threshold with one job request. Ask which one a customer could be billed for.

### 12. Ironies of Automation

28:30–31:30 · steady · 03:00

> Promoted changes and scope
> Quarantined records and reasons
> Outstanding jobs, reserved spend, denied tool requests
> Owner, evidence, next action

- The daily report should tell an engineer where to look.
- Log decisions and artifacts, not private reasoning: policy inputs, validator result, executed action.
- One warning about that report, and it is the warning for this whole talk.
- Do — Read the sample report in contracts.md. Find the one item that needs an owner today.
- Source — Bainbridge (1983), [Ironies of Automation](https://doi.org/10.1016/0005-1098(83)90046-8), Automatica 19(6), 775 to 779. Skitka, Mosier and Burdick (1999), [Does automation bias decision-making?](https://doi.org/10.1006/ijhc.1999.0252), International Journal of Human-Computer Studies 51(5), 991 to 1006.

### 13. Widen Per Class, Never Per Streak

31:30–34:00 · land · 02:30

> Shadow: propose, apply nothing
> Canary: one reversible change class
> Expand: from correct recoveries, false repairs, cost, interventions

- Compare the design with the static mapping and the pager on the same recorded incidents.
- Start in shadow mode: the conjured agents propose artifacts and apply none.
- Watch for the failure Diane Vaughan documented at NASA before Challenger and named normalization of deviance.
- Do — Thirty seconds on the recovery card in contracts.md. Take one answer and name the evidence needed to widen that authority.
- Source — Vaughan (1996), The Challenger Launch Decision, University of Chicago Press, on normalization of deviance.

### 14. Start smaller: remember what happened

34:00–37:30 · steady · 03:30

> Before returning: check relevant memory and correct known mistakes
> After execution: record checks, outcome, correction and frequency
> Generated, executed and verified are different states
> Memory is evidence, never permission

- You do not need the whole agent factory to start.
- Suppose a reporting query keeps forgetting the tenant filter.
- Keep attempts as well as successes, and the schema version with them, because a command that worked on yesterday's schema is a clue and not a warranty.
- As patterns repeat, turn the reliable ones into tested templates.
- Do — Show the prompt in memory-pattern.md. Ask which observation proves the query ran and which proves it answered the right question. Use the tenant-filter example; no live execution is needed.

### 15. The next surprise should cost less

37:30–40:00 · land · 02:30

> Conjure exactly enough
> Prove the repair
> Remember the known case

- Return to the field that changed overnight.
- And return to the assistant with everything.
- Pick one integration that already costs your team mornings.
- Do — Land on the third line. Stop talking.
