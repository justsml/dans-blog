import { test, expect } from "bun:test";
import { directive, frame, sse } from "./logic";
test("request settings and default limits", () => {
  expect(directive("hello")).toEqual({
    tokens: 40,
    delay: 20,
    failAfter: 10000,
  });
  expect(directive("[[llm tokens=12 delay=3 fail_after=7]]")).toEqual({
    tokens: 12,
    delay: 3,
    failAfter: 7,
  });
});
test("SSE framing across byte boundaries", async () => {
  const text = frame("token", { text: "t0 " }, 1);
  const stream = new ReadableStream({
    start(c) {
      for (const ch of text) c.enqueue(new TextEncoder().encode(ch));
      c.close();
    },
  });
  const data = [];
  for await (const item of sse(stream)) data.push(JSON.parse(item));
  expect(data).toEqual([{ text: "t0 " }]);
});
