# Invoice ledger
Numbers begin at 1 independently for each company. Imported issued and void records already have numbers; both reserve their numbers permanently. Reissuing an issued invoice returns its current number. Issuance must serialize per company, and a failed save must not consume a number. The caller's company owns the invoice; foreign and void invoices cannot be issued.
