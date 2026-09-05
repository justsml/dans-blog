# Talk packet: Automating Improvement From Failure

Outline: [40 min](../../outlines/failure-improvement-40min.md) · Formats: [formats.md](formats.md) · Evidence: [evidence-bank.md](evidence-bank.md)

## Titles

- **Primary:** Automating Improvement From Failure
- Yesterday's Fix Should Survive Today
- Train the System, Not the Model
- Where Do Your Agent's Lessons Go?

## Abstracts

### 50 words

Your agent hit the same error yesterday, a human fixed it, and today it hit it again. This talk gives every recurring failure a destination: code, hook, skill, retrievable case, or optimized prompt. You will see the promotion gates that keep bad lessons out and the pruning rule that keeps memory from leaking.

### 100 words

Most AI systems do not learn from failure. A human fixes the same problem in every session and becomes the database. This talk is a practical workflow for turning recurring failures into durable behavior, from fully managed platforms like LangSmith, Braintrust, and Langfuse down to a five-dollar loop built from hooks, `SKILL.md` files, and a trigram index over past errors. It covers how to capture a case without a confession, the destination hierarchy from "eliminate" down to "hope", when GEPA and DSPy earn their place, the three gates a candidate fix must pass, and how to prune rules that code now enforces. Deterministic demo included.

### 250 words

An agent launches integration tests while the database is still starting. A person recognizes the error, waits, reruns, and gets green. Tomorrow another session repeats the exact sequence. Nobody needs a more eloquent apology from the model. We need yesterday's discovery to change tomorrow's execution.

This talk is a working engineering workflow for that problem. It starts with the metric most teams miss, recurrence after a known fix exists, and the case record that captures an error, its environment, and the corrective action without retaining secrets or a model's retrospective story. It then gives every lesson a destination on an eight-rung ladder: eliminate the problem, prevent it deterministically, encode it in code, a test, or a hook, package it as a tool, write a skill, store it as retrievable knowledge, add an instruction, or hope. Hope is where most teams currently keep their lessons.

The middle of the talk is concrete tooling. Hooks that run readiness checks and write case records automatically. `SKILL.md` and plugins for judgment-heavy workflows. A search ladder from exact match through trigram and tree matching to vectors. DSPy and GEPA for when the recurring issue is judgment rather than a missing precondition. Managed platforms for teams that need shared annotation. A deterministic demo shows two errors normalizing to one case and a candidate fix blocked until regression, holdout, and scope all pass.

It ends with the pruning provision: every lesson gets an owner, an expiry story, and a reviewable diff when code makes it redundant.

## Learning outcomes

Attendees will be able to:

1. Classify a recurring failure onto the destination hierarchy and justify the smallest tier that removes it from the agent's decision space.
2. Design a promotion gate for a candidate fix with a reproducer, regression set, holdout, and scope check, and explain what each gate prevents.
3. Write a lifecycle record for a retained lesson, including owner, scope, supersession, and the condition under which it is pruned.

## Audience and prerequisites

Engineers and technical leads running LLM agents or coding assistants in real workflows. Familiarity with a test harness, a CI pipeline, and at least one agent framework. No statistics or ML training background needed.

## Practical takeaways

- A `SKILL.md` skeleton and a pre-tool and post-tool hook pair you can adapt the same week.
- A four-fixture pattern (starting, ready, denied, deadline) that catches the wrong lesson before promotion.
- A one-page checklist for pruning instruction files: merge duplicates, retire what code enforces, reverify version-bound advice, archive the reasoning.

## Not a product pitch

The talk names LangSmith, Braintrust, Langfuse, DSPy, GEPA, and Claude Code hooks as examples across a spectrum. The speaker has no commercial relationship with any of them to disclose beyond ordinary use. The demo is offline and vendor-free.

## References

- Anthropic (January 2026). [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).
- Khattab et al. (2023). [DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines](https://arxiv.org/abs/2310.03714).
- Agrawal et al. (2025). [GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning](https://arxiv.org/abs/2507.19457).
- Anthropic. [Agent Skills overview](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) and [Claude Code hooks reference](https://docs.claude.com/en/docs/claude-code/hooks).
- PostgreSQL. [pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html).

## Audience-specific abstracts (100 words each)

### Engineering practitioner

Your agent hit the same error yesterday, a human fixed it, and today it happened again. This session is a hands-on workflow for making fixes stick: a post-tool hook that writes a case record, a trigram index that finds the prior case on the next occurrence, a `SKILL.md` for judgment-heavy workflows, and a promotion gate with regression, holdout, and scope checks. We compare the managed route (LangSmith, Braintrust, Langfuse) with a five-dollar loop, place DSPy and GEPA on the ladder, and end with the pruning rule. Deterministic demo, code you can adapt this week.

### Engineering leadership and product

Completion dashboards look healthy while the same interruption repeats in every session, paid for in human time nobody tracks. This talk gives leaders a measurable target, recurrence after a known fix exists, and a workflow that turns corrections into durable artifacts with an owner, a scope, and a rollback. It shows which fixes belong in code, which in reusable skills, and which in a hosted evaluation platform, and why a memory system without pruning becomes a liability. You leave with the metrics to ask for and the review gates that keep self-improving systems from confidently learning the wrong lesson.

### Education and instructional design

Every instructor who has used an AI tutor knows the pattern: the tool makes the same mistake, a teacher corrects it, and the next class sees the mistake again. This session shows how the engineering teams behind those tools turn a correction into lasting behavior, and what educators should ask of vendors. We cover case records that keep evidence and drop identifying data, the ladder from deterministic fixes down to hopeful instructions, and the review gates that keep a wrong correction from spreading. No code required; the takeaway is a vocabulary for demanding tools that improve from classroom feedback.

### Executive and general technology

AI systems that "learn" mostly do not. A person fixes the same failure every day and becomes the system's memory. This talk explains, without code, where an organization's AI lessons should live, why most of them should become boring deterministic checks rather than more instructions, and how to keep a self-improving system accountable with owners, review gates, and an expiry on every rule. It compares hosted platforms with a minimal in-house loop and gives one measure to ask for: how often a known failure recurs. The aim is cheaper execution tomorrow, not a more eloquent apology today.
