# api-keys

Issues and checks the secret API keys customers use to call our API.

- `src/keys.ts`: creating, checking, and revoking keys.
- `src/audit.ts`: the audit trail. Every change to a key's lifecycle must be recorded
  there; the security team alerts on it and customers can export it.
- `src/config.ts`: limits and windows agreed in the API terms.
- `docs/adr/0002-api-key-storage.md`: how keys are generated and stored.
