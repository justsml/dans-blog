export interface Session {
  token: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
  absoluteExpiresAt: number;
  revokedAt?: number;
}
export class SessionStore {
  private rows = new Map<string, Session>();
  create(token: string, userId: string, now: number, idleMs: number, lifetimeMs: number): Session {
    if (this.rows.has(token)) throw new Error("duplicate token");
    if (idleMs <= 0 || lifetimeMs <= 0) throw new Error("invalid lifetime");
    const session: Session = {
      token,
      userId,
      createdAt: now,
      expiresAt: now + Math.min(idleMs, lifetimeMs),
      absoluteExpiresAt: now + lifetimeMs,
    };
    this.rows.set(token, session);
    return { ...session };
  }
  get(token: string): Session | undefined {
    const session = this.rows.get(token);
    return session && { ...session };
  }
  // Updates run synchronously so revocation and renewal cannot interleave.
  update(token: string, change: (session: Session) => void): Session | undefined {
    const session = this.rows.get(token);
    if (!session) return;
    change(session);
    return { ...session };
  }
  revoke(token: string, now: number): void {
    this.update(token, session => { session.revokedAt = now; });
  }
  prune(now: number): number {
    let removed = 0;
    for (const [token, session] of this.rows) {
      if (session.expiresAt <= now || session.revokedAt !== undefined) {
        this.rows.delete(token);
        removed++;
      }
    }
    return removed;
  }
}
