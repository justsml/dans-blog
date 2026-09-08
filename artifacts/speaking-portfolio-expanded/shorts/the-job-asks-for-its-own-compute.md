# Compute, Please (and a Receipt)

6 min · lightning · parent: [Compute, Please (and a Receipt)](../talks/dynamic-scaling/index.md), slides 2, 3

For twenty years ops guessed a fleet size for everyone. The workload never got a say. Now it does.

## Hook (0:00)

Horizontal: more boxes, decided by ops. Vertical: bigger box, decided by ops. An autoscaler watching CPU and guessing. Meanwhile the orchestrator *knows* this batch is mostly waiting on a provider, that this one needs a GPU for ninety seconds, that this one is untrusted code and wants a sandbox. Nobody asked it.

## Beat: the inversion (1:00)

The job asks for compute the way it asks for a tool. Eight sandboxes, six minutes, this region, this cost cap. A scheduler resolves that against a catalog of approved classes and the tenant's budget, and returns a lease with a teardown.

## Beat: what you get (2:00)

Per-job economics. A customer can buy a faster turnaround. Finance can cap one workflow instead of one environment. Nobody pays for a warm fleet sized for the worst Tuesday of the year. And short lifetimes help limit exposure: an instance that lives six minutes, reaches three domains and holds one scoped credential limits the reach of a confused agent.

## Beat: the substrate already exists (3:00)

Fly.io Sprites: hardware-isolated VMs, with a stated creation target under a second, egress policy set from outside so the agent can't loosen it. Depot sandboxes: per-second billing for exactly this. Modal for functions and GPUs that scale to zero; Vast.ai for a cheap spare GPU. Cloudflare Durable Objects and Workflows for the state that survives everything else being torn down. EC2 Spot is the old version of the same idea. Different billing and isolation contracts; the scheduler must enforce lifetime and network policy. What none of them give you is the ledger. That's still yours.

## Beat: what you risk (4:15)

An agent that can provision is an agent that can spend. The catalog, the lease and the teardown are the answer, enforced outside the model. The agent chooses. It does not grant.

## Landing (5:15)

Contrast one autoscaler threshold with one job request. Ask which one you could put on an invoice.

## On screen

Left: `replicas: 12` set in a YAML file in 2023. Right: `{ shape: sandbox, n: 8, ttl: 6m, cap: $1.50 }` at job start. Caption: *which one is a product?*

## Scope

Vendors named were checked 2026-09-08; recheck before delivery. Prices and job counts are fixtures.
