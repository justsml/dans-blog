import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const postsDir = join(process.cwd(), "src/content/posts");
const shouldWrite = process.argv.includes("--write");

const preferredCategoryByAlias = new Map([
  ["howto", "HowTo"],
  ["how-to", "HowTo"],
  ["regular expressions", "Regex"],
  ["reg-ex", "Regex"],
  ["software engineering", "Engineering"],
]);

const canonicalTagByAlias = new Map([
  ["AI", "ai"],
  ["AI SDK", "ai-sdk"],
  ["Agent Networks", "agent-networks"],
  ["Agent Orchestration", "agent-orchestration"],
  ["Guardrails", "guardrails"],
  ["Integrations", "integrations"],
  ["LLM", "llm"],
  ["MCP", "mcp"],
  ["Mastra", "mastra"],
  ["Math", "math"],
  ["PII", "pii"],
  ["Privacy", "privacy"],
  ["Salesforce", "salesforce"],
  ["Security", "security"],
  ["Tools", "tools"],
  ["TypeScript", "typescript"],
  ["Workflows", "workflows"],
  ["lanceDB", "lancedb"],
  ["date class", "date"],
  ["functional river", "functional-programming"],
  ["open source", "open-source"],
  ["packet.net", "packet"],
  ["ovh.net", "ovh"],
  ["shell script", "shell-script"],
  ["site-search", "search"],
  ["source code", "source-code"],
]);

type FixResult = {
  relPath: string;
  changes: string[];
};

const results: FixResult[] = [];

for (const path of findPostFiles()) {
  const original = readFileSync(path, "utf8");
  const fixed = fixContent(original);

  if (fixed.contents === original) continue;

  const relPath = relative(process.cwd(), path);
  results.push({ relPath, changes: fixed.changes });

  if (shouldWrite) {
    writeFileSync(path, fixed.contents, "utf8");
  }
}

for (const result of results) {
  console.log(`${shouldWrite ? "FIXED" : "WOULD FIX"} ${result.relPath}`);
  for (const change of result.changes) {
    console.log(`  - ${change}`);
  }
}

if (results.length === 0) {
  console.log("No mechanical content fixes found.");
} else if (!shouldWrite) {
  console.log(`Dry run: ${results.length} file(s) would change. Re-run with --write to update files.`);
} else {
  console.log(`Updated ${results.length} file(s).`);
}

function findPostFiles() {
  return readdirSync(postsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const baseDir = join(postsDir, entry.name);
      return [
        postFileForDir(baseDir),
        ...readdirSync(baseDir, { withFileTypes: true })
          .filter((child) => child.isDirectory())
          .map((child) => postFileForDir(join(baseDir, child.name))),
      ].filter((path): path is string => path != null);
    });
}

function postFileForDir(dir: string) {
  const mdxPath = join(dir, "index.mdx");
  const mdPath = join(dir, "index.md");
  if (existsSync(mdxPath)) return mdxPath;
  if (existsSync(mdPath)) return mdPath;
  return undefined;
}

function fixContent(source: string) {
  const parsed = parseFrontmatter(source);
  if (parsed == null) return { contents: source, changes: [] };
  if (hasBoolean(parsed.frontmatter, "draft", true)) return { contents: source, changes: [] };

  const changes: string[] = [];
  const fixedFrontmatter = fixFrontmatter(parsed.frontmatter, changes);
  const contents = `${source.slice(0, parsed.frontmatterStart)}${fixedFrontmatter}${source.slice(parsed.frontmatterEnd)}`;

  return { contents, changes };
}

function fixFrontmatter(frontmatter: string, changes: string[]) {
  let result = frontmatter;

  result = replaceScalar(result, "category", (value) => {
    const preferred = preferredCategoryByAlias.get(value.toLowerCase());
    if (preferred == null || preferred === value) return value;
    changes.push(`category "${value}" -> "${preferred}"`);
    return preferred;
  });

  const tagFix = fixTags(result);
  result = tagFix.frontmatter;
  changes.push(...tagFix.changes);

  return result;
}

function parseFrontmatter(source: string) {
  if (!source.startsWith("---")) return undefined;

  const endMarker = source.indexOf("\n---", 3);
  if (endMarker === -1) return undefined;

  return {
    frontmatterStart: 0,
    frontmatterEnd: endMarker + "\n---".length,
    frontmatter: source.slice(0, endMarker + "\n---".length),
  };
}

function replaceScalar(frontmatter: string, key: string, replacer: (value: string) => string) {
  const pattern = new RegExp(`^(${escapeRegExp(key)}:\\s*)([^\\n#]*?)(\\s*)$`, "m");
  return frontmatter.replace(pattern, (line, prefix: string, rawValue: string, suffix: string) => {
    const parsed = parseQuotedValue(rawValue.trim());
    if (parsed.value === "") return line;

    const nextValue = replacer(parsed.value);
    if (nextValue === parsed.value) return line;

    return `${prefix}${formatValue(nextValue, parsed.quote)}${suffix}`;
  });
}

function fixTags(frontmatter: string) {
  const changes: string[] = [];

  const inlineFixed = frontmatter.replace(/^(\s*tags:\s*)\[([^\]]*)\](\s*)$/m, (line, prefix: string, rawItems: string, suffix: string) => {
    const items = rawItems
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map(parseQuotedValue);

    if (items.length === 0) return line;

    const fixedItems = items.map((item) => fixTagValue(item.value, changes));
    if (fixedItems.every((item, index) => item === items[index].value)) return line;

    return `${prefix}[${fixedItems.join(", ")}]${suffix}`;
  });

  const blockFixed = inlineFixed.replace(/^(\s*tags:\s*\n)((?:\s*-\s*[^\n]+\n?)+)/m, (line, prefix: string, rawItems: string) => {
    let changed = false;
    const fixedItems = rawItems.replace(/^(\s*-\s*)([^\n#]*?)(\s*)$/gm, (itemLine, itemPrefix: string, rawValue: string, suffix: string) => {
      const parsed = parseQuotedValue(rawValue.trim());
      if (parsed.value === "") return itemLine;

      const nextValue = fixTagValue(parsed.value, changes);
      if (nextValue === parsed.value) return itemLine;

      changed = true;
      return `${itemPrefix}${formatValue(nextValue, parsed.quote)}${suffix}`;
    });

    return changed ? `${prefix}${fixedItems}` : line;
  });

  return { frontmatter: blockFixed, changes: unique(changes) };
}

function fixTagValue(value: string, changes: string[]) {
  const fixed = canonicalTagByAlias.get(value) ?? kebabCaseTag(value);
  if (fixed !== value) {
    changes.push(`tag "${value}" -> "${fixed}"`);
  }
  return fixed;
}

function hasBoolean(frontmatter: string, key: string, value: boolean) {
  const expected = value ? "true" : "false";
  return new RegExp(`^${escapeRegExp(key)}:\\s*${expected}\\s*$`, "m").test(frontmatter);
}

function kebabCaseTag(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function parseQuotedValue(rawValue: string) {
  const quote = rawValue.startsWith("'") && rawValue.endsWith("'")
    ? "'"
    : rawValue.startsWith("\"") && rawValue.endsWith("\"")
      ? "\""
      : "";

  return {
    quote,
    value: quote === "" ? rawValue : rawValue.slice(1, -1),
  };
}

function formatValue(value: string, quote: string) {
  if (quote === "'") return `'${value.replaceAll("'", "''")}'`;
  if (quote === "\"") return `"${value.replaceAll("\"", "\\\"")}"`;
  return value;
}

function unique(values: string[]) {
  return [...new Set(values)];
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
