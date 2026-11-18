# ADR 0002: Money is integer cents

Status: accepted

All amounts are integer cents in a `number`. Never store or return fractional cents.
When a calculation produces a fraction (percentages, splits), round the amount we take
off the customer's bill **down** to the cent, so we never discount more than promised,
and round nothing else.
