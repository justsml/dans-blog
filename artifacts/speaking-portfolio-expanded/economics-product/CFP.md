# Conference submission package

Prepared 2026-09-04. Abstracts are exact 50- and 150-word versions by whitespace count; titles and labels are excluded. Submit one Product Engineering variant per event unless the organizer explicitly requests a series.

## Cry Me a Free Tier

**Subtitle:** What cheap intelligence teaches us to build

**Format:** 40 minutes; 18 slides. Economics and architecture talk.

**Audience:** Staff engineers, architects, founders, CTOs, platform and engineering leaders. Familiarity with operating a software product helps; no economics degree or model expertise is assumed.

### 50-word abstract

Free AI changes what software teams consider worth optimizing. But low prices can reflect both temporary offers and genuine efficiency. This talk separates price from cost, stress-tests a synthetic workload, and asks how to build businesses that survive either explanation without guessing a vendor's margins or predicting an inevitable crash.

### 150-word abstract

Imagine building a company with free electricity, then discovering that its architecture learned to expect the offer forever. AI raises a similar question: what does cheap intelligence encourage us to build?

This talk examines how free tiers, credits, and aggressive pricing can shape context size, retries, agent fan-out, product packaging, and supplier dependence. It separates what customers pay from what providers spend, avoiding invented subsidy figures and confident predictions about a price cliff. The counterargument matters: useful inference has become cheaper, and tomorrow's efficiency may justify today's prices.

A live, offline simulation changes inference prices while holding a fictional workload constant. We calculate cost per accepted outcome, test an assumed efficiency improvement, and expose the assumptions that still need evidence. Attendees leave with a practical price sensitivity review, a way to compare optimization effort with recurring savings, and a clearer answer to which architectural commitments they can afford to make.

### Three audience outcomes

1. Calculate gross cost per accepted outcome, including failed attempts, and distinguish it from the net invoice.
2. Run an inference price sensitivity review while stating which assumptions remain fixed.
3. Choose reversible architecture investments without assuming either permanent subsidies or inevitable repricing.

### Notes for reviewers

The contrarian tension is conditional: cheap access creates real benefits, and genuine efficiency is a serious alternative to the subsidy story. This talk is not a claim about a named provider’s margins. Its parking analogy is brief and labelled. The distinctive artifact is a workload sensitivity calculation that works without forecasting industry economics. The four-minute demo is offline and synthetic. No proprietary results or personal case study is claimed.

## The Future of Product Engineering

**Subtitle:** Conway's law now includes your agents

**Format:** 15 minutes; 8 slides. Big-idea lightning talk.

**Audience:** Product engineers, founders, product managers, designers, engineering leaders; suitable for a broad technology audience.

### 50-word abstract

Conway's law still applies, and your organization now includes agents. This talk maps each function of a product group onto an agent with a human owner, places guards where risk spikes, and shows a synthetic activation winner blocked by a rule written in advance. Automate the right things. Keep taste.

### 150-word abstract

Your code mirrors your organization, and your organization is about to include a roster of agents. Left alone, that roster will mirror whatever accidents your org chart already has. This talk argues for drawing it on purpose.

One agent per function: research that watches competitors and mentions, feedback that clusters what customers already say, gap analysis that walks your own product, marketing and sales connected to analytics and customer records, and beta enrollment that invites the customers who asked into an opt-in feature flag. One human owner per agent, accountable for its instructions and its mistakes.

The demonstration is deliberately uncomfortable. A synthetic onboarding change improves activation, then fails a support ceiling and a rule against fabricated urgency. A quieter alternative becomes eligible for review, not release. No live experiment or statistical win claimed.

Attendees leave with a roster, four guarded risk spikes, and a line between automation and judgment.

### Three audience outcomes

1. Map the functions of a product group onto agents with named human owners.
2. Identify the transitions where risk exposure spikes and a human guard belongs.
3. Distinguish a metric improvement from a change that honors the product promise.

### Notes for reviewers

The short version makes one argument through Conway's law and a single roster slide. It avoids infrastructure and statistical detail. A three-minute synthetic policy replay creates the central reversal: the highest activation result is blocked. The takeaway is organizational ownership, not a tool shopping list. Works as a conference opener or a lightning slot.

## The Future of Product Engineering

**Subtitle:** The agent roster

**Format:** 30 minutes; 11 slides. Organizational design talk.

**Audience:** Product and engineering leaders, senior product engineers, founders, designers, growth and experimentation teams.

### 50-word abstract

Every process in a product organization, from a startup's decision to an enterprise change board, is about to adapt to agents. This talk walks the roster in the order work flows, names an owner for each agent, rethinks prioritization without effort estimates, and places guards where risk spikes. Synthetic demo.

### 150-word abstract

Nobody on your team has estimated effort on a ticket in months. Points, where they survive, are assigned by an agent. That is one process quietly adapting; every other process on the scale spectrum, from five people shipping without a meeting to thousands with a change procedure, is next.

This talk treats the product group as a roster of functions and mimics each as an agent with a human owner. A research agent looks outward at competitors and mentions. A feedback agent looks inward and feeds a weekly review. Gap analysis, marketing, and sales agents extend the loop to analytics and the warehouse. Ideas are tested through targeted, opt-in beta enrollment behind feature flags.

Then the guards: subset to all users, cheap to expensive runs, deploying and tearing down infrastructure. A synthetic demo shows a guard blocking an activation winner that cheated. Every experiment carries a hypothesis and reports itself.

### Three audience outcomes

1. Draw an agent roster for one product group and assign each agent an accountable owner.
2. Redesign a prioritization rubric around evidence and risk now that effort estimation has left it.
3. Place human-in-the-loop guards at the four transitions where exposure spikes, and attach a hypothesis and automatic report to every experiment.

### Notes for reviewers

This is an organizational design talk built on Conway's law, not a tooling lecture. The roster, the owners, prioritization, targeted beta enrollment, and the guards form its spine. The four-minute demo shows a local metric gain violating a product principle. Tools named in speaker notes are examples; none are endorsed.

## The Future of Product Engineering

**Subtitle:** Conway's law, applied on purpose

**Format:** 40 minutes; 15 slides. Full-length operating-model talk.

**Audience:** Product engineers, engineering leaders, founders, product managers, technical product leaders. Assumes familiarity with feature flags and basic A/B testing.

### 50-word abstract

Conway's law still applies, and the organization now includes agents. This talk draws the roster deliberately: one agent per function from competitor research through beta enrollment, one human owner per agent, guards where risk spikes, and a hypothesis plus report on every experiment. A synthetic replay blocks the activation winner.

### 150-word abstract

Conway wrote that a system copies the communication structure of the organization that built it. Language models do not repeal that; they add a column of agents to the org chart, and its shape will show up in your product whether or not you planned it.

This talk walks that column in the order work flows. A research agent crawls competitors and mentions with browser tools you own. A feedback agent clusters what customers already tell you and feeds a daily or weekly review. Prioritization is rethought now that effort estimation has disappeared. Gap analysis agents walk your build. Marketing and sales agents connect to analytics, customer records, and the warehouse. Feature ideas are tested by inviting users similar to the feedback cluster into an opt-in flag.

Guards sit at four risk spikes. A deterministic replay shows one blocking an activation winner. Every experiment carries a hypothesis and reports itself.

### Three audience outcomes

1. Map each function of a product organization onto an agent and name the human who owns it.
2. Design targeted, opt-in beta enrollment that turns a feedback cluster into a narrow test population.
3. Place guards at the transitions where risk spikes, and attach a falsifiable hypothesis and an automatic report to every experiment.

### Notes for reviewers

The full version is a proposed operating model, not a reported deployment. It uses ordinary tools: crawlers, feature flags, a warehouse, a chat channel. The offline replay proves deterministic guard behavior only. The talk cites Conway (1968) and Microsoft's experimentation guidance and names no vendor. The endpoint is a roster a team can build next quarter, with taste and judgment left where they belong.

## Portfolio fit and duplication boundary

Cry Me a Free Tier asks how low input prices shape architectural and business commitments. Product Engineering asks how a company can learn what to build while retaining its product promise. The economics talk uses a cost calculation; Product Engineering uses an onboarding policy replay. Product variants are deliberately alternatives: 15 minutes makes the Conway's-law argument through one roster slide, 30 minutes walks the roster with owners and guards, and 40 minutes adds prioritization, the wider marketing and sales loop, targeted beta enrollment, and self-reporting experiments. Do not book all three as independent flagship talks without disclosing the shared example.

## Submission integrity

Use the speaker’s real biography separately; none is invented here. Do not describe the demonstrations as live production results, statistically significant experiments, measured ROI, or a customer case study. Source and uncertainty details are in [evidence.md](./evidence.md); exact stage sequences and fallback plans are in [demo.md](./demo.md).
