# Code Is Cheap. Judgment Is Expensive.

Prepared 6 September 2026. Abstract lengths use whitespace-separated words. No biography, affiliation, or speaking history is asserted.

## Short abstract (50 words)

Four good implementations arrive before lunch. The reviewer is still on yesterday's change. Generation got cheaper and delivery acquired a queue, and no amount of faster generation touches it. Kingman's formula says a reviewer at ninety-five percent utilization waits nineteen times longer. That is not efficiency.

## Standard abstract (150 words)

We sped up one stage of software delivery and left the next one alone. The result is a queue, and queues have arithmetic. Kingman's approximation puts wait in proportion to utilization over one minus utilization: at ninety-five percent, a nineteen-times wait with good posture. You cannot argue that away by pointing at how quickly the code appeared.

This talk works the three levers that actually move it — arrivals, service time, and variability — starting before the code exists. A vague ticket becomes four plausible implementations; a spec reduces variance for free. Bacchelli and Bird found review catches design and knowledge-transfer problems more than defects, which changes what you can safely automate. A live demonstration produces a rubber stamp and asks the room to find what it missed. Bainbridge and Elish supply the warning: do not appoint a human crumple zone. Sometimes the right result is a smaller change, or none.

## Audience

Engineering leaders, staff and principal engineers, platform and DevEx teams, and anyone who owns a review queue that has recently gotten longer. No queueing theory assumed; the formula is derived and checked on stage.

## Three audience outcomes

1. Measure your review queue as a queue — arrival rate, service time, variability, utilization — instead of as a personal throughput problem.
2. Move work off the review stage before it arrives: specify the request, reduce variance, and change what enters the queue rather than how fast it is emptied.
3. Give a reviewer authority to stop work, the context to use it, and enough slack to recover, so no individual becomes the accountability sink for an automated system.

## Reviewer notes

Kingman's approximation is presented as a heavy-traffic approximation with its assumptions stated, not as a law of code review; the talk says explicitly what would make it a bad model of a given team. The demonstration is scripted and deterministic, with synthetic diffs; it is not a measured study of reviewer performance. Bacchelli and Bird (2013) is an observational study at one company and is qualified as such. Elish's moral crumple zone is used as a design warning, not an accusation. Adjacent to *The Future of Product Engineering*, which owns coordination cost and human ownership; this talk owns the queue and stays out of the org chart. Parallel generation and multi-model judging are reconciled on stage: fan out if you like, so long as a gate collapses the candidates before a human reads any of them.

**Format:** 40 minutes, 14 slides, including a live review demonstration. 15- and 30-minute routes are prepared. [Full submission packet](../../packets/judgment/packet.md).
