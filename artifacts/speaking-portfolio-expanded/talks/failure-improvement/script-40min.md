# The Pager Cried Wolf: 40-minute presenter script

Use the order below. [Timing budgets](timing.md) include all interactions. Authored case cards, no live application. Story material replaces prose rather than extending it.

## 00:00 to 03:45: slide 1, Nobody reads the scroll

> Every green suggestion can teach you to stop reading the next one.
> 16,953 ÷ 18 days ÷ 15 beds ≈ 63 alarms per available bed-day

The logs are still arriving. Stack traces, retries, the same customer clicking the same broken button. Somewhere in that scroll is work we will call urgent after somebody sends an angry email.

Every green suggestion can teach you to stop reading the next one. That is the risk this offline improvement loop has to earn its way past. The examples are authored teaching fixtures, not captured production results. Runtime recovery belongs to Adaptive, agentic apps.

Cvach's 2012 integrative review covers alarm fatigue across seventy-two articles. It reports Graham and Cvach's earlier quality-improvement project: sixteen thousand nine hundred and fifty-three alarms, eighteen days, fifteen beds. Divide: about sixty-three alarms per available bed per day. That is a capacity denominator, not a patient exposure rate.

The project reported forty-three percent fewer critical alarms after changing alarm defaults, individual limits and policy. It does not measure our pager or prove our loop works. It gives us a question: did we reduce noise, or just move it into another queue?

Delivery: Show the authored log card. Write the division; reserve 15 seconds for it. Allow 30 seconds for hands: who learned about a logged failure from a customer?

Story: The failure that sat in your logs until a customer reported it. Bring the first log timestamp, the report, and what you missed.

## 03:45 to 05:45: slide 2, Step one: hand an agent the logs

> Already better than the nobody who was doing it before
> Read access. One question. One saved answer.

Give a coding agent a sanitized export. Ask what broke since yesterday. That is the first version. A file and a question.

It may group unrelated failures together. It may miss the one line you care about. Inspect the answer against the input before you wire it to anything. But for the queue nobody was reading, we finally have a candidate reader. Already better than the nobody who was doing it before.

Save the answer with the input window. Tomorrow, you want to know whether it found something new or just described yesterday more confidently.





## 05:45 to 08:45: slide 6, The retry that hid the auth failure

> A retry hides an auth failure
> A sleep hides a race
> Successful workaround ≠ repaired system

A request fails. The agent retries. It works. Score the loop on eventual success and the lesson is obvious: retry more.

Now make the failure an authorization error. A second credential works, but the first request was forbidden for a reason. The green result hid the boundary violation. A sleep that hides a race teaches the same lesson more slowly.

Vaughan gives this a name: normalization of deviance. Here the offline review must distinguish a successful workaround from a repaired defect. A repair loop needs evidence that the defect is gone. Successful workarounds are very persuasive evidence of the wrong thing.

Delivery: Take two short answers about fixes that hid a problem. Budget 45 seconds; do not invite incident-length stories.

Story: A workaround you left running after it stopped the symptom. Name the underlying defect and the test that eventually exposed it.

## 08:45 to 11:45: slide 3, Enrichment earns the next step

> Logs → code → trace → reproduction → ticket
> One failure class at a time

A stack trace tells you where an exception surfaced. The code tells you which branch produced it. The trace shows what happened before it. A reproduction tells you whether your explanation survives a second attempt.

Add the integration that answers the next question. Read access to code does not require write access to production. Looking at queue depth does not require permission to resize the cluster. Access is a set of individual grants, not a graduation ceremony.

The assistant with access to everything is coming anyway, and I am not arguing against it. This loop is one job with a countable tool list. An agent reading everything writes you a summary of the noise. Pick one failure class. If the class turns out to contain three different mechanisms, split it. That discovery is useful work.

Delivery: Walk up the ladder using one timeout. Stop at the first rung that supports an action. Use the contracts handout for the integration table. Reserve twenty seconds for this walk.



## 11:45 to 14:30: slide 4, The out-of-band check

> Schedule → bookmark → distill → artifact
> Advance the bookmark after durable output

Run outside the request path. A scheduled job reads the last completed bookmark, fetches a bounded window, strips secrets, and produces an artifact. Each family gets a count, first seen, last seen, and links to the evidence.

Only advance the bookmark after the artifact is saved. If ticket creation fails, retry from that artifact using a stable incident key. Otherwise the failure-improvement system gets its own failure-improvement system, and we are all going home late.

Keep the collection window and the classifier version beside the result. Late-arriving logs need an overlap window and deduplication. A cron expression does not solve delivery semantics.

Delivery: Open contracts.md and trace one interrupted run. Show which artifact survives and why repeating it does not open another ticket. Reserve twenty seconds for this walk.



## 14:30 to 17:00: slide 5, Distill, then classify

> Count occurrences before guessing causes
> Severity · evidence · owner · unknown

Distillation removes repetition. Classification decides where the remaining work goes. Keep those outputs separate so a reviewer can inspect a group without accepting its diagnosis.

Two matching strings are a family candidate. They are not a root cause. Keep the trace IDs and the counterexample that did not fit. A low-severity label needs a reason because a wrong low can leave a customer stranded without anyone looking.

Give the classifier an unknown result and a queue that receives it. If every answer must be one of the happy categories, the prompt has already decided what the agent is allowed to notice.

This is where your one failure class turns out to be three. Let it split. The taxonomy was a guess; the counterexample just improved it.





## 17:00 to 20:00: slide 7, Tickets are cheap. Review is not.

> Tickets are cheap. Review is not.
> A proposed diagnosis travels with its evidence

A useful ticket says what happened, how often, who was affected, and what remains unexplained. It links the evidence. It does not announce a root cause just because the model found a similar issue from last month.

Opening a PR spends somebody else's attention. Require a reproduction, a bounded change, and a named reviewer before the agent adds to that queue. Deduplicate by the incident key. Cap new proposals per run. When the queue is full, hold the artifact and report the backlog.

Match ceremony to consequence. A documentation correction and a payment retry do not get the same permissions because they happen to arrive through the same agent.

We are moving a queue, not deleting one. Count review time and missed failures against the burden this replaces. If inspecting the proposals costs more than the failures you avoid, turn the loop down or off. Detect, recommend, draft. A person presses the button.





## 20:00 to 24:30: slide 8, Nothing leaves without evidence

> New case: three matching timeouts; one missing trace
> Regression · holdout · scope · human
> Decide before revealing the evidence

Three timeout reports. Two from tenant A, one from tenant B. The candidate widens the retry policy. The visible regression is green. Would you promote it, hold it, or ask for evidence?

First reveal: the held-out cancellation case fails. A cancelled job resumes and writes output. The scope check also finds the retry policy changed for every tenant. Those are two reasons to hold the candidate, even though its regression passed.

Now the third timeout. Its trace is missing. Does matching text establish a shared cause? Unknown is an output. Preserve the report and route it for investigation; do not assign tenant A's diagnosis to tenant B.

Toyota's jidoka supplies the useful manufacturing idea: detect an abnormality and stop producing the defect. The andon summons help. Our gate stops promotion; it does not claim to stop an entire company.

The reviewer can reject this proposal without guessing a replacement diagnosis. That is useful work. A blank answer with evidence beats a confident ticket for the wrong incident.

Delivery: Use the authored case cards in demo.md. Spend 45 seconds on the first vote, 30 seconds reading the two reveal rows, and 45 seconds on the missing-trace decision. Reveal answers only after each decision. No implementation has been run to produce these cards; do not switch to a live application or present them as captured test output.



## 24:30 to 27:30: slide 9, Who reviews the robot's PRs?

> The easy cases disappear
> The reviewer keeps the exceptions

The robot opens good PRs for a month. What happens to the person reviewing them?

Bainbridge's Ironies of Automation asks what remains for the human after automation takes the routine work. Monitoring and difficult interventions remain, while opportunities to practise shrink. That paper is from 1983. The problem did not wait for a chat interface.

My design response is to rotate review duty, reserve time for it, and practise recovery on known failures outside production. Sample accepted work for missed defects. Keep evaluation cases separate from the repair agent's tuning loop. A sampling policy is for the audit; it does not wave through a payment or a data deletion.

If the queue is too big to inspect, reduce what enters it. Giving one engineer a hundred green suggestions is not giving them a hundred reasons to trust the next one.

The acceptance history is not permission to stop checking. Keep the rejection evidence visible beside every proposal, and budget reviewer time as part of the system cost.





## 27:30 to 30:30: slide 10, Compile what repeats

> Nondeterminism finds the path. Determinism runs it.
> Save the script, its tests, and its invalidation rule

Let the agent explore a changed flow in a browser. Once it finds the login path, save that path as a script. Stop buying the same discovery on every run.

The scheduled check is the same move. Memory and search over prior work help identify repetition. A skill describes when to turn a repeated task into a file. The output gets reviewed, tested, versioned, and scheduled. When the page or the log schema changes, invalidate it.

A runtime agent earns its own authority elsewhere. A reusable procedure gets evaluated here, offline, like any other change. This is the boundary this talk owns, not a prerequisite handoff from another session.

Selecting tests from a diff is another candidate. Compare it against the full suite on retained changes before trusting the selection. Count missed regressions as well as runtime. Keep the full suite on a schedule. Cheap selection that skips the failing test has excellent unit economics right up to the incident.



Story: The repeated agent task you turned into a script. Bring the file and a case where it needed invalidating.

## 30:30 to 32:45: slide 11, Feedback is the same loop

> Thumbs down + a sentence of rage = a useful input
> Feedback → evidence → candidate → opt-in flag

A thumbs-down tells you where to look. The sentence after it tells you why. Preserve the customer's wording and the session link before you ask the agent to summarize it.

The pipeline now proposes a change instead of a failure diagnosis. Put it behind a flag for the consenting user, check whether it solves their problem, then decide whether a wider cohort belongs in the experiment. Similar usage is a hypothesis about who benefits, not permission to enroll them.

Keep feature requests and incident fixes visibly distinct in the queue. They share machinery. They do not share an acceptance criterion.



Story: A complaint that became a change, including what the first proposed fix misunderstood.

## 32:45 to 34:30: slide 12, Correlate, escalate, and the money gate

> Session ID → linked trace → incident candidate
> Detect. Recommend. Draft. A person presses the button.

A customer reports lost data. Their session links to an error. Escalate with the trace attached. Do not wait for the model to invent a full causal story before a person investigates.

Three address complaints and a shipping error suggest a shared incident. Check tenant, time window, and operation before merging the tickets. A matching word is not a matching outage.

Draft the notice before the fifth customer asks. A person approves the recipients and the message. The same rule covers credits and data deletion. Detect, recommend, draft. A person presses the button.





## 34:30 to 36:30: slide 13, The metrics that will lie to you

> 100 tickets. 90 wrong. Ten worth reading.
> Measure recurrence and wrong tickets, with denominators

Suppose the agent files a hundred tickets and a reviewer closes ninety as wrong. Time-to-ticket looks terrific. Ten percent were worth reading. That is our arithmetic fixture, and it is the number I want next to the throughput chart.

Goodhart is the warning here: once we reward a proxy, we change the behavior producing it. Faster tickets are very easy to manufacture. Faster learning is harder.

Track recurring failures after a fix, with exposure counts. Track wrong tickets among reviewed tickets, and audit the cases the agent ignored. A low false-positive rate bought by filing nothing is another beautiful dashboard. Record backlog age too. Otherwise the reviewer silently pays for the metric win.





## 36:30 to 38:45: slide 14, Start Monday

> One failure class
> One integration
> One place the loop must stop
> Handout vocabulary: alert fatigue · normalization of deviance · jidoka · automation irony · Goodhart

Write down one failure class you could hand this loop on Monday. Name the input and the person who would inspect its first output.

Now name the one integration it needs next. Leave the rest blank. Last, write the condition under which it must stop and ask. That is enough for a first version.

Delivery: Give the room a full 60 seconds. Do not fill it with a recap.



## 38:45 to 40:00: slide 15, Fail to win

> A smaller queue, with evidence and a stop
> Do not let the loop train you to stop reading.

The scroll is still arriving. Now the loop proposes a smaller pile of inspectable work, and the reviewer can stop it. That is the design, not a measured result.

If the queue grows, if the evidence disappears, or if green becomes a reason to stop reading, we built another pager. Measure that before calling it improvement.

Do not let the loop train you to stop reading.

Delivery: Show the authored opening scroll beside the smaller artifact. Stop talking.
