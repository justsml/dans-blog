# Talk packet: The Pager Cried Wolf

Browser deck (deck not yet rebuilt; see [decks](../../../decks/README.md)) · [Presenter script](script-40min.md) · [Visuals](visuals.md)

Outline: [40 min](index.md) · Formats: [formats.md](formats.md) · Evidence: [evidence-bank.md](evidence-bank.md)

## Titles

- **Primary:** The Pager Cried Wolf
- The Fail-to-Win Loop

## Abstracts

### 50 words

An agent can turn unread logs into another unread queue. This talk builds an offline improvement loop that carries evidence, stops on uncertainty, and counts the reviewer’s time. A fresh cancellation case puts regression, holdout, scope and human review to work before you choose one failure class to start Monday.

### 100 words

Every green suggestion can teach you to stop reading the next one. The Pager Cried Wolf starts with that risk, then builds an offline improvement loop around it. Give an agent sanitized logs, add individual access grants, persist a bounded artifact, and classify without inventing a cause. The audience decides an unseen cancellation case before the holdout and scope evidence appear. A missing trace earns an unknown result. The back half asks what automation leaves for the reviewer, when repeated work should become a tested script, and whether the avoided failures justify the review burden. Start with one failure class.

### 250 words

An agent can turn unread logs into another unread queue. This talk builds an offline improvement loop that carries evidence, stops on uncertainty, and counts the reviewer’s time. A fresh cancellation case puts regression, holdout, scope and human review to work before you choose one failure class to start Monday.

Every green suggestion can teach you to stop reading the next one. The Pager Cried Wolf starts with that risk, then builds an offline improvement loop around it. Give an agent sanitized logs, add individual access grants, persist a bounded artifact, and classify without inventing a cause. The audience decides an unseen cancellation case before the holdout and scope evidence appear. A missing trace earns an unknown result. The back half asks what automation leaves for the reviewer, when repeated work should become a tested script, and whether the avoided failures justify the review burden. Start with one failure class.

The opening distinguishes Cvach’s integrative review from the earlier quality-improvement study it reports. Its alarm count becomes an explicit available-bed calculation, without pretending that hospital measurements establish a software effect. A separate synthetic ticket example shows why throughput can reward the wrong work. Participants finish by naming an input, an owner, one needed integration and a stop condition. The walkthrough uses authored cards and requires no live application. Actual integration, captured test output and first-hand production stories remain recording prerequisites, not implied accomplishments. The goal is inspectable work worth its review cost, with permission to reduce or stop the loop.

## Learning outcomes

Attendees will be able to:

1. Stand up a scheduled out-of-band check that distills a bounded log window into distinct failure families with counts, first and last seen, and links to the evidence, and that only advances its bookmark after durable output.
2. Choose the next integration by the loop step it unlocks, grant access individually rather than as a graduation, and grow the loop one failure class at a time.
3. Gate automatic tickets and PRs with regression, holdout, scope, and a person, and give the classifier an unknown result that lands in review with its evidence intact.
4. Design the review side the loop creates: rotation and sampling for the reviewer, and metrics with denominators — recurrence after a fix, wrong tickets among reviewed tickets, backlog age — instead of time-to-ticket.

## Audience and prerequisites

Engineers, SREs, and technical leads who own a production system with logs and at least one coding agent available. Familiarity with a CI scheduler and one observability platform. No ML background needed.

## Practical takeaways

- The out-of-band check as a design worksheet: one schedule, one bookmark, one bounded window, one artifact, and the rule that the bookmark only advances after the artifact is saved.
- The enrichment ladder (logs, code, trace, reproduction, ticket) as a one-page table, with a boundary for each input or grant in contracts.md.
- A gate checklist: regression, holdout, scope, and a person, with the list of actions that always require one — money, deletion, and customer messaging.
- A metrics sheet with denominators: failures that recurred after a fix, wrong tickets among reviewed tickets, backlog age, and the cases the agent ignored.

## Not a product pitch

The talk uses a coding agent and bounded integrations as its implementation pattern. No vendor recommendation is part of the argument. Supporting code belongs in a separate repository and is not required to follow the talk.

## References

- Anthropic. [Claude Code hooks reference](https://docs.claude.com/en/docs/claude-code/hooks) and [Agent Skills overview](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview).
- Model Context Protocol. [Specification and server directory](https://modelcontextprotocol.io).
- GitHub. [Scheduled workflows](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#schedule).
- Anthropic (January 2026). [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).
- Vendor MCP and API documentation for whichever platform supplies each rung of the enrichment ladder; verify current names and auth models before delivery.

## Audience-specific abstracts (approximately 100 words each)

### Engineering practitioner

Point a coding agent at a sanitized log export and ask what broke since yesterday. That is step one of a loop this session builds in order: an enrichment ladder where each rung is an individual grant, a scheduled out-of-band check with a bookmark that only advances after durable output, distillation kept separate from classification, and tickets and PRs that travel with their evidence. The peak is an authored slide walkthrough — an unseen cancellation case passes regression but fails holdout and scope checks; missing tenant evidence is held as unknown. Then the parts a build guide skips: what the queue does to the reviewer, what to compile into a versioned script, and the metrics that will lie to you.

### Engineering leadership and product

Your observability spend produces a queue of improvements nobody works. This talk shows how a small scheduled agent starts working it, and what each added access buys — the code to locate a failure, a trace to explain it, a reproduction to test the explanation, a tracker to act. It gives leaders the order to grow the loop, the gates to demand before an agent opens PRs or touches money (regression, holdout, scope, and a person), and an honest account of the cost: a queue of green suggestions is work handed to a reviewer, and a hundred tickets with ninety closed as wrong is a ten percent useful rate. You leave with the Monday checklist and the metrics to ask for.

### Education and instructional design

Every learning platform logs failures that instructors experience as "the tool broke again." This session shows, without code, how engineering teams are starting to hand those logs to an agent that groups failures, files tickets, and, with gates, proposes fixes. It then covers the half that matters to educators: student and teacher feedback flowing into the same loop, complaints correlated with errors so support already has the trace, and a person approving every message that goes out. The takeaway is a set of questions to ask a vendor about how quickly their system learns from its own failures, and who reads what it produces.

### Executive and general technology

Most companies pay for detailed records of everything that goes wrong and then read them only during an outage. This talk explains, without code, how an agent given read access to those records starts turning failures into inspectable work, and where such a system has to stop. It covers the order to grow the loop, the gate that holds a fix which passed every test but the one that mattered, the category (money, deletion, customer messaging) where a person always presses the button, and why the dashboard that says the loop is fast may be measuring the wrong thing.

## Recording readiness

The slide walkthrough uses authored cards in demo.md. A live recording still requires verified first-hand stories and an implemented integration with retained command output. The proposed `mastra-agent-lab` implementation has not been verified; do not claim these cards are captured output.
