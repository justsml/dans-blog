> Historical source snapshot preserved before this refresh, including existing shared-tree changes. Relative links retain their original location semantics. Use packet.md for current materials.

# Building Adaptive & Dynamic AI Systems

40 minutes · 17 slides

**Arc.** Warm open on two mismatched requests, steady through the planner contract and both scaling axes, build through the agent-builder and caps, peak at the demo, build again through A/B and model onboarding, land on AGENTS.md.

**Scope.** A proposed architecture: a bounded runtime planner choosing from approved capabilities, with budgets, permissions, and accountability enforced outside it. The incident is synthetic; the demo replays fixtures. Say it once on slide 1.

**Demo.** [Runbook section 3](../demos/DEMO-RUNBOOK.md#3-building-adaptive--dynamic-ai-systems) · [Kit](../demos/index.html). Fallback: narrate the three strategies and two caps on slide 10.

**Before each delivery.** Fill the `Story` lines.

**Image style.** Dark slate background, one amber accent, flat vector, generous negative space, no text or logos. Each slide comment is a complete prompt.

**Timings** are rehearsal targets, no Q&A. Notes are cues.

---

## 1. Different work, different compute

0:00–2:30 · warm

<!-- image: two envelopes arriving at one identical machine, one envelope thin and one thick and bulging, the machine shaped exactly the same for both, dark slate background, amber accent on the thick envelope, flat vector, no text -->

> Choose architecture at runtime.

Two requests arrive. Retrieve the password-reset procedure. Investigate intermittent WebSocket disconnects. Giving both the same model, context window, agent count, and tool permissions is a choice, even when it is accidental.

Scope, once: proposed design, synthetic incident, replayed demo. The planner chooses within an approved contract and never grants itself authority. From here on I build.

Story: [a request your system over-served or under-served because the architecture was fixed, and what it cost]

## 2. A static architecture hides a policy

2:30–4:00 · warm

<!-- image: two arrows of different thickness entering one rigid square box, exiting as identical thin arrows, dark slate background, amber accent on the box outline, flat vector, no text -->

> Same model · Same context · Same agents · Different problem

A fixed workflow is exactly right for a stable, narrow workload. Adaptation earns its complexity only when task classes benefit from different strategies. Establish a baseline before building a planner, or the diagram gets more interesting while the product gets slower and costlier.

## 3. Choose a strategy, not merely a model

4:00–6:00 · steady

<!-- image: a menu board with four rows, a wrench, a small chip, three figures, and a human silhouette, one row lit, dark slate background, amber accent on the lit row, flat vector, no text -->

> Tool or code → known work
> Small model → bounded ambiguity
> Specialists → separable evidence
> Human → consequential uncertainty

The planner's output is a complete strategy: model, prompt, retrieval policy, tool scopes, topology, verification, stop conditions. A router that only swaps models misses most of the available improvement. Permission to inspect a failure is not permission to change production.

Source: Anthropic (2024), [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents).

## 4. The work planner produces a contract

6:00–9:00 · steady

<!-- image: a blueprint sheet with three connected nodes and a stamp of approval in one corner, a ruler and a small coin purse resting on it, dark slate background, amber accent on the stamp, flat vector, no text -->

> Goal + evidence required
> DAG + expected artifacts
> Budget + deadline + tool scopes
> Termination + escalation

For the disconnect case, the planner names the question each worker answers and the evidence it returns. Network investigator: timing around proxy behavior. Application investigator: heartbeat and reconnect events. Reviewer reads both. A small DAG with a deadline, remaining budget, and tool scopes.

The planner proposes; a deterministic validator accepts or rejects. That split lets the organization vary without a generated plan expanding its own authority.

Show a twelve-line JSON contract: goal, three nodes, budget, deadline, scopes.

## 5. Vertical scaling: deepen one attempt

9:00–11:00 · steady

<!-- image: a single drill bit going deeper into layered rock, each layer a different shade, a small light at the tip, dark slate background, amber accent on the light, flat vector, no text -->

> Stronger model · More reasoning time
> Better evidence and tools · Larger useful context

When one investigator misreads a timing trace, more agents may repeat the misunderstanding. Vertical scaling improves that one attempt. Test-time compute research shows allocation matters in specific settings; it does not make more tokens a universal win. First ask whether the missing input is an omitted timeout configuration. Better evidence often beats a bigger model. Record the escalation so it can be evaluated.

Source: Snell, Lee, Xu, Kumar (2024), [Scaling LLM Test-Time Compute Optimally](https://arxiv.org/abs/2408.03314).

## 6. Horizontal scaling: separate the questions

11:00–13:00 · steady

<!-- image: three separate flashlights pointing at three different corners of a dark room, beams not overlapping, a fourth flashlight pointing back at the others, dark slate background, amber accent on the fourth beam, flat vector, no text -->

> Network evidence · Application evidence
> State evidence · Adversarial review

Add workers only where there is useful independence. Network and application investigators read separate evidence without editing shared files. A state investigator exists only if reconnection state is implicated. An adversarial reviewer hunts evidence against the favored hypothesis. Anthropic's research-system report shows orchestrator-led parallelism working on its workload, with real coordination and token costs. Pay for a branch only when it answers a distinct question that affects the decision.

Two investigators agreeing on "proxy timeout" is a lead, not a verdict. They may have read the same misleading log line. A reproducible check outranks a vote.

Source: Anthropic (June 2025), [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system).

## 7. The agent-builder: topology is an output

13:00–15:30 · build

<!-- image: a crane assembling a small scaffold of three figures from a pile of parts, one figure being lifted away as another is set down, dark slate background, amber accent on the crane hook, flat vector, no text -->

> Plan → validate → execute
> Observe → revise within bounds
> Retire workers when their job ends

The orchestrator does not pick from a menu of fixed pipelines. It assembles a team for this request from approved roles, each with a scoped tool set, an explicit artifact, and an exit condition. A new clue about reconnect state can replace a weak branch with a state investigator. The topology changes because the evidence requirement changed, never because an agent asked for helpers.

Finished workers do not linger. A human can read why a branch existed after it ended. That is what dynamic organization means in practice.

Story: [a fixed pipeline that forced a bolted-on special case a planner would have handled]

## 8. Elastic compute: reservations, caps, cancellation

15:30–17:30 · build

<!-- image: a circuit breaker panel with several switches, one hand reaching to flip a switch off, a small meter beside it, dark slate background, amber accent on the meter needle, flat vector, no text -->

> Reserve spend atomically before fan-out
> Deadline cancels dispatch and in-flight work
> Fan out across providers and hardware within data boundaries

The controller reserves budget before launching parallel work, so workers cannot each spend the same remaining balance. Deadlines stop dispatch and cancel supported operations, recording what was billed anyway. Provider and data-boundary checks run before the call, in code. Fan-out across clouds or hardware is a controller decision driven by the contract's latency and cost bounds. The planner can propose more effort. It cannot approve its own exception.

## 9. Confidence must be earned on your work

17:30–20:00 · build

<!-- image: a bathroom scale with a large confident number on its display and a tiny footprint on the platform, a second scale beside it calibrated with a weight, dark slate background, amber accent on the calibration weight, flat vector, no text -->

> Compare predicted and actual success, by task and strategy
> Prefer observable signals: failed assertions, missing evidence, novelty

"Confidence 90%" from a model is not an input to a budget controller. Confidence is an evaluated estimate for a workload and a strategy, with held-out cases. Simpler signals usually work better: a failed assertion, missing required evidence, a task outside supported categories. RouteLLM shows learned routing can trade quality for cost and shows how much depends on the routing data.

Source: Ong et al. (2024), [RouteLLM: Learning to Route LLMs with Preference Data](https://arxiv.org/abs/2406.18665).

## 10. Demo: one task, three bounded strategies

20:00–25:00 · peak

<!-- image: three doors side by side, the first plain and small, the second medium with one figure, the third large with three figures, a red stop sign and a human silhouette to the far right, dark slate background, amber accent on the stop sign, flat vector, no text -->

> Lookup → deterministic path, zero agents
> Routine → one agent
> Novel → two hypotheses + verifier
> Budget or deadline → stop. High risk → human.

Follow [runbook section 3](../demos/DEMO-RUNBOOK.md#3-building-adaptive--dynamic-ai-systems). Known lookup, routine task, novel failure: watch the organization change. Budget to $0.10, deadline to five seconds: it stops. Toggle the consequential-action gate: a human, regardless of budget.

Costs and durations are fixture values. The demo exercises policy selection and caps; it does not plan or calibrate.

Which of these three routes does your system take for everything today?

Compression: at two minutes, the novel case, one cap, and the human gate.

## 11. Why did this request get this architecture?

25:00–27:00 · steady

<!-- image: a flight recorder black box opened to reveal a neat stack of labeled cards, dark slate background, amber accent on the top card, flat vector, no text -->

> Strategy version and reason
> Planner proposal, validator result, evidence references
> Reservations, actual spend, latency, outcome
> Why a branch was cancelled

Design the trace around the questions a maintainer will ask. The explanation names observable inputs ("required timeout config missing"), not private reasoning. A final answer alone cannot separate a poor model from a bad plan, an unavailable tool, or an overstrict budget. This trace is also the eval set for every future routing change.

## 12. Score the whole strategy by failure class

27:00–28:30 · steady

<!-- image: a scorecard with four separate columns of bars rather than one total, a red pen crossing out a single trophy icon, dark slate background, amber accent on the pen, flat vector, no text -->

> Outcome and required assertions
> Cost and latency distributions
> Escalation and human correction
> Novel versus familiar workloads

Compare complete strategies on the same workload slices. The incident plan may improve coverage and worsen latency; a small model may win on familiar cases and fail on new environments. Report the dimensions. Keep process assertions for real constraints such as forbidden tool use; judge outcomes against the task.

Source: Anthropic (January 2026), [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).

## 13. Dynamic A/B of strategies

28:30–30:30 · build

<!-- image: a fork in a pipeline splitting traffic into two channels of equal width, a referee whistle hanging above the fork, dark slate background, amber accent on the whistle, flat vector, no text -->

> Split comparable traffic between two strategies
> Declare the analysis plan before exposure
> Guardrails on cost, latency, escalation rate
> Winner is eligible for promotion, not auto-promoted

Once strategies are versioned and traced, run them against each other on live comparable traffic. Treat it as an experiment: declared design, fixed metrics, guardrails, a stopping rule chosen in advance. An always-on system that peeks and declares winners early destroys its own error guarantees. The winner becomes a promotion candidate; a human owns the promotion.

## 14. New models enter through mirrored traffic

30:30–33:30 · build

<!-- image: a stream of paper airplanes flying toward one destination, a mirror beside the path reflecting a faint copy of each plane toward a second smaller destination, dark slate background, amber accent on the mirror edge, flat vector, no text -->

> Baseline → adapt prompts → rerun evals
> Mirror a slice of traffic; compare offline
> Tune in a loop until it clears the bar, or park it
> Promote with rollback

A frontier lab ships a new model. When the organization has authorized the process: record the baseline, apply documented model-appropriate prompting, rerun regression and capability cases, mirror a slice of production traffic to the candidate with data permissions respected, compare offline. If it is close, run the eval-and-tuning loop until it clears the bar or you park it. Keep tuning examples apart from held-out evaluation.

Model replacement must not silently change tool authority or success criteria. Keep the prior strategy version for rollback. A maintainable path to adoption, not a perpetual contest won by yesterday's tiny sample.

Story: [a model upgrade that regressed something nobody was measuring]

## 15. The second loop: compile the work you understand

33:30–35:30 · build

<!-- image: a committee table with five chairs, four chairs stacked away in the corner and one small vending machine standing where the table was, dark slate background, amber accent on the vending machine, flat vector, no text -->

> Run → score → propose policy change
> Evaluate, then promote separately from execution
> Known problem → tested rule → deterministic tool
> Next request skips the committee

Request-time loop: choose approved strategies within current rules. Policy loop: observed failures propose new thresholds, topologies, or deterministic replacements, which pass evaluation before changing policy for everyone. Then the payoff. Once the WebSocket cause is reproducible, encode the check as a tested diagnostic tool. Future matching requests run it before launching investigators. Familiar work stops renting the full investigative organization.

## 16. What your AGENTS.md should include

35:30–38:30 · land

<!-- image: a single page pinned to a wall divided into three horizontal bands, a clock icon on the first, a loop icon on the second, a calendar icon on the third, a padlock hanging off the page edge, dark slate background, amber accent on the padlock, flat vector, no text -->

> Now: satisfy this workload; here are the strategies and limits
> Ongoing: reduce recurring uncertainty; compile known cases
> Future, predictable: qualify each major frontier release via mirrored traffic
> Always: authority, budgets, and data boundaries live in code, not here

Three time horizons. Now: the current objective and the approved strategy set. Ongoing: fewer unnecessary escalations, more deterministic coverage, expiry on model-specific exceptions. Future and predictable: when a frontier lab ships a major model, run slide 14; when a provider migration is planned, here are the qualification criteria. Each item has an owner, a scope, and an activation condition.

Writing "evaluate new models" in AGENTS.md does not authorize purchases, external communication, or recurring jobs. Direction goes in the document. Granted capabilities go in the controller.

Show a fifteen-line excerpt with the three horizons.

Source: [AGENTS.md](https://agents.md).

## 17. Autoscaling, but for cognition

38:30–40:00 · land

<!-- image: the two envelopes from slide 1 now entering two differently shaped machines, one tiny and one large, both machines inside a single drawn boundary line, dark slate background, amber accent on the boundary line, flat vector, no text -->

> Choose effort from evidence. Enforce limits in code. Compile the work you understand.

Back to the two requests. The lookup gets a deterministic path; the incident gets a bounded investigation with evidence requirements. Neither is virtuous alone. The right architecture satisfies the workload within its constraints, and you measure that. Topology becomes an output of planning, inside an approved contract.

Pick one hard-coded decision in your system. Could runtime evidence make it better?
