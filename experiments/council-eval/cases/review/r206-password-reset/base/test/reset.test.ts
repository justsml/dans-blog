import { expect, test } from "bun:test";
import { PasswordPolicyError, ResetError, ResetStore, UserStore, requestReset, resetPassword } from "../src";

function setup() {
  const users = new UserStore();
  users.add({ id: "u1", email: "Ada@Example.com", passwordHash: "old" });
  const links: string[] = [];
  const deps = {
    users,
    resets: new ResetStore(),
    mailer: { sendResetLink: async (_to: string, link: string) => void links.push(link) },
    hasher: { hash: async (pw: string) => `hashed:${pw}` },
    baseUrl: "https://app.example.com",
  };
  const tokenFrom = (link: string) => new URL(link).searchParams.get("token")!;
  return { deps, users, links, tokenFrom };
}

test("a reset link sets the new password and signs out other sessions", async () => {
  const { deps, users, links, tokenFrom } = setup();
  users.startSession("u1", "s1");
  await requestReset(deps, " ada@example.com ", 0);
  await resetPassword(deps, tokenFrom(links[0]), "correct horse battery", 1_000);
  expect(users.get("u1")?.passwordHash).toBe("hashed:correct horse battery");
  expect(users.activeSessions("u1")).toEqual([]);
});

test("unknown addresses get no email and no error", async () => {
  const { deps, links } = setup();
  await requestReset(deps, "nobody@example.com", 0);
  expect(links).toEqual([]);
});

test("expired links are rejected", async () => {
  const { deps, links, tokenFrom } = setup();
  await requestReset(deps, "ada@example.com", 0);
  await expect(resetPassword(deps, tokenFrom(links[0]), "correct horse battery", 30 * 60 * 1000)).rejects.toThrow(ResetError);
});

test("weak passwords are rejected", async () => {
  const { deps, links, tokenFrom } = setup();
  await requestReset(deps, "ada@example.com", 0);
  await expect(resetPassword(deps, tokenFrom(links[0]), "short", 1_000)).rejects.toThrow(PasswordPolicyError);
});

test("only the token hash is stored", async () => {
  const { deps, links, tokenFrom } = setup();
  await requestReset(deps, "ada@example.com", 0);
  const token = tokenFrom(links[0]);
  expect(deps.resets.find(token)).toBeUndefined();
  expect(JSON.stringify(deps.resets.forUser("u1"))).not.toContain(token);
});
