import { sql } from "./db";
import { frame, sse } from "./logic";
export async function reply(req: Request, id: string, content: string) {
  const abort = new AbortController();
  req.signal.addEventListener("abort", () => abort.abort());
  const upstream = await fetch(`${process.env.LLM_URL}/v1/chat/completions`, {
    method: "POST",
    signal: abort.signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "team-chat",
      stream: true,
      messages: [{ role: "user", content }],
    }),
  });
  let text = "";
  return new Response(
    new ReadableStream({
      async start(c) {
        try {
          for await (const data of sse(upstream.body!)) {
            if (data === "[DONE]") break;
            const chunk = JSON.parse(data);
            if (chunk.error) throw new Error(chunk.error.message);
            const token = chunk.choices[0].delta.content ?? "";
            text += token;
            c.enqueue(
              new TextEncoder().encode(frame("token", { text: token })),
            );
          }
          await sql`UPDATE messages SET content=${text},status='complete',updated_at=now() WHERE id=${id}`;
          c.enqueue(
            new TextEncoder().encode(frame("done", { status: "complete" })),
          );
          c.close();
        } catch {
          try {
            c.enqueue(
              new TextEncoder().encode(frame("error", { status: "error" })),
            );
            c.close();
          } catch {}
        }
      },
      cancel() {
        abort.abort();
      },
    }),
    { headers: { "Content-Type": "text/event-stream", "X-Message-Id": id } },
  );
}
