# Talk packet: Automating Improvement From Failure

[40min screen PPTX](../../decks/failure-improvement-40min-screen.pptx) · [handout PPTX](../../decks/failure-improvement-40min-handout.pptx)

Outline: [40 min](../../outlines/failure-improvement-40min.md) · Formats: [formats.md](formats.md) · Evidence: [evidence-bank.md](evidence-bank.md)

## Titles

- **Primary:** Automating Improvement From Failure
- The Fail-to-Win Loop
- Your Logs Are a Roadmap Nobody Reads
- Hand Your Production Logs to an Agent

## Abstracts

### 50 words

Your production logs already contain next month's engineering work. Nobody is reading them. This talk shows how to hand them to an agent, what access to add next, and how to grow a loop that distills failures, files tickets, opens guarded PRs, and answers customer feedback. Low lift, high leverage, actionable Monday.

### 100 words

Every failure in production is a queued improvement, and most teams never work the queue. This talk is a practical path from "point a coding agent at your logs" to a loop that responds to failures on its own. It covers the enrichment ladder (codebase, observability and cloud MCPs, ticketing, browser), the scheduled out-of-band check that distills and classifies failures, tickets and PRs into a review queue, and the guardrails that stop a loop from learning the wrong lesson or dispensing money. Then the same loop takes customer feedback, correlates complaints with errors, and sends proactive notices. Grown one failure class at a time.

### 250 words

Teams pay for observability and read it only when a pager goes off. Meanwhile the logs contain every stack trace, retry storm, and thumbs-down the product produced this week, each one a ticket nobody filed. This talk argues that an agent can work that queue, and that the first step is smaller than people expect: give a coding agent read access to production logs and ask what broke since yesterday.

From there, the talk is an ordering. Every access you add raises how much of the loop the agent can close on its own: the codebase to locate, an observability MCP to pull the trace, a cloud platform MCP to check the queue depth and the deploy that landed at 14:02, ticketing to file, a browser to reproduce. Every logging and observability platform now offers an MCP server, an API, or a CLI, so nobody is blocked on integration. The mechanism is a scheduled out-of-band check that distills everything since the last run into a short list of distinct failures, then loops over that list to identify patterns, estimate severity, and flag security classes. With tags, the agent can file tickets, then open PRs into a queue for human review or further agent testing.

The peak is the guardrails: similarity is a candidate, not a diagnosis; a proposed fix passes regression, holdout, and scope gates; and anything that moves money or data gets a human. The back half extends the loop to agent-driven exploratory testing against a PR's diff, compiling repeated work into scheduled scripts, customer feedback that becomes a flagged change for one user, complaint-to-error correlation, and proactive incident notices. It ends with a Monday checklist.

## Learning outcomes

Attendees will be able to:

1. Stand up a scheduled agent with log access that distills failures since the last check into a classified list with severity, risk, and security tags.
2. Choose the next integration to add (codebase, observability, cloud, ticketing, browser) based on which loop step it unlocks, and say why the loop should grow one failure class at a time.
3. Design the guardrails for automatic tickets and PRs, including the three evidence gates and the human gate for money, data, and customer messaging.

## Audience and prerequisites

Engineers, SREs, and technical leads who own a production system with logs and at least one coding agent available. Familiarity with a CI scheduler and one observability platform. No ML background needed.

## Practical takeaways

- A GitHub Actions skeleton for the out-of-band check: one cron, one job, one agent invocation, one artifact.
- The enrichment ladder as a one-page table, with a "verify before use" column for each platform's MCP, API, and CLI.
- A guardrail checklist: regression, holdout, scope, and the human gate, with the list of actions that always require a person.
- A feedback-to-flag recipe: thumbs-down to PR to per-user feature flag to heuristic rollout.

## Not a product pitch

The talk names Claude Code, Codex, Hermes, and observability platforms as examples of a category. The speaker has no commercial relationship with any of them to disclose beyond ordinary use. The offline kit is vendor-free and makes no network calls.

## References

- Anthropic. [Claude Code hooks reference](https://docs.claude.com/en/docs/claude-code/hooks) and [Agent Skills overview](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview).
- Model Context Protocol. [Specification and server directory](https://modelcontextprotocol.io).
- GitHub. [Scheduled workflows](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#schedule).
- Anthropic (January 2026). [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).
- Vendor MCP and API documentation for each platform named on slide 3; verify current names before delivery.

## Audience-specific abstracts (100 words each)

### Engineering practitioner

Point a coding agent at your production logs and ask what broke since yesterday. That is step one of a loop this session builds out in order: a scheduled out-of-band check that distills failures since the last run, classification loops for pattern, severity, and security class, tickets and then PRs into a review queue, and the guardrails that keep a looping agent from learning the wrong lesson. Then the same loop drives a browser against a PR's diff, compiles repeated work into scripts, and turns thumbs-downs into flagged changes. Every integration is an MCP, an API, or a CLI you already have.

### Engineering leadership and product

Your observability spend produces a queue of improvements nobody works. This talk shows how a small, scheduled agent with log access starts working it, and what each added integration buys: codebase for location, observability for traces, cloud platform for context, ticketing for action. It gives leaders the order to grow the loop, the guardrails to demand before the agent opens PRs or touches money, and the customer-facing wins it enables: complaints correlated to errors, proactive incident notices, and feature requests that ship behind a flag for the person who asked. You leave with the Monday checklist and the metrics to ask for.

### Education and instructional design

Every learning platform logs failures that instructors experience as "the tool broke again." This session shows, without code, how engineering teams are starting to hand those logs to an agent that groups failures, files tickets, and, with guardrails, proposes fixes. It then covers the half that matters to educators: student and teacher feedback flowing into the same loop, complaints correlated with errors so support already has the trace, and proactive notices when an integration is down. The takeaway is a set of questions to ask a vendor about how quickly their system learns from its own failures.

### Executive and general technology

Most companies pay for detailed records of everything that goes wrong and then read them only during an outage. This talk explains, without code, how an agent given read access to those records starts turning failures into tickets, fixes, and customer messages, and why this is one of the lowest-lift, highest-leverage uses of AI available today. It covers the order to grow such a loop, the guardrails that keep it honest, the one category (money) where a person must always press the button, and the customer trust that comes from a system that reports its own problems before customers do.
