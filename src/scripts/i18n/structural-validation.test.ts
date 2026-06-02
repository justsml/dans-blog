import { describe, expect, test } from "bun:test";
import {
  assertStructuralParity,
  compareMdxStructure,
  extractMdxStructure,
} from "./structural-validation.ts";

describe("compareMdxStructure", () => {
  test("treats Markdown and HTML links, blockquotes, tables, and images as equivalent structure", () => {
    const source = [
      "---",
      "title: Source",
      "---",
      "",
      "## Reference",
      "",
      "[Read more](#details)",
      "",
      "> A note.",
      "",
      "| Name | Value |",
      "| ---- | ----- |",
      "| API | 1 |",
      "| SDK | 2 |",
      "",
      "![Architecture diagram](./diagram.webp)",
      "",
      "```ts",
      "const value = 1;",
      "```",
    ].join("\n");
    const target = [
      "---",
      "title: Ziel",
      "---",
      "",
      "## Referenz",
      "",
      '<a href="#details">Mehr lesen</a>',
      "",
      "<blockquote>Eine Notiz.</blockquote>",
      "",
      "<table>",
      "<tr><th>Name</th><th>Wert</th></tr>",
      "<tr><td>API</td><td>1</td></tr>",
      "<tr><td>SDK</td><td>2</td></tr>",
      "</table>",
      "",
      '<img src="../diagram.webp" alt="Architekturdiagramm" />',
      "",
      "```ts",
      "const value = 1;",
      "```",
    ].join("\n");

    const comparison = compareMdxStructure({ sourceContents: source, targetContents: target });

    expect(comparison.valid).toBe(true);
    expect(comparison.score).toBe(1);
    expect(comparison.differences).toEqual({});
  });

  test("treats localized same-page heading fragments as matching structure", () => {
    const source = [
      "---",
      "title: Source",
      "---",
      "",
      "## Install guide",
      "",
      "[Jump there](#install-guide)",
    ].join("\n");
    const translated = [
      "---",
      "title: Cible",
      "---",
      "",
      "## Guide d'installation",
      "",
      "[Y aller](#guide-dinstallation)",
    ].join("\n");
    const stale = translated.replace("#guide-dinstallation", "#install-guide");

    const localized = compareMdxStructure({ sourceContents: source, targetContents: translated });
    const staleComparison = compareMdxStructure({ sourceContents: source, targetContents: stale });

    expect(localized.valid).toBe(true);
    expect(localized.differences).toEqual({});
    expect(extractMdxStructure(translated).linkTargets).toEqual(["#heading:0"]);
    expect(staleComparison.valid).toBe(false);
    expect(staleComparison.issues.some((issue) => issue.code === "linkTargets-mismatch")).toBe(true);
  });

  test("reports count differences in target-minus-source direction", () => {
    const source = [
      "---",
      "title: Source",
      "---",
      "",
      "## One",
      "## Two",
      "",
      "![Diagram](./diagram.webp)",
    ].join("\n");
    const target = [
      "---",
      "title: Ziel",
      "---",
      "",
      "## Eins",
      "",
      "| Name | Value |",
      "| ---- | ----- |",
      "| API | 1 |",
    ].join("\n");

    const comparison = compareMdxStructure({ sourceContents: source, targetContents: target });

    expect(comparison.valid).toBe(false);
    expect(comparison.differences).toEqual(expect.objectContaining({
      h2: -1,
      tables: 1,
      images: -1,
    }));
    expect(comparison.summary).toContain("Headings");
    expect(comparison.summary).toContain("Table");
  });

  test("flags code fence language sequence and table row/column shape drift", () => {
    const source = [
      "## Example",
      "",
      "```ts",
      "const value = 1;",
      "```",
      "",
      "```bash",
      "echo ok",
      "```",
      "",
      "| A | B |",
      "| --- | --- |",
      "| 1 | 2 |",
    ].join("\n");
    const target = [
      "## Beispiel",
      "",
      "```bash",
      "const value = 1;",
      "```",
      "",
      "```ts",
      "echo ok",
      "```",
      "",
      "| A | B | C |",
      "| --- | --- | --- |",
      "| 1 | 2 | 3 |",
    ].join("\n");

    const comparison = compareMdxStructure({ sourceContents: source, targetContents: target });

    expect(comparison.valid).toBe(false);
    expect(comparison.differences.codeFenceLanguages).toBe(2);
    expect(comparison.differences.tableShapes).toBe(1);
    expect(comparison.issues.some((issue) => issue.code === "codeFenceLanguages-mismatch")).toBe(true);
    expect(comparison.issues.some((issue) => issue.code === "tableShapes-mismatch")).toBe(true);
  });

  test("assertStructuralParity throws on non-identical blocking structure", () => {
    expect(() =>
      assertStructuralParity({
        sourceContents: "## Heading\n\n![Diagram](./diagram.webp)",
        targetContents: "### Heading",
        targetPath: "translated.mdx",
      })
    ).toThrow(/failed structural parity/);
  });
});

describe("extractMdxStructure", () => {
  test("exposes alt text lengths and MDX component sequence", () => {
    const structure = extractMdxStructure([
      "<HeroImage src=\"./hero.webp\" alt=\"A short alt\" />",
      "<QuizUI>",
      "</QuizUI>",
    ].join("\n"));

    expect(structure.counts.images).toBe(1);
    expect(structure.altTextLengths).toEqual([11]);
    expect(structure.counts.components).toBe(2);
    expect(structure.componentSequence).toEqual(["HeroImage", "QuizUI"]);
  });
});
