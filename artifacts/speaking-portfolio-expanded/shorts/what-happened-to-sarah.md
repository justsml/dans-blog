# The Robot Took the Easy Ones

3 min · video / lightning · parent: [The Pager Cried Wolf](../talks/failure-improvement/index.md), slide 9

The routine work left. The hard cases stayed. The practice disappeared. This paper is from 1983.

## Hook

Your repair agent opens good pull requests for a month. Imagine ninety-five percent get merged; that is a hypothetical, not a measured deployment. What happened to the person reviewing them?

## Beat: Bainbridge

Ironies of Automation, 1983. Automate the routine and what remains for the human is monitoring a system that's almost always right, plus the rare difficult intervention, with fewer and fewer chances to practise. Skitka and colleagues put numbers on the monitoring half in 1999: during trials where the aid failed, participants could miss events it did not flag or follow advice despite contradictory valid indicators. It's right often enough that you stop checking.

## Beat: the design response

My design response: rotate review duty and reserve time for it. Practise recovery on known failures outside production. Sample accepted work for missed defects. Keep the evaluation cases out of the repair agent's tuning loop. And if the queue is too big to inspect, reduce what enters it; giving one engineer a hundred green suggestions is not giving them a hundred reasons to trust the next one.

## Landing

The problem did not wait for a chat interface. Decide what the reviewer is *for* before the robot decides for you.

## On screen

A month of green PRs scrolling. Freeze. One reviewer avatar. Caption: *what remains for the human?*

## Source

Bainbridge (1983), Ironies of automation, Automatica 19(6). Skitka, Mosier, Burdick (1999), [Does automation bias decision-making?](https://www.sciencedirect.com/science/article/pii/S1071581999902525), IJHCS 51(5).
