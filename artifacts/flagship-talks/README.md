# Retrieval, Benchmarks, and Judgment

The current talks use canonical structured outlines in the expanded portfolio. `sync-talks.ts` derives the browser decks, 40/30/15 presenter scripts, short-route timings, and both PowerPoint editions. Files in this directory remain as compatibility pointers; the retained PowerPoint filenames are synchronized aliases of the current screen editions.

| Talk | Audience | Canonical outline | Browser deck | Short routes |
| --- | --- | --- | --- | --- |
| Your Eval Suite Has a Grandfather | Engineers building retrieval and RAG systems | [40 minutes, 15 slides](../speaking-portfolio-expanded/outlines/retrieval-40min.md) | [Deck](../reveal-talks/retrieval.html) | [15](../speaking-portfolio-expanded/outlines/retrieval-15min-adaptation.md) · [30](../speaking-portfolio-expanded/outlines/retrieval-30min-adaptation.md) |
| Stop Looking at My Benchmarks… Get Your Own! | Engineers responsible for evaluation and release decisions | [40 minutes, 15 slides](../speaking-portfolio-expanded/outlines/benchmarks-40min.md) | [Deck](../reveal-talks/benchmarks.html) | [15](../speaking-portfolio-expanded/outlines/benchmarks-15min-adaptation.md) · [30](../speaking-portfolio-expanded/outlines/benchmarks-30min-adaptation.md) |
| Code Is Cheap. Judgment Is Expensive. | Senior engineers and leaders who staff review | [40 minutes, 14 slides](../speaking-portfolio-expanded/outlines/judgment-40min.md) | [Deck](../reveal-talks/judgment.html) | [15](../speaking-portfolio-expanded/outlines/judgment-15min-adaptation.md) · [30](../speaking-portfolio-expanded/outlines/judgment-30min-adaptation.md) |

Run `bun artifacts/speaking-portfolio-expanded/build-talk.ts <slug>` after editing an outline. Never edit generated scripts or browser decks. Timings are rehearsal targets, with exercises included and Q&A excluded.

Retrieval owns the Cranfield/TREC history and pooling exercise. Benchmarks owns validity, reliability, and small-sample inference. Judgment owns the review queue, specifications, and reviewer control. Multi-candidate orchestration belongs to [Dynamic Scaling](../speaking-portfolio-expanded/outlines/dynamic-scaling-40min.md); cost per accepted outcome belongs to [Free Tier](../speaking-portfolio-expanded/outlines/free-tier-40min.md).

Sources and claim boundaries live beside slides and in each packet’s evidence bank. Named Story prompts still require Dan’s own records. The synthetic fixtures do not establish customer outcomes or productivity gains.
