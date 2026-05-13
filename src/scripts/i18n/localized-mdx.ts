const LOCALE_IMPORT_ROOTS = [
  "assets",
  "components",
  "consts",
  "layouts",
  "shared",
  "types",
  "utils",
];

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
  let result = normalizeLocaleImportPaths(translatedBody
    .replace(/]\(\.\//g, "](../")
    .replace(/src="\.\//g, 'src="../'));

  result = preserveSourceImportStatementsInBody(sourceContents, result);

  return result;
}

export function normalizeLocalizedCandidateFile(sourceContents: string, targetContents: string) {
  return normalizeLocaleImportPaths(preserveSourceImportStatementsInFile(sourceContents, targetContents)
    .replaceAll("](./", "](../")
    .replaceAll('src="./', 'src="../')
    .replaceAll("src='./", "src='../")
    .replaceAll('="./', '="../')
    .replaceAll("='./", "='../")
    .replace(/^(\s*[A-Za-z0-9_-]+:\s*)\.\/(?!\.)/gm, "$1../"));
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
  const minimumTargetLength = 600;
  const minimumRatio = 0.65;
  const maximumRatio = 1.35;

  if (targetLength <= minimumTargetLength) {
    throw new Error(
      `${targetPath} is too short after translation. Comparable body length is ${targetLength} chars; expected more than ${minimumTargetLength}.`,
    );
  }

  const minimumLength = Math.floor(sourceLength * minimumRatio);
  const maximumLength = Math.ceil(sourceLength * maximumRatio);
  if (targetLength < minimumLength || targetLength > maximumLength) {
    throw new Error(
      `${targetPath} changed comparable body length from ${sourceLength} chars in English to ${targetLength} chars. Expected ${minimumLength}-${maximumLength} chars (within 35%).`,
    );
  }
}

export function getComparablePostLength(contents: string) {
  return stripImportLines(stripFrontmatter(contents)).trim().length;
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
