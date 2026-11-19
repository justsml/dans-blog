import { test, expect } from "bun:test";
import {
  api,
  reset,
  start,
  stats,
  terminal,
  Reader,
  attach,
  text,
  full,
  ordered,
  done,
  messages,
  compose,
  until,
} from "./http";
test("R10: legacy", async () => {
  await reset();
  const created = await api("/api/chats", {
    method: "POST",
    body: JSON.stringify({ title: "Historical" }),
  });
  const chat = ((await created.json()) as any).id;
  const id = crypto.randomUUID();
  await compose([
    "exec",
    "-T",
    "postgres",
    "psql",
    "-U",
    "chat",
    "-d",
    "chat",
    "-c",
    `INSERT INTO messages(id,chat_id,role,content,status) VALUES ('${id}','${chat}','assistant','Earlier answer','complete')`,
  ]);
  const rows = await messages(chat);
  expect(rows).toHaveLength(1);
  expect(Object.keys(rows[0]).sort()).toEqual(
    [
      "id",
      "chatId",
      "role",
      "content",
      "status",
      "createdAt",
      "updatedAt",
    ].sort(),
  );
  expect(rows[0]).toMatchObject({
    id,
    chatId: chat,
    role: "assistant",
    content: "Earlier answer",
    status: "complete",
  });
  expect(Number.isFinite(Date.parse(rows[0].createdAt))).toBe(true);
  expect(Number.isFinite(Date.parse(rows[0].updatedAt))).toBe(true);
}, 55000);
