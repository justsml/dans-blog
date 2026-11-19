# Operations

Deploys are rolling. Any app replica can be stopped at any moment. Clients
reconnect through the balancer. Nginx distributes connections across the two
app replicas without sticky sessions. Postgres holds application records;
Redis holds rate counters. Service health checks gate startup readiness.

The Stop button closes the current request. On-call can inspect provider
active and client_disconnects counters to confirm the request has ended.
