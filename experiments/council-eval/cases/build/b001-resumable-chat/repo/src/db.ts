import { SQL, RedisClient } from "bun";
export const sql = new SQL(process.env.DATABASE_URL!);
export const redis = new RedisClient(process.env.REDIS_URL!);
const setup = await sql.reserve();
await setup`SELECT pg_advisory_lock(782341)`;
try {
  await setup`CREATE TABLE IF NOT EXISTS users (id text PRIMARY KEY, token text UNIQUE NOT NULL)`;
  await setup`CREATE TABLE IF NOT EXISTS chats (id text PRIMARY KEY, user_id text NOT NULL REFERENCES users(id), title text NOT NULL, created_at timestamptz NOT NULL DEFAULT now())`;
  await setup`CREATE TABLE IF NOT EXISTS messages (id text PRIMARY KEY, chat_id text NOT NULL REFERENCES chats(id), role text NOT NULL, content text NOT NULL DEFAULT '', status text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`;
  await setup`INSERT INTO users VALUES ('alice','alice-token'),('bob','bob-token') ON CONFLICT DO NOTHING`;
} finally {
  await setup`SELECT pg_advisory_unlock(782341)`;
  setup.release();
}
export async function user(req: Request) {
  const token = req.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  return (await sql`SELECT id FROM users WHERE token=${token}`)[0]?.id as
    string | undefined;
}
export async function ownedChat(id: string, userId: string) {
  return (
    await sql`SELECT * FROM chats WHERE id=${id} AND user_id=${userId}`
  )[0];
}
export async function ownedMessage(id: string, userId: string) {
  return (
    await sql`SELECT m.* FROM messages m JOIN chats c ON c.id=m.chat_id WHERE m.id=${id} AND c.user_id=${userId}`
  )[0];
}
export function message(row: any) {
  return {
    id: row.id,
    chatId: row.chat_id,
    role: row.role,
    content: row.content,
    status: row.status,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}
