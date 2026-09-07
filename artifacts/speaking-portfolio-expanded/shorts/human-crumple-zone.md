# Human Crumple Zone

5 min · lightning · parent: [Code Is Cheap. Judgment Is Expensive.](../outlines/judgment-40min.md), slides 5, 8, 10

An engineer at the end of a pipeline, two minutes per diff, "accountability stays human." The org chart looks great. The engineer is a bumper.

## Hook (0:00)

Elish's term: a moral crumple zone. The human who absorbs blame for a system they don't actually control. Put someone at the end of an automated pipeline, give them two minutes to approve, and announce that responsibility stayed with a person.

## Beat: control or record? (1:00)

Can they stop arrivals? Demand another test? Reject the change without missing a throughput target? Own the rollback and have time to understand it? Those are controls. Their name in the approval log is a record. If all they have is the record, you didn't keep a human in the loop. You kept a signature.

## Beat: you cannot inspect quality in (2:00)

Deming's third point, applied to generated code: stop depending on inspection, build quality into the process. Keep review; change what it receives. An unasked-for abstraction, an unexplained permission change and a speculative feature all consume the same person's attention. Rejecting them *before* generation is cheaper than having a reviewer reverse-engineer why they exist.

## Beat: what review is actually for (3:00)

Bacchelli and Bird at Microsoft: teams say review is for finding defects; the observed benefit is at least as much knowledge transfer and alternative designs. A green check proving a local invariant doesn't teach anyone how the subsystem behaves. Keep junior engineers writing the acceptance case and explaining the rejection, or you're removing the practice that builds the next reviewer.

## Landing (4:15)

For every automated change, name who accepts the behavior, who receives the incident, and who maintains it next year, and give each of them the context and authority the job requires. Accountability without controls is just a convenient place to send the postmortem.

## On screen

A pipeline diagram with a small human icon wedged at the end, labeled *approves*. Then the four questions, one at a time, each answered *no.*

## Source

Elish (2019), Moral Crumple Zones. Deming's Point 3. Bacchelli and Bird (2013), Expectations, Outcomes, and Challenges of Modern Code Review.
