# The Pager Cried Wolf: bullets

15 source slides; presentation order 1, 2, 6, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15. [Full prose](index.md) · [Per-slide timing](timing.md).

## 1. Nobody reads the scroll

> Every green suggestion can teach you to stop reading the next one.
> 16,953 ÷ 18 days ÷ 15 beds ≈ 63 alarms per available bed-day

- The logs are still arriving.
- Every green suggestion can teach you to stop reading the next one.
- Cvach's 2012 integrative review covers alarm fatigue across seventy-two articles.
- The project reported forty-three percent fewer critical alarms after changing alarm defaults, individual limits and policy.

Stage direction: Show the authored log card. Write the division; reserve 15 seconds for it. Allow 30 seconds for hands: who learned about a logged failure from a customer?

## 2. Step one: hand an agent the logs

> Already better than the nobody who was doing it before
> Read access. One question. One saved answer.

- Give a coding agent a sanitized export.
- It may group unrelated failures together.
- Save the answer with the input window.



## 6. The retry that hid the auth failure

> A retry hides an auth failure
> A sleep hides a race
> Successful workaround ≠ repaired system

- A request fails.
- Now make the failure an authorization error.
- Vaughan gives this a name: normalization of deviance.

Stage direction: Take two short answers about fixes that hid a problem. Budget 45 seconds; do not invite incident-length stories.

## 3. Enrichment earns the next step

> Logs → code → trace → reproduction → ticket
> One failure class at a time

- A stack trace tells you where an exception surfaced.
- Add the integration that answers the next question.
- The assistant with access to everything is coming anyway, and I am not arguing against it.

Stage direction: Walk up the ladder using one timeout. Stop at the first rung that supports an action. Use the contracts handout for the integration table.

## 4. The out-of-band check

> Schedule → bookmark → distill → artifact
> Advance the bookmark after durable output

- Run outside the request path.
- Only advance the bookmark after the artifact is saved.
- Keep the collection window and the classifier version beside the result.

Stage direction: Open contracts.md and trace one interrupted run. Show which artifact survives and why repeating it does not open another ticket.

## 5. Distill, then classify

> Count occurrences before guessing causes
> Severity · evidence · owner · unknown

- Distillation removes repetition.
- Two matching strings are a family candidate.
- Give the classifier an unknown result and a queue that receives it.
- This is where your one failure class turns out to be three.



## 7. Tickets are cheap. Review is not.

> Tickets are cheap. Review is not.
> A proposed diagnosis travels with its evidence

- A useful ticket says what happened, how often, who was affected, and what remains unexplained.
- Opening a PR spends somebody else's attention.
- Match ceremony to consequence.
- We are moving a queue, not deleting one.



## 8. Nothing leaves without evidence

> New case: three matching timeouts; one missing trace
> Regression · holdout · scope · human
> Decide before revealing the evidence

- Three timeout reports.
- First reveal: the held-out cancellation case fails.
- Now the third timeout.
- Toyota's jidoka supplies the useful manufacturing idea: detect an abnormality and stop producing the defect.
- The reviewer can reject this proposal without guessing a replacement diagnosis.

Stage direction: Use the authored case cards in demo.md. Spend 45 seconds on the first vote, 30 seconds reading the two reveal rows, and 45 seconds on the missing-trace decision. Reveal answers only after each decision. No implementation has been run to produce these cards; do not switch to a live application or present them as captured test output.

## 9. Who reviews the robot's PRs?

> The easy cases disappear
> The reviewer keeps the exceptions

- The robot opens good PRs for a month.
- Bainbridge's Ironies of Automation asks what remains for the human after automation takes the routine work.
- My design response is to rotate review duty, reserve time for it, and practise recovery on known failures outside production.
- If the queue is too big to inspect, reduce what enters it.
- The acceptance history is not permission to stop checking.



## 10. Compile what repeats

> Nondeterminism finds the path. Determinism runs it.
> Save the script, its tests, and its invalidation rule

- Let the agent explore a changed flow in a browser.
- The scheduled check is the same move.
- A runtime agent earns its own authority elsewhere.
- Selecting tests from a diff is another candidate.



## 11. Feedback is the same loop

> Thumbs down + a sentence of rage = a useful input
> Feedback → evidence → candidate → opt-in flag

- A thumbs-down tells you where to look.
- The pipeline now proposes a change instead of a failure diagnosis.
- Keep feature requests and incident fixes visibly distinct in the queue.



## 12. Correlate, escalate, and the money gate

> Session ID → linked trace → incident candidate
> Detect. Recommend. Draft. A person presses the button.

- A customer reports lost data.
- Three address complaints and a shipping error suggest a shared incident.
- Draft the notice before the fifth customer asks.



## 13. The metrics that will lie to you

> 100 tickets. 90 wrong. Ten worth reading.
> Measure recurrence and wrong tickets, with denominators

- Suppose the agent files a hundred tickets and a reviewer closes ninety as wrong.
- Goodhart is the warning here: once we reward a proxy, we change the behavior producing it.
- Track recurring failures after a fix, with exposure counts.



## 14. Start Monday

> One failure class
> One integration
> One place the loop must stop
> Handout vocabulary: alert fatigue · normalization of deviance · jidoka · automation irony · Goodhart

- Write down one failure class you could hand this loop on Monday.
- Now name the one integration it needs next.

Stage direction: Give the room a full 60 seconds. Do not fill it with a recap.

## 15. Fail to win

> A smaller queue, with evidence and a stop
> Do not let the loop train you to stop reading.

- The scroll is still arriving.
- If the queue grows, if the evidence disappears, or if green becomes a reason to stop reading, we built another pager.
- Do not let the loop train you to stop reading.

Stage direction: Show the authored opening scroll beside the smaller artifact. Stop talking.
