# Agreeable to a Fault (κ = 0)

2 min · video · parent: [Stop Looking at My Benchmarks](../talks/benchmarks/outline-40min.md), slide 9

90% agreement with the experts. Zero information. Here's how.

## Hook

A hundred cases. Experts pass ninety, fail ten. Your judge passes everything. Agreement: 90%. Ship it?

## Beat: kappa

Cohen's kappa compares observed agreement with what you'd get from the marginal rates alone. Observed: 0.9. Expected by chance: 0.9. (0.9 − 0.9)/(1 − 0.9) = 0. Your judge agrees with the experts the way a broken clock agrees with lunch. It's a button that says yes, and you've measured how often the world happens to be yes.

## Beat: don't over-correct

Kappa moves with prevalence too, so don't replace faith in raw agreement with faith in a kappa threshold. Keep the confusion matrix. Go look at the ten failures the judge missed; that's where the rubric was actually wrong, or the experts disagreed with each other and nobody wrote down why.

## Landing

Agreement is not evidence when the base rate does the work. Show the matrix, not the percentage.

## On screen

2×2 matrix: 90 / 10 across the top, 100 / 0 down the judge column. **κ = 0**.

## Source

Cohen (1960), A Coefficient of Agreement for Nominal Scales. Feinstein and Cicchetti (1990), High agreement but low kappa.
