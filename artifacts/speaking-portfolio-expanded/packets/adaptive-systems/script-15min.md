# Adaptive, agentic apps: 15-minute presenter script

Use slides 1, 3, 4, 5, 6, 10, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. Lightning route: the assistant with everything, the conjured agent, the guarded tools, then the semantic test and a compressed walkthrough.

## 00:00 to 01:00: slide 1, The vendor renamed a field

The API still returns 200. Authentication works. The vendor's status page is green. Your ingest is broken because somebody renamed a field. If you work around B2B integrations, this is a very boring way to have a very expensive morning.

Here is the promise of this talk. An application can notice that, investigate it, propose a fix, prove the fix, and keep the other ninety-eight percent of records flowing, all before you wake up. And it can do that without ever holding a permission you would be scared to give it.

The design is mine. The incidents are composites; I have had this exact morning more than once. We will follow one address ingest job through a rename, a change in meaning, and a provider that stops answering.

Story: The vendor rename you actually lived through. Name the field, the hour you noticed, and what it cost.

Delivery: Hands up for a 200 response that carried a breaking change. Take one story, thirty seconds, and return to the ingest job.

Bridge: the baseline is diff the schema and page a human; the agent has to beat that on time to recover without adding false repairs.

## 01:00 to 03:00: slide 3, Now imagine the assistant that has everything

Zoom out from the ingest job. The thing we are all building toward is an assistant with access to every customer's data and a toolbox that can send email, issue refunds, delete records and ship code. Most of the damage it will ever do will be an accident: a confident mapping, a helpful cleanup, a tool called with the wrong ID.

Then there are the people who mean it. That renamed field could carry a sentence aimed at the model. A vendor payload is untrusted input that now gets read by something that can act.

Story: Your own near miss with an over-permissioned agent, or a tool call you were glad had a dry-run flag.

Delivery: Pause on the third line. Let the room feel that the accident case is the common one.

## 03:00 to 06:00: slide 4, Conjure the agent the job needs

Here is the shape. An orchestrator reads the failure and writes a job: goal, evidence it may read, actions it may take, deadline, spend, and the conditions that end it. Then it generates an agent for that job with a tailored prompt and only the tools it expects to need. A schema-diff agent gets read access to two samples and a contract. It does not get the database.

If the agent needs something else, it asks. Dynamic tool search lets it discover a tool; policy decides whether this job may have it; the request and the answer are logged whether or not it was granted. That log is the most interesting file in the system.

I have this working as a prototype on my own integrations. I am not going to give you a success rate today, because I do not have one I trust yet. I can tell you the log of denied tool requests taught me more about my own permissions than any audit.

Story: What the prototype's first denied tool request was, and what it revealed.

Delivery: Draw the three boxes: orchestrator, generated agent, tool catalog with policy gate. Show one request crossing the gate and being refused.

## 06:00 to 08:00: slide 5, Guard the tools that can hurt

Two guards do most of the work. First, tools come in risk classes. Read is cheap to grant. Write, send, pay, delete, deploy and export each need their own approval path, and a generated agent gets at most one of them per job. Do not smuggle a destructive migration through a tool called repair mapping.

Second, watch the boundary between systems. An agent that can read customer data and an agent that can post to a vendor are two agents, with a filter between them. That is where data leaks: not through the model being evil, but through a tool result flowing into the next tool call.

For sensitive processing, the planner gets an opaque job reference. A trusted dispatcher grants a local worker scoped access; the worker touches the data; only an allowlisted status comes back. A signed download URL is a bearer credential. Handing it to a model while asking the model not to use it is not isolation, it is hope.

Story: The client setup with local models for sensitive data and a frontier orchestrator. Say which parts were real and which are the stronger design you would build now.

Delivery: Point at the filter between worker and planner. Ask what else crosses it: prompts, traces, error bodies, notification previews.

## 08:00 to 10:00: slide 6, Repair syntax; prove meaning

Back to the ingest. A name resemblance is a hypothesis, not evidence. A postal code is not always a US ZIP. Keep the leading zero, keep the country, and remember ZIP+4 has a four-digit extension that somebody, somewhere, is joining on.

A Boolean status becoming an enum is harder. Does true mean active, eligible, verified, or anything except cancelled? Pending cannot become true just because both are truthy in JavaScript.

So the generated agent may propose a reversible mapping when evidence supports equivalence, and it must quarantine the rest. An unexplained business-state change goes to an owner with samples and a question. Automatic recovery is useful precisely because it has somewhere honest to stop.

Delivery: Show {zip:"02108"} and {postal_code:"02108"}, then {status:"pending"}. Ask what evidence is missing in each. Two answers, then move.

Bridge: a repair ships as a versioned artifact with a rollback, and it has to pass fixtures it did not write.

## 10:00 to 13:30: slide 10, Walkthrough: one ingest, three decisions

Run the design. The rename has contract evidence. The conjured diff agent proposes copy-string; now reveal the fixtures one at a time and let the room reject the one that must not be repaired. Passing both, policy permits a canary of that mapping version and the job continues for matching records.

The status change has no semantic evidence. The job isolates affected records, reports what is incomplete, and hands an owner the samples and the exact question.

The provider timeout has an uncertain outcome. The controller queries the saved job ID instead of submitting again, and where it cannot, it holds the unresolved operation and its reservation.

Delivery: Five minutes from demo.md. Reveal fixtures before expected results. Ask the room for the next decision before showing it.

Bridge: the same orchestrator can ask for its own scale inside a per-customer budget; that is a companion talk.

## 13:30 to 15:00: slide 15, The next surprise should cost less

Return to the field that changed overnight. We did not predict its spelling. We did define what had to stay true, what evidence a repair needed, which tools this one job could have, and how far the app could go without us.

And return to the assistant with everything. We never built it. We built a factory for small ones, each with a tailored prompt, a short tool list, a hard budget, and a log of every time it asked for more. That is the strategy I believe in for the next few years: not one agent you have to trust, but many you can afford to check.

Pick one integration that already costs your team mornings. Give it a conjured agent with a bounded way to investigate, a test it did not write, and a place to record what happened. That is enough to start.

Delivery: Land on the third line. Stop talking.
