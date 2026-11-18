import { SessionStore, type Session } from "./sessions";
export class SessionError extends Error {}
export function assertActive(session: Session | undefined, now: number): asserts session is Session {
  if (!session) throw new SessionError("unknown session");
  if (session.revokedAt !== undefined) throw new SessionError("revoked session");
  if (now >= session.expiresAt || now >= session.absoluteExpiresAt) {
    throw new SessionError("expired session");
  }
}
export function authenticate(store: SessionStore, token: string, now: number): string {
  const session = store.get(token);
  assertActive(session, now);
  return session.userId;
}
export function signOut(store: SessionStore, token: string, now: number): void {
  store.revoke(token, now);
}
export function sessionView(store: SessionStore, token: string, now: number) {
  const session = store.get(token);
  assertActive(session, now);
  return {
    userId: session.userId,
    expiresAt: session.expiresAt,
    createdAt: session.createdAt,
  };
}
