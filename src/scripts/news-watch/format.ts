export type Align = "left" | "right";

export function printTable(headers: string[], rows: string[][], aligns?: Align[]): string[] {
  const cols = headers.length;
  const alignByCol: Align[] = aligns ?? headers.map((h, i) => defaultAlign(h, i));
  const widths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map((r) => (r[i] ?? "").length)),
  );
  const headerLine = headers.map((h, i) => padCell(h, widths[i], alignByCol[i])).join("  ");
  const sep = widths.map((w) => "-".repeat(w)).join("  ");
  const body = rows.map((row) =>
    row.map((cell, i) => padCell(cell ?? "", widths[i], alignByCol[i])).join("  "),
  );
  return [headerLine, sep, ...body];
}

function defaultAlign(header: string, _index: number): Align {
  const rightAligned = [
    "COUNT", "ITEMS", "SCORE", "REL", "FAIL", "N", "MENTIONS", "AVG", "TOTAL",
  ];
  if (rightAligned.includes(header.toUpperCase())) return "right";
  return "left";
}

export function padCell(value: string, width: number, align: Align): string {
  if (align === "left") return value.padEnd(width);
  return value.padStart(width);
}

export function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, Math.max(0, max - 1))}…`;
}

export function pct(part: number, total: number): string {
  if (total === 0) return "0%";
  return `${((part / total) * 100).toFixed(1)}%`;
}

export function fmtTime(value: string | null | undefined): string {
  if (!value) return "-";
  const ts = Date.parse(value);
  if (!Number.isFinite(ts)) return value;
  return new Date(ts).toISOString().replace("T", " ").replace(/\.\d+Z$/, "Z");
}

export function fmtDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const rem = Math.round(seconds % 60);
  return `${minutes}m${rem}s`;
}
