# Talk packet: Adaptive, agentic apps

[Formats](formats.md) · [40-minute script](script-40min.md) · [Contracts](contracts.md) · [Evidence](evidence-bank.md) · [Deck](../../../reveal-talks/adaptive-systems.html)

## Titles

- Adaptive, agentic apps
- When the API changes overnight
- Recovery with evidence

## Short abstract (50 words)

A vendor renames a field. Your ingest breaks. Can an agent investigate the change, propose a mapping and keep the job moving? This talk designs bounded recovery around semantic checks, versioned artifacts, resource limits and explicit uncertainty, so engineers can delegate investigation without quietly delegating permission to corrupt production data.

## Standard abstract (100 words)

API changes, unavailable providers and incomplete responses are ordinary integration problems. Adaptive, agentic apps can investigate unfamiliar failures and propose recovery strategies, provided their authority stays bounded. Following one ingest job, this session distinguishes a field rename from a semantic change, turns repairs into versioned mapping artifacts, and tests them against conflicting and missing data. It covers bounded retries, approved regional fallback, uncertain external outcomes, and reports that help engineers see what changed. Attendees leave with a recovery contract, failure fixtures, and a rollout sequence that begins in shadow mode and expands only from evidence about correctness, cost and intervention.

## Extended abstract (215 words)

API changes, unavailable providers and incomplete responses are ordinary integration problems. Adaptive, agentic apps can investigate unfamiliar failures and propose recovery strategies, provided their authority stays bounded. Following one ingest job, this session distinguishes a field rename from a semantic change, turns repairs into versioned mapping artifacts, and tests them against conflicting and missing data. It covers bounded retries, approved regional fallback, uncertain external outcomes, and reports that help engineers see what changed. Attendees leave with a recovery contract, failure fixtures, and a rollout sequence that begins in shadow mode and expands only from evidence about correctness, cost and intervention.

The worked example follows three decisions. A documented rename can become a candidate adapter. A status field with an unknown business meaning remains quarantined. A timed-out provider submission remains unresolved until its external outcome can be checked. The application records evidence and preserves partial progress instead of disguising every interruption as success or failure.

The model proposes an investigation or repair; an independent controller enforces allowed tools, regions, budgets and promotion policy. The session includes a paper walkthrough with negative fixtures, a daily operations report, and an optional architecture for keeping sensitive payloads outside a frontier planner. It ends by separating request-time recovery from the evaluated policy changes that make known failures cheaper next time.

## Learning outcomes

1. Distinguish a reversible mapping repair from an ambiguous semantic change.
2. Specify evidence, authority, resource caps and stop conditions for a recovery job.
3. Design versioned promotion, reconciliation and reporting before expanding automatic action.

## Audience and prerequisites

Application, platform and staff engineers building tool-using agents. Familiarity with APIs, asynchronous jobs and production failure handling helps. No specific model, framework or cloud account required.

## Reviewer notes

16 slides; 15-, 30- and 40-minute routes; 60- or 75-minute workshop. Synthetic paper walkthroughs, no measured production gains or live agent demonstration claimed. The browser deck follows the current outline. References support individual mechanisms, not a benchmark of the proposed architecture. No vendor pitch.

## Audience adaptations

| Audience | Lead with | Retain |
| --- | --- | --- |
| Practitioners | The failure trace | Contracts and negative tests |
| Engineering leadership | Cost of accepted outcomes and intervention | Ownership and rollout limits |
| Education technologists | An ingest or media-generation workflow | Data meaning and review |
| General technology | What happens after an unexpected failure | One concrete example and an honest stop |
