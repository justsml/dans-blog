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

test("using a link leaves other users' links working", async () => {
  const { deps, users, links } = setup();
  await requestReset(deps, "ada@example.com", 0);
  await requestReset(deps, "grace@example.com", 0);
  const ada = links.find((l) => l.to === "ada@example.com")!.token;
  const grace = links.find((l) => l.to === "grace@example.com")!.token;

  await resetPassword(deps, ada, "ada's new passphrase", 1_000);
  await resetPassword(deps, grace, "grace's new passphrase", 1_000);
  expect(users.get("u1")?.passwordHash).toBe("hashed:ada's new passphrase");
  expect(users.get("u2")?.passwordHash).toBe("hashed:grace's new passphrase");
});

test("a link requested after a reset still works", async () => {
  const { deps, users, links } = setup();
  await requestReset(deps, "ada@example.com", 0);
  await resetPassword(deps, links[0].token, "first long passphrase", 1_000);
  await requestReset(deps, "ada@example.com", 5_000);
  await resetPassword(deps, links[1].token, "second long passphrase", 6_000);
  expect(users.get("u1")?.passwordHash).toBe("hashed:second long passphrase");
});

test("used, expired, and made-up links all fail the same way", async () => {
  const { deps, links } = setup();
  await requestReset(deps, "ada@example.com", 0);
  const token = links[0].token;
  await resetPassword(deps, token, "first long passphrase", 1_000);
  const errors = await Promise.all([
    resetPassword(deps, token, "second long passphrase", 2_000).catch((e) => e),
    resetPassword(deps, "made-up-token", "second long passphrase", 2_000).catch((e) => e),
  ]);
  await requestReset(deps, "ada@example.com", 10_000);
  errors.push(await resetPassword(deps, links[1].token, "third long passphrase", 10_000 + 31 * 60_000).catch((e) => e));
  for (const e of errors) expect(e).toBeInstanceOf(ResetError);
  expect(new Set(errors.map((e) => e.message)).size).toBe(1);
});
