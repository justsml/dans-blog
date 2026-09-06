# Talk packet: Adaptive, agentic apps

[On-screen PPTX](../../decks/adaptive-systems-screen.pptx) · [Reading handout PPTX](../../decks/adaptive-systems-handout.pptx)

[Smaller memory pattern: prompt, record and worked example](memory-pattern.md)

[Formats](formats.md) · [Visuals](visuals.md) · [40-minute script](script-40min.md) · [Contracts](contracts.md) · [Evidence](evidence-bank.md) · [Deck](../../../reveal-talks/adaptive-systems.html)

## Titles

- Adaptive, agentic apps
- When the API changes overnight
- Conjure exactly enough agent

## Short abstract (50 words)

A vendor renames a field at 2 a.m. Can your app investigate, propose a fix, prove it, and keep records moving, without holding a permission you'd be scared to give it? This talk shows how: conjure a narrow agent per job, guard the dangerous tools, prove every repair, and let the app ask for its own scale.

## Standard abstract (100 words)

We are building toward assistants with access to every customer record and tools that can email, refund, delete and deploy. Most of the damage they will do is accidental. This talk is a strategy for giving them that access anyway: an orchestrator that generates a narrowly scoped agent per job, with a tailored prompt, the minimum tools, a hard budget, and a logged path to ask for more. Following one address ingest through a rename, a change in meaning and a lost provider response, we cover semantic proof, versioned repairs, guarded tool classes, and per-customer compute that the app requests rather than ops pre-provisions.

## Extended abstract (210 words)

We are building toward assistants with access to every customer record and tools that can email, refund, delete and deploy. Most of the damage they will do is accidental. This talk is a strategy for giving them that access anyway: an orchestrator that generates a narrowly scoped agent per job, with a tailored prompt, the minimum tools, a hard budget, and a logged path to ask for more.

The worked example follows one address ingest through three events. A documented rename becomes a candidate adapter, proven against fixtures the proposing agent did not write and promoted as a versioned artifact with a rollback. A status field with unknown business meaning stays quarantined and goes to an owner with samples and the exact question. A lost provider response stays unresolved, reservation held, until the outcome can be checked.

Around that example: the baseline the agent must beat (diff the schema and page a human), tool risk classes and the cross-system boundary where data actually leaks, an optional architecture that keeps signed URLs and payloads out of the planner, and compute as something the orchestrator requests per job inside a per-customer cost cap. It closes with the rollout sequence: shadow, one reversible change class, then wider authority only from measured recoveries, false repairs and interventions.

## A smaller starting point

A single agent can consult working and observational memory before returning generated SQL, reports, commands or API scripts. It records execution evidence, corrections and recurring patterns, then checks new output against that history. The [copyable prompt and tenant-filter example](memory-pattern.md) show the pattern without requiring an orchestrator or specialist fleet.

## Learning outcomes

1. Design an orchestrator that generates per-job agents with minimum tools, a hard budget, and a logged tool-request gate.
2. Distinguish a reversible mapping repair from a change in meaning, and prove the repair with fixtures the agent did not write.
3. Specify tool risk classes, cross-system boundaries, and per-job compute requests before widening automatic authority.

4. Add working and observational memory to one agent, check generated work against prior outcomes, and distinguish successful execution from verified correctness.

## Audience and prerequisites

Application, platform and staff engineers building tool-using agents. Familiarity with APIs, asynchronous jobs and production failure handling helps. No specific model, framework or cloud account required.

## Reviewer notes

15 slides; 15-, 30- and 40-minute routes; 60- or 75-minute workshop. The agent generator is the speaker's working prototype; the walkthrough is a paper trace with fixtures. No benchmark or vendor pitch.

## Audience adaptations

| Audience | Lead with | Retain |
| --- | --- | --- |
| Practitioners | The failure trace and the denied-request log | Contracts and fixtures |
| Engineering leadership | The assistant-with-everything question and per-job cost controls | Rollout sequence and ownership |
| Security | Tool risk classes and the cross-system boundary | Dispatcher design, signed-URL point |
| General technology | What happens after an unexpected failure | One example and an honest stop |
