# Talk packet: The Future of Product Engineering

[15min screen PPTX](../../decks/product-engineering-15min-screen.pptx) · [handout PPTX](../../decks/product-engineering-15min-handout.pptx) · [30min screen PPTX](../../decks/product-engineering-30min-screen.pptx) · [handout PPTX](../../decks/product-engineering-30min-handout.pptx) · [40min screen PPTX](../../decks/product-engineering-40min-screen.pptx) · [handout PPTX](../../decks/product-engineering-40min-handout.pptx)

Outlines: [40 min Conway's law and the agent roster](../../outlines/product-engineering-40min.md) · [30 min the agent roster](../../outlines/product-engineering-30min.md) · [15 min big idea](../../outlines/product-engineering-15min.md) · Formats: [formats.md](formats.md) · Evidence: [evidence-bank.md](evidence-bank.md)

## Titles

- **Primary:** The Future of Product Engineering
- Conway's Law, Applied on Purpose
- One Agent per Function, One Owner per Agent
- Automate the Right Things. Keep the Taste.

## Abstracts

### 50 words

Conway's law still applies, and your organization now includes agents. This talk maps every function of a product group, from competitor research to beta enrollment, onto an agent with a human owner, shows where the guards go when risk spikes, and argues that teams who trade taste for AI vibes will pay later.

### 100 words

Your code mirrors your organization, and your organization is about to include a roster of agents. Left alone, that roster mirrors whatever accidents your org chart already has. This talk draws it deliberately: one agent per function, one human owner per agent. A research agent looks outward at competitors and mentions; a feedback agent clusters what customers say and feeds a weekly review; gap analysis, marketing, and sales agents extend the loop to analytics and the warehouse; ideas are tested through targeted, opt-in beta enrollment behind feature flags. Guards sit where risk spikes. A deterministic demo shows one blocking an activation winner that cheated.

### 250 words

Conway wrote in 1968 that a system copies the communication structure of the organization that built it. Nothing about language models repeals that. What changes is that the organization now includes agents, and the shape you give them shows up in your product whether or not you planned it.

Every process on the scale spectrum, from a five-person startup shipping without a meeting to a thousand-person company with a change procedure and a prioritization rubric, is about to adapt. The teams that automate the right things with taste intact will be rewarded richly. The teams that hand judgment to whatever the model says will suffer, later, when it is expensive.

The craft is to mimic each function of the product group as an agent and map each agent to the person who owns that responsibility. The talk walks the roster in the order work flows: a research agent that crawls competitors and mentions with browser tools you control; a feedback agent that ingests and clusters what customers already tell you and feeds a daily or weekly review; a rethink of prioritization now that effort estimation has quietly disappeared; gap analysis agents walking your own product; marketing and sales agents connected to analytics, customer records, and the warehouse; and targeted beta enrollment that invites users similar to a feedback cluster into an opt-in feature flag.

Then the guards: subset to all users, cheap to expensive runs, deploying and tearing down infrastructure. A deterministic demo shows a guard blocking an activation winner that tripled support contacts and invented urgency. Every experiment carries a hypothesis and reports itself to the channel the team already watches.

## Learning outcomes

Attendees will be able to:

1. Map the functions of their product organization onto an agent roster, and name a human owner for each agent.
2. Place human-in-the-loop guards at the specific transitions where risk exposure spikes, rather than on every action.
3. Attach a falsifiable hypothesis and an automatic report to any beta, ad test, or feature flag before it reaches customers.

## Audience and prerequisites

Product engineers, engineering leaders, founders, and product managers building or evaluating AI-assisted product workflows. Familiarity with feature flags and basic A/B testing. No statistics beyond the basics.

## Practical takeaways

- The agent roster: research, feedback, gap analysis, marketing and sales, beta enrollment, each with an owner.
- The four risk spikes that get a guard.
- The hypothesis-plus-report rule for every experiment.

## Not a product pitch

The talk cites Conway's 1968 paper and Microsoft's experimentation guidance. It names no experimentation platform, analytics tool, warehouse, or agent framework; tools mentioned in speaker notes are examples. The demo is offline and vendor-free.

## References

- Conway (1968). [How Do Committees Invent?](http://www.melconway.com/Home/Committees_Paper.html)
- Microsoft ExP (2021). [Patterns of trustworthy experimentation: pre-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/).
- Anthropic (2024). [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents).

## Audience-specific abstracts (100 words each)

### Engineering practitioner

Nobody on your team has t-shirt sized a ticket in months, and the agents that write the code are not the interesting part. This session builds the rest of the roster: a research agent with browser tools you own, a feedback agent that clusters tickets and links them to customers, a gap analysis agent that walks your build, and beta enrollment that drops opt-in users into a feature flag. Guards sit at four risk spikes: subset to all, cheap to expensive, deploy, tear down. A deterministic demo shows one blocking the activation winner. You leave with the roster and the guard list.

### Engineering leadership and product

Conway's law still applies, and your org chart is about to grow a column of agents. This talk argues you should draw that column on purpose: one agent per function, one accountable owner per agent, from competitor research through the weekly prioritization review to targeted beta enrollment. It covers what replaces effort estimation in the rubric, why customers become forthcoming once they see a response, and where the guards go when exposure spikes. The demo shows a metric win blocked by a rule written in advance. Leaders leave with one process to automate, its agent, and its owner.

### Founders and small teams

You do not need a committee to ship, and you never will. What you can have now is the research, feedback, and analytics function a five-person team could never staff. This talk shows how to stand each one up as an agent you own, feed a weekly review that keeps your taste in charge, and test ideas by inviting the exact customers who asked into an opt-in flag. It covers the four moments that still need a human, and a demo where a guard blocks a winning variant that would have cost you trust. Leave with a roster you can build this quarter.

### Executive and general technology

Your product mirrors your organization, and your organization is about to include agents. Left alone, they mirror your accidents. This talk describes a deliberate version: every function a product group performs, from watching competitors to enrolling beta users, becomes an agent with a named human owner. It explains where human review belongs, at the moments risk spikes rather than on every action, and why teams that trade judgment for AI output will pay later. It shows a change that "won" and would have made the product worse, and closes with the smallest roster any team can start next quarter.
