# Automating Improvement From Failure

40 minutes · 18 slides · 40min

Timings are rehearsal targets, excluding Q&A. Speaker notes are delivery guidance, not a verbatim script.

## 1. Automating Improvement From Failure

0.0–1.0 minutes

Yesterday’s fix should survive today.
Train the system, not just the model.

Open with an intentionally ordinary failure: an agent launches integration tests while the database is still starting. A person recognizes the error, waits, reruns, and gets a green result. Tomorrow another session repeats the same sequence. Nobody needs a more eloquent apology. We need yesterday’s discovery to change tomorrow’s execution. This talk develops a proposed engineering workflow, illustrated with synthetic fixtures, rather than claiming an autonomous learning system has been deployed. The model can help diagnose and propose. Durable artifacts, regression checks, and an accountable owner decide what survives. Ask the room to recall one correction they have made more than once.

## 2. The human became the database

1.0–3.0 minutes

Fail → explain → retry → forget
Then pay the human again.

Follow the database example through three separate sessions. Each session succeeds locally, so a completion dashboard can look healthy while the repeated interruption remains invisible. The missing metric is recurrence after a known resolution exists. Capture the initial error and the corrective action, not merely the final success. Count only comparable episodes: a missing database service, invalid credentials, and a migration failure may share connection symptoms but demand different fixes. The proposed lesson is organizational: if a person keeps supplying the same prerequisite, the workflow has externalized state into that person. Learning starts by making that repeated dependency visible and reproducible before prescribing a fix.

## 3. Capture a case, not a confession

3.0–5.0 minutes

Error + environment + action
Cause + scope + expected outcome
Redact before retention.

Create a case record with a normalized error, service version, execution phase, observed readiness state, correction, and expected outcome. Preserve a source reference so another engineer can inspect the evidence. Strip secrets and unnecessary personal data before storing or indexing traces. Mark the root cause as a hypothesis until a reproduction supports it. In our synthetic case, connection refused during startup differs from authentication denied after readiness. That distinction will become an explicit negative example. An agent’s explanation of what happened is useful evidence, but it is not the event itself. Prefer tool results and observed state when they contradict a confident retrospective narrative.

## 4. First ask whether the work should exist

5.0–8.0 minutes

1 Eliminate the underlying problem
2 Prevent it deterministically
3 Encode code, test, or hook
4 Offer a reusable tool

Before writing another instruction, inspect the architecture. Could the test harness own service startup and readiness as one operation? If so, remove the caller’s obligation to remember ordering. If separate orchestration remains necessary, enforce a readiness check in code. Package the operation as a tested entry point before exposing it as a tool. These are preferences, not universal rankings: a rarely used workflow may justify a small scoped note instead of a new subsystem. The important question is whether the correction can disappear from the agent’s decision space. Our worked case chooses a harness precondition because the prerequisite is objective and applies to every integration run.

## 5. Put uncertain knowledge in a smaller scope

8.0–10.0 minutes

5 Skill for a reusable workflow
6 Retrieve contextual knowledge
7 Instruction as the last durable stop
8 Hope is not a storage layer

Some corrections cannot become a reliable boolean check. A migration investigation may require a sequence of judgments across tools, making a reusable skill appropriate. A vendor-specific limitation may belong in retrievable knowledge with version scope. A brief instruction can be justified when the rule is stable and broadly applicable, but globally injecting every incident increases ambiguity and context cost. In our example, retain the readiness rationale near the harness documentation, and remove the redundant global reminder once code enforces it. This hierarchy is the talk’s proposed design discipline. It does not establish that skills always outperform instructions or that memory itself improves every task.

## 6. A correction is a candidate change

10.0–12.0 minutes

Trace → label → candidate patch
Reproduce → compare → review
Promote only after the gate

Separate discovering a lesson from granting it authority. The extraction stage can suggest that startup readiness caused the failure; a candidate patch can add a preflight function. Neither should silently rewrite repository rules. Give the proposal an owner, scope, supporting cases, and rollback path. Run the reproducer and related regression cases before promotion. Anthropic’s evaluation guidance supports combining code, model, and human grading; the specific promotion workflow here is our engineering proposal. The distinction matters because a system can confidently learn the wrong lesson from a successful workaround. A sleep may hide a race without fixing it, and a retry may hide an authorization problem.

Sources: [Reference](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

## 7. The tiny fixture that catches the wrong lesson

12.0–14.0 minutes

Starting → wait, then run
Ready → run once
Denied → stop; do not retry
Deadline → stop; explain

Introduce four synthetic stage fixtures. In the first, service readiness changes from starting to ready. In the second, it is already ready. The third reports denied credentials. The fourth never becomes ready before the deadline. Ask which cases a fixed sleep handles correctly and which it merely postpones. The desired behavior is not that all runs report success: the denied and deadline cases must stop honestly. This is where a vague lesson becomes a behavioral contract. The demo will replay deterministic status events, so attendees can inspect the exact decision without waiting for a model or an actual database. These cases illustrate coverage; they are not production reliability measurements.

## 8. Demo: yesterday’s failure becomes a test

14.0–18.0 minutes

Normalize two connection failures
Propose a scoped readiness check
Block promotion without holdout proof

Run the bundled offline fixture demonstration and explain that it extracts a proposal; it does not repair a live system. Two connection-refused messages with different local ports normalize to the same error family. The system proposes a readiness check within the stated startup scope. Permission denied remains unknown rather than inheriting that advice. Show the promotion record: regressionPassed, holdoutPassed, and scopeMatches must all be true. The checkboxes represent verification evidence, not executed tests. Toggle holdout to false and show promotion blocked. The four-minute segment demonstrates evidence gating and conservative retrieval. No model call, database connection, or automatic repository mutation occurs. The surrounding readiness scenarios are conceptual test designs for a future implementation, not measured results from this fixture kit.

## 9. Run the old cases too

18.0–21.0 minutes

A new fix can reopen an old bug.
Keep held-out cases and severity gates.
Version the candidate and the grader.

A reproducer is necessary but easy to overfit. Add an already-ready service so waiting logic cannot delay every run. Add denied credentials so retries cannot become the universal response. Keep a separate holdout set when tuning prompts or rules repeatedly, and report performance by failure class and severity. For actual stochastic agent runs, repeat trials and report uncertainty; a deterministic fixture has no sampling variance but still has limited coverage. The proposed promotion gate rejects new critical failures, requires the targeted regression to pass, and records changes in runtime or resource use. Thresholds belong to the workload owner. A prettier aggregate score cannot waive an explicit safety or correctness invariant.

## 10. Search the incident before inventing memory

21.0–23.0 minutes

Exact error → normalized error
Then full-text or similarity search
Always filter by applicability.

Suppose another session sees connection refused. An exact error index may already retrieve the relevant startup case. Add normalization for changing ports or temporary paths while preserving distinctions that explain root cause. Filter by service and version before expanding to fuzzy matching, full-text search, or vectors. Similar wording does not establish the same cause: a network policy can produce a superficially related connection error. Return the case’s applicability, evidence, and replacement artifact alongside its fix. Boring search is a deliberate starting point because its matches are easy to inspect. Upgrade retrieval only when measured misses justify the additional machinery and operational burden for this corpus.

## 11. Give each lesson an expiry story

23.0–25.0 minutes

Owner + scope + source
Last verified + last triggered
Supersedes + replacement artifact

Create a lifecycle for the retained readiness lesson. At creation, record the affected harness version and the cases used to verify it. When a new harness owns readiness internally, point the record at the enforcing code and mark the older reminder as superseded. Do not erase the incident history: future debugging may need to understand why the gate exists. Separate a searchable historical archive from instructions injected into active sessions. Trigger counts help locate unused material, but low frequency does not prove a rare critical rule is disposable. An owner should review scope, current enforcement, and consequence before retiring the lesson. This is proposed maintenance policy rather than a model capability.

## 12. Memory without garbage collection is a leak

25.0–28.0 minutes

Merge duplicates
Retire rules enforced by code
Reverify version-bound advice
Archive the reasoning

Show three copies of the same reminder: a global instruction, a skill paragraph, and an incident entry. They were useful at different stages, but now the harness makes the behavior automatic. Keeping all three active creates opportunities for drift when someone updates only one. Merge the explanation near the implementation, preserve the original incident as historical evidence, and retire redundant prompt material. Pruning should follow a reviewable diff, just like adding a lesson. Avoid treating age as the only signal; an old invariant can remain valid. The operational objective is less active ambiguity while retaining provenance. Forgetting is controlled removal from execution context, not destruction of organizational history.

## 13. The loop needs an owner and a rollback

28.0–30.0 minutes

Propose separately from promote
Protect data and policy boundaries
Canary bounded changes
Restore the prior artifact

A system that edits its own instructions creates a new change channel. Give that channel the same protections as ordinary code: reviewable artifacts, scoped permissions, regression checks, deployment history, and rollback. Do not let text found in a trace become executable policy merely because the model labels it a lesson. Treat retained customer content and tool output as data. For the readiness patch, the owner can inspect a small code change and four assertions before adoption. For a learned routing change, the review may require more evidence and a staged rollout. Adapt the gate to the consequence of error rather than applying equal ceremony to every documentation correction.

## 14. Managed stack or five-dollar loop?

30.0–32.0 minutes

Same evidence contract
Different storage and workflow
Buy coordination when you need it.

A hosted observability and evaluation stack can centralize traces, annotation, datasets, and comparison runs. A small team can begin with sanitized structured records, a local replay command, and a pull request containing the proposed fix. Both require a concrete definition of success and a promotion decision. The talk does not compare vendor pricing or promise the small version literally costs five dollars; the phrase describes a deliberately modest starting point. Choose infrastructure based on volume, collaboration needs, access control, and retention requirements. In our case, the interesting artifact is a readiness gate with evidence, not a dashboard. Keep the feedback contract portable so the workflow survives tooling changes.

## 15. Measure recurrence, not lesson count

32.0–34.0 minutes

Repeat failures per comparable run
Human correction time
Regression escapes
Active instruction burden

Avoid celebrating the number of memories created. A system can generate hundreds of lessons without changing behavior. Track repeated failures among runs where a lesson should apply, the time people spend correcting them, and any regressions introduced by the intervention. Also monitor the amount of active instruction material, because growth can signal that deterministic work is still being delegated to probabilistic recall. Attribute improvements cautiously: changes in workload or environment may explain a lower incident count. Compare like with like and retain the denominator. For the stage example, we can show that four fixtures satisfy their contracts; we cannot infer a real-world reduction in support burden from that exercise.

## 16. When should you leave the failure alone?

34.0–36.0 minutes

One-off event? Archive it.
Uncertain cause? Investigate it.
Broad rule? Demand broader evidence.

Not every surprising run warrants a permanent correction. A one-time outage may deserve an incident record but no agent instruction. An uncertain cause needs diagnosis before encoding a workaround. A proposal that broadens permissions or disables checks should face a much stronger burden of evidence than a scoped documentation clarification. Return to the readiness example: a single connection failure cannot establish that all connections need retries. The four cases force us to narrow the rule to a particular startup state and deadline. This is the restraint that keeps improvement from becoming drift. The system should retain what the evidence supports and label the rest as unresolved, rather than manufacturing confidence.

## 17. The next failure has a destination

36.0–39.0 minutes

Test or code when enforceable
Tool or skill when reusable
Scoped knowledge when contextual
Review, promote, and prune

Offer a practical exercise for the following week. Select one recurring correction with a clear owner and a reproducible symptom. Write down the expected behavior and one nearby situation where the same fix would be wrong. Choose the smallest durable intervention using the hierarchy introduced earlier. Compare it against current behavior, review the diff, and record how to undo it. Schedule a lifecycle review only if the organization chooses to adopt the workflow; this presentation creates no automation. The deliverable is one intervention with evidence, not a new platform. If the exercise produces no safe generalization, a well-scoped incident record is still useful work and an honest outcome.

## 18. Manufacture cheap determinism

39.0–40.0 minutes

Use expensive nondeterminism
to manufacture cheap determinism.

Close by replaying the opening incident. The database is starting, but now the harness checks readiness and either runs safely within its contract or stops with an accurate explanation. The model did not acquire a permanent new memory inside its weights. The surrounding system changed. Preserve the user’s central distinction: training the system does not require training the model. The valuable output of a difficult reasoning episode may be a small function, a test, a clearer interface, or a narrower rule. Ask attendees to name where their next recurring failure will go. End on a concrete standard: the discovery should make the next comparable task cheaper to execute or easier to verify.

