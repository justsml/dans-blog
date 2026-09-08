# The Council of Guards

7 min · lightning · parent: [Dynamic Scaling of Agentic Workloads](../talks/dynamic-scaling/outline-40min.md), slide 13 · pairs with [The Barrel-of-Monkeys Maneuver](barrel-of-monkeys.md)

Not a correctness vote. A disagreement detector, and it costs a fraction of the work it protects. This is the judging side; the generation side, leading with cheap parallel drafts on purpose, is the barrel of monkeys. Book them together for a 15-minute slot.

## Hook (0:00)

Give one design brief to three generated agents with different priorities: a minimalist, a maintainer, a security-and-performance reviewer. Keep the first drafts separate so they don't converge on the first plausible answer. The contrast is the product.

## Beat: get the objection out of the way (0:45)

Somebody's going to cite Knight and Leveson at me, so let me do it first. 1986, twenty-seven programmers, one spec, a million tests, and the independently written versions failed together far more than independence predicts. True, important, and about N-version programming as a correctness strategy. That is not what this is. I'm not voting three models toward the truth, and I'm not going to tell you the ensemble is right because it agreed with itself.

## Beat: what parallel attempts actually buy (1:45)

Understanding of the models you depend on: same brief through two of them and you learn what each reaches for and forgets. A migration harness: same brief, new model, diff the behavior *before* you switch. Better output: a synthesis of compatible ideas often beats any single draft. And the cheap one, the one I care about: judging.

## Beat: the arithmetic of judging (3:00)

A judge reads a thousand tokens and writes fifty. Output is what costs. So you can afford three or five judges from different models on every candidate, and the number you want back is not the average score. It's the disagreement. When the judges split, or their reasons barely overlap, that candidate is sitting in territory nobody understands, and that's the one you don't ship on autopilot. The council reads everything, writes almost nothing, and costs a fraction of the generation it's guarding.

## Beat: gates before preferences (4:15)

Write the gates before reading candidates: no duplicate dispatch after restart, no cross-tenant spend, no regeneration on notification retry, no dispatch after deadline. Run executable checks first. In the exercise every candidate fails a gate, including the careful one. The council is allowed to reject the room. A synthesis is a new candidate and runs the gates again. Stop at the review budget.

## Beat: this isn't the engineering we were raised on (5:30)

Don't do the work twice. Don't spend compute speculatively. One right answer per ticket. Those were axioms when the expensive thing was the engineer. When the expensive thing is being wrong and a second draft costs cents, doing it three times and reading what disagrees is the frugal move. I'm not a shill for Big Token. Cheaper, safer and faster now sometimes come from spending exactly where yesterday's wisdom told you not to.

## Landing (6:30)

Three candidates. Three judges each. Show the split: total agreement on why the minimalist failed, total agreement on the replay bug, and a three-way disagreement on the maintainer's design. That last one gets the human's afternoon. Not because it scored worst. Because nobody could agree on why.

## On screen

Three candidate columns. Under each, three judge verdicts. Two columns aligned; one scattered. Caption: **low overlap is the signal.**

## Demo

Candidate table and stipulated council split in [demo.md](../talks/dynamic-scaling/demo.md).

## Source

Knight and Leveson (1986), cited to set aside. Anthropic, Building effective agents, for the parallelization and evaluator vocabulary.
