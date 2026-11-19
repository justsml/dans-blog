import { expect, test } from "bun:test";
import { PasswordPolicyError, ResetStore, UserStore, requestReset, resetPassword } from "../src";

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

test("a rejected password does not use up the link", async () => {
  const { deps, users, links } = setup();
  await requestReset(deps, "ada@example.com", 0);
  const token = links[0].token;

  await expect(resetPassword(deps, token, "aaaaaaaaaaaaaaaa", 1_000)).rejects.toThrow(PasswordPolicyError);
  await resetPassword(deps, token, "a much better passphrase", 2_000);
  expect(users.get("u1")?.passwordHash).toBe("hashed:a much better passphrase");
});

test("a failing hasher does not use up the link", async () => {
  const { deps, users, links } = setup();
  await requestReset(deps, "ada@example.com", 0);
  const token = links[0].token;
  const real = deps.hasher.hash;
  deps.hasher.hash = async () => {
    throw new Error("out of memory");
  };
  await expect(resetPassword(deps, token, "a much better passphrase", 1_000)).rejects.toThrow("out of memory");
  deps.hasher.hash = real;
  await resetPassword(deps, token, "a much better passphrase", 2_000);
  expect(users.get("u1")?.passwordHash).toBe("hashed:a much better passphrase");
});
