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

function getComparablePostLength(contents: string) {
  return stripImportLines(stripFrontmatter(contents)).trim().length;
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
