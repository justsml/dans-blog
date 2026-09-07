# Fool's Golden Dataset

4 min · video / lightning · parent: [Retrieval](../outlines/retrieval-40min.md), slides 9 and 10

The better retriever scored worse because nobody had ever judged what it found. You didn't break retrieval. You found the hole in the ruler.

## Hook

Acme asks: can we cancel today without a fee? Your golden set has five judged documents for that query. A: the generic policy, 30-day notice. B: Acme's signed addendum, which says "see Schedule R." C: expired Acme terms. D: another customer's contract. E: a support note that says "probably immediate."

## Beat: the new retriever

It returns B and F. F is the signed Schedule R, the one B refers to, the one that waives the fee. Nobody judged F because none of the old retrievers ever surfaced it. Your scorer treats unjudged as nonrelevant. Old top-two: B, A → precision 1.0. New top-two: B, F → precision 0.5. The system that found the actual answer just lost.

## Beat: the field already checked this

Cranfield, 1966: fixed corpus, fixed queries, relevance judgments, compare systems. TREC used pooling because judging everything was impractical, and then investigated whether the shortcut damaged comparisons. Zobel in 1998. Voorhees, Soboroff and Lin in 2022 re-judged TREC-8 against modern neural retrievers and found the system ordering barely moved. Deep, diverse pools held. They tested the ruler. We called our first results golden.

## Landing

Judge F under the same rubric and the new run is back to 1.0. Nothing about retrieval changed; the instrument did. Write down your collection protocol, and go find the documents your eval never judged.

## On screen

Pool: `A B C D E`. New result: `B F`. P@2: **1.0 → 0.5 → 1.0** with "judge F" between the last two.

## Demo

`bun artifacts/speaking-portfolio-expanded/packets/retrieval/pooling.ts` after revealing F.

## Source

Cleverdon, Mills, Keen (1966), Cranfield report. Zobel (1998), How reliable are the results of large-scale IR experiments? Voorhees, Soboroff, Lin (2022), Can Old TREC Collections Reliably Evaluate Modern Neural Retrieval Models?
