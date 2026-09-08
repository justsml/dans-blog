# Stop Looking at My Benchmarks… Get Your Own!

Prepared 6 September 2026. Abstract lengths use whitespace-separated words. No biography, affiliation, or speaking history is asserted.

## Short abstract (50 words)

Model A scores 89.7, B scores 88.9, C scores 84.3. On your actual work the order reverses. The problem is not that you picked the wrong benchmark. It is that nobody tested the instrument. Twenty green cases prove less than you think, and this talk does the arithmetic.

## Standard abstract (150 words)

Your eval suite is a measuring instrument, and measuring instruments get validated before anyone optimizes against them. Psychometrics has done this since Cronbach and Meehl in 1955; we ship a JSON file and call it a holdout.

This talk asks six questions of a suite. Validity: what inference does the score support? Reliability: is it repeatable enough for its use? Agreement: where do graders differ, and what is your kappa when everything passes? Power: twenty for twenty still leaves a one-in-seven true failure rate, by the rule of three. Contamination: what has the system already seen? Goodhart: what breaks when you optimize the number? Along the way a cancellation workload reverses the leaderboard, an always-pass judge scores a perfect record and a kappa of zero, and a rejection rule gets written before anyone looks at the candidate. You leave with twenty cases worth trusting and the limitation written next to them.

## Audience

AI engineers, ML and platform engineers, QA and DevEx teams, and technical leaders who make ship decisions from an eval number. Comfort with basic proportions is enough; the talk derives everything it uses.

## Three audience outcomes

1. State what inference your suite's score licenses, and name one decision it is currently being used for that it cannot support.
2. Compute a confidence bound from a small clean run — the rule of three — and report slices and counts instead of one average.
3. Write the rejection rule before seeing the candidate, version the scorer, and route language judgments to calibrated graders, state and schema checks to code, and disputed policy to a person.

## Reviewer notes

Not a leaderboard talk and not a benchmark review; no public benchmark is ranked and no model is recommended. Every statistical claim is derived on stage from stated assumptions, and the fixture arithmetic is synthetic and labelled as such. Goodhart is cited to his 1975 paper rather than the aphorism, and Campbell is distinguished from him rather than merged. The contamination section reports what detection methods can and cannot establish. Companion to *Three Search Methods in a Fundable Trenchcoat*, which owns retrieval evaluation and the IR history; cost per accepted outcome belongs to *Buy Me a Free Tier*. This talk defers both explicitly on stage.

**Format:** 40 minutes, 15 slides, including a judge-agreement exercise. 15- and 30-minute routes are prepared. [Full submission packet](packet.md).
