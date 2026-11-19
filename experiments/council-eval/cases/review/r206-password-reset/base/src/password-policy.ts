export class PasswordPolicyError extends Error {}

export const MIN_PASSWORD_LENGTH = 12;

export function checkPassword(password: string) {
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new PasswordPolicyError(`use at least ${MIN_PASSWORD_LENGTH} characters`);
  }
  if (password.length > 256) throw new PasswordPolicyError("use at most 256 characters");
  if (/^(.)\1*$/.test(password)) throw new PasswordPolicyError("use more than one distinct character");
}
