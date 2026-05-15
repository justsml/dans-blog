const colorEnabled =
  process.env.FORCE_COLOR != null ||
  (process.env.NO_COLOR == null &&
    process.env.TERM !== "dumb" &&
    process.stdout.isTTY === true);

const ansi = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
} as const;

function paint(value: string, code: keyof typeof ansi) {
  return colorEnabled ? `${ansi[code]}${value}${ansi.reset}` : value;
}

export const ui = {
  title: (value: string) => paint(value, "bold"),
  dim: (value: string) => paint(value, "dim"),
  info: (value: string) => paint(value, "cyan"),
  good: (value: string) => paint(value, "green"),
  bad: (value: string) => paint(value, "red"),
  warn: (value: string) => paint(value, "yellow"),
  model: (value: string) => paint(value, "magenta"),
  path: (value: string) => paint(value, "gray"),
};

export function shortModel(model: string) {
  return model.replace(/^openrouter\//, "");
}

export function formatDuration(ms: number) {
  if (ms < 1_000) return `${ms}ms`;
  const seconds = ms / 1_000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${Math.round(seconds % 60)}s`;
}

export function formatCost(value: number | undefined) {
  return value == null ? "-" : `$${value.toFixed(5)}`;
}

export function statusIcon(passed: boolean) {
  return passed ? ui.good("✅") : ui.bad("❌");
}

export function truncate(value: string, maxLength: number) {
  const plain = stripAnsi(value);
  if ([...plain].length <= maxLength) return value;
  return [...plain].slice(0, Math.max(1, maxLength - 1)).join("") + "…";
}

export function table(headers: string[], rows: string[][]) {
  const widths = headers.map((header, index) =>
    Math.max(
      visibleLength(header),
      ...rows.map((row) => visibleLength(row[index] ?? "")),
    ),
  );
  const renderRow = (cells: string[]) =>
    `| ${cells.map((cell, index) => padVisible(cell, widths[index])).join(" | ")} |`;
  const divider = `| ${widths.map((width) => "-".repeat(width)).join(" | ")} |`;
  return [renderRow(headers.map(ui.title)), divider, ...rows.map(renderRow)].join(
    "\n",
  );
}

export function scoreCell(score: number) {
  const formatted = `${(score * 100).toFixed(1)}`;
  if (score >= 0.9) return ui.good(formatted);
  if (score >= 0.72) return ui.warn(formatted);
  return ui.bad(formatted);
}

function stripAnsi(value: string) {
  return value.replace(/\x1b\[[0-9;]*m/g, "");
}

function visibleLength(value: string) {
  return [...stripAnsi(value)].length;
}

function padVisible(value: string, width: number) {
  return value + " ".repeat(Math.max(0, width - visibleLength(value)));
}
