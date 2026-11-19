# Operations

Deploys are rolling. Any app replica can be stopped at any moment. Clients
reconnect through the balancer. Nginx distributes connections across the two
app replicas without sticky sessions. Postgres holds application records;
Redis holds rate counters. Service health checks gate startup readiness.

The Stop button closes the current request. On-call can inspect provider
active and client_disconnects counters to confirm the request has ended.

Message history is also read by our support dashboard while replies are running.
It displays the persisted prefix, not a separate provider buffer. Once a client
has received a token, a subsequent history read must include that token. Terminal
records and their timestamps are immutable; repeated Stop requests are harmless.
Only assistant messages have a generation lifecycle. Stop on a user message is
rejected with 409 and leaves the conversation unchanged.

Reconnect cursors are nonnegative safe integers in decimal notation. Invalid
cursors return 400 before opening SSE. A supplied query cursor overrides the
header even when invalid. At or beyond the last event of a terminal message,
the response closes without events. GET never creates or changes a generation.

Provider connections can close cleanly without the completion sentinel during
upstream deploys. Such replies are incomplete and must end in error, retaining
the received prefix. International replies include emoji, combining marks and
line breaks; network reads do not align with UTF-8 characters or SSE frames.
