# Adaptive, agentic apps: 30-minute presenter script

Use slides 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 13, 14, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. The walkthrough runs at four minutes. Slides 8 and 12 are cut; their one-sentence bridges are in the script. Slide 3 keeps the inevitability, the pathway arithmetic and the pivot; the --no-agent riff is the first thing to go when compressing.

## 00:00 to 02:00: slide 1, The vendor renamed a field

On screen:

> Yesterday: zip
> Today: postal_code
> Your ingest stops. The status page is green.

The API still returns 200. Authentication works. The vendor's status page is green. Your ingest is broken because somebody renamed a field. If you work around B2B integrations, this is a very boring way to have a very expensive morning.

Here is the promise of this talk. An application can notice that, investigate it, propose a fix, prove the fix, and keep the other ninety-eight percent of records flowing, all before you wake up. And it can do that without ever holding a permission you would be scared to give it.

The design is mine. The incidents are composites; I have had this exact morning more than once. We will follow one address ingest job through a rename, a change in meaning, and a provider that stops answering.

Story: The vendor rename you actually lived through. Name the field, the hour you noticed, and what it cost.

Delivery: Hands up for a 200 response that carried a breaking change. Take one story, thirty seconds, and return to the ingest job.

## 02:00 to 03:30: slide 2, The Bar Is a Pager

On screen:

> Baseline: alert, wait for a person, replay
> Agent: investigate, propose, prove, continue
> Win condition: faster recovery, zero new false repairs

Before anyone gets excited about agents, name the boring alternative. A schema diff, an alert, and a human who replays the batch after coffee. It works. It costs a morning per surprise, and it does nothing for the unaffected records that are stuck behind the broken ones.

The agent has to beat that. Not on vibes. On time to recover, on records kept moving, and on a number the baseline gets for free: false repairs. Alert-and-wait never turns a rename into plausible wrong data. If the adaptive version does, even once, it has made operations worse.

Delivery: Write the three metrics on the board and leave them there.

## 03:30 to 07:15: slide 3, Sorry, You're Building It

On screen:

> Browsers, CLIs, every SaaS: an agent layer you opt out of with --no-agent
> Ten tools is forty-five pairs. One more integration is not one more path.
> Accidents first. Then people who mean it.

Zoom out from the ingest job. The assistant with every customer's data and a toolbox that can send email, issue refunds, delete records and ship code is not a design we get to decline. It is arriving one integration at a time, and not only in our products.

So here is the hazard, and it applies to the small systems too. Risk does not grow with the number of tools. It grows with the number of pathways between them, and every integration multiplies those. Ten tools is forty-five pairs before you count chains. Plug in one SaaS with a dozen endpoints and you did not add twelve capabilities; you added hundreds of routes from something the agent can read to something it can do. Nobody reviews those combinations. Not your security team, not the model, not you at three in the morning. The dangerous pairing is never on the roadmap. It gets discovered.

So the question is not whether to give the assistant access. It is how to keep the number of live pathways small enough to reason about, one job at a time. That is what the rest of this talk builds. The big assistant still exists. It just never has all of its hands full at once: it conjures a small agent per job, with exactly enough.

Story: Your own near miss with an over-permissioned agent, or the tool pairing you only noticed after it fired.

Delivery: Write 10 → 45 on the board. Ask who could list every read-to-write pathway in the agent they run today. Pause on the third line; let the room feel that the accident case is the common one.

Bridge: most of the damage will be accidents — a confident mapping, a helpful cleanup, a tool called with the wrong ID — and a renamed field is untrusted input read by something that can act.

## 07:15 to 10:45: slide 4, Conjure the agent the job needs

On screen:

> Tailored prompt, minimum tools, hard budget
> Tool search on request, policy decides, request logged
> Orchestrator loops: done, more help, or stop

Here is the shape. An orchestrator reads the failure and writes a job: goal, evidence it may read, actions it may take, deadline, spend, and the conditions that end it. Then it generates an agent for that job with a tailored prompt and only the tools it expects to need. A schema-diff agent gets read access to two samples and a contract. It does not get the database.

If the agent needs something else, it asks. Dynamic tool search lets it discover a tool; policy decides whether this job may have it; the request and the answer are logged whether or not it was granted. That log is the most interesting file in the system.

The orchestrator runs the result through a loop: is the job done, does it need another specialist, or must it stop? A diff agent hands to a fixture-writer agent hands to a reviewer, each with its own blast radius, each disposable when finished. Nobody rents a committee every time a CSV arrives; the known mapping runs as code, and only the unfamiliar case conjures anything.

I have this working as a prototype on my own integrations. I am not going to give you a success rate today, because I do not have one I trust yet. I can tell you the log of denied tool requests taught me more about my own permissions than any audit.

Story: What the prototype's first denied tool request was, and what it revealed.

Delivery: Draw the three boxes: orchestrator, generated agent, tool catalog with policy gate. Show one request crossing the gate and being refused.

## 10:45 to 13:15: slide 5, Guard the tools that can hurt

On screen:

> High-risk classes: write, send, pay, delete, deploy, export
> Reads customer data? Then it never posts to a vendor.
> A signed URL is a credential

Two guards do most of the work. First, tools come in risk classes. Read is cheap to grant. Write, send, pay, delete, deploy and export each need their own approval path, and a generated agent gets at most one of them per job. Do not smuggle a destructive migration through a tool called repair mapping.

This is least privilege, and Saltzer and Schroeder wrote it down in 1975: every program runs with the least set of privileges the job needs. We have all been nodding at that for fifty years and shipping service accounts that can do anything. A per-job agent is the first thing I have built where complying is genuinely easier than not.

Second, watch the boundary between systems. An agent that can read customer data and an agent that can post to a vendor are two agents, with a filter between them. That is where data leaks: not through the model being evil, but through a tool result flowing into the next tool call.

Source: Saltzer and Schroeder (1975), [The Protection of Information in Computer Systems](https://doi.org/10.1109/PROC.1975.9939), Proceedings of the IEEE 63(9), 1278 to 1308. Least privilege is their principle (f).

Story: The client setup with local models for sensitive data and a frontier orchestrator. Say which parts were real and which are the stronger design you would build now.

Delivery: Point at the filter between worker and planner. Ask what else crosses it: prompts, traces, error bodies, notification previews.

Bridge: a signed download URL is a bearer credential; handing it to a model while asking the model not to use it is hope, not isolation.

## 13:15 to 15:00: slide 6, Repair syntax; prove meaning

On screen:

> zip → postal_code: investigate
> status: true → pending: stop

Back to the ingest. A name resemblance is a hypothesis, not evidence. A postal code is not always a US ZIP. Keep the leading zero, keep the country, and remember ZIP+4 has a four-digit extension that somebody, somewhere, is joining on.

A Boolean status becoming an enum is harder. Does true mean active, eligible, verified, or anything except cancelled? Pending cannot become true just because both are truthy in JavaScript.

So the generated agent may propose a reversible mapping when evidence supports equivalence, and it must quarantine the rest. An unexplained business-state change goes to an owner with samples and a question. Automatic recovery is useful precisely because it has somewhere honest to stop.

Delivery: Show {zip:"02108"} and {postal_code:"02108"}, then {status:"pending"}. Ask what evidence is missing in each. Two answers, then move.

## 15:00 to 16:15: slide 7, The repair is a versioned artifact

On screen:

> Input fingerprint + mapping version
> Evidence + fixtures + rollback
> No silent mutation of the database

The agent produces a mapping artifact, not a paragraph saying it fixed things. Parent version, input fingerprint, the transforms, the rejected cases, the evidence it read, and the fixture results.

A narrow mapping change can pass a pre-authorized canary policy. A schema migration has a different blast radius and its own approval path. Keep the source records so you can replay; keep the old mapping so you can restore. Rollback changes future processing. It does not un-write yesterday's downstream rows; those need reconciliation.

Delivery: Walk the mapping artifact in contracts.md. Point at parent version, activation scope, replay reference.

Bridge: the repair also has to survive an exam it did not write; the walkthrough shows those fixtures.

## 16:15 to 17:30: slide 9, A lost response leaves a question

On screen:

> Did it fail?
> Or did the answer disappear?

The same ingest calls an address-verification provider. Suppose the provider accepted the batch and charged for it, then the connection dropped. Resubmitting elsewhere recovers latency and doubles the bill.

Record an operation identity before dispatch. Keep the provider's job ID. Reconcile before resubmitting, and when the provider offers no way to ask, stop with an unknown outcome and say so. A deadline ends new dispatch; it does not reverse a side effect already performed. The ledger has to hold that uncertainty, reserved money included, until the answer arrives.

Delivery: Mark the moment on the timeline where your process knows less than the provider does.

## 17:30 to 21:30: slide 10, Walkthrough: one ingest, three decisions

On screen:

> Rename → validated mapping, canary
> Unknown status → quarantine, owner
> Lost response → reconcile, hold the reservation

Run the design. The rename has contract evidence. The conjured diff agent proposes copy-string; now reveal the fixtures one at a time and let the room reject the one that must not be repaired. Passing both, policy permits a canary of that mapping version and the job continues for matching records.

The status change has no semantic evidence. The job isolates affected records, reports what is incomplete, and hands an owner the samples and the exact question.

The provider timeout has an uncertain outcome. The controller queries the saved job ID instead of submitting again, and where it cannot, it holds the unresolved operation and its reservation.

Three events, three different right answers, none of them success or failure. If your dashboard only has two states, it is hiding the most interesting one.

Delivery: Five minutes from demo.md. Reveal fixtures before expected results. Ask the room for the next decision before showing it.

## 21:30 to 23:15: slide 11, Compute Is a Tool Too

On screen:

> Old: ops sizes the fleet for everyone
> New: the job describes its shape and asks
> Per-customer, per-job cost controls and pay-for-performance

One more thing the orchestrator can conjure: compute. Today scaling is an infra decision made once for everyone. Replica counts, instance classes, an autoscaler watching CPU. The agent inverts that. It knows this batch is mostly waiting on a provider, that eight sandboxes for six minutes would clear the backlog, and what this customer's plan allows.

So it asks. The request names shape, size, duration and a cost cap, and it is charged to this customer or this job rather than to a shared cluster. That is a new product surface: a customer can buy a faster turnaround, and a finance team can cap a single workflow instead of a whole environment.

Story: A job where per-customer compute would have changed the pricing conversation.

Delivery: Contrast one autoscaler threshold with one job request. Ask which one a customer could be billed for.

Bridge: the compute guard is the tool guard — an approved catalog, enforced leases, and no unapproved region no matter how good the latency looks. Whatever the app changed today, an engineer sees it in one report, and authority widens only from measured outcomes on the same recorded incidents: recoveries, but also false repairs, dropped records, cost and human corrections.

## 23:15 to 25:15: slide 13, Widen Per Class, Never Per Streak

On screen:

> Shadow: propose, apply nothing
> Canary: one reversible change class
> Expand: from correct recoveries, false repairs, cost, interventions

Start in shadow mode: the conjured agents propose artifacts and apply none. Then permit one reversible change class. Widen authority per class, from evidence about that class. This is the same discipline for tools and for compute. It is also the loop that lets the system adjust its own fan-out and token burn from measured acceptance: acceptance up and false repairs flat, that job class gets more parallel attempts and a bigger budget; false repairs up, both come down.

Watch for the failure Diane Vaughan documented at NASA before Challenger and named normalization of deviance. Every widening is locally reasonable. Each one cites the last one as precedent. Nobody ever decides to be reckless. That is exactly why authority expands per class and from measured outcomes for that class, and never from how the last six went.

Source: Vaughan (1996), The Challenger Launch Decision, University of Chicago Press, on normalization of deviance.

Delivery: Thirty seconds on the recovery card in contracts.md. Take one answer and name the evidence needed to widen that authority.

## 25:15 to 27:30: slide 14, Start smaller: remember what happened

On screen:

> Before returning: check relevant memory and correct known mistakes
> After execution: record checks, outcome, correction and frequency
> Generated, executed and verified are different states
> Memory is evidence, never permission

You do not need the whole agent factory to start. Take one agent that writes SQL, builds reports, runs shell commands or generates scripted API actions. Give it working memory for this job: the goal, constraints, draft and unresolved checks. Give it observational memory across jobs: what it generated, what actually ran, what failed, and what the checks established. Now ask it to consult that history before it hands you the next answer.

Suppose a reporting query keeps forgetting the tenant filter. It runs perfectly well; it reports the wrong population. An independent preflight check rejects it before dispatch. Record the draft, the failed check, the correction and the eventual result. Next time, retrieve that pattern while the agent is still drafting. Fix the omission before returning the SQL, then run the check again. That is adaptive behavior you can build with one agent and a small log.

Delivery: Show the prompt in memory-pattern.md. Ask which observation proves the query ran and which proves it answered the right question. Use the tenant-filter example; no live execution is needed.

Bridge: remembered output is untrusted data and grants no new permissions; the copyable prompt and record format are in the handout.

## 27:30 to 30:00: slide 15, The next surprise should cost less

On screen:

> Conjure exactly enough
> Prove the repair
> Remember the known case

And return to the assistant with everything. It is still coming; nothing on these slides stops it, and I would not want to. What changed is how many of its pathways are live at once. Each job gets a small agent with a tailored prompt, a short tool list, a hard budget, and a log of every time it asked for more. That is the strategy I believe in for the next few years: not one agent holding every combination, which nobody can check, but many small ones you can afford to.

Pick one integration that already costs your team mornings. Give it a conjured agent with a bounded way to investigate, a test it did not write, and a place to record what happened. Or start with one reporting agent: keep its execution observations, make it check them before returning work, and measure whether the same mistake comes back. That is enough to start.

Delivery: Land on the third line. Stop talking.
