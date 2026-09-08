# The Barrel-of-Monkeys Maneuver

7 min · lightning · parent: [Dynamic Scaling of Agentic Workloads](../talks/dynamic-scaling/outline-40min.md), slide 12 · pairs with [The Council of Guards](council-of-guards.md)

Lead with parallel generation on purpose. You are adding a controlled section of chaos, and the next stage has to handle it. That's the design, not the bug.

## Hook (0:00)

Yesterday's axiom: don't do the work twice. Today: a second draft costs cents, input tokens are the cheap ones, and the expensive thing is the one errant mistake in output number seven. So do the work nine times, badly and cheaply, and then deal with the barrel.

## Beat: why you'd want the chaos (0:45)

Four reasons, and they're different architectures. **Race:** you want the fastest acceptable answer, so fan out and take the first one that passes the gate. **Synthesize:** you want the best parts of several, so a frontier model reads all the drafts (input, cheap) and writes one coherent output (output, expensive, once). **Rank:** you want more candidates for the judges so the best whole answer goes downstream. **Catch:** in law, medicine, anything with extensive specific rules, the mistake you fear appears in one output out of ten, and the only way to see it is to have ten.

## Beat: the monkeys are cheap (2:00)

Models at a hundredth or a thousandth the price of the frontier can generate alternatives in a loop. Some of them need a tool-calling agent with file operations, search, chunked reads, edits, git, which means a sandbox and somebody's cloud. Others single-shot it fine. That's your first architecture decision: how much effort do you want in a system that keeps improving over time, versus one you can retune at runtime without touching the codebase. Neither is wrong. Both cost something different.

## Beat: single-shot generations are tools (3:15)

A one-shot prompt is a perfectly good tool in another workflow, and fan-out is something you *encapsulate* at a node in the graph, not something the whole system does. Default model for most of the traffic. For a sample of requests, or a class of them, that node fans out to n alternatives across models or endpoints and hands the barrel to the next stage. Your needs and your opportunities decide why, where and how often. Nobody else's benchmark does.

## Beat: what handles the barrel (4:15)

Something has to. A revision loop that takes the synthesis back through the gates. A router that picks by measured outcome. The council of guards, reading cheaply and reporting disagreement. Or your users, in an A/B test, doing the labeling for you. Generation without a next stage is just a bigger bill with more opinions in it.

## Beat: is this speculative optimization in a lab coat? (5:15)

Yes, possibly. Probably sometimes. We'll find out. So: never ship any of this without env vars to turn the fan-out down to one. And ideally, don't hand-tune the knob at all; build the system that watches its own acceptance rate and token burn and adjusts fan-out itself. Right? Right. That system is [a different talk](../talks/adaptive-systems/outline-40min.md), including when to bother and at what level of direct control.

## Landing (6:15)

Cheaper, safer and faster now sometimes come from spending exactly where yesterday's wisdom told you not to. I'm not a shill for Big Token. I just noticed that a barrel of cheap monkeys plus one honest judge beats one careful monkey more often than my engineering instincts want to admit.

## On screen

One node in an application graph, highlighted. It fans out to nine small boxes at `$0.001`, converging into one large box at `$0.10` labeled *synthesize*, then an arrow to *council / router / revision / users*. Caption: **the next stage handles the barrel.**

## Scope

Prices are ratios, not quotes. No claim about any provider's margin.

## Story slot

The one-in-ten output that would have shipped if there had only been one.
