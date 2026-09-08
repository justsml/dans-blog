# Karen Spärck Jones Would Like a Word

2 min · video · parent: [Retrieval](../talks/retrieval/index.md), slides 3 and 7

Hybrid search: invented last quarter, published in 1972.

## Hook

Support query: "application error when I export." Two candidate terms. `application error` appears in every document you own. `ERR_4471_TENANT` appears in one. Which one do you want your retriever to care about?

## Beat: 1972

Karen Spärck Jones published a statistical interpretation of term specificity. A word in almost every document tells you less about which document you want than a rare term does. That's the idea under IDF, and it's fifty-four years old. We have had time to put her name on the slide.

## Beat: why it still matters with embeddings

Semantic retrieval is great at paraphrase and bad at exact identifiers, unfamiliar domain jargon, and anything the embedding model never saw. BEIR in 2021 found BM25 a robust baseline across heterogeneous tasks. Not "BM25 wins in 2026"; a reason to keep the cheap lexical baseline in the comparison, on the same corpus, queries and judgments, before you announce the new retriever is better.

## Landing

Rare words carry signal. Keep lexical evidence in a system that also understands paraphrase, and measure both against a baseline instead of a demo.

## On screen

`application error` · in 40,000 docs. `ERR_4471_TENANT` · in 1. Year stamp: **1972**.

## Source

Spärck Jones (1972), A statistical interpretation of term specificity, Journal of Documentation 28(1). Thakur et al. (2021), BEIR, NeurIPS D&B.
