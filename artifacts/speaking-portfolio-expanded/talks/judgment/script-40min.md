# Code Is Cheap. Judgment Is Expensive.: 40-minute presenter script

Use slides 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A.

## 00:00 to 02:30: slide 1, The morning four good implementations arrive

On screen:

> 95% utilized → 19× waiting
> Four plausible implementations. One reviewer.

Four good implementations arrive before lunch. The reviewer is still on yesterday's change. Generation got cheaper. Delivery acquired a queue.

If your organization uses AI to build an infinite feature machine, you have tragically missed the potential of the magic AI genie. We can spend the gain on fewer defects and smaller changes. We do not have to spend it all on more code.

Here is the scope once: the queue and permission examples are teaching models, not measurements of your team. The nineteen-times wait assumes one server and a variability factor of one. We will do the arithmetic. The argument is that protecting review capacity belongs upstream, where we decide what enters the queue.

Story: The change that waited longer for review than it took to write. Bring arrival, first-review, and acceptance timestamps.

## 02:30 to 05:00: slide 2, Point at the queue

On screen:

> Idea → specification → code → review → release
> Not where it takes skill. Where it sits untouched.

Where does your work wait? Not where does it take skill. Where does it sit untouched?

A team can have an implementation bottleneck on Monday and a review bottleneck on Friday. Faster generation changes the arrival rate at the next stage. If that stage was already close to capacity, the wait grows even when each review takes exactly as long as before.

Draw a boundary around the review system. Count a change when it is ready for review and stop the clock when it leaves. Separate hands-on service time from waiting for somebody to start. Otherwise we will call a three-day wait a three-day review and optimize the wrong thing.

Delivery: Budget 45 seconds for hands on each stage. Take one answer about where work waits and use it for the diagram.

## 05:00 to 08:00: slide 3, A queue does not care how you feel about it

On screen:

> Wq ≈ ((ca² + cs²) / 2) × ρ / (1 − ρ) × E[S]
> V = 1: 80% → 4×; 90% → 9×; 95% → 19×

Kingman's single-server approximation separates three things: variability, utilization, and mean service time. Call the variability term V. Set V to one for this curve. At eighty percent utilization, point eight divided by point two is four. At ninety-five, point nine five divided by point zero five is nineteen.

Fifteen percentage points of utilization bought nearly five times the wait. That is the price of the last bit of headroom. The multiplier is waiting time divided by hands-on review time. It does not include the review itself.

Little's law gives a separate accounting identity for a stable system: average work in progress equals throughput times average time in the system. They tell us what to measure before claiming the reviewer just needs to try harder.

Source: J. F. C. Kingman (1961), [The single server queue in heavy traffic](https://www.cambridge.org/core/journals/mathematical-proceedings-of-the-cambridge-philosophical-society/article/abs/single-server-queue-in-heavy-traffic/81C55BC00A68FE6D5385638AA0B0AF37), 57(4), 902–904. John D. C. Little (1961), [A Proof for the Queuing Formula: L = λW](https://pubsonline.informs.org/doi/abs/10.1287/opre.9.3.383), Operations Research 9(3), 383–387.

Delivery: Trace the curve and do both divisions. Ask what happens if variability doubles; show that it multiplies the wait too.

## 08:00 to 10:30: slide 4, The stage you didn't speed up

On screen:

> Fixed-work example: review is 30% of service time
> Infinite generation speed → 1 / 0.30 = 3.33×

Take a fixed job. Seventy percent of its service time is producing the implementation, thirty percent is review. Make generation instantaneous. Thirty percent remains. One divided by point three is three and a third. That is the ceiling for this example.

This is Amdahl's argument applied to a sequence of work. Put your own fraction in. Do not put queueing delay into the unchanged fraction and then pretend that delay stays fixed while arrivals change.

If you want more than that ceiling, change the remaining work. Specify the request better. Eliminate an unnecessary change. Reduce what a reviewer must reconstruct. Another speedup in generation does not remove the untouched stage.

Source: Gene M. Amdahl (1967), [Validity of the single processor approach to achieving large scale computing capabilities](https://doi.org/10.1145/1465482.1465560), AFIPS Spring Joint Computer Conference, 483–485.

## 10:30 to 13:00: slide 5, You cannot inspect quality in

On screen:

> Fewer arrivals. Smaller surprises.
> Fix the process producing the queue.

Deming's third point says to stop depending on inspection to achieve quality and build quality into the process. That is a useful objection to the default plan for generated code: produce more, then ask somebody to catch everything.

Keep review. Change what it receives. An unasked-for abstraction, an unexplained permission change, and a speculative feature all consume the same person's attention. Rejecting them before generation is cheaper than having a reviewer reverse-engineer why they exist.

Hiring can increase capacity. It is still worth fixing arrivals first. Otherwise the new reviewer inherits the same variance, interruptions, and missing context, with a longer onboarding document.

Source: W. Edwards Deming (1986), Out of the Crisis, MIT Center for Advanced Engineering Study; Point 3 of the Fourteen Points. Applied to review by the [Deming Institute](https://deming.org/software-code-reviews-from-a-deming-perspective/).

## 13:00 to 16:00: slide 6, "Add enterprise permissions"

On screen:

> Who can do what, in which tenant?
> What happens when access changes?
> What must never happen?

Add enterprise permissions. That is the entire request.

Spend sixty seconds with the person next to you. Write the questions you need answered before implementing it. You do not get a second page of requirements; that is the point.

Who can grant a role? Does it apply to one tenant or every tenant? What happens to an existing session after revocation? What does the audit record need to show? There are several plausible implementations, and most disagree about behavior the ticket never specified.

We made code cheap and left the question expensive. Writing down the answer is part of implementation. It just happens before the diff.

Delivery: Read the request once. Give pairs sixty seconds here, thirty in the 15-minute cut. Collect two answers, then introduce the tenant and revocation questions.

## 16:00 to 19:00: slide 7, A spec reduces variance

On screen:

> Actor + tenant + action + resource
> Revocation changes the next decision
> Denied actions leave state unchanged

For this example, an administrator can grant a role only inside the tenant they administer. A revoked role cannot authorize the next operation. A denied change leaves protected state untouched and records the failed attempt.

Those statements produce cases. An admin in tenant A requests a change in A: allow. The same admin requests a change in B: deny. Revoke the role, repeat the A request: deny. Check the resulting state, not just the status message.

Tie this back to the curve. Clear boundaries reduce the number of interpretations arriving at review. Bounded diffs reduce the amount of code a reviewer has to reconstruct at once. That is the variance term. On purpose.

Delivery: Write the three cases beside the request. Keep the cross-tenant case visible in the handout, not beside the later demo’s initial code.

## 19:00 to 22:00: slide 8, What review actually catches

On screen:

> Understanding is work
> Defect finding · knowledge transfer · alternative designs

Bacchelli and Bird studied modern code review at Microsoft. Finding defects was the main motivation, but the observed benefits included more knowledge transfer, awareness, and alternative solutions than that motivation suggests. Understanding the change was central.

That gives the review queue more than one job. A check that proves a local invariant does not teach another engineer how this subsystem behaves. An agent summary does not guarantee that anyone could repair it next week.

Keep junior engineers in the reasoning. Let them write the acceptance case, explain a rejection, and follow a change through its consequences. If all the practice becomes watching green checks, we are removing the work that builds the next reviewer.

Source: Alberto Bacchelli and Christian Bird (2013), [Expectations, Outcomes, and Challenges of Modern Code Review](https://www.cabird.com/pubs/bacchelli2013eoc.pdf), ICSE 2013.

Delivery: Spend 45 seconds on how a junior engineer would learn the permission boundary from this change.

## 22:00 to 26:00: slide 9, Demo: the rubber stamp

On screen:

> canEdit(user, resourceTenant) = user.roles.includes("admin")
> Test: admin user → allowed
> PASS

Here is the implementation. Here is its test. The user has the admin role. The function allows the edit. The test passes.

The resource tenant is right there in the signature. Nothing reads it. And you already heard the cross-tenant case, back on the spec slide. Watch the vote anyway.

Would you approve it? Now run the case where that administrator belongs to tenant A and the resource belongs to tenant B. The test was accurate about the behavior it checked. The behavior was incomplete in exactly the same way as the implementation.

The model wrote the test that agrees with the bug. Both of them are very confident.

Bainbridge asks what automation leaves the operator doing. Skitka and colleagues put people in a flight simulator with an automated monitoring aid and counted the trials where the aid was wrong. On those trials people missed events the aid did not flag, and acted on prompts the other instruments contradicted. That is the whole finding, and it is about the trials where the aid was wrong. This fixture is how the same concern shows up in our queue: the green signal gets attention that the missing case did not.

Source: Lisanne Bainbridge (1983), [Ironies of automation](https://www.sciencedirect.com/science/article/pii/0005109883900468), Automatica 19(6), 775–779. Linda J. Skitka, Kathleen L. Mosier and Mark Burdick (1999), [Does automation bias decision-making?](https://doi.org/10.1006/ijhc.1999.0252), International Journal of Human-Computer Studies 51(5), 991–1006. A flight-simulation task with a monitoring aid, not a code-review trial.

Delivery: Open contracts.md only after the vote. Run `bun artifacts/speaking-portfolio-expanded/packets/judgment/demo.ts` for PASS, then add `--holdout` for the actual failing assertion. Do not assume the room approves; if someone catches it, ask which evidence caught their attention.

## 26:00 to 29:00: slide 10, Do not appoint a crumple zone

On screen:

> Responsibility must come with control
> Who accepts, recovers, and maintains?

Elish calls the human who absorbs blame without enough control a moral crumple zone. Put an engineer at the end of an automated pipeline, give them two minutes to approve a diff, and announce that responsibility stayed human. The org chart looks excellent. We did not remove the bottleneck. We moved it onto one person and gave them a keyboard shortcut for approving things.

Can that person stop arrivals? Can they demand another test? Can they reject the change without missing a throughput target? Do they own the rollback and have time to understand it? Those are controls. Their name in the approval log is a record.

For the permissions change, name who accepts the behavior, who receives the incident, and who maintains the policy next year. Give each the context and authority their job requires. Accountability without those controls is just a convenient place to send the postmortem.

Source: Madeleine Clare Elish (2019), [Moral Crumple Zones: Cautionary Tales in Human-Robot Interaction](https://estsjournal.org/index.php/ests/article/download/260/177/), Engaging Science, Technology, and Society 5, 40–60.

## 29:00 to 32:00: slide 11, Essence and accident

On screen:

> Generating a branch is cheap
> Choosing the permission boundary is still work

Brooks distinguished the essential conceptual work of software from the accidental difficulty of expressing it in a machine. His forecast expired in 1996. The distinction did not.

The syntax of the role check is the easy part. Deciding what a tenant boundary means is the product and security decision. Faster code generation gives us more ways to express a decision we still have to make.

So invest the saved time in the model of the problem. Who is the actor? Which state is authoritative? What happens after revocation? Those questions reduce the space of plausible wrong implementations before they reach the reviewer.

Source: Frederick P. Brooks Jr., [No Silver Bullet: Essence and Accidents of Software Engineering](https://www.cs.unc.edu/techreports/86-020.pdf), UNC technical report, 1986; published in Computer 20(4), 1987, 10–19.

## 32:00 to 35:00: slide 12, Three levers on the queue

On screen:

> Arrivals: decline work before generating it
> Variance: bounded diffs and explicit behavior
> Utilization: reserve actual review capacity

Fewer arrivals means deciding which changes should exist, including declining a second implementation after the first already met the need. That is a rule about review load, not about generation: generate ten parallel attempts if you like, as long as a gate collapses them to one candidate before a human reads any of them. Judging the ten is Dynamic Scaling's talk, and its Council of Guards eats nine. This one protects the person who accepts the one that got through.

Smaller variance means reducing surprises at review. Keep one purpose per diff, include the behavioral cases, and separate mechanical changes from policy changes. Small in line count is useful only when it is also small in meaning.

Protect slack by reserving review time and limiting work in progress. If the reviewer is on call, their calendar is not eight hours of service capacity. Measure interruptions before declaring them underutilized. Pilot these changes on one recurring workflow and keep the baseline.

## 35:00 to 38:00: slide 13, Measure the wait, not the output

On screen:

> Ready → first review → accepted
> Hands-on review time ÷ available review time
> Queue age and escaped defects beside throughput

Start with timestamps. When was the change ready, when did somebody first inspect it, and when was it accepted? Then sample hands-on review time separately. You need both the queue and the service time to explain a delay.

Estimate review utilization against time actually available for review, after meetings and incident duty. Do not infer it from how many green squares somebody has on GitHub. Keep the estimate beside backlog age, rework, and escaped defects.

Take forty-five seconds. Estimate yours, or write down the missing measurement. The missing field is a better next action than another dashboard of generated lines.

Delivery: Give 45 seconds. Invite one estimate and ask what counted as available time. Do not prescribe a universal utilization threshold.

## 38:00 to 40:00: slide 14, Knowing when to stop

On screen:

> What should exist? Does it work?
> Is it worth maintaining?

Back to the curve. The reviewer did not get slower. We filled the space that let them absorb uneven work.

Ninety-five percent utilization is not efficiency. It is a nineteen-times wait with good posture. Argue with the model by measuring arrivals, service time, and variability. You cannot argue the queue away by pointing at how quickly the code appeared.

Sometimes the right result is a smaller change. Sometimes it is no change. Cheap code makes both decisions more valuable.

Delivery: Leave the utilization curve up for questions.
