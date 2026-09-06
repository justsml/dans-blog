# Rethinking parallelization in the agentic era

## Short abstract (50 words)

Four tool calls can launch forty image jobs. Local limits all pass while the customer budget disappears. This talk follows hidden fan-out through shared admission, durable state and restart recovery, then applies the same discipline to competing agent solutions: bounded attempts, independent checks, explicit synthesis and measured cost per outcome.

## Standard abstract (101 words)

Agent parallelism can hide expensive work below a harmless-looking tool call. A batch of ten images multiplied by four concurrent callers creates forty provider jobs, even when every local limit works. This session separates tool slots, provider concurrency, rate limits, entitlements and spend, then follows a batch through lost responses, restarts and notification failures. It also explores parallel attempts at one engineering problem using contrasting priorities, a fixed rubric and verification after synthesis. Attendees leave with an admission protocol, durable job state machine and candidate-review contract, plus a way to compare parallel execution against one competent attempt without ignoring coordination costs.

## Outcomes

- Locate hidden fan-out and enforce aggregate limits at dispatch.
- Specify durable job and notification state with honest uncertain outcomes.
- Compare independent designs using fixed acceptance gates and revalidate any synthesis.

Audience: application and platform engineers. 16 slides, 40 minutes including a five-minute paper walkthrough; 15 and 30 minute routes available. Proposed architecture and synthetic fixtures, no live model or measured improvement claim. [Full submission packet](../../packets/parallelization/packet.md).
