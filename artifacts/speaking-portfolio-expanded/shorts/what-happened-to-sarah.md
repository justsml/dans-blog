# The Robot Opened Good PRs for a Month. Then What Happened to Sarah?

3 min · video / lightning · parent: [Automating Improvement From Failure](../outlines/failure-improvement-40min.md), slide 9

The routine work left. The hard cases stayed. The practice disappeared. This paper is from 1983.

## Hook

Your repair agent opens good pull requests for a month. Ninety-five percent get merged. What happened to the person reviewing them?

## Beat: Bainbridge

Ironies of Automation, 1983. Automate the routine and what remains for the human is monitoring a system that's almost always right, plus the rare difficult intervention, with fewer and fewer chances to practise. Skitka and colleagues put numbers on the monitoring half in 1999: people given a highly but imperfectly reliable aid did worse than people given no aid at all. It's right often enough that you stop checking.

## Beat: the design response

Rotate review duty and reserve time for it. Practise recovery on known failures outside production. Sample accepted work for missed defects. Keep the evaluation cases out of the repair agent's tuning loop. And if the queue is too big to inspect, reduce what enters it; giving one engineer a hundred green suggestions is not giving them a hundred reasons to trust the next one.

## Landing

The problem did not wait for a chat interface. Decide what the reviewer is *for* before the robot decides for you.

## On screen

A month of green PRs scrolling. Freeze. One reviewer avatar. Caption: *what remains for the human?*

## Source

Bainbridge (1983), Ironies of automation, Automatica 19(6). Skitka, Mosier, Burdick (1999), Does automation bias decision-making? IJHCS 51(5).
