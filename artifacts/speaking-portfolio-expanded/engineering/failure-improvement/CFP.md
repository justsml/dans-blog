# Automating Improvement From Failure

## 50-word abstract

Your agent solved this failure yesterday. Why is a human explaining it again? This talk turns recurring corrections into durable tests, tools, skills, and scoped knowledge. Follow a concrete failure through reproduction, regression gates, promotion, and pruning. Leave with a practical alternative to solving every incident by enlarging the prompt.

## 150-word abstract

Your coding agent runs integration tests before the database is ready. You explain the problem, it retries, and everything passes. Tomorrow, you explain it again. The model does not need another apology; the system needs somewhere useful to put the lesson. This talk follows a recurring failure from trace to reproducible case, then chooses an intervention: eliminate the problem, enforce a precondition, write code, expose a tool, package a skill, or retain scoped knowledge. A deterministic stage demo shows why successful workarounds are only candidates and how regression, holdout, and applicability checks block unsafe promotion. We also address the neglected half of system learning: retiring stale rules after code replaces them. Attendees leave with a failure record, an intervention hierarchy, and a reviewable promotion workflow they can adopt without fine-tuning or buying a new platform. The examples are synthetic and separate demonstrated policy behavior from claims about production reliability improvements.

## Audience

AI engineers, platform engineers, staff engineers, DevEx teams, and technical leaders maintaining agent workflows.

## Three takeaways

- Choose a durable intervention using the elimination-to-instruction hierarchy.
- Build a scoped failure record with positive and negative regression cases.
- Gate promotion and retire superseded rules while preserving incident provenance.

## Reviewer notes

40 minutes, 18 slides, four-minute offline fixture demo. Intermediate engineering depth; familiarity with tests and agent tool use helps. Distinct from a general eval talk: the focus is what corrective knowledge becomes and how it is maintained. No vendor pitch or claim of autonomous model training. Demo works without accounts, API keys, network, or a live database.
