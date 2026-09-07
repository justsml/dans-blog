# Software Runs on Petrol Now

3 min · video · parent: [The Future of Product Engineering](../outlines/product-engineering-40min.md), slide 14

Tokens stop being a build cost and become a running cost. Then they never stop.

## Hook

Today you buy tokens to build software. My bet is that before long most software needs a steady stream of them just to keep running: to stay current with its dependencies, to re-derive the integration a vendor renamed last night, to keep its own documentation true. Steady for some systems, bursty for others. Either way it is fuel, not a build cost.

## Beat: the meter you don't watch

You will meter it the way you meter electricity, which is to say you will only notice it when it moves. That is fine right up until the month it moves. A finished product with no new features can still have a monthly burn that grows, because the world it integrates with keeps changing underneath it and something has to keep up.

## Beat: the half that is defense

And some of that burn is not features at all. If an attacker can point a tireless agent at your surface, the only symmetric answer is a tireless agent of your own — self-hacking around the clock, finding and mitigating faster than the countless people trying to get in. That is a permanent line item on a product that is otherwise done. It never completes.

Be careful when you fire the security sentry bots, incidentally. They know who you are. They know where the keys are. They have read all of your commits.

## Landing

Underneath the joke is a real one: an agent whose account you revoked while its credential is still live is the boring version, and it happens today. So price the fuel now. One of the wires between your agents is a fuel line, the ongoing burn belongs in the design doc next to the latency budget, and somebody owns that meter. It is not the person who wrote the prompt.

## On screen

A fuel gauge on a "finished" product. Below it two line items: `features: 0` · `keeping up: ∞`.

## Scope

A prediction, labeled as one. No measured figures.

## Story slot

The first time an always-on agent showed up as a recurring cost nobody had budgeted.
