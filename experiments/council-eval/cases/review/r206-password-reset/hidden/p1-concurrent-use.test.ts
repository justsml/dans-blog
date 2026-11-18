import { expect, test } from "bun:test";
import { ResetError, ResetStore, UserStore, requestReset, resetPassword } from "../src";

function setup(hashDelayMs = 0) {
  const users = new UserStore();
  users.add({ id: "u1", email: "ada@example.com", passwordHash: "old" });
  users.add({ id: "u2", email: "grace@example.com", passwordHash: "old" });
  const links: { to: string; token: string }[] = [];
  const deps = {
    users,
    resets: new ResetStore(),
    mailer: {
      sendResetLink: async (to: string, link: string) => {
        links.push({ to, token: new URL(link).searchParams.get("token")! });
      },
    },
    hasher: {
      hash: async (pw: string) => {
        if (hashDelayMs) await new Promise((r) => setTimeout(r, hashDelayMs));
        return `hashed:${pw}`;
      },
    },
    baseUrl: "https://app.example.com",
  };
  return { deps, users, links };
}

test("two simultaneous submissions of one link: exactly one succeeds", async () => {
  const { deps, users, links } = setup(15);
  await requestReset(deps, "ada@example.com", 0);
  const token = links[0].token;

  const results = await Promise.allSettled([
    resetPassword(deps, token, "first long passphrase", 1_000),
    resetPassword(deps, token, "second long passphrase", 1_000),
  ]);
  const ok = results.filter((r) => r.status === "fulfilled");
  const failed = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  expect(ok).toHaveLength(1);
  expect(failed).toHaveLength(1);
  expect(failed[0].reason).toBeInstanceOf(ResetError);

  const winner = results[0].status === "fulfilled" ? "first long passphrase" : "second long passphrase";
  expect(users.get("u1")?.passwordHash).toBe(`hashed:${winner}`);
});
