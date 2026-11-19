import { checkPassword } from "./password-policy";
import type { ResetStore } from "./reset-store";
import { generateToken, hashToken } from "./tokens";
import type { PasswordHasher, UserStore } from "./users";

export const RESET_TTL_MS = 30 * 60 * 1000;

export class ResetError extends Error {}

export interface Mailer {
  sendResetLink(to: string, link: string): Promise<void>;
}

export interface ResetDeps {
  users: UserStore;
  resets: ResetStore;
  mailer: Mailer;
  hasher: PasswordHasher;
  baseUrl: string;
}

const INVALID_LINK = "this reset link is invalid or has expired";

/** Responds the same way whether or not the address has an account. */
export async function requestReset(deps: ResetDeps, email: string, now = Date.now()): Promise<void> {
  const user = deps.users.byEmail(email.trim().toLowerCase());
  if (!user) return;
  const token = generateToken();
  deps.resets.add({ tokenHash: hashToken(token), userId: user.id, createdAt: now, expiresAt: now + RESET_TTL_MS });
  await deps.mailer.sendResetLink(user.email, `${deps.baseUrl}/reset?token=${token}`);
}

export async function resetPassword(deps: ResetDeps, token: string, newPassword: string, now = Date.now()): Promise<void> {
  const record = deps.resets.find(hashToken(token));
  if (!record || record.expiresAt <= now) throw new ResetError(INVALID_LINK);
  checkPassword(newPassword);

  const passwordHash = await deps.hasher.hash(newPassword);
  deps.users.setPasswordHash(record.userId, passwordHash);
  deps.users.revokeSessions(record.userId);
}
