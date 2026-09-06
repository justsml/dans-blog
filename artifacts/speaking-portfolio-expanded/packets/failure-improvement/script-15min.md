# Automating Improvement From Failure: 15-minute presenter script

Use slides 1, 2, 4, 6, 8, 9, 13, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. Demo compressed to four minutes: regression, red holdout, unknown. Rehearse the shortened explanation; do not narrate every integration.

## 00:00 to 01:00: slide 1, Your logs are a roadmap nobody reads

On screen:

> The pager trained you to ignore it
> The next improvement is already in the scroll

The logs are still arriving. Stack traces, retries, the same customer clicking the same broken button. Somewhere in that scroll is work we will eventually call urgent. Usually after somebody sends an angry email.

This talk owns the offline improvement loop, including the people reviewing its output. The examples are teaching fixtures until I attach a production record. Runtime recovery belongs to Adaptive, agentic apps.

There is a name for training people to ignore the channel that is supposed to warn them. Alert fatigue. Cvach reviewed it in clinical monitoring. I am borrowing the mechanism, not claiming a hospital study measured your on-call rotation. If our new agent creates a ticket for every log line, we have automated the thing that made the logs unreadable.

Source: Maria Cvach (2012), [Monitor alarm fatigue: an integrative review](https://pubmed.ncbi.nlm.nih.gov/22839984/), Biomedical Instrumentation & Technology 46(4), 268–277.

Story: The failure that sat in your logs until a customer reported it. Bring the first log timestamp, the report, and what you missed.

Delivery: Scroll a sanitized export. Take a show of hands: who learned about a logged failure from a customer? Allow 30 seconds.

## 01:00 to 02:00: slide 2, Step one: hand an agent the logs

On screen:

> Already better than the nobody who was doing it before
> Read access. One question. One saved answer.

Give a coding agent a sanitized export. Ask what broke since yesterday. That is the first version. A file and a question.

It may group unrelated failures together. It may miss the one line you care about. Inspect the answer against the input before you wire it to anything. But for the queue nobody was reading, we finally have a candidate reader. Already better than the nobody who was doing it before.

Save the answer with the input window. Tomorrow, you want to know whether it found something new or just described yesterday more confidently.

Bridge: add only the integration needed for one failure class; the check preserves counts and evidence.

## 02:00 to 03:30: slide 4, The out-of-band check

On screen:

> Schedule → bookmark → distill → artifact
> Advance the bookmark after durable output

Run outside the request path. A scheduled job reads the last completed bookmark, fetches a bounded window, strips secrets, and produces an artifact. Each family gets a count, first seen, last seen, and links to the evidence.

Only advance the bookmark after the artifact is saved. If ticket creation fails, retry from that artifact using a stable incident key. Otherwise the failure-improvement system gets its own failure-improvement system, and we are all going home late.

Keep the collection window and the classifier version beside the result. Late-arriving logs need an overlap window and deduplication. A cron expression does not solve delivery semantics.

Delivery: Open contracts.md and trace one interrupted run. Show which artifact survives and why repeating it does not open another ticket.

Bridge: distill before classifying, and give unexplained cases an unknown result.

## 03:30 to 05:30: slide 6, The retry that hid the auth failure

On screen:

> A retry hides an auth failure
> A sleep hides a race
> Successful workaround ≠ repaired system

A request fails. The agent retries. It works. Score the loop on eventual success and the lesson is obvious: retry more.

Now make the failure an authorization error. A second credential works, but the first request was forbidden for a reason. The green result hid the boundary violation. A sleep that hides a race teaches the same lesson more slowly.

Diane Vaughan called the organizational pattern normalization of deviance. Her Challenger analysis shows how repeated acceptance of anomalies made them ordinary. Our application is narrower: a repair loop needs evidence that the defect is gone, because successful workarounds are very persuasive evidence of the wrong thing.

Source: Diane Vaughan, [The Challenger Launch Decision](https://press.uchicago.edu/ucp/books/book/chicago/C/bo22781921.html), University of Chicago Press, original 1996; linked enlarged edition 2016.

Story: A workaround you left running after it stopped the symptom. Name the underlying defect and the test that eventually exposed it.

Delivery: Take two short answers about fixes that hid a problem. Budget 45 seconds; do not invite incident-length stories.

Bridge: tickets and PRs carry evidence into a bounded review queue.

## 05:30 to 09:30: slide 8, Demo: nothing leaves without evidence

On screen:

> Regression · holdout · scope · human
> The useful result is permission denied

The candidate removes the visible failure. That is the beginning of the demo, not the result.

Run the regression. Now run the held-out authorization case. It fails. The proposed retry used authority that belonged to somebody else. The gate holds the change without asking the agent whether it feels finished.

Toyota calls stopping at an abnormality jidoka. That is the useful part to borrow. Detect the defect and stop producing it. The andon summons help; it is not a story about one cord stopping an entire company.

Now give the classifier the case it cannot explain. Unknown is an output. It lands in review with the evidence intact. No automatic promotion, no invented diagnosis. Does similarity establish cause? We just watched it fail that test.

Source: Toyota, [Toyota Production System](https://global.toyota/en/company/vision-and-philosophy/production-system/), jidoka and the andon response.

Delivery: Use the live sequence in engineering/failure-improvement/demo.md. Full slot 5:30. Run real tests; never substitute the checkbox kit for execution. Recording remains blocked until a sanitized production export, working tracker integration, and captured gate run exist.

## 09:30 to 11:30: slide 9, Who reviews the robot's PRs?

On screen:

> The easy cases disappear
> The reviewer keeps the exceptions

The robot opens good PRs for a month. What happens to the person reviewing them?

Bainbridge's Ironies of Automation asks what remains for the human after automation takes the routine work. Monitoring and difficult interventions remain, while opportunities to practise shrink. That paper is from 1983. The problem did not wait for a chat interface.

My design response is to rotate review duty, reserve time for it, and practise recovery on known failures outside production. Sample accepted work for missed defects. Keep evaluation cases separate from the repair agent's tuning loop. A sampling policy is for the audit; it does not wave through a payment or a data deletion.

If the queue is too big to inspect, reduce what enters it. Giving one engineer a hundred green suggestions is not giving them a hundred reasons to trust the next one.

Source: Lisanne Bainbridge (1983), [Ironies of automation](https://www.sciencedirect.com/science/article/pii/0005109883900468), Automatica 19(6), 775–779.

Bridge: compile repeated paths into tested scripts; feedback uses the same queue, and people approve money, messages, and deletion.

## 11:30 to 13:30: slide 13, The metrics that will lie to you

On screen:

> 100 tickets. 90 wrong. Ten worth reading.
> Measure recurrence and wrong tickets, with denominators

Suppose the agent files a hundred tickets and a reviewer closes ninety as wrong. Time-to-ticket looks terrific. Ten percent were worth reading. That is our arithmetic fixture, and it is the number I want next to the throughput chart.

Goodhart is the warning here: once we reward a proxy, we change the behavior producing it. Faster tickets are very easy to manufacture. Faster learning is harder.

Track recurring failures after a fix, with exposure counts. Track wrong tickets among reviewed tickets, and audit the cases the agent ignored. A low false-positive rate bought by filing nothing is another beautiful dashboard. Record backlog age too. Otherwise the reviewer silently pays for the metric win.

Source: Marilyn Strathern (1997), [Improving ratings: audit in the British University system](https://gwern.net/doc/statistics/decision/1997-strathern.pdf), European Review 5(3), 305–321. The familiar target-and-measure wording is Strathern’s formulation of Goodhart’s law.

Bridge: choose one failure class and one integration on Monday.

## 13:30 to 15:00: slide 15, Fail to win

On screen:

> Alert fatigue · normalization of deviance
> Jidoka · automation irony · Goodhart

The scroll is still arriving. Now the loop leaves a smaller pile of inspectable work, and it knows where to stop.

Alert fatigue explains the unread channel. Normalization of deviance explains the successful workaround. Jidoka gives the stop a job. Automation irony asks what we did to the reviewer. Goodhart asks whether the dashboard rewarded the wrong thing.

The model did not get smarter. The system around it got a job.

Delivery: Replay the opening scroll beside the distilled artifact. End there.
