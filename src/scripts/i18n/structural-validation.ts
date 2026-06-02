import { extractHeadingAnchors } from "./heading-link-validation.ts";

export {
  assertTranslationLength,
  getComparablePostLength,
} from "./localized-mdx.ts";

export const DEFAULT_MINIMUM_STRUCTURE_SCORE = 0.98;

export type StructuralSeverity = "high" | "medium" | "low";

export type TableShape = {
  kind: "markdown" | "html";
  rows: number;
  columns: number;
};

export type MdxStructureCounts = {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  links: number;
  blockquotes: number;
  codeFences: number;
  tables: number;
  tableRows: number;
  tableColumns: number;
  images: number;
  altTexts: number;
  emptyAltTexts: number;
  components: number;
};

export type MdxStructureSnapshot = {
  counts: MdxStructureCounts;
  headingSequence: string[];
  codeFenceLanguages: string[];
  linkTargets: string[];
  imageTargets: string[];
  tableShapes: TableShape[];
  altTextLengths: number[];
  componentSequence: string[];
};

export type StructuralComparisonIssue = {
  code: string;
  severity: StructuralSeverity;
  blocking: boolean;
  message: string;
};

export type MdxStructureComparison = {
  score: number;
  valid: boolean;
  minimumScore: number;
  differences: Record<string, number>;
  summary: string;
  issues: StructuralComparisonIssue[];
  source: MdxStructureSnapshot;
  target: MdxStructureSnapshot;
};

type CompareMdxStructureInput = {
  sourceContents: string;
  targetContents: string;
  targetPath?: string;
  minimumScore?: number;
};

type WeightedIssue = StructuralComparisonIssue & {
  weight: number;
  penaltyRatio: number;
};

type LinkReference = {
  index: number;
  target: string;
};

type ImageReference = {
  index: number;
  target: string;
  altText?: string;
};

type LocatedTableShape = TableShape & {
  index: number;
};

const COUNT_WEIGHTS: Partial<Record<keyof MdxStructureCounts, number>> = {
  h1: 8,
  h2: 8,
  h3: 7,
  h4: 6,
  h5: 5,
  h6: 5,
  links: 10,
  blockquotes: 8,
  codeFences: 18,
  tables: 14,
  tableRows: 8,
  tableColumns: 8,
  images: 14,
  altTexts: 8,
  emptyAltTexts: 4,
  components: 12,
};

const SEQUENCE_WEIGHTS = {
  headingSequence: 14,
  codeFenceLanguages: 18,
  linkTargets: 12,
  imageTargets: 10,
  tableShapes: 18,
  componentSequence: 12,
};

export function compareMdxStructure({
  sourceContents,
  targetContents,
  targetPath,
  minimumScore = DEFAULT_MINIMUM_STRUCTURE_SCORE,
}: CompareMdxStructureInput): MdxStructureComparison {
  const source = extractMdxStructure(sourceContents);
  const target = extractMdxStructure(targetContents);
  const differences: Record<string, number> = {};
  const issues: WeightedIssue[] = [];

  for (const key of Object.keys(COUNT_WEIGHTS) as Array<keyof MdxStructureCounts>) {
    addCountIssue({
      key,
      label: countLabel(key),
      sourceCount: source.counts[key],
      targetCount: target.counts[key],
      weight: COUNT_WEIGHTS[key] ?? 1,
      differences,
      issues,
      blocking: key !== "tableRows" && key !== "tableColumns",
    });
  }

  addStringSequenceIssue({
    key: "headingSequence",
    label: "heading level sequence",
    sourceSequence: source.headingSequence,
    targetSequence: target.headingSequence,
    weight: SEQUENCE_WEIGHTS.headingSequence,
    differences,
    issues,
  });
  addStringSequenceIssue({
    key: "codeFenceLanguages",
    label: "code fence language sequence",
    sourceSequence: source.codeFenceLanguages,
    targetSequence: target.codeFenceLanguages,
    weight: SEQUENCE_WEIGHTS.codeFenceLanguages,
    differences,
    issues,
  });
  addStringSequenceIssue({
    key: "linkTargets",
    label: "link target sequence",
    sourceSequence: source.linkTargets,
    targetSequence: target.linkTargets,
    weight: SEQUENCE_WEIGHTS.linkTargets,
    differences,
    issues,
  });
  addStringSequenceIssue({
    key: "imageTargets",
    label: "image target sequence",
    sourceSequence: source.imageTargets,
    targetSequence: target.imageTargets,
    weight: SEQUENCE_WEIGHTS.imageTargets,
    differences,
    issues,
  });
  addTableShapeIssue({
    sourceShapes: source.tableShapes,
    targetShapes: target.tableShapes,
    differences,
    issues,
  });
  addStringSequenceIssue({
    key: "componentSequence",
    label: "MDX component sequence",
    sourceSequence: source.componentSequence,
    targetSequence: target.componentSequence,
    weight: SEQUENCE_WEIGHTS.componentSequence,
    differences,
    issues,
  });
  addAltTextLengthIssue({
    sourceLengths: source.altTextLengths,
    targetLengths: target.altTextLengths,
    differences,
    issues,
  });

  const totalWeight =
    Object.values(COUNT_WEIGHTS).reduce((sum, weight) => sum + (weight ?? 0), 0)
    + Object.values(SEQUENCE_WEIGHTS).reduce((sum, weight) => sum + weight, 0)
    + 4;
  const lostWeight = issues.reduce((sum, issue) => sum + issue.weight * issue.penaltyRatio, 0);
  const score = clampScore(1 - lostWeight / totalWeight);
  const publicIssues = issues.map(({ weight: _weight, penaltyRatio: _penaltyRatio, ...issue }) => issue);
  const valid = score >= minimumScore && !publicIssues.some((issue) => issue.blocking);

  return {
    score,
    valid,
    minimumScore,
    differences,
    summary: summarizeStructureComparison(publicIssues, differences, targetPath),
    issues: publicIssues,
    source,
    target,
  };
}

export function assertStructuralParity(input: CompareMdxStructureInput) {
  const comparison = compareMdxStructure(input);
  if (comparison.valid) return;

  const targetLabel = input.targetPath ?? "translation";
  throw new Error(
    `${targetLabel} failed structural parity with score ${comparison.score.toFixed(3)} `
      + `(minimum ${comparison.minimumScore.toFixed(3)}). ${comparison.summary} `
      + `Differences: ${JSON.stringify(comparison.differences)}`,
  );
}

export function extractMdxStructure(contents: string): MdxStructureSnapshot {
  const body = stripFrontmatter(contents).replace(/\r\n?/g, "\n");
  const codeFenceLanguages = extractCodeFenceLanguages(body);
  const comparableBody = stripInlineCodeSpans(stripMdxComments(stripFencedCodeBlocks(body)));
  const headingSequence = extractHeadingSequence(comparableBody);
  const headingAnchorIndexes = getHeadingAnchorIndexes(contents);
  const linkTargets = extractLinks(comparableBody, headingAnchorIndexes).map((link) => link.target);
  const images = extractImages(comparableBody);
  const tableShapes = [
    ...extractMarkdownTables(comparableBody),
    ...extractHtmlTables(comparableBody),
  ]
    .sort((a, b) => a.index - b.index)
    .map(({ index: _index, ...shape }) => shape);
  const componentSequence = extractComponentSequence(comparableBody);
  const counts: MdxStructureCounts = {
    h1: headingSequence.filter((heading) => heading === "h1").length,
    h2: headingSequence.filter((heading) => heading === "h2").length,
    h3: headingSequence.filter((heading) => heading === "h3").length,
    h4: headingSequence.filter((heading) => heading === "h4").length,
    h5: headingSequence.filter((heading) => heading === "h5").length,
    h6: headingSequence.filter((heading) => heading === "h6").length,
    links: linkTargets.length,
    blockquotes: countMarkdownBlockquoteBlocks(comparableBody) + countHtmlTags(comparableBody, "blockquote"),
    codeFences: codeFenceLanguages.length,
    tables: tableShapes.length,
    tableRows: tableShapes.reduce((sum, table) => sum + table.rows, 0),
    tableColumns: tableShapes.reduce((sum, table) => sum + table.columns, 0),
    images: images.length,
    altTexts: images.filter((image) => image.altText != null).length,
    emptyAltTexts: images.filter((image) => image.altText != null && image.altText.trim() === "").length,
    components: componentSequence.length,
  };

  return {
    counts,
    headingSequence,
    codeFenceLanguages,
    linkTargets,
    imageTargets: images.map((image) => image.target),
    tableShapes,
    altTextLengths: images
      .filter((image) => image.altText != null)
      .map((image) => normalizeTextLength(image.altText ?? "")),
    componentSequence,
  };
}

function addCountIssue({
  key,
  label,
  sourceCount,
  targetCount,
  weight,
  differences,
  issues,
  blocking,
}: {
  key: keyof MdxStructureCounts;
  label: string;
  sourceCount: number;
  targetCount: number;
  weight: number;
  differences: Record<string, number>;
  issues: WeightedIssue[];
  blocking: boolean;
}) {
  const delta = targetCount - sourceCount;
  if (delta === 0) return;

  differences[key] = delta;
  issues.push({
    code: `${key}-count`,
    severity: blocking ? "high" : "medium",
    blocking,
    weight,
    penaltyRatio: Math.min(1, Math.abs(delta) / Math.max(1, sourceCount, targetCount)),
    message: `Changed ${label} from ${sourceCount} to ${targetCount}.`,
  });
}

function addStringSequenceIssue({
  key,
  label,
  sourceSequence,
  targetSequence,
  weight,
  differences,
  issues,
}: {
  key: string;
  label: string;
  sourceSequence: string[];
  targetSequence: string[];
  weight: number;
  differences: Record<string, number>;
  issues: WeightedIssue[];
}) {
  const mismatches = sequenceMismatchCount(sourceSequence, targetSequence, (source, target) => source === target);
  if (mismatches === 0) return;

  differences[key] = mismatches;
  issues.push({
    code: `${key}-mismatch`,
    severity: "high",
    blocking: true,
    weight,
    penaltyRatio: Math.min(1, mismatches / Math.max(1, sourceSequence.length, targetSequence.length)),
    message: `Changed ${label}. Source: ${summarizeSequence(sourceSequence)}. Target: ${summarizeSequence(targetSequence)}.`,
  });
}

function addTableShapeIssue({
  sourceShapes,
  targetShapes,
  differences,
  issues,
}: {
  sourceShapes: TableShape[];
  targetShapes: TableShape[];
  differences: Record<string, number>;
  issues: WeightedIssue[];
}) {
  const mismatches = sequenceMismatchCount(
    sourceShapes,
    targetShapes,
    (source, target) => source.rows === target.rows && source.columns === target.columns,
  );
  if (mismatches === 0) return;

  differences.tableShapes = mismatches;
  issues.push({
    code: "tableShapes-mismatch",
    severity: "high",
    blocking: true,
    weight: SEQUENCE_WEIGHTS.tableShapes,
    penaltyRatio: Math.min(1, mismatches / Math.max(1, sourceShapes.length, targetShapes.length)),
    message: `Changed table row/column shape. Source: ${summarizeTableShapes(sourceShapes)}. Target: ${summarizeTableShapes(targetShapes)}.`,
  });
}

function addAltTextLengthIssue({
  sourceLengths,
  targetLengths,
  differences,
  issues,
}: {
  sourceLengths: number[];
  targetLengths: number[];
  differences: Record<string, number>;
  issues: WeightedIssue[];
}) {
  const sourceTotal = sourceLengths.reduce((sum, length) => sum + length, 0);
  const targetTotal = targetLengths.reduce((sum, length) => sum + length, 0);
  if (sourceTotal === 0 && targetTotal === 0) return;

  const delta = targetTotal - sourceTotal;
  const ratio = sourceTotal === 0 ? Number.POSITIVE_INFINITY : targetTotal / sourceTotal;
  const suspicious = sourceTotal === 0
    ? targetTotal > 120
    : ratio < 0.25 || ratio > 3.5;
  if (!suspicious) return;

  differences.altTextTotalLength = delta;
  issues.push({
    code: "altTextLength-profile",
    severity: "medium",
    blocking: false,
    weight: 4,
    penaltyRatio: Math.min(1, Math.abs(delta) / Math.max(1, sourceTotal, targetTotal)),
    message: `Alt text total length changed sharply from ${sourceTotal} to ${targetTotal} characters.`,
  });
}

function summarizeStructureComparison(
  issues: StructuralComparisonIssue[],
  differences: Record<string, number>,
  targetPath: string | undefined,
) {
  if (issues.length === 0) {
    return "Structure is near-identical: headings, links, blockquotes, code fences, tables, images, alt text slots, and MDX component order match.";
  }

  const prefix = targetPath == null ? "" : `${targetPath}: `;
  const families = new Set<string>();
  for (const issue of issues) {
    if (issue.code.startsWith("h") || issue.code.startsWith("heading")) families.add("Headings changed or moved.");
    if (issue.code.startsWith("table")) families.add("Table count or row/column shape changed; errant line breaks may have broken a Markdown table.");
    if (issue.code.startsWith("codeFence")) families.add("Code fence count or language order changed.");
    if (issue.code.startsWith("link")) families.add("Link count or href sequence changed across Markdown/HTML link formats.");
    if (issue.code.startsWith("image")) families.add("Image count or target sequence changed.");
    if (issue.code.startsWith("altText")) families.add("Alt text count or length profile changed.");
    if (issue.code.startsWith("blockquote")) families.add("Blockquote count changed.");
    if (issue.code.startsWith("component")) families.add("MDX component order changed.");
  }

  const details = [...families].slice(0, 5);
  const diffSummary = Object.keys(differences).length === 0
    ? ""
    : ` Differences: ${JSON.stringify(differences)}.`;
  return `${prefix}${details.join(" ")}${diffSummary}`;
}

function extractCodeFenceLanguages(contents: string) {
  const languages: string[] = [];
  const lines = contents.split("\n");
  let fence: { marker: "`" | "~"; length: number } | undefined;

  for (const line of lines) {
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (fenceMatch == null) continue;

    const marker = fenceMatch[1].startsWith("`") ? "`" : "~";
    const length = fenceMatch[1].length;
    if (fence == null) {
      fence = { marker, length };
      languages.push(normalizeFenceLanguage(fenceMatch[2] ?? ""));
      continue;
    }
    if (fence.marker === marker && length >= fence.length) {
      fence = undefined;
    }
  }

  return languages;
}

function normalizeFenceLanguage(info: string) {
  return info.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
}

function extractHeadingSequence(contents: string) {
  const headings: string[] = [];
  for (const line of contents.split("\n")) {
    const markdownHeading = line.match(/^\s{0,3}(#{1,6})(?:\s|$)/);
    if (markdownHeading != null) {
      headings.push(`h${markdownHeading[1].length}`);
      continue;
    }

    for (const htmlHeading of line.matchAll(/<h([1-6])\b/gi)) {
      headings.push(`h${htmlHeading[1]}`);
    }
  }
  return headings;
}

function getHeadingAnchorIndexes(contents: string) {
  return new Map(
    extractHeadingAnchors(contents).map((heading, index) => [heading.fragment, index]),
  );
}

function extractLinks(contents: string, headingAnchorIndexes = new Map<string, number>()): LinkReference[] {
  const links: LinkReference[] = [];
  const referenceDefinitions = extractMarkdownReferenceDefinitions(contents);

  for (const match of contents.matchAll(/(^|[^!])\[([^\]\n]+)]\(([^)\s]+)(?:\s+["'][^)]*["'])?\)/g)) {
    const index = (match.index ?? 0) + match[1].length;
    links.push({ index, target: normalizeLinkTarget(match[3], headingAnchorIndexes) });
  }

  for (const match of contents.matchAll(/(^|[^!])\[([^\]\n]+)]\[([^\]\n]*)]/g)) {
    const index = (match.index ?? 0) + match[1].length;
    const id = (match[3] === "" ? match[2] : match[3]).trim().toLowerCase();
    const target = referenceDefinitions.get(id) ?? id;
    links.push({ index, target: normalizeLinkTarget(target, headingAnchorIndexes) });
  }

  for (const match of contents.matchAll(/<a\b[^>]*>/gi)) {
    const href = extractAttributeValue(match[0], "href");
    if (href != null) {
      links.push({ index: match.index ?? 0, target: normalizeLinkTarget(href, headingAnchorIndexes) });
    }
  }

  return links.sort((a, b) => a.index - b.index);
}

function extractImages(contents: string): ImageReference[] {
  const images: ImageReference[] = [];
  const referenceDefinitions = extractMarkdownReferenceDefinitions(contents);

  for (const match of contents.matchAll(/!\[((?:\\.|[^\]\\])*)]\(([^)\s]+)(?:\s+["'][^)]*["'])?\)/g)) {
    images.push({
      index: match.index ?? 0,
      target: normalizeAssetTarget(match[2]),
      altText: decodeMarkdownText(match[1] ?? ""),
    });
  }

  for (const match of contents.matchAll(/!\[((?:\\.|[^\]\\])*)]\[([^\]\n]*)]/g)) {
    const id = (match[2] === "" ? match[1] : match[2]).trim().toLowerCase();
    images.push({
      index: match.index ?? 0,
      target: normalizeAssetTarget(referenceDefinitions.get(id) ?? id),
      altText: decodeMarkdownText(match[1] ?? ""),
    });
  }

  for (const match of contents.matchAll(/<([A-Za-z][A-Za-z0-9_.]*)\b[^>]*>/g)) {
    const tagName = match[1];
    const tag = match[0];
    const src = extractAttributeValue(tag, "src");
    const alt = extractAttributeValue(tag, "alt");
    const isImageTag = tagName.toLowerCase() === "img"
      || /Image$/.test(tagName)
      || (src != null && alt != null && /\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i.test(src));
    if (!isImageTag) continue;
    images.push({
      index: match.index ?? 0,
      target: normalizeAssetTarget(src ?? ""),
      altText: alt,
    });
  }

  return images.sort((a, b) => a.index - b.index);
}

function extractMarkdownTables(contents: string): LocatedTableShape[] {
  const tables: LocatedTableShape[] = [];
  const lines = contents.split("\n");
  const lineOffsets = getLineStartOffsets(contents);

  for (let index = 1; index < lines.length; index += 1) {
    const separator = lines[index];
    const header = lines[index - 1];
    if (!isMarkdownTableSeparator(separator) || !looksLikeMarkdownTableRow(header)) continue;

    const rowLines = [header];
    let cursor = index + 1;
    while (cursor < lines.length && looksLikeMarkdownTableRow(lines[cursor])) {
      rowLines.push(lines[cursor]);
      cursor += 1;
    }

    tables.push({
      kind: "markdown",
      index: lineOffsets[index - 1] ?? 0,
      rows: rowLines.length,
      columns: Math.max(
        countMarkdownTableCells(separator),
        ...rowLines.map((line) => countMarkdownTableCells(line)),
      ),
    });
    index = cursor - 1;
  }

  return tables;
}

function extractHtmlTables(contents: string): LocatedTableShape[] {
  return [...contents.matchAll(/<table\b[\s\S]*?<\/table>/gi)].map((match) => {
    const rowMatches = [...match[0].matchAll(/<tr\b[\s\S]*?<\/tr>/gi)];
    const columns = rowMatches.reduce((max, row) => {
      const cellCount = [...row[0].matchAll(/<t[dh]\b/gi)].length;
      return Math.max(max, cellCount);
    }, 0);
    return {
      kind: "html" as const,
      index: match.index ?? 0,
      rows: rowMatches.length,
      columns,
    };
  });
}

function getLineStartOffsets(contents: string) {
  const offsets: number[] = [];
  let offset = 0;
  for (const line of contents.split("\n")) {
    offsets.push(offset);
    offset += line.length + 1;
  }
  return offsets;
}

function extractComponentSequence(contents: string) {
  const components: string[] = [];
  for (const match of contents.matchAll(/<\/?([A-Z][A-Za-z0-9_.]*)\b/g)) {
    if (match[0].startsWith("</")) continue;
    components.push(match[1]);
  }
  return components;
}

function countMarkdownBlockquoteBlocks(contents: string) {
  let count = 0;
  let inBlockquote = false;

  for (const line of contents.split("\n")) {
    if (/^\s{0,3}>/.test(line)) {
      if (!inBlockquote) count += 1;
      inBlockquote = true;
      continue;
    }
    if (line.trim() !== "") inBlockquote = false;
  }

  return count;
}

function countHtmlTags(contents: string, tag: string) {
  return [...contents.matchAll(new RegExp(`<${escapeRegExp(tag)}\\b`, "gi"))].length;
}

function extractMarkdownReferenceDefinitions(contents: string) {
  const definitions = new Map<string, string>();
  for (const match of contents.matchAll(/^\s*\[([^\]]+)]:\s*(\S+)/gm)) {
    definitions.set(match[1].trim().toLowerCase(), match[2].trim());
  }
  return definitions;
}

function extractAttributeValue(tag: string, attribute: string) {
  const pattern = new RegExp(
    `\\b${escapeRegExp(attribute)}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|\\{\\s*["']([^"']+)["']\\s*\\})`,
    "i",
  );
  const match = tag.match(pattern);
  return match?.[1] ?? match?.[2] ?? match?.[3];
}

function isMarkdownTableSeparator(line: string) {
  if (!line.includes("|")) return false;
  const cells = splitMarkdownTableCells(line);
  return cells.length > 1 && cells.every((cell) => /^:?-{3,}:?$/.test(cell.trim()));
}

function looksLikeMarkdownTableRow(line: string) {
  return line.includes("|") && line.trim() !== "" && !/^\s{0,3}>/.test(line);
}

function countMarkdownTableCells(line: string) {
  return splitMarkdownTableCells(line).length;
}

function splitMarkdownTableCells(line: string) {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells: string[] = [];
  let current = "";
  let escaped = false;

  for (const char of trimmed) {
    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }
    if (char === "\\") {
      current += char;
      escaped = true;
      continue;
    }
    if (char === "|") {
      cells.push(current);
      current = "";
      continue;
    }
    current += char;
  }

  cells.push(current);
  return cells.map((cell) => cell.trim());
}

function stripFrontmatter(contents: string) {
  if (!contents.startsWith("---")) return contents;
  const frontmatterEnd = contents.indexOf("\n---", 3);
  if (frontmatterEnd === -1) return contents;
  return contents.slice(frontmatterEnd + 4);
}

function stripFencedCodeBlocks(contents: string) {
  const lines = contents.split("\n");
  const result: string[] = [];
  let fence: { marker: "`" | "~"; length: number } | undefined;

  for (const line of lines) {
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fenceMatch == null) {
      if (fence == null) result.push(line);
      continue;
    }

    const marker = fenceMatch[1].startsWith("`") ? "`" : "~";
    const length = fenceMatch[1].length;
    if (fence == null) {
      fence = { marker, length };
      continue;
    }
    if (fence.marker === marker && length >= fence.length) {
      fence = undefined;
    }
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

function normalizeLinkTarget(value: string, headingAnchorIndexes = new Map<string, number>()) {
  const decoded = decodeHtmlEntities(value).trim();
  const samePageFragment = extractSamePageFragment(decoded);
  if (samePageFragment != null) {
    const headingIndex = headingAnchorIndexes.get(samePageFragment);
    if (headingIndex != null) return `#heading:${headingIndex}`;
  }
  return decoded;
}

function extractSamePageFragment(value: string) {
  if (!value.startsWith("#")) return undefined;
  const fragment = value.slice(1);
  try {
    return decodeURIComponent(fragment);
  } catch {
    return fragment;
  }
}

function normalizeAssetTarget(value: string) {
  const decoded = decodeHtmlEntities(value).trim();
  if (/^(?:https?:|data:|\/|#)/i.test(decoded)) return decoded;
  return decoded.replace(/^(?:\.\/|\.\.\/)+/, "");
}

function normalizeTextLength(value: string) {
  return decodeHtmlEntities(value).replace(/\s+/g, " ").trim().length;
}

function decodeMarkdownText(value: string) {
  return value.replace(/\\([\\[\]])/g, "$1");
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

function sequenceMismatchCount<T>(source: T[], target: T[], equals: (source: T, target: T) => boolean) {
  const length = Math.max(source.length, target.length);
  let mismatches = 0;
  for (let index = 0; index < length; index += 1) {
    const sourceValue = source[index];
    const targetValue = target[index];
    if (sourceValue == null || targetValue == null || !equals(sourceValue, targetValue)) {
      mismatches += 1;
    }
  }
  return mismatches;
}

function summarizeSequence(sequence: string[]) {
  if (sequence.length === 0) return "(none)";
  const visible = sequence.slice(0, 12).join(", ");
  return sequence.length > 12 ? `${visible}, ... +${sequence.length - 12}` : visible;
}

function summarizeTableShapes(shapes: TableShape[]) {
  if (shapes.length === 0) return "(none)";
  return shapes.map((shape) => `${shape.rows}x${shape.columns}`).join(", ");
}

function countLabel(key: keyof MdxStructureCounts) {
  const labels: Record<keyof MdxStructureCounts, string> = {
    h1: "H1 headings",
    h2: "H2 headings",
    h3: "H3 headings",
    h4: "H4 headings",
    h5: "H5 headings",
    h6: "H6 headings",
    links: "links",
    blockquotes: "blockquotes",
    codeFences: "code fences",
    tables: "tables",
    tableRows: "table rows",
    tableColumns: "table columns",
    images: "images",
    altTexts: "alt text slots",
    emptyAltTexts: "empty alt text slots",
    components: "MDX components",
  };
  return labels[key];
}

function clampScore(score: number) {
  return Number(Math.max(0, Math.min(1, score)).toFixed(4));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
