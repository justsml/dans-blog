import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const postsDir = join(process.cwd(), "src/content/posts");
const staticRoutes = new Set([
  "/",
  "/about/",
  "/challenges/",
  "/consulting/",
  "/contact/",
  "/open-source-journal/",
  "/rss.xml",
  "/rss.json",
  "/robots.txt",
]);

const assetRoutePrefixes = [
  "/apple-touch-icon",
  "/docs/",
  "/favicon",
  "/icons/",
  "/images/",
  "/js/",
  "/manifest.webmanifest",
  "/previews/",
  "/styles/",
];

const allowedCategories = new Set([
  "AI",
  "Code",
  "DevOps",
  "Engineering",
  "Guides",
  "HowTo",
  "Instructional Design",
  "Leadership",
  "Lulz",
  "Quiz",
  "Regex",
  "Search",
  "Security",
  "Thoughts",
]);

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

type FrontmatterValue = string | boolean | string[] | number | undefined;

type PostFile = {
  path: string;
  relPath: string;
  dirName: string;
  slug: string;
  directoryDate?: string;
  body: string;
  frontmatter: Record<string, FrontmatterValue>;
};

type Finding = {
  level: "error" | "warning";
  file: string;
  message: string;
};

const findings: Finding[] = [];
const strict = process.argv.includes("--strict");
const posts = readPosts();
const routeBySlug = new Map(posts.map((post) => [post.slug, `/${post.slug}/`]));
const knownPostRoutes = new Set(routeBySlug.values());

for (const post of posts) {
  checkTaxonomy(post);
  checkVisibility(post);
  checkDate(post);
  checkBodyHeadings(post);
  checkRelated(post);
  checkAbsoluteInternalLinks(post);
  checkMarkdownInsideJsx(post);
}

for (const finding of findings) {
  const prefix = finding.level === "error" ? "ERROR" : "WARN";
  console.log(`${prefix} ${finding.file}: ${finding.message}`);
}

const errorCount = findings.filter((finding) => finding.level === "error").length;
const warningCount = findings.length - errorCount;

if (findings.length === 0) {
  console.log("Content check passed with no findings.");
} else {
  console.log(
    `Content check finished with ${errorCount} error(s) and ${warningCount} warning(s).`,
  );
}

process.exitCode = strict && errorCount > 0 ? 1 : 0;

function readPosts(): PostFile[] {
  return readdirSync(postsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const mdxPath = join(postsDir, entry.name, "index.mdx");
      const mdPath = join(postsDir, entry.name, "index.md");
      const path = existsSync(mdxPath) ? mdxPath : existsSync(mdPath) ? mdPath : "";
      if (!path) return [];

      const source = readFileSync(path, "utf8");
      const { frontmatter, body } = parseFrontmatter(source);
      const dateMatch = entry.name.match(/^(\d{4}-\d{2}-\d{2})--(.+)$/);

      return [
        {
          path,
          relPath: relative(process.cwd(), path),
          dirName: entry.name,
          slug: dateMatch?.[2] ?? entry.name,
          directoryDate: dateMatch?.[1],
          body,
          frontmatter,
        },
      ];
    });
}

function parseFrontmatter(source: string) {
  if (!source.startsWith("---")) return { frontmatter: {}, body: source };

  const endIndex = source.indexOf("\n---", 3);
  if (endIndex === -1) return { frontmatter: {}, body: source };

  const raw = source.slice(3, endIndex).trim();
  const body = source.slice(endIndex + 4);
  const frontmatter: Record<string, FrontmatterValue> = {};

  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    const value = rawValue.trim();

    if (value === "true") frontmatter[key] = true;
    else if (value === "false") frontmatter[key] = false;
    else if (/^\d+(\.\d+)?$/.test(value)) frontmatter[key] = Number(value);
    else if (value.startsWith("[") && value.endsWith("]")) {
      frontmatter[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => stripQuotes(item.trim()))
        .filter(Boolean);
    } else {
      frontmatter[key] = stripQuotes(value);
    }
  }

  return { frontmatter, body };
}

function stripQuotes(value: string) {
  return value.replace(/^["']|["']$/g, "");
}

function checkTaxonomy(post: PostFile) {
  const category = stringValue(post.frontmatter.category);
  if (!category) {
    add("warning", post, "missing category frontmatter");
    return;
  }

  const preferredCategory = preferredCategoryByAlias.get(category.toLowerCase());
  if (preferredCategory && category !== preferredCategory) {
    add("warning", post, `category "${category}" should be "${preferredCategory}"`);
  } else if (!allowedCategories.has(category)) {
    add("warning", post, `category "${category}" is outside the controlled taxonomy`);
  }

  const tags = arrayValue(post.frontmatter.tags);
  for (const tag of tags) {
    const canonicalTag = canonicalTagByAlias.get(tag);
    if (canonicalTag) {
      add("warning", post, `tag "${tag}" should be "${canonicalTag}"`);
    } else if (/[A-Z]/.test(tag) || /\s/.test(tag)) {
      add("warning", post, `tag "${tag}" should be lowercase kebab-case`);
    }
  }
}

function checkVisibility(post: PostFile) {
  const publish = flagValue(post.frontmatter.publish);
  const draft = flagValue(post.frontmatter.draft);
  const hidden = flagValue(post.frontmatter.hidden);
  const unlisted = flagValue(post.frontmatter.unlisted);

  if (publish === true && (draft === true || hidden === true)) {
    add("warning", post, "publish:true is paired with draft:true or hidden:true");
  }

  if (publish === false && draft !== true && hidden !== true) {
    add("warning", post, "publish:false should usually be paired with draft:true or hidden:true");
  }

  if (draft === true && hidden !== true && unlisted !== true) {
    add("warning", post, "draft:true should usually also be hidden:true or unlisted:true");
  }
}

function checkDate(post: PostFile) {
  const frontmatterDate = stringValue(post.frontmatter.date);
  if (!frontmatterDate) {
    add("warning", post, "missing date frontmatter");
    return;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(frontmatterDate)) {
    add("warning", post, `date "${frontmatterDate}" should use YYYY-MM-DD`);
  }

  if (post.directoryDate && post.directoryDate !== frontmatterDate) {
    add(
      "warning",
      post,
      `directory date ${post.directoryDate} differs from frontmatter date ${frontmatterDate}`,
    );
  }

  const modified = stringValue(post.frontmatter.modified);
  if (modified && !isValidIsoDate(modified)) {
    add("error", post, `modified "${modified}" is not a valid YYYY-MM-DD date`);
  }
}

function checkBodyHeadings(post: PostFile) {
  const body = stripFencedMarkdown(post.body);
  const lines = body.split(/\r?\n/);
  const markdownH1 = lines.findIndex((line) => /^#\s+\S/.test(line.trim()));
  if (markdownH1 >= 0) {
    add(
      "warning",
      post,
      `body starts or contains an H1 near line ${markdownH1 + 1}; use ## under the layout title`,
    );
  }

  const htmlH1 = lines.findIndex((line) => /<h1\b/i.test(line));
  if (htmlH1 >= 0) {
    add(
      "warning",
      post,
      `raw <h1> appears near line ${htmlH1 + 1}; use ## under the layout title`,
    );
  }
}

function checkRelated(post: PostFile) {
  const related = arrayValue(post.frontmatter.related);
  const seen = new Set<string>();

  for (const slug of related) {
    if (slug === post.slug) {
      add("error", post, "related includes the current post slug");
    } else if (seen.has(slug)) {
      add("error", post, `related includes duplicate slug "${slug}"`);
    } else if (!routeBySlug.has(slug)) {
      add("error", post, `related slug "${slug}" does not match a post`);
    }
    seen.add(slug);
  }
}

function checkAbsoluteInternalLinks(post: PostFile) {
  const body = stripFencedMarkdown(post.body);
  const links = [
    ...body.matchAll(/\[[^\]]+\]\((\/[^)#?\s]+)(?:[)#?][^)]*)?\)/g),
    ...body.matchAll(/\bhref=["'](\/[^"'#?\s]+)(?:[#?][^"']*)?["']/g),
  ].map((match) => normalizeRoute(match[1]));

  for (const link of links) {
    if (isAllowedAbsoluteRoute(link)) continue;
    if (!knownPostRoutes.has(link) && !staticRoutes.has(link)) {
      add("warning", post, `absolute internal link "${link}" does not match a known route`);
    }
  }
}

function checkMarkdownInsideJsx(post: PostFile) {
  const lines = post.body.split(/\r?\n/);
  let jsxDepth = 0;
  let componentStartLine = 0;
  let firstComponentStartLine = 0;
  const matches: number[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (/^<[A-Z][\w.:]*(\s|>|$)/.test(trimmed) && !trimmed.includes("</")) {
      jsxDepth += 1;
      componentStartLine = index + 1;
      firstComponentStartLine ||= componentStartLine;
    }

    if (
      jsxDepth > 0 &&
      !trimmed.startsWith("{") &&
      /(^|\s)(#{1,6}\s|\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\([^)]+\)|`[^`]+`)/.test(trimmed)
    ) {
      matches.push(index + 1);
    }

    if (jsxDepth > 0 && /^<\/[A-Z][\w.:]*>/.test(trimmed)) {
      jsxDepth -= 1;
    }
  }

  if (matches.length > 0) {
    add(
      "warning",
      post,
      `markdown syntax appears inside JSX children ${matches.length} time(s); first near line ${matches[0]} (component starts near line ${firstComponentStartLine})`,
    );
  }
}

function normalizeRoute(route: string) {
  if (route === "/") return route;
  return route.endsWith("/") || route.includes(".") ? route : `${route}/`;
}

function isAllowedAbsoluteRoute(route: string) {
  return assetRoutePrefixes.some((prefix) => route.startsWith(prefix));
}

function stripFencedMarkdown(body: string) {
  return body.replace(/```[\s\S]*?```/g, "");
}

function isValidIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function stringValue(value: FrontmatterValue) {
  return typeof value === "string" ? value : undefined;
}

function arrayValue(value: FrontmatterValue) {
  return Array.isArray(value) ? value : [];
}

function flagValue(value: FrontmatterValue) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "yes", "on"].includes(normalized)) return true;
    if (["false", "0", "no", "off", ""].includes(normalized)) return false;
  }
  return undefined;
}

function add(level: Finding["level"], post: PostFile, message: string) {
  findings.push({ level, file: post.relPath, message });
}
