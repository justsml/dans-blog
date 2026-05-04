import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

export type RedirectRule = {
  from: string;
  to: string;
  status?: number;
};

export type RedirectSourcePost = {
  slug: string;
  data: {
    redirects?: readonly string[] | null;
  };
};

const DEFAULT_REDIRECT_STATUS = 301;

export function normalizeRedirectPath(path: string): string {
  const normalized = path.trim();
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

export function collectPostRedirectRules(
  posts: readonly RedirectSourcePost[],
): RedirectRule[] {
  return posts.flatMap((post) => {
    const redirects = post.data.redirects ?? [];
    const to = normalizeRedirectPath(post.slug);

    return redirects.map((from) => ({
      from,
      to,
      status: DEFAULT_REDIRECT_STATUS,
    }));
  });
}

export function resolveRedirectRules(
  rules: readonly RedirectRule[],
): RedirectRule[] {
  const rulesByFrom = new Map<string, RedirectRule>();
  const manifest: RedirectRule[] = [];

  for (const rawRule of rules) {
    const rule = normalizeRedirectRule(rawRule);
    const existingRule = rulesByFrom.get(rule.from);

    if (existingRule == null) {
      rulesByFrom.set(rule.from, rule);
      manifest.push(rule);
      continue;
    }

    if (existingRule.to === rule.to && existingRule.status === rule.status) {
      continue;
    }

    throw new Error(
      [
        `Conflicting redirect for "${rule.from}".`,
        `Existing: ${formatRedirectRule(existingRule)}`,
        `Incoming: ${formatRedirectRule(rule)}`,
      ].join(" "),
    );
  }

  return manifest;
}

export function buildRedirectManifest(
  posts: readonly RedirectSourcePost[],
  existingManifest = "",
): string {
  const rules = resolveRedirectRules(collectPostRedirectRules(posts));
  const generatedRulesBySource = new Map(rules.map((rule) => [rule.from, rule]));
  const generatedManifest = rules.map(formatRedirectRule).join("\n");
  const preservedManifest = preserveExistingRedirectRules(
    existingManifest,
    generatedRulesBySource,
  );

  if (!generatedManifest) return preservedManifest;
  if (!preservedManifest) return `${generatedManifest}\n`;

  return `${generatedManifest}\n\n${preservedManifest}`;
}

export function writeRedirectManifest(
  posts: readonly RedirectSourcePost[],
  filePath = getDefaultRedirectsPath(),
  mirrorFilePaths = getDefaultMirrorRedirectPaths(filePath),
): string {
  const currentManifest = existsSync(filePath)
    ? readFileSync(filePath, "utf-8")
    : undefined;
  const manifest = buildRedirectManifest(posts, currentManifest);

  writeManifestFile(filePath, manifest, { createDirectory: true });

  for (const mirrorFilePath of mirrorFilePaths) {
    writeManifestFile(mirrorFilePath, manifest, { createDirectory: false });
  }

  return manifest;
}

function normalizeRedirectRule(rule: RedirectRule): Required<RedirectRule> {
  return {
    from: normalizeRedirectPath(rule.from),
    to: normalizeRedirectPath(rule.to),
    status: rule.status ?? DEFAULT_REDIRECT_STATUS,
  };
}

function formatRedirectRule(rule: RedirectRule): string {
  const normalizedRule = normalizeRedirectRule(rule);
  return [normalizedRule.from, normalizedRule.to, normalizedRule.status].join(
    " ",
  );
}

function preserveExistingRedirectRules(
  existingManifest: string,
  generatedRulesBySource: ReadonlyMap<string, RedirectRule>,
): string {
  if (!existingManifest) return "";

  const preservedLines = trimEmptyEdgeLines(existingManifest.split(/\r?\n/));
  const filteredPreservedLines = trimEmptyEdgeLines(
    preservedLines.filter((line) => {
      const existingRule = parseRedirectRuleLine(line);
      if (existingRule == null) return true;

      const generatedRule = generatedRulesBySource.get(existingRule.from);
      if (generatedRule == null) return true;

      if (
        formatRedirectRule(generatedRule) === formatRedirectRule(existingRule)
      ) {
        return false;
      }

      throw new Error(
        [
          `Conflicting redirect for "${existingRule.from}".`,
          `Existing: ${formatRedirectRule(existingRule)}`,
          `Incoming: ${formatRedirectRule(generatedRule)}`,
        ].join(" "),
      );
    }),
  );

  return filteredPreservedLines.length > 0
    ? `${filteredPreservedLines.join("\n")}\n`
    : "";
}

function parseRedirectRuleLine(line: string): RedirectRule | null {
  const trimmedLine = line.trim();
  if (!trimmedLine || trimmedLine.startsWith("#")) return null;

  const [from, to, status] = trimmedLine.split(/\s+/);
  if (!from || !to) return null;

  return {
    from: normalizeRedirectPath(from),
    to: normalizeRedirectPath(to),
    status: status == null ? undefined : Number(status),
  };
}

function trimEmptyEdgeLines(lines: string[]): string[] {
  const trimmedLines = [...lines];

  while (trimmedLines.length > 0 && trimmedLines[0].trim() === "") {
    trimmedLines.shift();
  }

  while (
    trimmedLines.length > 0 &&
    trimmedLines[trimmedLines.length - 1].trim() === ""
  ) {
    trimmedLines.pop();
  }
  return trimmedLines;
}

function writeManifestFile(
  filePath: string,
  manifest: string,
  { createDirectory }: { createDirectory: boolean },
) {
  if (!createDirectory && !existsSync(dirname(filePath))) return;

  const currentManifest = existsSync(filePath)
    ? readFileSync(filePath, "utf-8")
    : undefined;
  if (currentManifest === manifest) return;

  if (createDirectory) mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, manifest, "utf-8");
}

function getDefaultRedirectsPath(): string {
  return join(process.cwd(), "public/_redirects");
}

function getDefaultMirrorRedirectPaths(filePath: string): string[] {
  const publicRedirectsPath = getDefaultRedirectsPath();
  if (filePath !== publicRedirectsPath) return [];
  return [join(process.cwd(), "dist/_redirects")];
}
