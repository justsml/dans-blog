# The Pager Cried Wolf: 15-minute presenter script

Use slide IDs in the order below. [Timing](timing.md) separates speech, reading, decisions and writing. The four-minute slide-8 walkthrough uses authored case cards, not captured execution; do not switch to a live application. Stories are omitted from shorter routes unless they replace rehearsed prose.

## 00:00 to 02:00: slide 1, Nobody reads the scroll

> Every green suggestion can teach you to stop reading the next one.
> 16,953 ÷ 18 days ÷ 15 beds ≈ 63 alarms per available bed-day

The logs are still arriving. Somewhere in that scroll is work we will call urgent after a customer sends an angry email.

Every green suggestion can teach you to stop reading the next one. Our offline loop has to earn its way past that risk. These are authored teaching fixtures; live integration is unverified.

Cvach's 2012 review reports an earlier project: sixteen thousand nine hundred and fifty-three alarms over eighteen days on a fifteen-bed unit. About sixty-three per available bed-day, not per patient-day. The question for our loop: did we reduce noise, or move it into another queue?

Delivery: Allow fifteen seconds to read the arithmetic. No hands-up.

## 02:00 to 03:30: slide 2, Step one: hand an agent the logs

> Already better than the nobody who was doing it before
> Read access. One question. One saved answer.

Give an agent a sanitized log export. Ask what broke since yesterday. A file and a question.

It can group unrelated failures or miss the important line. Inspect the answer against the input before wiring it to anything. Save the answer and its input window so tomorrow you can distinguish a new finding from a more confident retelling.

One failure class first. Read access to code does not imply write access to production. Add the individual grant that answers the next question.



## 03:30 to 05:00: slide 6, The retry that hid the auth failure

> A retry hides an auth failure
> A sleep hides a race
> Successful workaround ≠ repaired system

A retry works. Score only eventual success and the lesson is retry more. But the first request was forbidden; the second credential belonged to someone else. Green hid the boundary violation.

A workaround is not a repair. Vaughan's normalization of deviance is the warning: an accepted anomaly can become routine. The offline loop needs evidence that the defect is gone, not another demonstration that the symptom disappeared.

Delivery: Take one twenty-second answer; no incident story.

## 05:00 to 06:45: slide 4, The out-of-band check

> Schedule → bookmark → distill → artifact
> Advance the bookmark after durable output

Run outside the request path. Read a bookmark, collect a bounded overlap window, strip secrets, and save an artifact with counts and evidence IDs. Advance the bookmark only after durable output. Retry ticket creation from that artifact with a stable incident key.

Distill repetition before classifying causes. Matching strings suggest a family; they do not establish a root cause. Unknown needs a queue and an owner.

A cron expression does not solve delivery semantics. Nor does it buy permission to move money or message customers. Detect, recommend, draft. A person presses the button.



## 06:45 to 10:45: slide 8, Nothing leaves without evidence

> New case: three matching timeouts; one missing trace
> Regression · holdout · scope · human
> Decide before revealing the evidence

Three timeouts: two in tenant A, one in tenant B. A broader retry policy makes the visible regression green. Promote, hold, or ask for evidence?

Reveal the held-out cancellation case: a cancelled job resumes and writes output. The scope check also shows the policy changed for every tenant. Hold the candidate. Regression, holdout, scope and a person are separate gates.

Now tenant B has no trace. Does matching text establish the same cause? Unknown is an output. Preserve the report for investigation; do not borrow tenant A's diagnosis.

Jidoka names the manufacturing idea of stopping at an abnormality. Here we stop promotion. A rejection without a replacement diagnosis is still useful work.

Delivery: Use the authored case cards in demo.md. Spend 45 seconds on the first vote, 30 seconds reading the two reveal rows, and 45 seconds on the missing-trace decision. Reveal answers only after each decision. No implementation has been run to produce these cards; do not switch to a live application or present them as captured test output.

## 10:45 to 12:45: slide 9, Who reviews the robot's PRs?

> The easy cases disappear
> The reviewer keeps the exceptions

Bainbridge's 1983 Ironies of Automation asks what remains for people after routine work disappears. Monitoring and hard interventions remain; practice can shrink.

My design response is to rotate review duty, reserve time, and practise recovery outside production. That is my proposal, not her measured treatment effect.

Count reviewer time, wrong proposals, missed failures and recurrence. A hundred tickets with ninety wrong is ten percent useful: synthetic arithmetic, not our result. If the loop's review burden exceeds the failures it avoids, turn it down or off. A hundred green suggestions are not a hundred reasons to trust the next one.



## 12:45 to 14:15: slide 14, Start Monday

> One failure class
> One integration
> One place the loop must stop
> Handout vocabulary: alert fatigue · normalization of deviance · jidoka · automation irony · Goodhart

Write one failure class for Monday, its input and the person who will inspect the first output. Name one integration and one condition that stops the loop.

Measure review burden alongside what it finds. If the queue gets worse, the first improvement is fewer proposals.

Delivery: Give the room 45 seconds to write; do not fill the silence.

## 14:15 to 15:00: slide 15, Fail to win

> A smaller queue, with evidence and a stop
> Do not let the loop train you to stop reading.

The scroll still arrives. The smaller artifact carries evidence, and the reviewer can stop it.

If green becomes a reason to stop reading, we built another pager.

Do not let the loop train you to stop reading.

Delivery: Show the authored opening scroll beside the smaller artifact. Stop talking.
