# Building Adaptive & Dynamic AI Systems

## 50-word abstract

Why does a routine lookup receive the same architecture as a novel incident? Build a planner that selects models, tools, evidence branches, and verification within explicit limits. This talk separates runtime flexibility from uncontrolled autonomy, with concrete policies for escalation, evaluation, budget enforcement, and turning familiar work into deterministic tools.

## 150-word abstract

A password-reset lookup and an intermittent WebSocket incident should not receive the same model, context, tools, and agent count. Yet many AI systems encode those choices as application constants. This talk designs a bounded runtime planner that allocates effort according to the task. We compare deeper single-agent work with parallel evidence gathering, turn agent topology into a validated plan, and ask what would justify escalation. Agreement is not proof, and confidence must be checked against actual outcomes. A deterministic demo selects among illustrative strategies, rejects insufficient budgets and deadlines, and routes consequential uncertainty to a human. Then we extend the design across requests: score whole strategies, qualify model changes, promote policy updates through regression gates, and replace recurring reasoning with tested tools. Attendees leave with a planner contract and an adoption path that starts from a measured baseline, preserving authority boundaries while moving useful architectural decisions into runtime control loops.

## Audience

Staff and principal engineers, AI architects, platform teams, and engineering leaders responsible for agent orchestration.

## Three takeaways

- Choose between vertical effort, horizontal investigation, and deterministic paths using task evidence.
- Specify a validated planner contract with resource, authority, and termination limits.
- Evaluate and promote complete strategies without mistaking consensus or self-reported confidence for correctness.

## Reviewer notes

40 minutes, 18 slides, four-minute offline fixture demo. Systems design depth; assumes familiarity with tool-using agents. Distinct from parallelization alone: it includes dynamic topology, resource governors, observability, qualification, and policy promotion. Numerical demo costs and timings are fictional inputs. No actual infrastructure, purchasing, or recurring monitoring is configured.
