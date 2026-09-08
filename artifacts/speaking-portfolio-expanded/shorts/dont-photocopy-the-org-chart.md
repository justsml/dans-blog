# Conway's Photocopier

3 min · video / lightning · parent: [Break the Mirror on Purpose](../talks/product-engineering/outline-40min.md), slides 1, 3, 5

Conway said your software mirrors your meetings. You're about to build one agent per department so the robots can have the same handoffs and the same lost tickets, only faster.

## Hook

Research writes a brief. Product turns it into tickets. Engineering turns tickets into software. Support turns the software back into complaints. Now draw a robot next to each one. Congratulations: you've automated the org chart.

## Beat: why the boundaries exist

Coase, 1937: coordination has a cost, and the boundary sits where the cost balances. A weekly brief existed because collecting it took two days. A triage meeting existed because linking a complaint to a trace needed three people and a spreadsheet. Those costs just changed. The old boundary deserves a second look before you teach an agent to reproduce it.

## Beat: draw the wires, not the boxes

Design communication between agents and people, not a robot per job title. Research delivers a sourced brief with dates. Feedback delivers clusters with the original complaints attached. A product review resolves the disagreement and writes down the accepted hypothesis; a build agent consumes that artifact instead of polling six chat histories to guess which decision won. Keep the meeting where the evidence conflicts. Delete the one that was only ever a spreadsheet.

## Landing

Take one handoff. What arrives, what leaves, who decides, what did it cost last week? Reprice it. Then decide whether it deserves an agent, or a deletion.

## On screen

Org chart → identical chart with robot icons. Big red X. Then: arrows between artifacts, labeled *brief*, *clusters*, *accepted hypothesis*.

## Source

Conway (1968), How Do Committees Invent? Coase (1937), The Nature of the Firm. Colfer and Baldwin (2016), The mirroring hypothesis.
