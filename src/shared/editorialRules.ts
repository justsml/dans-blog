export const EDITORIAL_CATEGORIES = [
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
] as const;

export type EditorialCategory = (typeof EDITORIAL_CATEGORIES)[number];

export type PostVisibilityData = {
  draft?: boolean | number | string | null;
};

type PostWithData<TData extends PostVisibilityData = PostVisibilityData> = {
  data?: TData | null;
};

const editorialCategorySet = new Set<string>(EDITORIAL_CATEGORIES);

export const CATEGORY_LIST_EXCLUSIONS = ["Quiz", "Snippet", "Draft"] as const;

const categoryListExclusionSet = new Set<string>(CATEGORY_LIST_EXCLUSIONS);

const categoryAliases = [
  ["howto", "HowTo"],
  ["how-to", "HowTo"],
  ["regular expressions", "Regex"],
  ["reg-ex", "Regex"],
  ["software engineering", "Engineering"],
] as const;

const tagAliases = [
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
] as const;

const preferredCategoryByAlias = new Map<string, EditorialCategory>(
  categoryAliases.map(([alias, category]) => [alias, category]),
);

const canonicalTagByAlias = new Map<string, string>(tagAliases);

export function isEditorialCategory(
  category?: string | null,
): category is EditorialCategory {
  return typeof category === "string" && editorialCategorySet.has(category);
}

export function getPreferredCategory(category?: string | null) {
  if (!category) return undefined;
  return preferredCategoryByAlias.get(category.toLowerCase());
}

export function getCanonicalTag(tag?: string | null) {
  if (!tag) return undefined;
  return canonicalTagByAlias.get(tag);
}

export function getMechanicalTagFix(tag: string) {
  return getCanonicalTag(tag) ?? kebabCaseTag(tag);
}

export function isKebabCaseTag(tag: string) {
  return !/[A-Z]/.test(tag) && !/\s/.test(tag);
}

export function isCategoryListExcluded(category?: string | null) {
  return typeof category === "string" && categoryListExclusionSet.has(category);
}

/** Drafts are built only for content previews, never listed, fed, or mapped. */
export function isDraftPostData(data?: PostVisibilityData | null) {
  return normalizePostFlag(data?.draft) === true;
}

export function isPublishedPostData(data?: PostVisibilityData | null) {
  return !isDraftPostData(data);
}

export const isDraftPost = <TPost extends PostWithData>(
  post?: TPost | null,
) => isDraftPostData(post?.data);

export const isPublishedPost = <TPost extends PostWithData>(
  post?: TPost | null,
) => isPublishedPostData(post?.data);

export function shouldCountPostCategory(data?: (PostVisibilityData & {
  category?: string | null;
}) | null) {
  return isPublishedPostData(data) && !isCategoryListExcluded(data?.category);
}

const RETIRED_VISIBILITY_FIELDS = ["publish", "hidden", "unlisted"] as const;

export function getVisibilityWarnings(data: Record<string, unknown>) {
  return RETIRED_VISIBILITY_FIELDS
    .filter((field) => field in data)
    .map((field) => `${field} is no longer supported; use draft:true to keep a post unpublished`);
}

export function normalizePostFlag(
  value?: boolean | number | string | null,
): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "yes", "on"].includes(normalized)) return true;
    if (["false", "0", "no", "off", ""].includes(normalized)) return false;
  }
  return undefined;
}

function kebabCaseTag(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}
