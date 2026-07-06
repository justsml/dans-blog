const DEFAULT_SITE_ORIGIN = "https://danlevy.net";
const DEFAULT_TARGET = "_blank";
const DEFAULT_REL = "noopener noreferrer";
const HTTP_PROTOCOLS = new Set(["http:", "https:"]);

export function rehypeExternalArticleLinks(options = {}) {
  const siteOrigin = normalizeOrigin(options.site ?? DEFAULT_SITE_ORIGIN);
  const target = options.target ?? DEFAULT_TARGET;
  const rel = options.rel ?? DEFAULT_REL;

  return (tree) => {
    visitElements(tree, (node) => {
      if (node.tagName !== "a") return;

      const properties = node.properties ?? {};
      const href = firstString(properties.href);

      if (!isExternalHref(href, siteOrigin)) return;

      node.properties = properties;
      properties.target = target;
      properties.rel = mergeRelValues(properties.rel, rel);
    });
  };
}

export function isExternalHref(href, siteOrigin = DEFAULT_SITE_ORIGIN) {
  const value = firstString(href)?.trim();

  if (!value || !isExplicitNetworkHref(value)) return false;

  try {
    const site = normalizeOrigin(siteOrigin);
    const url = new URL(value, `${site}/`);

    return HTTP_PROTOCOLS.has(url.protocol) && url.origin !== site;
  } catch {
    return false;
  }
}

export function mergeRelValues(current, required = DEFAULT_REL) {
  const tokens = new Set();

  addRelTokens(tokens, current);
  addRelTokens(tokens, required);

  return Array.from(tokens).join(" ");
}

function visitElements(node, callback) {
  if (!node || typeof node !== "object") return;

  if (node.type === "element") {
    callback(node);
  }

  if (!Array.isArray(node.children)) return;

  for (const child of node.children) {
    visitElements(child, callback);
  }
}

function firstString(value) {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return undefined;

  return value.find((item) => typeof item === "string");
}

function isExplicitNetworkHref(value) {
  return value.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(value);
}

function normalizeOrigin(value) {
  try {
    return new URL(value).origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

function addRelTokens(tokens, value) {
  if (typeof value === "string") {
    for (const token of value.split(/\s+/)) {
      if (token) tokens.add(token.toLowerCase());
    }
    return;
  }

  if (!Array.isArray(value)) return;

  for (const item of value) {
    addRelTokens(tokens, item);
  }
}
