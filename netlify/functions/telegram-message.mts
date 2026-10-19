/**
 * POST /api/telegram-message
 *
 * Relays a short message from the consulting CTA dialog to a Telegram chat.
 * Secrets stay server-side: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID and the
 * optional SITE_RECAPTCHA_SECRET are read from the Netlify function
 * environment and never returned to the caller or written to logs.
 */

export const LIMITS = {
  name: 100,
  contact: 200,
  message: 2000,
  page: 500,
  body: 16_000,
} as const;

const TELEGRAM_API = "https://api.telegram.org";
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

type Env = Record<string, string | undefined>;

function readEnv(): Env {
  return typeof process === "undefined" ? {} : process.env;
}

function json(body: { ok: boolean; error?: string }, status = 200, extra: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extra,
    },
  });
}

function hostOf(value: string | undefined | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).host.toLowerCase();
  } catch {
    return null;
  }
}

/** Same-origin check: the browser's Origin must match this deploy's host or a configured site URL. */
export function isAllowedOrigin(req: Request, env: Env = readEnv()): boolean {
  const origin = hostOf(req.headers.get("origin"));
  if (!origin) return false;
  const allowed = new Set<string>();
  // The function is served from the same host as the page on production,
  // deploy previews, branch deploys, and `netlify dev`.
  for (const candidate of [
    req.url,
    env.URL,
    env.DEPLOY_PRIME_URL,
    env.DEPLOY_URL,
    env.SITE_URL,
  ]) {
    const host = hostOf(candidate);
    if (host) allowed.add(host);
  }
  return allowed.has(origin);
}

export type MessageInput = {
  name: string;
  contact: string;
  message: string;
  website: string;
  recaptcha: string;
  page: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Strips control characters (keeping newlines/tabs) and trims. */
function clean(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

export function parseInput(raw: unknown, referer: string | null):
  | { ok: true; value: MessageInput }
  | { ok: false; error: string } {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { ok: false, error: "invalid_body" };
  const body = raw as Record<string, unknown>;
  const value: MessageInput = {
    name: clean(asString(body.name)),
    contact: clean(asString(body.contact)),
    message: clean(asString(body.message)),
    website: asString(body.website).trim(),
    recaptcha: asString(body.recaptcha).trim(),
    page: safePageUrl(asString(body.page)) || safePageUrl(referer ?? ""),
  };
  if (value.name.length > LIMITS.name) return { ok: false, error: "name_too_long" };
  if (value.contact.length > LIMITS.contact) return { ok: false, error: "contact_too_long" };
  if (value.message.length < 1) return { ok: false, error: "message_required" };
  if (value.message.length > LIMITS.message) return { ok: false, error: "message_too_long" };
  return { ok: true, value };
}

function safePageUrl(value: string): string {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    url.username = "";
    url.password = "";
    return url.toString().slice(0, LIMITS.page);
  } catch {
    return "";
  }
}

export function formatTelegramText(input: MessageInput): string {
  return [
    "New message from danlevy.net",
    "",
    `Name: ${input.name || "(not given)"}`,
    `Contact: ${input.contact || "(not given)"}`,
    `Page: ${input.page || "(unknown)"}`,
    "",
    input.message,
  ].join("\n");
}

async function verifyRecaptcha(secret: string, token: string, ip: string | null): Promise<boolean> {
  if (!token) return false;
  const params = new URLSearchParams({ secret, response: token });
  if (ip) params.set("remoteip", ip);
  try {
    const res = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

function clientIp(req: Request): string | null {
  return (
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null
  );
}

export default async function handler(req: Request): Promise<Response> {
  const env = readEnv();

  if (req.method !== "POST") {
    return json({ ok: false, error: "method_not_allowed" }, 405, { Allow: "POST" });
  }
  if (!isAllowedOrigin(req, env)) {
    return json({ ok: false, error: "forbidden" }, 403);
  }

  const token = env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) {
    return json({ ok: false, error: "not_configured" }, 503);
  }

  if (!(req.headers.get("content-type") ?? "").toLowerCase().includes("application/json")) {
    return json({ ok: false, error: "unsupported_media_type" }, 415);
  }
  const rawText = await req.text();
  if (rawText.length > LIMITS.body) {
    return json({ ok: false, error: "payload_too_large" }, 413);
  }
  let raw: unknown;
  try {
    raw = JSON.parse(rawText);
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: pretend success so bots get no signal.
  if (raw && typeof raw === "object" && asString((raw as Record<string, unknown>).website).trim()) {
    return json({ ok: true });
  }

  const parsed = parseInput(raw, req.headers.get("referer"));
  if (!parsed.ok) return json({ ok: false, error: parsed.error }, 400);
  const input = parsed.value;

  const ip = clientIp(req);
  const recaptchaSecret = env.SITE_RECAPTCHA_SECRET?.trim();
  if (recaptchaSecret && !(await verifyRecaptcha(recaptchaSecret, input.recaptcha, ip))) {
    return json({ ok: false, error: "verification_failed" }, 403);
  }

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatTelegramText(input),
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      // Status only: the request URL contains the bot token.
      console.error(`telegram-message: Telegram API responded ${res.status}`);
      return json({ ok: false, error: "delivery_failed" }, 502);
    }
  } catch {
    console.error("telegram-message: Telegram API request failed");
    return json({ ok: false, error: "delivery_failed" }, 502);
  }

  return json({ ok: true });
}

export const config = {
  path: "/api/telegram-message",
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};
