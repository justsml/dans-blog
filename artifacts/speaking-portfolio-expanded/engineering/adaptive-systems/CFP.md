# Adaptive, agentic apps

## Short abstract (50 words)

A vendor renames a field. Your ingest breaks. Can an agent investigate the change, propose a mapping and keep the job moving? This talk designs bounded recovery around semantic checks, versioned artifacts, resource limits and explicit uncertainty, so engineers can delegate investigation without quietly delegating permission to corrupt production data.

## Standard abstract (100 words)

API changes, unavailable providers and incomplete responses are ordinary integration problems. Adaptive, agentic apps can investigate unfamiliar failures and propose recovery strategies, provided their authority stays bounded. Following one ingest job, this session distinguishes a field rename from a semantic change, turns repairs into versioned mapping artifacts, and tests them against conflicting and missing data. It covers bounded retries, approved regional fallback, uncertain external outcomes, and reports that help engineers see what changed. Attendees leave with a recovery contract, failure fixtures, and a rollout sequence that begins in shadow mode and expands only from evidence about correctness, cost and intervention.

## Outcomes

- Distinguish a reversible mapping repair from an ambiguous semantic change.
- Specify evidence, authority, resource caps and stop conditions for a recovery job.
- Design versioned promotion, reconciliation and reporting before expanding automatic action.

Audience: application and platform engineers. 16 slides, 40 minutes including a five-minute paper walkthrough; 15 and 30 minute routes available. Proposed architecture and synthetic fixtures, no live model or measured improvement claim. [Full submission packet](../../packets/adaptive-systems/packet.md).
