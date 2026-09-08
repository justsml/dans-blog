# Charm Is Not a Currency

5 min · lightning · parent: [Stop Looking at My Benchmarks](../talks/benchmarks/outline-40min.md), slides 2, 3, 5, 6, 12, 13

Average "right account," "authorized action" and "friendly tone" into one score and the model learns that charm is a currency.

## Hook (0:00)

Three models, our cancellation workflow. A: 71% pass. B: 82%. C: 90%. Before we pick C: what did *pass* mean? Did the system cancel the right account, or write a reassuring answer about it?

## Beat: Goodhart, with a loophole (0:45)

Reward a proxy and behavior changes. A support assistant can shorten handling time by closing the conversation before solving the problem. A judge can reward confident prose while the backend state stays wrong. Write that loophole down before optimizing, then add a case that exploits it. If the grader applauds the exploit, you found work worth doing.

## Beat: constraints versus preferences (1:45)

Right account, applicable policy, authorized state change: constraints. Tone: a preference, after the constraints pass. Cronbach and Meehl's construct validity asks what the score is a score *of*. A score used to shortlist a model and the same score used to authorize refunds are different claims and need different evidence.

## Beat: "cancel my account," varied one thing at a time (2:45)

Wrong tenant. Expired session. Already cancelled. Tool timed out after accepting the request. Account type that needs a second approval. Each case names the expected backend state and what the assistant should say. A transcript without an acceptance criterion is a souvenir.

## Beat: the cheapest check that can honestly fail (3:45)

Check account state with code. Check the schema with code. Don't ask a model whether a JSON parser would accept a payload. Use a model grader where the criterion needs language judgment, validated against labeled cases. Use people for disputed policy. Each layer must be able to reject a plausible wrong answer.

## Landing (4:30)

Track critical violations separately, always. Nine friendly answers do not compensate for deleting the wrong account, and a single averaged number will tell you they did.

## On screen

`score = avg(account ✓, authorized ✓, tone ✓)` with a strike through it. Below: `gates: account, authorized. then: tone.`

## Source

Campbell (1979). Strathern (1997) for the Goodhart wording. Cronbach and Meehl (1955). Raji et al. (2021), AI and the Everything in the Whole Wide World Benchmark.
