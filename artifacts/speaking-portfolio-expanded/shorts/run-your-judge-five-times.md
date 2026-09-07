# Run Your LLM Judge Five Times. Then Feel Something.

3 min · video · parent: [Stop Looking at My Benchmarks](../outlines/benchmarks-40min.md), slide 7

Same case, five verdicts. That's not a judge, that's a mood ring.

## Hook

Your judge scored the case 94. Run it again: 82. Again: 91, 97, 89. Nothing changed but the dice.

## Beat: the subtle version

Wide spread is easy to laugh at. Here is the one that hurts: 78, 79, 81, 82, 80. Tight. Reasonable. Pass line at 80. That's fail, fail, pass, pass, pass. Two of five verdicts disagree with the majority: a 40% decision-flip rate from noise wearing a lab coat. One adjacent change; don't confuse that with majority disagreement.

## Beat: what to do about it

Rerun fixed cases and record the flip rate next to the score. An always-pass judge has a flip rate of zero, so check correctness against independent labels too; a stable liar is still a liar. Blind model identity, swap A/B order, and watch position bias and self-preference, both of which have published evidence behind them.

## Landing

If you can't say how often the judge changes its mind on the same input, you don't have a score. You have a sample of one.

## On screen

`94 82 91 97 89` then `78 79 81 82 80 | pass ≥ 80` → `F F P P P` → **40% flip**.

## Source

Dan Levy, Auto-Tune Your LLM Judge (danlevy.net). Position bias: arxiv 2406.07791. Self-preference: arxiv 2410.21819. The sequences are a saved teaching fixture, not a live run.
