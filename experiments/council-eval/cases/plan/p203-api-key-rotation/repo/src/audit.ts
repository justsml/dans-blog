export type AuditEventType = "key.created" | "key.revoked" | "key.rotated";

export interface AuditEvent {
  type: AuditEventType;
  accountId: string;
  keyId: string;
  at: number;
  /** Extra context, e.g. the key that replaced this one. Never secrets. */
  detail?: Record<string, string>;
}

export class AuditLog {
  readonly events: AuditEvent[] = [];

  record(event: AuditEvent) {
    this.events.push({ ...event });
  }

  forAccount(accountId: string): AuditEvent[] {
    return this.events.filter((e) => e.accountId === accountId);
  }
}
