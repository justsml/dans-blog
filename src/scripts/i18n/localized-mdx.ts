const LOCALE_IMPORT_ROOTS = [
  "assets",
  "components",
  "consts",
  "layouts",
  "shared",
  "types",
  "utils",
];

type LengthRatioBounds = {
  minimumRatio: number;
  maximumRatio: number;
  label: string;
};

const DEFAULT_LENGTH_RATIO_BOUNDS: LengthRatioBounds = {
  minimumRatio: 0.65,
  maximumRatio: 1.4,
  label: "default prose range: 65%-140% of English",
};

const LOCALE_LENGTH_RATIO_BOUNDS: Record<string, LengthRatioBounds> = {
  ar: {
    minimumRatio: 0.5,
    maximumRatio: 1.65,
    label: "Arabic range: 50%-165% of English",
  },
  de: {
    minimumRatio: 0.7,
    maximumRatio: 1.65,
    label: "German range: 70%-165% of English",
  },
  es: {
    minimumRatio: 0.7,
    maximumRatio: 1.55,
    label: "Spanish range: 70%-155% of English",
  },
  fr: {
    minimumRatio: 0.7,
    maximumRatio: 1.6,
    label: "French range: 70%-160% of English",
  },
  he: {
    minimumRatio: 0.5,
    maximumRatio: 1.55,
    label: "Hebrew range: 50%-155% of English",
  },
  hi: {
    minimumRatio: 0.45,
    maximumRatio: 1.75,
    label: "Hindi range: 45%-175% of English",
  },
  it: {
    minimumRatio: 0.7,
    maximumRatio: 1.55,
    label: "Italian range: 70%-155% of English",
  },
  ja: {
    minimumRatio: 0.35,
    maximumRatio: 1.3,
    label: "Japanese CJK-adjusted range: 35%-130% of English",
  },
  ru: {
    minimumRatio: 0.6,
    maximumRatio: 1.6,
    label: "Russian range: 60%-160% of English",
  },
  zh: {
    minimumRatio: 0.35,
    maximumRatio: 1.25,
    label: "Chinese CJK-adjusted range: 35%-125% of English",
  },
};

const LOCALE_IMPORT_ROOT_PATTERN = LOCALE_IMPORT_ROOTS.join("|");
const LOCALE_IMPORT_PREFIX_PATTERN = String.raw`(?:\.\.\/){3,}`;
const LOCALE_IMPORT_FROM_PATTERN = new RegExp(
  String.raw`(\bfrom\s+["'])${LOCALE_IMPORT_PREFIX_PATTERN}(${LOCALE_IMPORT_ROOT_PATTERN})(?=\/|["'])`,
  "g",
);
const LOCALE_SIDE_EFFECT_IMPORT_PATTERN = new RegExp(
  String.raw`(^\s*import\s+["'])${LOCALE_IMPORT_PREFIX_PATTERN}(${LOCALE_IMPORT_ROOT_PATTERN})(?=\/|["'])`,
  "gm",
);

export function normalizeLocaleImportPaths(contents: string) {
  return contents
    .replace(LOCALE_IMPORT_FROM_PATTERN, "$1../../../../$2")
    .replace(LOCALE_SIDE_EFFECT_IMPORT_PATTERN, "$1../../../../$2");
}

export function normalizeLocalizedCandidateBody(sourceContents: string, translatedBody: string) {
  let result = normalizeLocaleImportPaths(normalizeLocalizedAssetReferences(translatedBody));

  result = preserveSourceImportStatementsInBody(sourceContents, result);

  return result;
}

export function normalizeLocalizedCandidateFile(sourceContents: string, targetContents: string) {
  return normalizeLocaleImportPaths(normalizeLocalizedAssetReferences(
    preserveSourceImportStatementsInFile(sourceContents, targetContents),
  ));
}

export function normalizeLocalizedAssetReferences(contents: string) {
  return contents
    .replace(/]\(\.\/(?!\.)/g, "](../")
    .replace(/(src=["'])\.\/(?!\.)/g, "$1../")
    .replace(/(=["'])\.\/(?!\.)/g, "$1../")
    .replace(/^(\s*[A-Za-z0-9_-]+:\s*)\.\/(?!\.)/gm, "$1../");
}

export function normalizeFrontmatterAssetPaths(
  frontmatter: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...frontmatter };

  for (const [key, value] of Object.entries(result)) {
    if (
      /(?:image|cover|icon|hero|thumbnail)/i.test(key)
      && typeof value === "string"
      && /\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(value)
      && !value.startsWith("../")
      && !value.startsWith("/")
      && !/^https?:\/\//i.test(value)
    ) {
      result[key] = value.startsWith("./") ? `.${value}` : `../${value}`;
    }
  }

  return result;
}

export function assertTranslationLength({
  sourceContents,
  targetContents,
  targetPath,
}: {
  sourceContents: string;
  targetContents: string;
  targetPath: string;
}) {
  const sourceLength = getComparablePostLength(sourceContents);
  const targetLength = getComparablePostLength(targetContents);
  const { minimumRatio, maximumRatio, label } = getLengthRatioBounds(targetPath);
  const minimumLength = Math.floor(sourceLength * minimumRatio);
  const maximumLength = Math.ceil(sourceLength * maximumRatio);
  if (targetLength < minimumLength || targetLength > maximumLength) {
    throw new Error(
      `${targetPath} changed comparable body length from ${sourceLength} chars in English to ${targetLength} chars. Expected ${minimumLength}-${maximumLength} chars (${label}).`,
    );
  }
}

function getLengthRatioBounds(targetPath: string) {
  const locale = targetPath.match(/^([a-z]{2})$/)?.[1] ?? targetPath.match(/\/([a-z]{2})\/index\.mdx?$/)?.[1];

  return locale == null
    ? DEFAULT_LENGTH_RATIO_BOUNDS
    : LOCALE_LENGTH_RATIO_BOUNDS[locale] ?? DEFAULT_LENGTH_RATIO_BOUNDS;
}

export function getLengthValidationGuidance(targetPathOrLocale: string) {
  const bounds = getLengthRatioBounds(targetPathOrLocale);
  const minimum = Math.round(bounds.minimumRatio * 100);
  const maximum = Math.round(bounds.maximumRatio * 100);
  return `The final translated prose must be roughly ${minimum}%-${maximum}% of the English prose length (${bounds.label}). Do not summarize to satisfy the lower bound or pad to satisfy the upper bound.`;
}

export function getComparablePostLength(contents: string) {
  return normalizeComparableWhitespace(
    stripMdxComments(stripHtmlPreCodeBlocks(stripFencedCodeBlocks(stripImportLines(stripFrontmatter(contents))))),
  ).length;
}

export function assertNestedAssetPaths(targetContents: string, targetPath: string) {
  const nestedAssetReferences = [
    ...targetContents.matchAll(/]\(\.\/(?!\.)[^)]+\)/g),
    ...targetContents.matchAll(/src=["']\.\/(?!\.)[^"']+["']/g),
    ...targetContents.matchAll(/:\s*\.\/(?!\.)\S+\.(?:avif|gif|jpe?g|png|svg|webp)\b/g),
    ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
  ];

  if (nestedAssetReferences.length === 0) return;

  throw new Error(
    `${targetPath} uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.`,
  );
}

function preserveSourceImportStatementsInBody(sourceContents: string, targetContents: string) {
  const sourceImports = (sourceContents.match(/^import\s+.*?\s+from\s+['"].*?['"];?\s*$/gm) || [])
    .map((imp) => normalizeLocaleImportPaths(imp));
  const translatedImports = targetContents.match(/^import\s+.*?\s+from\s+['"].*?['"];?\s*$/gm) || [];

  const missing = sourceImports.filter(
    (imp) => !translatedImports.some((targetImport) => targetImport.trim() === imp.trim()),
  );

  if (missing.length === 0) return targetContents;

  return `${missing.join("\n")}\n\n${targetContents}`;
}

function preserveSourceImportStatementsInFile(sourceContents: string, targetContents: string) {
  const sourceImports = sourceContents.match(/^import\s.+$/gm) ?? [];
  const missingImports = sourceImports
    .filter((importLine) => {
      const localeImportLine = normalizeLocaleImportPaths(importLine);
      return !targetContents.includes(importLine) && !targetContents.includes(localeImportLine);
    })
    .map((importLine) => normalizeLocaleImportPaths(importLine));

  if (missingImports.length === 0) return targetContents;

  const frontmatterEnd = targetContents.indexOf("\n---", 3);
  if (!targetContents.startsWith("---") || frontmatterEnd === -1) {
    return `${missingImports.join("\n")}\n\n${targetContents}`;
  }

  const insertAt = frontmatterEnd + "\n---".length;
  return `${targetContents.slice(0, insertAt)}\n${missingImports.join("\n")}${targetContents.slice(insertAt)}`;
}

function stripFrontmatter(contents: string) {
  if (!contents.startsWith("---")) return contents;
  const frontmatterEnd = contents.indexOf("\n---", 3);
  if (frontmatterEnd === -1) return contents;
  return contents.slice(frontmatterEnd + 4);
}

function stripImportLines(contents: string) {
  return contents
    .split(/\r?\n/)
    .filter((line) => !line.trimStart().startsWith("import "))
    .join("\n");
}

function stripFencedCodeBlocks(contents: string) {
  const lines = contents.split(/\r?\n/);
  const result: string[] = [];
  let fence: string | undefined;

  for (const line of lines) {
    const fenceMatch = line.match(/^\s*(```+|~~~+)/);
    if (fenceMatch != null) {
      const marker = fenceMatch[1].startsWith("`") ? "`" : "~";
      if (fence == null) {
        fence = marker;
      } else if (fence === marker) {
        fence = undefined;
      }
      continue;
    }

    if (fence == null) {
      result.push(line);
    }
  }

  return result.join("\n");
}

function stripHtmlPreCodeBlocks(contents: string) {
  return contents.replace(/<pre\b[\s\S]*?<\/pre>/gi, "");
}

function stripMdxComments(contents: string) {
  return contents
    .replace(/\{\/\*[\s\S]*?\*\/}/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

function normalizeComparableWhitespace(contents: string) {
  return contents.replace(/\s+/g, " ").trim();
}
