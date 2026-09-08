# 200 OK (Nothing Is)

2 min · video · parent: [Conjure Exactly Enough](../talks/adaptive-systems/index.md), slide 1

HTTP 200 is not a contract. It is a vendor saying "I answered," which is a different thing from "I answered the question you were asking."

## Hook

Yesterday: `zip`. Today: `postal_code`. The API returns 200. Auth works. The vendor's status page is green. Your ingest has been dead since 3am and the first system to notice was a customer.

## Beat: why nothing caught it

Every monitor you have watches transport. Latency, status codes, error rate. The payload changed *meaning* and every one of them stayed green, because none of them read the payload. Schema validation would have caught the shape. Nothing caught the semantics, and a postal code that drops its leading zero is still a string.

## Beat: the boring baseline

The honest fix is boring: diff the schema, alert, and have a human replay after coffee. It costs a morning per surprise, and the fixture's 882 unaffected records out of 900 sit behind the broken ones the whole time. That is the bar anything smarter has to beat, on time to recover and on false repairs.

## Landing

If your integration can break while every dashboard is green, the dashboard is measuring the wrong layer. Put one check on meaning: a fixture that fails when a field goes missing, not when the server does.

## On screen

`{ zip: "02108" }` → `{ postal_code: "02108" }` → `200 OK` → ingest: 0 rows/min. Status page: green dot.

## Story slot

The rename you actually lived through. Field name, the hour you noticed, what it cost.
