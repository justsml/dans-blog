# Code Is Cheap. Judgment Is Expensive.: 30-minute presenter script

Use slides 1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 14. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. Drops Amdahl and Brooks as standalone slides; the permissions block is four minutes. The rubber stamp keeps four minutes.

## 00:00 to 03:00: slide 1, The morning four good implementations arrive

Four good implementations arrive before lunch. The reviewer is still on yesterday's change. Generation got cheaper. Delivery acquired a queue.

If your organization uses AI to build an infinite feature machine, you have tragically missed the potential of the magic AI genie. We can spend the gain on fewer defects and smaller changes. We do not have to spend it all on more code.

Here is the scope once: the queue and permission examples are teaching models, not measurements of your team. The nineteen-times wait assumes one server and a variability factor of one. We will do the arithmetic. The argument is that protecting review capacity belongs upstream, where we decide what enters the queue.

Story: The change that waited longer for review than it took to write. Bring arrival, first-review, and acceptance timestamps.

## 03:00 to 05:00: slide 2, Where does the work actually wait?

Where does your work wait? Not where does it take skill. Where does it sit untouched?

A team can have an implementation bottleneck on Monday and a review bottleneck on Friday. Faster generation changes the arrival rate at the next stage. If that stage was already close to capacity, the wait grows even when each review takes exactly as long as before.

Draw a boundary around the review system. Count a change when it is ready for review and stop the clock when it leaves. Separate hands-on service time from waiting for somebody to start. Otherwise we will call a three-day wait a three-day review and optimize the wrong thing.

Delivery: Budget 45 seconds for hands on each stage. Take one answer about where work waits and use it for the diagram.

## 05:00 to 08:00: slide 3, A queue does not care how you feel about it

Kingman's single-server approximation separates three things: variability, utilization, and mean service time. Call the variability term V. Set V to one for this curve. At eighty percent utilization, point eight divided by point two is four. At ninety-five, point nine five divided by point zero five is nineteen.

Fifteen percentage points of utilization bought nearly five times the wait. That is the price of the last bit of headroom. The multiplier is waiting time divided by hands-on review time. It does not include the review itself.

Little's law gives a separate accounting identity for a stable system: average work in progress equals throughput times average time in the system. Neither result says your team is literally one server. They tell us what to measure before claiming the reviewer just needs to try harder.

Source: J. F. C. Kingman (1961), [The single server queue in heavy traffic](https://www.cambridge.org/core/journals/mathematical-proceedings-of-the-cambridge-philosophical-society/article/abs/single-server-queue-in-heavy-traffic/81C55BC00A68FE6D5385638AA0B0AF37), 57(4), 902–904. John D. C. Little (1961), [A Proof for the Queuing Formula: L = λW](https://pubsonline.informs.org/doi/abs/10.1287/opre.9.3.383), Operations Research 9(3), 383–387.

Delivery: Trace the curve and do both divisions. Ask what happens if variability doubles; show that it multiplies the wait too.

Bridge: speeding only generation leaves review as the unchanged stage. Improve what arrives there.

## 08:00 to 10:00: slide 5, You cannot inspect quality in

Deming's third point says to stop depending on inspection to achieve quality and build quality into the process. That is a useful objection to the default plan for generated code: produce more, then ask somebody to catch everything.

Keep review. Change what it receives. An unasked-for abstraction, an unexplained permission change, and a speculative feature all consume the same person's attention. Rejecting them before generation is cheaper than having a reviewer reverse-engineer why they exist.

Hiring can increase capacity. It is still worth fixing arrivals first. Otherwise the new reviewer inherits the same variance, interruptions, and missing context, with a longer onboarding document.

Source: W. Edwards Deming’s Point 3, discussed by the [Deming Institute on software code reviews](https://deming.org/software-code-reviews-from-a-deming-perspective/).

## 10:00 to 12:00: slide 6, "Add enterprise permissions"

Add enterprise permissions. That is the entire request.

Spend sixty seconds with the person next to you. Write the questions you need answered before implementing it. You do not get a second page of requirements; that is the point.

Who can grant a role? Does it apply to one tenant or every tenant? What happens to an existing session after revocation? What does the audit record need to show? There are several plausible implementations, and most disagree about behavior the ticket never specified.

We made code cheap and left the question expensive. Writing down the answer is part of implementation. It just happens before the diff.

Delivery: Read the request once. Give pairs a full 60 seconds, collect two answers, then introduce the tenant and revocation questions.

## 12:00 to 14:00: slide 7, A spec reduces variance

For this example, an administrator can grant a role only inside the tenant they administer. A revoked role cannot authorize the next operation. A denied change leaves protected state untouched and records the failed attempt.

Those statements produce cases. An admin in tenant A requests a change in A: allow. The same admin requests a change in B: deny. Revoke the role, repeat the A request: deny. Check the resulting state, not just the status message.

Tie this back to the curve. Clear boundaries reduce the number of interpretations arriving at review. Bounded diffs reduce the amount of code a reviewer has to reconstruct at once. That is an attempt to reduce service-time variance, not a claim that a document automatically changes a coefficient.

Delivery: Write the three cases beside the request. Keep the cross-tenant case visible in the handout, not beside the later demo’s initial code.

## 14:00 to 16:00: slide 8, What review actually catches

Bacchelli and Bird studied modern code review at Microsoft. Finding defects was the main motivation, but the observed benefits included more knowledge transfer, awareness, and alternative solutions than that motivation suggests. Understanding the change was central.

That gives the review queue more than one job. A check that proves a local invariant does not teach another engineer how this subsystem behaves. An agent summary does not guarantee that anyone could repair it next week.

Keep junior engineers in the reasoning. Let them write the acceptance case, explain a rejection, and follow a change through its consequences. If all the practice becomes watching green checks, we are removing the work that builds the next reviewer.

Source: Alberto Bacchelli and Christian Bird (2013), [Expectations, Outcomes, and Challenges of Modern Code Review](https://www.cabird.com/pubs/bacchelli2013eoc.pdf), ICSE 2013.

Delivery: Spend 45 seconds on how a junior engineer would learn the permission boundary from this change.

## 16:00 to 20:00: slide 9, Demo: the rubber stamp

Here is the implementation. Here is its test. The user has the admin role. The function allows the edit. The test passes.

Would you approve it? Now run the case where that administrator belongs to tenant A and the resource belongs to tenant B. The test was accurate about the behavior it checked. The behavior was incomplete in exactly the same way as the implementation.

The model wrote the test that agrees with the bug. Both of them are very confident.

Bainbridge asks what automation leaves the operator doing. Automation-bias experiments ask what happens when people defer to a decision aid despite other evidence. Those experiments were not code-review trials. This fixture is how the concern shows up in our queue: the green signal gets attention that the missing case did not.

Source: Bainbridge (1983), [Ironies of automation](https://www.sciencedirect.com/science/article/pii/0005109883900468). Mosier and Skitka (1999), [Automation Use and Automation Bias](https://journals.sagepub.com/doi/10.1177/154193129904300346).

Delivery: Open contracts.md only after the vote. Run `bun artifacts/speaking-portfolio-expanded/packets/judgment/demo.ts` for PASS, then add `--holdout` for the actual failing assertion. Do not assume the room approves; if someone catches it, ask which evidence caught their attention.

## 20:00 to 22:30: slide 10, Do not appoint a crumple zone

Elish calls the human who absorbs blame without enough control a moral crumple zone. Put an engineer at the end of an automated pipeline, give them two minutes to approve a diff, and announce that responsibility stayed human. The org chart looks excellent.

Can that person stop arrivals? Can they demand another test? Can they reject the change without missing a throughput target? Do they own the rollback and have time to understand it? Those are controls. Their name in the approval log is a record.

For the permissions change, name who accepts the behavior, who receives the incident, and who maintains the policy next year. Give each the context and authority their job requires. Accountability without those controls is just a convenient place to send the postmortem.

Source: Madeleine Clare Elish (2019), [Moral Crumple Zones: Cautionary Tales in Human-Robot Interaction](https://estsjournal.org/index.php/ests/article/download/260/177/), Engaging Science, Technology, and Society 5, 40–60.

Bridge: writing the branch is cheap; deciding the permission boundary is still conceptual work.

## 22:30 to 25:00: slide 12, Three levers on the queue

Fewer arrivals means deciding which changes should exist. It includes declining a second implementation after the first already met the need. Comparing fleets of candidate agents belongs to Dynamic Scaling. Here we are protecting the person who accepts the resulting work.

Smaller variance means reducing surprises at review. Keep one purpose per diff, include the behavioral cases, and separate mechanical changes from policy changes. Small in line count is useful only when it is also small in meaning.

Protect slack by reserving review time and limiting work in progress. If the reviewer is on call, their calendar is not eight hours of service capacity. Measure interruptions before declaring them underutilized. Pilot these changes on one recurring workflow and keep the baseline.

## 25:00 to 27:00: slide 13, Measure the wait, not the output

Start with timestamps. When was the change ready, when did somebody first inspect it, and when was it accepted? Then sample hands-on review time separately. You need both the queue and the service time to explain a delay.

Estimate review utilization against time actually available for review, after meetings and incident duty. Do not infer it from how many green squares somebody has on GitHub. Keep the estimate beside backlog age, rework, and escaped defects.

Take forty-five seconds. Estimate yours, or write down the missing measurement. The missing field is a better next action than another dashboard of generated lines.

Delivery: Give 45 seconds. Invite one estimate and ask what counted as available time. Do not prescribe a universal utilization threshold.

## 27:00 to 30:00: slide 14, Knowing when to stop

Back to the curve. The reviewer did not get slower. We filled the space that let them absorb uneven work.

Ninety-five percent gives a nineteen-times wait in our model. We can argue about the model by measuring arrivals, service time, and variability. We cannot argue the queue away by pointing at how quickly the code appeared.

Sometimes the right result is a smaller change. Sometimes it is no change. Cheap code makes both decisions more valuable.

Delivery: Leave the utilization curve up for questions.
