import { directive } from "./logic";
let stats = {
  requests: 0,
  active: 0,
  completed: 0,
  failed: 0,
  client_disconnects: 0,
};
Bun.serve({
  port: 3000,
  idleTimeout: 120,
  async fetch(req) {
    const path = new URL(req.url).pathname;
    if (path === "/health") return new Response("ok");
    if (path === "/__stats") return Response.json(stats);
    if (path === "/__reset") {
      if (stats.active) return new Response("busy", { status: 409 });
      stats = {
        requests: 0,
        active: 0,
        completed: 0,
        failed: 0,
        client_disconnects: 0,
      };
      return Response.json(stats);
    }
    if (path !== "/v1/chat/completions" || req.method !== "POST")
      return new Response("", { status: 404 });
    const body = (await req.json()) as any;
    const content = body.messages.at(-1).content as string;
    const block = content.match(/\[\[llm ([^\]]+)\]\]/)?.[1] ?? "";
    const config = {
      ...directive(content),
      eofAfter: Math.min(10000, Number(block.match(/eof_after=(\d+)/)?.[1] ?? 10000)),
      unicode: /(?:^| )unicode=1(?: |$)/.test(block),
    };
    stats.requests++;
    stats.active++;
    let stopped = false;
    const finish = (kind: "completed" | "failed" | "client_disconnects") => {
      if (stopped) return;
      stopped = true;
      stats.active--;
      stats[kind]++;
    };
    req.signal.addEventListener("abort", () => finish("client_disconnects"));
    return new Response(
      new ReadableStream({
        async start(c) {
          try {
            for (let i = 0; i < config.tokens; i++) {
              await Bun.sleep(config.delay);
              if (stopped) return;
              if (i >= config.eofAfter) {
                finish("failed");
                c.close();
                return;
              }
              if (i >= config.failAfter) {
                c.enqueue(
                  new TextEncoder().encode(
                    'data: {"error":{"message":"provider unavailable"}}\n\n',
                  ),
                );
                finish("failed");
                c.close();
                return;
              }
              const bytes = new TextEncoder().encode(
                `data: ${JSON.stringify({ choices: [{ delta: { content: config.unicode ? `段${i} 🌍 e\u0301\n` : `t${i} ` } }] })}\n\n`,
              );
              if (config.unicode) {
                for (let offset = 0; offset < bytes.length; offset += 7) {
                  c.enqueue(bytes.slice(offset, offset + 7));
                  await Bun.sleep(1);
                  if (stopped) return;
                }
              } else c.enqueue(bytes);
            }
            if (!stopped) {
              c.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
              finish("completed");
              c.close();
            }
          } catch {
            finish("client_disconnects");
          }
        },
        cancel() {
          finish("client_disconnects");
        },
      }),
      { headers: { "Content-Type": "text/event-stream" } },
    );
  },
});
