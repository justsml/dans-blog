# Three Search Methods in a Fundable Trenchcoat

Prepared 6 September 2026. Abstract lengths use whitespace-separated words. No biography, affiliation, or speaking history is asserted.

## Short abstract (50 words)

Our agent does RAG over an embedding store with an LLM judge and full tracing. Every load-bearing idea in that sentence was named between 1972 and 1998, and so were the ways of checking whether the score means anything. We skipped the second half.

## Standard abstract (150 words)

Lexical, dense, hybrid: three search methods in a trenchcoat, and the coat is not the problem. Information retrieval spent sixty years learning how to tell whether a retrieval score was telling the truth, and that is the part the current stack left behind.

This talk hands engineers eight words with dates on them — term specificity, vector space model, vocabulary problem, passage retrieval, relevance judgment, the Cranfield paradigm, pooling, assessor disagreement — and uses each one to diagnose a real failure. The room judges five documents for a live query and discovers the better retriever scored worse, because the document it found was never judged. Cranfield in 1966 established the paradigm; Zobel and Voorhees measured what pooling and assessor disagreement do to it. The verdict is more encouraging than it sounds: deep, diverse pools hold up, and the ordering survives disagreement. Your golden dataset is the thing that has not been checked.

## Audience

AI engineers, search and platform engineers, ML practitioners running RAG in production, and technical leaders who own an evaluation suite. No IR background assumed; the talk defines every term it uses and does the arithmetic on stage.

## Three audience outcomes

1. Name the retrieval failure you actually have — vocabulary mismatch, passage boundary, rare identifier, or a judgment hole — instead of swapping embedding models and hoping.
2. Write down a collection protocol: which documents were judged, by whom, under what rubric, and what "unjudged" means to your scorer.
3. Run a pooled comparison on a fixed corpus, queries and judgments, and know why an unjudged relevant document makes a better retriever look worse.

## Reviewer notes

This is a history-to-practice talk, not a survey and not a vendor comparison. Every claim is cited to its primary source with a year, and the talk is explicit about what each result does not establish: Voorhees (2000) measured that ranking comparisons survive assessor disagreement, which is not a claim that judgments do not matter. No benchmark leaderboard is presented and no product is recommended. The pooling exercise runs offline from a synthetic fixture; the accompanying script is in the packet. Companion to *Stop Looking at My Benchmarks… Get Your Own!*, which owns instrument validity in general — this one owns retrieval specifically. Do not book both without saying so; they share the Cranfield citation and would repeat it.

**Format:** 40 minutes, 15 slides, including a three-and-a-half-minute judging exercise. 15- and 30-minute routes are prepared. [Full submission packet](../../packets/retrieval/packet.md).
