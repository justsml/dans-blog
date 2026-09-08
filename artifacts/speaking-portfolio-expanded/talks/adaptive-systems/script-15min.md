# Conjure Exactly Enough: 15-minute presenter script

Use slides 1, 3, 4, 5, 6, 10, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill bounded Story substitutions before delivery; their word and time allowances replace existing prose. Timings are rehearsal targets without Q&A. Lightning route: the assistant with everything and its pathway explosion, the conjured agent, the guarded tools, the semantic test, a compressed walkthrough, and the close. Slide 14 is cut; the execution-memory on-ramp survives as the last line of the close.

Budget: 13.5 spoken minutes (including story substitutions and bridges) + 1.5 audience minutes = 15. See [per-slide counts](pacing.md); walkthrough time includes its narration.

## 00:00 to 02:00: slide 1, The vendor renamed a field

On screen:

> Yesterday: zip
> Today: postal_code
> Your ingest stops. The status page is green.

The API still returns 200. Authentication works. The vendor's status page is green. Your ingest is broken because somebody renamed a field. If you work around B2B integrations, this is a very boring way to have a very expensive morning.

Here is the promise of this talk. An application can notice that, investigate it, propose a fix, prove the fix, and keep 882 of 900 records moving while eighteen stay quarantined, all before you wake up. That is a fixture target, enforced by scoped tools and independent checks.

The design is mine. The incidents are composites; I have had this exact morning more than once. We will follow one address ingest job through a rename, a change in meaning, and a provider that stops answering.

Story: Replace at most 35 words of this slide's existing prose with the following first-hand example (maximum 20 seconds; never append): The vendor rename you actually lived through. Name the field, the hour you noticed, and what it cost.

Delivery: No audience story on the lightning route; point at 200 and continue.

Bridge: the baseline is diff the schema and page a human; the agent has to beat that on time to recover without adding false repairs.

## 02:00 to 05:00: slide 3, Sorry, You're Building It

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

Bridge: most of the damage will be accidents before anyone means it, and a renamed field is untrusted input read by something that can act.

## 05:00 to 07:15: slide 4, Conjure the agent the job needs

On screen:

> Tailored prompt, minimum tools, hard budget
> Tool search on request, policy decides, request logged
> Orchestrator loops: done, more help, or stop

Here is the shape. An orchestrator reads the failure and writes a job: goal, evidence it may read, actions it may take, deadline, spend, and the conditions that end it. Then it generates an agent for that job with a tailored prompt and only the tools it expects to need. A schema-diff agent gets read access to two samples and a contract. It does not get the database.

If the agent needs something else, it asks. Dynamic tool search lets it discover a tool; policy decides whether this job may have it; the request and the answer are logged whether or not it was granted. That log is the most interesting file in the system. The planner reads untrusted input too. It holds no operational credentials: it proposes a server-defined job class. A trusted dispatcher validates the grant, and every tool rechecks authorization. Log the job, policy version and decision so temporary agents remain auditable.

Story: Replace at most 35 words of this slide's existing prose with the following first-hand example (maximum 20 seconds; never append): What the prototype's first denied tool request was, and what it revealed.

Delivery: Draw the three boxes: orchestrator, generated agent, tool catalog with policy gate. Show one request crossing the gate and being refused.

## 07:15 to 09:00: slide 5, Guard the tools that can hurt

On screen:

> High-risk classes: write, send, pay, delete, deploy, export
> Reads customer data? Then it never posts to a vendor.
> A signed URL is a credential

Two guards do most of the work. First, tools come in risk classes. Read is cheap to grant. Write, send, pay, delete, deploy and export each need their own approval path, and a generated agent gets at most one of them per job. Do not smuggle a destructive migration through a tool called repair mapping.

Second, watch the boundary between systems. An agent that can read customer data and an agent that can post to a vendor are two agents, with a filter between them. That is where data leaks: not through the model being evil, but through a tool result flowing into the next tool call.

Source: Saltzer and Schroeder (1975), [The Protection of Information in Computer Systems](https://doi.org/10.1109/PROC.1975.9939), Proceedings of the IEEE 63(9), 1278 to 1308. Least privilege is their principle (f).

Story: Replace at most 35 words of this slide's existing prose with the following first-hand example (maximum 20 seconds; never append): The client setup with local models for sensitive data and a frontier orchestrator. Say which parts were real and which are the stronger design you would build now.

Delivery: Point at the filter between worker and planner. Name the other paths: prompts, traces, error bodies, notification previews. No audience response here.

Bridge: Saltzer and Schroeder called this least privilege in 1975. Signed URLs are credentials; keep them in the dispatcher, outside the planner.

## 09:00 to 10:30: slide 6, Repair syntax; prove meaning

On screen:

> zip → postal_code: investigate
> status: true → pending: stop

Back to the ingest. Similar field names prove nothing. Keep the country and leading zero; the diff agent may propose a mapping but cannot promote it.

Propose reversible mappings when evidence supports equivalence; quarantine the rest. An unexplained business-state change goes to an owner. The diff agent never held a write tool.

Delivery: Show {zip:"02108"} and {postal_code:"02108"}, then {status:"pending"}. Ask what evidence is missing in each. Two answers, then move.

Bridge: a Boolean status becoming an enum is the hard case — pending does not become true because both are truthy. A repair ships as a versioned artifact with a rollback, and it has to pass fixtures it did not write.

## 10:30 to 13:00: slide 10, Walkthrough: one ingest, three decisions

On screen:

> Rename: what did the green check prove?
> Unknown status: who knows what it means?
> Lost response: retry or reconcile?

The candidate converts the postal code to a number and back. What does a green string check prove?

The leading-zero fixture rejects that lossy mapping. Only copying the string unchanged, with all fixtures passing, becomes eligible for a canary.

The unexplained status change is quarantined for an owner. The lost provider response is reconciled through its saved job ID. If lookup cannot resolve it, keep the operation and reservation unresolved. Three events, three different right answers.

Delivery: Two-and-a-half-minute route in demo.md (1.5 spoken, 1 interaction). Reveal fixtures before expected results. Ask the room for the next decision before showing it.

Bridge: the orchestrator can also request compute inside a per-customer budget.

## 13:00 to 15:00: slide 15, The next surprise should cost less

On screen:

> Conjure exactly enough
> Prove the repair
> Remember the known case

And return to the assistant with everything. It is still coming; nothing on these slides stops it, and I would not want them to. What changed is how many of its pathways are live at once. Not one agent holding every combination, which nobody can check. Many small ones you can afford to.

Pick one integration that already costs your team mornings. Give it a conjured agent with a bounded way to investigate, a test it did not write, and a place to record what happened. Or start with one reporting agent: keep its execution observations, make it check them before returning work, and measure whether the same mistake comes back. Count the routes you opened. Conjure exactly enough.

Delivery: Land on the third line. Stop talking.
