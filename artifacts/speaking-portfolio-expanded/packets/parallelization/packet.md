# Talk packet: Rethinking parallelization in the agentic era

[Formats](formats.md) · [40-minute script](script-40min.md) · [Contracts](contracts.md) · [Evidence](evidence-bank.md) · [Deck](../../../reveal-talks/parallelization.html)

## Titles

- Rethinking parallelization in the agentic era
- Four tool calls, forty jobs
- Count the work below the tool call

## Short abstract (50 words)

Four tool calls can launch forty image jobs. Local limits all pass while the customer budget disappears. This talk follows hidden fan-out through shared admission, durable state and restart recovery, then applies the same discipline to competing agent solutions: bounded attempts, independent checks, explicit synthesis and measured cost per outcome.

## Standard abstract (101 words)

Agent parallelism can hide expensive work below a harmless-looking tool call. A batch of ten images multiplied by four concurrent callers creates forty provider jobs, even when every local limit works. This session separates tool slots, provider concurrency, rate limits, entitlements and spend, then follows a batch through lost responses, restarts and notification failures. It also explores parallel attempts at one engineering problem using contrasting priorities, a fixed rubric and verification after synthesis. Attendees leave with an admission protocol, durable job state machine and candidate-review contract, plus a way to compare parallel execution against one competent attempt without ignoring coordination costs.

## Extended abstract (209 words)

Agent parallelism can hide expensive work below a harmless-looking tool call. A batch of ten images multiplied by four concurrent callers creates forty provider jobs, even when every local limit works. This session separates tool slots, provider concurrency, rate limits, entitlements and spend, then follows a batch through lost responses, restarts and notification failures. It also explores parallel attempts at one engineering problem using contrasting priorities, a fixed rubric and verification after synthesis. Attendees leave with an admission protocol, durable job state machine and candidate-review contract, plus a way to compare parallel execution against one competent attempt without ignoring coordination costs.

The first worked example exposes the multiplication beneath a batch tool. We reserve capacity before dispatch, distinguish logical items from attempts, and keep remote jobs outstanding when a local worker disappears. A second failure shows why notification retries must never regenerate expensive outputs.

The back half changes the unit of work from image tasks to complete design attempts. A minimalist, a maintainer and a security/performance reviewer work from common requirements. Executable gates reject invalid candidates before judgment. Combining useful ideas produces a new candidate that must be tested again. The talk closes with total cost per accepted result, critical-path latency and a procedure worth turning into deterministic code.

## Learning outcomes

1. Locate hidden fan-out and enforce aggregate limits at dispatch.
2. Specify durable job and notification state with honest uncertain outcomes.
3. Compare independent designs using fixed acceptance gates and revalidate any synthesis.

## Audience and prerequisites

Application, platform and staff engineers building tool-using agents. Familiarity with APIs, asynchronous jobs and production failure handling helps. No specific model, framework or cloud account required.

## Reviewer notes

16 slides; 15-, 30- and 40-minute routes; 60- or 75-minute workshop. Synthetic paper walkthroughs, no measured production gains or live agent demonstration claimed. The browser deck follows the current outline. References support individual mechanisms, not a benchmark of the proposed architecture. No vendor pitch.

## Audience adaptations

| Audience | Lead with | Retain |
| --- | --- | --- |
| Practitioners | The failure trace | Contracts and negative tests |
| Engineering leadership | Cost of accepted outcomes and intervention | Ownership and rollout limits |
| Education technologists | An ingest or media-generation workflow | Data meaning and review |
| General technology | What happens after an unexpected failure | One concrete example and an honest stop |
