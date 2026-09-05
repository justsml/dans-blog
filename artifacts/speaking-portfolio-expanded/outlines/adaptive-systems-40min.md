# Building Adaptive & Dynamic AI Systems

40 minutes · 18 slides · 40min

Timings are rehearsal targets, excluding Q&A. Speaker notes are delivery guidance, not a verbatim script.

## 1. Building Adaptive & Dynamic AI Systems

0.0–1.0 minutes

Different work, different compute.
Choose architecture at runtime.

Open with two requests: retrieve a known password-reset procedure and investigate intermittent WebSocket disconnects. Giving both the same model, context window, agent count, and tool permissions is a choice, even when it is accidental. This talk proposes a bounded runtime planner that chooses a strategy from approved capabilities and revises it when observed evidence warrants more effort. It does not claim an unconstrained system can design its own reliable organization. The worked example is synthetic, and the demonstration replays deterministic planner fixtures. The useful change is moving selected workload-dependent decisions into an observable control loop while keeping budgets, permissions, and accountability outside the planner’s discretion.

## 2. A static architecture hides a policy

1.0–3.0 minutes

Same model
Same context
Same agents
Different problem

Draw two arrows entering one fixed agent box. Ask what the organization pays for simplicity and what it gains from predictability. A fixed workflow can be exactly right for a stable, narrow workload. Adaptation earns its complexity only if different task classes benefit from different strategies. The reset question might be answered from an approved deterministic lookup; the incident may require competing explanations and evidence collection. This is a proposed architectural distinction, not a promise that adding routing improves every application. First establish a baseline for the current system. Without that baseline, a more elaborate planner can make the diagram more interesting while making the product slower, costlier, or less dependable.

## 3. Choose a strategy, not merely a model

3.0–5.0 minutes

Tool or code → known work
Small model → bounded ambiguity
Specialists → separable evidence
Human → consequential uncertainty

Define the planner’s output as a complete strategy: model, prompt, retrieval policy, tool scopes, topology, verification, and stop conditions. A router that changes only the model misses many available improvements. The deterministic reset lookup needs no generated reasoning if the user has asked only for instructions. The incident investigator may need read-only logs and a controlled reproducer. Distinguish information gathering from remediation; being allowed to inspect a failure does not imply permission to change production. Anthropic describes routing and orchestrator-worker patterns as useful building blocks. The decision contract shown here extends those patterns with explicit resource and authority bounds for this proposed system.

Sources: [Reference](https://www.anthropic.com/engineering/building-effective-agents)

## 4. Make the planner produce a contract

5.0–8.0 minutes

Goal + evidence required
DAG + expected artifacts
Budget + deadline + tool scopes
Termination + escalation

For the disconnect case, require the planner to name the question each worker will answer and the evidence it should return. The network investigator inspects timing around proxy behavior; the application investigator checks heartbeat and reconnect events. A reviewer consumes both reports after they complete. Encode those dependencies as a small directed acyclic graph. Attach a deadline and remaining budget to the plan, then reject unsupported tools or excessive fan-out before execution. The planner may propose a graph, but a deterministic validator decides whether the proposal satisfies the contract. This separation lets the system vary its organization without allowing a generated plan to grant itself additional authority.

## 5. Vertical scaling: deepen one attempt

8.0–10.0 minutes

Stronger model
More reasoning time
Better evidence and tools
Larger useful context

When one investigator cannot interpret a complicated timing trace, adding more independent agents may repeat the same misunderstanding. Vertical scaling means improving the resources available to that attempt: a more capable model, additional time, a better tool, or carefully selected context. Test-time compute research studies how allocating inference effort can affect performance in particular experimental settings. It does not establish a universal benefit from simply adding tokens. In this incident, first ask whether the missing input is an omitted timeout configuration. Better evidence may matter more than a larger model. Record the change and compare the resulting outcome so the escalation can be evaluated rather than celebrated automatically.

Sources: [Reference](https://arxiv.org/abs/2408.03314)

## 6. Horizontal scaling: separate the questions

10.0–12.0 minutes

Network evidence
Application evidence
State and persistence evidence
Independent adversarial review

Horizontal scaling adds workers when there is useful independence. The network and application investigators can inspect separate evidence without editing shared files. A state investigator is justified only if reconnection state is implicated; do not invent roles to fill a team chart. An adversarial reviewer should search for evidence against the favored hypothesis instead of restating it. Anthropic’s research-system report describes orchestrator-led parallel investigation and also notes coordination and token costs. Treat that report as evidence from its research workload, not a speedup guarantee for debugging. Our proposed planner pays for each additional branch only when the branch answers a distinct unresolved question that affects the final decision.

Sources: [Reference](https://www.anthropic.com/engineering/multi-agent-research-system)

## 7. Topology is an output of planning

12.0–14.0 minutes

Plan → validate → execute
Observe → revise within bounds
Retire workers when their job ends.

Show the initial incident organization as two investigators followed by a reviewer. A new clue about reconnect state can justify replacing a weak branch with a state investigator. The topology changes because the evidence requirement changes. It should not expand simply because an agent can request helpers. Each worker has an explicit artifact, such as a timeline with source event identifiers, and an exit condition. Completed workers do not linger as permanent roles. This gives the phrase dynamic organization a concrete meaning: task-specific dependencies and scopes chosen at runtime from approved options. The organization remains inspectable, and a human can understand why a branch existed even after its execution has ended.

## 8. Agreement is a lead, not a verdict

14.0–16.0 minutes

Shared models can share blind spots.
Different prompts, same bad evidence.
A reproducible check outranks a vote.

Two investigators conclude that the proxy timeout caused the disconnect. That agreement is useful only if their evidence is sound. Both may have copied the same misleading log annotation or assumed the same default configuration. Require the reviewer to distinguish independent corroboration from repeated wording. The next useful action is a controlled check that separates timeout behavior from an application heartbeat issue. Do not transform three matching answers into a calibrated probability of correctness. In the proposed system, agreement can prioritize verification, but the acceptance gate uses explicit evidence requirements. Where the claim cannot be tested directly, retain uncertainty and route consequential decisions to an accountable reviewer instead of hiding doubt behind consensus.

## 9. Confidence must be earned on your work

16.0–19.0 minutes

Compare predicted and actual success.
Calibrate by task and strategy.
Recheck after model or data changes.

A model saying confidence equals ninety percent is not sufficient input for a budget controller. Define confidence as an empirically evaluated estimate for a workload and strategy, with a known calibration procedure and held-out cases. A useful routing policy can also rely on simpler observable signals: failed assertions, missing required evidence, or novelty outside supported categories. Prefer those signals when reliable probabilities are unavailable. RouteLLM studies learned routing from preference data; its results motivate measurement of cost-quality tradeoffs, not trust in untested self-reports. In our stage demo, escalation follows explicit fixture flags so the audience can see the rule. The demo does not claim to implement statistical calibration.

Sources: [Reference](https://arxiv.org/abs/2406.18665)

## 10. Demo: one task, three bounded strategies

19.0–23.0 minutes

Lookup → deterministic path
Novel → two hypotheses + verifier
Budget or deadline → stop

Replay the bundled deterministic routing fixture. A lookup selects a tool path with zero agents; a simple task selects one agent; a novel task selects three roles, two hypothesis generators and a verifier. Show the assigned costs and durations as illustrative inputs, never provider prices or measured performance. Reduce the remaining budget below the chosen strategy cost and display the blocked result; repeat with an insufficient deadline. A high-risk task routes to a human regardless of available budget. The fixture exercises policy selection, not dynamic model planning or statistical confidence calibration. Real deployment still requires enforceable reservations, cancellation behavior, calibrated workload signals, scoped tool access, and repeated evaluation before a generated planner receives control.

## 11. Governors sit outside the planner

23.0–25.0 minutes

Maximum spend and wall-clock time
Maximum agents and concurrent work
Allowed providers and data boundaries
Tool scopes and approval gates

The planner can propose additional effort; it cannot approve its own exception. Enforce spend reservation atomically before launching parallel work so separate workers cannot each consume the same remaining budget. Track actual usage and reconcile it against reservations. Deadline cancellation should stop further dispatch and attempt to cancel supported in-flight operations, while recording any unavoidable billed work. Provider and data-boundary checks must precede calls, not appear only in prompts. The fixture demo simplifies all of this to deterministic cost units, which makes the policy visible but does not implement production accounting. The architecture requires a trusted controller around the planner precisely because generated plans may misunderstand or ignore their constraints.

## 12. Why did this request get this architecture?

25.0–28.0 minutes

Record strategy version and reason
Keep evidence references
Capture cost, latency, and outcome
Explain escalation and termination

Design the trace around decisions a maintainer will need to reconstruct. Store the strategy version, planner proposal, validator result, evidence references, chosen scopes, reservations, actual spend, and final outcome. A concise explanation should identify observable inputs, such as missing a required timeout configuration, rather than exposing private internal reasoning. If the network branch was cancelled, record whether the deadline, budget, or new evidence caused it. The practical diagnostic question is why this request received this architecture. A final answer alone cannot distinguish a poor model from a bad plan, an unavailable tool, or an overstrict budget. This instrumentation also supplies the cases used to evaluate future routing changes.

## 13. Score the whole strategy by failure class

28.0–30.0 minutes

Outcome and required assertions
Cost and latency distributions
Escalation and human correction
Novel versus familiar workloads

Compare complete strategies on the same workload slices. The incident plan may improve evidence coverage while worsening latency; a smaller model may perform well on familiar cases but fail on new environments. Report those differences instead of compressing every dimension into a leaderboard. Anthropic’s agent-evaluation guidance distinguishes transcripts from final outcomes; this supports checking what the system achieved as well as how it acted. Our proposed scorecard adds workload-specific limits and operational costs. Avoid grading a plan solely for matching one expected topology, because another valid arrangement may satisfy the contract. Keep process assertions for real constraints such as forbidden tool use, then judge outcomes against the task’s requirements.

Sources: [Reference](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

## 14. New models enter through qualification

30.0–32.0 minutes

Baseline → adapt → rerun
Compare on held-out workloads
Shadow or canary promising candidates
Promote with rollback

A new model announcement should trigger a repeatable qualification process only when the organization has authorized that process. This presentation configures no monitoring or scheduler. The proposed workflow records the current baseline, tries documented model-appropriate prompting, reruns both regression and capability cases, and compares quality with cost and latency. Keep tuning examples separate from held-out evaluation. If a candidate looks promising, use a bounded rollout or shadow evaluation with data permissions respected. Model replacement should not silently alter tool authority or success criteria. Retain the prior strategy version for rollback. The goal is a maintainable route to adoption, not a perpetual contest that promotes whatever won yesterday’s tiny sample.

## 15. Adaptation has a second feedback loop

32.0–34.0 minutes

Run → score → propose policy change
Evaluate the proposed policy
Promote separately from execution
Retire stale routes

Distinguish the request-time loop from the policy-improvement loop. During a request, the system selects approved strategies within current rules. Across requests, observed failures can motivate a different routing threshold, topology, tool, or deterministic replacement. That proposal must pass evaluation before it changes the policy for everyone. Otherwise, one unusual incident can rewrite the behavior of the entire system. Add expiry and ownership to model-specific exceptions, and retire routes that no longer have supporting evidence. This connects the talk to improvement from failure while keeping its focus on allocation. Learning changes the policy through a controlled promotion path; runtime flexibility does not imply self-authorized global reconfiguration.

## 16. A known problem should get cheaper

34.0–36.0 minutes

Novel investigation → evidence
Evidence → tested diagnosis rule
Rule → deterministic tool
Next request skips the committee

Return to the WebSocket incident after the team has established a reproducible cause. If a particular configuration and event pattern reliably identifies the issue within a defined scope, encode that check in a tested diagnostic tool. Future matching requests can run the tool before launching investigators. Preserve negative cases so the rule does not misclassify unrelated disconnects. A deterministic artifact is not inherently correct; it is easier to execute consistently and test within its contract. The proposed optimization is to spend reasoning where uncertainty remains. Familiar work should not keep renting the full investigative organization just because that organization once discovered the answer. This is how adaptive systems can reduce their own recurring complexity.

## 17. Put trajectory in the operating contract

36.0–39.0 minutes

Current: satisfy this workload
Ongoing: reduce recurring uncertainty
Future: qualify migrations and changes
Always: respect authority and budgets

An operating document can describe current objectives, ongoing improvement priorities, and predictable future changes without becoming an unrestricted mandate. Current work might require a diagnostic report. Ongoing goals might include fewer unnecessary escalations and more deterministic coverage. Future work might include a provider migration with explicit qualification criteria. Each needs an owner, scope, and activation condition. Merely writing evaluate new models into AGENTS.md should not authorize purchases, external communication, or recurring jobs. Separate desired direction from granted capabilities. End the practical guidance with a small adoption path: instrument one existing workflow, identify one meaningful routing distinction, evaluate it, and add a bounded alternative only when the evidence supports it.

## 18. Autoscaling, but for cognition

39.0–40.0 minutes

Choose effort from evidence.
Enforce limits in code.
Compile the work you understand.

Close on the two opening requests. The known lookup receives a small deterministic path; the uncertain incident receives a bounded investigation with evidence requirements. Neither decision is virtuous by itself. The right architecture is the one that satisfies the workload within its constraints, and its quality must be measured. Preserve the signature idea that topology can become an output of planning, while making the operational limit explicit: the planner chooses within an approved contract. The system should explain when it escalates, when it stops, and when a previously difficult class of work no longer needs an agent. Invite attendees to choose one hard-coded decision in their own system and ask whether runtime evidence could improve it.

