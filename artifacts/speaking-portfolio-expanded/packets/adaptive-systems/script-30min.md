# Adaptive, agentic apps: 30-minute presenter script

Use slides 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 13, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. The walkthrough runs at four and a half minutes. Slides 8, 12 and 14 are cut; their one-sentence bridges are in the script.

## 00:00 to 01:30: slide 1, The vendor renamed a field

The API still returns 200. Authentication works. The vendor's status page is green. Your ingest is broken because somebody renamed a field. If you work around B2B integrations, this is a very boring way to have a very expensive morning.

Here is the promise of this talk. An application can notice that, investigate it, propose a fix, prove the fix, and keep the other ninety-eight percent of records flowing, all before you wake up. And it can do that without ever holding a permission you would be scared to give it.

The design is mine. The incidents are composites; I have had this exact morning more than once. We will follow one address ingest job through a rename, a change in meaning, and a provider that stops answering.

Story: The vendor rename you actually lived through. Name the field, the hour you noticed, and what it cost.

Delivery: Hands up for a 200 response that carried a breaking change. Take one story, thirty seconds, and return to the ingest job.

## 01:30 to 03:00: slide 2, The bar is: diff the schema and page a human

Before anyone gets excited about agents, name the boring alternative. A schema diff, an alert, and a human who replays the batch after coffee. It works. It costs a morning per surprise, and it does nothing for the unaffected records that are stuck behind the broken ones.

The agent has to beat that. Not on vibes. On time to recover, on records kept moving, and on a number the baseline gets for free: false repairs. Alert-and-wait never turns a rename into plausible wrong data. If the adaptive version does, even once, it has made operations worse.

So every slide from here is about buying recovery speed without buying corruption. Keep that trade in your head; it is the whole talk.

Delivery: Write the three metrics on the board and leave them there.

## 03:00 to 05:30: slide 3, Now imagine the assistant that has everything

Zoom out from the ingest job. The thing we are all building toward is an assistant with access to every customer's data and a toolbox that can send email, issue refunds, delete records and ship code. Most of the damage it will ever do will be an accident: a confident mapping, a helpful cleanup, a tool called with the wrong ID.

Then there are the people who mean it. That renamed field could carry a sentence aimed at the model. A vendor payload is untrusted input that now gets read by something that can act.

So the question for the next few years is not whether to give the assistant access. It is which strategies let us give it access and manage the risk. My answer, and what I have been building, is: never build the one assistant that has everything. Conjure a small one for each job, with exactly enough.

Story: Your own near miss with an over-permissioned agent, or a tool call you were glad had a dry-run flag.

Delivery: Pause on the third line. Let the room feel that the accident case is the common one.

## 05:30 to 09:00: slide 4, Conjure the agent the job needs

Here is the shape. An orchestrator reads the failure and writes a job: goal, evidence it may read, actions it may take, deadline, spend, and the conditions that end it. Then it generates an agent for that job with a tailored prompt and only the tools it expects to need. A schema-diff agent gets read access to two samples and a contract. It does not get the database.

If the agent needs something else, it asks. Dynamic tool search lets it discover a tool; policy decides whether this job may have it; the request and the answer are logged whether or not it was granted. That log is the most interesting file in the system.

The orchestrator runs the result through a loop: is the job done, does it need another specialist, or must it stop? A diff agent hands to a fixture-writer agent hands to a reviewer, each with its own blast radius, each disposable when finished. Nobody rents a committee every time a CSV arrives; the known mapping runs as code, and only the unfamiliar case conjures anything.

I have this working as a prototype on my own integrations. I am not going to give you a success rate today, because I do not have one I trust yet. I can tell you the log of denied tool requests taught me more about my own permissions than any audit.

Story: What the prototype's first denied tool request was, and what it revealed.

Delivery: Draw the three boxes: orchestrator, generated agent, tool catalog with policy gate. Show one request crossing the gate and being refused.

## 09:00 to 11:30: slide 5, Guard the tools that can hurt

Two guards do most of the work. First, tools come in risk classes. Read is cheap to grant. Write, send, pay, delete, deploy and export each need their own approval path, and a generated agent gets at most one of them per job. Do not smuggle a destructive migration through a tool called repair mapping.

Second, watch the boundary between systems. An agent that can read customer data and an agent that can post to a vendor are two agents, with a filter between them. That is where data leaks: not through the model being evil, but through a tool result flowing into the next tool call.

For sensitive processing, the planner gets an opaque job reference. A trusted dispatcher grants a local worker scoped access; the worker touches the data; only an allowlisted status comes back. A signed download URL is a bearer credential. Handing it to a model while asking the model not to use it is not isolation, it is hope.

Story: The client setup with local models for sensitive data and a frontier orchestrator. Say which parts were real and which are the stronger design you would build now.

Delivery: Point at the filter between worker and planner. Ask what else crosses it: prompts, traces, error bodies, notification previews.

## 11:30 to 14:00: slide 6, Repair syntax; prove meaning

Back to the ingest. A name resemblance is a hypothesis, not evidence. A postal code is not always a US ZIP. Keep the leading zero, keep the country, and remember ZIP+4 has a four-digit extension that somebody, somewhere, is joining on.

A Boolean status becoming an enum is harder. Does true mean active, eligible, verified, or anything except cancelled? Pending cannot become true just because both are truthy in JavaScript.

So the generated agent may propose a reversible mapping when evidence supports equivalence, and it must quarantine the rest. An unexplained business-state change goes to an owner with samples and a question. Automatic recovery is useful precisely because it has somewhere honest to stop.

Delivery: Show {zip:"02108"} and {postal_code:"02108"}, then {status:"pending"}. Ask what evidence is missing in each. Two answers, then move.

## 14:00 to 15:30: slide 7, The repair is a versioned artifact

The agent produces a mapping artifact, not a paragraph saying it fixed things. Parent version, input fingerprint, the transforms, the rejected cases, the evidence it read, and the fixture results.

A narrow mapping change can pass a pre-authorized canary policy. A schema migration has a different blast radius and its own approval path. Keep the source records so you can replay; keep the old mapping so you can restore. Rollback changes future processing. It does not un-write yesterday's downstream rows; those need reconciliation.

Delivery: Walk the mapping artifact in contracts.md. Point at parent version, activation scope, replay reference.

Bridge: the repair also has to survive an exam it did not write; the walkthrough shows those fixtures.

## 15:30 to 17:00: slide 9, A lost response leaves a question

The same ingest calls an address-verification provider. Suppose the provider accepted the batch and charged for it, then the connection dropped. Resubmitting elsewhere recovers latency and doubles the bill.

Record an operation identity before dispatch. Keep the provider's job ID. Reconcile before resubmitting, and when the provider offers no way to ask, stop with an unknown outcome and say so. A deadline ends new dispatch; it does not reverse a side effect already performed. The ledger has to hold that uncertainty, reserved money included, until the answer arrives.

Delivery: Mark the moment on the timeline where your process knows less than the provider does.

## 17:00 to 21:30: slide 10, Walkthrough: one ingest, three decisions

Run the design. The rename has contract evidence. The conjured diff agent proposes copy-string; now reveal the fixtures one at a time and let the room reject the one that must not be repaired. Passing both, policy permits a canary of that mapping version and the job continues for matching records.

The status change has no semantic evidence. The job isolates affected records, reports what is incomplete, and hands an owner the samples and the exact question.

The provider timeout has an uncertain outcome. The controller queries the saved job ID instead of submitting again, and where it cannot, it holds the unresolved operation and its reservation.

Three events, three different right answers, none of them success or failure. If your dashboard only has two states, it is hiding the most interesting one.

Delivery: Five minutes from demo.md. Reveal fixtures before expected results. Ask the room for the next decision before showing it.

## 21:30 to 24:00: slide 11, Scale becomes something the app asks for

One more thing the orchestrator can conjure: compute. Today scaling is an infra decision made once for everyone. Replica counts, instance classes, an autoscaler watching CPU. The agent inverts that. It knows this batch is mostly waiting on a provider, that eight sandboxes for six minutes would clear the backlog, and what this customer's plan allows.

So it asks. The request names shape, size, duration and a cost cap, and it is charged to this customer or this job rather than to a shared cluster. That is a new product surface: a customer can buy a faster turnaround, and a finance team can cap a single workflow instead of a whole environment.

The guard is the same one we used for tools. The agent chooses from a catalog of approved instance classes; the scheduler enforces leases and teardown; an unapproved faster region is not a candidate no matter how good the latency looks. The mechanics and the ecosystem are a companion talk.

Story: A job where per-customer compute would have changed the pricing conversation.

Delivery: Contrast one autoscaler threshold with one job request. Ask which one a customer could be billed for.

Bridge: whatever the app changed today, an engineer sees it in one report, and authority widens only from measured outcomes.

## 24:00 to 27:00: slide 13, Widen authority only from measured outcomes

Compare the design with the static mapping and the pager on the same recorded incidents. Count recoveries, but also false repairs, dropped records, cost, elapsed time and human corrections. Include the incidents where the right answer was to stop. A model saying ninety percent confident settles nothing.

Start in shadow mode: the conjured agents propose artifacts and apply none. Then permit one reversible change class. Widen authority per class, from evidence about that class. This is the same discipline for tools and for compute.

Delivery: Ninety seconds on the recovery card in contracts.md. Compare two answers for one minute.

Bridge: once a repair is trusted, it becomes code, and the next matching payload never opens an investigation.

## 27:00 to 30:00: slide 15, The next surprise should cost less

Return to the field that changed overnight. We did not predict its spelling. We did define what had to stay true, what evidence a repair needed, which tools this one job could have, and how far the app could go without us.

And return to the assistant with everything. We never built it. We built a factory for small ones, each with a tailored prompt, a short tool list, a hard budget, and a log of every time it asked for more. That is the strategy I believe in for the next few years: not one agent you have to trust, but many you can afford to check.

Pick one integration that already costs your team mornings. Give it a conjured agent with a bounded way to investigate, a test it did not write, and a place to record what happened. That is enough to start.

Delivery: Land on the third line. Stop talking.
