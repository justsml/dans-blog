import GithubSlugger from "github-slugger";

export type HeadingAnchorLinkFailureKind = "missing-target" | "stale-source-anchor";

export type HeadingAnchorLinkFailure = {
  expectedFragment: string;
  kind: HeadingAnchorLinkFailureKind;
  lineNumber: number;
  linkText: string;
  sourceFragment: string;
  targetFragment: string;
};

export type HeadingAnchorLinkReport = {
  checkedLinks: number;
  failedLinks: number;
  failures: HeadingAnchorLinkFailure[];
  staleSourceAnchorLinks: number;
  unresolvedTargetLinks: number;
};

type Heading = {
  fragment: string;
  level: number;
  text: string;
};

type LinkReference = {
  fragment?: string;
  href: string;
  lineNumber: number;
  ordinal: number;
  text: string;
};

export function analyzeHeadingAnchorLinks({
  sourceContents,
  targetContents,
}: {
  sourceContents: string;
  targetContents: string;
}): HeadingAnchorLinkReport {
  const sourceHeadings = extractHeadings(sourceContents);
  const targetHeadings = extractHeadings(targetContents);
  const sourceHeadingByFragment = new Map(sourceHeadings.map((heading, index) => [heading.fragment, { heading, index }]));
  const targetFragments = new Set(targetHeadings.map((heading) => heading.fragment));
  const sourceLinks = extractLinks(sourceContents);
  const targetLinks = extractLinks(targetContents);
  const failures: HeadingAnchorLinkFailure[] = [];
  let checkedLinks = 0;

  for (const targetLink of targetLinks) {
    const targetFragment = targetLink.fragment;
    if (targetFragment == null) continue;
    if (targetFragments.has(targetFragment)) {
      checkedLinks += 1;
      continue;
    }

    const staleSourceHeading = sourceHeadingByFragment.get(targetFragment);
    const pairedSourceLink = sourceLinks[targetLink.ordinal];
    const pairedSourceFragment = pairedSourceLink?.fragment;
    const pairedSourceHeading = pairedSourceFragment == null
      ? undefined
      : sourceHeadingByFragment.get(pairedSourceFragment);
    const sourceHeading = staleSourceHeading ?? pairedSourceHeading;
    if (sourceHeading == null) continue;

    checkedLinks += 1;
    const targetHeading = targetHeadings[sourceHeading.index];
    failures.push({
      expectedFragment: targetHeading?.fragment ?? "",
      kind: staleSourceHeading != null && targetFragment !== targetHeading?.fragment
        ? "stale-source-anchor"
        : "missing-target",
      lineNumber: targetLink.lineNumber,
      linkText: targetLink.text,
      sourceFragment: staleSourceHeading?.heading.fragment ?? pairedSourceFragment ?? "",
      targetFragment,
    });
  }

  return {
    checkedLinks,
    failedLinks: failures.length,
    failures,
    staleSourceAnchorLinks: failures.filter((failure) => failure.kind === "stale-source-anchor").length,
    unresolvedTargetLinks: failures.filter((failure) => failure.kind === "missing-target").length,
  };
}

function extractHeadings(contents: string): Heading[] {
  const headings: Array<{ explicitId?: string; level: number; text: string }> = [];
  const comparable = stripInlineCodeSpans(stripMdxComments(stripFencedCodeBlocks(stripFrontmatter(contents))));

  for (const line of comparable.split("\n")) {
    const markdownHeading = line.match(/^\s{0,3}(#{1,6})(?:\s+|$)(.*?)\s*(?:#+\s*)?$/);
    if (markdownHeading != null) {
      headings.push({
        level: markdownHeading[1].length,
        text: normalizeHeadingText(markdownHeading[2] ?? ""),
      });
      continue;
    }

    for (const htmlHeading of line.matchAll(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi)) {
      headings.push({
        explicitId: extractAttributeValue(htmlHeading[2] ?? "", "id"),
        level: Number(htmlHeading[1]),
        text: normalizeHeadingText(htmlHeading[3] ?? ""),
      });
    }
  }

  const slugger = new GithubSlugger();
  return headings.map((heading) => ({
    fragment: normalizeFragment(heading.explicitId ?? slugger.slug(heading.text)),
    level: heading.level,
    text: heading.text,
  }));
}

function extractLinks(contents: string): LinkReference[] {
  const comparable = stripInlineCodeSpans(stripMdxComments(stripFencedCodeBlocks(stripFrontmatter(contents))));
  const links: LinkReference[] = [];
  const referenceDefinitions = extractMarkdownReferenceDefinitions(comparable);

  for (const match of comparable.matchAll(/(^|[^!])\[([^\]\n]+)]\(([^)\s]+)(?:\s+["'][^)]*["'])?\)/g)) {
    const href = decodeHtmlEntities(match[3] ?? "");
    links.push({
      fragment: extractSamePageFragment(href),
      href,
      lineNumber: lineNumberAt(comparable, (match.index ?? 0) + match[1].length),
      ordinal: links.length,
      text: normalizeHeadingText(match[2] ?? ""),
    });
  }

  for (const match of comparable.matchAll(/(^|[^!])\[([^\]\n]+)]\[([^\]\n]*)]/g)) {
    const id = (match[3] === "" ? match[2] : match[3]).trim().toLowerCase();
    const href = decodeHtmlEntities(referenceDefinitions.get(id) ?? id);
    links.push({
      fragment: extractSamePageFragment(href),
      href,
      lineNumber: lineNumberAt(comparable, (match.index ?? 0) + match[1].length),
      ordinal: links.length,
      text: normalizeHeadingText(match[2] ?? ""),
    });
  }

  for (const match of comparable.matchAll(/<a\b[^>]*>/gi)) {
    const href = extractAttributeValue(match[0], "href");
    if (href == null) continue;
    links.push({
      fragment: extractSamePageFragment(decodeHtmlEntities(href)),
      href,
      lineNumber: lineNumberAt(comparable, match.index ?? 0),
      ordinal: links.length,
      text: "",
    });
  }

  return links.sort((a, b) => a.lineNumber - b.lineNumber || a.ordinal - b.ordinal)
    .map((link, ordinal) => ({ ...link, ordinal }));
}

function extractSamePageFragment(href: string) {
  if (!href.startsWith("#")) return undefined;
  return normalizeFragment(href.slice(1));
}

function normalizeFragment(value: string) {
  const withoutHash = value.replace(/^#/, "");
  try {
    return decodeURIComponent(withoutHash);
  } catch {
    return withoutHash;
  }
}

function normalizeHeadingText(value: string) {
  return decodeHtmlEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]*}/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMarkdownReferenceDefinitions(contents: string) {
  const refs = new Map<string, string>();
  for (const match of contents.matchAll(/^\s{0,3}\[([^\]]+)]:\s*(\S+)/gm)) {
    refs.set(match[1].trim().toLowerCase(), match[2].trim());
  }
  return refs;
}

function lineNumberAt(contents: string, index: number) {
  return contents.slice(0, index).split("\n").length;
}

function stripFrontmatter(contents: string) {
  if (!contents.startsWith("---")) return contents;
  const frontmatterEnd = contents.indexOf("\n---", 3);
  if (frontmatterEnd === -1) return contents;
  return contents.slice(frontmatterEnd + 4);
}

function stripFencedCodeBlocks(contents: string) {
  const lines = contents.split(/\r?\n/);
  const result: string[] = [];
  let fence: string | undefined;
  for (const line of lines) {
    const fenceMatch = line.match(/^\s{0,3}(```+|~~~+)/);
    if (fenceMatch != null) {
      const marker = fenceMatch[1][0];
      fence = fence == null ? marker : fence === marker ? undefined : fence;
      continue;
    }
    if (fence == null) result.push(line);
  }
  return result.join("\n");
}

function stripMdxComments(contents: string) {
  return contents
    .replace(/\{\/\*[\s\S]*?\*\/}/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

function stripInlineCodeSpans(contents: string) {
  return contents.replace(/`(?:\\.|[^`])*`/g, (match) => " ".repeat(match.length));
}

function extractAttributeValue(tag: string, attribute: string) {
  const pattern = new RegExp(`\\b${attribute}\\s*=\\s*([\"'])(.*?)\\1`, "i");
  return tag.match(pattern)?.[2];
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
