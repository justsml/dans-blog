import {
  readFileSync,
  readdirSync,
  writeFileSync,
  appendFileSync,
} from "node:fs";
import { join } from "node:path";
import { auditSchema, hash } from "./negotiation/protocol.ts";
import { extractJsonObject } from "./judge-utils.ts";
/** Remove only commas immediately before a closing bracket outside JSON strings. */
export function removeTrailingJsonCommas(text: string) {
  let output = "",
    quoted = false,
    escaped = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!;
    if (quoted) {
      output += c;
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === '"') quoted = false;
      continue;
    }
    if (c === '"') {
      quoted = true;
      output += c;
      continue;
    }
    if (c === ",") {
      let j = i + 1;
      while (/\s/.test(text[j] ?? "") && j < text.length) j++;
      if (text[j] === "}" || text[j] === "]") continue;
    }
    output += c;
  }
  return output;
}
if (import.meta.main) {
  const dir = process.argv[2];
  if (!dir) throw Error("Run directory required");
  for (const f of readdirSync(dir).filter(
    (f) => f.startsWith("review-") && f.endsWith("-result.jsonl"),
  )) {
    const path = join(dir, f),
      original = JSON.parse(readFileSync(path, "utf8"));
    if (original.ok || !original.error?.startsWith("SyntaxError:")) continue;
    const raw = JSON.parse(
      readFileSync(join(dir, "calls", original.id + ".jsonl"), "utf8"),
    );
    const input = extractJsonObject(raw.text);
    if (!input) throw Error("No JSON");
    const repaired = removeTrailingJsonCommas(input);
    if (repaired === input) throw Error("Failure is not trailing commas");
    const result = auditSchema.parse(JSON.parse(repaired));
    if (
      new Set(result.candidates.map((c) => c.label)).size !== 2 ||
      !result.candidates.every((c) => ["X", "Y"].includes(c.label)) ||
      !["X", "Y", "tie"].includes(result.preferredLabel)
    )
      throw Error("Invalid labels");
    appendFileSync(
      join(dir, "parse-recovery.jsonl"),
      JSON.stringify({
        id: original.id,
        originalResult: original,
        method: "remove trailing commas outside JSON strings only",
        inputHash: hash(input),
        repairedHash: hash(repaired),
      }) + "\n",
    );
    writeFileSync(
      path,
      JSON.stringify({
        ...original,
        ok: true,
        result,
        error: undefined,
        parseRecovery: "trailing-commas-only",
      }) + "\n",
    );
    console.log("Recovered " + original.id);
  }
}
