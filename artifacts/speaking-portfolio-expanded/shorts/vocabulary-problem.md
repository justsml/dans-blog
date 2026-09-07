# Cancel Means Cancel*

2 min · video · parent: [Retrieval](../outlines/retrieval-40min.md), slide 5

Same meaning, different words. Same word, different meanings. Your eval needs both cases and has neither.

## Hook

The customer says "stop billing." The policy document says "terminate renewal." Exact match finds nothing. You buy a vector database.

## Beat: the problem is older than the fix

Furnas, Landauer, Gomez and Dumais named the vocabulary problem in 1987: two people refer to the same thing with different words, reliably, and no single canonical term fixes it. An embedding is one answer. So are aliases, expansion and better indexing. The embedding is a method; it is not the reason the problem exists.

## Beat: now reverse it

Two documents both say "cancel." One cancels a meeting. One cancels a subscription. Shared words do not establish shared intent, and a semantic retriever can be just as confidently wrong in that direction. Your eval set needs a case for vocabulary mismatch and a case for misleading overlap. If the first retriever picked the test set, it has neither.

## Landing

Ask your support team for two phrases customers use that never appear in the docs. Those are your first two eval cases.

## On screen

Left: *stop billing* ↔ *terminate renewal*. Right: *cancel* (meeting) ↔ *cancel* (subscription). Caption: **both are retrieval failures.**

## Source

Furnas, Landauer, Gomez, Dumais (1987), The vocabulary problem in human-system communication, CACM 30(11).
