#!/usr/bin/env node
/**
 * Node-only audit fetcher. Spawned by the Bun-driven news-watch when a
 * source has an `impersonate` profile, since Bun's NAPI shim doesn't
 * expose `uv_handle_size` (oven-sh/bun#18546) which koffi needs.
 *
 * Reads a JSON request from argv[2], performs the fetch via `impers`,
 * writes the normalized response as JSON to stdout.
 */
import { get as impersGet } from "impers";

const REQUEST = process.argv[2];
if (!REQUEST) {
  process.stderr.write("usage: impersonated-fetch-node.mjs '<json-request>'\n");
  process.exit(2);
}

let payload;
try {
  payload = JSON.parse(REQUEST);
} catch (err) {
  process.stderr.write(`invalid JSON in argv[2]: ${err.message}\n`);
  process.exit(2);
}

const { url, profile = "chrome124", headers = {}, params, body, json, cookies, proxy, timeoutSeconds = 30, followRedirects = true, userAgent } = payload ?? {};
if (!url) {
  process.stderr.write("missing 'url' in request payload\n");
  process.exit(2);
}

const builtHeaders = { ...headers };
if (cookies && Object.keys(cookies).length > 0) {
  builtHeaders.Cookie = Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join("; ");
}

try {
  const response = await impersGet(url, {
    headers: builtHeaders,
    params,
    content: body,
    json,
    allowRedirects: followRedirects,
    timeout: timeoutSeconds,
    proxy,
    impersonate: profile,
    userAgent,
    decodeContent: true,
  });

  const setCookie = [];
  const flatHeaders = {};
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") setCookie.push(value);
    else flatHeaders[key] = value;
  });

  const result = {
    ok: response.status >= 200 && response.status < 400,
    status: response.status,
    statusText: response.statusText ?? "",
    finalUrl: response.url ?? url,
    headers: flatHeaders,
    setCookie,
    body: response.text ?? "",
    bytes: response.content?.byteLength ?? Buffer.byteLength(response.text ?? "", "utf8"),
    durationSeconds: response.elapsed ?? 0,
    impersonated: profile,
    usedProxy: Boolean(proxy),
  };

  process.stdout.write(JSON.stringify(result));
} catch (err) {
  process.stderr.write(`impersonated fetch failed: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
}
