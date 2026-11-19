import { sql, redis, user, ownedChat, ownedMessage, message } from "./db";
import { reply } from "./replies";
const replica = process.env.HOSTNAME ?? "local";
async function route(req: Request) {
  const path = new URL(req.url).pathname;
  if (path === "/health") {
    await sql`SELECT 1`;
    await redis.send("PING", []);
    return new Response("ok");
  }
  if (path === "/") return new Response(Bun.file("public/index.html"));
  const userId = await user(req);
  if (!userId) return new Response("Unauthorized", { status: 401 });
  if (path === "/api/chats" && req.method === "GET") {
    return Response.json({
      chats:
        await sql`SELECT id,title FROM chats WHERE user_id=${userId} ORDER BY created_at,id`,
    });
  }
  if (path === "/api/chats" && req.method === "POST") {
    const { title = "New chat" } = (await req.json()) as any;
    const id = crypto.randomUUID();
    await sql`INSERT INTO chats (id,user_id,title) VALUES (${id},${userId},${title})`;
    return Response.json({ id, title }, { status: 201 });
  }
  const messages = path.match(/^\/api\/chats\/([^/]+)\/messages$/);
  if (messages) {
    if (!(await ownedChat(messages[1], userId)))
      return new Response("", { status: 404 });
    if (req.method === "GET") {
      const rows =
        await sql`SELECT * FROM messages WHERE chat_id=${messages[1]} ORDER BY created_at,id`;
      return Response.json({ messages: rows.map(message) });
    }
    if (req.method === "POST") {
      const { content } = (await req.json()) as any;
      if (
        typeof content !== "string" ||
        !content.trim() ||
        content.length > 20000
      )
        return new Response("Invalid content", { status: 400 });
      const key = `rate:${userId}:${Math.floor(Date.now() / 60000)}`;
      const count = Number(await redis.send("INCR", [key]));
      await redis.send("EXPIRE", [key, "120"]);
      if (count > 120) return new Response("Rate limit", { status: 429 });
      const id = crypto.randomUUID();
      await sql.begin(async (tx) => {
        await tx`INSERT INTO messages (id,chat_id,role,content,status) VALUES (${crypto.randomUUID()},${messages[1]},'user',${content},'complete')`;
        await tx`INSERT INTO messages (id,chat_id,role,status) VALUES (${id},${messages[1]},'assistant','streaming')`;
      });
      return reply(req, id, content);
    }
  }
  return new Response("Not found", { status: 404 });
}
Bun.serve({
  port: 3000,
  idleTimeout: 120,
  async fetch(req) {
    try {
      const response = await route(req);
      response.headers.set("X-Replica", replica);
      return response;
    } catch (error) {
      console.error(error);
      return new Response("Service unavailable", {
        status: 500,
        headers: { "X-Replica": replica },
      });
    }
  },
});
