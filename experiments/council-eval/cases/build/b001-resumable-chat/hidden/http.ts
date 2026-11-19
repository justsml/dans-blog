import { expect } from "bun:test";
export const base = process.env.CHAT_BASE_URL!;
export const llm = process.env.FAKE_LLM_URL!;
export const auth = (who = "alice") => ({
  Authorization: `Bearer ${who}-token`,
  "Content-Type": "application/json",
});
export async function api(path: string, init: RequestInit = {}, who = "alice") {
  return fetch(base + path, {
    ...init,
    headers: { ...auth(who), ...init.headers },
    signal: init.signal ?? AbortSignal.timeout(35000),
  });
}
export async function stats() {
  return (await fetch(llm + "/__stats")).json() as Promise<any>;
}
export async function reset() {
  await until(async () => (await stats()).active === 0, 12000);
  expect((await fetch(llm + "/__reset", { method: "POST" })).ok).toBe(true);
}
export async function until(fn: () => Promise<any>, ms = 12000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    const value = await fn();
    if (value) return value;
    await Bun.sleep(80);
  }
  throw new Error("Timed out waiting for observable state");
}
export async function start(tokens = 100, delay = 8, fail?: number) {
  const r = await api("/api/chats", {
    method: "POST",
    body: JSON.stringify({ title: crypto.randomUUID() }),
  });
  expect(r.status).toBe(201);
  const chat = ((await r.json()) as any).id;
  const content = `[[llm tokens=${tokens} delay=${delay}${fail === undefined ? "" : ` fail_after=${fail}`}]]`;
  const response = await api(`/api/chats/${chat}/messages`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
  expect(response.ok).toBe(true);
  const id = response.headers.get("X-Message-Id")!;
  expect(id).toBeTruthy();
  return { chat, id, response, replica: response.headers.get("X-Replica") };
}
export async function messages(chat: string) {
  const r = await api(`/api/chats/${chat}/messages`);
  expect(r.ok).toBe(true);
  return ((await r.json()) as any).messages;
}
export async function terminal(chat: string, id: string, ms = 12000) {
  return until(async () => {
    const m = (await messages(chat)).find((m: any) => m.id === id);
    return m?.status !== "streaming" && m;
  }, ms);
}
export type Event = { id: number; event: string; data: any };
export class Reader {
  reader: ReadableStreamDefaultReader<Uint8Array>;
  buffer = "";
  decoder = new TextDecoder();
  constructor(public response: Response) {
    expect(response.ok).toBe(true);
    this.reader = response.body!.getReader();
  }
  async next(): Promise<Event | null> {
    while (true) {
      const end = this.buffer.indexOf("\n\n");
      if (end >= 0) {
        const block = this.buffer.slice(0, end);
        this.buffer = this.buffer.slice(end + 2);
        const lines = block.split("\n");
        return {
          id: Number(lines.find((l) => l.startsWith("id:"))?.slice(3)),
          event:
            lines
              .find((l) => l.startsWith("event:"))
              ?.slice(6)
              .trim() ?? "",
          data: JSON.parse(lines.find((l) => l.startsWith("data:"))!.slice(5)),
        };
      }
      const { value, done } = await this.reader.read();
      if (done) return null;
      this.buffer += this.decoder
        .decode(value, { stream: true })
        .replace(/\r/g, "");
    }
  }
  async all() {
    const events: Event[] = [];
    while (true) {
      const e = await this.next();
      if (!e) break;
      events.push(e);
    }
    return events;
  }
  async prefix(n = 5) {
    const events: Event[] = [];
    while (events.filter((e) => e.event === "token").length < n) {
      const e = await this.next();
      if (!e) throw Error("Early EOF");
      events.push(e);
    }
    return events;
  }
  async close() {
    await this.reader.cancel().catch(() => {});
  }
}
export const attach = (id: string, after?: number, header = false) =>
  api(
    `/api/messages/${id}/stream${after === undefined || header ? "" : `?after=${after}`}`,
    { headers: header ? { "Last-Event-ID": String(after) } : {} },
  );
export const text = (events: Event[]) =>
  events
    .filter((e) => e.event === "token")
    .map((e) => e.data.text)
    .join("");
export const full = (n: number) =>
  Array.from({ length: n }, (_, i) => `t${i} `).join("");
export function ordered(events: Event[]) {
  let last = 0;
  for (const e of events) {
    expect(Number.isSafeInteger(e.id)).toBe(true);
    expect(e.id).toBeGreaterThan(last);
    last = e.id;
  }
}
export function done(events: Event[], status = "complete") {
  expect(events.at(-1)?.event).toBe(status === "error" ? "error" : "done");
  expect(events.at(-1)?.data.status).toBe(status);
  ordered(events);
}
export async function compose(args: string[]) {
  const p = Bun.spawn(
    [
      "docker",
      "compose",
      "-p",
      process.env.COMPOSE_PROJECT_NAME!,
      "-f",
      process.env.COMPOSE_FILE!,
      ...args,
    ],
    { stdout: "pipe", stderr: "pipe" },
  );
  const out = await new Response(p.stdout).text(),
    err = await new Response(p.stderr).text();
  if (await p.exited) throw Error(out + err);
  return out;
}
