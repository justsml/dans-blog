# Buy Ten, Get Forty

2 min · video · parent: [Dynamic Scaling of Agentic Workloads](../outlines/dynamic-scaling-40min.md), slides 1, 3, 4

The whole talk in one multiplication. Numbers are fixtures; the mechanism is not.

## Hook

A customer buys ten images. Within a minute, four things happen and every one of them is legitimate.

## Beat: count with me

The chat turn calls the batch tool: ten. A worker crashed halfway and its replacement retries: ten. The nightly job re-runs anything not marked done: ten. The customer opened a second tab because the first looked stuck: ten. Four callers, every local limit passed, the provider is rendering forty. Your dashboard proudly reports "4 tool calls." Add one retry per item and it's eighty.

## Beat: the wrong unit

A prompt that says "only run one expensive tool" is guidance, not a lock. A process-local semaphore only works when that process owns all the work, and in an agentic system it never does. The limit was on the wrong unit: tool calls, when the thing you promised the customer was ten images and the thing you pay for is provider attempts.

## Landing

Every external dispatch crosses one shared admission gate that reserves against the tenant's entitlement before anything starts. Count logical items and provider attempts separately. Put the limit where the work begins.

## On screen

4 callers × 10 = **40**. Then × 1 retry = **80**. Bottom corner: *dashboard: 4 tool calls.*

## Story slot

The fan-out you found on a bill before you found it in a dashboard.
