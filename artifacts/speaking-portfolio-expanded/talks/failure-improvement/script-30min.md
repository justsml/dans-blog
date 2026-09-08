# The Pager Cried Wolf: 30-minute presenter script

Use slide IDs in the order below. [Timing](timing.md) separates speech, reading, decisions and writing. The four-minute slide-8 walkthrough uses authored case cards, not captured execution; do not switch to a live application. Stories are omitted from shorter routes unless they replace rehearsed prose.

## 00:00 to 02:30: slide 1, Nobody reads the scroll

> Every green suggestion can teach you to stop reading the next one.
> 16,953 ÷ 18 days ÷ 15 beds ≈ 63 alarms per available bed-day

The logs are still arriving. Somewhere in that scroll is work we will call urgent after a customer sends an angry email.

Every green suggestion can teach you to stop reading the next one. Our offline loop has to earn its way past that risk. These are authored teaching fixtures; live integration is unverified.

Cvach's 2012 review reports an earlier project: sixteen thousand nine hundred and fifty-three alarms over eighteen days on a fifteen-bed unit. About sixty-three per available bed-day, not per patient-day. The question for our loop: did we reduce noise, or move it into another queue?

Delivery: Give fifteen seconds to read the available-bed arithmetic; no hands-up in this route.

## 02:30 to 04:15: slide 2, Step one: hand an agent the logs

> Already better than the nobody who was doing it before
> Read access. One question. One saved answer.

Give an agent a sanitized log export. Ask what broke since yesterday. A file and a question.

It can group unrelated failures or miss the important line. Inspect the answer against the input before wiring it to anything. Save the answer and its input window so tomorrow you can distinguish a new finding from a more confident retelling.

One failure class first. Read access to code does not imply write access to production. Add the individual grant that answers the next question.



## 04:15 to 06:10: slide 6, The retry that hid the auth failure

> A retry hides an auth failure
> A sleep hides a race
> Successful workaround ≠ repaired system

A retry works. Score only eventual success and the lesson is retry more. But the first request was forbidden; the second credential belonged to someone else. Green hid the boundary violation.

A workaround is not a repair. Vaughan's normalization of deviance is the warning: an accepted anomaly can become routine. The offline loop needs evidence that the defect is gone, not another demonstration that the symptom disappeared.

Delivery: Take one twenty-second answer about a workaround; no incident stories.

## 06:10 to 08:10: slide 3, Enrichment earns the next step

> Logs → code → trace → reproduction → ticket
> One failure class at a time

A stack trace tells you where an exception surfaced. The code tells you which branch produced it. The trace shows what happened before it. A reproduction tells you whether your explanation survives a second attempt.

Add the integration that answers the next question. Read access to code does not require write access to production. Looking at queue depth does not require permission to resize the cluster. Access is a set of individual grants, not a graduation ceremony.

Bridge: distill repetition before classifying causes. Keep severity, evidence, owner and an unknown result. A matching string is a family candidate, not a cause.

Delivery: Walk up the ladder using one timeout. Stop at the first rung that supports an action. Use the contracts handout for the integration table.

## 08:10 to 10:40: slide 4, The out-of-band check

> Schedule → bookmark → distill → artifact
> Advance the bookmark after durable output

Run outside the request path. Read a bookmark, collect a bounded overlap window, strip secrets, and save an artifact with counts and evidence IDs. Advance the bookmark only after durable output. Retry ticket creation from that artifact with a stable incident key.

Distill repetition before classifying causes. Matching strings suggest a family; they do not establish a root cause. Unknown needs a queue and an owner.

A cron expression does not solve delivery semantics. Nor does it buy permission to move money or message customers. Detect, recommend, draft. A person presses the button.

Delivery: Trace the persisted artifact through one interrupted run for fifteen seconds.

## 10:40 to 13:40: slide 7, Tickets are cheap. Review is not.

> Tickets are cheap. Review is not.
> A proposed diagnosis travels with its evidence

A useful ticket says what happened, how often, who was affected, and what remains unexplained. It links the evidence. It does not announce a root cause just because the model found a similar issue from last month.

Opening a PR spends somebody else's attention. Require a reproduction, a bounded change, and a named reviewer before the agent adds to that queue. Deduplicate by the incident key. Cap new proposals per run. When the queue is full, hold the artifact and report the backlog.

Match ceremony to consequence. A documentation correction and a payment retry do not get the same permissions because they happen to arrive through the same agent.

We are moving a queue, not deleting one. Count review time and missed failures against the burden this replaces. If inspecting the proposals costs more than the failures you avoid, turn the loop down or off. Detect, recommend, draft. A person presses the button.

Bridge: feedback uses the same evidence machinery, but a feature request has a different acceptance rule. Any experiment needs explicit consent; a similar user is not an enrolled user.



## 13:40 to 17:40: slide 8, Nothing leaves without evidence

> New case: three matching timeouts; one missing trace
> Regression · holdout · scope · human
> Decide before revealing the evidence

Three timeouts: two in tenant A, one in tenant B. A broader retry policy makes the visible regression green. Promote, hold, or ask for evidence?

Reveal the held-out cancellation case: a cancelled job resumes and writes output. The scope check also shows the policy changed for every tenant. Hold the candidate. Regression, holdout, scope and a person are separate gates.

Now tenant B has no trace. Does matching text establish the same cause? Unknown is an output. Preserve the report for investigation; do not borrow tenant A's diagnosis.

Jidoka names the manufacturing idea of stopping at an abnormality. Here we stop promotion. A rejection without a replacement diagnosis is still useful work.

Delivery: Use the authored case cards in demo.md. Spend 45 seconds on the first vote, 30 seconds reading the two reveal rows, and 45 seconds on the missing-trace decision. Reveal answers only after each decision. No implementation has been run to produce these cards; do not switch to a live application or present them as captured test output.

## 17:40 to 21:00: slide 9, Who reviews the robot's PRs?

> The easy cases disappear
> The reviewer keeps the exceptions

The robot opens good PRs for a month. What happens to the person reviewing them?

Bainbridge's Ironies of Automation asks what remains for the human after automation takes the routine work. Monitoring and difficult interventions remain, while opportunities to practise shrink. That paper is from 1983. The problem did not wait for a chat interface.

My design response is to rotate review duty, reserve time for it, and practise recovery on known failures outside production. Sample accepted work for missed defects. Keep evaluation cases separate from the repair agent's tuning loop. A sampling policy is for the audit; it does not wave through a payment or a data deletion.

If the queue is too big to inspect, reduce what enters it. Giving one engineer a hundred green suggestions is not giving them a hundred reasons to trust the next one.

The acceptance history is not permission to stop checking. Keep the rejection evidence visible beside every proposal, and budget reviewer time as part of the system cost.



## 21:00 to 24:00: slide 10, Compile what repeats

> Nondeterminism finds the path. Determinism runs it.
> Save the script, its tests, and its invalidation rule

Let the agent explore a changed flow in a browser. Once it finds the login path, save that path as a script. Stop buying the same discovery on every run.

The scheduled check is the same move. Memory and search over prior work help identify repetition. A skill describes when to turn a repeated task into a file. The output gets reviewed, tested, versioned, and scheduled. When the page or the log schema changes, invalidate it.

A runtime agent earns its own authority elsewhere. A reusable procedure gets evaluated here, offline, like any other change. This is the boundary this talk owns, not a prerequisite handoff from another session.

Selecting tests from a diff is another candidate. Compare it against the full suite on retained changes before trusting the selection. Count missed regressions as well as runtime. Keep the full suite on a schedule. Cheap selection that skips the failing test has excellent unit economics right up to the incident.



## 24:00 to 26:15: slide 13, The metrics that will lie to you

> 100 tickets. 90 wrong. Ten worth reading.
> Measure recurrence and wrong tickets, with denominators

Suppose the agent files a hundred tickets and a reviewer closes ninety as wrong. Time-to-ticket looks terrific. Ten percent were worth reading. That is our arithmetic fixture, and it is the number I want next to the throughput chart.

Goodhart is the warning here: once we reward a proxy, we change the behavior producing it. Faster tickets are very easy to manufacture. Faster learning is harder.

Track recurring failures after a fix, with exposure counts. Track wrong tickets among reviewed tickets, and audit the cases the agent ignored. A low false-positive rate bought by filing nothing is another beautiful dashboard. Record backlog age too. Otherwise the reviewer silently pays for the metric win.



## 26:15 to 28:30: slide 14, Start Monday

> One failure class
> One integration
> One place the loop must stop
> Handout vocabulary: alert fatigue · normalization of deviance · jidoka · automation irony · Goodhart

Write down one failure class you could hand this loop on Monday. Name the input and the person who would inspect its first output.

Now name the one integration it needs next. Leave the rest blank. Last, write the condition under which it must stop and ask. That is enough for a first version.

Delivery: Give the room a full 60 seconds. Do not fill it with a recap.

## 28:30 to 30:00: slide 15, Fail to win

> A smaller queue, with evidence and a stop
> Do not let the loop train you to stop reading.

The scroll is still arriving. Now the loop proposes a smaller pile of inspectable work, and the reviewer can stop it. That is the design, not a measured result.

If the queue grows, if the evidence disappears, or if green becomes a reason to stop reading, we built another pager. Measure that before calling it improvement.

Do not let the loop train you to stop reading.

Delivery: Show the authored opening scroll beside the smaller artifact. Stop talking.
