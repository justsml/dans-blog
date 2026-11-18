# ADR 0003: Rounding money

Status: accepted

Amounts are integer cents. When a percentage produces a fraction of a cent
(surcharges, tax), round to the nearest cent with halves going up, the same way the
carrier and our tax provider do, so our totals match their invoices to the cent.
Never carry fractional cents between steps; round once, at the end of the
calculation that produced the fraction.
