export function directive(text: string) {
  const block = text.match(/\[\[llm ([^\]]+)\]\]/)?.[1] ?? "";
  const number = (key: string, fallback: number) => {
    const value = Number(
      block.match(new RegExp(`${key}=(\\d+)`))?.[1] ?? fallback,
    );
    return Math.max(0, Math.min(value, 10000));
  };
  return {
    tokens: number("tokens", 40),
    delay: number("delay", 20),
    failAfter: number("fail_after", 10000),
  };
}
export function frame(event: string, data: unknown, id?: number) {
  return `${id === undefined ? "" : `id: ${id}\n`}event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}
export async function* sse(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let pending = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      pending += decoder.decode(value, { stream: true }).replace(/\r/g, "");
      let end: number;
      while ((end = pending.indexOf("\n\n")) >= 0) {
        const block = pending.slice(0, end);
        pending = pending.slice(end + 2);
        const data = block
          .split("\n")
          .filter((l) => l.startsWith("data:"))
          .map((l) => l.slice(5).trimStart())
          .join("\n");
        if (data) yield data;
      }
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
}
