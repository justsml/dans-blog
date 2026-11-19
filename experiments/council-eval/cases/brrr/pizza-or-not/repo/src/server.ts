import { inspect } from "./inspector";

// POST /inspect     body: one image (raw bytes)      -> ruling JSON
// POST /bulk        body: JSON { urls: string[] }     -> rulings, in order
Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  idleTimeout: 255,
  async fetch(req) {
    const url = new URL(req.url);
    if (req.method === "POST" && url.pathname === "/inspect") {
      const bytes = new Uint8Array(await req.arrayBuffer());
      if (!bytes.length) return Response.json({ error: "no image" }, { status: 400 });
      try {
        return Response.json(await inspect(bytes));
      } catch (e) {
        return Response.json({ error: String(e) }, { status: 502 });
      }
    }
    if (req.method === "POST" && url.pathname === "/bulk") {
      const { urls } = (await req.json()) as { urls: string[] };
      const rulings = [];
      for (const u of urls) {
        const bytes = new Uint8Array(await (await fetch(u)).arrayBuffer());
        rulings.push(await inspect(bytes).catch((e) => ({ error: String(e) })));
      }
      return Response.json({ rulings });
    }
    return new Response("Bureau of Pizza Determination. POST /inspect with one image.", { status: 404 });
  },
});
