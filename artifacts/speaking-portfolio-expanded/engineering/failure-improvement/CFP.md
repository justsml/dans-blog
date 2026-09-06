# Automating Improvement From Failure

## 50-word abstract

Your production logs already contain next month's engineering work, and nobody is reading them. This talk shows how to hand them to an agent, which access to add next, and how to grow a loop that distills failures, files tickets, opens guarded PRs, and answers customer feedback. Actionable Monday.

## 150-word abstract

Every failure in production is a queued improvement that nobody works. Step one is smaller than teams expect: give a coding agent read access to the logs and ask what broke since yesterday. This talk is the ordering after that. Each integration you add (the codebase, an observability MCP, a cloud platform MCP, ticketing, a browser) raises how much of the loop the agent can close on its own, using an available API, CLI, or sanitized export. The mechanism is a scheduled out-of-band check that distills everything since the last run, classifies by pattern, severity, and security class, and files tickets, then PRs, into a review queue. The peak is the guardrails: similarity is a candidate, three evidence gates, and a human wherever money or customer messaging is involved. The back half extends the loop to agent-driven testing, compiling repeated work into scripts, and customer feedback and proactive notices. Grown one failure class at a time.

## Audience

AI engineers, SREs, platform engineers, DevEx teams, and technical leaders who own a production system and have a coding agent available.

## Three takeaways

- Stand up a scheduled agent with log access that produces a classified failure list, using integrations you already have.
- Choose the next integration by the loop step it unlocks, and grow the loop one failure class at a time.
- Gate automatic tickets and PRs with regression, holdout, scope, and a human wherever money, data, or customers are affected.

## Reviewer notes

40 minutes, 15 slides, a 5:30 live gate demonstration planned for the 40/30 routes. Intermediate engineering depth; familiarity with a CI scheduler and one observability platform helps. Distinct from a general observability or eval talk: the focus is the order in which to grant an agent access and authority, and the guardrails at each step. No vendor pitch; agents and platforms are named as examples of a category. The speculation slide is cut. The argument now includes normalization of deviance, jidoka, reviewer skill and attention, and misleading ticket metrics. The live demonstration requires sanitized input, a working tracker integration, and an executed failing holdout; the historical checkbox kit does not qualify. See the recording plan for outstanding evidence.
