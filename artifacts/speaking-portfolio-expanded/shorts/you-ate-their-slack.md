# Who Ate My Slack?

3 min · video · standalone. Retired parent: *Code Is Cheap. Judgment Is Expensive.*, slides 1 and 3, reworked into [Turn Your Thinkin' Tokens Up to 11](../talks/judgment/outline-40min.md) on 7 September 2026. The queue material lives only here now; its diagram is [queue.svg](../../../public/talks/assets/judgment/queue.svg).

Generation got cheap. Review acquired a queue. The reviewer did not change; the arrival rate did, and queues are not sentimental about it.

## Hook

Four good implementations arrive before lunch. The reviewer is still on yesterday's. Everyone agrees the reviewer is the bottleneck. Nobody has done the division.

## Beat: the curve

Kingman's approximation for a single server: waiting time scales with ρ/(1 − ρ), where ρ is utilization. At 80% busy, 0.8/0.2 = 4× the hands-on time spent waiting. At 90%, 9×. At 95%, 19×. Fifteen points of "efficiency" bought nearly five times the delay. That multiplier is the wait, not the review itself; the review is on top.

## Beat: what actually happened

You made code cheap, arrivals went up, and you filled the headroom that let one person absorb uneven work. Then you called the person slow. Hiring a second reviewer inherits the same variance. Fixing arrivals first is cheaper: decline the second implementation when the first met the need, keep one purpose per diff, reserve review time on the calendar as capacity, not as a hope.

## Landing

Measure the wait, not the output. Ready → first review → accepted, with timestamps. If you can't see the queue, you'll keep optimizing the stage that wasn't the problem.

## On screen

The ρ/(1 − ρ) curve. Three dots labeled 4×, 9×, 19×. Caption: *the reviewer didn't get slower.*

## Source

Kingman (1961), The single server queue in heavy traffic. Little (1961), A Proof for the Queuing Formula L = λW.

## Story slot

The change that waited longer for review than it took to write. Bring the three timestamps.
