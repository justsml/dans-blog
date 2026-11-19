import { WindowStore, defaultPolicy } from "./store";
export interface Decision {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}
export class RateLimiter {
  constructor(private store = new WindowStore()) {}
  check(tenant: string, now: number): Decision {
    const policy = defaultPolicy;
    let row = this.store.read(tenant);
    if (!row || row.resetsAt <= now) {
      row = { used: 0, resetsAt: now + policy.windowMs };
    }
    const allowed = row.used < policy.requests;
    if (allowed) row.used++;
    this.store.write(tenant, row);
    return {
      allowed,
      remaining: Math.max(0, policy.requests - row.used),
      resetAt: row.resetsAt,
    };
  }
}
