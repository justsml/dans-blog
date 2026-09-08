# `--no-agent`

2 min · video · parent: [Conjure Exactly Enough](../talks/adaptive-systems/index.md), slide 3 · also the cold open for [Sorry, You're Building It](you-will-build-the-assistant-with-everything.md)

The intermediary intelligence layer is going to wrap everything. Opting out becomes a flag.

## Hook

Your browser ships a chat that drives the page. WebMCP is a draft in Chrome origin trial as of September 2026; participating sites expose tools to agents, and that list only goes one direction. The next generation of CLIs will take natural language by default, and you'll pass `--no-agent` to get the old behavior back. That default is my prediction; --no-agent is the flag I expect.

## Beat: who to blame

I know who to blame: the kids. Actually, the kids hate AI. It'll be *their* kids who demand an agent safety blanket on everything. I don't have to worry about it. I'll be in a rocking chair explaining that the internet was better on vinyl.

## Beat: why it matters to you this year

Every one of those wrappers is an actor reading untrusted input, sitting between a human and a system that can do things. It arrives one integration at a time, in your product too, whether you designed for it or not. The question was never whether to build the assistant with access to everything. It's how many of its pathways are live at once.

## Landing

You don't get to decline the layer. You get to decide how countable it is.

## On screen

Terminal: `$ deploy "roll back the thing from this morning"` … then `$ deploy --no-agent rollback --release=2026.09.05`. Caption: *which one will your kids type?*
