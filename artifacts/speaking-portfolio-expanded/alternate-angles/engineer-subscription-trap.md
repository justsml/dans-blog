# Your $200 AI Habit Has a Meter

**Alternate title:** Sweet, Sweet Thinky Tokens  
**Best format:** 15–20 minutes; expandable to 30 with a measured usage teardown  
**Audience:** Software engineers, staff engineers, engineering managers, AI-tool builders

## The angle

The subscription is fixed, so the engineer experiences each additional agent turn as free. Their employer does not. The moment the same behavior moves into a product, internal platform, or enterprise contract, every retry, branch, tool call, and oversized context has a meter.

This is not a talk about whether a frontier lab is secretly losing money on Dan. It is about the habits a flat price teaches and what happens when those habits meet metered production software.

## Thesis

Cheap access is training engineers to spend inference without seeing the decision. The useful response is not token guilt. It is to make cost, acceptance, and substitution visible at the point where an engineer chooses the shape of the work.

## Opening

> What would your last week of AI-assisted coding have cost if every turn had appeared as a line item?

Show one familiar sequence: ask the model to inspect the repo, stage a few files, fix a merge, retry after a bad tool call, summarize what it did. None of the individual actions feels expensive. That is the point.

## Talk arc

### 1. The fixed-price feeling

- A subscription collapses marginal cost to zero in the user's head.
- Long-running agents turn one visible request into many invisible calls.
- “Unlimited” behavior is still bounded by quotas, throttles, model changes, or business decisions.

### 2. The production-price surprise

- A company usually buys model usage by volume, not by personal subscription.
- The engineering habit survives the pricing-model change.
- The invoice aggregates away the decision: which feature, retry, branch, or context expansion bought value?

### 3. The habit inventory

Ask the room which actions now default to a frontier call:

- deterministic repository operations;
- repeated context reconstruction;
- speculative branches nobody compares;
- retries without a cause-specific policy;
- a large model where a small model, lookup, parser, or human decision would do.

The claim is not that these calls are wrong. The claim is that most teams cannot say what the extra call bought.

### 4. Measure a week, not a margin

- Export one week of personal tool usage where the tool permits it.
- Reprice it at public API rates current on the delivery date.
- Label the number **API-rate equivalent**.
- Do not call the difference provider cost, provider loss, or subsidy.
- Divide total cost by accepted outcomes, not by prompts sent.

### 5. Put the meter beside the choice

End with a lightweight engineering rule:

> For every agentic feature, name the accepted outcome, the maximum work it may spend, and the cheaper path it can fall back to.

## Audience takeaway

Attendees leave able to audit one week of AI-assisted work, distinguish a subscription experience from production economics, and put a cost-and-acceptance budget beside an agentic design decision.

## Event alignment

| Priority | Target | Relevance | Focus for this room |
| --- | --- | --- | --- |
| 1 | San Diego Python | Strong short-talk route and broad engineering fit | Reprice one Python coding-agent workflow; keep it to five–seven minutes unless a longer slot is approved. |
| 1 | ACM Austin: Enterprise AI & Engineering | Direct fit for real-world engineering practice | Show the transition from personal coding agent to metered enterprise workflow. |
| 1 | Denver DevOps | Local, practical, and discussion-friendly | Make the invisible retry/tool fan-out visible in traces and bills. |
| 1 | FrontEndParty | Short feature-speaker format | Use a web build or debugging sequence; cut the economics vocabulary. |
| 2 | DeveloperWeek | Large developer audience and existing appetite for agent failure material | Emphasize habits, observability, and the production-price surprise. |
| 2 | PlatformCon | Strong cost/governance fit | Reframe as a platform contract: budgets, routing, usage attribution, and safe defaults. |
| 2 | Orlando Developers | Broad technical community | Pair a personal workflow teardown with one production feature. |
| 3 | ProductTank chapters / ProductCamp Austin | Useful only with a product-decision turn | Move quickly from engineer behavior to how defaults shape product margin and customer promises. |

## Relationship to existing talks

This route borrows the meter and cost-per-accepted-outcome idea from **Buy Me a Free Tier**, but it should not teach that talk's economics vocabulary, parking analogy, or contracting argument. Its unit of analysis is one engineer's workflow. If expanded past 30 minutes, it will probably become the existing Free Tier talk and should be submitted under that title.

## Evidence needed before delivery

- One exportable, permission-safe week of real usage or a clearly labeled synthetic trace.
- Public API prices captured close to delivery.
- A defensible definition of “accepted outcome” for the chosen workflow.
- Confirmation of what the subscription usage record does and does not expose.
- No `$5,000–$10,000`, `25–50×`, or “secretly slashing usage” claim without reproducible arithmetic and careful labels.
