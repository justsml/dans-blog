# Automating Improvement From Failure: 40-minute presenter script

Use slides 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A.

## 00:00 to 02:30: slide 1, Your logs are a roadmap nobody reads

The logs are still arriving. Stack traces, retries, the same customer clicking the same broken button. Somewhere in that scroll is work we will eventually call urgent. Usually after somebody sends an angry email.

This talk owns the offline improvement loop, including the people reviewing its output. The examples are teaching fixtures until I attach a production record. Runtime recovery belongs to Adaptive, agentic apps.

There is a name for training people to ignore the channel that is supposed to warn them. Alert fatigue. Cvach reviewed it in clinical monitoring. I am borrowing the mechanism, not claiming a hospital study measured your on-call rotation. If our new agent creates a ticket for every log line, we have automated the thing that made the logs unreadable.

Source: Maria Cvach (2012), [Monitor alarm fatigue: an integrative review](https://pubmed.ncbi.nlm.nih.gov/22839984/), Biomedical Instrumentation & Technology 46(4), 268–277.

Story: The failure that sat in your logs until a customer reported it. Bring the first log timestamp, the report, and what you missed.

Delivery: Scroll a sanitized export. Take a show of hands: who learned about a logged failure from a customer? Allow 30 seconds.

## 02:30 to 04:30: slide 2, Step one: hand an agent the logs

Give a coding agent a sanitized export. Ask what broke since yesterday. That is the first version. A file and a question.

It may group unrelated failures together. It may miss the one line you care about. Inspect the answer against the input before you wire it to anything. But for the queue nobody was reading, we finally have a candidate reader. Already better than the nobody who was doing it before.

Save the answer with the input window. Tomorrow, you want to know whether it found something new or just described yesterday more confidently.

## 04:30 to 07:30: slide 3, Enrichment earns the next step

A stack trace tells you where an exception surfaced. The code tells you which branch produced it. The trace shows what happened before it. A reproduction tells you whether your explanation survives a second attempt.

Add the integration that answers the next question. Read access to code does not require write access to production. Looking at queue depth does not require permission to resize the cluster. Access is a set of individual grants, not a graduation ceremony.

An agent reading everything writes you a summary of the noise. Pick one failure class. If the class turns out to contain three different mechanisms, split it. That discovery is useful work.

Delivery: Walk up the ladder using one timeout. Stop at the first rung that supports an action. Use the contracts handout for the integration table.

## 07:30 to 10:30: slide 4, The out-of-band check

Run outside the request path. A scheduled job reads the last completed bookmark, fetches a bounded window, strips secrets, and produces an artifact. Each family gets a count, first seen, last seen, and links to the evidence.

Only advance the bookmark after the artifact is saved. If ticket creation fails, retry from that artifact using a stable incident key. Otherwise the failure-improvement system gets its own failure-improvement system, and we are all going home late.

Keep the collection window and the classifier version beside the result. Late-arriving logs need an overlap window and deduplication. A cron expression does not solve delivery semantics.

Delivery: Open contracts.md and trace one interrupted run. Show which artifact survives and why repeating it does not open another ticket.

## 10:30 to 13:00: slide 5, Distill, then classify

Distillation removes repetition. Classification decides where the remaining work goes. Keep those outputs separate so a reviewer can inspect a group without accepting its diagnosis.

Two matching strings are a family candidate. They are not a root cause. Keep the trace IDs and the counterexample that did not fit. A low-severity label needs a reason because a wrong low can leave a customer stranded without anyone looking.

Give the classifier an unknown result and a queue that receives it. If every answer must be one of the happy categories, the prompt has already decided what the agent is allowed to notice.

## 13:00 to 16:00: slide 6, The retry that hid the auth failure

A request fails. The agent retries. It works. Score the loop on eventual success and the lesson is obvious: retry more.

Now make the failure an authorization error. A second credential works, but the first request was forbidden for a reason. The green result hid the boundary violation. A sleep that hides a race teaches the same lesson more slowly.

Diane Vaughan called the organizational pattern normalization of deviance. Her Challenger analysis shows how repeated acceptance of anomalies made them ordinary. Our application is narrower: a repair loop needs evidence that the defect is gone, because successful workarounds are very persuasive evidence of the wrong thing.

Source: Diane Vaughan, [The Challenger Launch Decision](https://press.uchicago.edu/ucp/books/book/chicago/C/bo22781921.html), University of Chicago Press, original 1996; linked enlarged edition 2016.

Story: A workaround you left running after it stopped the symptom. Name the underlying defect and the test that eventually exposed it.

Delivery: Take two short answers about fixes that hid a problem. Budget 45 seconds; do not invite incident-length stories.

## 16:00 to 18:30: slide 7, From tags to tickets and PRs

A useful ticket says what happened, how often, who was affected, and what remains unexplained. It links the evidence. It does not announce a root cause just because the model found a similar issue from last month.

Opening a PR spends somebody else's attention. Require a reproduction, a bounded change, and a named reviewer before the agent adds to that queue. Deduplicate by the incident key. Cap new proposals per run. When the queue is full, hold the artifact and report the backlog.

Match ceremony to consequence. A documentation correction and a payment retry do not get the same permissions because they happen to arrive through the same agent.

## 18:30 to 24:00: slide 8, Demo: nothing leaves without evidence

The candidate removes the visible failure. That is the beginning of the demo, not the result.

Run the regression. Now run the held-out authorization case. It fails. The proposed retry used authority that belonged to somebody else. The gate holds the change without asking the agent whether it feels finished.

Toyota calls stopping at an abnormality jidoka. That is the useful part to borrow. Detect the defect and stop producing it. The andon summons help; it is not a story about one cord stopping an entire company.

Now give the classifier the case it cannot explain. Unknown is an output. It lands in review with the evidence intact. No automatic promotion, no invented diagnosis. Does similarity establish cause? We just watched it fail that test.

Source: Toyota, [Toyota Production System](https://global.toyota/en/company/vision-and-philosophy/production-system/), jidoka and the andon response.

Delivery: Use the live sequence in engineering/failure-improvement/demo.md. Full slot 5:30. Run real tests; never substitute the checkbox kit for execution. Recording remains blocked until a sanitized production export, working tracker integration, and captured gate run exist.

## 24:00 to 27:00: slide 9, Who reviews the robot's PRs?

The robot opens good PRs for a month. What happens to the person reviewing them?

Bainbridge's Ironies of Automation asks what remains for the human after automation takes the routine work. Monitoring and difficult interventions remain, while opportunities to practise shrink. That paper is from 1983. The problem did not wait for a chat interface.

My design response is to rotate review duty, reserve time for it, and practise recovery on known failures outside production. Sample accepted work for missed defects. Keep evaluation cases separate from the repair agent's tuning loop. A sampling policy is for the audit; it does not wave through a payment or a data deletion.

If the queue is too big to inspect, reduce what enters it. Giving one engineer a hundred green suggestions is not giving them a hundred reasons to trust the next one.

Source: Lisanne Bainbridge (1983), [Ironies of automation](https://www.sciencedirect.com/science/article/pii/0005109883900468), Automatica 19(6), 775–779.

## 27:00 to 30:00: slide 10, Compile what repeats

Let the agent explore a changed flow in a browser. Once it finds the login path, save that path as a script. Stop buying the same discovery on every run.

The scheduled check is the same move. Memory and search over prior work help identify repetition. A skill describes when to turn a repeated task into a file. The output gets reviewed, tested, versioned, and scheduled. When the page or the log schema changes, invalidate it.

Selecting tests from a diff is another candidate. Compare it against the full suite on retained changes before trusting the selection. Count missed regressions as well as runtime. Keep the full suite on a schedule. Cheap selection that skips the failing test has excellent unit economics right up to the incident.

Story: The repeated agent task you turned into a script. Bring the file and a case where it needed invalidating. Use measured browser-test costs only with run records.

## 30:00 to 32:30: slide 11, Feedback is the same loop

A thumbs-down tells you where to look. The sentence after it tells you why. Preserve the customer's wording and the session link before you ask the agent to summarize it.

The pipeline now proposes a change instead of a failure diagnosis. Put it behind a flag for the consenting user, check whether it solves their problem, then decide whether a wider cohort belongs in the experiment. Similar usage is a hypothesis about who benefits, not permission to enroll them.

Keep feature requests and incident fixes visibly distinct in the queue. They share machinery. They do not share an acceptance criterion.

Story: A complaint that became a change, including what the first proposed fix misunderstood.

## 32:30 to 35:00: slide 12, Correlate, escalate, and the money gate

A customer reports lost data. Their session links to an error. Escalate with the trace attached. Do not wait for the model to invent a full causal story before a person investigates.

Three address complaints and a shipping error suggest a shared incident. Check tenant, time window, and operation before merging the tickets. A matching word is not a matching outage.

Draft the notice before the fourth customer asks. A person approves the recipients and the message. The same rule covers credits and data deletion. Detect, recommend, draft. A person presses the button.

## 35:00 to 37:00: slide 13, The metrics that will lie to you

Suppose the agent files a hundred tickets and a reviewer closes ninety as wrong. Time-to-ticket looks terrific. Ten percent were worth reading. That is our arithmetic fixture, and it is the number I want next to the throughput chart.

Goodhart is the warning here: once we reward a proxy, we change the behavior producing it. Faster tickets are very easy to manufacture. Faster learning is harder.

Track recurring failures after a fix, with exposure counts. Track wrong tickets among reviewed tickets, and audit the cases the agent ignored. A low false-positive rate bought by filing nothing is another beautiful dashboard. Record backlog age too. Otherwise the reviewer silently pays for the metric win.

Source: Marilyn Strathern (1997), [Improving ratings: audit in the British University system](https://gwern.net/doc/statistics/decision/1997-strathern.pdf), European Review 5(3), 305–321. The familiar target-and-measure wording is Strathern’s formulation of Goodhart’s law.

## 37:00 to 38:30: slide 14, Start Monday

Write down one failure class you could hand this loop on Monday. Name the input and the person who would inspect its first output.

Now name the one integration it needs next. Leave the rest blank. Last, write the condition under which it must stop and ask. That is enough for a first version.

Delivery: Give the room a full 60 seconds. Do not fill it with a recap.

## 38:30 to 40:00: slide 15, Fail to win

The scroll is still arriving. Now the loop leaves a smaller pile of inspectable work, and it knows where to stop.

Alert fatigue explains the unread channel. Normalization of deviance explains the successful workaround. Jidoka gives the stop a job. Automation irony asks what we did to the reviewer. Goodhart asks whether the dashboard rewarded the wrong thing.

The model did not get smarter. The system around it got a job.

Delivery: Replay the opening scroll beside the distilled artifact. End there.
