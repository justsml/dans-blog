# Stop Looking at My Benchmarks… Get Your Own!

Prepared 8 September 2026. Abstract lengths use whitespace-separated words. No biography, affiliation, or speaking history is asserted.

## Short abstract (50 words)

Model A scores 89.7, B scores 88.9, C scores 84.3. On your actual work the order reverses. The problem is not that you picked the wrong benchmark. It is that nobody tested the instrument. Twenty green cases prove less than you think, and this talk does the arithmetic on stage.

## Standard abstract (150 words)

Your eval suite is a measuring instrument. Before optimizing its score, ask what evidence supports the decisions you make from it. Psychometrics supplies the questions; our cancellation workflow makes them concrete.

Validity: what does a passing score mean? Reliability: does repeating the judgment change the verdict? Agreement: which failures does the grader miss? Power: what difference could this experiment detect? Contamination: what evidence influenced development? Goodhart: what exploit improves the score while making the service worse?

We derive the exact upper bound after twenty independent representative trials with zero failures: 13.9% at ninety-five percent confidence. That is a limit, not an estimated failure rate. An always-pass judge then earns ninety-percent agreement while missing every failure. You leave with a Calibration Certificate: six questions, evidence fields, limitations, and an owner. Fill it against your own suite, distinguish regression specifications from population claims, and write the rejection rule before seeing the candidate.

## Audience

AI engineers, ML and platform engineers, QA and DevEx teams, and technical leaders who make ship decisions from an eval number. Comfort with basic proportions is enough; the talk derives everything it uses.

## Three audience outcomes

1. State what inference your suite's score licenses, and name one decision it is currently being used for that it cannot support.
2. Compute a confidence bound from a small clean run — the rule of three — and report slices and counts instead of one average.
3. Write the rejection rule before seeing the candidate, version the scorer, and route language judgments to calibrated graders, state and schema checks to code, and disputed policy to a person.

## Reviewer notes

Not a leaderboard talk and not a benchmark review; no public benchmark is ranked and no model is recommended. Every statistical claim is derived on stage from stated assumptions, and the fixture arithmetic is synthetic and labelled as such. Goodhart is cited to his 1975 paper rather than the aphorism, and Campbell is distinguished from him rather than merged. The contamination section reports what detection methods can and cannot establish. Companion to *Three Search Methods in a Fundable Trenchcoat*, which owns retrieval evaluation and the IR history; cost per accepted outcome belongs to *Buy Me a Free Tier*. Their arithmetic and history remain in those companion talks.

**Format:** 40 minutes, 15 slides, including a judge-agreement exercise. 15- and 30-minute routes are prepared. [Full submission packet](packet.md).
