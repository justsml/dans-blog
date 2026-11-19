export interface User {
  id: string;
  email: string;
  passwordHash: string;
}

export interface PasswordHasher {
  hash(password: string): Promise<string>;
}

export const bunHasher: PasswordHasher = {
  hash: (password) => Bun.password.hash(password, { algorithm: "argon2id" }),
};

export class UserStore {
  private users = new Map<string, User>();
  private sessions = new Map<string, Set<string>>();

  add(user: User) {
    this.users.set(user.id, { ...user, email: user.email.toLowerCase() });
  }

  get(id: string): User | undefined {
    return this.users.get(id);
  }

  byEmail(email: string): User | undefined {
    for (const u of this.users.values()) if (u.email === email) return u;
    return undefined;
  }

  setPasswordHash(userId: string, passwordHash: string) {
    const user = this.users.get(userId);
    if (user) user.passwordHash = passwordHash;
  }

  startSession(userId: string, sessionId: string) {
    const set = this.sessions.get(userId) ?? new Set();
    set.add(sessionId);
    this.sessions.set(userId, set);
  }

  activeSessions(userId: string): string[] {
    return [...(this.sessions.get(userId) ?? [])];
  }

  /** Signs the user out everywhere. */
  revokeSessions(userId: string) {
    this.sessions.delete(userId);
  }
}
