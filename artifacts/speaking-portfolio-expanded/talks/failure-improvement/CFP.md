# The Pager Cried Wolf

## 50-word abstract

An agent can turn unread logs into another unread queue. This talk builds an offline improvement loop that carries evidence, stops on uncertainty, and counts the reviewer’s time. A fresh cancellation case puts regression, holdout, scope and human review to work before you choose one failure class to start Monday.

## 150-word abstract

An agent can turn unread logs into another unread queue. This talk builds an offline improvement loop that carries evidence, stops on uncertainty, and counts the reviewer’s time. A fresh cancellation case puts regression, holdout, scope and human review to work before you choose one failure class to start Monday.

Every green suggestion can teach you to stop reading the next one. The Pager Cried Wolf starts with that risk, then builds an offline improvement loop around it. Give an agent sanitized logs, add individual access grants, persist a bounded artifact, and classify without inventing a cause. The audience decides an unseen cancellation case before the holdout and scope evidence appear. A missing trace earns an unknown result. The back half asks what automation leaves for the reviewer, when repeated work should become a tested script, and whether the avoided failures justify the review burden. Start with one failure class.

## Audience

AI engineers, SREs, platform engineers, DevEx teams, and technical leaders who own a production system and have a coding agent available.

## Three takeaways

- Stand up a scheduled agent with log access that produces a classified failure list, using integrations you already have.
- Choose the next integration by the loop step it unlocks, and grow the loop one failure class at a time.
- Gate automatic tickets and PRs with regression, holdout, scope, and a human wherever money, data, or customers are affected.

## Reviewer notes

40 minutes, 15 slides. Intermediate engineering depth; familiarity with a CI scheduler and one observability platform helps. Distinct from a general observability or eval talk: the focus is the order in which to grant an agent access and authority, and the guardrails at each step. No vendor pitch; agents and platforms are named as examples of a category. The argument includes normalization of deviance, jidoka, reviewer skill and attention, and misleading ticket metrics. Authored case cards make the slide walkthrough self-contained. A separately implemented integration and captured output remain unverified recording prerequisites.
