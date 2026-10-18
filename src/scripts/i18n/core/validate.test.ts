import { expect, test } from "bun:test";
import { validateTranslation } from "./validate.ts";

const sourceContents = `---
title: A figure
---
import figure from "./figure.svg?url";

## A figure

This figure illustrates the argument and its limitations.

<img src={figure} alt="An illustration" />
`;

function checkImport(specifier: string) {
  return validateTranslation({
    sourceContents,
    targetContents: `---
title: Una figura
---
import figure from "${specifier}";

## Una figura

Esta figura ilustra el argumento y sus limitaciones.

<img src={figure} alt="Una ilustración" />
`,
    targetPath: "src/content/posts/2026-10-14--example/es/index.mdx",
    locale: "es",
  }).issues.filter((issue) => issue.code === "protected-tokens");
}

test("localized SVG URL imports preserve the source import across directory levels", () => {
  expect(checkImport("../figure.svg?url")).toEqual([]);
});

test("localized imports must preserve the asset and its URL query", () => {
  expect(checkImport("../different.svg?url")).toHaveLength(1);
  expect(checkImport("../figure.svg")).toHaveLength(1);
});
