# Automating Improvement From Failure

## 50-word abstract

Your production logs already contain next month's engineering work, and nobody is reading them. This talk shows how to hand them to an agent, which access to add next, and how to grow a loop that distills failures, files tickets, opens guarded PRs, and answers customer feedback. Actionable Monday.

## 150-word abstract

Every failure in production is a queued improvement that nobody works. Step one is smaller than teams expect: give a coding agent read access to the logs and ask what broke since yesterday. The talk then builds the loop in order — access added as individual grants, not a graduation ceremony; a scheduled out-of-band check that distills and classifies, with a real unknown category; tickets that carry evidence instead of a confident diagnosis. The peak is a live gate. A candidate fix removes the visible failure, passes regression, and fails the held-out authorization case: the retry that made the error go away was a 403 that somebody else's credential answered. Regression, holdout, scope, and a person. The back half asks what the queue does to the reviewer (Bainbridge, 1983), compiles repeated work into tested scripts, and measures honestly — a hundred tickets, ninety closed as wrong, is a ten percent useful rate. You leave with one failure class to start Monday.

## Audience

AI engineers, SREs, platform engineers, DevEx teams, and technical leaders who own a production system and have a coding agent available.

## Three takeaways

- Stand up a scheduled agent with log access that produces a classified failure list, using integrations you already have.
- Choose the next integration by the loop step it unlocks, and grow the loop one failure class at a time.
- Gate automatic tickets and PRs with regression, holdout, scope, and a human wherever money, data, or customers are affected.

## Reviewer notes

40 minutes, 15 slides, a 5:30 live gate demonstration planned for the 40/30 routes. Intermediate engineering depth; familiarity with a CI scheduler and one observability platform helps. Distinct from a general observability or eval talk: the focus is the order in which to grant an agent access and authority, and the guardrails at each step. No vendor pitch; agents and platforms are named as examples of a category. The speculation slide is cut. The argument now includes normalization of deviance, jidoka, reviewer skill and attention, and misleading ticket metrics. The live demonstration requires sanitized input, a working tracker integration, and an executed failing holdout; the historical checkbox kit does not qualify. See the recording plan for outstanding evidence.
