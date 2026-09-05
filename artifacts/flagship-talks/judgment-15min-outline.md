# Code Is Cheap. Judgment Is Expensive.

15 minutes · 9 slides · Dan Levy

## 1. Code Is Cheap. Judgment Is Expensive.

0.0–1.0 minutes

Engineering leadership when implementation becomes abundant

Ask what happens when producing 10,000 lines of plausible code becomes easier than reviewing 1,000. Treat this as a thought experiment, not a measured productivity claim. The talk is about where constraints move for teams using code generation. Implementation still matters, especially in difficult legacy systems. The organizational question is how to turn more proposed changes into outcomes we can trust.

## 2. A growing review queue

1.0–3.0 minutes

Generation can outpace review.
Unreviewed changes accumulate.
Integration becomes the queue.

A fast generator can create more work for everyone downstream. Walk through a hypothetical developer receiving several plausible implementations before lunch. Someone still has to compare behavior, run meaningful checks, understand dependencies and decide which change belongs in the product. The useful measure is time to a validated outcome, including the queue after generation.

## 3. A useful unit of progress

3.0–4.5 minutes

Validated outcomes
per unit of complexity

Use this as an engineering objective rather than a pretend universal formula. Define the outcome concretely: a user can complete a task, a failure no longer recurs, or an operation becomes easier to maintain. Assess complexity through the interfaces, dependencies and operational burden the change adds. Avoid inventing a single score that hides those tradeoffs.

## 4. A permission specification

4.5–6.5 minutes

Actors and resources
Allowed and denied actions
Invariants
Failure behavior

Continue the permissions example with explicit boundaries. A member can read their organization’s records. A member cannot read another organization’s records. Removing the last owner fails without changing state. These examples are hypothetical requirements, not a complete authorization design. The useful work is making assumptions visible before implementation turns them into behavior.

## 5. Validation infrastructure

6.5–8.5 minutes

Unit and contract tests
Integration checks
Policy and static analysis
Evals for uncertain behavior

Explain which layer checks which behavior. A unit test covers local rules. A contract test covers an interface. An integration check exercises the real boundary. Evals help when output quality is variable, but deterministic assertions remain useful. Each check needs an owner and a failure response. An impressive test count is less useful than knowing which important failures the suite can detect.

## 6. Seniority and judgment

8.5–10.5 minutes

Problem framing
System knowledge
Tradeoff decisions
Evidence review

Avoid turning this into a claim that junior engineers have no future. Judgment develops through implementation, feedback and exposure to consequences. If agents take more routine coding work, teams need deliberate ways to preserve those learning opportunities. Senior engineers still implement, and junior engineers still exercise judgment. The distinction concerns responsibilities and support, not a permanent ranking of people.

## 7. Trustworthy review

10.5–12.0 minutes

Small changes shorten review.
Clear boundaries limit context.
Independent checks expose blind spots.

Review capacity depends on the shape of the work. A coherent small change lets a reviewer understand intent and consequences. Boundaries reduce how much surrounding code they need to load into their head. Reviewer agents can help surface issues, but their approvals do not replace evidence. Escalate uncertainty to a human who understands the affected system.

## 8. Measures that help

12.0–13.5 minutes

Time to validated outcome
Escaped defects
Customer results
Maintenance burden

Raw commits and lines of code count activity, which generation makes easier to inflate. Use several measures together and examine the stories behind them. Faster cycle time can coexist with more defects or growing maintenance costs. Avoid individual rankings that reward gaming. The goal is understanding whether the team delivers useful changes and can continue supporting them.

## 9. Knowing when to stop

13.5–15.0 minutes

What should exist?
Does it work?
Is it worth maintaining?

Return to the opening thought experiment. More available implementations make selection and validation more valuable, but they do not force us to accept more code. Sometimes the best decision is a smaller change or no change. Close with the user’s central argument: knowing what should be built, whether it works and when not to build it are expensive skills worth developing.

