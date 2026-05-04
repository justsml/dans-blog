import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
): string {
  const rules = resolveRedirectRules(collectPostRedirectRules(posts));
  if (rules.length === 0) return "";
  return `${rules.map(formatRedirectRule).join("\n")}\n`;
}

export function writeRedirectManifest(
  posts: readonly RedirectSourcePost[],
  filePath = getDefaultRedirectsPath(),
): string {
  const manifest = buildRedirectManifest(posts);
  const currentManifest = existsSync(filePath)
    ? readFileSync(filePath, "utf-8")
    : undefined;

  if (currentManifest === manifest) return manifest;

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, manifest, "utf-8");

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

function getDefaultRedirectsPath(): string {
  return join(process.cwd(), "public/_redirects");
}
