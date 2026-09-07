# Adaptive, agentic apps: 15-minute presenter script

Use slides 1, 3, 4, 5, 6, 10, 14, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. Lightning route: the assistant with everything and its pathway explosion, the conjured agent, the guarded tools, then the semantic test a compressed walkthrough, and one agent with an execution memory.

## 00:00 to 01:00: slide 1, The vendor renamed a field

On screen:

> Yesterday: zip
> Today: postal_code
> Your ingest stops. The status page is green.

The API still returns 200. Authentication works. The vendor's status page is green. Your ingest is broken because somebody renamed a field. If you work around B2B integrations, this is a very boring way to have a very expensive morning.

Here is the promise of this talk. An application can notice that, investigate it, propose a fix, prove the fix, and keep the other ninety-eight percent of records flowing, all before you wake up. And it can do that without ever holding a permission you would be scared to give it.

The design is mine. The incidents are composites; I have had this exact morning more than once. We will follow one address ingest job through a rename, a change in meaning, and a provider that stops answering.

Story: The vendor rename you actually lived through. Name the field, the hour you noticed, and what it cost.

Delivery: Hands up for a 200 response that carried a breaking change. Take one story, thirty seconds, and return to the ingest job.

Bridge: the baseline is diff the schema and page a human; the agent has to beat that on time to recover without adding false repairs.

## 01:00 to 02:30: slide 3, Sorry, You're Building It

On screen:

> Browsers, CLIs, every SaaS: an agent layer you opt out of with --no-agent
> Ten tools is forty-five pairs. One more integration is not one more path.
> Accidents first. Then people who mean it.

Zoom out from the ingest job. The assistant with every customer's data and a toolbox that can send email, issue refunds, delete records and ship code is not a design we get to decline. It is arriving one integration at a time, and not only in our products. Browsers now ship a chat that drives the page. WebMCP lets an agent act on any site that opts in, and the list of sites that opt in only goes one direction. The next generation of CLIs will take natural language by default, and you will pass `--no-agent` to get the old behavior back. The intermediary intelligence layer is going to wrap everything, and I know who to blame: the kids. Actually, the kids hate AI. It will be their kids who demand an agent safety blanket on everything. I will be in a rocking chair explaining that the internet was better on vinyl.

So here is the hazard, and it applies to the small systems too. Risk does not grow with the number of tools. It grows with the number of pathways between them, and every integration multiplies those. Ten tools is forty-five pairs before you count chains. Plug in one SaaS with a dozen endpoints and you did not add twelve capabilities; you added hundreds of routes from something the agent can read to something it can do. Nobody reviews those combinations. Not your security team, not the model, not you at three in the morning. The dangerous pairing is never on the roadmap. It gets discovered.

So the question is not whether to give the assistant access. It is how to keep the number of live pathways small enough to reason about, one job at a time. That is what the rest of this talk builds. The big assistant still exists. It just never has all of its hands full at once: it conjures a small agent per job, with exactly enough.

Story: Your own near miss with an over-permissioned agent, or the tool pairing you only noticed after it fired.

Delivery: Write 10 → 45 on the board. Ask who could list every read-to-write pathway in the agent they run today. Pause on the third line; let the room feel that the accident case is the common one.

## 02:30 to 05:30: slide 4, Conjure the agent the job needs

On screen:

> Tailored prompt, minimum tools, hard budget
> Tool search on request, policy decides, request logged
> Orchestrator loops: done, more help, or stop

Here is the shape. An orchestrator reads the failure and writes a job: goal, evidence it may read, actions it may take, deadline, spend, and the conditions that end it. Then it generates an agent for that job with a tailored prompt and only the tools it expects to need. A schema-diff agent gets read access to two samples and a contract. It does not get the database.

If the agent needs something else, it asks. Dynamic tool search lets it discover a tool; policy decides whether this job may have it; the request and the answer are logged whether or not it was granted. That log is the most interesting file in the system.

I have this working as a prototype on my own integrations. I am not going to give you a success rate today, because I do not have one I trust yet. I can tell you the log of denied tool requests taught me more about my own permissions than any audit.

Story: What the prototype's first denied tool request was, and what it revealed.

Delivery: Draw the three boxes: orchestrator, generated agent, tool catalog with policy gate. Show one request crossing the gate and being refused.

## 05:30 to 07:00: slide 5, Guard the tools that can hurt

On screen:

> High-risk classes: write, send, pay, delete, deploy, export
> Reads customer data? Then it never posts to a vendor.
> A signed URL is a credential

Two guards do most of the work. First, tools come in risk classes. Read is cheap to grant. Write, send, pay, delete, deploy and export each need their own approval path, and a generated agent gets at most one of them per job. Do not smuggle a destructive migration through a tool called repair mapping.

This is least privilege, and Saltzer and Schroeder wrote it down in 1975: every program runs with the least set of privileges the job needs. We have all been nodding at that for fifty years and shipping service accounts that can do anything. A per-job agent is the first thing I have built where complying is genuinely easier than not.

Second, watch the boundary between systems. An agent that can read customer data and an agent that can post to a vendor are two agents, with a filter between them. That is where data leaks: not through the model being evil, but through a tool result flowing into the next tool call.

For sensitive processing, the planner gets an opaque job reference. A trusted dispatcher grants a local worker scoped access; the worker touches the data; only an allowlisted status comes back. A signed download URL is a bearer credential. Handing it to a model while asking the model not to use it is not isolation, it is hope.

Source: Saltzer and Schroeder (1975), [The Protection of Information in Computer Systems](https://doi.org/10.1109/PROC.1975.9939), Proceedings of the IEEE 63(9), 1278 to 1308. Least privilege is their principle (f).

Story: The client setup with local models for sensitive data and a frontier orchestrator. Say which parts were real and which are the stronger design you would build now.

Delivery: Point at the filter between worker and planner. Ask what else crosses it: prompts, traces, error bodies, notification previews.

## 07:00 to 08:30: slide 6, Repair syntax; prove meaning

On screen:

> zip → postal_code: investigate
> status: true → pending: stop

Back to the ingest. A name resemblance is a hypothesis, not evidence. A postal code is not always a US ZIP. Keep the leading zero, keep the country, and remember ZIP+4 has a four-digit extension that somebody, somewhere, is joining on.

A Boolean status becoming an enum is harder. Does true mean active, eligible, verified, or anything except cancelled? Pending cannot become true just because both are truthy in JavaScript.

So the generated agent may propose a reversible mapping when evidence supports equivalence, and it must quarantine the rest. An unexplained business-state change goes to an owner with samples and a question. Automatic recovery is useful precisely because it has somewhere honest to stop.

Delivery: Show {zip:"02108"} and {postal_code:"02108"}, then {status:"pending"}. Ask what evidence is missing in each. Two answers, then move.

Bridge: a repair ships as a versioned artifact with a rollback, and it has to pass fixtures it did not write.

## 08:30 to 11:30: slide 10, Walkthrough: one ingest, three decisions

On screen:

> Rename → validated mapping, canary
> Unknown status → quarantine, owner
> Lost response → reconcile, hold the reservation

Run the design. The rename has contract evidence. The conjured diff agent proposes copy-string; now reveal the fixtures one at a time and let the room reject the one that must not be repaired. Passing both, policy permits a canary of that mapping version and the job continues for matching records.

The status change has no semantic evidence. The job isolates affected records, reports what is incomplete, and hands an owner the samples and the exact question.

The provider timeout has an uncertain outcome. The controller queries the saved job ID instead of submitting again, and where it cannot, it holds the unresolved operation and its reservation.

Three events, three different right answers, none of them success or failure. If your dashboard only has two states, it is hiding the most interesting one.

Delivery: Five minutes from demo.md. Reveal fixtures before expected results. Ask the room for the next decision before showing it.

Bridge: the same orchestrator can ask for its own scale inside a per-customer budget; that is slide 11 in the long version, and the mechanics are a companion talk.

## 11:30 to 14:00: slide 14, Start smaller: remember what happened

On screen:

> Before returning: check relevant memory and correct known mistakes
> After execution: record checks, outcome, correction and frequency
> Generated, executed and verified are different states
> Memory is evidence, never permission

You do not need the whole agent factory to start. Take one agent that writes SQL, builds reports, runs shell commands or generates scripted API actions. Give it working memory for this job: the goal, constraints, draft and unresolved checks. Give it observational memory across jobs: what it generated, what actually ran, what failed, and what the checks established. Now ask it to consult that history before it hands you the next answer.

Suppose a reporting query keeps forgetting the tenant filter. It runs perfectly well; it reports the wrong population. An independent preflight check rejects it before dispatch. Record the draft, the failed check, the correction and the eventual result. Next time, retrieve that pattern while the agent is still drafting. Fix the omission before returning the SQL, then run the check again. That is adaptive behavior you can build with one agent and a small log.

The instruction is simple: before returning generated work, retrieve relevant memory and correct applicable mistakes; after an authorized execution, record the observed outcome and update the pattern counts. If you cannot check something safely, say what remains unverified. Remembered output is untrusted data and grants no new permissions. The copyable prompt and a small record format are in the handout.

As patterns repeat, turn the reliable ones into tested templates and adapters. The runtime agent learns which evidence to consult; the offline improvement loop evaluates changes to the reusable procedure. Once the known case is covered by code, it need not spend another model call rediscovering the rule.

Delivery: Show the prompt in memory-pattern.md. Ask which observation proves the query ran and which proves it answered the right question. Use the tenant-filter example; no live execution is needed.

## 14:00 to 15:00: slide 15, The next surprise should cost less

On screen:

> Conjure exactly enough
> Prove the repair
> Remember the known case

Return to the field that changed overnight. We did not predict its spelling. We did define what had to stay true, what evidence a repair needed, which tools this one job could have, and how far the app could go without us.

And return to the assistant with everything. It is still coming; nothing on these slides stops it, and I would not want to. What changed is how many of its pathways are live at once. Each job gets a small agent with a tailored prompt, a short tool list, a hard budget, and a log of every time it asked for more. That is the strategy I believe in for the next few years: not one agent holding every combination, which nobody can check, but many small ones you can afford to.

Pick one integration that already costs your team mornings. Give it a conjured agent with a bounded way to investigate, a test it did not write, and a place to record what happened. Or start with one reporting agent: keep its execution observations, make it check them before returning work, and measure whether the same mistake comes back. That is enough to start.

Delivery: Land on the third line. Stop talking.
