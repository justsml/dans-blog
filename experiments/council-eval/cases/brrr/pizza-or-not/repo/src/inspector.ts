import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "node:fs";
import { parseRuling, type Ruling } from "./ruling";

const client = new Anthropic({ maxRetries: 0 });
const MODEL = "claude-opus-5-5";

function handbook(): string {
  const text = readFileSync(new URL("../prompts/pizza.md", import.meta.url), "utf8");
  // The Bureau stamps every form with the time of review.
  return `Form received: ${new Date().toISOString()}\n\n${text}`;
}

function mediaType(bytes: Uint8Array): "image/jpeg" | "image/png" | "image/webp" | "image/gif" {
  if (bytes[0] === 0x89) return "image/png";
  if (bytes[0] === 0x52) return "image/webp";
  if (bytes[0] === 0x47) return "image/gif";
  return "image/jpeg";
}

async function withRetries<T>(fn: () => Promise<T>): Promise<T> {
  let last: unknown;
  for (let i = 0; i < 5; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
    }
  }
  throw last;
}

/** Step 1: the Inspector examines the photograph and writes up everything they see. */
async function examine(image: Anthropic.ImageBlockParam): Promise<string> {
  const res = await withRetries(() =>
    client.messages
      .stream({
        model: MODEL,
        max_tokens: 32000,
        thinking: { type: "adaptive" },
        output_config: { effort: "max" },
        system: handbook(),
        messages: [
          {
            role: "user",
            content: [
              image,
              {
                type: "text",
                text: "Examine this photograph for the file. Describe every object, surface, and detail, then list which handbook sections apply and why. Do not rule yet.",
              },
            ],
          },
        ],
      })
      .finalMessage(),
  );
  return res.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("\n");
}

/** Step 2: the Inspector rules, with the examination notes and the photograph in hand. */
async function rule(image: Anthropic.ImageBlockParam, notes: string): Promise<Ruling> {
  const res = await withRetries(() =>
    client.messages
      .stream({
        model: MODEL,
        max_tokens: 32000,
        thinking: { type: "adaptive" },
        output_config: { effort: "max" },
        system: handbook(),
        messages: [
          {
            role: "user",
            content: [
              image,
              { type: "text", text: `Examination notes:\n${notes}\n\nNow rule, in the Section 7 format.` },
            ],
          },
        ],
      })
      .finalMessage(),
  );
  const text = res.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("\n");
  return parseRuling(text);
}

export async function inspect(bytes: Uint8Array): Promise<Ruling> {
  const image: Anthropic.ImageBlockParam = {
    type: "image",
    source: { type: "base64", media_type: mediaType(bytes), data: Buffer.from(bytes).toString("base64") },
  };
  const notes = await examine(image);
  return rule(image, notes);
}
