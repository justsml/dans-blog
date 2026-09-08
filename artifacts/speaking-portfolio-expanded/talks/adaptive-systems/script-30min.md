# Conjure Exactly Enough: 30-minute presenter script

Use slides 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 13, 14, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill bounded Story substitutions before delivery; their word and time allowances replace existing prose. Timings are rehearsal targets without Q&A. The walkthrough runs at four minutes. Slides 8 and 12 are cut; their one-sentence bridges are in the script. Slide 3 keeps the inevitability, the pathway arithmetic and the pivot; the --no-agent riff is the first thing to go when compressing.

Budget: 26 spoken minutes (including story substitutions and bridges) + 4 audience minutes = 30. See [per-slide counts](pacing.md); walkthrough time includes its narration.

## 00:00 to 02:00: slide 1, The vendor renamed a field

On screen:

> Yesterday: zip
> Today: postal_code
> Your ingest stops. The status page is green.

The API still returns 200. Authentication works. The vendor's status page is green. Your ingest is broken because somebody renamed a field. A boring way to have an expensive morning.

Here is the promise of this talk. An application can notice that, investigate it, propose a fix, prove the fix, and keep 882 of 900 records moving while eighteen stay quarantined, all before you wake up. That is a fixture target, enforced by scoped tools and independent checks.

The design is mine. The incidents are composites; I have had this exact morning more than once. We will follow one address ingest job through a rename, a change in meaning, and a provider that stops answering.

Story: Replace at most 35 words of this slide's existing prose with the following first-hand example (maximum 20 seconds; never append): The vendor rename you actually lived through. Name the field, the hour you noticed, and what it cost.

Delivery: Hands up for a 200 response that carried a breaking change. Take one story, thirty seconds, and return to the ingest job.

## 02:00 to 03:30: slide 2, The Bar Is a Pager

On screen:

> Baseline: alert, wait for a person, replay
> Agent: investigate, propose, prove, continue
> Win condition: faster recovery, zero new false repairs

Before anyone gets excited about agents, name the boring alternative. A schema diff, an alert, and a human who replays the batch after coffee. It works. It costs a morning per surprise, and it does nothing for the unaffected records that are stuck behind the broken ones.

The agent has to beat that. Not on vibes. On time to recover, on records kept moving, and on a number the baseline gets for free: false repairs. Alert-and-wait never turns a rename into plausible wrong data. If the adaptive version does, even once, it has made operations worse.

Delivery: Write the three metrics on the board and leave them there.

## 03:30 to 07:00: slide 3, Sorry, You're Building It

On screen:

> Browsers, CLIs, every SaaS: an agent layer you opt out of with --no-agent
> 5 reads × 5 writes = 25; add 6 of each: 11 × 11 = 121.
> Accidents first. Then people who mean it.

Zoom out from the ingest job. The assistant with every customer's data and a toolbox that can send email, issue refunds, delete records and ship code is not a design we get to decline. It is arriving one integration at a time, and not only in our products.

I expect CLIs to take English by default, with --no-agent for the old behavior. I know who to blame: the kids. Actually, the kids hate AI.

Count the possible read-to-write pairings. Assume five read tools and five write tools, all allowed to connect: twenty-five. Add one SaaS with six reads and six writes: eleven times eleven, a hundred and twenty-one. Ninety-six new pairings from one integration. Those are potential routes before policy filtering, not ninety-six proven exploits. Nobody reviews the combinations. The dangerous pairing is never on the roadmap. It gets discovered.

So the question is not whether to grant access. It is how many pathways are live at once. The big assistant still exists; it just never has all of its hands full at the same time, because it conjures a small agent per job with exactly enough.

Story: Replace at most 35 words of this slide's existing prose with the following first-hand example (maximum 20 seconds; never append): Your own near miss with an over-permissioned agent, or the tool pairing you only noticed after it fired.

Delivery: Write 5 × 5 = 25 → 11 × 11 = 121 on the board. Ask who could list every read-to-write pathway in the agent they run today. Pause on the third line; let the room feel that the accident case is the common one.

Bridge: most of the damage will be accidents — a confident mapping, a helpful cleanup, a tool called with the wrong ID — and a renamed field is untrusted input read by something that can act.

## 07:00 to 10:30: slide 4, Conjure the agent the job needs

On screen:

> Tailored prompt, minimum tools, hard budget
> Tool search on request, policy decides, request logged
> Orchestrator loops: done, more help, or stop

Here is the shape. An orchestrator reads the failure and writes a job: goal, evidence it may read, actions it may take, deadline, spend, and the conditions that end it. Then it generates an agent for that job with a tailored prompt and only the tools it expects to need. A schema-diff agent gets read access to two samples and a contract. It does not get the database.

If the agent needs something else, it asks. Dynamic tool search lets it discover a tool; policy decides whether this job may have it; the request and the answer are logged whether or not it was granted. That log is the most interesting file in the system. The planner reads untrusted input too. It holds no operational credentials: it proposes a server-defined job class. A trusted dispatcher validates the grant, and every tool rechecks authorization. Log the job, policy version and decision so temporary agents remain auditable.

The orchestrator loops on the result: done, needs another specialist, or must stop. A diff agent hands to a fixture-writer hands to a reviewer, each with its own blast radius, each disposable when finished. Nobody rents a committee every time a CSV arrives — the known mapping runs as code, and only the unfamiliar case conjures anything.

This is a prototype on my own integrations. I am not giving you a success rate today because I do not have one I trust. I can tell you the log of denied tool requests taught me more about my own permissions than any audit.

Story: Replace at most 35 words of this slide's existing prose with the following first-hand example (maximum 20 seconds; never append): What the prototype's first denied tool request was, and what it revealed.

Delivery: Draw the three boxes: orchestrator, generated agent, tool catalog with policy gate. Show one request crossing the gate and being refused.

## 10:30 to 13:00: slide 5, Guard the tools that can hurt

On screen:

> High-risk classes: write, send, pay, delete, deploy, export
> Reads customer data? Then it never posts to a vendor.
> A signed URL is a credential

Two guards do most of the work. First, tools come in risk classes. Read is cheap to grant. Write, send, pay, delete, deploy and export each need their own approval path, and a generated agent gets at most one of them per job. Do not smuggle a destructive migration through a tool called repair mapping.

This is least privilege, written down by Saltzer and Schroeder in 1975. We have been nodding at it for fifty years while shipping service accounts that can do anything. A per-job agent is the first thing I have built where complying is easier than not.

Second, watch the boundary between systems. An agent that can read customer data and an agent that can post to a vendor are two agents, with a filter between them. That is where data leaks: not through the model being evil, but through a tool result flowing into the next tool call.

Source: Saltzer and Schroeder (1975), [The Protection of Information in Computer Systems](https://doi.org/10.1109/PROC.1975.9939), Proceedings of the IEEE 63(9), 1278 to 1308. Least privilege is their principle (f).

Story: Replace at most 35 words of this slide's existing prose with the following first-hand example (maximum 20 seconds; never append): The client setup with local models for sensitive data and a frontier orchestrator. Say which parts were real and which are the stronger design you would build now.

Delivery: Point at the filter between worker and planner. Name the other paths: prompts, traces, error bodies, notification previews. No audience response here.

Bridge: a signed download URL is a bearer credential; handing it to a model while asking the model not to use it is hope, not isolation.

## 13:00 to 14:45: slide 6, Repair syntax; prove meaning

On screen:

> zip → postal_code: investigate
> status: true → pending: stop

Back to the ingest. A name resemblance is a hypothesis, not evidence. A postal code is not always a US ZIP. Keep the leading zero, keep the country, and remember ZIP+4 has a four-digit extension that somebody, somewhere, is joining on.

A Boolean status becoming an enum is harder. Does true mean active, eligible, verified, or anything except cancelled? Pending cannot become true just because both are truthy in JavaScript.

So the generated agent may propose a reversible mapping when evidence supports equivalence, and it must quarantine the rest. An unexplained business-state change goes to an owner with samples and a question. Automatic recovery has somewhere honest to stop. The diff agent never held a write tool.

Delivery: Show {zip:"02108"} and {postal_code:"02108"}, then {status:"pending"}. Ask what evidence is missing in each. Two answers, then move.

## 14:45 to 16:15: slide 7, The repair is a versioned artifact

On screen:

> Input fingerprint + mapping version
> Evidence + fixtures + rollback
> No silent mutation of the database

The proposing agent cannot promote its own repair. It produces a mapping artifact, not a paragraph saying it fixed things. Parent version, input fingerprint, the transforms, the rejected cases, the evidence it read, and the fixture results.

A narrow mapping change can pass a pre-authorized canary policy. A schema migration has a different blast radius and its own approval path. Keep the source records so you can replay; keep the old mapping so you can restore. Rollback changes future processing. It does not un-write yesterday's downstream rows; those need reconciliation.

Delivery: Walk the mapping artifact in contracts.md. Point at parent version, activation scope, replay reference.

Bridge: the repair also has to survive an exam it did not write; the walkthrough shows those fixtures.

## 16:15 to 17:30: slide 9, A lost response leaves a question

On screen:

> Did it fail?
> Or did the answer disappear?

The same ingest calls an address-verification provider. Suppose the provider accepted the batch and charged for it, then the connection dropped. Resubmitting elsewhere recovers latency and doubles the bill.

Record an operation identity before dispatch. Keep the provider's job ID. Reconcile before resubmitting, and when the provider offers no way to ask, stop with an unknown outcome and say so. A deadline ends new dispatch; it does not reverse a side effect already performed. The ledger has to hold that uncertainty, reserved money included, until the answer arrives. The reconciliation job gets status lookup, never pay or submit.

Delivery: Mark the moment on the timeline where your process knows less than the provider does.

## 17:30 to 21:30: slide 10, Walkthrough: one ingest, three decisions

On screen:

> Rename: what did the green check prove?
> Unknown status: who knows what it means?
> Lost response: retry or reconcile?

Run the design. The rename has contract evidence. First show a candidate that converts the postal code through a number and back to a string. Ask what a green type check proves before revealing the input and output. A string-only check passes the lossy proposal. The independent leading-zero fixture rejects it. Only the corrected copy-string mapping, passing the full fixture set, becomes eligible for a canary.

The status change has no semantic evidence. The job isolates affected records, reports what is incomplete, and hands an owner the samples and the exact question.

The provider timeout has an uncertain outcome. The controller queries the saved job ID instead of submitting again, and where it cannot, it holds the unresolved operation and its reservation.

Three events, three different right answers. A two-state dashboard hides the uncertainty.

Delivery: Four-minute route in demo.md (1.75 spoken, 2.25 interaction). Reveal fixtures before expected results. Ask the room for the next decision before showing it.

## 21:30 to 23:15: slide 11, Compute Is a Tool Too

On screen:

> Old: ops sizes the fleet for everyone
> New: the job describes its shape and asks
> Per-customer, per-job cost controls and pay-for-performance

One more thing the orchestrator can conjure: compute. Scaling is still an infra decision made once for everyone — replica counts, instance classes, an autoscaler watching CPU. The agent inverts that. It knows this batch is mostly waiting on a provider, that eight sandboxes for at most two minutes might clear the backlog, and what this customer's plan allows.

So it asks. The request names shape, size, duration and a cost cap, charged to this job rather than a shared cluster. That is a new product surface: a customer buys a faster turnaround, and finance caps one workflow instead of an environment.

Story: Replace at most 35 words of this slide's existing prose with the following first-hand example (maximum 20 seconds; never append): A job where per-customer compute would have changed the pricing conversation.

Delivery: Contrast one autoscaler threshold with one job request. Name which one a customer could be billed for; no audience response.

The compute guard is the tool guard: approved classes and regions, enforced leases and teardown. The mechanics are a companion talk.

## 23:15 to 25:15: slide 13, Widen Per Class, Never Per Streak

On screen:

> Shadow: propose, apply nothing
> Canary: one reversible change class
> Expand: from correct recoveries, false repairs, cost, interventions

Start in shadow mode: the conjured agents propose artifacts and apply none. Then permit one reversible change class, and widen authority per class from evidence about that class. Same discipline for tools and for compute. It is also the loop that tunes its own fan-out: acceptance up and false repairs flat, that job class gets more parallel attempts and a bigger budget; false repairs up, both come down. Tune only recurring, evaluated job classes where the accepted-outcome gain exceeds the added review cost; keep human-owned budget ceilings and a fan-out-one override.

An engineer sees changed authority and unresolved work in one report. Bainbridge, 1983: the human inherits exceptions; keep that digest inspectable. Vaughan, 1996: repeated departures can become normal. A lucky streak is not permission.

Source: Vaughan (1996), The Challenger Launch Decision, University of Chicago Press, on normalization of deviance.

Delivery: Thirty seconds on the recovery card in contracts.md. Take one answer and name the evidence needed to widen that authority.

## 25:15 to 27:30: slide 14, Start smaller: remember what happened

On screen:

> Before returning: check relevant memory and correct known mistakes
> After execution: record checks, outcome, correction and frequency
> Generated, executed and verified are different states
> Memory is evidence, never permission

You do not need the whole agent factory to start. Take one agent that writes SQL or runs shell commands. Give it working memory for this job — goal, constraints, draft, unresolved checks — and observational memory across jobs: what it generated, what actually ran, what failed. Then make it consult that history before it hands you the next answer.

Suppose a reporting query keeps forgetting the tenant filter. It runs perfectly well and reports the wrong population. A preflight check the agent did not write rejects it before dispatch. Record the draft, the failed check, the correction. Next time, retrieve that pattern while the agent is still drafting, fix the omission before returning the SQL, and run the check again. That is adaptive behavior built from one agent and a small log.

Delivery: Show the prompt in memory-pattern.md. Ask which observation proves the query ran and which proves it answered the right question. Use the tenant-filter example; no live execution is needed.

Bridge: remembered output is untrusted data and grants no new permissions; the copyable prompt and record format are in the handout.

## 27:30 to 30:00: slide 15, The next surprise should cost less

On screen:

> Conjure exactly enough
> Prove the repair
> Remember the known case

And return to the assistant with everything. It is still coming; nothing on these slides stops it, and I would not want them to. What changed is how many of its pathways are live at once. Not one agent holding every combination, which nobody can check. Many small ones you can afford to.

Pick one integration that already costs your team mornings. Give it a conjured agent with a bounded way to investigate, a test it did not write, and a place to record what happened. Or start with one reporting agent: keep its execution observations, make it check them before returning work, and measure whether the same mistake comes back. Count the routes you opened. Conjure exactly enough.

Delivery: Land on the third line. Stop talking.
