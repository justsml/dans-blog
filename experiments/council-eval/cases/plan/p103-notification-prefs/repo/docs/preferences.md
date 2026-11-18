# Delivery preferences
Absent preferences use the defaults exported by store.ts: email and push enabled, SMS disabled. A setting changes only its named channel. Persisted v1 booleans represent all three channels and must retain their meaning when the first channel setting is written.

Company/user pairs are independent identities, including when an account appears in multiple companies. Security-category messages bypass marketing preferences, even legacy opt-outs, because the identity service relies on them for account recovery. setEnabled remains the bulk opt-in/out API and previewBody remains the 160-character preview API.
