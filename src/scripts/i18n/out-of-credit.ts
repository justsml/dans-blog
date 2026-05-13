import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const OUT_OF_CREDIT_MARKER = join(process.cwd(), ".git/codex-i18n-out-of-credit.json");

const OUT_OF_CREDIT_PATTERNS = [
  /\b402\b/i,
  /payment required/i,
  /insufficient (?:openrouter )?credits?/i,
  /out of (?:openrouter )?credits?/i,
  /not enough (?:openrouter )?credits?/i,
  /credits? (?:are )?(?:too low|exhausted|depleted)/i,
  /(?:account|credit) balance (?:is )?(?:too low|insufficient|exhausted|depleted)/i,
  /add (?:more )?credits?/i,
];

export function isOutOfCreditError(error: unknown) {
  const text = collectErrorText(error);
  return OUT_OF_CREDIT_PATTERNS.some((pattern) => pattern.test(text));
}

export function hasOutOfCreditMarker() {
  return existsSync(OUT_OF_CREDIT_MARKER);
}

export function assertNoOutOfCreditMarker() {
  if (!hasOutOfCreditMarker()) return;
  throw new Error(formatOutOfCreditStopMessage());
}

export function recordOutOfCreditIssue(error: unknown, context: Record<string, unknown>) {
  const issue = {
    at: new Date().toISOString(),
    pid: process.pid,
    context,
    message: collectErrorText(error).slice(0, 6000),
  };

  mkdirSync(dirname(OUT_OF_CREDIT_MARKER), { recursive: true });
  if (!existsSync(OUT_OF_CREDIT_MARKER)) {
    writeFileSync(OUT_OF_CREDIT_MARKER, JSON.stringify(issue, null, 2), "utf8");
  }

  console.error(formatOutOfCreditStopMessage());
  console.error(`First detected by: ${JSON.stringify(context)}`);
  return issue;
}

export function formatOutOfCreditStopMessage() {
  return [
    "OpenRouter appears to be out of credits. Stopping i18n API work.",
    `Sentinel: ${relative(process.cwd(), OUT_OF_CREDIT_MARKER)}`,
    "Remove that sentinel after adding credits to allow translation workers to run again.",
  ].join(" ");
}

function collectErrorText(error: unknown): string {
  const seen = new Set<unknown>();
  const parts: string[] = [];

  function visit(value: unknown, depth: number) {
    if (value == null || depth > 4 || seen.has(value)) return;
    seen.add(value);

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      parts.push(String(value));
      return;
    }

    if (value instanceof Error) {
      parts.push(value.name, value.message);
      if (value.stack != null) parts.push(value.stack);
      visit(value.cause, depth + 1);
    }

    if (typeof value !== "object") return;
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      if (/api|body|cause|code|credit|error|message|response|status/i.test(key)) {
        parts.push(key);
        visit(nested, depth + 1);
      }
    }
  }

  visit(error, 0);
  return parts.join("\n");
}
