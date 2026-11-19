# ADR 0002: API key format and storage

Status: accepted

- A key looks like `sk_live_<32 base62 chars>` or `sk_test_<32 base62 chars>`. The
  environment in the prefix decides which data the key can reach, so a key never
  changes environment.
- We store only the SHA-256 hash of the key, plus a display hint (`sk_live_` and the
  first four random characters). The full key is shown to the customer exactly once,
  when it is created, and never written anywhere else: not the database, not logs,
  not the audit trail.
- Lookup is by hash, so checking a key is one indexed read.
