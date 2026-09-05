# Talk packet: Building Adaptive & Dynamic AI Systems

Outline: [40 min](../../outlines/adaptive-systems-40min.md) · Formats: [formats.md](formats.md) · Evidence: [evidence-bank.md](evidence-bank.md)

## Titles

- **Primary:** Building Adaptive & Dynamic AI Systems
- Autoscaling, but for Cognition
- Topology Is an Output of Planning
- Different Work, Different Compute

## Abstracts

### 50 words

A password-reset lookup and an intermittent WebSocket incident should not get the same model, context, agents, and permissions. This talk shows a bounded runtime planner that picks a strategy per request, an agent-builder that assembles the team, governors that cap spend and time, and a qualification loop for every new frontier model.

### 100 words

Most AI systems hand every request the same architecture. This talk proposes a runtime planner that chooses a complete strategy, model, tools, topology, verification, and stop conditions, from an approved set, and an agent-builder that assembles a team for the request and retires workers when their job ends. Budgets, deadlines, and data boundaries live in a controller outside the planner. We cover vertical and horizontal scaling, elastic compute with reservations and cancellation, observability that answers "why did this request get this architecture?", dynamic A/B of strategies, and onboarding new models through mirrored traffic. Ends with what your AGENTS.md should say about now, ongoing, and future goals.

### 250 words

Two requests arrive. One asks for the password-reset procedure. The other asks why WebSocket connections drop every few hours. Giving both the same model, context window, agent count, and tool permissions is a choice, even when it is accidental. This talk is about making that choice at runtime, on evidence, inside limits you control.

The core is a work planner whose output is a contract: goal, required evidence, a small DAG of workers with expected artifacts, budget, deadline, tool scopes, termination and escalation rules. A deterministic validator accepts or rejects the plan. An agent-builder assembles the team from approved roles, adds a branch when new evidence demands one, and retires workers when they finish. Topology becomes an output of planning rather than a fixed pipeline.

Around the planner sits a controller with the governors: spend reserved before fan-out, deadlines that cancel in-flight work, provider and data-boundary checks that run in code before any call, and a human gate for consequential actions regardless of remaining budget. The demo replays three requests through three strategies and shows the caps firing.

The back half is operations. Traces that record strategy version, validator result, reservations, and cancellations. Scorecards by failure class. Dynamic A/B of strategies on live traffic with a declared analysis plan. A qualification path for each new frontier model: baseline, mirrored traffic, an eval-and-tuning loop, promotion with rollback. A second loop that compiles solved problems into deterministic tools.

It closes with an AGENTS.md structured by time horizon, with authority kept in code.

## Learning outcomes

Attendees will be able to:

1. Write a planner contract for a request class, including evidence requirements, budget, deadline, tool scopes, and escalation.
2. Design a controller that reserves spend before fan-out, cancels on deadline, and routes consequential actions to a human independent of budget.
3. Define a qualification process for a new model using mirrored traffic and held-out evaluation, with rollback.

## Audience and prerequisites

Staff and principal engineers, AI architects, and platform teams running agent workloads. Comfort with orchestration concepts, tracing, and evaluation. No specific framework required.

## Practical takeaways

- A twelve-line planner contract in JSON you can adopt as a schema.
- A checklist of governors that must live outside the planner.
- An AGENTS.md skeleton with three time horizons and an authority boundary.

## Not a product pitch

The talk cites Anthropic engineering posts, RouteLLM, and test-time compute research as evidence. It recommends no orchestration framework or vendor. The demo is offline and vendor-free.

## References

- Anthropic (2024). [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents).
- Anthropic (June 2025). [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system).
- Snell, Lee, Xu, Kumar (2024). [Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters](https://arxiv.org/abs/2408.03314).
- Ong et al. (2024). [RouteLLM: Learning to Route LLMs with Preference Data](https://arxiv.org/abs/2406.18665).
- Anthropic (January 2026). [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).

## Audience-specific abstracts (100 words each)

### Engineering practitioner

Stop handing every request the same architecture. This session builds a runtime planner whose output is a contract: evidence required, a small DAG of workers, budget, deadline, tool scopes, escalation. A validator gates the plan; an agent-builder assembles and retires workers; a controller reserves spend before fan-out and cancels on deadline. We replay three requests through three strategies and watch the caps fire, then cover traces that explain why a request got its architecture, A/B of strategies on live traffic, and a mirrored-traffic loop for onboarding new models. You leave with the contract schema and the governor checklist.

### Engineering leadership and product

Every request your AI system serves is either over-provisioned or under-provisioned, and a fixed architecture hides which. This talk shows how to make compute allocation a runtime decision with visible limits: budgets and deadlines enforced outside the planner, a human gate on consequential actions regardless of spend, and a trace that explains each decision to a maintainer. It covers how new frontier models earn their way in through mirrored traffic rather than announcement, and how to write an operating document that states direction without granting authority. The measurable payoff is familiar work getting cheaper while novel work gets the investigation it needs.

### Education and instructional design

An AI tutor that treats "what is 20% of 100?" and "why does my proof fail?" identically is wasting effort on one and shortchanging the other. This session, adapted for education technologists and program leads, explains how adaptive systems choose a strategy per request within limits a person sets: when to answer from a lookup, when to reason, when to bring in a human. It covers the budget and time caps that keep costs predictable, the trace that lets a teacher see why a response took the shape it did, and the process for evaluating a new model before students see it.

### Executive and general technology

AI systems are usually built once and then applied to everything. This talk argues for systems that choose how much effort a task deserves, inside limits leadership controls: maximum spend, maximum time, which data may leave the building, which actions require a person. It explains the two feedback loops, the one that serves requests and the one that improves the policy, and why the second must not run unsupervised. It ends with the operating document a team should keep: current goals, ongoing improvements, and predictable future changes such as evaluating each major new model, with authority kept in code.
