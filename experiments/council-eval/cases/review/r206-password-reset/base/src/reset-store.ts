export interface ResetRecord {
  tokenHash: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
}

/** `password_resets` table. Keyed by token hash; plaintext tokens are never stored. */
export class ResetStore {
  private rows = new Map<string, ResetRecord>();

  add(record: ResetRecord) {
    this.rows.set(record.tokenHash, { ...record });
  }

  find(tokenHash: string): ResetRecord | undefined {
    const row = this.rows.get(tokenHash);
    return row && { ...row };
  }

  forUser(userId: string): ResetRecord[] {
    return [...this.rows.values()].filter((r) => r.userId === userId).map((r) => ({ ...r }));
  }
}
