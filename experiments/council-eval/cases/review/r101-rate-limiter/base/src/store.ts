export interface Window { used: number; resetsAt: number }
export interface Policy { requests: number; windowMs: number }
export interface GatewayRequest {
  tenantId: string;
  route: string;
  authenticated: boolean;
}
export class WindowStore {
  private rows = new Map<string, Window>();
  read(key: string): Window | undefined {
    const row = this.rows.get(key);
    return row && { ...row };
  }
  write(key: string, row: Window): void {
    this.rows.set(key, { ...row });
  }
  remove(key: string): void {
    this.rows.delete(key);
  }
  sweep(now: number): number {
    let removed = 0;
    for (const [key, row] of this.rows) {
      if (row.resetsAt <= now) {
        this.rows.delete(key);
        removed++;
      }
    }
    return removed;
  }
  size(): number {
    return this.rows.size;
  }
}
export const defaultPolicy: Policy = { requests: 100, windowMs: 60_000 };
export function validatePolicy(policy: Policy): void {
  if (!Number.isInteger(policy.requests) || policy.requests < 0) {
    throw new Error("requests must be a nonnegative integer");
  }
  if (!Number.isInteger(policy.windowMs) || policy.windowMs < 1) {
    throw new Error("windowMs must be a positive integer");
  }
}
// A zero quota is used for tenants suspended by the billing service.
export const billingPolicies = new Map<string, Policy>();
export function gatewayKey(request: GatewayRequest): string {
  if (!request.authenticated) throw new Error("authentication required");
  return request.tenantId;
}
