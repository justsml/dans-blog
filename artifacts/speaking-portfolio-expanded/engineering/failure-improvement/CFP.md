# Automating Improvement From Failure

## 50-word abstract

Your production logs already contain next month's engineering work, and nobody is reading them. This talk shows how to hand them to an agent, which access to add next, and how to grow a loop that distills failures, files tickets, opens guarded PRs, and answers customer feedback. Actionable Monday.

## 150-word abstract

Every failure in production is a queued improvement that nobody works. Step one is smaller than teams expect: give a coding agent read access to the logs and ask what broke since yesterday. This talk is the ordering after that. Each integration you add (the codebase, an observability MCP, a cloud platform MCP, ticketing, a browser) raises how much of the loop the agent can close on its own, and every platform now offers an MCP, an API, or a CLI. The mechanism is a scheduled out-of-band check that distills everything since the last run, classifies by pattern, severity, and security class, and files tickets, then PRs, into a review queue. The peak is the guardrails: similarity is a candidate, three evidence gates, and a human wherever money or customer messaging is involved. The back half extends the loop to agent-driven testing, compiling repeated work into scripts, and customer feedback and proactive notices. Grown one failure class at a time.

## Audience

AI engineers, SREs, platform engineers, DevEx teams, and technical leaders who own a production system and have a coding agent available.

## Three takeaways

- Stand up a scheduled agent with log access that produces a classified failure list, using integrations you already have.
- Choose the next integration by the loop step it unlocks, and grow the loop one failure class at a time.
- Gate automatic tickets and PRs with regression, holdout, scope, and a human wherever money, data, or customers are affected.

## Reviewer notes

40 minutes, 17 slides, one two-to-four-minute offline guardrail demo. Intermediate engineering depth; familiarity with a CI scheduler and one observability platform helps. Distinct from a general observability or eval talk: the focus is the order in which to grant an agent access and authority, and the guardrails at each step. No vendor pitch; agents and platforms are named as examples of a category. Speculative material (personalized software) is one slide and labeled as speculation. Demo works without accounts, API keys, or network.
