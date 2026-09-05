# Talk packet: Rethinking Parallelization in the Agentic Era

Outline: [40 min](../../outlines/parallelization-40min.md) · Formats: [formats.md](formats.md) · Evidence: [evidence-bank.md](evidence-bank.md)

## Titles

- **Primary:** Rethinking Parallelization in the Agentic Era
- Compete, Decompose, Constrain, Distribute, Compile
- Parallel Used to Mean Cores
- Rent Reasoning, Own the Result

## Abstracts

### 50 words

Parallelism used to mean one job across many cores. With agents the unit is a whole attempt, and the constraints are dollars and minutes. This talk covers five new axes: competing solutions, structured decomposition, hard caps, fan-out across clouds, and compiling the winning path into fast, dumb, deterministic code.

### 100 words

For thirty years parallelization meant one job, many cores, shared memory, and locks. Agents change the unit: the thing you run in parallel is now a whole attempt at the problem, and the constraints are dollars and minutes. This talk lays out five axes. Compete: many solutions across models or agent profiles, judged by a rubric the judge did not write. Decompose: workers with one question, one artifact, one exit. Constrain: caps on time and money as inputs, with honest stopping. Distribute: providers as a pool inside data boundaries. Compile: turn the discovered path into a script. Each with its coordination tax.

### 250 words

Parallelization used to mean one job split across many cores, with shared memory and a great deal of care about locks. Agents change the unit. The thing you run in parallel is now a whole attempt at the problem: a different model, a different persona, a different decomposition. The constraints change too, from cores and memory to dollars and minutes.

This talk organizes the new space into five axes. Compete: run the same task across three models or three agent profiles, minimal-diff, idiomatic, performance, and score the results with a rubric a human wrote or a deterministic check. Diversity across models catches errors that samples from one model share. Decompose: split by evidence source or module ownership, give each worker one question, one artifact, and one exit condition, and treat shared files as the locking problem in a new costume. Constrain: make time and money inputs to the planner, reserve spend before fan-out, cancel on deadline, and stop honestly. This is the capability business people dreamed about: a problem and a budget in, a solution or an honest stop out. Distribute: providers as a pool, data boundaries as hard filters, local models for the cheap and private parts. Compile: when a parallel investigation finds a reproducible cause, encode it as a script, a test, or a tool, and stop paying for the reasoning.

A capped three-way tournament on a flaky test shows two eligible attempts and one honest stop. Every axis carries its coordination tax. Start with caps.

## Learning outcomes

Attendees will be able to:

1. Choose between competing attempts and decomposition for a given task by reasoning about correlated failure modes and merge cost.
2. Specify budget, deadline, and concurrency caps as planner inputs, with reservation before fan-out and honest stopping behavior.
3. Identify a recurring agent workflow and compile its discovered path into a deterministic artifact with a promotion gate.

## Audience and prerequisites

Staff and principal engineers, distributed-systems practitioners, AI architects, and platform teams. Familiarity with agent orchestration and with at least one CI or test harness. Firsthand stories carry this talk; it is a practice talk.

## Practical takeaways

- The five-axis map with the coordination tax for each.
- A tournament template: task, three profiles, cap, judge, result columns.
- The "caps first, then one competitor, then compile" adoption order.

## Not a product pitch

The talk cites Anthropic's research-system report and test-time compute research. It names no orchestration product or cloud. There is no deck or demo yet; the tournament numbers are illustrative.

## References

- Anthropic (June 2025). [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system).
- Snell, Lee, Xu, Kumar (2024). [Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters](https://arxiv.org/abs/2408.03314).
- Anthropic (2024). [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents).
- Anthropic (January 2026). [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).

## Audience-specific abstracts (100 words each)

### Engineering practitioner

The thing you run in parallel is now a whole attempt at the problem, and the constraints are dollars and minutes. This session covers five axes with code-level detail: competing attempts across models and agent profiles with a human-written judge; decomposition with one question, one artifact, one exit per worker; caps as planner inputs with atomic spend reservation and deadline cancellation; provider pools inside data boundaries; and compiling the winning path into a script with a promotion gate. A capped three-way tournament on a flaky test shows two eligible attempts and one honest stop. Every axis comes with its coordination tax.

### Engineering leadership and product

"Solve it for under five dollars in under three minutes" is now a valid specification, and most teams cannot state the maximum an agent run is allowed to cost. This talk gives leaders the five ways agent work parallelizes and the tax each one charges: tokens, merge effort, per-provider evals, human attention. It explains why caps come first, why competing attempts beat decomposition on uncertain problems, and how the payoff arrives when a solved problem becomes a script nobody pays to reason about again. The adoption order is concrete: caps, one competitor, compile.

### Education and instructional design

Adapted for education technologists: when an AI system tackles a hard question for a learner, it can try several approaches at once, compare them, and stop when a budget runs out. This session explains those mechanics in plain terms, why comparing attempts catches errors one attempt misses, why time and cost limits belong in the design rather than the bill, and how a solved case becomes a fast deterministic check the next student benefits from. No code. The goal is a vocabulary for asking vendors how their systems allocate effort and what happens when they run out of it.

### Executive and general technology

Parallel computing used to mean faster hardware. With AI agents it means running several complete attempts at a problem, under a budget you set, and keeping the one that passes. This talk explains the five ways that works, the cost each one carries, and the one that pays for the rest: turning a solved problem into ordinary code so the expensive reasoning never runs again. It closes with the question most organizations cannot yet answer, the maximum an AI task is allowed to cost, and the order to fix it in.
