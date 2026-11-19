# Ground carrier rate card (summary)

Our contract with the carrier, condensed. Prices per zone live in `data/rates.json`.

## Billable weight

The carrier bills on whichever is greater:

- the actual weight of the parcel, or
- its dimensional weight: length × width × height in cm, divided by 5000, in kg.

Billable weight is then rounded **up** to the next 0.5 kg. A 1.01 kg parcel bills as
1.5 kg.

## Price

- `baseCents` covers the first 0.5 kg of billable weight.
- Each further 0.5 kg adds `perHalfKgCents`.
- A fuel surcharge (`fuelSurchargePercent`) is added on top of that transport
  charge. The carrier changes it monthly.

## Limits

The carrier refuses parcels heavier than 30 kg actual weight or with any side longer
than 150 cm. We have to catch these before the label is bought.
