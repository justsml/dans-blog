import { appendFileSync, existsSync, readFileSync } from "node:fs";

export type CallStage = "request" | "invocation" | "exit" | "raw" | "parsed";
export type CallRecord = {
  at: string;
  key: string;
  stage: CallStage;
  [field: string]: unknown;
};

/**
 * One append-only JSONL receipt per run: every model call's request, CLI
 * invocation, exit (with verbatim stdout/stderr), raw text and parsed value,
 * one line per stage. Replaces the per-call file fan-out under calls/.
 */
export class CallLog {
  constructor(readonly path: string) {}

  append(key: string, stage: CallStage, fields: Record<string, unknown>) {
    const record: CallRecord = {
      at: new Date().toISOString(),
      key,
      stage,
      ...fields,
    };
    appendFileSync(this.path, JSON.stringify(record) + "\n");
  }

  /** All records in write order. A torn final line from a killed process is ignored. */
  records(): CallRecord[] {
    if (!existsSync(this.path)) return [];
    const lines = readFileSync(this.path, "utf8").split("\n");
    const rows: CallRecord[] = [];
    lines.forEach((line, index) => {
      if (!line.trim()) return;
      try {
        rows.push(JSON.parse(line));
      } catch (error) {
        const isTail = lines.slice(index + 1).every((rest) => !rest.trim());
        if (!isTail) throw Error(`Corrupt call log line ${index + 1}: ${this.path}`);
      }
    });
    return rows;
  }

  latest(key: string, stage: CallStage): CallRecord | undefined {
    return this.records().findLast((r) => r.key === key && r.stage === stage);
  }
}
