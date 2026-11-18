# ADR 0004: Rounding prorated amounts

Status: accepted

Prorated amounts are almost never whole cents. Support spent weeks on tickets about
one-cent discrepancies, so we settled it: **rounding always favours the customer.**

- An amount we charge is rounded down to the cent.
- A credit we give is rounded up to the cent.

Apply the rounding to the final prorated amount, not to intermediate values.
