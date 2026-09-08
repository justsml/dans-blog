# Talk packet: Conjure Exactly Enough

[Smaller memory pattern: prompt, record and worked example](memory-pattern.md)

[Formats](formats.md) · [Visuals](visuals.md) · [40-minute script](script-40min.md) · [Contracts](contracts.md) · [Evidence](evidence-bank.md) · Deck (deck not yet rebuilt; see [decks](../../../decks/README.md))

## Titles

- Conjure Exactly Enough

Descriptor for programs and schedules: Adaptive, agentic apps.

## Short abstract (50 words)

A vendor renames a field. Conjure a narrow agent to investigate, propose and test the repair. Keep ambiguous records quarantined and the planner away from operational credentials. Follow one ingest through a rename, a semantic change and a lost response, with scoped tools, a deadline and an accountable owner.

## Standard abstract (100 words)

Your integration list decides what your assistant can reach before you review the combinations. Five reads and five writes permit 25 potential pairings; adding six of each makes 121. Conjure Exactly Enough gives each job a narrow agent, server-owned policy and a logged path to request tools. One address ingest demonstrates the boundary: a documented rename earns a tested mapping, ambiguous meaning goes to an owner, and a lost response requires reconciliation. We follow versioned repairs, scoped compute and reports a human can inspect, then start smaller with one agent that remembers execution evidence without treating memory as permission.

## Extended abstract (210 words)

We are building toward assistants with access to every customer record and tools that can email, refund, delete and deploy. Most of the damage they will do is accidental. This talk is a strategy for giving them that access anyway: an orchestrator that generates a narrowly scoped agent per job, with a tailored prompt, the minimum tools, a hard budget, and a logged path to ask for more.

The worked example follows one address ingest through three events. A documented rename becomes a candidate adapter, proven against fixtures the proposing agent did not write and promoted as a versioned artifact with a rollback. A status field with unknown business meaning stays quarantined and goes to an owner with samples and the exact question. A lost provider response stays unresolved, reservation held, until the outcome can be checked.

Around that example: the baseline the agent must beat (diff the schema and page a human), tool risk classes and the cross-system data boundary, an optional architecture that keeps signed URLs and payloads out of the planner, and compute as something the orchestrator requests per job inside a per-customer cost cap. It closes with the rollout sequence: shadow, one reversible change class, then wider authority only from measured recoveries, false repairs and interventions.

## A smaller starting point

A single agent can consult working and observational memory before returning generated SQL, reports, commands or API scripts. It records execution evidence, corrections and recurring patterns, then checks new output against that history. The [copyable prompt and tenant-filter example](memory-pattern.md) show the pattern without requiring an orchestrator or specialist fleet.

## Learning outcomes

1. Count potential read-to-write pairings and constrain the live set per job.
2. Design an orchestrator that generates per-job agents with minimum tools, a hard budget, and a logged tool-request gate.
3. Distinguish a reversible mapping repair from a change in meaning, and prove the repair with fixtures the agent did not write.
4. Specify tool risk classes, cross-system boundaries, and per-job compute requests before widening automatic authority.
5. Add working and observational memory to one agent, check generated work against prior outcomes, and distinguish successful execution from verified correctness.

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
