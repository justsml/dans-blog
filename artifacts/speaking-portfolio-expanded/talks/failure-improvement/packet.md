# Talk packet: Automating Improvement From Failure

[Browser deck](../../../../public/talks/failure-improvement.html) · [Presenter script](script-40min.md) · [Visuals](visuals.md)

Outline: [40 min](outline-40min.md) · Formats: [formats.md](formats.md) · Evidence: [evidence-bank.md](evidence-bank.md)

## Titles

- **Primary:** Automating Improvement From Failure
- The Fail-to-Win Loop
- Hand Your Production Logs to an Agent

## Abstracts

### 50 words

Your production logs already contain next month's engineering work, and nobody is reading them. This talk builds the loop that works that queue: hand an agent the logs, earn each next access, distill and classify what comes back, and watch a gate refuse to promote a fix that passed everything except the held-out case.

### 100 words

Every failure in production is a queued improvement, and most teams never work the queue. This talk builds the loop in order: read access to logs and one question, an enrichment ladder where access is a set of individual grants, a scheduled out-of-band check that distills a bounded window and classifies it with a real unknown category, and tickets and PRs that travel with their evidence. The peak is a live gate holding a candidate fix when the held-out authorization case fails — the retry had hidden a 403. Then the harder half: what the queue does to the reviewer, what to compile into scripts, and which metrics will lie to you.

### 250 words

Teams pay for observability and read it only when a pager goes off. Meanwhile the logs contain every stack trace, retry storm, and thumbs-down the product produced this week, each one a ticket nobody filed. There is a name for training people to ignore the channel meant to warn them: alert fatigue. The way out is smaller than people expect. Give a coding agent read access to a sanitized export and ask what broke since yesterday. Already better than the nobody who was doing it before.

From there the talk is an ordering. Add the integration that answers the next question: the code to locate the branch, a trace to say what happened before it, a reproduction to test whether the explanation survives. Read access to code does not require write access to production. Access is a set of individual grants, not a graduation ceremony. The mechanism is a scheduled out-of-band check that reads a bookmark, distills a bounded window into distinct failure families with counts and evidence links, and classifies them — including an unknown result and a queue that receives it.

The peak is a live gate. A candidate fix removes the visible failure and passes regression, then fails the held-out authorization case: the retry that made the error disappear was a 403 a second credential happened to answer. A successful workaround is not a repaired system, and jidoka gives the stop a job.

The back half is the part build guides skip. What a month of green pull requests does to the reviewer. When to compile repeated work into a tested, versioned script. The money gate: detect, recommend, draft, and a person presses the button. And why a hundred tickets with ninety closed as wrong is a ten percent useful rate, whatever time-to-ticket says. It ends on Monday: one failure class, one integration, one place the loop must stop.

## Learning outcomes

Attendees will be able to:

1. Stand up a scheduled out-of-band check that distills a bounded log window into distinct failure families with counts, first and last seen, and links to the evidence, and that only advances its bookmark after durable output.
2. Choose the next integration by the loop step it unlocks, grant access individually rather than as a graduation, and grow the loop one failure class at a time.
3. Gate automatic tickets and PRs with regression, holdout, scope, and a person, and give the classifier an unknown result that lands in review with its evidence intact.
4. Design the review side the loop creates: rotation and sampling for the reviewer, and metrics with denominators — recurrence after a fix, wrong tickets among reviewed tickets, backlog age — instead of time-to-ticket.

## Audience and prerequisites

Engineers, SREs, and technical leads who own a production system with logs and at least one coding agent available. Familiarity with a CI scheduler and one observability platform. No ML background needed.

## Practical takeaways

- The out-of-band check as a skeleton: one schedule, one bookmark, one bounded window, one artifact, and the rule that the bookmark only advances after the artifact is saved.
- The enrichment ladder (logs, code, trace, reproduction, ticket) as a one-page table, with a "verify before use" column for each platform's MCP, API, and CLI.
- A gate checklist: regression, holdout, scope, and a person, with the list of actions that always require one — money, deletion, and customer messaging.
- A metrics sheet with denominators: failures that recurred after a fix, wrong tickets among reviewed tickets, backlog age, and the cases the agent ignored.

## Not a product pitch

The talk uses a coding agent and bounded integrations as its implementation pattern. The speaker has no commercial relationship with any of them to disclose beyond ordinary use. The offline kit is vendor-free and makes no network calls.

## References

- Anthropic. [Claude Code hooks reference](https://docs.claude.com/en/docs/claude-code/hooks) and [Agent Skills overview](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview).
- Model Context Protocol. [Specification and server directory](https://modelcontextprotocol.io).
- GitHub. [Scheduled workflows](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#schedule).
- Anthropic (January 2026). [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).
- Vendor MCP and API documentation for whichever platform supplies each rung of the enrichment ladder; verify current names and auth models before delivery.

## Audience-specific abstracts (100 words each)

### Engineering practitioner

Point a coding agent at a sanitized log export and ask what broke since yesterday. That is step one of a loop this session builds in order: an enrichment ladder where each rung is an individual grant, a scheduled out-of-band check with a bookmark that only advances after durable output, distillation kept separate from classification, and tickets and PRs that travel with their evidence. The peak is run live — a candidate fix passes regression and fails the held-out authorization case, because the retry had hidden a 403. Then the parts a build guide skips: what the queue does to the reviewer, what to compile into a versioned script, and the metrics that will lie to you.

### Engineering leadership and product

Your observability spend produces a queue of improvements nobody works. This talk shows how a small scheduled agent starts working it, and what each added access buys — the code to locate a failure, a trace to explain it, a reproduction to test the explanation, a tracker to act. It gives leaders the order to grow the loop, the gates to demand before an agent opens PRs or touches money (regression, holdout, scope, and a person), and an honest account of the cost: a queue of green suggestions is work handed to a reviewer, and a hundred tickets with ninety closed as wrong is a ten percent useful rate. You leave with the Monday checklist and the metrics to ask for.

### Education and instructional design

Every learning platform logs failures that instructors experience as "the tool broke again." This session shows, without code, how engineering teams are starting to hand those logs to an agent that groups failures, files tickets, and, with gates, proposes fixes. It then covers the half that matters to educators: student and teacher feedback flowing into the same loop, complaints correlated with errors so support already has the trace, and a person approving every message that goes out. The takeaway is a set of questions to ask a vendor about how quickly their system learns from its own failures, and who reads what it produces.

### Executive and general technology

Most companies pay for detailed records of everything that goes wrong and then read them only during an outage. This talk explains, without code, how an agent given read access to those records starts turning failures into inspectable work, and where such a system has to stop. It covers the order to grow the loop, the gate that holds a fix which passed every test but the one that mattered, the category (money, deletion, customer messaging) where a person always presses the button, and why the dashboard that says the loop is fast may be measuring the wrong thing.

## Recording readiness

The peak requires a real failed holdout and a real unknown result; the historical checkbox kit does not qualify. Outstanding evidence is tracked in the [recording plan](../../speaker/recording-plan.md).
