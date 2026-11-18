import { createHash, randomBytes } from "node:crypto";

/** 256 bits of randomness, URL-safe. This is what goes in the emailed link. */
export function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

/** Only the hash is stored, so a leaked table cannot be used to reset anyone's password. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
